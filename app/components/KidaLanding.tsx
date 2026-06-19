"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDownloadModal } from "./DownloadModalProvider";

const KEYS = [
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

type PackItem = {
  genre: string;
  title: string;
  by: string;
  price: string;
  paid?: boolean;
};

const ROW_A: PackItem[] = [
  { genre: "AFROBEAT WORSHIP", title: "Afrobeat Worship · 24 Loops", by: "by Onye Adeleke", price: "Free" },
  { genre: "AMBIENT", title: "Widely Serene · Drone Pack", by: "Kiɗa Studio", price: "Free" },
  { genre: "GOSPEL", title: "Contemporary Gospel · 125 BPM", by: "by Mason Reeves", price: "$8", paid: true },
  { genre: "HIGHLIFE", title: "Highlife Drum Kit", by: "by Theo Daniels", price: "$6", paid: true },
];

const ROW_B: PackItem[] = [
  { genre: "DRONES", title: "Modal Drones · 12 Keys", by: "Kiɗa Studio", price: "Free" },
  { genre: "WORSHIP", title: "Sunday Set · 8 Setlists", by: "by Halls of Stone", price: "Free" },
  { genre: "LIVE LOOPS", title: "Lagos Nights · Live Loops", by: "by Aila Ström", price: "$12", paid: true },
  { genre: "DRONES", title: "Just Intonation · Drones", by: "by Hana Mori", price: "Free" },
];

type Engine = {
  setKey: (i: number) => void;
  toggleDrone: () => boolean;
};

function PackRow({
  items,
  rowRef,
}: {
  items: PackItem[];
  rowRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Triple the items so the marquee can loop seamlessly.
  const tripled = [...items, ...items, ...items];
  return (
    <div className="pack-row" ref={rowRef}>
      {tripled.map((p, i) => (
        <div className="pack" key={i}>
          <span className="genre">{p.genre}</span>
          <h4>{p.title}</h4>
          <div className="by">{p.by}</div>
          <span className={"price" + (p.paid ? " paid" : "")}>{p.price}</span>
        </div>
      ))}
    </div>
  );
}

export function KidaLanding() {
  const [activeKey, setActiveKey] = useState(2); // D
  const [playing, setPlaying] = useState(false);
  const { open } = useDownloadModal();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const activeKeyRef = useRef(2);
  const rowARef = useRef<HTMLDivElement | null>(null);
  const rowBRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ============================================================
       THREE.JS — waveform loop ring with the drone key wheel inside
       ============================================================ */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b06, 0.026);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 6, 20);
    camera.lookAt(0, 0.8, 0);

    scene.add(new THREE.AmbientLight(0x3a4a22, 1.2));
    const topLight = new THREE.PointLight(0xc9ff2e, 1.8, 45);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);
    const uvLight = new THREE.PointLight(0x9d8bff, 1.3, 50);
    uvLight.position.set(-14, 5, 10);
    scene.add(uvLight);

    const rig = new THREE.Group();
    rig.rotation.x = 0.34;
    scene.add(rig);

    /* --- outer waveform ring: 220 instanced bars (the v1 signature) --- */
    const BAR_COUNT = 220,
      RING_R = 10;
    const barGeo = new THREE.BoxGeometry(0.15, 1, 0.15);
    barGeo.translate(0, 0.5, 0);
    const bars = new THREE.InstancedMesh(
      barGeo,
      new THREE.MeshBasicMaterial({
        color: 0xc9ff2e,
        transparent: true,
        opacity: 0.9,
      }),
      BAR_COUNT,
    );
    rig.add(bars);

    const guide = new THREE.Mesh(
      new THREE.TorusGeometry(RING_R, 0.015, 8, 160),
      new THREE.MeshBasicMaterial({
        color: 0x5d7d15,
        transparent: true,
        opacity: 0.8,
      }),
    );
    guide.rotation.x = Math.PI / 2;
    rig.add(guide);

    /* --- inner drone key wheel: 12 pillars --- */
    const KEY_R = 5.2;
    const pillars: THREE.Mesh[] = [];
    const pGeo = new THREE.BoxGeometry(0.95, 1, 0.95);
    pGeo.translate(0, 0.5, 0);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const mat = new THREE.MeshStandardMaterial({
        color: 0x2a361a,
        roughness: 0.4,
        metalness: 0.45,
        emissive: 0x090b06,
      });
      const m = new THREE.Mesh(pGeo, mat);
      m.position.set(Math.cos(a) * KEY_R, 0, Math.sin(a) * KEY_R);
      m.scale.y = 1.8;
      rig.add(m);
      pillars.push(m);
    }

    /* light beam over the active key */
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 1.2, 12, 24, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0xc9ff2e,
        transparent: true,
        opacity: 0.13,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    beam.position.y = 6;
    rig.add(beam);

    /* dust */
    const dn = 480,
      dp = new Float32Array(dn * 3);
    for (let i = 0; i < dn; i++) {
      dp[i * 3] = (Math.random() - 0.5) * 64;
      dp[i * 3 + 1] = (Math.random() - 0.5) * 30;
      dp[i * 3 + 2] = (Math.random() - 0.5) * 64;
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.BufferAttribute(dp, 3));
    const dust = new THREE.Points(
      dg,
      new THREE.PointsMaterial({
        color: 0x3a4a22,
        size: 0.07,
        transparent: true,
        opacity: 0.7,
      }),
    );
    scene.add(dust);

    const dummy = new THREE.Object3D();
    function barHeight(i: number, t: number) {
      const p = (i / BAR_COUNT) * Math.PI * 2;
      let h =
        0.4 +
        Math.abs(Math.sin(p * 3 + t * 0.9)) * 1.3 +
        Math.abs(Math.sin(p * 7 - t * 1.7)) * 0.7 +
        Math.abs(Math.sin(p * 13 + t * 0.5)) * 0.4;
      const head = (t * 0.35) % (Math.PI * 2);
      let d = Math.abs(p - head);
      d = Math.min(d, Math.PI * 2 - d);
      h += Math.max(0, 1 - d * 3.4) * 2.2;
      return h;
    }
    function layoutRing(t: number) {
      for (let i = 0; i < BAR_COUNT; i++) {
        const a = (i / BAR_COUNT) * Math.PI * 2;
        dummy.position.set(Math.cos(a) * RING_R, 0, Math.sin(a) * RING_R);
        dummy.rotation.set(0, -a, 0);
        dummy.scale.set(1, barHeight(i, t), 1);
        dummy.updateMatrix();
        bars.setMatrixAt(i, dummy.matrix);
      }
      bars.instanceMatrix.needsUpdate = true;
    }

    function setActivePillar(idx: number) {
      pillars.forEach((p, i) => {
        const on = i === idx;
        const mat = p.material as THREE.MeshStandardMaterial;
        mat.color.set(on ? 0xc9ff2e : 0x2a361a);
        mat.emissive.set(on ? 0x9bd400 : 0x090b06);
        if (!reduced) {
          gsap.to(p.scale, {
            y: on ? 4.6 : 1.8,
            duration: 0.7,
            ease: "elastic.out(1,.55)",
          });
        } else {
          p.scale.y = on ? 4.6 : 1.8;
        }
      });
      const a = (idx / 12) * Math.PI * 2 - Math.PI / 2;
      if (!reduced) {
        gsap.to(beam.position, {
          x: Math.cos(a) * KEY_R,
          z: Math.sin(a) * KEY_R,
          duration: 0.7,
          ease: "power3.out",
        });
      } else {
        beam.position.x = Math.cos(a) * KEY_R;
        beam.position.z = Math.sin(a) * KEY_R;
      }
    }
    setActivePillar(activeKeyRef.current);

    function resize() {
      const w = canvas!.clientWidth || window.innerWidth;
      const h = canvas!.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    let mx = 0,
      my = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);

    let rafId = 0;
    let t = 0;
    function frame() {
      if (!reduced) {
        t += 0.016;
        rig.rotation.y = t * 0.05;
        dust.rotation.y = t * 0.012;
        pillars.forEach((p, i) => {
          if (i !== activeKeyRef.current && !gsap.isTweening(p.scale))
            p.scale.y = 1.8 + Math.sin(t * 1.3 + i * 1.7) * 0.22;
        });
        (beam.material as THREE.MeshBasicMaterial).opacity =
          0.1 + Math.abs(Math.sin(t * 1.4)) * 0.07;
        camera.position.x += (mx * 2.6 - camera.position.x) * 0.04;
        camera.position.y += (6 - my * 1.8 - camera.position.y) * 0.04;
        camera.lookAt(0, 1, 0);
      }
      layoutRing(reduced ? 1.5 : t);
      renderer.render(scene, camera);
      if (!reduced) rafId = requestAnimationFrame(frame);
    }
    frame();

    /* ============================================================
       WEB AUDIO — playable drones
       ============================================================ */
    let actx: AudioContext | null = null;
    let voices: OscillatorNode[] | null = null;
    let masterGain: GainNode | null = null;
    let dronePlaying = false;
    const freqOf = (i: number) => 130.81 * Math.pow(2, i / 12);

    function buildVoices() {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      actx = new Ctor();
      masterGain = actx.createGain();
      masterGain.gain.value = 0;
      const lp = actx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 620;
      lp.Q.value = 0.4;
      masterGain.connect(lp);
      lp.connect(actx.destination);
      voices = [-4, 4, -1202].map((cents) => {
        const o = actx!.createOscillator();
        o.type = Math.abs(cents) > 1000 ? "sine" : "sawtooth";
        o.detune.value = cents;
        const g = actx!.createGain();
        g.gain.value = Math.abs(cents) > 1000 ? 0.5 : 0.32;
        o.connect(g);
        g.connect(masterGain!);
        o.frequency.value = freqOf(activeKeyRef.current);
        o.start();
        return o;
      });
    }
    function setDroneKey(i: number) {
      if (!voices || !actx) return;
      voices.forEach((o) =>
        o.frequency.exponentialRampToValueAtTime(
          freqOf(i),
          actx!.currentTime + 0.35,
        ),
      );
    }
    function toggleDrone(): boolean {
      if (!actx) buildVoices();
      if (actx!.state === "suspended") actx!.resume();
      dronePlaying = !dronePlaying;
      const now = actx!.currentTime;
      masterGain!.gain.cancelScheduledValues(now);
      masterGain!.gain.setValueAtTime(masterGain!.gain.value, now);
      masterGain!.gain.linearRampToValueAtTime(
        dronePlaying ? 0.06 : 0,
        now + (dronePlaying ? 1.2 : 0.6),
      );
      return dronePlaying;
    }

    engineRef.current = {
      setKey: (i: number) => {
        activeKeyRef.current = i;
        setActivePillar(i);
        setDroneKey(i);
      },
      toggleDrone,
    };

    /* ============================================================
       GSAP — advanced choreography
       ============================================================ */
    gsap.registerPlugin(ScrollTrigger);
    let ctx: gsap.Context | null = null;

    if (!reduced) {
      ctx = gsap.context(() => {
        /* hero load: glyph flip, staged UI, camera dolly-in */
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".kicker", { y: 18, opacity: 0, duration: 0.7 }, 0.15)
          .from(
            "#title .glyph",
            {
              y: 100,
              opacity: 0,
              rotateX: 60,
              duration: 1,
              stagger: 0.09,
              ease: "back.out(1.6)",
            },
            0.3,
          )
          .from(".tagline", { y: 22, opacity: 0, duration: 0.8 }, 0.9)
          .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, 1.05)
          .from(
            ".hero-actions .btn",
            { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 },
            1.2,
          )
          .from(".keyrail", { y: 26, opacity: 0, duration: 0.8 }, 1.35)
          .from(".hero-meta", { opacity: 0, duration: 0.9 }, 1.5)
          .from(
            camera.position,
            { z: 36, y: 11, duration: 2.4, ease: "power2.out" },
            0,
          );

        /* scroll-scrub the rig while leaving the hero */
        gsap.to(rig.rotation, {
          x: 1.2,
          y: "+=2.0",
          scrollTrigger: {
            trigger: "header",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(camera.position, {
          z: 12,
          y: 10,
          scrollTrigger: {
            trigger: "header",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".hero-inner", {
          opacity: 0,
          y: -70,
          scrollTrigger: {
            trigger: "header",
            start: "top top",
            end: "60% top",
            scrub: true,
          },
        });

        /* stat counters */
        gsap.utils.toArray<HTMLElement>(".stat b").forEach((el) => {
          const end = +el.dataset.count!;
          const suf = el.dataset.suffix || "";
          const o = { v: 0 };
          gsap.to(o, {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => (el.textContent = Math.round(o.v) + suf),
          });
        });

        /* reveals */
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

        /* dual-direction marketplace marquees */
        if (rowARef.current)
          gsap.to(rowARef.current, {
            xPercent: -33.34,
            duration: 30,
            ease: "none",
            repeat: -1,
          });
        if (rowBRef.current)
          gsap.fromTo(
            rowBRef.current,
            { xPercent: -33.34 },
            { xPercent: 0, duration: 30, ease: "none", repeat: -1 },
          );

        /* BPM readout drift */
        const bpmEl = document.getElementById("bpmRead");
        const bpm = { v: 120 };
        if (bpmEl)
          gsap.to(bpm, {
            v: 120.4,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            onUpdate: () => (bpmEl.textContent = bpm.v.toFixed(1)),
          });
      });
    } else {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      document.querySelectorAll<HTMLElement>(".stat b").forEach((el) => {
        el.textContent = (el.dataset.count || "") + (el.dataset.suffix || "");
      });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      ctx?.revert();
      engineRef.current = null;
      renderer.dispose();
      renderer.forceContextLoss();
      if (actx) actx.close();
    };
  }, []);

  const onKey = (i: number) => {
    setActiveKey(i);
    engineRef.current?.setKey(i);
  };
  const onToggle = () => {
    const p = engineRef.current?.toggleDrone();
    if (p !== undefined) setPlaying(p);
  };

  return (
    <>
      <div className="scan" aria-hidden="true" />

      <nav>
        <a className="logo" href="#">
          <span className="led" />
          Ki<em>ɗ</em>a
        </a>
        <div className="nav-links">
          <a href="#features">FEATURES</a>
          <a href="#platforms">PLATFORMS</a>
          <a href="#how">HOW IT WORKS</a>
          <a href="#marketplace">LIBRARY</a>
          <a href="#pricing">PRICING</a>
        </div>
        <a className="nav-cta" href="#get">
          GET KIƊA
        </a>
      </nav>

      <header>
        <canvas id="stage3d" ref={canvasRef} aria-hidden="true" />
        <div className="hero-veil" aria-hidden="true" />

        <div className="hero-inner">
          <div className="kicker">THE LIVE PERFORMANCE COMPANION</div>
          <h1 id="title" aria-label="Kiɗa">
            <span className="glyph">K</span>
            <span className="glyph">i</span>
            <span className="glyph d">ɗ</span>
            <span className="glyph">a</span>
          </h1>
          <p className="tagline">
            Your setlist. Your stage. <em>Your sound.</em>
          </p>
          <p className="hero-sub">
            Build setlists, control Ableton Live, lock in your key with built-in
            drones, and walk on stage with nothing but confidence.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => open("macos")}
            >
              DOWNLOAD FOR MAC
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => open("windows")}
            >
              DOWNLOAD FOR WINDOWS
            </button>
            <a className="btn btn-ghost" href="#how">
              90-SEC DEMO ↓
            </a>
          </div>

          <div className="keyrail">
            <div className="label">
              <i />
              TRY THE DRONES — TAP A KEY, THEN PLAY
            </div>
            <div className="keys" role="group" aria-label="Drone key selector">
              {KEYS.map((k, i) => (
                <button
                  key={k}
                  className={"key" + (i === activeKey ? " on" : "")}
                  aria-label={"Drone key " + k}
                  onClick={() => onKey(i)}
                >
                  {k}
                </button>
              ))}
            </div>
            <button
              className={"drone-toggle" + (playing ? " playing" : "")}
              aria-pressed={playing}
              onClick={onToggle}
            >
              {(playing ? "■ STOP DRONE · " : "▶ PLAY DRONE · ") +
                KEYS[activeKey]}
            </button>
          </div>
        </div>

        <div className="hero-meta">
          <div>iOS · ANDROID · DESKTOP · VST3</div>
          <div className="scroll-hint">
            <i />
          </div>
          <div>
            <span className="bpm" id="bpmRead">
              120.0
            </span>{" "}
            BPM · SYNCED
          </div>
        </div>
      </header>

      <div className="stats" aria-label="Kiɗa at a glance">
        <div className="stat">
          <b data-count="12">0</b>
          <span>KEYS · EVERY MODE</span>
        </div>
        <div className="stat">
          <b data-count="85" data-suffix="%">
            0
          </b>
          <span>CREATOR PAYOUT</span>
        </div>
        <div className="stat">
          <b data-count="100" data-suffix="%">
            0
          </b>
          <span>OFFLINE-FIRST</span>
        </div>
        <div className="stat">
          <b data-count="90" data-suffix="s">
            0
          </b>
          <span>SETUP TO STAGE</span>
        </div>
      </div>

      <section id="features">
        <p className="eyebrow reveal">01 — FEATURES</p>
        <h2 className="reveal">Built for the stage, not the spreadsheet.</h2>
        <p className="lede reveal">
          Four things matter when the lights go down. Kiɗa does all four, and
          gets out of your way.
        </p>

        <div className="four">
          <div className="pillar reveal">
            <span className="num">01 · SETLISTS</span>
            <h3>Setlists, synced in real time</h3>
            <p>
              Jump between songs mid-show. Selecting a song instantly updates
              your active key, target tempo, and drone pitch across the whole
              app.
            </p>
          </div>
          <div className="pillar reveal">
            <span className="num">02 · ABLETON</span>
            <h3>Export to Arrangement View</h3>
            <p>
              Send your setlist straight into Ableton Live — tracks, clips,
              tempo maps, and song markers laid out automatically.
            </p>
          </div>
          <div className="pillar reveal">
            <span className="num">03 · DRONES</span>
            <h3>Drones built in</h3>
            <p>
              Every key, every mode. Tap to lock your tonal center, slide
              between keys, and let the room settle under your band.
            </p>
          </div>
          <div className="pillar reveal">
            <span className="num">04 · MIDI</span>
            <h3>MIDI ready</h3>
            <p>
              Map any class-compliant controller — footswitches, expression
              pedals, pads. Next song, drone toggle, volume sends, all
              hands-free.
            </p>
          </div>
        </div>
      </section>

      <section id="platforms">
        <p className="eyebrow reveal">02 — PLATFORMS</p>
        <h2 className="reveal">One companion. Pocket, stage, and studio.</h2>
        <p className="lede reveal">
          The same setlists and drones travel with you — your phone at
          rehearsal, the standalone at the venue, the plugin in your session.
        </p>

        <div className="plats">
          <div className="plat reveal">
            <div className="plat-top">
              <span>KIƊA MOBILE</span>
              <i />
            </div>
            <div className="plat-body">
              <h3>On your phone</h3>
              <p>
                The full companion on iOS, iPadOS, and Android. Big touch
                targets, glanceable timecode, drones at your thumb —
                offline-first, always.
              </p>
            </div>
            <div className="plat-foot">iOS 18+ · iPadOS 18+ · ANDROID 11+</div>
          </div>
          <div className="plat reveal">
            <div className="plat-top">
              <span>KIƊA STANDALONE</span>
              <i />
            </div>
            <div className="plat-body">
              <h3>On the stage</h3>
              <p>
                A desktop app that boots straight into your set. Run drones,
                setlists, and MIDI routing from the laptop at front of stage —
                no DAW required.
              </p>
            </div>
            <div className="plat-foot">WINDOWS · macOS</div>
          </div>
          <div className="plat reveal">
            <div className="plat-top">
              <span>KIƊA PLUGIN</span>
              <i />
            </div>
            <div className="plat-body">
              <h3>In your DAW</h3>
              <p>
                A VST3 that lives inside your session. Host-synced tempo,
                automatable drone keys, and your Kiɗa library one click from the
                timeline.
              </p>
            </div>
            <div className="plat-foot">VST3 · HOST SYNC</div>
          </div>
        </div>
      </section>

      <section id="how">
        <p className="eyebrow reveal">03 — HOW IT WORKS</p>
        <h2 className="reveal">Three steps. Then you play.</h2>
        <div className="steps">
          <div className="step reveal">
            <div className="s-key">CONNECT</div>
            <div>
              <h3>Pair your rig</h3>
              <p>
                Laptop, MIDI controllers, in-ears. Kiɗa autodetects Ableton Live
                on the same network.
              </p>
            </div>
          </div>
          <div className="step reveal">
            <div className="s-key">BUILD</div>
            <div>
              <h3>Build your set</h3>
              <p>
                Drag songs into order, attach scenes, set tempos and keys. Save
                once — it&apos;s yours forever, offline.
              </p>
            </div>
          </div>
          <div className="step reveal">
            <div className="s-key">PERFORM</div>
            <div>
              <h3>Tap the next song. The room follows.</h3>
              <p>
                Key, tempo, and drone move together, and your hands stay on your
                instrument.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="market" id="marketplace">
        <div className="head">
          <p className="eyebrow reveal">04 — LIBRARY</p>
          <h2 className="reveal">One library. Every musician.</h2>
          <p className="lede reveal">
            Share setlists, download drones, and browse packs built by the Kiɗa
            community.
          </p>
        </div>
        <div className="packs" aria-hidden="true">
          <PackRow items={ROW_A} rowRef={rowARef} />
          <PackRow items={ROW_B} rowRef={rowBRef} />
        </div>
      </section>

      <section className="quote">
        <blockquote className="reveal">
          “I used to walk on stage with a laptop, a click track, and a backup of
          the backup. Now I walk on with my phone. <em>Kiɗa runs the set</em> — I
          just play it.”
        </blockquote>
        <div className="who reveal">
          <b>Onye Adeleke</b>Producer &amp; MD · Afrobeat / Worship circuit, Lagos
          → London
        </div>
      </section>

      <section id="pricing">
        <p className="eyebrow reveal">05 — PRICING</p>
        <h2 className="reveal">Free to start. Pro when you need it.</h2>
        <div className="tiers">
          <div className="tier reveal">
            <h3>Free</h3>
            <div className="amt">
              $0<small> / FOREVER</small>
            </div>
            <p className="blurb">
              Everything a working musician needs to play tonight.
            </p>
            <ul>
              <li>Unlimited setlists &amp; songs</li>
              <li>Built-in drones, every key</li>
              <li>Basic MIDI mapping</li>
              <li>Offline playback</li>
              <li>Marketplace browsing</li>
            </ul>
            <a className="btn btn-ghost" href="#get">
              DOWNLOAD FREE
            </a>
          </div>
          <div className="tier pro reveal">
            <h3>Pro</h3>
            <div className="amt">
              $8<small> / MO · BILLED ANNUALLY</small>
            </div>
            <p className="blurb">
              Deep Ableton control, advanced MIDI routing, cloud sync.
            </p>
            <ul>
              <li>Everything in Free</li>
              <li>Ableton Live deep integration</li>
              <li>Multi-controller MIDI matrix</li>
              <li>Cloud sync across devices</li>
              <li>Sell on the Marketplace — keep 85%</li>
              <li>Priority support</li>
            </ul>
            <a className="btn btn-solid" href="#get">
              START 14-DAY TRIAL
            </a>
          </div>
        </div>
      </section>

      <section id="faq">
        <p className="eyebrow reveal">06 — FAQ</p>
        <h2 className="reveal">Questions, answered straight.</h2>
        <div className="faq-list reveal">
          <details>
            <summary>Which versions of Ableton Live are supported?</summary>
            <p>
              Live 12 and 11. Kiɗa exports your entire setlist to Arrangement
              View — clips, tempo maps, tracks, and song markers laid out
              automatically. Some advanced features require Live 12.
            </p>
          </details>
          <details>
            <summary>Does Kiɗa work offline?</summary>
            <p>
              Yes. Setlists, drones, and your library live on the device. You
              only need a network to sync with Ableton, sell on the Marketplace,
              or download new packs.
            </p>
          </details>
          <details>
            <summary>Which MIDI controllers are supported?</summary>
            <p>
              Anything class-compliant: USB-C, Bluetooth LE MIDI, and RTP MIDI
              over Wi-Fi. Tested first-party with Akai MPK, Novation Launchpad,
              and Morningstar footswitches — but any standard controller maps in
              seconds.
            </p>
          </details>
          <details>
            <summary>
              What&apos;s the difference between standalone and the plugin?
            </summary>
            <p>
              The standalone runs your whole set without a DAW — ideal at the
              venue. The VST3 plugin lives inside your session for production and
              rehearsal, synced to your host tempo. One license covers both, plus
              mobile.
            </p>
          </details>
          <details>
            <summary>What&apos;s your refund policy?</summary>
            <p>
              30-day full refund on Pro, no questions asked. The Free tier is,
              well, free — and stays that way forever.
            </p>
          </details>
        </div>
      </section>

      <div className="cta-wrap" id="get">
        <p className="eyebrow reveal">07 — GET KIƊA</p>
        <h2 className="reveal">
          Walk on with your phone.
          <br />
          Kiɗa runs the set.
        </h2>
        <a className="btn btn-solid reveal" href="#">
          DOWNLOAD KIƊA — FREE
        </a>
        <p className="cta-note reveal">
          iOS · ANDROID · DESKTOP · VST3 — ONE LICENSE, EVERY PLATFORM
        </p>
      </div>

      <footer>
        <span>KIƊA © 2026 · THE LIVE PERFORMANCE COMPANION</span>
        <span>
          <a href="https://kida.litcode.com.ng">KIDA.LITCODE.COM.NG</a>
        </span>
        <span>MANUAL · SUPPORT · CHANGELOG</span>
      </footer>
    </>
  );
}
