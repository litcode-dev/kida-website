"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AppDownloads,
  fetchApps,
  isStale,
  sameApp,
  type PublicApp,
} from "./AppDownloads";
import { Icon } from "./Icon";

export type Product = {
  name: string;
  tagline: string;
  /* Shown until the API's description loads, or if it has none. */
  body: string;
  mark: React.ReactNode;
  /* Google Play listing, for apps not published through the API. */
  playStoreUrl?: string;
  /* Backend app name: description, store links and desktop downloads
     come from GET /app/apps. */
  apiApp?: string;
};

/* The products page grid. Known products keep their own copy and mark;
   any other active app the API lists gets a card of its own. */
export function ProductGrid({
  products,
  hide = [],
}: {
  products: Product[];
  /* API app names already covered by a card without `apiApp`. */
  hide?: string[];
}) {
  const [apps, setApps] = useState<PublicApp[] | null>(null);
  const fetchedAt = useRef(0);

  useEffect(() => {
    let live = true;
    fetchApps()
      .then((list) => {
        if (!live) return;
        fetchedAt.current = Date.now();
        setApps(list);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const stale = useCallback(() => isStale(fetchedAt.current), []);

  const freshInfo = useCallback(async (name: string) => {
    try {
      const list = await fetchApps();
      fetchedAt.current = Date.now();
      setApps(list);
      return list?.find((a) => sameApp(a.name, name)) ?? null;
    } catch {
      return null;
    }
  }, []);

  const find = (name: string) =>
    apps?.find((a) => sameApp(a.name, name)) ?? null;

  const known = [
    ...hide,
    ...products.flatMap((p) => (p.apiApp ? [p.apiApp] : [])),
  ];
  const extra = (apps ?? []).filter(
    (a) => !known.some((name) => sameApp(a.name, name)),
  );

  return (
    <div className="product-grid">
      {products.map((p) => {
        const info = p.apiApp ? find(p.apiApp) : null;
        return (
          <article key={p.name} className="product-card reveal">
            <span className="product-mark">{p.mark}</span>
            <span className="legal-sec-num">{p.tagline}</span>
            <h2>{p.name}</h2>
            <p>{info?.description || p.body}</p>
            {p.apiApp ? (
              <AppDownloads
                app={p.apiApp}
                info={info}
                stale={stale}
                freshInfo={() => freshInfo(p.apiApp!)}
              />
            ) : p.playStoreUrl ? (
              <div className="platform-row">
                <a
                  className="platform-btn"
                  href={p.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Get ${p.name} on Google Play`}
                  title={`Get ${p.name} on Google Play`}
                >
                  <Icon name="googleplay" size={18} />
                </a>
              </div>
            ) : null}
          </article>
        );
      })}
      {extra.map((a) => (
        <article key={a.name} className="product-card">
          <span className="product-mark">
            <span className="product-letter">
              {a.name.charAt(0).toUpperCase()}
            </span>
          </span>
          <h2>{a.name}</h2>
          {a.description && <p>{a.description}</p>}
          <AppDownloads
            app={a.name}
            info={a}
            stale={stale}
            freshInfo={() => freshInfo(a.name)}
          />
        </article>
      ))}
    </div>
  );
}
