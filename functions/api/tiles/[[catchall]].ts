/**
 * Cloudflare Pages Edge Function: /api/tiles/[[catchall]]
 * 
 * Secure raster tile proxy for CARTO Basemaps.
 * Protects CARTO API keys from client exposure (OWASP A04/A07).
 * Caches raster tiles at Cloudflare Edge for 30 days.
 */

export async function onRequestGet(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);

  // 1. Path & Parameter Extraction
  // Supports both /api/tiles/:style/:z/:x/:y[@2x].png and /api/tiles/:style/:z/:x/:y
  const prefix = "/api/tiles/";
  const index = url.pathname.indexOf(prefix);
  
  let style = "light_all";
  let z = 0;
  let x = 0;
  let y = 0;
  let retina = "";

  if (index !== -1) {
    const subPath = url.pathname.slice(index + prefix.length);
    const match = subPath.match(/^(light_all|voyager|dark_all)\/(\d{1,2})\/(\d+)\/(\d+)(@2x)?(\.png)?$/);
    if (match) {
      style = match[1];
      z = parseInt(match[2], 10);
      x = parseInt(match[3], 10);
      y = parseInt(match[4], 10);
      retina = match[5] || "";
    } else {
      // Fallback to query params if available
      style = url.searchParams.get("s") || "light_all";
      z = parseInt(url.searchParams.get("z") || "-1", 10);
      x = parseInt(url.searchParams.get("x") || "-1", 10);
      y = parseInt(url.searchParams.get("y") || "-1", 10);
      retina = url.searchParams.get("r") === "@2x" ? "@2x" : "";
    }
  }

  // 2. Strict Whitelist & SSRF Guardrails
  const allowedStyles = ["light_all", "voyager", "dark_all"];
  if (!allowedStyles.includes(style)) {
    return new Response(JSON.stringify({ error: "Gaya ubin tidak diizinkan." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (isNaN(z) || isNaN(x) || isNaN(y) || z < 0 || z > 20 || x < 0 || y < 0) {
    return new Response(JSON.stringify({ error: "Koordinat ubin tidak valid." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 3. Edge Cache Lookup
  const cache = (caches as any).default;
  const cacheKey = new Request(url.toString(), {
    method: "GET",
    headers: request.headers
  });

  if (cache) {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
  }

  // 4. Upstream Fetch to CARTO with Server-Side Secret Key
  const apiKey = env?.CARTO_API_KEY || "cb1_52p0_1_c919c75f025b6585c436eb41";
  const upstreamUrl = `https://basemaps.cartocdn.com/rastertiles/${style}/${z}/${x}/${y}${retina}.png?key=${apiKey}`;

  try {
    const fetchInit: any = {
      cf: {
        cacheEverything: true,
        cacheTtl: 2592000 // 30 days CDN cache
      }
    };

    const upstreamRes = await fetch(upstreamUrl, fetchInit);

    if (!upstreamRes.ok) {
      return new Response("Gagal memuat ubin dari penyedia hulu.", { status: upstreamRes.status });
    }

    const imageBuffer = await upstreamRes.arrayBuffer();

    const response = new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=604800, s-maxage=2592000, immutable",
        "Access-Control-Allow-Origin": "*",
        "X-Tile-Engine": "Cloudflare-Edge-Proxy"
      }
    });

    if (cache && typeof context.waitUntil === "function") {
      context.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
  } catch (err: any) {
    return new Response("Kesalahan internal saat memproses ubin spasial.", { status: 500 });
  }
}

export async function onRequestHead(context: any) {
  return onRequestGet(context);
}
