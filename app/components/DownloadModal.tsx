"use client";

import { useEffect, useRef, useState } from "react";

export type Platform = "macos" | "windows";

type Status = "idle" | "loading" | "success" | "error";

const LABELS: Record<Platform, string> = {
  macos: "macOS",
  windows: "Windows",
};

export function DownloadModal({
  platform,
  onClose,
  onSwitchPlatform,
}: {
  platform: Platform;
  onClose: () => void;
  onSwitchPlatform: (p: Platform) => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const other: Platform = platform === "macos" ? "windows" : "macos";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "loading") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, status]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

    try {
      const res = await fetch(`${base}/api/v1/desktop/request-download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, platform }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.detail
            ? "Please enter a valid email address."
            : "Something went wrong. Please try again.",
        );
        setStatus("error");
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
        if (status !== "loading") onClose();
      }}
    >
      <div
        className="dl-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dl-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="dl-close"
          aria-label="Close"
          onClick={onClose}
          disabled={status === "loading"}
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="dl-success">
            <span className="dl-check" aria-hidden>
              ✓
            </span>
            <h3 id="dl-title">You&apos;re all set</h3>
            <p className="dl-sub">{message}</p>
          </div>
        ) : (
          <>
            <span className="dl-eyebrow">FREE DOWNLOAD</span>
            <h3 id="dl-title">Download Kiɗa for {LABELS[platform]}</h3>
            <p className="dl-sub">
              Enter your email and we&apos;ll send your {LABELS[platform]}{" "}
              download link.
            </p>
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
                  disabled={status === "loading"}
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="btn btn-solid"
                  disabled={status === "loading"}
                >
                  {status === "loading" && (
                    <span className="dl-spinner" aria-hidden />
                  )}
                  SEND LINK
                </button>
              </div>
              {status === "error" && (
                <p className="dl-error" role="alert">
                  {message}
                </p>
              )}
            </form>
            <button
              type="button"
              className="dl-switch"
              onClick={() => onSwitchPlatform(other)}
            >
              Need the {LABELS[other]} version?
            </button>
          </>
        )}
      </div>
    </div>
  );
}
