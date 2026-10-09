"use client";

import type { PointerEvent } from "react";
import { services } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionLabel, ServiceGlyph } from "./ui";

function trackPointer(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionLabel index="01">What we do</SectionLabel>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              From sensor to cloud, <span className="text-muted">engineered end to end.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted md:text-right">
              Hardware, firmware, connectivity and software, designed as one system.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className="bg-bg">
              <article
                onPointerMove={trackPointer}
                className="group relative flex h-full flex-col p-7 sm:p-9"
              >
                <div
                  className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-fg/80 transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                    <ServiceGlyph name={s.icon} />
                  </span>
                  <span className="font-mono text-xs text-white/25">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="pt-14 text-xl font-medium tracking-tight">{s.title}</h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">{s.body}</p>
                <span
                  className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent/70 to-transparent transition-transform duration-500 group-hover:scale-x-100 sm:inset-x-9"
                  aria-hidden="true"
                />
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
