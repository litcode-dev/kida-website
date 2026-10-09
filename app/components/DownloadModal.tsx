"use client";

import { useEffect, useRef, useState } from "react";

export type Platform = "macos" | "windows" | "linux";

type Status = "idle" | "loading" | "success" | "redirecting" | "error";

const LABELS: Record<Platform, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};

/* The default Kiɗa installer has no Linux build; named apps may. */
const KIDA_PLATFORMS: Platform[] = ["macos", "windows"];
const APP_PLATFORMS: Platform[] = ["macos", "windows", "linux"];

/* Gateway the backend uses when a named app is paid. */
const PAYMENT_PROVIDER = "flutterwave";

type DownloadResponse = {
  message?: string;
  data?: {
    payment_required?: boolean;
    checkout_url?: string;
    amount?: string;
    currency?: string;
  };
};

function errorMessage(code: number, name: string, platform: Platform) {
  switch (code) {
    case 404:
      return `${name} isn't available for ${LABELS[platform]} yet.`;
    case 422:
      return "Please enter a valid email address.";
    case 429:
      return "Too many requests. Please try again in an hour.";
    case 503:
      return "Payments are unavailable right now. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
}

function formatPrice(amount?: string, currency?: string) {
  const value = Number(amount);
  if (!amount || !currency || Number.isNaN(value)) return null;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(value);
  } catch {
    return `${currency} ${amount}`;
  }
}

export function DownloadModal({
  platform,
  app,
  platforms: offered,
  onClose,
  onSwitchPlatform,
}: {
  platform: Platform;
  /* Backend app_name; omitted for the default Kiɗa installer. */
  app?: string;
  /* Platforms the app has builds for; defaults to all desktop platforms. */
  platforms?: Platform[];
  onClose: () => void;
  onSwitchPlatform: (p: Platform) => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const name = app ?? "Kiɗa";
  const platforms = app ? (offered ?? APP_PLATFORMS) : KIDA_PLATFORMS;
  const other: Platform = platform === "macos" ? "windows" : "macos";
  const busy = status === "loading" || status === "redirecting";

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    return () => trigger?.focus();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [platform]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, busy]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

    try {
      const res = await fetch(`${base}/api/v1/app/download-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          app
            ? { email, os: platform, app_name: app, provider: PAYMENT_PROVIDER }
            : { email, os: platform },
        ),
      });

      if (!res.ok) {
        setMessage(errorMessage(res.status, name, platform));
        setStatus("error");
        return;
      }

      const data: DownloadResponse = await res.json();
      const checkoutUrl = data.data?.checkout_url;

      if (data.data?.payment_required) {
        if (!checkoutUrl || !checkoutUrl.startsWith("https://")) {
          setMessage("Something went wrong. Please try again.");
          setStatus("error");
          return;
        }
        const price = formatPrice(data.data.amount, data.data.currency);
        setStatus("redirecting");
        setMessage(
          `Taking you to checkout${price ? ` (${price})` : ""}. Your download link is emailed once payment goes through.`,
        );
        window.location.assign(checkoutUrl);
        return;
      }

      setStatus("success");
      setMessage(
        data.message ??
          `Check your inbox — your ${LABELS[platform]} download link is on the way.`,
      );
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="dl-backdrop"
      onClick={() => {
        if (!busy) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="dl-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dl-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          className="dl-close"
          aria-label="Close"
          onClick={() => {
            if (!busy) onClose();
          }}
          disabled={busy}
        >
          ✕
        </button>

        {status === "success" || status === "redirecting" ? (
          <div className="dl-success" role="status">
            <span className="dl-check" aria-hidden="true">
              {status === "redirecting" ? (
                <span className="dl-spinner dl-spinner-accent" />
              ) : (
                "✓"
              )}
            </span>
            <h3 id="dl-title">
              {status === "redirecting" ? "One more step" : "You're all set"}
            </h3>
            <p className="dl-sub">{message}</p>
          </div>
        ) : (
          <>
            <span className="dl-eyebrow">
              {app ? "DOWNLOAD" : "FREE DOWNLOAD"}
            </span>
            <h3 id="dl-title">
              Download {name} for {LABELS[platform]}
            </h3>
            <p className="dl-sub">
              {app
                ? "Enter your email and we'll send your download link. If there's a fee, you'll pay first and the link follows by email."
                : `Enter your email and we'll send your ${LABELS[platform]} download link.`}
            </p>
            {app && platforms.length > 1 && (
              <div className="dl-os" role="radiogroup" aria-label="Platform">
                {platforms.map((p) => (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={p === platform}
                    className="dl-os-option"
                    onClick={() => onSwitchPlatform(p)}
                    disabled={busy}
                  >
                    {LABELS[p]}
                  </button>
                ))}
              </div>
            )}
            <form className="dl-form" onSubmit={handleSubmit} noValidate>
              <div className="dl-field">
                <input
                  ref={inputRef}
                  type="email"
                  className="dl-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={busy}
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="btn btn-solid"
                  disabled={busy}
                >
                  {status === "loading" && (
                    <span className="dl-spinner" aria-hidden="true" />
                  )}
                  {app ? "CONTINUE" : "SEND LINK"}
                </button>
              </div>
              {status === "error" && (
                <p className="dl-error" role="alert">
                  {message}
                </p>
              )}
            </form>
            {!app && (
              <button
                type="button"
                className="dl-switch"
                onClick={() => onSwitchPlatform(other)}
              >
                Need the {LABELS[other]} version?
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
