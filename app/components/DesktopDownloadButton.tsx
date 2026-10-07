"use client";

import { useDownloadModal } from "./DownloadModalProvider";
import type { Platform } from "./DownloadModal";

/* Best guess at the visitor's desktop OS; they can switch in the modal. */
function guessPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/Mac/i.test(ua)) return "macos";
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return "linux";
  return "windows";
}

export function DesktopDownloadButton({
  app,
  className,
  children,
}: {
  app: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useDownloadModal();
  return (
    <button
      type="button"
      className={className}
      onClick={() => open(guessPlatform(), app)}
    >
      {children}
    </button>
  );
}
