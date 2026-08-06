import { Link } from "@tanstack/react-router";
import { GraduationCap, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/analytics", label: "Analytics" },
  { to: "/ai-chat", label: "AI Mentor" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-ink-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[15px] font-bold leading-tight">
              ScholarMetrics
            </span>
            <span className="block truncate text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Analytics Portal
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/student-dashboard">Dashboard</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {open ? (
        <nav className="grid gap-1 border-t border-border px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
