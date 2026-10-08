"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDownloadModal } from "./DownloadModalProvider";
import type { Platform } from "./DownloadModal";
import { Icon } from "./Icon";

type PublicApp = {
  name: string;
  available_os?: string[];
  paid_os?: string[];
  links?: { android?: string; ios?: string };
  is_paid: boolean;
  price: string | null;
  currency: string | null;
};

const DESKTOP: Platform[] = ["macos", "windows", "linux"];
const DESKTOP_LABELS: Record<Platform, string> = {
  macos: "Mac",
  windows: "Windows",
  linux: "Linux",
};

/* Private builds (an APK on R2) come back as links that expire after an
   hour, so a page left open longer re-fetches before following one. */
const LINK_TTL_MS = 50 * 60 * 1000;

async function fetchApp(name: string): Promise<PublicApp | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const res = await fetch(`${base}/api/v1/app/apps`, { cache: "no-store" });
  if (!res.ok) return null;
  const body: { data?: PublicApp[] } = await res.json();
  const wanted = name.toLowerCase();
  return body.data?.find((a) => a.name.toLowerCase() === wanted) ?? null;
}

/* Best guess at the visitor's desktop OS; they can switch in the modal. */
function guessPlatform(options: Platform[]): Platform {
  const ua = navigator.userAgent;
  const guess: Platform = /Mac/i.test(ua)
    ? "macos"
    : /Linux/i.test(ua) && !/Android/i.test(ua)
      ? "linux"
      : "windows";
  return options.includes(guess) ? guess : options[0];
}

function joinLabels(platforms: Platform[]) {
  const names = platforms.map((p) => DESKTOP_LABELS[p]);
  return names.length > 1
    ? `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`
    : names[0];
}

function formatPrice(price: string | null, currency: string | null) {
  const value = Number(price);
  if (!price || !currency || Number.isNaN(value)) return null;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${price}`;
  }
}

function isHost(url: string, host: string) {
  try {
    return new URL(url).hostname.endsWith(host);
  } catch {
    return false;
  }
}

/* Store and download buttons for an app published through the backend:
   Android and iOS links straight from GET /app/apps, desktop through the
   email (and, when paid, checkout) modal. */
export function AppDownloads({ app }: { app: string }) {
  const { open } = useDownloadModal();
  const [info, setInfo] = useState<PublicApp | null>(null);
  const fetchedAt = useRef(0);

  const load = useCallback(async () => {
    try {
      const found = await fetchApp(app);
      fetchedAt.current = Date.now();
      setInfo(found);
      return found;
    } catch {
      return null;
    }
  }, [app]);

  useEffect(() => {
    let live = true;
    fetchApp(app)
      .then((found) => {
        if (!live) return;
        fetchedAt.current = Date.now();
        setInfo(found);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [app]);

  async function followMobile(
    e: React.MouseEvent<HTMLAnchorElement>,
    os: "android" | "ios",
  ) {
    if (Date.now() - fetchedAt.current < LINK_TTL_MS) return;
    e.preventDefault();
    const fresh = (await load())?.links?.[os];
    /* No longer a direct click, so a new tab would be blocked. */
    if (fresh) window.location.assign(fresh);
  }

  /* Until the list loads (or if it can't), offer every desktop platform;
     the backend answers 404 for a build that doesn't exist. */
  const desktop = info
    ? DESKTOP.filter((p) => info.available_os?.includes(p))
    : DESKTOP;
  const paidDesktop = info?.paid_os?.some((os) =>
    DESKTOP.includes(os as Platform),
  );
  const price = paidDesktop ? formatPrice(info!.price, info!.currency) : null;
  const android = info?.links?.android;
  const ios = info?.links?.ios;

  return (
    <div className="product-actions">
      {desktop.length > 0 && (
        <button
          type="button"
          className="btn btn-solid product-store"
          onClick={() => open(guessPlatform(desktop), app, desktop)}
        >
          {`Get ${app} for ${joinLabels(desktop)}${price ? ` · ${price}` : ""}`}
        </button>
      )}
      {android && (
        <a
          className="btn btn-ghost btn-icon product-store"
          href={android}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => followMobile(e, "android")}
        >
          {isHost(android, "play.google.com") ? (
            <>
              <Icon name="googleplay" size={18} />
              Get it on Google Play
            </>
          ) : (
            <>
              <Icon name="android" size={18} />
              Download for Android
            </>
          )}
        </a>
      )}
      {ios && (
        <a
          className="btn btn-ghost btn-icon product-store"
          href={ios}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => followMobile(e, "ios")}
        >
          <Icon name="apple" size={18} />
          {isHost(ios, "testflight.apple.com")
            ? "Join the TestFlight beta"
            : "Download on the App Store"}
        </a>
      )}
    </div>
  );
}
