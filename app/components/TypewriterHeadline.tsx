"use client";

import { useEffect, useState } from "react";

const LINES = ["Your setlist.", "Your stage.", "Your sound."];

export function TypewriterHeadline() {
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLine(LINES.length);
      setDone(true);
      return;
    }
    if (line >= LINES.length) {
      setDone(true);
      return;
    }
    const current = LINES[line];
    if (char < current.length) {
      const t = setTimeout(() => setChar((c) => c + 1), 55);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setChar(0);
    }, 360);
    return () => clearTimeout(t);
  }, [line, char]);

  return (
    <h1 className="typewriter">
      {LINES.map((text, i) => {
        const shown =
          i < line ? text : i === line ? text.slice(0, char) : "";
        const showCursor =
          (!done && i === line) || (done && i === LINES.length - 1);
        const reserveSpace = i > line;
        return (
          <span key={i} className="tw-line">
            {shown}
            {showCursor && <span className="tw-cursor" aria-hidden="true" />}
            {reserveSpace && <span className="tw-placeholder">&nbsp;</span>}
          </span>
        );
      })}
    </h1>
  );
}
