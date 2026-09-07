export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const data = await request.json();
    let targetUrl = data.url;

    // 1. SSRF Defense: Validate URL
    let urlObj;
    try {
      urlObj = new URL(targetUrl);
    } catch {
      return new Response(JSON.stringify({ error: "URL tidak valid." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
      return new Response(JSON.stringify({ error: "Hanya menerima protokol HTTP/HTTPS." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const hostname = urlObj.hostname;
    // Block localhost and RFC 1918 IPs
    const blockedRegex = /^(localhost|127\.\d+\.\d+\.\d+|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+|169\.254\.169\.254)$/;
    if (blockedRegex.test(hostname)) {
      return new Response(JSON.stringify({ error: "Audit gagal: Alamat IP/Host internal dilarang (Anti-SSRF)." }), { status: 403, headers: { "Content-Type": "application/json" } });
    }

    // 2. Fetch Google PageSpeed API
    const apiKey = env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.warn("GOOGLE_API_KEY is missing, falling back to DoH heuristic.");
      return await performFallbackAudit(urlObj);
    }

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile&key=${apiKey}`;
    
    // Add timeout to fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout for edge worker limits (15s total)

    try {
      const gRes = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!gRes.ok) {
        throw new Error(`Google API returned ${gRes.status}`);
      }

      const gData = await gRes.json();
      const lighthouseResult = gData.lighthouseResult;
      
      const metrics = {
        score: Math.round((lighthouseResult?.categories?.performance?.score || 0) * 100),
        lcp: lighthouseResult?.audits?.['largest-contentful-paint']?.displayValue || "N/A",
        cls: lighthouseResult?.audits?.['cumulative-layout-shift']?.displayValue || "N/A",
        fcp: lighthouseResult?.audits?.['first-contentful-paint']?.displayValue || "N/A",
        seo: Math.round((lighthouseResult?.categories?.seo?.score || 0) * 100),
        accessibility: Math.round((lighthouseResult?.categories?.accessibility?.score || 0) * 100),
        latencyMs: Math.round(lighthouseResult?.audits?.['server-response-time']?.numericValue || 0),
        vulnerabilities: [] as string[]
      };

      if (metrics.score < 50) metrics.vulnerabilities.push("Skor performa inti sangat rendah (Red Zone).");
      if (metrics.seo < 80) metrics.vulnerabilities.push("On-Page SEO memiliki peringatan kritis.");
      
      if (metrics.vulnerabilities.length === 0) {
        metrics.vulnerabilities.push("Infrastruktur stabil, namun berpotensi butuh audit mendalam.");
      }

      return new Response(JSON.stringify(metrics), { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      });

    } catch (e) {
      clearTimeout(timeoutId);
      console.warn("Google PageSpeed failed or timed out, executing Edge DoH Fallback.", e);
      return await performFallbackAudit(urlObj);
    }

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

async function performFallbackAudit(urlObj: URL) {
  // Edge Probe Fallback
  const start = Date.now();
  let latencyMs = 0;
  let score = 75; // Base fallback score
  const vulnerabilities: string[] = [];

  try {
    // Attempt HEAD request to measure real TTFB and check headers
    const headRes = await fetch(urlObj.href, { 
      method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ZaditAuditBot/1.0)' }
    });
    latencyMs = Date.now() - start;

    if (latencyMs > 2000) {
      score -= 20;
      vulnerabilities.push(`Server merespons sangat lambat (TTFB > 2s). Evaluasi hosting atau CDN.`);
    } else if (latencyMs > 800) {
      score -= 10;
      vulnerabilities.push(`Waktu respons server (TTFB) perlu ditingkatkan (Current: ${latencyMs}ms).`);
    }

    if (!headRes.headers.get('strict-transport-security')) {
      score -= 5;
      vulnerabilities.push(`Celah Keamanan: HSTS tidak aktif, rentan Downgrade Attack.`);
    }
    if (!headRes.headers.get('content-security-policy')) {
      score -= 5;
      vulnerabilities.push(`Celah Keamanan: CSP absen, berpotensi XSS (Cross-Site Scripting).`);
    }

  } catch (fetchErr) {
    // If request fails (timeout, SSL err), fallback to basic heuristic
    latencyMs = Date.now() - start;
    score -= 30;
    vulnerabilities.push(`Koneksi terputus atau sertifikat SSL bermasalah. Server unreachable.`);
  }

  if (urlObj.hostname.length > 20) {
     score -= 5;
  }

  score = Math.max(30, Math.min(95, score));

  if (vulnerabilities.length === 0) {
    vulnerabilities.push("Header keamanan standar terpenuhi, butuh penetrasi manual.");
  }

  return new Response(JSON.stringify({
    score,
    lcp: `${((latencyMs + 500) / 1000).toFixed(1)}s (Est)`,
    cls: "N/A (Heuristic)",
    fcp: `${((latencyMs + 200) / 1000).toFixed(1)}s (Est)`,
    seo: 85,
    accessibility: 85,
    latencyMs,
    vulnerabilities,
    fallback: true
  }), { 
    status: 200, 
    headers: { "Content-Type": "application/json" } 
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
