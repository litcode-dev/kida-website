"use client";

import { useState, useEffect, useRef } from "react";
import { LoopArt } from "./LoopArt";

export function PhoneMock() {
  const [bpm, setBpm] = useState(120);
  const [activeTab, setActiveTab] = useState<"library" | "setlists" | "profile">("library");
  const [playingLoop, setPlayingLoop] = useState<number | null>(null);
  const [activePad, setActivePad] = useState<number | null>(null);
  const [saveClicked, setSaveClicked] = useState(false);
  const [loadedSongIndex, setLoadedSongIndex] = useState<number | null>(1); // heron song active

  // Audio Context Ref
  const phoneAudioCtxRef = useRef<AudioContext | null>(null);
  const loopTimerRef = useRef<any>(null);

  // Play synthetic beat loops depending on active loop index
  const playPhoneLoop = (loopIndex: number, currentBpm: number) => {
    stopPhoneLoop();

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!phoneAudioCtxRef.current) {
        phoneAudioCtxRef.current = new AudioCtx();
      }
      const ctx = phoneAudioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const beatDuration = 60 / currentBpm;
      let step = 0;

      const scheduleNextBeat = () => {
        const now = ctx.currentTime;

        if (loopIndex === 0) {
          // Loop 0 (BREAKDOWN): Low kick-like beat + tick
          if (step % 2 === 0) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(105, now);
            osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.14);
            gain.gain.setValueAtTime(0.14, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.15);
          } else {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(750, now);
            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.06);
          }
        } else if (loopIndex === 1) {
          // Loop 1 (WORROW): Arpeggio synth motif
          const arpeggio = [329.63, 392.00, 493.88, 587.33]; // E4, G4, B4, D5 (Em7 notes)
          const noteFreq = arpeggio[step % arpeggio.length];

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(noteFreq, now);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.23);
        } else if (loopIndex === 2) {
          // Loop 2 (MAIN LOOP): Steady kicks + offbeat bass notes
          const kickOsc = ctx.createOscillator();
          const kickGain = ctx.createGain();
          kickOsc.frequency.setValueAtTime(85, now);
          kickOsc.frequency.exponentialRampToValueAtTime(0.01, now + 0.12);
          kickGain.gain.setValueAtTime(0.16, now);
          kickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
          kickOsc.connect(kickGain);
          kickGain.connect(ctx.destination);
          kickOsc.start(now);
          kickOsc.stop(now + 0.13);

          if (step % 2 === 1) {
            const bassOsc = ctx.createOscillator();
            const bassGain = ctx.createGain();
            bassOsc.type = "triangle";
            bassOsc.frequency.setValueAtTime(146.83, now); // D3

            const filter = ctx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(260, now);

            bassGain.gain.setValueAtTime(0.07, now);
            bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

            bassOsc.connect(filter);
            filter.connect(bassGain);
            bassGain.connect(ctx.destination);

            bassOsc.start(now);
            bassOsc.stop(now + 0.2);
          }
        }

        step = (step + 1) % 4;
      };

      // Trigger first note immediately and set interval
      scheduleNextBeat();
      loopTimerRef.current = setInterval(scheduleNextBeat, beatDuration * 1000);
    } catch (e) {
      console.warn("Real-time loop synthesis failed:", e);
    }
  };

  const stopPhoneLoop = () => {
    if (loopTimerRef.current) {
      clearInterval(loopTimerRef.current);
      loopTimerRef.current = null;
    }
  };

  // Handle loop play toggles
  const handleLoopClick = (idx: number) => {
    if (playingLoop === idx) {
      setPlayingLoop(null);
      stopPhoneLoop();
    } else {
      setPlayingLoop(idx);
      playPhoneLoop(idx, bpm);
    }
  };

  // Adjust BPM
  const adjustBpm = (delta: number) => {
    const nextBpm = Math.max(60, Math.min(220, bpm + delta));
    setBpm(nextBpm);
    if (playingLoop !== null) {
      playPhoneLoop(playingLoop, nextBpm);
    }
  };

  // Handle synth pad tap
  const handlePadPress = (idx: number) => {
    setActivePad(idx);
    setTimeout(() => setActivePad(null), 120);

    const padNotes = [293.66, 311.13, 349.23, 369.99, 440.00, 466.16]; // D4, D#4, F4, F#4, A4, A#4
    const root = padNotes[idx];
    if (!root) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!phoneAudioCtxRef.current) {
        phoneAudioCtxRef.current = new AudioCtx();
      }
      const ctx = phoneAudioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Create warm synthesized synth voice
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(root, now);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(root * 1.5, now); // Fifth chord interval

      // Soft lowpass filter to remove sawtooth harshness
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, now);

      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
    } catch (e) {}
  };

  const handleSaveClick = () => {
    setSaveClicked(true);
    // Play sweet synth double-chime when saving
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!phoneAudioCtxRef.current) {
        phoneAudioCtxRef.current = new AudioCtx();
      }
      const ctx = phoneAudioCtxRef.current;
      const now = ctx.currentTime;
      
      const playBeep = (freq: number, time: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.04, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.15);
      };
      
      playBeep(880, now);
      playBeep(1320, now + 0.08);
    } catch (e) {}

    setTimeout(() => {
      setSaveClicked(false);
    }, 1500);
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      stopPhoneLoop();
    };
  }, []);

  // Screen Title mapper
  const getScreenTitle = () => {
    switch (activeTab) {
      case "library":
        return "Studio";
      case "setlists":
        return "Setlists";
      case "profile":
        return "Device";
    }
  };

  return (
    <div className="device-wrap">
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="scr">
            {/* Toolbar */}
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
                {/* Active indicator */}
                <div
                  className="profile-status-dot"
                  style={{
                    width: 6,
                    height: 6,
                    background: playingLoop !== null ? "var(--accent)" : "#9c9c9c",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
              </div>
              <div className="bpm">
                <span className="pm" onClick={() => adjustBpm(-1)}>−</span>
                <span>{bpm} BPM</span>
                <span className="pm" onClick={() => adjustBpm(1)} style={{ marginRight: -3 }}>+</span>
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

            {/* Header Area */}
            <div className="scr-top">
              <div className="scr-title-xl">{getScreenTitle()}</div>
              <div
                className="scr-pill"
                onClick={handleSaveClick}
                style={
                  saveClicked
                    ? {
                        background: "rgba(31, 191, 98, 0.2)",
                        borderColor: "var(--accent)",
                        color: "var(--accent)",
                      }
                    : undefined
                }
              >
                {saveClicked ? (
                  <>Saved ✓</>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>

            {/* Screen Content Switcher */}
            {activeTab === "library" && (
              <>
                {/* Loop Cells */}
                <div className="scr-loops">
                  <div
                    className={`scr-loop lp-pink ${playingLoop === 0 ? "playing" : ""}`}
                    onClick={() => handleLoopClick(0)}
                  >
                    <div className="lp-name">
                      03.
                      <br />
                      BREAKDOWN
                    </div>
                    <div className="lp-art">
                      <LoopArt kind="burst-tight" />
                    </div>
                    <div className="lp-play">
                      {playingLoop === 0 ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="6" width="12" height="12" rx="1.5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5l11 7-11 7V5z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div
                    className={`scr-loop lp-yellow ${playingLoop === 1 ? "playing" : ""}`}
                    onClick={() => handleLoopClick(1)}
                  >
                    <div className="lp-name">
                      125 BPM
                      <br />
                      WORROW
                    </div>
                    <div className="lp-art">
                      <LoopArt kind="burst-wide" />
                    </div>
                    <div className="lp-play">
                      {playingLoop === 1 ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="6" width="12" height="12" rx="1.5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5l11 7-11 7V5z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div
                    className={`scr-loop lp-purple ${playingLoop === 2 ? "playing" : ""}`}
                    onClick={() => handleLoopClick(2)}
                  >
                    <div className="lp-name">
                      04.
                      <br />
                      MAIN LOOP
                    </div>
                    <div className="lp-art">
                      <LoopArt kind="dots" />
                    </div>
                    <div className="lp-play">
                      {playingLoop === 2 ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="6" width="12" height="12" rx="1.5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5l11 7-11 7V5z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pads */}
                <div className="scr-pads">
                  {[
                    { note: "D", key: "D" },
                    { note: "+", key: "D#" },
                    { note: "F", key: "F" },
                    { note: "+", key: "F#" },
                    { note: "A", key: "A" },
                    { note: "+", key: "A#" },
                  ].map((p, idx) => (
                    <div
                      key={idx}
                      className={`scr-pad ${p.note !== "+" ? "has-key" : ""} ${activePad === idx ? "active" : ""}`}
                      onClick={() => handlePadPress(idx)}
                    >
                      {p.note}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "setlists" && (
              <div className="scr-list-view">
                {[
                  { num: "01", name: "Open / Drone D", key: "D", length: "3:00" },
                  { num: "02", name: "Heron Song", key: "Dm", length: "4:42" },
                  { num: "03", name: "Lowlands", key: "G", length: "3:18" },
                  { num: "04", name: "Salt & Smoke", key: "Em", length: "5:01" },
                  { num: "05", name: "Marrow", key: "A", length: "4:20" },
                  { num: "06", name: "Northbound", key: "Bm", length: "3:55" },
                ].map((song, index) => {
                  const isActive = index === loadedSongIndex;
                  return (
                    <div
                      key={song.num}
                      className={`scr-list-item ${isActive ? "active" : ""}`}
                      onClick={() => {
                        setLoadedSongIndex(index);
                        // Beep feedback
                        try {
                          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                          if (AudioCtx) {
                            const ctx = new AudioCtx();
                            const osc = ctx.createOscillator();
                            const gain = ctx.createGain();
                            osc.frequency.setValueAtTime(440, ctx.currentTime);
                            gain.gain.setValueAtTime(0.04, ctx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
                            osc.connect(gain);
                            gain.connect(ctx.destination);
                            osc.start();
                            osc.stop(ctx.currentTime + 0.12);
                          }
                        } catch (e) {}
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="meta">{song.num}</span>
                        <span className="title">{song.name}</span>
                      </div>
                      <span className="meta">{song.key}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="scr-profile-view">
                <div className="scr-profile-card">
                  <div className="profile-header">
                    <div className="profile-avatar">K</div>
                    <div className="profile-info">
                      <span className="profile-name">KIDA-STAGE-04</span>
                      <span className="profile-status">
                        <span className="profile-status-dot" />
                        Connected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="profile-stat-row">
                  <div className="profile-stat">
                    <div className="val">2.1ms</div>
                    <div className="lbl">Latency</div>
                  </div>
                  <div className="profile-stat">
                    <div className="val">14</div>
                    <div className="lbl">Presets</div>
                  </div>
                </div>

                <div className="profile-stat-row" style={{ marginTop: 0 }}>
                  <div className="profile-stat">
                    <div className="val">USB</div>
                    <div className="lbl">MIDI Source</div>
                  </div>
                  <div className="profile-stat">
                    <div className="val">100%</div>
                    <div className="lbl">Battery</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Bar */}
            <div className="scr-tabbar">
              <div
                className={`scr-tab ${activeTab === "setlists" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("setlists");
                  stopPhoneLoop();
                  setPlayingLoop(null);
                }}
              >
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
              <div
                className={`scr-tab ${activeTab === "library" ? "active" : ""}`}
                onClick={() => setActiveTab("library")}
              >
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
              <div
                className={`scr-tab ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("profile");
                  stopPhoneLoop();
                  setPlayingLoop(null);
                }}
              >
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
                <span>Device</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
