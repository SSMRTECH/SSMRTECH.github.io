import type { ReactNode } from "react";
import type { ServiceIcon } from "@/content/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        <circle cx="20" cy="12" r="1.3" fill="var(--accent)" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight">
        SSMR<span className="font-normal text-muted"> Tech</span>
      </span>
    </span>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-line" aria-hidden="true" />
      {children}
    </p>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`h-4 w-4 ${className}`} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const iconPaths: Record<ServiceIcon, ReactNode> = {
  // Device with radiating signal
  iot: (
    <>
      <rect x="9" y="13" width="14" height="14" rx="3" />
      <circle cx="16" cy="20" r="2" />
      <path d="M11.5 8.5a6.5 6.5 0 0 1 9 0M8.5 5.5a11 11 0 0 1 15 0" />
    </>
  ),
  // Articulated arm
  robotics: (
    <>
      <path d="M6 27h12" />
      <path d="M12 27v-5l6-8 7 3" />
      <circle cx="12" cy="22" r="1.6" />
      <circle cx="18" cy="14" r="1.6" />
      <path d="M25 17l2.5-2M25 17l2.5 2" />
    </>
  ),
  // Bluetooth rune with waves
  ble: (
    <>
      <path d="M11 11l10 9-5 4.5V7.5l5 4.5-10 9" />
      <path d="M24.5 13a5 5 0 0 1 0 6M27 10.5a9 9 0 0 1 0 11" />
    </>
  ),
  // Chip
  custom: (
    <>
      <rect x="9" y="9" width="14" height="14" rx="2.5" />
      <rect x="13" y="13" width="6" height="6" rx="1" />
      <path d="M13 5v4M19 5v4M13 23v4M19 23v4M5 13h4M5 19h4M23 13h4M23 19h4" />
    </>
  ),
};

export function ServiceGlyph({ name }: { name: ServiceIcon }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}
