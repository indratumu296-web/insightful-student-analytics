import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

const columns = [
  {
    title: "Portal",
    links: [
      { to: "/student-dashboard", label: "Student dashboard" },
      { to: "/faculty-dashboard", label: "Faculty dashboard" },
      { to: "/admin-dashboard", label: "Admin console" },
    ],
  },
  {
    title: "Modules",
    links: [
      { to: "/marks", label: "Marks & grades" },
      { to: "/attendance", label: "Attendance" },
      { to: "/analytics", label: "Analytics" },
      { to: "/ai-chat", label: "AI mentor" },
    ],
  },
  {
    title: "Institution",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/profile", label: "Profile" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-base font-bold">ScholarMetrics</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-ink-foreground/70">
            A unified student performance analytics portal for academics, attendance, reporting and
            AI-guided mentoring.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-ink-foreground/75 transition-colors hover:text-ink-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-ink-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ScholarMetrics Analytics Portal. All rights reserved.</p>
          <p>Built for academic excellence · v2.4</p>
        </div>
      </div>
    </footer>
  );
}
