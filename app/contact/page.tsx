import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { Footer, HANDLE, SOCIALS } from "../components/Footer";
import { Icon } from "../components/Icon";
import { Navbar } from "../components/Navbar";
import { RevealOnScroll } from "../components/RevealOnScroll";
import {
  LEGAL_ENTITY,
  PRIVACY_EMAIL,
  RESPONSE_TIME,
  SUPPORT_EMAIL,
} from "../legal";

const description =
  "Get in touch with the Kiɗa team at LitCode — app support, billing, privacy requests, press, and where to find us online.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Kiɗa",
    description,
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Contact — Kiɗa",
    description,
  },
  robots: { index: true, follow: true },
};

const CHANNELS = [
  {
    label: "Support",
    title: "Help with the app",
    body: "Something not working, a question about a feature, or billing and Kiɗa Premium.",
    href: `mailto:${SUPPORT_EMAIL}`,
    cta: SUPPORT_EMAIL,
  },
  {
    label: "Privacy",
    title: "Your data",
    body: "A copy of your data, a correction, or a complaint about how we handle it.",
    href: `mailto:${PRIVACY_EMAIL}`,
    cta: PRIVACY_EMAIL,
  },
  {
    label: "Account",
    title: "Delete your account",
    body: "You can do it yourself in the app in a few taps. Here is how, and what is kept.",
    href: "/delete-account",
    cta: "Read the deletion guide",
  },
] as const;

export default function ContactPage() {
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
              <h1 className="legal-title">Contact</h1>
              <p className="legal-lead">
                <span className="legal-dropcap">K</span>iɗa is made by a small
                team at {LEGAL_ENTITY}, and every message is read by a person.
                We answer within {RESPONSE_TIME}.
              </p>
            </div>
          </div>
          <div className="legal-rule" aria-hidden />
        </header>

        <div className="wrap contact-wrap">
          <div className="contact-cards">
            {CHANNELS.map((c) => (
              <a key={c.label} className="contact-card reveal" href={c.href}>
                <span className="legal-sec-num">{c.label}</span>
                <h2>{c.title}</h2>
                <p>{c.body}</p>
                <span className="contact-card-cta">
                  {c.cta}
                  <Icon name="arrow" size={14} />
                </span>
              </a>
            ))}
          </div>

          <section className="contact-panel reveal">
            <div className="legal-cta-copy">
              <span className="eyebrow">
                <span className="dot" />
                Send a message
              </span>
              <h3>Write to us</h3>
              <p>
                Tell us what you need and we will route it to the right
                person. We reply to the email address you give us.
              </p>
              <div className="contact-socials">
                <span>Or find us at @{HANDLE}</span>
                <div>
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={`Kiɗa on ${s.name} — @${HANDLE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name={s.icon} size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <ContactForm fallbackEmail={SUPPORT_EMAIL} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
