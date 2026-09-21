/**
 * Cloudflare Pages Edge Function: /direktori/[[catchall]]
 *
 * Intercepts long-tail directory routes not pre-rendered by Next.js SSG.
 * Fetches entity data from D1 + R2, renders full semantic HTML at the edge,
 * and caches the response permanently on Cloudflare CDN.
 */

interface Env {
  DB: D1Database;
  MEDIA_BUCKET?: R2Bucket;
}

interface PseoEntity {
  slug: string;
  category: string;
  type: string;
  title: string;
  target_keyword: string;
  area_served: string;
  wikidata_uri: string;
  bps_code: string | null;
  is_anchor: number;
}

interface ComparisonRow {
  criterion: string;
  traditionalAgency: string;
  freelancePlatform: string;
  zaditEngineering: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface HybridComparison {
  contextTradeOff: string;
  alternativeStrengths: string;
  zaditFitContext: string;
  comparisonTable: ComparisonRow[];
}

interface R2Payload {
  title: string;
  metaDescription: string;
  localOrIndustryContext: string;
  hybridComparison: HybridComparison;
  faq: FaqItem[];
  rootDomainLink: { anchorText: string; targetUrl: string };
}

const CATEGORY_LABELS: Record<string, string> = {
  web: "Jasa Pembuatan Web",
  seo: "Konsultan SEO",
  bisnis: "Konsultasi Bisnis",
  sinta: "Jurnal & Riset SINTA",
};

const CATEGORY_SERVICE_LINKS: Record<string, string> = {
  web: "/layanan/solusi-web-performa",
  seo: "/layanan/solusi-seo-teknikal",
  bisnis: "/layanan/transformasi-bisnis",
  sinta: "/layanan/riset-dan-jurnal",
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const { env, params } = context;

  const rawCatchall = (params["catchall"] as string[]) || [];
  const catchall = rawCatchall.filter((s) => s.trim().length > 0);
  let category = "web";
  let slug = "";

  if (catchall.length === 0) {
    // Pass-through to Next.js SSG static page: /direktori/
    return context.next();
  }

  if (catchall.length === 1) {
    const segment = catchall[0];
    if (CATEGORY_LABELS[segment]) {
      const target = CATEGORY_SERVICE_LINKS[segment] || "/direktori/";
      return Response.redirect(new URL(target, context.request.url).toString(), 301);
    }
    category = "web";
    slug = segment;
  } else {
    category = catchall[0];
    slug = catchall[1];
  }

  if (!CATEGORY_LABELS[category] || !slug) {
    return new Response("<!DOCTYPE html><html lang=\"id\"><head><meta charset=\"UTF-8\"><title>404</title><meta name=\"robots\" content=\"noindex\"></head><body><h1>404 - Tidak Ditemukan</h1><p><a href=\"/direktori/\">Kembali ke Direktori</a></p></body></html>", {
      status: 404,
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }

  // Step 1: Query D1
  let entity: PseoEntity | null = null;
  try {
    const result = await env.DB.prepare(
      "SELECT slug, category, type, title, target_keyword, area_served, wikidata_uri, bps_code, is_anchor FROM pseo_entities WHERE category = ? AND slug = ? LIMIT 1"
    ).bind(category, slug).first<PseoEntity>();
    entity = result ?? null;
  } catch (_) { /* D1 miss */ }

  if (!entity) {
    return new Response("<!DOCTYPE html><html lang=\"id\"><head><meta charset=\"UTF-8\"><title>404</title><meta name=\"robots\" content=\"noindex\"></head><body><h1>404 - Tidak Ditemukan</h1><a href=\"/\">Beranda</a></body></html>", {
      status: 404,
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }

  // Step 2: Fetch payload from R2 or CDN
  let payload: R2Payload | null = null;

  if (env.MEDIA_BUCKET) {
    try {
      const obj = await env.MEDIA_BUCKET.get("data/pseo/" + category + "/" + slug + ".json");
      if (obj) payload = JSON.parse(await obj.text()) as R2Payload;
    } catch (_) { /* R2 miss */ }
  }

  if (!payload) {
    try {
      const res = await fetch("https://media.gworky.com/data/pseo/" + category + "/" + slug + ".json", {
        headers: { "User-Agent": "ZaditEdgeBot/1.0" },
      });
      if (res.ok) payload = await res.json() as R2Payload;
    } catch (_) { /* CDN miss */ }
  }

  // Step 3: Synthesize minimal payload from D1 data
  if (!payload) {
    const label = CATEGORY_LABELS[category];
    payload = {
      title: entity.title,
      metaDescription: label + " profesional di " + entity.area_served + ". Solusi berbasis Cloudflare Edge dengan performa terukur.",
      localOrIndustryContext: entity.area_served + " membutuhkan solusi " + label.toLowerCase() + " yang handal dan efisien untuk mendukung pertumbuhan bisnis digital.",
      hybridComparison: {
        contextTradeOff: "Memilih antara penyedia konvensional vs arsitektur edge modern.",
        alternativeStrengths: "Penyedia konvensional memiliki portofolio luas namun biaya operasional tinggi.",
        zaditFitContext: "Zadit menghadirkan solusi teknikal modern dengan infrastruktur Rp 0/bulan.",
        comparisonTable: [
          { criterion: "Biaya Operasional", traditionalAgency: "Rp 300rb-2jt/bulan", freelancePlatform: "Bervariasi", zaditEngineering: "Rp 0 infrastruktur" },
          { criterion: "Performa TTFB", traditionalAgency: "500ms-1.8s", freelancePlatform: "Bergantung hosting", zaditEngineering: "< 50ms Edge Global" },
        ],
      },
      faq: [{ question: "Apa keunggulan Zadit di " + entity.area_served + "?", answer: "Zadit menggunakan infrastruktur Cloudflare Edge yang memastikan performa optimal, keamanan enterprise, dan biaya Rp 0/bulan." }],
      rootDomainLink: { anchorText: "layanan " + label.toLowerCase() + " profesional", targetUrl: CATEGORY_SERVICE_LINKS[category] || "/layanan" },
    };
  }

  // Step 4: Render semantic HTML
  const label = CATEGORY_LABELS[category];
  const svcLink = CATEGORY_SERVICE_LINKS[category] || "/layanan";
  const canonical = "https://muhzadit.pages.dev/direktori/" + category + "/" + slug;
  const year = new Date().getFullYear();

  const rows = payload.hybridComparison.comparisonTable.map(r =>
    "<tr><td><strong>" + r.criterion + "</strong></td><td>" + r.traditionalAgency + "</td><td>" + r.freelancePlatform + "</td><td style=\"color:#059669;font-weight:600\">" + r.zaditEngineering + "</td></tr>"
  ).join("");

  const faqs = payload.faq.map(f =>
    "<div itemscope itemprop=\"mainEntity\" itemtype=\"https://schema.org/Question\"><h3 itemprop=\"name\">" + f.question + "</h3><div itemscope itemprop=\"acceptedAnswer\" itemtype=\"https://schema.org/Answer\"><p itemprop=\"text\">" + f.answer + "</p></div></div>"
  ).join("");

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "LocalBusiness", "@id": "https://muhzadit.pages.dev/#business", name: "Zadit Engineering", description: payload.metaDescription, url: "https://muhzadit.pages.dev", areaServed: { "@type": "City", name: entity.area_served, sameAs: entity.wikidata_uri } },
      { "@type": "FAQPage", mainEntity: payload.faq.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: "https://muhzadit.pages.dev" },
        { "@type": "ListItem", position: 2, name: "Direktori", item: "https://muhzadit.pages.dev/direktori/" },
        { "@type": "ListItem", position: 3, name: label, item: "https://muhzadit.pages.dev/direktori/" + category },
        { "@type": "ListItem", position: 4, name: entity.area_served, item: canonical },
      ]},
    ],
  });

  const html = "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>" + payload.title + "</title>\n<meta name=\"description\" content=\"" + payload.metaDescription + "\">\n<link rel=\"canonical\" href=\"" + canonical + "\">\n<meta name=\"robots\" content=\"index,follow,max-snippet:-1,max-image-preview:large\">\n<script type=\"application/ld+json\">" + jsonLd + "</script>\n<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,-apple-system,sans-serif;color:#0f172a;background:#f8fafc;line-height:1.6}.c{max-width:900px;margin:0 auto;padding:1rem 1.5rem}nav.bc{font-size:.8rem;color:#64748b;padding:.75rem 0}nav.bc a{color:#0ea5e9;text-decoration:none}h1{font-size:clamp(1.4rem,4vw,2rem);font-weight:700;margin:1rem 0 .5rem}.bluf{background:#f0f9ff;border-left:4px solid #0ea5e9;padding:1rem 1.25rem;border-radius:0 8px 8px 0;margin:1rem 0 1.5rem;font-size:.97rem}.bluf strong{display:block;font-size:.7rem;text-transform:uppercase;letter-spacing:.05em;color:#0284c7;margin-bottom:.3rem}h2{font-size:1.2rem;font-weight:600;margin:2rem 0 .75rem}table{width:100%;border-collapse:collapse;font-size:.88rem;margin:1rem 0}th{background:#1e293b;color:#f8fafc;padding:.55rem .75rem;text-align:left}td{padding:.5rem .75rem;border-bottom:1px solid #e2e8f0}.faq h3{font-size:.97rem;font-weight:600;margin:1.2rem 0 .4rem}.faq p{font-size:.9rem;color:#374151}.cta{background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff;border-radius:12px;padding:1.5rem;text-align:center;margin:2rem 0}.cta p{margin-bottom:1rem}.cta a{display:inline-block;background:#fff;color:#0ea5e9;font-weight:700;padding:.65rem 1.5rem;border-radius:8px;text-decoration:none}footer{border-top:1px solid #e2e8f0;padding:1.5rem 0;text-align:center;font-size:.8rem;color:#94a3b8}footer a{color:#0ea5e9;text-decoration:none}</style>\n</head>\n<body>\n<div class=\"c\">\n<nav class=\"bc\"><a href=\"/\">Beranda</a> › <a href=\"/direktori/\">Direktori</a> › <a href=\"/direktori/" + category + "\">" + label + "</a> › <span>" + entity.area_served + "</span></nav>\n<h1>" + payload.title + "</h1>\n<div class=\"bluf\"><strong>Jawaban Ringkas</strong>" + payload.localOrIndustryContext + "</div>\n<h2>Perbandingan jujur: Zadit vs. alternatif di " + entity.area_served + "</h2>\n<p style=\"font-size:.85rem;color:#64748b;margin-bottom:.75rem\">" + payload.hybridComparison.contextTradeOff + "</p>\n<div style=\"overflow-x:auto\"><table><thead><tr><th>Kriteria</th><th>Agensi Konvensional</th><th>Freelancer/Platform</th><th>Zadit Engineering</th></tr></thead><tbody>" + rows + "</tbody></table></div>\n<p style=\"font-size:.82rem;color:#64748b;font-style:italic;margin-top:.5rem\">" + payload.hybridComparison.alternativeStrengths + "</p>\n<h2>Pertanyaan yang sering diajukan</h2>\n<div class=\"faq\" itemscope itemtype=\"https://schema.org/FAQPage\">" + faqs + "</div>\n<div class=\"cta\"><p>Siap memulai proyek " + label.toLowerCase() + " di " + entity.area_served + "?<br>Konsultasi awal gratis — tanpa komitmen.</p><a href=\"/audit\" id=\"cta-direktori\">Cek Performa Website Anda →</a></div>\n<p style=\"font-size:.88rem;color:#475569;margin-bottom:2rem\">Lihat <a href=\"" + svcLink + "\">" + payload.rootDomainLink.anchorText + "</a> untuk gambaran lengkap.</p>\n</div>\n<footer><div class=\"c\"><p>© " + year + " Zadit Engineering · <a href=\"/\">Beranda</a> · <a href=\"/direktori/\">Direktori</a> · <a href=\"/audit\">Audit Web</a></p></div></footer>\n</body>\n</html>";

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400",
      "X-Robots-Tag": "index, follow",
      "X-Edge-Rendered": "1",
    },
  });
};
