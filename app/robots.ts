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
        userAgent: [
          "Googlebot",
          "Bingbot",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
          "CloudflareBrowserRenderingCrawler",
        ],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: ["GPTBot", "PerplexityBot", "ClaudeBot", "Google-Extended", "Applebot"],
        allow: [
          "/",
          "/direktori/",
          "/solusi/",
          "/wawasan/",
          "/layanan/",
          "/audit/",
          "/cv/",
          "/llms.txt",
          "/llms-full.txt",
          "/llms.json",
          "/feed.xml",
          "/cv.json",
          "/.well-known/agent.json",
        ],
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://muhzadit.pages.dev/sitemap.xml",
  };
}
