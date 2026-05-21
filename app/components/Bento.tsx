"use client";

import { useState, useEffect, useRef } from "react";

// Frequency map for 12 notes in the 4th octave (C4 to B4)
const NOTE_FREQS: Record<string, number> = {
  "C": 261.63,
  "C♯": 277.18,
  "D": 293.66,
  "D♯": 311.13,
  "E": 329.63,
  "F": 349.23,
  "F♯": 369.99,
  "G": 392.00,
  "G♯": 415.30,
  "A": 440.00,
  "A♯": 466.16,
  "B": 493.88,
};

// Song data structure
interface Song {
  num: string;
  name: string;
  key: string;
  root: string; // The root note (e.g. Dm -> D, G -> G)
  duration: string;
}

const SONGS: Song[] = [
  { num: "01", name: "Open / Drone D", key: "D", root: "D", duration: "3:00" },
  { num: "02", name: "Heron Song", key: "Dm", root: "D", duration: "4:42" },
  { num: "03", name: "Lowlands", key: "G", root: "G", duration: "3:18" },
  { num: "04", name: "Salt & Smoke", key: "Em", root: "E", duration: "5:01" },
  { num: "05", name: "Marrow", key: "A", root: "A", duration: "4:20" },
  { num: "06", name: "Northbound", key: "Bm", root: "B", duration: "3:55" },
];

interface SetlistVizProps {
  songs: Song[];
  activeSongIndex: number;
  onSelectSong: (index: number) => void;
}

function SetlistViz({ songs, activeSongIndex, onSelectSong }: SetlistVizProps) {
  // We divide the list into two columns: left (first 3), right (next 3)
  const leftSongs = songs.slice(0, 3);
  const rightSongs = songs.slice(3, 6);

  return (
    <div className="viz viz-setlist">
      <div className="col">
        {leftSongs.map((s, idx) => {
          const actualIndex = idx;
          const isNow = actualIndex === activeSongIndex;
          return (
            <div
              key={s.num}
              className={`card ${isNow ? "now" : ""}`}
              onClick={() => onSelectSong(actualIndex)}
            >
              <span className="num">{s.num}</span>
              <span>{s.name}</span>
              <span className="key">{s.key} · {s.duration}</span>
            </div>
          );
        })}
      </div>
      <div className="col">
        {rightSongs.map((s, idx) => {
          const actualIndex = idx + 3;
          const isNow = actualIndex === activeSongIndex;
          return (
            <div
              key={s.num}
              className={`card ${isNow ? "now" : ""}`}
              onClick={() => onSelectSong(actualIndex)}
            >
              <span className="num">{s.num}</span>
              <span>{s.name}</span>
              <span className="key">{s.key} · {s.duration}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AbletonViz() {
  const cells = Array.from({ length: 20 }, (_, i) => i);
  // Initial active/dim states
  const initialLit = new Set([0, 5, 6, 10, 14, 18]);
  const initialDim = new Set([1, 4, 9, 11, 15, 19]);

  const [litCells, setLitCells] = useState<Set<number>>(initialLit);
  const [dimCells, setDimCells] = useState<Set<number>>(initialDim);
  const [triggerCell, setTriggerCell] = useState<number | null>(null);

  // Playhead column sequencer step (0 to 3)
  const [step, setStep] = useState(0);

  // Auto sequencer interval mimicking a playhead sweeping columns
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const handleCellClick = (i: number) => {
    // Flash trigger animation
    setTriggerCell(i);
    setTimeout(() => setTriggerCell(null), 400);

    // Play a tiny synthetic click
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {}

    // Toggle states
    if (litCells.has(i)) {
      const nextLit = new Set(litCells);
      nextLit.delete(i);
      setLitCells(nextLit);

      const nextDim = new Set(dimCells);
      nextDim.add(i);
      setDimCells(nextDim);
    } else if (dimCells.has(i)) {
      const nextDim = new Set(dimCells);
      nextDim.delete(i);
      setDimCells(nextDim);
    } else {
      const nextLit = new Set(litCells);
      nextLit.add(i);
      setLitCells(nextLit);
    }
  };

  // Check if a cell is in the active sequencer column
  // Cells are numbered 0 to 19: column = index % 4
  const isSequencerActive = (i: number) => {
    return (i % 4) === step;
  };

  return (
    <div className="viz viz-ableton">
      {cells.map((i) => {
        const isLit = litCells.has(i);
        const isDim = dimCells.has(i);
        const isActiveCol = isSequencerActive(i);
        const isTriggered = triggerCell === i;

        let cellClass = "cell";
        if (isLit) cellClass += " lit";
        else if (isDim) cellClass += " dim";

        if (isTriggered) {
          cellClass += " active-trigger";
        }

        // Custom inline style to show playhead sweep
        const style = isActiveCol && isLit
          ? { filter: "brightness(1.4)", transform: "scale(1.05)", boxShadow: "0 0 10px var(--accent)" }
          : undefined;

        return (
          <div
            key={i}
            className={cellClass}
            style={style}
            onClick={() => handleCellClick(i)}
          />
        );
      })}
    </div>
  );
}

interface DronesVizProps {
  activeDroneNote: string;
  setActiveDroneNote: (note: string) => void;
  dronePlaying: boolean;
  setDronePlaying: (playing: boolean) => void;
  playDrone: (note: string) => void;
  stopDrone: () => void;
}

function DronesViz({
  activeDroneNote,
  setActiveDroneNote,
  dronePlaying,
  setDronePlaying,
  playDrone,
  stopDrone,
}: DronesVizProps) {
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

  const handleNoteClick = (note: string) => {
    setActiveDroneNote(note);
    if (!dronePlaying) {
      setDronePlaying(true);
      playDrone(note);
    } else {
      // If clicking the note that is already active, toggle off. Otherwise switch note.
      if (note === activeDroneNote) {
        setDronePlaying(false);
        stopDrone();
      } else {
        playDrone(note);
      }
    }
  };

  const handleCenterClick = () => {
    if (dronePlaying) {
      setDronePlaying(false);
      stopDrone();
    } else {
      setDronePlaying(true);
      playDrone(activeDroneNote);
    }
  };

  return (
    <div className="viz viz-drones">
      <div className="wheel">
        <div
          className={`center ${dronePlaying ? "on" : ""}`}
          onClick={handleCenterClick}
        >
          {activeDroneNote}
        </div>
        {notes.map((n, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r = 88;
          const x = (Math.cos(angle) * r).toFixed(4);
          const y = (Math.sin(angle) * r).toFixed(4);
          const isNoteOn = n === activeDroneNote && dronePlaying;

          return (
            <span
              key={n}
              className={`note ${isNoteOn ? "on" : ""}`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                color: n === activeDroneNote ? (dronePlaying ? "var(--accent)" : "rgba(255,255,255,0.85)") : undefined,
                fontWeight: n === activeDroneNote ? "600" : undefined,
                // Pass custom vars to globals.css for hover scaling/offset alignment
                ["--tx" as any]: `${x}px`,
                ["--ty" as any]: `${y}px`,
              } as React.CSSProperties}
              onClick={() => handleNoteClick(n)}
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
  const [activeMidi, setActiveMidi] = useState<Record<string, boolean>>({
    footswitch: true,
    expression: true,
    cc64: false,
    ch4: true,
  });

  const handleChipClick = (key: string) => {
    setActiveMidi((prev) => {
      const nextVal = !prev[key];
      // Play a short synth note beep when turned on
      if (nextVal) {
        try {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioCtx) {
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            // Map keys to notes
            const pitches: Record<string, number> = {
              footswitch: 440,
              expression: 523.25,
              cc64: 587.33,
              ch4: 659.25,
            };
            osc.frequency.setValueAtTime(pitches[key] || 440, ctx.currentTime);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
          }
        } catch (e) {}
      }
      return { ...prev, [key]: nextVal };
    });
  };

  return (
    <div className="viz viz-midi">
      <div className="col-l">
        <div
          className={`chip ${activeMidi.footswitch ? "on" : ""}`}
          onClick={() => handleChipClick("footswitch")}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <span className="d" />
          FOOTSWITCH 1
        </div>
        <div
          className={`chip ${activeMidi.expression ? "on" : ""}`}
          onClick={() => handleChipClick("expression")}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <span className="d" />
          EXPRESSION
        </div>
        <div
          className={`chip ${activeMidi.cc64 ? "on" : ""}`}
          onClick={() => handleChipClick("cc64")}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <span className="d" />
          CC 64
        </div>
        <div
          className={`chip ${activeMidi.ch4 ? "on" : ""}`}
          onClick={() => handleChipClick("ch4")}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <span className="d" />
          CH 4 NOTE
        </div>
      </div>
      <div className="lines">
        <svg viewBox="0 0 100 140" preserveAspectRatio="none">
          <path
            d="M0 14 C 50 14, 50 28, 100 28"
            stroke={activeMidi.footswitch ? "var(--accent)" : "var(--line-2)"}
            strokeWidth={activeMidi.footswitch ? "0.85" : "0.6"}
            className={activeMidi.footswitch ? "active-pulse" : ""}
            fill="none"
          />
          <path
            d="M0 50 C 50 50, 50 70, 100 70"
            stroke={activeMidi.expression ? "var(--accent)" : "var(--line-2)"}
            strokeWidth={activeMidi.expression ? "0.85" : "0.6"}
            className={activeMidi.expression ? "active-pulse" : ""}
            fill="none"
          />
          <path
            d="M0 86 C 50 86, 50 96, 100 96"
            stroke={activeMidi.cc64 ? "var(--accent)" : "var(--line-2)"}
            strokeWidth={activeMidi.cc64 ? "0.85" : "0.6"}
            className={activeMidi.cc64 ? "active-pulse" : ""}
            fill="none"
          />
          <path
            d="M0 122 C 50 122, 50 122, 100 122"
            stroke={activeMidi.ch4 ? "var(--accent)" : "var(--line-2)"}
            strokeWidth={activeMidi.ch4 ? "0.85" : "0.6"}
            className={activeMidi.ch4 ? "active-pulse" : ""}
            fill="none"
          />
        </svg>
      </div>
      <div className="col-r">
        <div className={`chip ${activeMidi.footswitch ? "on" : ""}`}>
          <span className="d" />
          NEXT SONG
        </div>
        <div className={`chip ${activeMidi.expression ? "on" : ""}`}>
          <span className="d" />
          VOL → SEND A
        </div>
        <div className={`chip ${activeMidi.cc64 ? "on" : ""}`}>
          <span className="d" />
          SUSTAIN
        </div>
        <div className={`chip ${activeMidi.ch4 ? "on" : ""}`}>
          <span className="d" />
          DRONE TOGGLE
        </div>
      </div>
    </div>
  );
}

export function Bento() {
  const [activeSongIndex, setActiveSongIndex] = useState(1);
  const [activeDroneNote, setActiveDroneNote] = useState("D");
  const [dronePlaying, setDronePlaying] = useState(false);

  // Web Audio Context & Node Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<{
    oscillators: OscillatorNode[];
    filter: BiquadFilterNode;
    gainNode: GainNode;
  } | null>(null);

  const playDrone = (noteName: string) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const rootFreq = NOTE_FREQS[noteName];
      if (!rootFreq) return;

      const now = ctx.currentTime;

      // If drone is already running, slide the pitch smoothly (portamento effect)
      if (droneNodesRef.current) {
        const { oscillators } = droneNodesRef.current;
        oscillators[0].frequency.cancelScheduledValues(now);
        oscillators[1].frequency.cancelScheduledValues(now);
        oscillators[2].frequency.cancelScheduledValues(now);
        oscillators[3].frequency.cancelScheduledValues(now);

        oscillators[0].frequency.setValueAtTime(oscillators[0].frequency.value, now);
        oscillators[1].frequency.setValueAtTime(oscillators[1].frequency.value, now);
        oscillators[2].frequency.setValueAtTime(oscillators[2].frequency.value, now);
        oscillators[3].frequency.setValueAtTime(oscillators[3].frequency.value, now);

        oscillators[0].frequency.exponentialRampToValueAtTime(rootFreq * 0.75, now + 0.6);
        oscillators[1].frequency.exponentialRampToValueAtTime(rootFreq, now + 0.6);
        oscillators[2].frequency.exponentialRampToValueAtTime(rootFreq * 1.125, now + 0.6);
        oscillators[3].frequency.exponentialRampToValueAtTime(rootFreq * 1.50, now + 0.6);
        return;
      }

      // Create oscillators (analog pad in the 4th octave)
      const osc1 = ctx.createOscillator(); // Low 5th (triangle)
      const osc2 = ctx.createOscillator(); // Root (sawtooth, detuned -12 cents)
      const osc3 = ctx.createOscillator(); // Major 2nd / sus2 (sawtooth, detuned +12 cents)
      const osc4 = ctx.createOscillator(); // High 5th (triangle)

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(rootFreq * 0.75, now);

      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(rootFreq, now);
      osc2.detune.setValueAtTime(-12, now);

      osc3.type = "sawtooth";
      osc3.frequency.setValueAtTime(rootFreq * 1.125, now);
      osc3.detune.setValueAtTime(12, now);

      osc4.type = "triangle";
      osc4.frequency.setValueAtTime(rootFreq * 1.50, now);

      // Lowpass filter
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(250, now);
      filter.Q.setValueAtTime(1.2, now);

      // Low frequency modulator (LFO) for slow sweep effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, now); // Slow 0.12Hz sweep
      lfoGain.gain.setValueAtTime(40, now);     // Gentle sweep depth

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);

      // Gain node for smooth attack / volume control
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 2.2); // Soft, slow ramp in

      // Connect nodes
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      osc4.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      osc4.start(now);

      droneNodesRef.current = {
        oscillators: [osc1, osc2, osc3, osc4],
        filter,
        gainNode,
      };
    } catch (e) {
      console.warn("Failed to initialize Web Audio:", e);
    }
  };

  const stopDrone = () => {
    if (droneNodesRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const { oscillators, gainNode } = droneNodesRef.current;
      const now = ctx.currentTime;

      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.8); // Smooth release

      setTimeout(() => {
        try {
          oscillators.forEach((o) => o.stop());
        } catch (e) {}
        droneNodesRef.current = null;
      }, 900);
    }
  };

  // Sync song selections to drone note automatically
  const handleSelectSong = (index: number) => {
    setActiveSongIndex(index);
    const selectedSong = SONGS[index];
    if (selectedSong) {
      const nextNote = selectedSong.root;
      setActiveDroneNote(nextNote);
      if (dronePlaying) {
        playDrone(nextNote);
      }
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (droneNodesRef.current) {
        try {
          droneNodesRef.current.oscillators.forEach((o) => o.stop());
        } catch (e) {}
      }
    };
  }, []);

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
            gets out of your way. Click a song or key below to test it.
          </p>
        </div>

        <div className="bento reveal">
          <div className="bento-card b-setlist">
            <div className="b-head">
              <span className="b-tag">01 · Setlists</span>
              <h3>Setlists, synced in real-time.</h3>
              <p>
                Jump between songs mid-show. Selecting a song instantly updates
                your active key, target tempo, and built-in drone pitch across the app.
              </p>
            </div>
            <SetlistViz
              songs={SONGS}
              activeSongIndex={activeSongIndex}
              onSelectSong={handleSelectSong}
            />
          </div>

          <div className="bento-card b-ableton">
            <div className="b-head">
              <span className="b-tag">02 · Ableton</span>
              <h3>Export to Arrangement View.</h3>
              <p>
                Export your setlist straight to Ableton Live's Arrangement View.
                Automatically lay out tracks, clips, tempo maps, and song markers.
              </p>
            </div>
            <AbletonViz />
          </div>

          <div className="bento-card b-drones">
            <div className="b-head">
              <span className="b-tag">03 · Drones</span>
              <h3>Drones built-in.</h3>
              <p>
                Every key, every mode. Tap keys to lock and slide your tonal center. Tap center note to play/mute.
              </p>
            </div>
            <DronesViz
              activeDroneNote={activeDroneNote}
              setActiveDroneNote={setActiveDroneNote}
              dronePlaying={dronePlaying}
              setDronePlaying={setDronePlaying}
              playDrone={playDrone}
              stopDrone={stopDrone}
            />
          </div>

          <div className="bento-card b-midi">
            <div className="b-head">
              <span className="b-tag">04 · MIDI</span>
              <h3>MIDI ready.</h3>
              <p>
                Map any controller, route any signal. Click inputs to test routing pathways.
              </p>
            </div>
            <MidiViz />
          </div>
        </div>
      </div>
    </section>
  );
}
