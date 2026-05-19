import { Icon } from "./Icon";

const steps = [
  {
    n: "Step 01",
    t: "Connect",
    d: "Pair your laptop, MIDI controllers, and in-ear monitors. Kiɗa autodetects Ableton Live 12 on the same network.",
    i: "link" as const,
  },
  {
    n: "Step 02",
    t: "Build your set",
    d: "Drag songs into order, attach scenes, set tempos and keys. Save once — it’s yours forever, offline.",
    i: "stack" as const,
  },
  {
    n: "Step 03",
    t: "Perform",
    d: "Big touch targets. Glanceable timecode. Drones at your thumb. Tap the next song, the room follows.",
    i: "wave" as const,
  },
];

export function HowItWorks() {
  return (
    <section id="how">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            How it works
          </span>
          <h2>
            Three steps.
            <br />
            Then you play.
          </h2>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div
              key={i}
              className="step reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="icon">
                <Icon name={s.i} size={22} />
              </div>
              <div className="num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
