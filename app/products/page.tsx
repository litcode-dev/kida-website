import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ProductGrid } from "../components/ProductGrid";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { LEGAL_ENTITY } from "../legal";

const description =
  "Apps for musicians made by LitCode, for Android, iOS, Mac, Windows and Linux.";

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
          <ProductGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
