# AGENTS.md — Lattelix Personal Hub

## Mandatory starting point

**Before any design, code, infrastructure, roadmap, or content change, read**
docs/CODEX_HANDOFF_2026-10-10.md in this repository.

It contains the owner's real product vision, current confirmed implementation, protected workflows, known blockers, acceptance criteria, and resource links. Treat it as the current starting snapshot, **not** proof that it remains current; verify HEAD and connected service status.

**Owner language:** report progress and blockers in Russian.

## The product, not a single template

Lattelix is a personal portfolio, product hub, experiments, CV, tools, games, and publishing platform. The owner wants **multiple distinct, first-class UX experiences** on one coherent site. They may differ in information architecture, page structure, navigation, interactions, story flows, motion, and audio—not merely CSS colors/backgrounds. All experiences must preserve discoverability of real work, CV, tools, and contact and use shared factual content.

Do not remove existing /designs prototypes or flatten independent design experiences into one theme provider. Start from the actual code and propose the smallest extensible implementation with excellent mobile, SEO, accessibility, and performance.

## Repo and scope

- Main GitHub: lattelix/v0-portfolio-page. Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Vercel.
- Related public project: lattelix/lifedeck; do not change it unless explicitly needed for the specified Lattelix integration.
- Infrastructure: private lattelix/dotfiles; Cloudflare scripts, tokens via GitHub Secrets. No raw secrets or personal forwarding addresses in this public repository.
- Other projects (client work, AI Club, etc.) are not automatically in scope.

## Core engineering rules

1. Owner's latest explicit decision supersedes this handoff; current code/services supersede historical implementation claims.
2. Do work, not only write plans; proceed task by task until a real blocker, a required owner decision, or session limit. If blocked, continue other permitted independent tasks.
3. No invented CV facts, project results, licenses, endorsements, achievements, or performance measurements.
4. Do not publish private Royal Hotel/client sources or sensitive real integrations. Ask about rights and access before hosting an archive demo.
5. No background music playback without user interaction or valid distribution rights; honor reduced-motion and reduced-data.
6. No destructive changes to domains, mail routing, credentials, production, or unrelated repositories without explicit approval and rollback.
7. **Cloudflare Email Routing .com is not confirmed active** in the handoff. Verify working aliases and delivery BEFORE publishing hello@lattelix.com and career@lattelix.com as live site contacts.
8. Keep production stable while implementing experimental modes. Prefer feature branches/previews for substantial redesigns.
9. Always verify critical flows with lint, typecheck, build, and meaningful browser tests; do not treat component status labels as tests.
10. Update docs and give Russian progress reports with changed files, links, checks, blockers, and exact next owner input (only if unavoidable).

## Relevant entry points

- content/site.ts — canonical site data and currently still .ru contact addresses.
- app/page.tsx, components/site/living-scene.tsx, app/globals.css — current cinematic landscape.
- app/cv/page.tsx, components/site/route-page.tsx — CV; missing Download PDF action and PDF asset.
- app/designs/* — noindex design experiments, not a finished switching system.
- app/works/*, app/tools/*, app/games/*, app/music/* — real content/product surfaces.
- next.config.mjs, components/site/legacy-domain-notice.tsx — .ru -> .com migration and dismissible visitor notice.
- docs/CODEX_HANDOFF_2026-10-10.md — exhaustive handoff and milestones.

**Principal quality bar:** independent modes should be expressive enough to demonstrate top-level design and engineering, but the experience must remain genuinely helpful, honest, responsive, and accessible.
