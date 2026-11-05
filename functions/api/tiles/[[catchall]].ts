/**
 * Cloudflare Pages Edge Function: /api/tiles/[[catchall]]
 * 
 * Proxies and caches raster basemap tiles securely at the Cloudflare Edge.
 * Prevents API key exposure in public client code and DevTools.
 * Enforces strict SSRF validation, path sanitization, and 30-day edge caching.
 */

interface Env {
  CARTO_API_KEY?: string;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context;
  const url = new URL(request.url);

  // 1. Path Parsing & Strict Whitelist Validation (Anti-SSRF / Anti-Path-Traversal)
  // Expected path format: /api/tiles/:style/:z/:x/:y[@2x].png
  const prefix = "/api/tiles/";
  const index = url.pathname.indexOf(prefix);
  if (index === -1) {
    return new Response(JSON.stringify({ error: "Endpoint tidak valid." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const subPath = url.pathname.slice(index + prefix.length);
  const match = subPath.match(/^(light_all|voyager|dark_all)\/(\d{1,2})\/(\d+)\/(\d+)(@2x)?\.png$/);

  if (!match) {
    return new Response(JSON.stringify({ error: "Parameter ubin kartografi tidak valid." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const [, style, zStr, xStr, yStr, retina] = match;
  const z = parseInt(zStr, 10);
  const x = parseInt(xStr, 10);
  const y = parseInt(yStr, 10);

  // Validate zoom range (Web Mercator 0 - 20)
  if (z < 0 || z > 20 || x < 0 || y < 0) {
    return new Response(JSON.stringify({ error: "Koordinat ubin di luar batas jangkauan." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 2. Cloudflare Edge Cache Verification
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

  // 3. Upstream Fetch to CARTO with Server-Side Secret Key
  const apiKey = env.CARTO_API_KEY || "cb1_52p0_1_c919c75f025b6585c436eb41";
  const retinaSuffix = retina || "";
  const upstreamUrl = `https://basemaps.cartocdn.com/rastertiles/${style}/${z}/${x}/${y}${retinaSuffix}.png?key=${apiKey}`;

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

    if (cache) {
      context.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
  } catch (err: any) {
    return new Response("Kesalahan internal saat memproses ubin spasial.", { status: 500 });
  }
}
