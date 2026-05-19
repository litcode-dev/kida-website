import { Icon } from "./Icon";

export function Pricing() {
  return (
    <section id="pricing">
      <div className="wrap">
        <div
          className="sec-head reveal"
          style={{
            alignItems: "center",
            textAlign: "center",
            margin: "0 auto 56px",
          }}
        >
          <span className="eyebrow" style={{ alignSelf: "center" }}>
            <span className="dot" />
            Pricing
          </span>
          <h2>
            Free to start.
            <br />
            Pro when you need it.
          </h2>
        </div>

        <div className="price-grid reveal">
          <div className="price-card">
            <div className="price-head">
              <span className="tier">Free</span>
            </div>
            <div>
              <div className="price-amt">
                $0<span className="per">/ forever</span>
              </div>
              <p className="price-desc" style={{ marginTop: 10 }}>
                Everything a working musician needs to play tonight.
              </p>
            </div>
            <ul className="price-feats">
              <li>
                <Icon name="check" size={16} /> Unlimited setlists &amp; songs
              </li>
              <li>
                <Icon name="check" size={16} /> Built-in drones, every key
              </li>
              <li>
                <Icon name="check" size={16} /> Basic MIDI mapping
              </li>
              <li>
                <Icon name="check" size={16} /> Offline playback
              </li>
              <li>
                <Icon name="check" size={16} /> Marketplace browsing
              </li>
            </ul>
            <a
              className="btn btn-ghost"
              href="#download"
              style={{ justifyContent: "center" }}
            >
              Download Free
            </a>
          </div>

          <div className="price-card pro">
            <div className="price-head">
              <span className="tier">Pro</span>
              <span className="badge">For touring</span>
            </div>
            <div>
              <div className="price-amt">
                $8<span className="per">/ month · billed annually</span>
              </div>
              <p className="price-desc" style={{ marginTop: 10 }}>
                Deep Ableton control, advanced MIDI routing, cloud sync.
              </p>
            </div>
            <ul className="price-feats">
              <li>
                <Icon name="check" size={16} /> Everything in Free
              </li>
              <li>
                <Icon name="check" size={16} /> Ableton Live 12 deep integration
              </li>
              <li>
                <Icon name="check" size={16} /> Multi-controller MIDI matrix
              </li>
              <li>
                <Icon name="check" size={16} /> Cloud sync across devices
              </li>
              <li>
                <Icon name="check" size={16} /> Sell on the Marketplace
              </li>
              <li>
                <Icon name="check" size={16} /> Priority support
              </li>
            </ul>
            <a
              className="btn btn-primary"
              href="#download"
              style={{ justifyContent: "center" }}
            >
              Start 14-day trial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
