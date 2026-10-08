import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { KidaMark } from "../components/KidaMark";
import { Navbar } from "../components/Navbar";
import { ProductGrid, type Product } from "../components/ProductGrid";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { LEGAL_ENTITY } from "../legal";

const description =
  "The apps made by LitCode — Kiɗa, the live performance companion for working musicians, and Toniq, a music theory companion for players and producers.";

export const metadata: Metadata = {
  title: "Products",
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — Kiɗa",
    description,
    url: "/products",
    type: "website",
  },
  twitter: {
    title: "Products — Kiɗa",
    description,
  },
  robots: { index: true, follow: true },
};

const PRODUCTS: Product[] = [
  {
    name: "Kiɗa",
    tagline: "Live performance companion",
    body: "Loops, pads and click for working musicians — built for the stage, the church and the studio.",
    mark: <KidaMark size={30} />,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.litecode.kida",
  },
  {
    name: "Toniq",
    tagline: "Music theory companion",
    body: "Toniq is a music theory companion for players and producers. Play from a MIDI keyboard, a MIDI file, or the on-screen piano, and Toniq instantly names the chord, finds the key you're in, and shows each chord's role as a Roman numeral. It suggests the chords likely to come next, shows the notes on a staff and on a guitar neck, and spells everything correctly for the key: Bb7 in flat keys, not A#7. Use it as a standalone app with your own instruments, or as a VST3/AU plugin inside your DAW.",
    mark: <span className="product-letter">T</span>,
    apiApp: "Toniq",
  },
];

export default function ProductsPage() {
  return (
    <>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<style>.reveal{opacity:1!important;transform:none!important}</style>`,
        }}
      />
      <RevealOnScroll />
      <Navbar />
      <main className="legal-page">
        <header className="legal-hero">
          <div className="legal-hero-glow" aria-hidden />
          <div className="wrap">
            <div className="legal-hero-inner reveal">
              <h1 className="legal-title">Products</h1>
              <p className="legal-lead">
                Apps for musicians, made by {LEGAL_ENTITY}.
              </p>
            </div>
          </div>
          <div className="legal-rule" aria-hidden />
        </header>

        <div className="wrap contact-wrap">
          <ProductGrid products={PRODUCTS} hide={["Kida"]} />
        </div>
      </main>
      <Footer />
    </>
  );
}
