function SetlistViz() {
  return (
    <div className="viz viz-setlist">
      <div className="col">
        <div className="card">
          <span className="num">01</span>
          <span>Open / Drone D</span>
          <span className="key">D · 3:00</span>
        </div>
        <div className="card now">
          <span className="num">02</span>
          <span>Heron Song</span>
          <span className="key">Dm · 4:42</span>
        </div>
        <div className="card">
          <span className="num">03</span>
          <span>Lowlands</span>
          <span className="key">G · 3:18</span>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <span className="num">04</span>
          <span>Salt &amp; Smoke</span>
          <span className="key">Em · 5:01</span>
        </div>
        <div className="card">
          <span className="num">05</span>
          <span>Marrow</span>
          <span className="key">A · 4:20</span>
        </div>
        <div className="card">
          <span className="num">06</span>
          <span>Northbound</span>
          <span className="key">Bm · 3:55</span>
        </div>
      </div>
    </div>
  );
}

function AbletonViz() {
  const cells = Array.from({ length: 20 }, (_, i) => i);
  const lit = new Set([0, 5, 6, 10, 14, 18]);
  const dim = new Set([1, 4, 9, 11, 15, 19]);
  return (
    <div className="viz viz-ableton">
      {cells.map((i) => (
        <div
          key={i}
          className={
            "cell " + (lit.has(i) ? "lit" : dim.has(i) ? "dim" : "")
          }
        />
      ))}
    </div>
  );
}

function DronesViz() {
  const notes = [
    "C",
    "C♯",
    "D",
    "D♯",
    "E",
    "F",
    "F♯",
    "G",
    "G♯",
    "A",
    "A♯",
    "B",
  ];
  return (
    <div className="viz viz-drones">
      <div className="wheel">
        <div className="center">D</div>
        {notes.map((n, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r = 88;
          const x = (Math.cos(angle) * r).toFixed(4);
          const y = (Math.sin(angle) * r).toFixed(4);
          return (
            <span
              key={n}
              className={"note " + (n === "D" ? "on" : "")}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {n}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function MidiViz() {
  return (
    <div className="viz viz-midi">
      <div className="col-l">
        <div className="chip on">
          <span className="d" />
          FOOTSWITCH 1
        </div>
        <div className="chip on">
          <span className="d" />
          EXPRESSION
        </div>
        <div className="chip">
          <span className="d" />
          CC 64
        </div>
        <div className="chip on">
          <span className="d" />
          CH 4 NOTE
        </div>
      </div>
      <div className="lines">
        <svg viewBox="0 0 100 140" preserveAspectRatio="none">
          <path
            d="M0 14 C 50 14, 50 28, 100 28"
            stroke="rgba(31,191,98,0.55)"
            strokeWidth="0.6"
            fill="none"
          />
          <path
            d="M0 50 C 50 50, 50 70, 100 70"
            stroke="rgba(31,191,98,0.55)"
            strokeWidth="0.6"
            fill="none"
          />
          <path
            d="M0 86 C 50 86, 50 96, 100 96"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.6"
            fill="none"
          />
          <path
            d="M0 122 C 50 122, 50 122, 100 122"
            stroke="rgba(31,191,98,0.55)"
            strokeWidth="0.6"
            fill="none"
          />
        </svg>
      </div>
      <div className="col-r">
        <div className="chip on">
          <span className="d" />
          NEXT SONG
        </div>
        <div className="chip on">
          <span className="d" />
          VOL → SEND A
        </div>
        <div className="chip">
          <span className="d" />
          SUSTAIN
        </div>
        <div className="chip on">
          <span className="d" />
          DRONE TOGGLE
        </div>
      </div>
    </div>
  );
}

export function Bento() {
  return (
    <section id="features">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            Features
          </span>
          <h2>
            Built for the stage,
            <br />
            not the spreadsheet.
          </h2>
          <p className="lead">
            Four things matter when the lights go down. Kiɗa does all four, and
            gets out of your way.
          </p>
        </div>

        <div className="bento reveal">
          <div className="bento-card b-setlist">
            <div className="b-head">
              <span className="b-tag">01 · Setlists</span>
              <h3>Setlists, saved instantly.</h3>
              <p>
                Name them, auto-save, jump between songs mid-show. Reorder with
                a long press. Never lose tonight&apos;s set to a dead battery.
              </p>
            </div>
            <SetlistViz />
          </div>

          <div className="bento-card b-ableton">
            <div className="b-head">
              <span className="b-tag">02 · Ableton</span>
              <h3>Ableton Live 12, natively.</h3>
              <p>
                Reads AudioClips, ScaleInformation, scenes. Trigger from your
                phone.
              </p>
            </div>
            <AbletonViz />
          </div>

          <div className="bento-card b-drones">
            <div className="b-head">
              <span className="b-tag">03 · Drones</span>
              <h3>Drones built-in.</h3>
              <p>
                Every key, every mode. Tap to lock your tonal center before the
                count-in.
              </p>
            </div>
            <DronesViz />
          </div>

          <div className="bento-card b-midi">
            <div className="b-head">
              <span className="b-tag">04 · MIDI</span>
              <h3>MIDI ready.</h3>
              <p>
                Map any controller, route any signal. Bluetooth, USB-C, or RTP
                MIDI over Wi-Fi.
              </p>
            </div>
            <MidiViz />
          </div>
        </div>
      </div>
    </section>
  );
}
