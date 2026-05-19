"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; n: string; t: string };

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="legal-toc" aria-label="On this page">
      <div className="legal-toc-head">On this page</div>
      <ol>
        {items.map((i) => (
          <li
            key={i.id}
            className={"legal-toc-item" + (active === i.id ? " active" : "")}
          >
            <a href={`#${i.id}`}>
              <span className="n">{i.n}</span>
              <span className="t">{i.t}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
