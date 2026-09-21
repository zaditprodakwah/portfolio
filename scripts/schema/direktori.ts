import { z } from "zod";

export const PSEODirectoryItemSchema = z.object({
  category: z.enum(["web", "seo", "sinta", "bisnis"]),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  type: z.enum(["local", "industry", "semantic"]),
  title: z.string().min(10),
  metaDescription: z.string().min(50).max(200),
  targetKeyword: z.string().min(5),
  areaServed: z.string().min(3),
  wikidataUri: z.string().url().startsWith("https://www.wikidata.org/wiki/"),
  localOrIndustryContext: z.string().min(50),
  hybridComparison: z.object({
    contextTradeOff: z.string().min(30),
    alternativeStrengths: z.string().min(30),
    zaditFitContext: z.string().min(30),
    comparisonTable: z.array(
      z.object({
        criterion: z.string().min(3),
        traditionalAgency: z.string().min(5),
        freelancePlatform: z.string().min(5),
        zaditEngineering: z.string().min(5),
      })
    ).min(3),
  }),
  rootDomainLink: z.object({
    anchorText: z.string().min(10), // Multi-word entity anchor invariant
    targetUrl: z.literal("https://muhzadit.pages.dev/"),
  }),
  faq: z.array(
    z.object({
      question: z.string().min(10),
      answer: z.string().min(20),
    })
  ).min(2),
});

export const PSEOMatrixSchema = z.array(PSEODirectoryItemSchema);
