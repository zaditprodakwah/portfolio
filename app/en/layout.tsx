import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precision Data, Document Engineering & Fullstack Web | Muhammad Khoiruzzadittaqwa",
  description: "Deterministic data processing, PDF statement parsing, OpenXML DOCX formatting, sub-second web platforms, and strategic business consulting.",
  alternates: {
    canonical: "https://muhzadit.pages.dev/en/",
    languages: {
      "id-ID": "https://muhzadit.pages.dev/",
      "en-US": "https://muhzadit.pages.dev/en/",
      "x-default": "https://muhzadit.pages.dev/",
    },
  },
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
