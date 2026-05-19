import Image from "next/image";

const screens = [
  {
    src: "/IMG_4565.PNG",
    tag: "Library",
    title: "Offline-first. Always.",
    alt: "Kiɗa library showing downloaded loops while offline",
  },
  {
    src: "/IMG_4564.PNG",
    tag: "Browse",
    title: "Filter by feel, not folders.",
    alt: "Kiɗa library with genre category filters",
  },
  {
    src: "/IMG_4567.PNG",
    tag: "Built-in",
    title: "A full kit, day one.",
    alt: "Kiɗa built-in samples picker",
  },
  {
    src: "/IMG_4568.PNG",
    tag: "Drones",
    title: "Lock your key in two taps.",
    alt: "Kiɗa drone key picker",
  },
];

export function Screens() {
  return (
    <section id="screens">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            Inside Kiɗa
          </span>
          <h2>
            The whole app,
            <br />
            in your pocket.
          </h2>
          <p className="lead">
            Library, drones, drum pads, samples — all one tap apart, online or
            off.
          </p>
        </div>

        <div className="screens-grid reveal">
          {screens.map((s, i) => (
            <div key={i} className="screen-card">
              <div className="screen-phone">
                <div className="screen-inner">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="200px"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              </div>
              <div className="screen-meta">
                <span className="screen-tag">{s.tag}</span>
                <h4>{s.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
