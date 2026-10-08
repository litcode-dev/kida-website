"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AppDownloads,
  fetchApps,
  isStale,
  sameApp,
  type PublicApp,
} from "./AppDownloads";
import { KidaMark } from "./KidaMark";

/* undefined while loading, null when the list couldn't be fetched. */
type Apps = PublicApp[] | null | undefined;

/* The products page grid: one card per active app in GET /app/apps. */
export function ProductGrid() {
  const [apps, setApps] = useState<Apps>(undefined);
  const fetchedAt = useRef(0);

  const load = useCallback(async () => {
    let list: PublicApp[] | null = null;
    try {
      list = await fetchApps();
    } catch {
      list = null;
    }
    fetchedAt.current = Date.now();
    setApps(list);
    return list;
  }, []);

  useEffect(() => {
    let live = true;
    fetchApps()
      .catch(() => null)
      .then((list) => {
        if (!live) return;
        fetchedAt.current = Date.now();
        setApps(list);
      });
    return () => {
      live = false;
    };
  }, []);

  const stale = useCallback(() => isStale(fetchedAt.current), []);

  const freshInfo = useCallback(
    async (name: string) =>
      (await load())?.find((a) => sameApp(a.name, name)) ?? null,
    [load],
  );

  if (apps === undefined) {
    return (
      <div className="product-grid" aria-busy="true" aria-label="Loading products">
        {[0, 1].map((i) => (
          <div key={i} className="product-card product-skeleton" aria-hidden />
        ))}
      </div>
    );
  }

  if (apps === null || apps.length === 0) {
    return (
      <div className="product-empty">
        <p>
          {apps === null
            ? "We couldn't load our products just now."
            : "No products are available right now."}
        </p>
        {apps === null && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setApps(undefined);
              load();
            }}
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {apps.map((a) => (
        <article key={a.name} className="product-card">
          <span className="product-mark">
            {sameApp(a.name, "Kida") ? (
              <KidaMark size={30} />
            ) : (
              <span className="product-letter">
                {a.name.charAt(0).toUpperCase()}
              </span>
            )}
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
