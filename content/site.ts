import {
  Code2,
  FileText,
  Gamepad2,
  Github,
  Layers3,
  Linkedin,
  Music2,
  NotebookText,
  Send,
  Sparkles,
  TerminalSquare,
} from 'lucide-react'

export const site = {
  domain: 'lattelix.ru',
  name: 'Lattelix',
  title: 'Lattelix — living web systems, interfaces and experiments',
  description:
    'Personal hub for full-stack interfaces, data-heavy products, games, engineering notes and selected work.',
  email: 'hello@lattelix.ru',
  careerEmail: 'career@lattelix.ru',
  githubUsername: 'lattelix',
  role: 'Frontend, full-stack and data engineer',
  summary:
    'I design and build web systems that feel alive: fast interfaces, precise product surfaces, data tools, automations and playable experiments.',
}

export const navItems = [
  { label: 'CV', href: '/cv', icon: FileText },
  { label: 'Works', href: '/works', icon: Layers3 },
  { label: 'Posts', href: '/posts', icon: NotebookText },
  { label: 'Games', href: '/games', icon: Gamepad2 },
  { label: 'Music', href: '/music', icon: Music2 },
]

export const socials = [
  { label: 'Telegram', href: 'https://t.me/lattelix', icon: Send },
  { label: 'GitHub', href: 'https://github.com/lattelix', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export const contactLinks = [
  { label: 'Career', value: site.careerEmail, href: `mailto:${site.careerEmail}` },
  { label: 'Hello', value: site.email, href: `mailto:${site.email}` },
  { label: 'Domain', value: site.domain, href: `https://${site.domain}` },
]

export const focusAreas = [
  'Living product interfaces',
  'Next.js and React architecture',
  'Data-heavy dashboards',
  'Automation and private tools',
  'Games and interaction design',
]

export const stackGroups = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Motion systems'],
  },
  {
    title: 'Backend and data',
    items: ['Node.js', 'API contracts', 'PostgreSQL', 'Data visualization', 'Automation'],
  },
  {
    title: 'Infrastructure',
    items: ['GitHub', 'Vercel', 'Cloudflare', 'Docker', 'Private tooling'],
  },
]

export const experience = [
  {
    company: 'Royal House',
    role: 'Frontend Developer',
    period: 'Production work',
    impact: 'Performance, UX and complex SPA flows',
    description:
      'Optimized loading paths, tightened interface states and shipped user-facing flows with a strong focus on speed and clarity.',
  },
  {
    company: 'Kelsoft',
    role: 'Full-stack Developer',
    period: 'Product engineering',
    impact: 'TypeScript, data surfaces and backend integration',
    description:
      'Built application features around large datasets, visual states and reliable frontend/backend contracts.',
  },
  {
    company: 'School 21',
    role: 'Software Engineering',
    period: 'Systems foundation',
    impact: 'C, algorithms, Unix and peer review',
    description:
      'Worked through low-level programming, algorithms, collaboration discipline and rigorous code review.',
  },
]

export const projects = [
  {
    slug: 'personal-hub',
    name: 'Personal Hub',
    type: 'Identity system',
    status: 'In build',
    description:
      'A living portfolio, CV, writing archive and experiment launcher for public work and private infrastructure.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel', 'Cloudflare'],
    href: '/works/personal-hub',
    role: 'Design engineer and full-stack owner',
    year: '2026',
    result: 'A public operating surface for CV, work, writing, games and private infrastructure.',
    challenge:
      'The original generated page looked like a generic portfolio and did not support the long-term idea of a personal platform.',
    solution:
      'Rebuilt the site around typed content, route-level sections, theme-aware atmosphere, SEO metadata and Vercel/Cloudflare deployment.',
    highlights: ['Content-first routing', 'Light and dark visual systems', 'Live GitHub signal', 'SEO/OG foundation'],
  },
  {
    slug: 'royal-house',
    name: 'Royal House',
    type: 'Commercial interface',
    status: 'Shipped',
    description:
      'Frontend work focused on faster loading, clearer flows and production-grade interface behavior.',
    stack: ['React', 'TypeScript', 'Performance', 'UX'],
    href: '/works/royal-house',
    role: 'Frontend Developer',
    year: 'Production',
    result: 'Sharper loading paths and clearer interface states for user-facing product flows.',
    challenge:
      'The product needed faster perceived performance and cleaner interaction behavior under real user conditions.',
    solution:
      'Focused on performance-sensitive frontend work, loading strategy, UI states and pragmatic interface cleanup.',
    highlights: ['Performance work', 'SPA flows', 'Production UX', 'React/TypeScript'],
  },
  {
    slug: 'openclaw-lab',
    name: 'OpenClaw Lab',
    type: 'Automation lab',
    status: 'Exploring',
    description:
      'Private experiments around local agents, personal infrastructure, tools and workflow automation.',
    stack: ['Agents', 'Docker', 'CLI', 'Automation'],
    href: '/works/openclaw-lab',
    role: 'Automation and local tooling explorer',
    year: 'Exploring',
    result: 'A private lab direction for local agents, server tooling and workflow automation.',
    challenge:
      'Personal infrastructure becomes hard to reason about when tools, agents and services are scattered.',
    solution:
      'Treat the lab as a visible system map: what is public, what stays private, and what can become product-quality later.',
    highlights: ['Agents', 'Docker', 'CLI design', 'Private tools'],
  },
]

export const posts = [
  {
    slug: 'why-personal-infra-matters',
    title: 'Why personal infrastructure matters',
    date: '2026-04-28',
    description:
      'Notes on treating a personal website as a long-lived operating surface, not a disposable portfolio.',
    readTime: '5 min',
    body: [
      'A personal site should not be a disposable landing page. It should be a stable surface for identity, work, experiments and small systems that grow over time.',
      'The useful pattern is to keep public parts simple and durable while leaving room for private infrastructure behind Access, tunnels or separate deployments.',
      'That gives the site a reason to exist beyond hiring: it becomes the index of what is being built.',
    ],
  },
  {
    slug: 'interfaces-that-feel-alive',
    title: 'Interfaces that feel alive',
    date: '2026-04-28',
    description:
      'A design engineering note about motion, depth, feedback and why polish is a product feature.',
    readTime: '7 min',
    body: [
      'An interface feels alive when feedback, depth and state are part of the product language, not decoration.',
      'Motion should answer a question: where did this come from, what changed, what is active, and what can I touch next?',
      'The goal is not maximal animation. The goal is an interface that behaves like it has mass, light and intent.',
    ],
  },
  {
    slug: 'music-as-interface',
    title: 'Music as an interface layer',
    date: '2026-05-12',
    description:
      'A plan for exposing listening context publicly without turning a private music server into an open service.',
    readTime: '6 min',
    body: [
      'The clean split is private playback and public context. Navidrome can stay protected, while the website shows curated playlists, notes and now-playing signals.',
      'That keeps the listening room personal and the public music page intentional.',
      'The public page should tell visitors what the sound world is, not leak the whole library.',
    ],
  },
]

export const games = [
  {
    slug: 'forest-signal',
    title: 'Forest Signal',
    status: 'Prototype',
    description:
      'A tiny atmospheric game idea about navigating signals in a living forest interface.',
    stack: ['Canvas', 'Motion', 'Input'],
    href: '/games/forest-signal',
    objective: 'Collect five signals before the noise field overwhelms the board.',
    controls: ['Arrow keys or WASD to move', 'Avoid noise cells', 'Reach signal cells to score'],
    playable: true,
  },
  {
    slug: 'terminal-runner',
    title: 'Terminal Runner',
    status: 'Concept',
    description:
      'A fast keyboard-first arcade experiment built around code, rhythm and precision movement.',
    stack: ['React', 'Keyboard', 'Game Loop'],
    href: '/games/terminal-runner',
    objective: 'A future game about timing, command input and fast movement.',
    controls: ['Keyboard-first prototype planned'],
    playable: false,
  },
]

export const designVariants = [
  {
    slug: 'classic',
    title: 'Classic Systems CV',
    tone: 'Traditional, sharp and recruiter-friendly',
    description:
      'A restrained version built around clear hierarchy, dense information and fast scanning.',
    href: '/designs/classic',
  },
  {
    slug: 'editorial',
    title: 'Editorial Archive',
    tone: 'Magazine-like, reflective and content-heavy',
    description:
      'Projects, notes and experiments become a designed engineering publication.',
    href: '/designs/editorial',
  },
  {
    slug: 'cinematic',
    title: 'Cinematic Nature x Tech',
    tone: 'Current direction, pushed harder',
    description:
      'A more immersive version of the current living-scene identity with stronger atmosphere.',
    href: '/designs/cinematic',
  },
  {
    slug: 'awwwards',
    title: 'Awwwards Signal Room',
    tone: 'Maximum-wow experimental interface',
    description:
      'A high-risk, high-impact direction for WebGL, kinetic transitions and art-directed navigation.',
    href: '/designs/awwwards',
  },
]

export const musicPlan = {
  title: 'Music room',
  description:
    'A public music surface for listening notes, curated playlists and now-playing signals, backed by a private Navidrome setup later.',
  publicFeatures: [
    'Now-playing signal',
    'Seasonal mixtapes',
    'Album wall',
    'Mood map',
    'Listening notes',
    'Public share cards',
  ],
  privateArchitecture: [
    'music.lattelix.ru runs Navidrome behind Cloudflare Tunnel',
    'Cloudflare Access protects the web UI when used personally',
    'lattelix.ru/music stays public and exposes only curated metadata',
    'Subsonic/mobile clients need a separate decision because Cloudflare Access can break client compatibility',
  ],
  releasePlan: [
    {
      title: 'Public room',
      status: 'Now',
      description:
        'Keep `/music` public: curated notes, playlist cards, album wall, mood tags and links to external sources.',
    },
    {
      title: 'Private library',
      status: 'Later',
      description:
        'Run Navidrome on the personal server behind Cloudflare Tunnel and protect the browser UI with Cloudflare Access.',
    },
    {
      title: 'Signal bridge',
      status: 'Optional',
      description:
        'Expose sanitized now-playing metadata through a tiny read-only endpoint, not through direct public Navidrome access.',
    },
  ],
  automationIdeas: [
    'Weekly listening digest generated from scrobbles',
    'Mood-based playlist shelves',
    'Album notes with cover color extraction',
    'Private import pipeline for local music folders',
  ],
}

export const systemLinks = [
  { label: 'Source', value: 'GitHub', icon: Code2 },
  { label: 'Deploy', value: 'Vercel', icon: Sparkles },
  { label: 'DNS', value: 'Cloudflare', icon: TerminalSquare },
]
