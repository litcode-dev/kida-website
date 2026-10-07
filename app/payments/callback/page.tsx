import type { Metadata } from "next";
import { Footer } from "../../components/Footer";
import { Icon } from "../../components/Icon";
import { Navbar } from "../../components/Navbar";
import { SUPPORT_EMAIL } from "../../legal";

export const metadata: Metadata = {
  title: "Payment",
  description: "What happens after you pay for a LitCode app.",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/* Gateways return here after checkout: Squad adds `reference`, Flutterwave
   `status` and `tx_ref`, Stripe `status=success|cancelled`. The download
   email is sent from the payment webhook, not from this page. */
export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const status = first(params.status)?.toLowerCase();
  const reference = first(params.reference) ?? first(params.tx_ref);
  const failed = status === "cancelled" || status === "failed";

  return (
    <>
      <Navbar />
      <main className="legal-page">
        <header className="legal-hero">
          <div className="legal-hero-glow" aria-hidden />
          <div className="wrap">
            <div className="legal-hero-inner">
              <h1 className="legal-title">
                {failed ? "Payment not completed" : "Thank you"}
              </h1>
              <p className="legal-lead">
                {failed
                  ? "Your payment was cancelled or didn't go through, and you haven't been charged. You can try again from the products page."
                  : "We're confirming your payment. Once it clears, a desktop app's download link is emailed to the address you gave at checkout, usually within a few minutes (check your spam folder too). Purchases made in the Kiɗa app show up in your library."}
              </p>
            </div>
          </div>
          <div className="legal-rule" aria-hidden />
        </header>

        <div className="wrap contact-wrap">
          <div className="contact-cards">
            <a
              className="contact-card"
              href={failed ? "/products" : `mailto:${SUPPORT_EMAIL}`}
            >
              <span className="legal-sec-num">
                {failed ? "Try again" : "Need help?"}
              </span>
              <h2>
                {failed ? "Back to products" : "No email after an hour?"}
              </h2>
              <p>
                {failed
                  ? "Pick your platform and go through checkout again."
                  : "Write to us and include your payment reference so we can find your order."}
              </p>
              <span className="contact-card-cta">
                {failed ? "View products" : SUPPORT_EMAIL}
                <Icon name="arrow" size={14} />
              </span>
            </a>
            {reference && (
              <div className="contact-card">
                <span className="legal-sec-num">Payment reference</span>
                <h2 className="payment-ref">{reference}</h2>
                <p>Keep this for your records.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
