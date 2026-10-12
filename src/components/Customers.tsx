import Image from "next/image";
import { customers, customersSection, testimonial } from "@/content/site";
import { Reveal } from "./Reveal";
import { ArrowRight, SectionLabel } from "./ui";

function domainOf(href?: string) {
  if (!href) return "";
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function Wordmark({ name }: { name: string }) {
  return <span className="text-[22px] font-semibold tracking-[-0.03em] sm:text-2xl">{name}</span>;
}

export function Customers() {
  return (
    <section id="customers" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="02">Customers</SectionLabel>
          </div>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            {customersSection.title}
          </h2>
          <p className="mt-5 text-muted">{customersSection.body}</p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line min-[480px]:grid-cols-2 lg:grid-cols-4">
          {customers.map((c, i) => {
            const domain = domainOf(c.href);
            const inner = (
              <div className="group relative flex h-full flex-col items-center justify-center gap-6 bg-bg px-6 py-10 text-center transition-colors duration-500 hover:bg-white/[0.02] sm:py-12">
                <div className="flex h-16 items-center justify-center">
                  {c.logo ? (
                    <Image
                      src={c.logo}
                      alt=""
                      width={160}
                      height={64}
                      className="h-14 w-auto max-w-[140px] rounded-md object-contain opacity-60 grayscale transition-[filter,opacity] duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  ) : (
                    <Wordmark name={c.name} />
                  )}
                </div>
                <div>
                  <p className="text-[15px] font-medium tracking-tight text-fg/85 transition-colors group-hover:text-fg">
                    {c.name}
                  </p>
                  {domain && (
                    <p className="mt-1.5 inline-flex items-center gap-1 font-mono text-[11px] text-muted transition-colors group-hover:text-accent">
                      {domain}
                      <ArrowRight className="h-3 w-3 -rotate-45 opacity-0 transition-opacity group-hover:opacity-100" />
                    </p>
                  )}
                </div>
                <span
                  className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-accent/60 transition-all duration-500 group-hover:w-1/3"
                  aria-hidden="true"
                />
              </div>
            );
            return (
              <Reveal as="li" key={c.name} delay={i * 0.06} className="bg-bg">
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {inner}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1}>
          <figure className="relative mx-auto mt-20 max-w-3xl text-center">
            <svg viewBox="0 0 32 24" className="mx-auto h-6 w-8 text-accent" fill="currentColor" aria-hidden="true">
              <path d="M0 24V14.4C0 6.4 4.3 1.6 12.2 0l1.4 3.4C9 4.8 6.9 7.6 6.6 11.2H12V24H0zm18 0V14.4C18 6.4 22.3 1.6 30.2 0l1.4 3.4C27 4.8 24.9 7.6 24.6 11.2H30V24H18z" />
            </svg>
            <blockquote className="mt-8 text-balance text-xl font-medium leading-snug tracking-[-0.02em] text-fg/90 sm:text-2xl sm:leading-snug">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              {testimonial.logo && (
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.03]">
                  <Image src={testimonial.logo} alt="" width={28} height={28} className="h-6 w-auto object-contain" />
                </span>
              )}
              <span className="text-left">
                <span className="block text-sm font-medium">
                  {testimonial.name || `${testimonial.role}, ${testimonial.company}`}
                </span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {testimonial.name ? `${testimonial.role}, ${testimonial.company}` : "Client"}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
