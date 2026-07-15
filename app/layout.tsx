import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DownloadModalProvider } from "./components/DownloadModalProvider";

const SITE_URL = "https://kida.litcode.com.ng";
const SITE_NAME = "Kiɗa";
const DEFAULT_TITLE = "Kiɗa — Your setlist. Your stage. Your sound.";
const DESCRIPTION =
  "Kiɗa is the live-performance companion for working musicians — build setlists, control Ableton Live, lock your key with built-in drones, and stay MIDI-ready. On mobile, desktop, and as a plugin.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Kiɗa",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Kiɗa",
    "live performance app",
    "setlist manager",
    "Ableton Live control",
    "drone generator",
    "tanpura drone",
    "MIDI controller app",
    "backing tracks",
    "musician app",
    "worship music tools",
    "Afrobeat",
    "live looping",
  ],
  authors: [{ name: "Kiɗa Audio Ltd." }],
  creator: "Kiɗa Audio Ltd.",
  publisher: "Kiɗa Audio Ltd.",
  category: "music",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#090b06",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Kiɗa Audio Ltd.",
      url: SITE_URL,
      logo: `${SITE_URL}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "iOS, iPadOS, Android, macOS, Windows",
      description: DESCRIPTION,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <DownloadModalProvider>{children}</DownloadModalProvider>
      </body>
    </html>
  );
}
