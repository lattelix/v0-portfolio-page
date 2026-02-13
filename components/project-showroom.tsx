"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  name: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
}

const projects: Project[] = [
  {
    name: "Royal Hotel",
    description:
      "A luxury hotel booking platform with real-time availability, interactive floor plans, and a seamless checkout experience. Built with performance-first architecture achieving 95+ Lighthouse scores.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    name: "Blanchard",
    description:
      "An elegant art gallery website featuring smooth page transitions, dynamic image galleries with lazy loading, and a headless CMS integration for effortless content management.",
    tags: ["React", "Framer Motion", "GSAP", "Sanity CMS", "Styled Components"],
    github: "https://github.com",
    live: "https://example.com",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function ProjectShowroom() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-sm text-primary">{"// Projects"}</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Featured Work
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Selected projects that showcase my approach to frontend engineering.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:scale-[1.02] hover:border-primary/40"
            >
              {/* Glow effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -inset-px rounded-xl bg-primary/5" />
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_20px_rgba(234,179,8,0.05)]" />
              </div>

              <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-xl font-bold text-foreground md:text-2xl">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`GitHub repository for ${project.name}`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label={`Live demo of ${project.name}`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="border border-border bg-secondary text-muted-foreground hover:bg-secondary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
