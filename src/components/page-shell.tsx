import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="surface-hero text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-foreground/75 sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
