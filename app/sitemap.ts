import { MetadataRoute } from "next";
import { getAllSolutions } from "@/lib/solutions";
import { getAllWawasan } from "@/lib/wawasan";
import { getAllDirectoryItems } from "@/lib/direktori";
import { getCanonicalUrl } from "@/lib/canonical-registry";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // 1. Static Core & Hub Routes
  const staticPaths = [
    "/",
    "/audit/",
    "/cv/",
    "/layanan/",
    "/layanan/dokumen-administrasi-bisnis/",
    "/layanan/seo-konten-konversi/",
    "/layanan/olah-data-statistik-sinta/",
    "/layanan/solusi-web-performa/",
    "/solusi/",
    "/wawasan/",
    "/direktori/",
    "/web3/",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: getCanonicalUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1.0 : 0.9,
  }));

  // 2. Dynamic Solutions Routes
  const solutions = getAllSolutions();
  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: getCanonicalUrl(`/solusi/${s.slug}/`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Dynamic Editorial Teardowns Routes
  const teardowns = getAllWawasan();
  const teardownRoutes: MetadataRoute.Sitemap = teardowns.map((w) => ({
    url: getCanonicalUrl(`/wawasan/${w.slug}/`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. Dynamic pSEO Directory Routes
  const directoryItems = getAllDirectoryItems();
  const directoryRoutes: MetadataRoute.Sitemap = directoryItems.map((d) => ({
    url: getCanonicalUrl(`/direktori/${d.category}/${d.slug}/`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...solutionRoutes, ...teardownRoutes, ...directoryRoutes];
}
