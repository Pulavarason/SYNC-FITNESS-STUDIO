import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Mind • Body • Power | ${site.locality}, Chennai`,
    template: `%s | ${site.name}`,
  },
  description:
    "SYNC Fitness Studio in Valasaravakkam, Chennai. Sync your body. Unlock your potential. Weight training, strength, cardio, muscle building and weight loss — 24/7.",
  keywords: ["SYNC Fitness Studio", "gym in Valasaravakkam", "fitness studio Chennai", "strength training Chennai", "24/7 gym Chennai"],
  openGraph: {
    title: `${site.name} — Mind • Body • Power`,
    description: "Sync your body. Unlock your potential. Valasaravakkam, Chennai.",
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", title: site.name, description: "Mind • Body • Power — Valasaravakkam, Chennai." },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: site.name,
    slogan: "Mind • Body • Power",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
      streetAddress: site.locality,
    },
  };

  return (
    <html lang="en-IN">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
