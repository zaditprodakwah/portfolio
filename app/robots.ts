import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: ["GPTBot", "PerplexityBot", "ClaudeBot", "Google-Extended", "Applebot"],
        allow: ["/", "/llms.txt", "/cv.json", "/.well-known/agent.json", "/wawasan", "/solusi/", "/layanan/"],
      },
    ],
    sitemap: "https://zadit.pages.dev/sitemap.xml",
  };
}
