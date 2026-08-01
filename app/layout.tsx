import type { Metadata } from "next";
// @ts-ignore: CSS import without type declarations
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site-config";
import { Plus_Jakarta_Sans } from "next/font/google";
import { PageTransition } from "@/components/layout/PageTransition";
import { NavLoadingIndicator } from "@/components/layout/NavLoadingIndicator";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { MobileScrollBlur } from "@/components/ui/MobileScrollBlur";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "Muhammad Azka Zahrani",
    "Informatics",
    "AI research",
    "machine learning",
    "web development",
    "portfolio",
    "UDINUS",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    siteName: siteConfig.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={jakarta.variable}>
        <NoiseOverlay />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <NavLoadingIndicator />
        <main id="main">
          <PageTransition>{children}</PageTransition>
          <MobileScrollBlur />
        </main>
        <Footer />
      </body>
    </html>
  );
}
