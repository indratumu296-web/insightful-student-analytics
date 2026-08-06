import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bot,
  CalendarCheck,
  FileSpreadsheet,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-campus.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScholarMetrics — Student Performance Analytics Portal" },
      {
        name: "description",
        content:
          "Track marks, attendance, CGPA trends and AI-guided insights for students, faculty and administrators in one analytics portal.",
      },
      { property: "og:title", content: "ScholarMetrics — Student Performance Analytics Portal" },
      {
        property: "og:description",
        content:
          "Unified academic analytics: marks, attendance, dashboards, Power BI reporting and an AI mentor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: FileSpreadsheet,
    title: "Marks & grade ledger",
    body: "Internal, external and total scores per subject with credit-weighted GPA computed automatically each semester.",
  },
  {
    icon: CalendarCheck,
    title: "Attendance tracking",
    body: "Hour-wise attendance capture, subject-level percentages and automatic shortage alerts before the deadline.",
  },
  {
    icon: BarChart3,
    title: "Power BI analytics",
    body: "Semester trends, cohort comparisons and grade distributions rendered as interactive institutional dashboards.",
  },
  {
    icon: Bot,
    title: "AI academic mentor",
    body: "A conversational assistant that reads performance signals and suggests focused study interventions.",
  },
  {
    icon: Users,
    title: "Role-based consoles",
    body: "Separate workspaces for students, faculty and administrators with scoped data visibility.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    body: "Token-based sessions, validated inputs and audited records across every academic transaction.",
  },
];

const stats = [
  { value: "4,286", label: "Students tracked" },
  { value: "312", label: "Faculty accounts" },
  { value: "186", label: "Active courses" },
  { value: "99.9%", label: "Portal uptime" },
];

function Index() {
  return (
    <PageShell>
      <section className="surface-hero relative overflow-hidden text-ink-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Academic intelligence platform
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              Every mark, every class, every trend — <span className="text-gradient-accent">in one portal.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/75">
              ScholarMetrics unifies examination records, attendance registers and departmental
              reporting into a single analytics workspace, then layers AI guidance on top so no
              student slips through unnoticed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/student-dashboard">
                  Open dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
              >
                <Link to="/analytics">View analytics</Link>
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-bold text-accent">{s.value}</dt>
                  <dd className="mt-1 text-xs text-ink-foreground/65">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Students reviewing academic performance dashboards in a university analytics lab"
              className="w-full rounded-2xl border border-white/10 object-cover shadow-lift"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Platform modules
          </p>
          <h2 className="mt-3 text-3xl font-bold">Built around how institutions actually work</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-3">
          {[
            {
              role: "Students",
              copy: "Personal GPA trajectory, subject-wise attendance and AI study plans.",
              to: "/student-dashboard" as const,
            },
            {
              role: "Faculty",
              copy: "Class rosters, at-risk flags, marks entry and section-level comparisons.",
              to: "/faculty-dashboard" as const,
            },
            {
              role: "Administrators",
              copy: "Institution-wide KPIs, department benchmarking and compliance reporting.",
              to: "/admin-dashboard" as const,
            },
          ].map((c) => (
            <div key={c.role} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="text-lg font-bold">{c.role}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.copy}</p>
              <Button asChild variant="link" className="mt-4 h-auto p-0">
                <Link to={c.to}>
                  Explore console <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
