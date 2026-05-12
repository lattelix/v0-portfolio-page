# Terminal Runner

Planned standalone game concept for the personal hub.

## Intent

Terminal Runner is a fast keyboard-first arcade prototype where the player routes packets through unstable infrastructure. It should feel like a command line, a rhythm game and a network map collapsed into one interface.

## Suggested Stack

- Next.js app route for the first playable version.
- Canvas for the core loop once movement needs frame-level control.
- DOM UI for menus, HUD, settings and accessibility controls.
- Optional Web Audio after the visual loop is stable.

## First Playable Scope

- One route: `/games/terminal-runner`.
- Three lanes with packet switching.
- Obstacles represented as dropped nodes or latency spikes.
- Keyboard and touch controls.
- Reduced-motion fallback that keeps the game playable.

## Standalone Direction

- Promote to a separate repo only after it has a clear loop, score system and replay value.
- Deploy as `terminal-runner.lattelix.ru` or keep it under `/games/terminal-runner` until it is worth a public subdomain.
