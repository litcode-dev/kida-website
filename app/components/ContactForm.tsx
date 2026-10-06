"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";
type Field = "name" | "email" | "subject" | "message";

const LABELS: Record<Field, string> = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

/* The API reports a rejected field as "body -> email: value is not a valid
 * email address: An email address must have an @-sign." Pull out the field
 * and the most specific part of the reason. */
function parseFieldError(message: string): { field: Field; text: string } | null {
  const m = /^body -> (\w+): (.+)$/.exec(message);
  if (!m || !(m[1] in LABELS)) return null;
  const field = m[1] as Field;
  const reason = m[2].split(": ").pop() ?? m[2];
  return { field, text: `${LABELS[field]}: ${reason}` };
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [badField, setBadField] = useState<Field | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus("error");
      setFeedback("Please fill in every field.");
      setBadField(null);
      return;
    }
    setStatus("loading");
    setFeedback("");
    setBadField(null);

    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

    try {
      const res = await fetch(`${base}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 429 || typeof data.error === "string") {
        setStatus("error");
        setFeedback(
          `You have sent several messages in the last hour. Please try again later, or email ${fallbackEmail}.`
        );
        return;
      }

      if (!res.ok || data.status === "error") {
        const fieldError =
          typeof data.message === "string" ? parseFieldError(data.message) : null;
        setStatus("error");
        setBadField(fieldError?.field ?? null);
        setFeedback(fieldError?.text ?? "Something went wrong. Please try again.");
        return;
      }

      const replyTo: string = data.data?.email ?? email.trim();
      setStatus("success");
      setFeedback(
        `${data.message ?? "Message sent"}. We will reply to ${replyTo}.`
      );
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-form newsletter-success" role="status">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <circle cx="9" cy="9" r="8.5" stroke="currentColor" />
          <path
            d="M5.5 9l2.5 2.5 4.5-5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{feedback}</span>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-row">
        <label className="contact-field">
          <span>Your name</span>
          <input
            type="text"
            className="newsletter-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={badField === "name" || undefined}
            autoComplete="name"
            required
            disabled={loading}
          />
        </label>
        <label className="contact-field">
          <span>Email</span>
          <input
            type="email"
            className="newsletter-input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={badField === "email" || undefined}
            autoComplete="email"
            required
            disabled={loading}
          />
        </label>
      </div>
      <label className="contact-field">
        <span>Subject</span>
        <input
          type="text"
          className="newsletter-input"
          placeholder="Licensing, billing, a bug…"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          aria-invalid={badField === "subject" || undefined}
          required
          disabled={loading}
        />
      </label>
      <label className="contact-field">
        <span>Message</span>
        <textarea
          className="newsletter-input"
          rows={6}
          placeholder="Tell us what you need — include your device and app version if something is not working."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={badField === "message" || undefined}
          required
          disabled={loading}
        />
      </label>
      {status === "error" && (
        <p className="newsletter-error" role="alert">
          {feedback}
        </p>
      )}
      <div className="contact-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading && <span className="newsletter-spinner" aria-hidden />}
          Send message
        </button>
        <span className="contact-hint">
          Or write to <a href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a>{" "}
          directly.
        </span>
      </div>
    </form>
  );
}
