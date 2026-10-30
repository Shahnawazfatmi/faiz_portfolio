import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-sora", display: "swap" });

const title = `${SITE.creator.name} · ${SITE.creator.brand} | Creator from Patna, Bihar`;
const description =
  "Official website of Arif Hassan (Viral Vlog Rounderz), a Patna-based creator with 375K+ followers and 14M+ views on YouTube, Instagram and Facebook. Brand collaborations in budget tech, pre-owned cars and bikes, wholesale markets and pet care.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s | ${SITE.creator.name} · ${SITE.creator.brand}` },
  description,
  applicationName: SITE.creator.brand,
  authors: [{ name: SITE.creator.name, url: SITE.url }],
  creator: SITE.creator.name,
  publisher: SITE.creator.name,
  keywords: [
    "Arif Hassan", "Viral Vlog Rounderz", "Patna YouTuber", "Bihar influencer", "Patna influencer marketing",
    "second hand laptop Patna", "used car vlog", "wholesale market vlog", "pet market Patna",
    "influencer collaboration Bihar", "creator media kit", "brand collaboration India",
  ],
  category: "Influencer Marketing",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: "/",
    siteName: `${SITE.creator.name} · ${SITE.creator.brand}`,
    title,
    description,
    firstName: "Arif",
    lastName: "Hassan",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Arif Hassan, creator of Viral Vlog Rounderz" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#07070c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
