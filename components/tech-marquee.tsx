"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TechItem {
  name: string;
  icon: string;
}

const techStack: TechItem[] = [
  { name: "React", icon: "⚛" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "⬢" },
  { name: "Docker", icon: "🐳" },
  { name: "Redux", icon: "↻" },
  { name: "Tailwind", icon: "🌊" },
  { name: "Git", icon: "⎇" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "GraphQL", icon: "◈" },
];

function TechCard({ tech }: { tech: TechItem }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-lg border border-border bg-card px-5 py-3 transition-colors hover:border-primary/30">
      <span className="font-mono text-lg text-primary">{tech.icon}</span>
      <span className="whitespace-nowrap text-sm font-medium text-foreground">
        {tech.name}
      </span>
    </div>
  );
}

export function TechMarquee() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="stack" ref={ref} className="py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-sm text-primary">{"// Tech Stack"}</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Tools I Work With
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling row 1 */}
        <div className="mb-4 flex gap-4">
          <div className="flex shrink-0 animate-marquee gap-4">
            {techStack.map((tech) => (
              <TechCard key={tech.name} tech={tech} />
            ))}
          </div>
          <div
            className="flex shrink-0 animate-marquee gap-4"
            aria-hidden
          >
            {techStack.map((tech) => (
              <TechCard key={`dup-${tech.name}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* Scrolling row 2 - reversed */}
        <div className="flex gap-4">
          <div className="flex shrink-0 animate-marquee-reverse gap-4">
            {[...techStack].reverse().map((tech) => (
              <TechCard key={`rev-${tech.name}`} tech={tech} />
            ))}
          </div>
          <div
            className="flex shrink-0 animate-marquee-reverse gap-4"
            aria-hidden
          >
            {[...techStack].reverse().map((tech) => (
              <TechCard key={`rev-dup-${tech.name}`} tech={tech} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
