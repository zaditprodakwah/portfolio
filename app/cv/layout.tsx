import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum Vitae (CV) Eksekutif | Muhammad Khoiruzzadittaqwa",
  description: "Pratinjau CV profesional, riwayat pencapaian, rekam jejak freelance Sribulancer rating 5.0, dan unduh format PDF RenderCV resmi.",
  alternates: {
    canonical: "https://muhzadit.pages.dev/cv/"
  },
  openGraph: {
    title: "Curriculum Vitae (CV) Eksekutif | Muhammad Khoiruzzadittaqwa",
    description: "Pratinjau CV profesional, riwayat pencapaian, rekam jejak terverifikasi, dan unduh format PDF RenderCV resmi.",
    url: "https://muhzadit.pages.dev/cv/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Khoiruzzadittaqwa - Curriculum Vitae Eksekutif",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Curriculum Vitae (CV) Eksekutif | Muhammad Khoiruzzadittaqwa",
    description: "Pratinjau CV profesional, riwayat pencapaian, dan unduh format PDF RenderCV resmi.",
    images: ["/og-image.jpg"]
  }
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
