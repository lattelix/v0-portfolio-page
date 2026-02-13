"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Send } from "lucide-react";

const socials = [
  {
    label: "Telegram",
    href: "https://t.me",
    icon: <Send className="h-5 w-5" />,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: <Github className="h-5 w-5" />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin className="h-5 w-5" />,
  },
];

export function ContactFooter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contact" ref={ref} className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Status badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground">
              Available for new opportunities
            </span>
          </div>

          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Let&apos;s Build Something{" "}
            <span className="text-primary">Together</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Have a project in mind or looking for a frontend developer? I&apos;d love
            to hear from you.
          </p>

          {/* Social links */}
          <div className="mt-8 flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Email CTA */}
          <a
            href="mailto:hello@lattelix.dev"
            className="mt-8 font-mono text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            hello@lattelix.dev
          </a>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            {"<Lattelix /> — " + new Date().getFullYear()}
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
