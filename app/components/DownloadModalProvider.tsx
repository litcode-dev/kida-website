"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { DownloadModal, type Platform } from "./DownloadModal";

type DownloadModalContextValue = {
  open: (platform: Platform) => void;
  close: () => void;
};

const DownloadModalContext = createContext<DownloadModalContextValue | null>(
  null,
);

export function useDownloadModal() {
  const ctx = useContext(DownloadModalContext);
  if (!ctx) {
    throw new Error(
      "useDownloadModal must be used within a DownloadModalProvider",
    );
  }
  return ctx;
}

export function DownloadModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [platform, setPlatform] = useState<Platform | null>(null);

  const open = useCallback((p: Platform) => setPlatform(p), []);
  const close = useCallback(() => setPlatform(null), []);

  return (
    <DownloadModalContext.Provider value={{ open, close }}>
      {children}
      {platform && (
        <DownloadModal
          platform={platform}
          onClose={close}
          onSwitchPlatform={setPlatform}
        />
      )}
    </DownloadModalContext.Provider>
  );
}
