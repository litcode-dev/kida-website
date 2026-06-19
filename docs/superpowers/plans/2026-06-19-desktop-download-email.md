# Desktop Download via Email — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add separate "Download for Mac" and "Download for Windows" buttons that open a modal capturing the visitor's email and POST it to the existing backend, which emails the download link.

**Architecture:** A `DownloadModalProvider` React context (mounted in `layout.tsx`) owns a single `DownloadModal` instance and exposes `open(platform)` / `close()`. Buttons in `KidaLanding` call `open("macos" | "windows")`. The modal captures an email and POSTs `{ email, platform }` to the backend, mirroring the existing `NewsletterForm` fetch pattern. All styling uses existing `globals.css` design tokens.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, plain CSS in `app/globals.css`. Package manager: **pnpm** (repo has `pnpm-lock.yaml`).

## Global Constraints

- **Live page only:** Edit `app/components/KidaLanding.tsx` (rendered via `app/page.tsx`). Do **not** edit `app/page copy.tsx` or the unused `Hero`/`Navbar`/`Pricing`/`Footer`/`NewsletterForm` components.
- **Platform values:** exactly `"macos"` and `"windows"`. Human labels: `macOS` and `Windows`.
- **Endpoint:** `POST ${NEXT_PUBLIC_API_BASE_URL}/api/v1/desktop/request-download`, body `{ "email": string, "platform": "macos" | "windows" }`. `NEXT_PUBLIC_API_BASE_URL` falls back to `""`.
- **Error mapping (match NewsletterForm):** non-OK response with `data.detail` → `"Please enter a valid email address."`; any other failure → `"Something went wrong. Please try again."`.
- **No test framework exists.** Verification gate per task = `pnpm build` (TypeScript + ESLint) must pass, plus the scripted manual browser check. Do not add a test runner.
- **Design tokens (already in `globals.css`):** `--ink #090b06`, `--panel #10140b`, `--line #232c15`, `--lemon #c9ff2e`, `--lemon-dim #5d7d15`, `--violet #9d8bff`, `--text #dde8c8`, `--dim #8a9a72`; fonts `--display` (Unbounded), `--body` (Space Grotesk), `--mono` (IBM Plex Mono). Reuse existing button classes `.btn`, `.btn-solid`, `.btn-ghost`, `.nav-cta`.
- **Accessibility:** modal is `role="dialog"` `aria-modal="true"`, closes on Escape and backdrop click (disabled while loading), focuses the email input on open, locks body scroll while open. Respect `prefers-reduced-motion`.
- **Visual taste call (deliberate, flip if desired):** primary platform button uses `.btn-solid`, secondary uses `.btn-ghost`, to avoid two large lemon buttons side by side.

---

### Task 1: Modal, provider, styles, and Hero wiring (vertical slice)

Builds the whole feature end-to-end and proves it through the Hero CTAs. Later tasks only add more trigger sites.

**Files:**
- Create: `app/components/DownloadModal.tsx`
- Create: `app/components/DownloadModalProvider.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css` (append modal styles)
- Modify: `app/components/KidaLanding.tsx` (imports + hook + Hero buttons, lines ≈ 1, 523, 563–570)

**Interfaces:**
- Produces: `export type Platform = "macos" | "windows"` (from `DownloadModal.tsx`).
- Produces: `export function DownloadModal(props: { platform: Platform; onClose: () => void; onSwitchPlatform: (p: Platform) => void }): JSX.Element` (from `DownloadModal.tsx`).
- Produces: `export function DownloadModalProvider({ children }: { children: React.ReactNode }): JSX.Element` and `export function useDownloadModal(): { open: (platform: Platform) => void; close: () => void }` (from `DownloadModalProvider.tsx`).
- Consumes: nothing from earlier tasks.

- [ ] **Step 1: Create `app/components/DownloadModal.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export type Platform = "macos" | "windows";

type Status = "idle" | "loading" | "success" | "error";

const LABELS: Record<Platform, string> = {
  macos: "macOS",
  windows: "Windows",
};

export function DownloadModal({
  platform,
  onClose,
  onSwitchPlatform,
}: {
  platform: Platform;
  onClose: () => void;
  onSwitchPlatform: (p: Platform) => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const other: Platform = platform === "macos" ? "windows" : "macos";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "loading") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, status]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

    try {
      const res = await fetch(`${base}/api/v1/desktop/request-download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, platform }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.detail
            ? "Please enter a valid email address."
            : "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setMessage(
        data.message ??
          `Check your inbox — your ${LABELS[platform]} download link is on the way.`,
      );
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="dl-backdrop"
      onClick={() => {
        if (status !== "loading") onClose();
      }}
    >
      <div
        className="dl-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dl-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="dl-close"
          aria-label="Close"
          onClick={onClose}
          disabled={status === "loading"}
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="dl-success">
            <span className="dl-check" aria-hidden>
              ✓
            </span>
            <h3 id="dl-title">You&apos;re all set</h3>
            <p className="dl-sub">{message}</p>
          </div>
        ) : (
          <>
            <span className="dl-eyebrow">FREE DOWNLOAD</span>
            <h3 id="dl-title">Download Kiɗa for {LABELS[platform]}</h3>
            <p className="dl-sub">
              Enter your email and we&apos;ll send your {LABELS[platform]}{" "}
              download link.
            </p>
            <form className="dl-form" onSubmit={handleSubmit} noValidate>
              <div className="dl-field">
                <input
                  ref={inputRef}
                  type="email"
                  className="dl-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="btn btn-solid"
                  disabled={status === "loading"}
                >
                  {status === "loading" && (
                    <span className="dl-spinner" aria-hidden />
                  )}
                  SEND LINK
                </button>
              </div>
              {status === "error" && (
                <p className="dl-error" role="alert">
                  {message}
                </p>
              )}
            </form>
            <button
              type="button"
              className="dl-switch"
              onClick={() => onSwitchPlatform(other)}
            >
              Need the {LABELS[other]} version?
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/components/DownloadModalProvider.tsx`**

```tsx
"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { DownloadModal, type Platform } from "./DownloadModal";

type DownloadModalContextValue = {
  open: (platform: Platform) => void;
  close: () => void;
};

const DownloadModalContext = createContext<DownloadModalContextValue | null>(
  null,
);

export function useDownloadModal() {
  const ctx = useContext(DownloadModalContext);
  if (!ctx) {
    throw new Error(
      "useDownloadModal must be used within a DownloadModalProvider",
    );
  }
  return ctx;
}

export function DownloadModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [platform, setPlatform] = useState<Platform | null>(null);

  const open = useCallback((p: Platform) => setPlatform(p), []);
  const close = useCallback(() => setPlatform(null), []);

  return (
    <DownloadModalContext.Provider value={{ open, close }}>
      {children}
      {platform && (
        <DownloadModal
          platform={platform}
          onClose={close}
          onSwitchPlatform={setPlatform}
        />
      )}
    </DownloadModalContext.Provider>
  );
}
```

- [ ] **Step 3: Wrap children with the provider in `app/layout.tsx`**

Add the import after the existing `globals.css` import:

```tsx
import "./globals.css";
import { DownloadModalProvider } from "./components/DownloadModalProvider";
```

Replace the body line:

```tsx
      <body>{children}</body>
```

with:

```tsx
      <body>
        <DownloadModalProvider>{children}</DownloadModalProvider>
      </body>
```

- [ ] **Step 4: Append modal styles to `app/globals.css`**

Add at the end of the file:

```css
/* ---------- download modal ---------- */
.dl-backdrop{
  position:fixed;inset:0;z-index:80;
  display:grid;place-items:center;padding:24px;
  background:rgba(5,7,3,.72);backdrop-filter:blur(6px);
  animation:dl-fade .2s ease both;
}
.dl-panel{
  position:relative;width:100%;max-width:440px;
  background:var(--panel);border:1px solid var(--line);border-radius:10px;
  padding:38px 32px 30px;text-align:center;
  box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 50px rgba(201,255,46,.06);
  animation:dl-pop .25s cubic-bezier(.2,.8,.2,1) both;
}
.dl-close{
  position:absolute;top:14px;right:16px;
  font-family:var(--mono);font-size:14px;color:var(--dim);
  width:28px;height:28px;border-radius:4px;
  transition:color .2s,background .2s;
}
.dl-close:hover{color:var(--lemon);background:rgba(201,255,46,.08)}
.dl-eyebrow{
  font-family:var(--mono);font-size:11px;letter-spacing:.26em;color:var(--lemon-dim);
}
.dl-panel h3{
  font-family:var(--display);font-weight:700;font-size:24px;color:#f2ffd9;
  margin:12px 0 8px;letter-spacing:.02em;
}
.dl-sub{color:var(--dim);font-size:15px;margin-bottom:22px}
.dl-form{display:flex;flex-direction:column;gap:10px}
.dl-field{display:flex;gap:10px;flex-wrap:wrap}
.dl-input{
  flex:1;min-width:0;
  font-family:var(--mono);font-size:14px;color:var(--text);
  background:rgba(9,11,6,.7);border:1px solid var(--line);border-radius:4px;
  padding:13px 14px;transition:border-color .2s;
}
.dl-input:focus{outline:none;border-color:var(--lemon-dim)}
.dl-input::placeholder{color:var(--dim)}
.dl-field .btn{white-space:nowrap}
.dl-error{font-family:var(--mono);font-size:12px;color:#ff6a6a;text-align:left}
.dl-switch{
  margin-top:18px;font-family:var(--mono);font-size:12px;letter-spacing:.06em;
  color:var(--dim);text-decoration:underline;text-underline-offset:3px;
  transition:color .2s;
}
.dl-switch:hover{color:var(--lemon)}
.dl-success{display:flex;flex-direction:column;align-items:center;gap:6px}
.dl-check{
  width:46px;height:46px;border-radius:50%;display:grid;place-items:center;
  background:rgba(201,255,46,.12);color:var(--lemon);font-size:22px;margin-bottom:8px;
}
.dl-spinner{
  width:14px;height:14px;border-radius:50%;display:inline-block;vertical-align:-2px;
  margin-right:8px;border:2px solid rgba(9,11,6,.35);border-top-color:var(--ink);
  animation:dl-spin .7s linear infinite;
}
@keyframes dl-fade{from{opacity:0}to{opacity:1}}
@keyframes dl-pop{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}
@keyframes dl-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){
  .dl-backdrop,.dl-panel{animation:none}
}
```

- [ ] **Step 5: Wire the Hero CTAs in `app/components/KidaLanding.tsx`**

Add the import alongside the other component imports near the top of the file (after the `gsap` imports, around line 6):

```tsx
import { useDownloadModal } from "./DownloadModalProvider";
```

Inside the `KidaLanding` component body, immediately after `const [playing, setPlaying] = useState(false);` (≈ line 75), add:

```tsx
  const { open } = useDownloadModal();
```

Replace the Hero actions block (≈ lines 563–570):

```tsx
          <div className="hero-actions">
            <a className="btn btn-solid" href="#get">
              GET KIƊA FREE
            </a>
            <a className="btn btn-ghost" href="#how">
              90-SEC DEMO ↓
            </a>
          </div>
```

with:

```tsx
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
```

- [ ] **Step 6: Verify the build passes**

Run: `pnpm build`
Expected: build completes with no TypeScript or ESLint errors. (The existing GSAP selector `.hero-actions .btn` still matches the new `<button class="btn ...">` elements, so the hero entrance animation keeps working.)

- [ ] **Step 7: Manual browser verification**

Run: `pnpm dev`, open http://localhost:3000, and confirm:
1. Hero shows `DOWNLOAD FOR MAC` and `DOWNLOAD FOR WINDOWS` plus `90-SEC DEMO`.
2. Click `DOWNLOAD FOR MAC` → modal opens titled "Download Kiɗa for macOS", email input is focused, body scroll is locked.
3. Click "Need the Windows version?" → title switches to "Download Kiɗa for Windows".
4. Submit with an empty/invalid email → browser blocks or, on backend `detail`, shows "Please enter a valid email address." With no backend running, submitting a value shows the loading spinner then "Something went wrong. Please try again." (network error path) — this is expected without the backend.
5. Press `Escape` and click the dim backdrop → modal closes both ways.

- [ ] **Step 8: Commit**

```bash
git add app/components/DownloadModal.tsx app/components/DownloadModalProvider.tsx app/layout.tsx app/globals.css app/components/KidaLanding.tsx
git commit -m "feat: add desktop download modal with email capture (Hero CTAs)"
```

---

### Task 2: Wire the remaining CTAs (Pricing, closing section, nav)

Adds the rest of the trigger sites and the two small layout helpers needed to stack/space the paired buttons.

**Files:**
- Modify: `app/components/KidaLanding.tsx` (nav ≈ 539–541, Pricing Free ≈ 825–827, closing `#get` ≈ 909–911)
- Modify: `app/globals.css` (append `.tier-ctas` and `.cta-ctas`)

**Interfaces:**
- Consumes: `useDownloadModal()` and the `open` value already destructured in Task 1.
- Produces: nothing new for later tasks (final task).

- [ ] **Step 1: Wire the nav CTA in `app/components/KidaLanding.tsx`**

Replace (≈ lines 539–541):

```tsx
        <a className="nav-cta" href="#get">
          GET KIƊA
        </a>
```

with:

```tsx
        <button
          type="button"
          className="nav-cta"
          onClick={() => open("macos")}
        >
          GET KIƊA
        </button>
```

- [ ] **Step 2: Wire the Pricing → Free tier CTA**

Replace (≈ lines 825–827):

```tsx
            <a className="btn btn-ghost" href="#get">
              DOWNLOAD FREE
            </a>
```

with:

```tsx
            <div className="tier-ctas">
              <button
                type="button"
                className="btn btn-ghost"
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
            </div>
```

- [ ] **Step 3: Wire the closing `#get` section CTA**

Replace (≈ lines 909–911):

```tsx
        <a className="btn btn-solid reveal" href="#">
          DOWNLOAD KIƊA — FREE
        </a>
```

with:

```tsx
        <div className="cta-ctas reveal">
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
        </div>
```

- [ ] **Step 4: Append the two layout helpers to `app/globals.css`**

Add at the end of the file:

```css
.tier-ctas{display:flex;flex-direction:column;gap:10px}
.tier-ctas .btn{text-align:center}
.cta-ctas{margin-top:42px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
```

- [ ] **Step 5: Verify the build passes**

Run: `pnpm build`
Expected: build completes with no TypeScript or ESLint errors. (The closing section keeps its `reveal` class on the new wrapper `div`, so the GSAP reveal still fires; the original `.cta-wrap .btn{margin-top:42px}` rule no longer applies to the wrapper, which is why `.cta-ctas` sets its own `margin-top:42px`.)

- [ ] **Step 6: Manual browser verification**

Run: `pnpm dev`, open http://localhost:3000, and confirm:
1. Nav `GET KIƊA` button opens the modal on macOS.
2. Pricing Free tier shows stacked `DOWNLOAD FOR MAC` / `DOWNLOAD FOR WINDOWS`; each opens the modal on the matching platform.
3. Closing section shows the two buttons centered; each opens the matching platform; the section still fades in on scroll.
4. No layout regressions in nav, pricing card, or the closing section.

- [ ] **Step 7: Commit**

```bash
git add app/components/KidaLanding.tsx app/globals.css
git commit -m "feat: wire nav, pricing, and closing CTAs to download modal"
```

---

## Self-Review

**Spec coverage:**
- Separate Mac/Windows buttons on the page → Task 1 (Hero), Task 2 (Pricing, closing). ✓
- Modal pre-set per platform, email-only → Task 1 Step 1 (`platform` prop, no picker). ✓
- In-modal switch link (nav single-button reachability) → Task 1 Step 1 (`dl-switch` / `onSwitchPlatform`), Task 2 Step 1 (nav). ✓
- Provider/hook mounted in layout → Task 1 Steps 2–3. ✓
- Backend contract + error mapping → Task 1 Step 1 (`handleSubmit`). ✓
- Styling via tokens, existing button classes → Task 1 Step 4, Task 2 Step 4. ✓
- Accessibility (dialog role, Escape, backdrop, focus, scroll lock, reduced motion) → Task 1 Steps 1 & 4. ✓
- Scope: only `KidaLanding` / live page edited; unused variant untouched → Global Constraints. ✓
- Manual verification (no test runner) → Task 1 Step 7, Task 2 Step 6. ✓

**Placeholder scan:** No TBD/TODO; all code blocks are complete. ✓

**Type consistency:** `Platform`, `open(platform)`, `onSwitchPlatform`, `onClose`, `useDownloadModal` used identically across `DownloadModal.tsx`, `DownloadModalProvider.tsx`, and `KidaLanding.tsx`. ✓
