import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { TableOfContents, type TocItem } from "../components/TableOfContents";

const description =
  "How to delete your Kiɗa – Music Performance account — in the app or by email — what LitCode erases, and what is kept afterwards.";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description,
  alternates: { canonical: "/delete-account" },
  openGraph: {
    title: "Delete Your Account — Kiɗa",
    description,
    url: "/delete-account",
    type: "article",
  },
  twitter: {
    title: "Delete Your Account — Kiɗa",
    description,
  },
  robots: { index: true, follow: true },
};

/* ---------------------------------------------------------------------------
 * PLACEHOLDERS — these are legal commitments. Replace every value below with a
 * real one before this URL goes into the Play Console Data safety form. Each is
 * rendered on the page inside a <PH> marker so an unfilled value is impossible
 * to miss.
 * ------------------------------------------------------------------------- */
const PH_SUPPORT_EMAIL = "PLACEHOLDER: deletion request email address";
const PH_RESPONSE_TIME = "PLACEHOLDER: response time commitment";
const PH_BACKUP_WINDOW = "PLACEHOLDER: backup purge window";
const PH_PURCHASE_RETENTION = "PLACEHOLDER: purchase record retention period";
const PH_CRASH_RETENTION = "PLACEHOLDER: crash report retention period";
const PH_LOG_RETENTION = "PLACEHOLDER: access log retention period";

const APP_NAME = "Kiɗa – Music Performance";
const DEVELOPER = "LitCode";
const PACKAGE_ID = "com.litecode.kida";

const sections: TocItem[] = [
  { id: "app", n: "01", t: "The app and the developer" },
  { id: "in-app", n: "02", t: "Delete inside the app" },
  { id: "by-email", n: "03", t: "Delete by email" },
  { id: "deleted", n: "04", t: "What is deleted" },
  { id: "retained", n: "05", t: "What is kept, and for how long" },
  { id: "subscriptions", n: "06", t: "Subscriptions and purchases" },
  { id: "contact", n: "07", t: "Contact" },
];

/** An unresolved value the site owner still has to supply. */
function PH({ children }: { children: string }) {
  return <span className="legal-ph">[{children}]</span>;
}

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

export default function DeleteAccountPage() {
  return (
    <>
      {/* This page has to be readable by a Play Store reviewer with scripting
          off, so undo the JS-driven scroll reveal when there is no JS. */}
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
              <h1 className="legal-title">Delete Your Account</h1>
              <p className="legal-lead">
                <span className="legal-dropcap">K</span>iɗa &ndash; Music
                Performance is published by {DEVELOPER}. You can delete your
                Kiɗa account yourself, from inside the app, in about four taps
                &mdash; or by email if you have already uninstalled it. This
                page explains both routes, exactly what is erased, and the
                few things we are required to keep afterwards.
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
              <Sec id="app" n="01" t="The app and the developer">
                <p>
                  This page covers the account you use with{" "}
                  <strong>{APP_NAME}</strong>, published by{" "}
                  <strong>{DEVELOPER}</strong>. On Android the app is listed
                  under the package name{" "}
                  <strong>{PACKAGE_ID}</strong>; the same app is also
                  available on iOS.
                </p>
                <p>
                  One Kiɗa account covers every device you sign in on.
                  Deleting it from any one of them deletes it everywhere &mdash;
                  there is no separate Android account, iOS account, or
                  desktop account to delete afterwards.
                </p>
              </Sec>

              <Sec id="in-app" n="02" t="Delete inside the app">
                <p>
                  If you still have Kiɗa installed and can sign in, this is
                  the fastest route:
                </p>
                <ol className="legal-steps">
                  <li>Open Kiɗa and sign in to the account you want removed.</li>
                  <li>
                    Go to <strong>Profile</strong> &mdash; or{" "}
                    <strong>Settings</strong>, depending on your version of the
                    app.
                  </li>
                  <li>
                    Tap <strong>Delete account</strong>.
                  </li>
                  <li>
                    Read the warning and <strong>confirm</strong>.
                  </li>
                </ol>
                <div className="legal-note">
                  <span className="legal-note-title">
                    This cannot be undone
                  </span>
                  <p>
                    Deletion is immediate and irreversible. The moment you
                    confirm, your account record is destroyed, every signed-in
                    session is invalidated, and the app signs you out. There is
                    no grace period, no recovery window, and no way for us to
                    restore the account or its library afterwards. If you only
                    want to stop using Kiɗa for a while, sign out instead.
                  </p>
                </div>
              </Sec>

              <Sec id="by-email" n="03" t="Delete by email">
                <p>
                  If you have uninstalled the app, lost access to your device,
                  or cannot sign in, ask us to delete the account for you:
                </p>
                <ol className="legal-steps">
                  <li>
                    Send an email to <PH>{PH_SUPPORT_EMAIL}</PH>, ideally from
                    the address on the Kiɗa account &mdash; that is how we
                    confirm the request is yours.
                  </li>
                  <li>
                    Use the subject line{" "}
                    <strong>Delete my Kiɗa account</strong>.
                  </li>
                  <li>
                    Tell us the email address on the account and which platform
                    you used it on (Android, iOS, or desktop).
                  </li>
                  <li>
                    If you cannot write from the account address, say so in the
                    message and we will agree another way to verify you. We
                    will never ask you for your password.
                  </li>
                </ol>
                <p>
                  We respond to deletion requests within{" "}
                  <PH>{PH_RESPONSE_TIME}</PH>. Once we act on the request, the
                  deletion is the same one described below &mdash; immediate and
                  irreversible.
                </p>
              </Sec>

              <Sec id="deleted" n="04" t="What is deleted">
                <p>
                  Deleting your account erases the following. Unless noted, it
                  happens at the moment the deletion is confirmed.
                </p>
                <div
                  className="legal-table-wrap"
                  role="region"
                  aria-labelledby="deleted-caption"
                  tabIndex={0}
                >
                  <table className="legal-table">
                    <caption id="deleted-caption">
                      Data erased when you delete your account
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Where it lives</th>
                        <th scope="col">What happens</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          Account record &mdash; name, email address, password
                        </th>
                        <td>Kiɗa servers</td>
                        <td>Deleted immediately</td>
                      </tr>
                      <tr>
                        <th scope="row">Session and refresh tokens</th>
                        <td>Kiɗa servers and your device</td>
                        <td>
                          Invalidated on the server and erased from the device,
                          signing you out everywhere
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Push notification registration and token
                        </th>
                        <td>Kiɗa servers</td>
                        <td>
                          Deleted immediately; the app stops receiving
                          notifications
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Library data &mdash; favourites, download records,
                          download quota
                        </th>
                        <td>Kiɗa servers</td>
                        <td>Deleted immediately</td>
                      </tr>
                      <tr>
                        <th scope="row">Newsletter subscription</th>
                        <td>Kiɗa servers</td>
                        <td>Deleted immediately; the mailing stops</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Downloaded and imported audio
                        </th>
                        <td>Your device</td>
                        <td>
                          Removed from the device as part of the deletion
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  Copies of this data that remain in routine encrypted backups
                  are overwritten within <PH>{PH_BACKUP_WINDOW}</PH>. Backups
                  are never used to restore a deleted account.
                </p>
              </Sec>

              <Sec id="retained" n="05" t="What is kept, and for how long">
                <p>
                  Three things outlive your account. We keep them because
                  accounting rules and basic service security require it, not
                  to keep a profile of you.
                </p>
                <div
                  className="legal-table-wrap"
                  role="region"
                  aria-labelledby="retained-caption"
                  tabIndex={0}
                >
                  <table className="legal-table">
                    <caption id="retained-caption">
                      Data kept after your account is deleted
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Who holds it</th>
                        <th scope="col">Why</th>
                        <th scope="col">How long</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          Purchase and subscription records
                        </th>
                        <td>RevenueCat and Google Play</td>
                        <td>Tax and accounting obligations</td>
                        <td>
                          <PH>{PH_PURCHASE_RETENTION}</PH>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Crash reports and performance diagnostics
                        </th>
                        <td>Sentry</td>
                        <td>
                          Diagnosing crashes and performance regressions in the
                          app
                        </td>
                        <td>
                          <PH>{PH_CRASH_RETENTION}</PH>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Server access logs</th>
                        <td>{DEVELOPER}</td>
                        <td>
                          Security, abuse prevention, and debugging
                        </td>
                        <td>
                          <PH>{PH_LOG_RETENTION}</PH>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  None of this can be used to sign in as you or to rebuild your
                  account. Once the account record is gone, it is gone.
                </p>
              </Sec>

              <Sec id="subscriptions" n="06" t="Subscriptions and purchases">
                <p>
                  <strong>
                    Deleting your Kiɗa account does not cancel a subscription
                    you bought through Google Play.
                  </strong>{" "}
                  Store subscriptions are managed by the store, not by us, so
                  billing continues until you cancel it there. Cancel first,
                  then delete.
                </p>
                <p>
                  You can cancel at{" "}
                  <a
                    href="https://play.google.com/store/account/subscriptions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Play &rarr; Subscriptions
                  </a>
                  . If you subscribed on iOS, cancel in the Settings app under
                  your Apple Account &rarr; Subscriptions.
                </p>
              </Sec>

              <Sec id="contact" n="07" t="Contact">
                <p>
                  {DEVELOPER}
                  <br />
                  Nigeria
                </p>
                <p>
                  Deletion requests and questions about this page:{" "}
                  <PH>{PH_SUPPORT_EMAIL}</PH>
                </p>
                <p>
                  For how we handle your data more generally, see the{" "}
                  <a href="/privacy">privacy policy</a>.
                </p>
              </Sec>

              <div className="legal-cta reveal">
                <div className="legal-cta-copy">
                  <span className="eyebrow">
                    <span className="dot" />
                    Not sure yet?
                  </span>
                  <h3>Deleting is permanent. Signing out is not.</h3>
                  <p>
                    If you just want a break from Kiɗa, sign out of the app
                    instead &mdash; your library stays where it is until you
                    come back.
                  </p>
                </div>
                <div className="legal-cta-actions">
                  <a className="btn btn-primary" href="#in-app">
                    Delete in the app
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
