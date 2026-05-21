import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { NewsletterForm } from "../components/NewsletterForm";
import { RevealOnScroll } from "../components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Terms of Service — Kiɗa",
  description:
    "The agreement between you and Kiɗa Audio Inc. when you use our apps, the Marketplace, and the Pro subscription.",
};

function Sec({
  id,
  n,
  t,
  children,
}: {
  id: string;
  n: string;
  t: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="legal-sec reveal">
      <div className="legal-sec-head">
        <span className="legal-sec-num" aria-hidden>
          {n}
        </span>
        <h2>{t}</h2>
      </div>
      <div className="legal-sec-body">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <RevealOnScroll />
      <Navbar />
      <main className="legal-page">
        <header className="legal-hero">
          <div className="legal-hero-glow" aria-hidden />
          <div className="wrap">
            <div className="legal-hero-inner reveal">
             
              <h1 className="legal-title">
                Terms of Service
              </h1>
              <p className="legal-lead">
                <span className="legal-dropcap">B</span>y using Kiɗa, you
                agree to these terms — the rules of the room between you
                and Kiɗa Audio Inc. We&rsquo;ve kept them short and
                concrete: what you can do with the app, what we promise in
                return, and what happens if something goes sideways.
              </p>
            </div>
          </div>
          <div className="legal-rule" aria-hidden />
        </header>

        <div className="wrap">
          <div className="legal-grid">
            <div className="legal-content">
              <Sec id="basics" n="01" t="The basics">
                <p>
                  These terms apply whenever you use Kiɗa — the iOS,
                  iPadOS, and Android apps, the Marketplace, our website,
                  and anything else we make that links back here. If you
                  don&rsquo;t agree with them, please don&rsquo;t use
                  Kiɗa.
                </p>
                <p>
                  You need to be at least 13 to use Kiɗa. If you&rsquo;re
                  under 18, you also need a parent or guardian&rsquo;s
                  permission. You&rsquo;re responsible for following the
                  laws of wherever you actually are when you use the app.
                </p>
              </Sec>

              <Sec id="account" n="02" t="Your account">
                <p>
                  You can use Kiɗa without an account for local features.
                  An account is required to sync, publish on the
                  Marketplace, or run a Pro subscription.
                </p>
                <p>
                  You&rsquo;re responsible for keeping your account secure
                  and for everything that happens under it. Tell us right
                  away at{" "}
                  <a href="mailto:security@kida.audio">security@kida.audio</a>{" "}
                  if you think someone else is using it.
                </p>
                <p>
                  You can delete your account at any time from in-app
                  settings. We can suspend or close accounts that violate
                  these terms — see <a href="#termination">Termination</a>.
                </p>
              </Sec>

              <Sec id="license" n="03" t="License to use Kiɗa">
                <p>
                  We grant you a personal, worldwide, non-exclusive,
                  non-transferable, revocable license to use Kiɗa for your
                  own musical work — including paid live performance —
                  subject to these terms.
                </p>
                <p>You may not:</p>
                <ul className="legal-list">
                  <li>Copy, decompile, or reverse-engineer the app, except where local law explicitly allows.</li>
                  <li>Resell, sublicense, or white-label Kiɗa to anyone else.</li>
                  <li>Use Kiɗa to build a competing product, or to scrape the Marketplace.</li>
                  <li>Bypass any rate limit, security control, or DRM we&rsquo;ve put in place.</li>
                </ul>
              </Sec>

              <Sec id="content" n="04" t="Your content & the Marketplace">
                <p>
                  Setlists, loops, drones, samples, and anything else you
                  bring into Kiɗa stay yours. You keep all rights to it.
                </p>
                <p>
                  When you publish on the Marketplace, you grant Kiɗa a
                  non-exclusive, worldwide, royalty-free license to host,
                  stream, and distribute that content to buyers — only for
                  the purpose of operating the Marketplace. You can
                  unpublish at any time, which stops new sales (existing
                  buyers keep their downloads).
                </p>
                <p>
                  You agree that you actually own — or have cleared — the
                  rights to everything you publish. No uncleared samples,
                  no stolen loops, no AI-generated output that infringes
                  someone else&rsquo;s work. We take takedown requests
                  seriously and will remove infringing content.
                </p>
                <p>
                  <strong>Revenue split.</strong> Sellers keep 85% of each
                  sale; Kiɗa keeps 15% to run the storefront and pay
                  processing fees. Payouts run on the first of each month
                  for balances above $20.
                </p>
              </Sec>

              <Sec id="pro" n="05" t="Pro subscription">
                <p>
                  Kiɗa Pro is billed annually (or monthly, where offered).
                  It auto-renews at the end of each period unless you
                  cancel — you can cancel any time from in-app settings or
                  your app store.
                </p>
                <p>
                  New Pro accounts get a <strong>14-day free trial</strong>.
                  If you cancel during the trial, you&rsquo;re not charged.
                  After purchase, we offer a{" "}
                  <strong>30-day full refund</strong>, no questions asked.
                  After 30 days, refunds are handled per the app store
                  rules of the platform you bought through.
                </p>
                <p>
                  Prices and features may change for future periods; if we
                  raise your price, we&rsquo;ll tell you at least 30 days
                  before renewal.
                </p>
              </Sec>

              <Sec id="conduct" n="06" t="Acceptable use">
                <p>Don&rsquo;t use Kiɗa to:</p>
                <ul className="legal-list">
                  <li>Upload anything illegal, hateful, harassing, or sexually explicit involving minors.</li>
                  <li>Infringe anyone&rsquo;s copyright, trademark, or right of publicity.</li>
                  <li>Send spam, run scams, or impersonate someone you&rsquo;re not.</li>
                  <li>Probe, scan, or otherwise test the vulnerability of our systems.</li>
                  <li>Interfere with the performance of the apps for other people.</li>
                </ul>
                <p>
                  We may remove content, suspend accounts, and report
                  illegal activity to authorities when warranted.
                </p>
              </Sec>

              <Sec id="ip" n="07" t="Our intellectual property">
                <p>
                  Kiɗa, the wave mark, the app code, the design system,
                  and every built-in drone and sample we publish are owned
                  by Kiɗa Audio Inc. or our licensors. The license we
                  give you in Section&nbsp;03 doesn&rsquo;t transfer any
                  of that ownership.
                </p>
                <p>
                  Press and partner use of our brand is welcome — see the{" "}
                  <a href="#">press kit</a> for marks and guidelines.
                </p>
              </Sec>

              <Sec id="thirdparty" n="08" t="Third-party services">
                <p>
                  Kiɗa connects to things we don&rsquo;t control —
                  Ableton Live, MIDI controllers, Apple and Google sign-in,
                  payment processors. Their terms apply to your use of
                  their services, and we&rsquo;re not responsible for
                  what they do.
                </p>
              </Sec>

              <Sec id="termination" n="09" t="Termination">
                <p>
                  You can stop using Kiɗa anytime, and you can delete your
                  account from in-app settings.
                </p>
                <p>
                  We may suspend or terminate your account if you
                  materially breach these terms, if your payment fails and
                  isn&rsquo;t resolved, or if we&rsquo;re legally required
                  to. Sections that should reasonably survive (IP,
                  disclaimers, limits, governing law) do.
                </p>
              </Sec>

              <Sec id="disclaimers" n="10" t="Disclaimers & limits">
                <p>
                  Kiɗa is provided <strong>&ldquo;as is&rdquo;</strong>{" "}
                  and <strong>&ldquo;as available&rdquo;</strong>. We
                  don&rsquo;t guarantee it will be uninterrupted,
                  error-free, or fit for a specific purpose. To the
                  fullest extent the law allows, we disclaim all implied
                  warranties.
                </p>
                <p>
                  <strong>Liability cap.</strong> If something goes
                  wrong, our total liability to you for any claim related
                  to Kiɗa is capped at the greater of (a) the amount you
                  paid us in the 12 months before the claim, or (b)
                  US$100. We&rsquo;re not liable for indirect, incidental,
                  or consequential damages — including lost gigs, lost
                  data, or lost profits — except where the law
                  doesn&rsquo;t allow that limitation.
                </p>
              </Sec>

              <Sec id="law" n="11" t="Governing law & disputes">
                <p>
                  These terms are governed by the laws of the State of
                  Delaware, United States, without regard to its
                  conflict-of-laws rules. Disputes will be resolved in the
                  state or federal courts located in New Castle County,
                  Delaware, and we both consent to that jurisdiction.
                </p>
                <p>
                  Nothing here limits any rights you have under mandatory
                  consumer protection laws in your country of residence.
                </p>
              </Sec>

              <Sec id="changes" n="12" t="Changes to these terms">
                <p>
                  We may update these terms as Kiɗa evolves. For material
                  changes, we&rsquo;ll notify you in-app or by email at
                  least 14 days before they take effect. Continuing to use
                  Kiɗa after that means you accept the new terms.
                </p>
              </Sec>

              <Sec id="contact" n="13" t="Contact">
                <p>
                  Kiɗa Audio Inc.
                  <br />
                  Lisbon &middot; Brooklyn
                </p>
                <p>
                  <a href="mailto:legal@kida.audio">legal@kida.audio</a>
                </p>
              </Sec>

              <NewsletterForm />

              <div className="legal-cta reveal">
                <div className="legal-cta-copy">
                  <span className="eyebrow">
                    <span className="dot" />
                    Something missing?
                  </span>
                  <h3>Got a legal question we didn&rsquo;t cover?</h3>
                  <p>
                    Email our legal team directly — we read everything and
                    answer within two working days.
                  </p>
                </div>
                <div className="legal-cta-actions">
                  <a className="btn btn-primary" href="mailto:legal@kida.audio">
                    Email legal@kida.audio
                  </a>
                  <a className="btn btn-ghost" href="/privacy">
                    Read the privacy policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
