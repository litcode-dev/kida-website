"use client";

import { useEffect, useState } from "react";
import { KidaMark } from "./KidaMark";

const SHOW_MS = 700;
const FADE_MS = 500;

export function LoadingOverlay() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setHidden(true), SHOW_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const t = window.setTimeout(() => setRemoved(true), FADE_MS + 80);
    return () => window.clearTimeout(t);
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      className={"loading-overlay" + (hidden ? " is-hidden" : "")}
      role="status"
      aria-live="polite"
      aria-hidden={hidden}
    >
      <div className="loading-inner">
        <div className="loading-mark">
          <KidaMark size={56} />
        </div>
        <div className="loading-word">Kiɗa</div>
        <div className="loading-bar" aria-hidden="true">
          <span />
        </div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
