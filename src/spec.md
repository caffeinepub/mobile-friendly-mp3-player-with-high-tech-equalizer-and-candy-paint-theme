# Specification

## Summary
**Goal:** Deliver a mobile-friendly MP3 player web app for iOS Safari with a high-tech equalizer, real-time visualizer, and a glossy “red candy paint” theme (with alternate color options), plus optional preference sync via Internet Identity.

**Planned changes:**
- Implement local MP3 file selection (file picker) with a visible playlist/queue and track selection to start playback.
- Add core playback controls: play/pause, previous/next, seek bar with current time/duration display, and in-app volume control.
- Add a Web Audio API–based equalizer with an on/off toggle, at least 5 adjustable frequency band sliders, and a real-time audio visualizer (spectrum-style bars).
- Create and apply a cohesive “red candy paint” high-tech default theme and add in-app theme color options while keeping the same visual style; ensure all UI text is English.
- Generate and integrate a candy-apple-on-a-stick logo in the UI, and include an app icon variant; store generated assets under `frontend/public/assets/generated` and reference via static paths.
- Persist non-audio settings locally (theme, equalizer values, last volume) so they restore on refresh.
- Add a small Motoko backend API (single actor in `backend/main.mo`) to store/retrieve theme and equalizer preferences per authenticated principal when Internet Identity is used, while keeping the app fully usable without sign-in via local persistence.

**User-visible outcome:** Users can pick local MP3s on iOS Safari, play them from a playlist with full controls, enable a multi-band equalizer with a live visualizer, switch between candy-paint color themes, see the candy-apple logo/app icon branding, and have theme/EQ/volume settings restored (and synced across sessions when signed in).
