type IconName =
  | "play"
  | "apple"
  | "android"
  | "googleplay"
  | "arrow"
  | "check"
  | "link"
  | "stack"
  | "wave"
  | "x"
  | "tiktok"
  | "instagram"
  | "youtube";

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const stroke = {
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "play":
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M7 5l12 7-12 7V5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
          <path d="M16.5 12.5c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.2-2.8.9-3.6.9-.8 0-1.9-.9-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.8 2.5 3 2.5 1.2-.1 1.7-.8 3.1-.8 1.4 0 1.9.8 3.1.7 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-.9-2.6-3.8zm-2.4-7c.7-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.2 1.8-1 2.9 1 .1 2-.5 2.7-1.3z" />
        </svg>
      );
    case "android":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
          <path d="M6 10h12v8.5a1 1 0 0 1-1 1h-1V22a1 1 0 1 1-2 0v-2.5h-4V22a1 1 0 1 1-2 0v-2.5H7a1 1 0 0 1-1-1V10Zm-3 .75a1.5 1.5 0 1 1 3 0v5a1.5 1.5 0 1 1-3 0v-5Zm15 0a1.5 1.5 0 1 1 3 0v5a1.5 1.5 0 1 1-3 0v-5ZM7.6 4.92 6.42 3.18a.5.5 0 1 1 .82-.56L8.43 4.4A7.04 7.04 0 0 1 12 3.5c1.3 0 2.5.32 3.57.9l1.19-1.78a.5.5 0 0 1 .82.56L16.4 4.92A6.45 6.45 0 0 1 18.5 9h-13c0-1.66.79-3.13 2.1-4.08ZM9.5 7.75A.75.75 0 1 0 9.5 6.25.75.75 0 0 0 9.5 7.75Zm5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
        </svg>
      );
    /* Google Play mark — keeps its brand colors so it stays recognisable
       on both the white page and the black footer. */
    case "googleplay":
      return (
        <svg viewBox="0 0 512 512" width={size} height={size}>
          <path
            fill="#00d3ff"
            d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"
          />
          <path fill="#00f076" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
          <path
            fill="#ffce00"
            d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z"
          />
          <path fill="#ff3a44" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M5 12l4 4 10-10" />
        </svg>
      );
    case "link":
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1" />
          <path d="M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 105.66 5.66l1-1" />
        </svg>
      );
    case "stack":
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 13l9 5 9-5" />
          <path d="M3 18l9 5 9-5" />
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M3 12h2l2-7 3 14 3-10 3 7 2-4h3" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
          <path d="M17.3 4h2.7l-5.9 6.7L21 20h-5.4l-4.2-5.5L6.6 20H3.9l6.3-7.2L3 4h5.5l3.8 5 4.9-5z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
          <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.8}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.2"
            cy="6.8"
            r="1.15"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      );
  }
}
