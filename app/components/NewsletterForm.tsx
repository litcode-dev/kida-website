"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

    try {
      const res = await fetch(`${base}/api/v1/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.detail) {
          setMessage("Please enter a valid email address.");
        } else {
          setMessage("Something went wrong. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Subscribed successfully");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="newsletter-block reveal">
      <div className="newsletter-copy">
        <span className="eyebrow">
          <span className="dot" />
          Newsletter
        </span>
        <h3>Stay in the loop</h3>
        <p>
          Product updates, new Marketplace packs, and the occasional story
          from the team — no fluff, unsubscribe any time.
        </p>
      </div>

      {status === "success" ? (
        <div className="newsletter-success">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden
          >
            <circle cx="9" cy="9" r="8.5" stroke="currentColor" />
            <path
              d="M5.5 9l2.5 2.5 4.5-5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{message}</span>
        </div>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          <div className="newsletter-field">
            <input
              type="email"
              className="newsletter-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={status === "loading"}
            >
              {status === "loading" && (
                <span className="newsletter-spinner" aria-hidden />
              )}
              Subscribe
            </button>
          </div>
          {status === "error" && (
            <p className="newsletter-error" role="alert">
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
