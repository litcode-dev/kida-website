import { ImageResponse } from "next/og";

export const alt = "Kiɗa — Your setlist. Your stage. Your sound.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#090b06",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,255,46,0.18), transparent 70%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row: wave mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <svg
            viewBox="0 0 32 32"
            width={92}
            height={92}
            fill="none"
            stroke="#c9ff2e"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 10 Q 7 5.5 11 10 T 19 10 T 27 10" />
            <path d="M3 16 Q 7 11.5 11 16 T 19 16 T 27 16" />
            <path d="M3 22 Q 7 17.5 11 22 T 19 22 T 27 22" />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#f2ffd9",
            }}
          >
            Ki<span style={{ color: "#c9ff2e" }}>ɗ</span>a
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#f2ffd9",
            }}
          >
            <span>Your setlist. Your stage.</span>
            <span style={{ color: "#c9ff2e" }}>Your sound.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#8a9a72", maxWidth: 940 }}>
            The live-performance companion for working musicians — setlists,
            Ableton Live control, built-in drones, MIDI ready.
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#8a9a72",
            borderTop: "1px solid #232c15",
            paddingTop: 26,
          }}
        >
          <span>iOS · Android · Desktop · Plugin</span>
          <span style={{ color: "#c9ff2e" }}>kida.litcode.com.ng</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
