"use client";

import { useDownloadModal } from "./DownloadModalProvider";
import type { Platform } from "./DownloadModal";
import { Icon } from "./Icon";

export type PublicApp = {
  name: string;
  description?: string | null;
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
const DESKTOP_ICONS = {
  macos: "apple",
  windows: "windows",
  linux: "linux",
} as const satisfies Record<Platform, string>;

/* Private builds (an APK on R2) come back as links that expire after an
   hour, so a page left open longer re-fetches before following one. */
const LINK_TTL_MS = 50 * 60 * 1000;

export function isStale(fetchedAt: number) {
  return Date.now() - fetchedAt >= LINK_TTL_MS;
}

export async function fetchApps(): Promise<PublicApp[] | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const res = await fetch(`${base}/api/v1/app/apps`, { cache: "no-store" });
  if (!res.ok) return null;
  const body: { data?: PublicApp[] } = await res.json();
  return body.data ?? null;
}

/* Case- and accent-insensitive, so "Kiɗa" and "kida" match. */
export function sameApp(a: string, b: string) {
  const norm = (n: string) =>
    n.toLowerCase().replace(/ɗ/g, "d").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  return norm(a) === norm(b);
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

/* The card's price line: what desktop checkout charges, "on desktop" when
   the phone apps are free, or "Free" when nothing is paid. */
export function priceLabel(info: PublicApp) {
  const paidDesktop = info.paid_os?.some((os) =>
    DESKTOP.includes(os as Platform),
  );
  const price = paidDesktop ? formatPrice(info.price, info.currency) : null;
  if (!price) return info.is_paid ? null : "Free";
  return info.links?.android || info.links?.ios ? `${price} on desktop` : price;
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
   email (and, when paid, checkout) modal. `info` is null until the list
   loads; `freshInfo` re-fetches when the links may have expired. */
export function AppDownloads({
  app,
  info,
  stale,
  freshInfo,
}: {
  app: string;
  info: PublicApp | null;
  stale: () => boolean;
  freshInfo: () => Promise<PublicApp | null>;
}) {
  const { open } = useDownloadModal();

  async function followMobile(
    e: React.MouseEvent<HTMLAnchorElement>,
    os: "android" | "ios",
  ) {
    if (!stale()) return;
    e.preventDefault();
    const fresh = (await freshInfo())?.links?.[os];
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

  const mobile = (
    [
      ["android", android],
      ["ios", ios],
    ] as const
  ).filter((m): m is readonly ["android" | "ios", string] => Boolean(m[1]));

  return (
    <div className="platform-row">
      {mobile.map(([os, href]) => {
        const label =
          os === "android"
            ? isHost(href, "play.google.com")
              ? `Get ${app} on Google Play`
              : `Download ${app} for Android`
            : isHost(href, "testflight.apple.com")
              ? `Join the ${app} TestFlight beta`
              : `Get ${app} on the App Store`;
        return (
          <a
            key={os}
            className="platform-btn"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            onClick={(e) => followMobile(e, os)}
          >
            <Icon
              name={
                os === "ios"
                  ? "appstore"
                  : isHost(href, "play.google.com")
                    ? "googleplay"
                    : "android"
              }
              size={18}
            />
          </a>
        );
      })}
      {desktop.map((os) => {
        const label = `Download ${app} for ${DESKTOP_LABELS[os]}${price ? ` (${price})` : ""}`;
        return (
          <button
            key={os}
            type="button"
            className="platform-btn"
            aria-label={label}
            title={label}
            onClick={() => open(os, app, desktop)}
          >
            <Icon name={DESKTOP_ICONS[os]} size={18} />
          </button>
        );
      })}
    </div>
  );
}
