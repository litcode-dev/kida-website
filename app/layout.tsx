import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiɗa — Your setlist. Your stage. Your sound.",
  description:
    "Kiɗa is the live performance companion for working musicians — setlists, Ableton Live control, built-in drones, MIDI ready. On mobile, desktop, and as a plugin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
