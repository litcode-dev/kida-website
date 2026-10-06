"use client";

import { useState } from "react";

const TOPICS = [
  "General question",
  "Help with the app",
  "Billing or Kiɗa Premium",
  "Marketplace or a pack",
  "Press or partnership",
] as const;

/* There is no contact endpoint on the API, so the form composes an email in
 * the visitor's own mail app. Nothing is sent from this page. */
export function ContactForm({ to }: { to: string }) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please write a message first.");
      return;
    }
    setError("");
    const subject = `${topic} — Kiɗa`;
    const body = name.trim() ? `${message.trim()}\n\n— ${name.trim()}` : message.trim();
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-row">
        <label className="contact-field">
          <span>Your name</span>
          <input
            type="text"
            className="newsletter-input"
            placeholder="Optional"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </label>
        <label className="contact-field">
          <span>Topic</span>
          <select
            className="newsletter-input"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="contact-field">
        <span>Message</span>
        <textarea
          className="newsletter-input"
          rows={6}
          placeholder="Tell us what you need — include your device and app version if something is not working."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>
      {error && (
        <p className="newsletter-error" role="alert">
          {error}
        </p>
      )}
      <div className="contact-actions">
        <button type="submit" className="btn btn-primary">
          Open in your email app
        </button>
        <span className="contact-hint">
          Or write to <a href={`mailto:${to}`}>{to}</a> directly.
        </span>
      </div>
    </form>
  );
}
