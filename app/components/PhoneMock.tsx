import { LoopArt } from "./LoopArt";

export function PhoneMock() {
  return (
    <div className="device-wrap">
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="scr">
            <div className="scr-toolbar">
              <div className="tb-l">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12h2l2-7 3 14 3-10 3 7 2-4h3" />
                </svg>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="6" />
                  <path d="M8 8l8 8M16 8l-8 8" />
                </svg>
              </div>
              <div className="bpm">
                <span className="pm">−</span>
                <span>120 BPM</span>
                <span className="pm">+</span>
              </div>
              <div className="tb-r">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 7h6l2 2h10v10H3z" />
                </svg>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 4h11l3 3v13H5z" />
                </svg>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                  <circle cx="9" cy="7" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="7" cy="17" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="scr-top">
              <div className="scr-title-xl">Studio</div>
              <div className="scr-pill">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Save
              </div>
            </div>

            <div className="scr-loops">
              <div className="scr-loop lp-pink">
                <div className="lp-name">
                  03.
                  <br />
                  BREAKDOWN
                </div>
                <div className="lp-art">
                  <LoopArt kind="burst-tight" />
                </div>
                <div className="lp-play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5l11 7-11 7V5z" />
                  </svg>
                </div>
              </div>
              <div className="scr-loop lp-yellow">
                <div className="lp-name">
                  125 BPM
                  <br />
                  WORROW
                </div>
                <div className="lp-art">
                  <LoopArt kind="burst-wide" />
                </div>
                <div className="lp-play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5l11 7-11 7V5z" />
                  </svg>
                </div>
              </div>
              <div className="scr-loop lp-purple">
                <div className="lp-name">
                  04.
                  <br />
                  MAIN LOOP
                </div>
                <div className="lp-art">
                  <LoopArt kind="dots" />
                </div>
                <div className="lp-play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5l11 7-11 7V5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="scr-pads">
              <div className="scr-pad has-key">D</div>
              <div className="scr-pad">+</div>
              <div className="scr-pad has-key">F</div>
              <div className="scr-pad">+</div>
              <div className="scr-pad has-key">A</div>
              <div className="scr-pad">+</div>
            </div>

            <div className="scr-tabbar">
              <div className="scr-tab">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <rect x="5" y="7" width="14" height="12" rx="2" />
                  <path d="M8 4h8M7 7h10" />
                </svg>
                <span>Setlists</span>
              </div>
              <div className="scr-tab active">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M6 5v14M10 5v14M14 5l4 14" />
                </svg>
                <span>Library</span>
              </div>
              <div className="scr-tab">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="9" r="3.5" />
                  <path d="M5 20c1.5-3.5 4.5-5 7-5s5.5 1.5 7 5" />
                </svg>
                <span>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
