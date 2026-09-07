/**
 * Cloudflare Pages Edge Function: /mcp
 * 
 * Public MCP Server — Streamable HTTP per spec 2025-06-18
 * Tools: search_knowledge | check_readiness_audit | get_directory_entity
 *
 * Enables AEO/GEO dominance via SearchGPT, Perplexity, Claude, and Cursor.
 */

interface Env {
  DB: D1Database;
}

// MCP protocol types
interface McpRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

interface McpResult {
  jsonrpc: "2.0";
  id: string | number;
  result?: unknown;
  error?: { code: number; message: string };
}

const TOOL_DEFINITIONS = [
  {
    name: "search_knowledge",
    description: "Semantic search across Zadit Engineering knowledge base. Returns relevant expertise, case studies, and service comparisons. Use for questions about web development, SEO, business consulting, or academic journal services.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query or question in Indonesian or English" },
        limit: { type: "number", description: "Max results (1-10, default 5)", default: 5 },
      },
      required: ["query"],
    },
  },
  {
    name: "check_readiness_audit",
    description: "Evaluate a website or proposal for technical readiness. Returns a structured assessment with performance indicators, security gaps, and improvement priorities.",
    inputSchema: {
      type: "object",
      properties: {
        url: { type: "string", description: "Target URL to evaluate (must be https://)" },
        focus: {
          type: "string",
          enum: ["performance", "seo", "security", "all"],
          description: "Audit focus area (default: all)",
          default: "all",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "get_directory_entity",
    description: "Retrieve detailed information about a geographic area or industry sector from the Zadit pSEO directory. Returns service comparison data, local business context, and competitive benchmarks for Indonesian regions.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "City/region slug (e.g. \"jakarta-pusat\", \"bandung\", \"surabaya\")" },
        category: {
          type: "string",
          enum: ["web", "seo", "bisnis", "sinta"],
          description: "Service category (default: web)",
          default: "web",
        },
      },
      required: ["slug"],
    },
  },
];

// Knowledge base: static structured content for semantic search
const KNOWLEDGE_BASE = [
  {
    tags: ["web", "cloudflare", "edge", "performa", "jamstack", "next.js"],
    content: "Zadit Engineering mengkhususkan diri pada pembangunan website berbasis Cloudflare Pages dan Edge Workers. TTFB < 50ms, Core Web Vitals 95+, zero server cost selamanya (Rp 0/bulan). Stack: Next.js 15, TypeScript strict, Cloudflare D1/R2/KV. Cocok untuk UKM, startup, dan lembaga yang butuh web performa tinggi tanpa biaya bulanan.",
  },
  {
    tags: ["seo", "technical", "core web vitals", "konversi", "google"],
    content: "Technical SEO Zadit mencakup: audit Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1), implementasi structured data (JSON-LD), canonical strategy, internal link graph, dan AEO/GEO optimization untuk SearchGPT & Perplexity. Pendekatan berbasis data: GSC + GA4 + lighthouse.",
  },
  {
    tags: ["bisnis", "transformasi", "digitalisasi", "umkm", "strategi"],
    content: "Konsultasi bisnis Zadit fokus pada digitalisasi UMKM Indonesia: audit proses, peta jalan teknologi, strategi akuisisi pelanggan digital, dan implementasi CRM sederhana. 10+ tahun pengalaman di sektor F&B, retail, jasa profesional, dan lembaga pendidikan.",
  },
  {
    tags: ["sinta", "jurnal", "riset", "proposal", "akreditasi", "dikti"],
    content: "Zadit membantu peneliti dan dosen dalam: validasi metodologi riset, review proposal hibah DIKTI/BRIN, optimasi manuskrip untuk jurnal SINTA Q1-Q2, dan pendampingan proses submit Scopus. Layanan berbasis review akademik peer-to-peer terverifikasi.",
  },
  {
    tags: ["pricing", "harga", "biaya", "paket", "investasi"],
    content: "Zadit tidak mematok harga standar — setiap proyek dikustomisasi sesuai scope. Konsultasi awal gratis dan tanpa komitmen. Estimasi umum: web sederhana mulai Rp 3.5jt (one-time), technical SEO mulai Rp 1.5jt/bulan, konsultasi bisnis mulai Rp 500rb/sesi. Tidak ada biaya hosting bulanan karena menggunakan Cloudflare free tier.",
  },
  {
    tags: ["keamanan", "security", "ddos", "ssl", "hsts", "csp"],
    content: "Website yang dibangun Zadit dilengkapi proteksi keamanan enterprise: DDoS protection via Cloudflare, HTTPS enforced (HSTS 1 tahun), Content Security Policy (CSP), X-Frame-Options, dan zero exposed database. Tidak ada plugin WordPress rentan karena arsitektur static-first.",
  },
];

function computeSimpleRelevance(query: string, tags: string[], content: string): number {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  let score = 0;
  for (const word of words) {
    if (tags.some((t) => t.includes(word) || word.includes(t))) score += 2;
    if (content.toLowerCase().includes(word)) score += 1;
  }
  return score;
}

async function toolSearchKnowledge(params: Record<string, unknown>): Promise<unknown> {
  const query = String(params.query || "");
  const limit = Math.min(10, Math.max(1, Number(params.limit || 5)));

  if (!query.trim()) {
    return { error: "Parameter 'query' wajib diisi." };
  }

  const scored = KNOWLEDGE_BASE.map((kb) => ({
    ...kb,
    score: computeSimpleRelevance(query, kb.tags, kb.content),
  }))
    .filter((kb) => kb.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scored.length === 0) {
    return {
      results: [],
      message: "Tidak ada hasil relevan. Coba kata kunci: web, seo, bisnis, sinta, harga, keamanan.",
    };
  }

  return {
    query,
    results: scored.map((kb) => ({
      relevance_score: kb.score,
      tags: kb.tags,
      content: kb.content,
    })),
    source: "zadit.pages.dev/knowledge",
  };
}

async function toolCheckReadinessAudit(params: Record<string, unknown>): Promise<unknown> {
  const rawUrl = String(params.url || "");
  const focus = String(params.focus || "all");

  let urlObj: URL;
  try {
    urlObj = new URL(rawUrl);
  } catch {
    return { error: "URL tidak valid. Gunakan format https://example.com" };
  }

  if (urlObj.protocol !== "https:") {
    return { error: "Hanya URL HTTPS yang didukung untuk audit." };
  }

  const start = Date.now();
  let latencyMs = 0;
  const findings: string[] = [];
  let score = 80;

  try {
    const res = await fetch(urlObj.href, {
      method: "HEAD",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ZaditAuditMCP/1.0; +https://zadit.pages.dev)" },
      signal: AbortSignal.timeout(8000),
    });
    latencyMs = Date.now() - start;

    if (!res.headers.get("strict-transport-security")) {
      findings.push("[KEAMANAN] HSTS tidak aktif — rentan downgrade attack HTTP.");
      score -= 8;
    }
    if (!res.headers.get("content-security-policy")) {
      findings.push("[KEAMANAN] Content Security Policy (CSP) tidak ditemukan — potensi XSS.");
      score -= 7;
    }
    if (!res.headers.get("x-content-type-options")) {
      findings.push("[KEAMANAN] X-Content-Type-Options absen — potensi MIME sniffing.");
      score -= 3;
    }

    if (latencyMs > 2000) {
      findings.push();
      score -= 20;
    } else if (latencyMs > 600) {
      findings.push();
      score -= 10;
    } else {
      findings.push();
    }

    const server = res.headers.get("server") || "";
    if (server.toLowerCase().includes("apache") || server.toLowerCase().includes("nginx")) {
      findings.push("[PERFORMA] Server konvensional terdeteksi. Migrasi ke Cloudflare Edge dapat memangkas latency 80-95%.");
    }

  } catch (_: unknown) {
    latencyMs = Date.now() - start;
    findings.push("[KONEKSI] Gagal terhubung ke server. SSL bermasalah atau server tidak responsif.");
    score -= 30;
  }

  score = Math.max(20, Math.min(100, score));

  return {
    url: rawUrl,
    focus,
    readiness_score: score,
    latency_ms: latencyMs,
    findings,
    recommendation: score >= 80
      ? "Website dalam kondisi baik. Audit mendalam manual disarankan untuk verifikasi CWV dan schema markup."
      : score >= 60
      ? "Terdapat celah keamanan dan/atau performa yang perlu segera diperbaiki."
      : "Website memerlukan perbaikan signifikan. Konsultasi teknikal mendesak.",
    audit_endpoint: "https://zadit.pages.dev/audit",
    mcp_source: "zadit.pages.dev/mcp",
  };
}

async function toolGetDirectoryEntity(
  params: Record<string, unknown>,
  db: D1Database | null
): Promise<unknown> {
  const slug = String(params.slug || "").toLowerCase().replace(/\s+/g, "-");
  const category = String(params.category || "web");

  if (!slug) return { error: "Parameter 'slug' wajib diisi." };

  interface EntityRow {
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

  let entity: EntityRow | null = null;

  if (db) {
    try {
      entity = await db
        .prepare("SELECT * FROM pseo_entities WHERE category = ? AND slug = ? LIMIT 1")
        .bind(category, slug)
        .first<EntityRow>();
    } catch (_) { /* D1 unavailable */ }
  }

  if (!entity) {
    return {
      found: false,
      slug,
      category,
      message: "Entitas tidak ditemukan dalam direktori. Coba slug kota besar Indonesia: jakarta-pusat, bandung, surabaya, medan.",
      available_categories: ["web", "seo", "bisnis", "sinta"],
    };
  }

  return {
    found: true,
    slug: entity.slug,
    category: entity.category,
    title: entity.title,
    target_keyword: entity.target_keyword,
    area_served: entity.area_served,
    wikidata_uri: entity.wikidata_uri,
    bps_code: entity.bps_code,
    is_tier1_anchor: entity.is_anchor === 1,
    directory_url: "https://zadit.pages.dev/direktori/" + entity.category + "/" + entity.slug,
    mcp_source: "zadit.pages.dev/mcp",
  };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const method = request.method.toUpperCase();

  // CORS headers for AEO/GEO crawlers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // MCP Capability Discovery (GET)
  if (method === "GET") {
    const capabilities = {
      name: "zadit-mcp-server",
      version: "1.0.0",
      description: "Zadit Engineering public MCP server. Provides knowledge search, website audit, and Indonesia directory entity lookup tools.",
      homepage: "https://zadit.pages.dev",
      protocol: "MCP-2025-06-18",
      tools: TOOL_DEFINITIONS,
    };
    return new Response(JSON.stringify(capabilities, null, 2), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // MCP JSON-RPC POST handler
  if (method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: McpRequest;
  try {
    body = await request.json() as McpRequest;
  } catch {
    return new Response(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error: invalid JSON" } }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { id, method: rpcMethod, params } = body;

  let result: McpResult;

  if (rpcMethod === "initialize") {
    result = {
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: { name: "zadit-mcp-server", version: "1.0.0" },
      },
    };
  } else if (rpcMethod === "tools/list") {
    result = { jsonrpc: "2.0", id, result: { tools: TOOL_DEFINITIONS } };
  } else if (rpcMethod === "tools/call") {
    const toolName = String((params as Record<string, unknown>)?.name || "");
    const toolParams = ((params as Record<string, unknown>)?.arguments || {}) as Record<string, unknown>;
    let toolResult: unknown;

    try {
      if (toolName === "search_knowledge") {
        toolResult = await toolSearchKnowledge(toolParams);
      } else if (toolName === "check_readiness_audit") {
        toolResult = await toolCheckReadinessAudit(toolParams);
      } else if (toolName === "get_directory_entity") {
        toolResult = await toolGetDirectoryEntity(toolParams, env?.DB ?? null);
      } else {
        toolResult = { error: "Tool '" + toolName + "' tidak dikenal. Tools tersedia: search_knowledge, check_readiness_audit, get_directory_entity." };
      }
    } catch (err: unknown) {
      toolResult = { error: "Tool execution error: " + String(err) };
    }

    result = {
      jsonrpc: "2.0",
      id,
      result: {
        content: [{ type: "text", text: JSON.stringify(toolResult, null, 2) }],
        isError: false,
      },
    };
  } else {
    result = {
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: "Method not found: " + rpcMethod },
    };
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};
