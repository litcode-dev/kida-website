type IconName =
  | "play"
  | "apple"
  | "android"
  | "arrow"
  | "check"
  | "link"
  | "stack"
  | "wave"
  | "twitter"
  | "discord"
  | "github";

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
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
          <path d="M17.3 4h2.7l-5.9 6.7L21 20h-5.4l-4.2-5.5L6.6 20H3.9l6.3-7.2L3 4h5.5l3.8 5 4.9-5z" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
          <path d="M20 5.4A18 18 0 0015.5 4l-.2.3a13.6 13.6 0 014.3 2.1 14.5 14.5 0 00-15 0A13.6 13.6 0 018.7 4.3L8.5 4A18 18 0 004 5.4C1.5 9 1 12.6 1.3 16a18 18 0 005.4 2.7l1.1-1.5a11.5 11.5 0 01-1.8-.9l.4-.3a13 13 0 0011.2 0l.4.3-1.8.9 1.1 1.5A18 18 0 0022.7 16c.3-3.9-.4-7.5-2.7-10.6zM8.7 14c-1 0-1.9-1-1.9-2.1S7.6 9.8 8.7 9.8s1.9 1 1.9 2.1S9.7 14 8.7 14zm6.6 0c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.9 2.1-1.9 2.1z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
          <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z" />
        </svg>
      );
  }
}
