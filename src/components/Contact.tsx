import { CONTACT_EMAIL, contact } from "@/content/site";
import { Reveal } from "./Reveal";
import { ArrowRight, SectionLabel } from "./ui";

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line py-28 sm:py-40">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[110px]"
        aria-hidden="true"
      />
      {/* Concentric gateway rings echoing the hero */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 opacity-60"
        viewBox="0 0 680 680"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="340" cy="340" r="335" stroke="rgba(255,255,255,0.05)" />
        <circle cx="340" cy="340" r="250" stroke="rgba(255,255,255,0.06)" />
        <circle cx="340" cy="340" r="165" stroke="rgba(94,234,212,0.12)" strokeDasharray="2 8" />
      </svg>

      <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <div className="flex justify-center">
          <SectionLabel index="04">Contact</SectionLabel>
        </div>
        <h2 className="text-gradient mt-6 text-[clamp(2.5rem,6.5vw,4.75rem)] font-semibold leading-[1] tracking-[-0.045em]">
          {contact.title}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted">{contact.body}</p>
        <div className="mt-10 flex flex-col items-center gap-5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-7 py-4 text-sm font-medium text-bg transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_50px_-10px_rgba(94,234,212,0.6)]"
          >
            {contact.cta}
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
