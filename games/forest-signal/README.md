# Forest Signal

Small playable prototype for the `/games/forest-signal` route.

## Intent

Forest Signal is a compact grid game about collecting calm signal nodes while avoiding noisy cells. It is intentionally simple now, but the concept can grow into a standalone web game with a separate Vercel deployment.

## Current Site Integration

- Route: `/games/forest-signal`
- Component: `components/games/forest-signal/forest-signal-game.tsx`
- Data source: `content/site.ts`

## Standalone Direction

- Keep the first version dependency-light: React + CSS grid + keyboard controls.
- Move game state into a small engine module when rules become more complex.
- Add levels as typed JSON data instead of hardcoding maps in components.
- Add local progress with `localStorage` only after the core loop is stable.
- Add sound and atmospheric background behind a user-controlled mute toggle.

## Next Mechanics

- Different signal types: calm, corrupted, timed.
- Fog-of-war around the player.
- Score multipliers for clean paths.
- Daily seed mode.
- Shareable result card.
