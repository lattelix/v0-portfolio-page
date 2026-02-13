"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Database,
  GraduationCap,
  Shield,
} from "lucide-react";

interface ExperienceItem {
  title: string;
  role: string;
  highlight: string;
  description: string;
  icon: React.ReactNode;
  span: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Royal House",
    role: "Frontend Developer",
    highlight: "-40% Loading Time",
    description:
      "Optimized web performance achieving a 40% reduction in page load times through code splitting, lazy loading, and advanced caching strategies.",
    icon: <Building2 className="h-5 w-5" />,
    span: "md:col-span-2",
  },
  {
    title: "Kelsoft",
    role: "Full-Stack Developer",
    highlight: "Big Data & TypeScript",
    description:
      "Worked with large-scale datasets and built robust TypeScript applications for data visualization and real-time analytics dashboards.",
    icon: <Database className="h-5 w-5" />,
    span: "md:col-span-1",
  },
  {
    title: "School 21",
    role: "Software Engineering Student",
    highlight: "C/C++ & Algorithms",
    description:
      "Intensive peer-to-peer learning program focused on low-level programming, data structures, and algorithmic problem solving.",
    icon: <GraduationCap className="h-5 w-5" />,
    span: "md:col-span-1",
  },
  {
    title: "Army (VCS)",
    role: "Military Service",
    highlight: "Discipline & Communication",
    description:
      "Developed strong leadership, discipline, and team communication skills under high-pressure environments.",
    icon: <Shield className="h-5 w-5" />,
    span: "md:col-span-2",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function BentoExperience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-sm text-primary">{"// Experience"}</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Where I&apos;ve Worked
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A journey through impactful roles that shaped my engineering mindset.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 ${exp.span}`}
            >
              {/* Subtle glow on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -inset-1 bg-primary/5 blur-xl" />
              </div>

              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.title}</h3>
                      <p className="text-xs text-muted-foreground">{exp.role}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                    {exp.highlight}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
