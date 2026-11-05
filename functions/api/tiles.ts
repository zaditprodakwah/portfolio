/**
 * Cloudflare Pages Edge Function: /api/tiles
 * 
 * Secure raster tile proxy for CARTO Basemaps.
 * Protects CARTO API keys from client exposure (OWASP A04/A07).
 * Caches raster tiles at Cloudflare Edge for 30 days.
 */

interface Env {
  CARTO_API_KEY?: string;
}

export async function onRequestGet(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);

  // 1. Query Parameter Extraction
  const s = url.searchParams.get("s") || "light_all";
  const zStr = url.searchParams.get("z");
  const xStr = url.searchParams.get("x");
  const yStr = url.searchParams.get("y");
  const r = url.searchParams.get("r") || "";

  // 2. Strict Whitelist & SSRF Guardrails
  const allowedStyles = ["light_all", "voyager", "dark_all"];
  if (!allowedStyles.includes(s)) {
    return new Response(JSON.stringify({ error: "Gaya ubin tidak diizinkan." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!zStr || !xStr || !yStr) {
    return new Response(JSON.stringify({ error: "Parameter z, x, dan y wajib diisi." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const z = parseInt(zStr, 10);
  const x = parseInt(xStr, 10);
  const y = parseInt(yStr, 10);

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

  // 4. Fetch from Upstream CARTO with Server-Side Secret Key
  const apiKey = env.CARTO_API_KEY || "cb1_52p0_1_c919c75f025b6585c436eb41";
  const retinaSuffix = r === "@2x" ? "@2x" : "";
  const upstreamUrl = `https://basemaps.cartocdn.com/rastertiles/${s}/${z}/${x}/${y}${retinaSuffix}.png?key=${apiKey}`;

  try {
    const upstreamRes = await fetch(upstreamUrl, {
      cf: {
        cacheEverything: true,
        cacheTtl: 2592000 // 30 days CDN cache
      } as any
    });

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
