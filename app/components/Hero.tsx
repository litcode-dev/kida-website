"use client";

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { TextGenerateEffect } from "./TextGenerateEffect";
import { TypewriterHeadline } from "./TypewriterHeadline";
import { PhoneMock } from "./PhoneMock";

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      if (spotRef.current) {
        spotRef.current.style.left = e.clientX - r.left + "px";
        spotRef.current.style.top = e.clientY - r.top + "px";
      }
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-glow" />
      <div className="spotlight" ref={spotRef} />
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy reveal">
           
            <TypewriterHeadline />
            <p className="lead">
              <TextGenerateEffect
                text="Kiɗa is the live performance companion for working musicians — build setlists, control Ableton Live, lock in your key with drones, and play with confidence."
                delay={600}
              />
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#download">
                <Icon name="apple" size={16} /> Download for iOS
              </a>
              <a className="btn btn-ghost" href="#download">
                <Icon name="android" size={16} /> Download for Android
              </a>
              <a className="btn btn-ghost" href="#demo">
                <Icon name="play" size={14} /> Watch 90-sec demo
              </a>
            </div>
            <div className="hero-meta">
              <span>iOS 18+</span>
              <span className="sep" />
              <span>iPadOS 18+</span>
              <span className="sep" />
              <span>Android 11+</span>
              <span className="sep" />
              <span>Free · No account required</span>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <PhoneMock />
          </div>
        </div>
      </div>
      <div className="hero-grain-line" />
    </section>
  );
}
