import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  BarChart3,
  Bot,
  UserRound,
  Users,
  ShieldCheck,
  Home,
} from "lucide-react";

const nav = [
  { to: "/student-dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/marks", label: "Marks", icon: BookOpen },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/ai-chat", label: "AI Mentor", icon: Bot },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

const roleNav = [
  { to: "/faculty-dashboard", label: "Faculty", icon: Users },
  { to: "/admin-dashboard", label: "Admin", icon: ShieldCheck },
] as const;

export function DashboardShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 text-sidebar-foreground lg:sticky lg:top-0 lg:flex lg:h-screen">
        <Link to="/" className="mb-8 flex items-center gap-2.5 px-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground font-display text-sm font-bold">
            SM
          </span>
          <span className="font-display text-sm font-bold text-sidebar-accent-foreground">
            ScholarMetrics
          </span>
        </Link>

        <SideGroup label="Student" items={nav} />
        <div className="mt-6">
          <SideGroup label="Consoles" items={roleNav} />
        </div>

        <Link
          to="/"
          className="mt-auto flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Home className="h-4 w-4 shrink-0" />
          Back to site
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 px-5 py-4 backdrop-blur-xl">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold sm:text-xl">{title}</h1>
              <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
            </div>
            {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-card px-4 py-2 lg:hidden">
          {[...nav, ...roleNav].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground [&.active]:bg-secondary [&.active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-7">{children}</main>
      </div>
    </div>
  );
}

function SideGroup({
  label,
  items,
}: {
  label: string;
  items: readonly { to: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
}) {
  return (
    <div>
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/50">
        {label}
      </p>
      <div className="grid gap-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&.active]:bg-sidebar-accent [&.active]:text-sidebar-accent-foreground"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "accent" | "success" | "warning";
}) {
  const toneClass =
    tone === "accent"
      ? "text-accent"
      : tone === "success"
        ? "text-success"
        : tone === "warning"
          ? "text-warning"
          : "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className={`mt-2 font-display text-2xl font-bold ${toneClass}`}>{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
