import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { TableOfContents, type TocItem } from "../components/TableOfContents";
import {
  BACKUP_WINDOW,
  COPY_WINDOW,
  CRASH_RETENTION,
  LOG_RETENTION,
  PRIVACY_EMAIL,
  PURCHASE_RETENTION,
  RESPONSE_TIME,
  SUPPORT_EMAIL,
} from "../legal";

const description =
  "How Kiɗa collects, uses, and protects the information you give us when you use our apps and the Marketplace.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Kiɗa",
    description,
    url: "/privacy",
    type: "article",
  },
  twitter: {
    title: "Privacy Policy — Kiɗa",
    description,
  },
};

const LAST_UPDATED = "August 28, 2026";

/* The entity named here has to be the one on /delete-account, which currently
 * names LitCode as the publisher and controller. Settle which of the two is
 * the registered controller and change both. */
const LEGAL_ENTITY = "Kiɗa Audio Ltd.";

const sections: TocItem[] = [
  { id: "info", n: "01", t: "Information we collect" },
  { id: "use", n: "02", t: "How we use it" },
  { id: "sharing", n: "03", t: "Sharing & disclosure" },
  { id: "retention", n: "04", t: "Data retention" },
  { id: "rights", n: "05", t: "Your rights" },
  { id: "children", n: "06", t: "Children" },
  { id: "security", n: "07", t: "Security" },
  { id: "intl", n: "08", t: "International transfers" },
  { id: "changes", n: "09", t: "Changes to this policy" },
  { id: "contact", n: "10", t: "Contact and complaints" },
];

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

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>
              <p className="legal-lead">
                <span className="legal-dropcap">K</span>iɗa Audio Ltd. takes
                care of your data the way a good engineer takes care of a
                live mix — minimum gain, maximum clarity, nothing routed
                somewhere it doesn&rsquo;t belong. This page explains what
                we collect, why, and what you can ask us to do about it.
              </p>
            </div>
          </div>
          <div className="legal-rule" aria-hidden />
        </header>

        <div className="wrap">
          <div className="legal-grid">
            <aside className="legal-aside">
              <TableOfContents items={sections} />
            </aside>

            <div className="legal-content">
              <Sec id="info" n="01" t="Information we collect">
                <p>
                  <strong>Information you give us.</strong> When you create
                  an account, sign in, or contact us, we collect your email
                  address, display name, and any messages you send. If you
                  publish or sell on the Marketplace, we also collect the
                  content itself and the payout details you provide.
                </p>
                <p>
                  <strong>Information generated as you use Kiɗa.</strong>{" "}
                  Device info (model, OS version), app usage events (which
                  features you tap, crash logs), and metadata about the
                  sessions you create. We do not access the audio inside
                  your sessions unless you explicitly publish it.
                </p>
                <p>
                  The usage events are held for us by an analytics provider
                  and linked to your account for as long as the account
                  exists. Deleting your account deletes that profile &mdash;
                  see the{" "}
                  <a href="/delete-account">account deletion page</a>.
                </p>
                <p>
                  <strong>Information from third parties.</strong> If you
                  sign in with Apple or Google, we receive a unique
                  identifier and the basic profile fields you authorize. We
                  never receive your password.
                </p>
              </Sec>

              <Sec id="use" n="02" t="How we use it">
                <ul className="legal-list">
                  <li>Run Kiɗa on your devices and sync your library across them.</li>
                  <li>Process payments and payouts on the Marketplace.</li>
                  <li>Diagnose crashes and improve performance.</li>
                  <li>Send you account-related email (receipts, security notices).</li>
                  <li>Answer your support requests.</li>
                </ul>
                <p>
                  We do not sell your personal information, and we do not
                  run third-party advertising inside the app.
                </p>
              </Sec>

              <Sec id="sharing" n="03" t="Sharing & disclosure">
                <p>We share information only when one of these applies:</p>
                <ul className="legal-list">
                  <li>
                    <strong>Service providers.</strong> Hosting, analytics,
                    crash reporting, and payment processors that need data
                    to operate Kiɗa on our behalf.
                  </li>
                  <li>
                    <strong>Legal compliance.</strong> If we receive a valid
                    legal request, or if disclosure is necessary to protect
                    users or the public.
                  </li>
                  <li>
                    <strong>Business transfer.</strong> If Kiɗa is acquired,
                    customer data may transfer to the new owner under this
                    same policy — or one at least as protective.
                  </li>
                </ul>
              </Sec>

              <Sec id="retention" n="04" t="Data retention">
                <p>
                  We keep your account data as long as your account is
                  active. You can delete it at any time, from inside the app
                  or by email, and the deletion is{" "}
                  <strong>immediate and irreversible</strong> &mdash; the
                  account record and everything held against it are erased
                  the moment the deletion is confirmed, not after a waiting
                  period. Copies that remain in routine encrypted backups are
                  overwritten within {BACKUP_WINDOW}, and backups are never
                  used to restore a deleted account.
                </p>
                <p>Four things outlive the account:</p>
                <ul className="legal-list">
                  <li>
                    <strong>Purchase and subscription records.</strong>{" "}
                    {PURCHASE_RETENTION} from the date of the transaction,
                    for tax and accounting.
                  </li>
                  <li>
                    <strong>Crash reports and performance diagnostics.</strong>{" "}
                    {CRASH_RETENTION}, then deleted automatically.
                  </li>
                  <li>
                    <strong>Server access logs.</strong> {LOG_RETENTION}, then
                    rotated out.
                  </li>
                  <li>
                    <strong>Aggregate usage counts.</strong> Kept
                    indefinitely with your identifiers removed, so they can no
                    longer be traced back to you.
                  </li>
                </ul>
                <p>
                  The <a href="/delete-account">account deletion page</a> sets
                  out the exact steps, what is erased, what we keep, and what
                  you lose for good.
                </p>
              </Sec>

              <Sec id="rights" n="05" t="Your rights">
                <p>
                  Depending on where you live, you may have the right to
                  access, correct, export, or delete the personal data we
                  hold about you. To exercise any of these, email{" "}
                  <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. To
                  delete your account outright, follow the steps on the{" "}
                  <a href="/delete-account">account deletion page</a>.
                </p>
                <p>
                  <strong>A copy of your data.</strong>{" "}
                  Email us with the
                  subject &ldquo;Copy of my Kiɗa data&rdquo; and we will send
                  you a readable copy of the personal data we hold within{" "}
                  {COPY_WINDOW}, free of charge. Do this before you delete
                  your account: deletion is irreversible and there is nothing
                  left to copy afterwards.
                </p>
                <p>
                  <strong>How we check a request.</strong>{" "}
                  We only act on a
                  request sent from the email address on the account. If you
                  have lost access to that address, we will ask for something
                  else that shows the account is yours &mdash; a store order
                  number, for example &mdash; before we act. We will never ask
                  you for your password.
                </p>
                <p>
                  <strong>EU / UK users:</strong> our lawful bases for
                  processing are performance of contract (running the app),
                  legitimate interest (security and abuse prevention), and
                  your consent where required.
                </p>
                <p>
                  <strong>California users:</strong>{" "}
                  we do not sell or
                  &ldquo;share&rdquo; personal information as those terms
                  are defined under the CCPA / CPRA.
                </p>
              </Sec>

              <Sec id="children" n="06" t="Children">
                <p>
                  Kiɗa is not intended for children under 13. We do not
                  knowingly collect personal information from children. If
                  we learn we have, we delete it.
                </p>
              </Sec>

              <Sec id="security" n="07" t="Security">
                <p>
                  We use industry-standard safeguards — TLS in transit,
                  encryption at rest, scoped access controls — to protect
                  your data. No system is perfectly secure, so we
                  encourage strong, unique passwords and enabling device
                  biometrics.
                </p>
              </Sec>

              <Sec id="intl" n="08" t="International transfers">
                <p>
                  We are based in Nigeria. If you use Kiɗa from outside
                  Nigeria, your information will be processed in Nigeria
                  under appropriate safeguards (Standard Contractual
                  Clauses where applicable).
                </p>
              </Sec>

              <Sec id="changes" n="09" t="Changes to this policy">
                <p>
                  We may update this policy as the product evolves. If
                  changes are material, we will notify you in-app or by
                  email at least 14 days before they take effect.
                </p>
              </Sec>

              <Sec id="contact" n="10" t="Contact and complaints">
                <p>
                  {LEGAL_ENTITY}
                  <br />
                  Nigeria
                </p>
                <p>
                  {LEGAL_ENTITY} decides how Kiɗa handles your personal data
                  and is the data controller for it.
                </p>
                <p>
                  Questions about this policy, or about your data generally:{" "}
                  <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
                  <br />
                  Deletion requests and ordinary support:{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                </p>
                <p>
                  <strong>If you are not happy with how we handled this,</strong>{" "}
                  tell us first &mdash; most problems are a misunderstanding we
                  can fix the same week. If we cannot resolve it, you can
                  complain to the Nigeria Data Protection Commission at{" "}
                  <a
                    href="https://ndpc.gov.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ndpc.gov.ng
                  </a>
                  . If you are in the United Kingdom or the European Union, you
                  can complain to your own national data protection authority
                  instead.
                </p>
                <p>Last updated {LAST_UPDATED}.</p>
              </Sec>

              <div className="legal-cta reveal">
                <div className="legal-cta-copy">
                  <span className="eyebrow">
                    <span className="dot" />
                    Still curious?
                  </span>
                  <h3>Talk to a human about your data.</h3>
                  <p>
                    Our privacy team replies to every message — usually
                    within {RESPONSE_TIME}.
                  </p>
                </div>
                <div className="legal-cta-actions">
                  <a
                    className="btn btn-primary"
                    href={`mailto:${PRIVACY_EMAIL}`}
                  >
                    Email {PRIVACY_EMAIL}
                  </a>
                  <a className="btn btn-ghost" href="/#faq">
                    Read the FAQ
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
