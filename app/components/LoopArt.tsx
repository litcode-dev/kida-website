export type LoopArtKind = "burst-tight" | "burst-wide" | "dots";

const r4 = (n: number) => Number(n.toFixed(4));

export function LoopArt({ kind }: { kind: LoopArtKind }) {
  if (kind === "burst-tight") {
    const rays = Array.from({ length: 28 }, (_, i) => i);
    return (
      <svg viewBox="-50 -50 100 100">
        {rays.map((i) => {
          const a = (i / 28) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={r4(Math.cos(a) * 18)}
              y1={r4(Math.sin(a) * 18)}
              x2={r4(Math.cos(a) * 40)}
              y2={r4(Math.sin(a) * 40)}
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        <circle r="10" fill="none" stroke="white" strokeWidth="3" />
      </svg>
    );
  }
  if (kind === "burst-wide") {
    const rays = Array.from({ length: 22 }, (_, i) => i);
    return (
      <svg viewBox="-50 -50 100 100">
        {rays.map((i) => {
          const a = (i / 22) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={r4(Math.cos(a) * 10)}
              y1={r4(Math.sin(a) * 10)}
              x2={r4(Math.cos(a) * 44)}
              y2={r4(Math.sin(a) * 44)}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
        <circle r="7" fill="white" />
      </svg>
    );
  }
  const dots = Array.from({ length: 20 }, (_, i) => i);
  return (
    <svg viewBox="-50 -50 100 100">
      {dots.map((i) => {
        const a = (i / 20) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={r4(Math.cos(a) * 32)}
            cy={r4(Math.sin(a) * 32)}
            r="3"
            fill="white"
          />
        );
      })}
    </svg>
  );
}
