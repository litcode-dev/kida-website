"use client";

import { useState } from "react";

const items = [
  {
    q: "Which versions of Ableton Live are supported?",
    a: "Kiɗa supports Ableton Live 12 and 11. It allows you to export your entire setlist straight to Ableton Live's Arrangement View—automatically laying out clips, tempo maps, tracks, and song markers. Advanced features like ScaleInformation and AudioClip APIs require Live 12.",
  },
  {
    q: "Is there an Android version?",
    a: "Not yet. Kiɗa is iOS / iPadOS only while we get the live experience right on one platform. An Android beta is on the roadmap for late 2026.",
  },
  {
    q: "Does Kiɗa work offline?",
    a: "Yes. Setlists, drones, and your library are stored locally. You only need a network when you want to sync to Ableton, sell on the Marketplace, or download new packs.",
  },
  {
    q: "Which MIDI controllers are supported?",
    a: "Anything class-compliant: USB-C, Bluetooth LE MIDI, and RTP MIDI over Wi-Fi. Tested first-party with Akai MPK, Novation Launchpad, Morningstar MC, and the major footswitch families.",
  },
  {
    q: "What’s your refund policy?",
    a: "30-day full refund on Pro, no questions asked. The Free tier is, well, free — and stays that way forever.",
  },
  {
    q: "Can I sell my own setlists or drone packs?",
    a: "Yes, on Pro. You set the price (or Free), we handle the storefront, and you keep 85% of every sale.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq">
      <div className="wrap">
        <div className="faq-grid">
          <div className="reveal">
            <span className="eyebrow">
              <span className="dot" />
              FAQ
            </span>
            <h2 style={{ marginTop: 18 }}>Questions, answered straight.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Still curious?{" "}
              <a href="#" style={{ color: "var(--accent)" }}>
                Read the manual →
              </a>
            </p>
          </div>

          <div className="faq-list reveal">
            {items.map((it, i) => (
              <div
                key={i}
                className={"faq-item " + (open === i ? "open" : "")}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <div className="faq-q">
                  <span>{it.q}</span>
                  <span className="plus" />
                </div>
                <div className="faq-a">{it.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
