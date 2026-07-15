import { Icon } from "./Icon";
import { KidaMark } from "./KidaMark";

export function Footer() {
  return (
    <footer id="download">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#top" className="nav-logo">
              <span className="mark">
                <KidaMark size={26} />
              </span>
              <span>Kiɗa</span>
            </a>
            <p>
              The live performance companion for working musicians. Made in
              Lagos, Nigeria.
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 6,
                color: "var(--fg-3)",
              }}
            >
              <a href="#" aria-label="Twitter">
                <Icon name="twitter" size={16} />
              </a>
              <a href="#" aria-label="Discord">
                <Icon name="discord" size={16} />
              </a>
              <a href="#" aria-label="GitHub">
                <Icon name="github" size={16} />
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Product</h5>
            <a href="#features">Features</a>
            <a href="#marketplace">Library</a>
            <a href="#pricing">Pricing</a>
            <a href="#">Changelog</a>
            <a href="#">Roadmap</a>
          </div>
          <div className="foot-col">
            <h5>Resources</h5>
            <a href="#">Manual</a>
            <a href="#">Ableton setup</a>
            <a href="#">MIDI guide</a>
            <a href="#">Community</a>
            <a href="#">Support</a>
          </div>
          <div className="foot-col">
            <h5>Legal</h5>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="#">Marketplace terms</a>
            <a href="#">Press kit</a>
          </div>
        </div>

        <div className="foot-bot">
          <span>© 2026 Kiɗa Audio Inc.</span>
          <span className="status">
            <span className="dot" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
