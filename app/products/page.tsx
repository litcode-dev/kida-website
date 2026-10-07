import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Icon } from "../components/Icon";
import { KidaMark } from "../components/KidaMark";
import { Navbar } from "../components/Navbar";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { LEGAL_ENTITY } from "../legal";

const description =
  "The apps made by LitCode — Kiɗa, the live performance companion for working musicians, and Toniq.";

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

type Product = {
  name: string;
  tagline: string;
  body: string;
  mark: React.ReactNode;
  /* Google Play listing; null until the app is published. */
  playStoreUrl: string | null;
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
    tagline: `Another app from ${LEGAL_ENTITY}`,
    body: "Toniq is the newest app in the LitCode family.",
    mark: <span className="product-letter">T</span>,
    playStoreUrl: null,
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
                Apps made by {LEGAL_ENTITY}. Get them on Google Play.
              </p>
            </div>
          </div>
          <div className="legal-rule" aria-hidden />
        </header>

        <div className="wrap contact-wrap">
          <div className="product-grid">
            {PRODUCTS.map((p) => (
              <article key={p.name} className="product-card reveal">
                <span className="product-mark">{p.mark}</span>
                <span className="legal-sec-num">{p.tagline}</span>
                <h2>{p.name}</h2>
                <p>{p.body}</p>
                {p.playStoreUrl ? (
                  <a
                    className="btn btn-ghost btn-icon product-store"
                    href={p.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get ${p.name} on Google Play`}
                  >
                    <Icon name="googleplay" size={18} />
                    Get it on Google Play
                  </a>
                ) : (
                  <span className="btn btn-ghost btn-icon product-store is-soon">
                    <Icon name="googleplay" size={18} />
                    Coming soon to Google Play
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
