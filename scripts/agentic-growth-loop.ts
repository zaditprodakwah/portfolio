// scripts/agentic-growth-loop.ts
import fs from 'fs';
import path from 'path';

// Load env file if available (Node 20+)
try {
  process.loadEnvFile?.('.env.local');
} catch (e) {
  // Ignored if file doesn't exist
}

const solutionsDirectory = path.join(process.cwd(), 'content/solutions');

// Pastikan direktori ada
if (!fs.existsSync(solutionsDirectory)) {
  fs.mkdirSync(solutionsDirectory, { recursive: true });
}

// ==========================================
// 1. LLM Smart Fallback System
// ==========================================
async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");
  console.log("[LLM] Mencoba Gemini API...");
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, responseMimeType: "application/json" }
    })
  });

  if (!response.ok) throw new Error(`Gemini Error: ${response.statusText}`);
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

async function callGroq(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is missing");
  console.log("[LLM] Fallback: Mencoba Groq API...");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) throw new Error(`Groq Error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callWorkersAI(prompt: string): Promise<string> {
  const apiKey = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!apiKey || !accountId) throw new Error("CF Tokens missing");
  console.log("[LLM] Fallback: Mencoba Cloudflare Workers AI...");

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3-8b-instruct`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) throw new Error(`Workers AI Error: ${response.statusText}`);
  const data = await response.json();
  return data.result.response;
}

async function generateWithSmartFallback(prompt: string): Promise<string> {
  try {
    return await callGemini(prompt);
  } catch (err) {
    console.error("Gemini gagal:", err);
    try {
      return await callGroq(prompt);
    } catch (err2) {
      console.error("Groq gagal:", err2);
      try {
        const text = await callWorkersAI(prompt + "\n\nRETURN ONLY VALID JSON WITHOUT MARKDOWN BLOCKS OR OTHER TEXT.");
        const match = text.match(/\{[\s\S]*\}/);
        if (match) return match[0];
        return text;
      } catch (err3) {
        throw new Error("Semua LLM Fallback gagal. Aborting.");
      }
    }
  }
}

// ==========================================
// 2. Intent Discovery & Generation
// ==========================================

const promptTemplate = `Anda adalah seorang Growth Hacker & Pakar SEO Executive Portfolio (untuk Muhammad Khoiruzzadittaqwa / Zadit).
Tugas Anda adalah memikirkan SATU masalah pencarian ber-intent tinggi (long-tail keyword) yang sering dicari oleh klien eksekutif (terkait manajemen operasional bisnis, konsultasi SEO, olah data statistik SINTA/SPSS, atau optimasi web performa tinggi). 

Kemudian, hasilkan data JSON murni untuk halaman pSEO "Solusi Programmatik" baru yang menyasar kata kunci tersebut.
Anda HARUS menghasilkan struktur JSON berikut dan TIDAK BOLEH MENGANDUNG APA PUN SELAIN JSON (tanpa markdown).

Struktur Wajib:
{
  "slug": "string-url-friendly-maks-5-kata",
  "pillarId": "dokumen-administrasi-bisnis", // pilih salah satu yang relevan: dokumen-administrasi-bisnis, seo-konten-konversi, olah-data-statistik-sinta, solusi-web-performa
  "pillarName": "Nama pilar",
  "title": "Judul Menarik (H1)",
  "metaDescription": "Deskripsi meta untuk SEO (150-160 karakter)",
  "focusKeyword": "kata kunci utama",
  "secondaryKeywords": ["kunci 1", "kunci 2"],
  "directAnswer": {
    "summary": "Ringkasan jawaban BLUF (Bottom Line Up Front) untuk Google AI Overviews",
    "takeaways": ["Takeaway 1", "Takeaway 2"]
  },
  "triadFramework": {
    "stakeholderDilemma": "Masalah utama audiens",
    "diplomaticNavigation": "Pendekatan diplomatis Zadit",
    "executionDeliverable": "Deliverable akhir"
  },
  "impactDashboard": {
    "businessRoi": [ { "label": "Metrik Bisnis", "value": "Misal: 40% Lebih Efisien" } ],
    "technicalRigor": [ { "label": "Metrik Teknis", "value": "Nilai" } ]
  },
  "competitorMatrix": [
    {
      "dimension": "Fokus Solusi",
      "ourSolution": "Pendekatan Zadit yang superior",
      "legacyAgency": "Pendekatan Agensi Konvensional",
      "cheapFreelance": "Pendekatan Freelancer Murah"
    }
  ],
  "faq": [
    { "question": "Pertanyaan yang sering diajukan", "answer": "Jawaban" }
  ],
  "relatedEntities": ["Entitas 1", "Entitas 2"]
}
`;

async function main() {
  console.log("=== Memulai Agentic Growth Loop ===");
  try {
    const jsonString = await generateWithSmartFallback(promptTemplate);
    const parsed = JSON.parse(jsonString);

    if (!parsed.slug || !parsed.title) {
      throw new Error("JSON tidak valid atau tidak lengkap.");
    }

    const filePath = path.join(solutionsDirectory, `${parsed.slug}.json`);
    
    if (fs.existsSync(filePath)) {
      console.log(`[SKIPPED] Solusi ${parsed.slug} sudah ada.`);
      process.exit(0);
    }

    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), "utf8");
    console.log(`[BERHASIL] Menghasilkan rute pSEO baru: ${parsed.slug}.json`);

  } catch (error) {
    console.error("[ERROR] Agentic Growth Loop Gagal:", error);
    process.exit(1);
  }
}

main();
