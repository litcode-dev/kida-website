import { Bento } from "./components/Bento";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Marketplace } from "./components/Marketplace";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { RevealOnScroll } from "./components/RevealOnScroll";
import { Screens } from "./components/Screens";
import { Testimonial } from "./components/Testimonial";

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <Navbar />
      <main>
        <Hero />
        <Bento />
        <Screens />
        <HowItWorks />
        <Marketplace />
        <Testimonial />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
