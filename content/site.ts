import {
  Code2,
  FileText,
  Gamepad2,
  Github,
  Layers3,
  Linkedin,
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
    href: '/',
  },
  {
    slug: 'royal-house',
    name: 'Royal House',
    type: 'Commercial interface',
    status: 'Shipped',
    description:
      'Frontend work focused on faster loading, clearer flows and production-grade interface behavior.',
    stack: ['React', 'TypeScript', 'Performance', 'UX'],
    href: '/works',
  },
  {
    slug: 'openclaw-lab',
    name: 'OpenClaw Lab',
    type: 'Automation lab',
    status: 'Exploring',
    description:
      'Private experiments around local agents, personal infrastructure, tools and workflow automation.',
    stack: ['Agents', 'Docker', 'CLI', 'Automation'],
    href: '/works',
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
  },
  {
    slug: 'interfaces-that-feel-alive',
    title: 'Interfaces that feel alive',
    date: '2026-04-28',
    description:
      'A design engineering note about motion, depth, feedback and why polish is a product feature.',
    readTime: '7 min',
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
  },
  {
    slug: 'terminal-runner',
    title: 'Terminal Runner',
    status: 'Concept',
    description:
      'A fast keyboard-first arcade experiment built around code, rhythm and precision movement.',
    stack: ['React', 'Keyboard', 'Game Loop'],
  },
]

export const systemLinks = [
  { label: 'Source', value: 'GitHub', icon: Code2 },
  { label: 'Deploy', value: 'Vercel', icon: Sparkles },
  { label: 'DNS', value: 'Cloudflare', icon: TerminalSquare },
]
