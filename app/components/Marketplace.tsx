import { Icon } from "./Icon";
import { LoopArt, type LoopArtKind } from "./LoopArt";

const packs: Array<{
  t: string;
  a: string;
  p: string;
  c: string;
  k: LoopArtKind;
}> = [
  {
    t: "Afrobeat Worship · 24 Loops",
    a: "by Onye Adeleke",
    p: "Free",
    c: "linear-gradient(160deg, #e85d7a, #c4385b)",
    k: "burst-tight",
  },
  {
    t: "Widely Serene · Drone Pack",
    a: "Kiɗa Studio",
    p: "Free",
    c: "linear-gradient(160deg, #8a6cf0, #6038c8)",
    k: "dots",
  },
  {
    t: "Contemporary Gospel · 125 BPM",
    a: "by Mason Reeves",
    p: "$8",
    c: "linear-gradient(160deg, #e8c84a, #c2a020)",
    k: "burst-wide",
  },
  {
    t: "Highlife Drum Kit",
    a: "by Theo Daniels",
    p: "$6",
    c: "linear-gradient(160deg, #5fc8a0, #2e8b6e)",
    k: "burst-tight",
  },
  {
    t: "Modal Drones · 12 Keys",
    a: "Kiɗa Studio",
    p: "Free",
    c: "linear-gradient(160deg, #4aa8e8, #2070c2)",
    k: "dots",
  },
  {
    t: "Sunday Set · 8 Setlists",
    a: "by Halls of Stone",
    p: "Free",
    c: "linear-gradient(160deg, #ef8a4a, #c25420)",
    k: "burst-wide",
  },
  {
    t: "Lagos Nights · Live Loops",
    a: "by Aila Ström",
    p: "$12",
    c: "linear-gradient(160deg, #b15ce8, #7a30b8)",
    k: "burst-tight",
  },
  {
    t: "Just Intonation · Drones",
    a: "by Hana Mori",
    p: "Free",
    c: "linear-gradient(160deg, #d97a4a, #a04820)",
    k: "dots",
  },
];

export function Marketplace() {
  const doubled = [...packs, ...packs];

  return (
    <section id="marketplace">
      <div className="wrap">
        <div className="sec-head-row reveal">
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">
              <span className="dot" />
              Marketplace
            </span>
            <h2>
              One library.
              <br />
              Every musician.
            </h2>
            <p className="lead">
              Share setlists. Download drones. Browse sample packs built by the
              Kiɗa community.
            </p>
          </div>
          <a className="btn btn-ghost" href="#marketplace">
            Browse all <Icon name="arrow" size={14} />
          </a>
        </div>
      </div>

      <div className="marquee reveal">
        <div className="marquee-track">
          {doubled.map((p, i) => (
            <div key={i} className="pack">
              <div className="pack-art" style={{ background: p.c }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    opacity: 0.92,
                  }}
                >
                  <div style={{ width: "42%", height: "60%" }}>
                    <LoopArt kind={p.k} />
                  </div>
                </div>
                <span className="label">
                  {p.t.split(" · ")[0].toUpperCase()}
                </span>
              </div>
              <h4>{p.t}</h4>
              <div className="pack-meta">
                <span>{p.a}</span>
                <span className={"price " + (p.p === "Free" ? "free" : "")}>
                  {p.p}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
