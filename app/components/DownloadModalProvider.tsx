"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { DownloadModal, type Platform } from "./DownloadModal";

type DownloadModalContextValue = {
  /* `app` is the backend app_name; omit it for the default Kiɗa installer. */
  open: (platform: Platform, app?: string) => void;
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
  const [app, setApp] = useState<string | undefined>(undefined);

  const open = useCallback((p: Platform, a?: string) => {
    setApp(a);
    setPlatform(p);
  }, []);
  const close = useCallback(() => setPlatform(null), []);

  return (
    <DownloadModalContext.Provider value={{ open, close }}>
      {children}
      {platform && (
        <DownloadModal
          platform={platform}
          app={app}
          onClose={close}
          onSwitchPlatform={setPlatform}
        />
      )}
    </DownloadModalContext.Provider>
  );
}
