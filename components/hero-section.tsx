"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
      {/* Background mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <div className="flex flex-col justify-center">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground">
              Available for hire
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Building{" "}
            <span className="text-primary">High-Performance</span>{" "}
            Interfaces with Next.js
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            4+ years of experience in SPA optimization and clean UX. Passionate
            about crafting fast, accessible, and elegant web experiences.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex items-center justify-center lg:mx-0"
        >
          <div className="relative h-80 w-80 overflow-hidden rounded-2xl border border-border/50 md:h-96 md:w-96 lg:h-[28rem] lg:w-[28rem]">
            <Image
              src="/images/portrait.jpg"
              alt="Lattelix - Frontend Developer"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5" />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm" />
          <div className="absolute -left-4 -top-4 h-16 w-16 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm" />
        </motion.div>
      </div>
    </section>
  );
}
