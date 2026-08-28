import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { TableOfContents, type TocItem } from "../components/TableOfContents";

const description =
  "How to delete your Kiɗa – Music Performance account — in the app or by email — what LitCode erases, what is kept afterwards, and what you lose for good.";

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

const SUPPORT_EMAIL = "kida.audio@gmail.com";

/* Rights requests (copies of data, complaints) route here. Move this to an
 * address on a domain we control as soon as there is one — a rights notice
 * that answers from a free mailbox is the detail reviewers and enterprise
 * buyers pick up on first. Ordinary support stays on SUPPORT_EMAIL. */
const PRIVACY_EMAIL = SUPPORT_EMAIL;

/* These are legal commitments, and the Play Console Data safety form points at
 * this URL. Keep them in step with the retention section of /privacy. */
const RESPONSE_TIME = "two working days";
const BACKUP_WINDOW = "30 days";
const COPY_WINDOW = "30 days";
const PURCHASE_RETENTION = "6 years";
const CRASH_RETENTION = "90 days";
const LOG_RETENTION = "30 days";

const APP_NAME = "Kiɗa – Music Performance";
const DEVELOPER = "LitCode";
const PACKAGE_ID = "com.litecode.kida";
/* TODO: replace with the registered company name and address once the
 * registration details are confirmed — the NDPA and the GDPR both expect the
 * controller to be identifiable from the notice. Note that /privacy, /terms
 * and the footer name "Kiɗa Audio Ltd." as the entity while this page names
 * LitCode as the publisher; one of the two has to give. */
const CONTROLLER = "LitCode";
const LAST_UPDATED = "August 28, 2026";

const sections: TocItem[] = [
  { id: "app", n: "01", t: "The app and the developer" },
  { id: "alternatives", n: "02", t: "You may not need to delete" },
  { id: "copy", n: "03", t: "Take a copy first" },
  { id: "subscriptions", n: "04", t: "Cancel your subscription first" },
  { id: "in-app", n: "05", t: "Delete inside the app" },
  { id: "by-email", n: "06", t: "Delete by email" },
  { id: "confirmation", n: "07", t: "How you know it is done" },
  { id: "deleted", n: "08", t: "What is deleted" },
  { id: "retained", n: "09", t: "What is kept, and for how long" },
  { id: "forfeited", n: "10", t: "What you lose for good" },
  { id: "revoke", n: "11", t: "If you signed in with Apple or Google" },
  { id: "return", n: "12", t: "Coming back later" },
  { id: "contact", n: "13", t: "Contact and complaints" },
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
                page explains both routes, what to do before you start, exactly
                what is erased, and the few things we are required to keep
                afterwards.
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

              <Sec id="alternatives" n="02" t="You may not need to delete your account">
                <p>
                  Most people who open this page want one specific thing to
                  stop, not their library destroyed. If one thing is bothering
                  you, there is a smaller fix that keeps everything:
                </p>
                <ul className="legal-list">
                  <li>
                    <strong>Too many emails.</strong> Unsubscribe from the link
                    at the foot of any Kiɗa email, or turn the newsletter off
                    in Settings.
                  </li>
                  <li>
                    <strong>Too many notifications.</strong>{" "}
                    Turn them off in
                    Settings, or in your phone&rsquo;s own notification
                    settings for Kiɗa.
                  </li>
                  <li>
                    <strong>The app is using too much space.</strong> Delete
                    individual downloads from your library. Your purchases stay
                    on your account and you can download them again.
                  </li>
                  <li>
                    <strong>You just want to stop using Kiɗa.</strong> Sign
                    out. Your account and everything in it will be waiting.
                  </li>
                </ul>
                <p>
                  Deleting is for when you want your data gone. It is not the
                  way to free up space or stop emails.
                </p>
              </Sec>

              <Sec id="copy" n="03" t="Take a copy before you delete">
                <p>
                  Deletion is irreversible, so take anything you want to keep
                  before you start. Email{" "}
                  <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> from
                  the address on your account, with the subject{" "}
                  <strong>Copy of my Kiɗa data</strong>, and we will send you a
                  readable copy of the personal data we hold within{" "}
                  {COPY_WINDOW}, free of charge.
                </p>
                <p>
                  Audio you have already downloaded is yours to keep for as
                  long as your account exists &mdash; copy it off your device
                  before you delete if you want to keep it.
                </p>
              </Sec>

              <Sec
                id="subscriptions"
                n="04"
                t="Cancel your subscription before you delete"
              >
                <p>
                  <strong>
                    Deleting your Kiɗa account does not cancel Kiɗa Premium.
                  </strong>{" "}
                  Subscriptions are billed by Apple or Google, not by us, and
                  they keep renewing until you cancel them in the store you
                  bought them from.
                </p>
                <p>
                  Cancel first, then delete. Once your account is gone we
                  cannot look your subscription up, cancel it for you, or
                  refund time you have already paid for.
                </p>
                <ul className="legal-list">
                  <li>
                    <strong>Google Play.</strong>{" "}
                    Open the Play Store, tap your
                    profile picture, then Payments &amp; subscriptions &rarr;
                    Subscriptions &rarr; Kiɗa &rarr; Cancel subscription
                    &mdash; or go straight to{" "}
                    <a
                      href="https://play.google.com/store/account/subscriptions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Play &rarr; Subscriptions
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Apple App Store.</strong>{" "}
                    Open Settings on your
                    iPhone or iPad, tap your name, then Subscriptions &rarr;
                    Kiɗa &rarr; Cancel Subscription.
                  </li>
                </ul>
                <p>
                  Cancelling a subscription does not delete your account, and
                  deleting your account does not cancel a subscription. They
                  are two separate actions and you need both.
                </p>
              </Sec>

              <Sec id="in-app" n="05" t="Delete inside the app">
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

              <Sec id="by-email" n="06" t="Delete by email">
                <p>
                  If you have uninstalled the app, lost access to your device,
                  or cannot sign in, ask us to delete the account for you:
                </p>
                <ol className="legal-steps">
                  <li>
                    Send an email to{" "}
                    <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>,
                    ideally from the address on the Kiɗa account &mdash; that is
                    how we confirm the request is yours.
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
                  We respond to deletion requests within {RESPONSE_TIME}. Once
                  we act on the request, the deletion is the same one described
                  below &mdash; immediate and irreversible.
                </p>
                <div className="legal-note">
                  <span className="legal-note-title">
                    How we check an emailed request
                  </span>
                  <p>
                    We only act on a deletion request sent from the email
                    address on the account. If you have lost access to that
                    address, we will ask for something else that shows the
                    account is yours &mdash; a store order number for a
                    purchase, for example &mdash; before we delete anything.
                  </p>
                  <p>
                    We would rather keep an account alive one extra day than
                    delete the wrong person&rsquo;s library.
                  </p>
                </div>
              </Sec>

              <Sec id="confirmation" n="07" t="How you know it is done">
                <p>
                  <strong>In the app.</strong>{" "}
                  Kiɗa signs you out and shows
                  &ldquo;Your account has been deleted.&rdquo; At that point it
                  is already done; there is nothing else to wait for.
                </p>
                <p>
                  <strong>By email.</strong> We reply to confirm once the
                  account is deleted, within {RESPONSE_TIME}. If you have not
                  heard from us by then, send the message again &mdash; assume
                  the first one did not reach us.
                </p>
              </Sec>

              <Sec id="deleted" n="08" t="What is deleted">
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
                      {/* This row is only true while the deletion handler
                          issues a person-delete to the analytics provider.
                          Keep the two in step. */}
                      <tr>
                        <th scope="row">
                          Usage profile &mdash; which screens you opened and
                          which features you used
                        </th>
                        <td>Our analytics provider, linked to your account</td>
                        <td>
                          Deleted immediately, along with the link between the
                          profile and you
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Newsletter subscription</th>
                        <td>Kiɗa servers</td>
                        <td>Deleted immediately; the mailing stops</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Downloads &mdash; records, licences, and the audio
                          itself
                        </th>
                        <td>Kiɗa servers and your device</td>
                        <td>
                          The records and licences are erased from our servers.
                          The audio files sit inside the Kiɗa app on your
                          device: the app clears them when you delete your
                          account, and uninstalling Kiɗa removes anything left
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  Nothing of yours stays on the device after you uninstall.
                  Copies of this data that remain in routine encrypted backups
                  are overwritten within {BACKUP_WINDOW}. Backups
                  are never used to restore a deleted account.
                </p>
              </Sec>

              <Sec id="retained" n="09" t="What is kept, and for how long">
                <p>
                  Four things outlive your account. We keep the first three
                  because accounting rules and basic service security require
                  it; the fourth is a set of counts with your identifiers
                  stripped out. None of it is a profile of you.
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
                        <td>RevenueCat, Google Play, and the App Store</td>
                        <td>Tax and accounting obligations</td>
                        <td>
                          {PURCHASE_RETENTION} from the date of the
                          transaction
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
                          {CRASH_RETENTION} from the date of the report, then
                          deleted automatically
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Server access logs</th>
                        <td>{DEVELOPER}</td>
                        <td>
                          Security, abuse prevention, and debugging
                        </td>
                        <td>
                          {LOG_RETENTION}, then rotated out
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Aggregate usage counts &mdash; totals such as how
                          many people opened the tuner this month
                        </th>
                        <td>{DEVELOPER} and our analytics provider</td>
                        <td>
                          Deciding what to build and what to fix
                        </td>
                        <td>
                          Indefinitely, with your identifiers removed &mdash;
                          once your account is gone these numbers can no longer
                          be traced back to you
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

              <Sec id="forfeited" n="10" t="What you lose that cannot be bought back">
                <p>
                  Deleting your account ends your access to everything held
                  against it:
                </p>
                <ul className="legal-list">
                  <li>loops, drone pads and drum kits you bought in the app</li>
                  <li>
                    Kiɗa Premium, for whatever remains of the period you have
                    paid for
                  </li>
                  <li>
                    this month&rsquo;s download allowance, including downloads
                    you have not used yet
                  </li>
                  <li>
                    your favourites, your library, and any song requests you
                    have sent us
                  </li>
                </ul>
                {/* Wording assumes purchases are entitled by Kiɗa account id.
                    If entitlements are ever keyed to the anonymous store id,
                    a restore on a new account would return Premium and this
                    paragraph has to soften. */}
                <p>
                  Restore Purchases on a new account restores only what the
                  store itself can see. The licences to Kiɗa content are held
                  against your Kiɗa account, and that account will no longer
                  exist. If you think you might come back, sign out instead
                  &mdash; signing out keeps everything.
                </p>
              </Sec>

              <Sec id="revoke" n="11" t="If you signed in with Apple or Google">
                <p>
                  Deleting your Kiɗa account removes your data from our
                  servers. It does not remove Kiɗa from the list of apps
                  connected to your Apple Account or Google Account &mdash;
                  those lists are held by Apple and Google, and only you can
                  clear them.
                </p>
                <ul className="legal-list">
                  <li>
                    <strong>Apple.</strong>{" "}
                    Settings &rarr; your name &rarr;
                    Sign-In &amp; Security &rarr; Sign in with Apple &rarr;
                    Kiɗa &rarr; Stop Using Apple ID.
                  </li>
                  <li>
                    <strong>Google.</strong> Go to{" "}
                    <a
                      href="https://myaccount.google.com/connections"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      myaccount.google.com/connections
                    </a>
                    , select Kiɗa, then Remove access.
                  </li>
                </ul>
                <p>
                  Neither of these deletes your Kiɗa account on its own. Delete
                  the account in the app or by email first, then revoke access.
                </p>
              </Sec>

              <Sec id="return" n="12" t="Coming back later">
                <p>
                  You can sign up again with the same email address whenever
                  you like. It will be a new account: an empty library, a fresh
                  download allowance, no purchase history, and no way for us to
                  reconnect it to the account you deleted.
                </p>
              </Sec>

              <Sec id="contact" n="13" t="Contact and complaints">
                <p>
                  Kiɗa is published by {CONTROLLER}, Nigeria. {CONTROLLER}{" "}
                  decides how Kiɗa handles your personal data and is the data
                  controller for it.
                </p>
                <p>
                  Deletion requests and ordinary support:{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                  <br />
                  Questions about this page, or about your data generally:{" "}
                  <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
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
                <p>
                  For how we handle your data more generally, see the{" "}
                  <a href="/privacy">privacy policy</a>.
                </p>
                <p>Last updated {LAST_UPDATED}.</p>
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
