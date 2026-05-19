export function KidaMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10 Q 7 5.5 11 10 T 19 10 T 27 10" />
      <path d="M3 16 Q 7 11.5 11 16 T 19 16 T 27 16" />
      <path d="M3 22 Q 7 17.5 11 22 T 19 22 T 27 22" />
    </svg>
  );
}
