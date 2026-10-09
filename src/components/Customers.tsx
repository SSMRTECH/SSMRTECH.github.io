import Image from "next/image";
import { customers, customersSection } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

function Wordmark({ name }: { name: string }) {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const tld = dot > 0 ? name.slice(dot) : "";
  return (
    <span className="text-[22px] font-semibold tracking-[-0.03em] sm:text-2xl">
      {base}
      <span className="font-normal text-white/35">{tld}</span>
    </span>
  );
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

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {customers.map((c, i) => {
            const mark = c.logo ? (
              <Image src={c.logo} alt={c.name} width={160} height={48} className="h-10 w-auto object-contain" />
            ) : (
              <Wordmark name={c.name} />
            );
            const inner = (
              <div className="group relative flex h-36 items-center justify-center bg-bg px-6 text-white/55 grayscale transition-colors duration-500 hover:bg-white/[0.015] hover:text-fg hover:grayscale-0 sm:h-44">
                {mark}
                <span
                  className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-accent/60 transition-all duration-500 group-hover:w-1/3"
                  aria-hidden="true"
                />
              </div>
            );
            return (
              <Reveal as="li" key={c.name} delay={i * 0.08}>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={c.name}>
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
