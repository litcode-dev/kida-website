import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LoadingOverlay } from "./components/LoadingOverlay";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kiɗa — Your setlist. Your stage. Your sound.",
  description:
    "Kiɗa is the live performance companion for working musicians — setlists, Ableton Live 12 control, built-in drones, MIDI ready.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <LoadingOverlay />
        {children}
      </body>
    </html>
  );
}
