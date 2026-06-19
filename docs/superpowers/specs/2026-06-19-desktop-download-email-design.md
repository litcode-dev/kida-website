# Desktop Download via Email — Design

**Date:** 2026-06-19
**Status:** Approved (pending spec review)

## Goal

Let visitors download the Kiɗa desktop app for **macOS** and **Windows** by entering
their email. The download link is delivered to their inbox by the existing backend.
Separate "Download for Mac" and "Download for Windows" buttons appear on the page;
clicking one opens a modal pre-set to that platform, asks only for an email, and
submits it to the backend.

## Context

- The live page is `app/page.tsx` → `app/components/KidaLanding.tsx` (one large client
  component with its own nav, hero, pricing, and closing `#get` section).
- `app/page copy.tsx` and the `Hero`/`Navbar`/`Pricing`/`Footer`/`NewsletterForm`
  components are an **older, unrendered** variant. They are out of scope; do not edit them.
- `NewsletterForm.tsx` (in the unused set) is the reference pattern for the fetch:
  it POSTs to `${NEXT_PUBLIC_API_BASE_URL}/api/v1/newsletter/subscribe`, reads `data.detail`
  for validation errors, and `data.message` for success. The new feature mirrors this.
- Styling lives entirely in `app/globals.css` using design tokens: `--ink`, `--panel`,
  `--line`, `--lemon`, `--lemon-dim`, `--violet`, `--text`, `--dim`, and fonts
  `--display` (Unbounded), `--body` (Space Grotesk), `--mono` (IBM Plex Mono).
  Buttons use `.btn` / `.btn-solid` / `.btn-ghost`; nav CTA uses `.nav-cta`.

## Scope

In scope: macOS + Windows **desktop** downloads via email capture.
Out of scope (YAGNI): iOS/Android (the existing mobile story is untouched), in-repo email
sending, persisting emails on the frontend, and any backend implementation (built separately).

## Architecture

Three new pieces plus edits to `KidaLanding` and `globals.css`.

### 1. `app/components/DownloadModal.tsx` (new, client component)

Self-contained modal that captures an email for a single, already-chosen platform.

- **Props:** `{ platform: Platform; onClose: () => void; onSwitchPlatform: (p: Platform) => void }`
  where `type Platform = "macos" | "windows"`.
- **State:** `email: string`, `status: "idle" | "loading" | "success" | "error"`, `message: string`
  (same `Status` model as `NewsletterForm`).
- **UI:**
  - Backdrop (`.dl-backdrop`) — click closes; covers viewport with blur, matching the
    existing `backdrop-filter` aesthetic.
  - Panel (`.dl-panel`) — `--panel` background, `--line` border, mono/display fonts.
  - Heading: "Download Kiɗa for macOS" / "Download Kiɗa for Windows".
  - Email input + submit button (`.btn .btn-solid`), reusing the loading-spinner idea.
  - A subtle text link to switch platform ("Need the Windows version?" /
    "Need the Mac version?") that calls `onSwitchPlatform` — this is what lets the single
    nav button reach both platforms. It is a minor affordance, not a full picker.
  - Success state: checkmark + "Check your inbox — your <platform> download link is on the way."
  - Error state: inline message under the field (`role="alert"`).
- **Submit:** POST to the backend (see Contract). On non-OK: show validation/generic message
  and set `status="error"`. On OK: `status="success"`, show `data.message` or a default.
- **Accessibility:** `role="dialog"`, `aria-modal="true"`, labelled by the heading; close on
  `Escape`; focus the email input on open; restore focus to the trigger on close; body scroll
  locked while open.

### 2. `app/components/DownloadModalProvider.tsx` (new, client component)

React context that owns the single modal instance and the open/close state.

- **Context value:** `{ open: (platform: Platform) => void; close: () => void }`.
- Holds `isOpen` and the active `platform` in state; renders one `<DownloadModal/>` when open,
  wiring `onSwitchPlatform` to update the active platform in place.
- Exposes a `useDownloadModal()` hook; throws if used outside the provider.
- Mounted in `app/layout.tsx`, wrapping `{children}`.

### 3. `app/layout.tsx` (edit)

Wrap `{children}` in `<DownloadModalProvider>`. (The provider is a client component;
`layout.tsx` stays a server component and just renders it.)

### 4. `app/components/KidaLanding.tsx` (edit)

Replace the "get Kiɗa free" anchors with platform buttons that call `useDownloadModal().open(...)`:

| Location | Current (line ≈) | New |
| --- | --- | --- |
| Hero actions | `GET KIƊA FREE` (564) | Two buttons: `DOWNLOAD FOR MAC` (`open("macos")`) and `DOWNLOAD FOR WINDOWS` (`open("windows")`). Keep `90-SEC DEMO`. |
| Pricing → Free tier | `DOWNLOAD FREE` (825) | Two buttons: Mac / Windows. |
| Closing `#get` section | `DOWNLOAD KIƊA — FREE` (909) | Two buttons: Mac / Windows. |
| Nav CTA | `GET KIƊA` (539) | Single compact button `GET KIƊA` → `open("macos")`; the in-modal switch link reaches Windows. |

- The buttons keep the existing visual classes (`.btn .btn-solid` / `.btn .btn-ghost`,
  `.nav-cta`) so they match the page. Small inline platform SVGs (Apple / Windows) optional,
  consistent with KidaLanding's mono-caps style.
- `KidaLanding` is already `"use client"`, so it can call the `useDownloadModal()` hook directly.
- The closing `#get` section element stays (it is also the anchor target for any remaining
  `#get` links); only its button(s) change.

### 5. `app/globals.css` (edit)

Add modal styles using existing tokens: `.dl-backdrop`, `.dl-panel`, `.dl-head`, `.dl-field`,
`.dl-input`, `.dl-success`, `.dl-error`, `.dl-switch`, `.dl-close`, plus a spinner and a simple
fade/scale entrance. Reuse `.btn`/`.btn-solid` for the submit button. Respect
`prefers-reduced-motion` for the entrance animation.

## Data Flow

```
User clicks "Download for Mac"  →  open("macos")
  → DownloadModalProvider sets { isOpen: true, platform: "macos" }
  → DownloadModal renders, focuses email input
  → user submits email
  → POST {email, platform:"macos"} to backend
  → backend emails the macOS download link
  → modal shows success ("Check your inbox…")
```

## Backend Contract (built separately)

- **Endpoint:** `POST ${NEXT_PUBLIC_API_BASE_URL}/api/v1/desktop/request-download`
- **Request body:** `{ "email": string, "platform": "macos" | "windows" }`
- **Success `200`:** `{ "message": string }`
- **Error (e.g. `400`/`422`):** `{ "detail": ... }` — same shape the newsletter endpoint uses.
  Frontend maps `detail` → "Please enter a valid email address."; any other failure →
  "Something went wrong. Please try again."
- `NEXT_PUBLIC_API_BASE_URL` is the existing env var (falls back to `""` for same-origin).

## Error Handling

- Empty/invalid email: HTML `required`/`type="email"` plus backend `detail` mapping.
- Network/exception: caught, generic error message, `status="error"`, form stays editable.
- Backdrop/Escape close is disabled (or ignored) while `status === "loading"` to avoid
  closing mid-request.

## Testing / Verification

No test framework is configured in the repo. Verify manually with `next dev`:

1. Each CTA (Hero Mac/Win, Pricing Mac/Win, closing Mac/Win, nav) opens the modal with the
   correct platform heading.
2. The in-modal switch link toggles macOS ↔ Windows.
3. Submitting a blank/invalid email shows the validation message; a valid email shows the
   loading state then success (point `NEXT_PUBLIC_API_BASE_URL` at a stub, or temporarily
   mock the response, to exercise success/error paths).
4. Escape and backdrop click close the modal (except mid-request); focus returns to the trigger.
5. `prefers-reduced-motion` disables the entrance animation.

## Files Touched

- New: `app/components/DownloadModal.tsx`
- New: `app/components/DownloadModalProvider.tsx`
- Edit: `app/layout.tsx` (wrap children in provider)
- Edit: `app/components/KidaLanding.tsx` (swap CTAs for platform buttons)
- Edit: `app/globals.css` (modal styles)
