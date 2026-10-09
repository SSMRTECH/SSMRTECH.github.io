"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./ui";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" aria-label="SSMR Tech, back to top" onClick={close}>
          <Logo />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="group ml-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-accent/10"
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Let&apos;s Talk
          </a>
        </div>

        <button
          type="button"
          className="relative -mr-2 flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
          />
          <span
            className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-line px-5 pb-10 pt-6 md:hidden"
      >
        <ul className="flex flex-col">
          {nav.map((item, i) => (
            <li key={item.href} className="border-b border-line">
              <a
                href={item.href}
                onClick={close}
                className="flex items-baseline justify-between py-5 text-2xl font-medium tracking-tight"
              >
                {item.label}
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={close}
          className="mt-8 flex items-center justify-center gap-2 rounded-full bg-fg py-3.5 text-sm font-medium text-bg"
        >
          Let&apos;s Talk
        </a>
      </div>
    </header>
  );
}
