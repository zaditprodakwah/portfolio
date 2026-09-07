// scripts/harvest_pseo_signals.ts
// Zero-cost real search signals scraper (Google Autocomplete API + Wikidata Entity Resolver)

export interface SearchSignal {
  query: string;
  suggestions: string[];
  entity?: {
    id: string;
    label: string;
    description: string;
    uri: string;
  };
}

/**
 * Mengambil saran pencarian riil dari Google Autocomplete (Zero Cost, No API Key needed)
 */
export async function fetchGoogleSuggestions(query: string): Promise<string[]> {
  const encoded = encodeURIComponent(query);
  const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encoded}&hl=id`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    });

    if (!response.ok) return [];
    const data = await response.json();
    // Format response: [query, [suggestions...], ...]
    if (Array.isArray(data) && Array.isArray(data[1])) {
      return data[1].slice(0, 8);
    }
    return [];
  } catch (err) {
    console.warn(`[Harvester] Gagal mengambil autocomplete untuk: ${query}`, err);
    return [];
  }
}

/**
 * Mencari entitas resmi di Wikidata API publik (Zero Cost)
 */
export async function resolveWikidataEntity(term: string): Promise<SearchSignal["entity"] | undefined> {
  const encoded = encodeURIComponent(term);
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encoded}&language=id&format=json&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "ZaditPagesHarvester/1.0 (https://zadit.pages.dev)",
      },
    });

    if (!response.ok) return undefined;
    const data = await response.json();

    if (data.search && data.search.length > 0) {
      const top = data.search[0];
      return {
        id: top.id,
        label: top.label,
        description: top.description || "",
        uri: `https://www.wikidata.org/wiki/${top.id}`,
      };
    }
    return undefined;
  } catch {
    return undefined;
  }
}

// CLI Testing Runner
async function main() {
  const testQuery = process.argv[2] || "jasa olah data spss";
  console.log(`[Harvester] Mengikis sinyal riil untuk: "${testQuery}"...`);

  const suggestions = await fetchGoogleSuggestions(testQuery);
  console.log("[Harvester] Rekomendasi Google Autocomplete Riil:", suggestions);

  const entity = await resolveWikidataEntity("Surabaya");
  console.log("[Harvester] Resolusi Entitas Wikidata Surabaya:", entity);
}

if (process.argv[1]?.endsWith("harvest_pseo_signals.ts")) {
  main();
}
