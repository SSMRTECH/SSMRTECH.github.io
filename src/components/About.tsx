import { about } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

export function About() {
  return (
    <section id="about" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <SectionLabel index="03">About</SectionLabel>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            {about.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 md:pt-10">
          <p className="text-lg leading-relaxed text-fg/80 sm:text-xl sm:leading-relaxed">{about.body}</p>
          <ul className="mt-10 flex flex-wrap items-center gap-3">
            {about.pillars.map((p, i) => (
              <li key={p} className="flex items-center gap-3">
                <span className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {p}
                </span>
                {i < about.pillars.length - 1 && (
                  <span className="h-px w-6 bg-gradient-to-r from-white/20 to-accent/50" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
