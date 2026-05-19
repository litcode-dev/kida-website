"use client";

import { useEffect, useState } from "react";

export function TextGenerateEffect({
  text,
  delay = 0,
  stagger = 80,
}: {
  text: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(words.length);
      return;
    }
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < words.length; i++) {
      timeouts.push(
        setTimeout(() => setShown((s) => Math.max(s, i + 1)), delay + i * stagger)
      );
    }
    return () => timeouts.forEach(clearTimeout);
  }, [text, delay, stagger, words.length]);

  return (
    <>
      {words.map((w, i) => (
        <span key={i} className={`tge-word${i < shown ? " in" : ""}`}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
