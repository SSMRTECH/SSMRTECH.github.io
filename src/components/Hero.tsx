"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/content/site";
import { GatewayCanvas } from "./GatewayCanvas";
import { ArrowRight } from "./ui";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

// The last word of the headline gets the accent color.
const titleWords = hero.title[1].split(" ");
const titleLast = titleWords.pop();
const titleLead = titleWords.join(" ");

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section id="top" className="relative isolate overflow-hidden pt-16">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-20%] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 pb-16 pt-14 sm:px-8 md:pt-20 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.2fr_1fr] lg:gap-4 lg:pb-24 lg:pt-10">
        <div className="relative z-10">
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="mt-7 text-[clamp(2.6rem,5.6vw,4.6rem)] font-semibold leading-[1] tracking-[-0.045em]"
          >
            <span className="text-gradient block">{hero.title[0]}</span>
            <span className="block">
              <span className="text-gradient">{titleLead} </span>
              <span className="text-accent">{titleLast}</span>
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.18)}
            className="mt-7 max-w-[30rem] text-base leading-relaxed text-muted sm:text-lg"
          >
            {hero.body}
          </motion.p>

          <motion.div {...rise(0.26)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={hero.primary.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgba(94,234,212,0.55)]"
            >
              {hero.primary.label}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href={hero.secondary.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-white/30 hover:bg-white/[0.04]"
            >
              {hero.secondary.label}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease }}
          className="relative -mx-5 aspect-[5/4] sm:mx-0 lg:aspect-square"
        >
          <GatewayCanvas className="[mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_55%,transparent_100%)]" />
          <div className="pointer-events-none absolute inset-x-[6%] bottom-[4%] flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
            <span>Devices</span>
            <span className="text-accent/80">Gateway</span>
            <span>Cloud</span>
          </div>
        </motion.div>
      </div>

      {/* Lifecycle strip: concept to deployment */}
      <div className="border-y border-line">
        <ol className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:px-8">
          {hero.stages.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className="text-white/25">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
