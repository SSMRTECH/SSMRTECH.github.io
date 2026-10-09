import { CONTACT_EMAIL, nav, site } from "@/content/site";
import { Logo } from "./ui";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted">{site.tagline}</p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-fg/80 transition-colors hover:text-accent">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30 sm:px-8">
          © <Year /> {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
