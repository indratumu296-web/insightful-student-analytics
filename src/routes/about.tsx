import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Portal | ScholarMetrics" },
      {
        name: "description",
        content:
          "How ScholarMetrics unifies academic records, attendance and analytics for students, faculty and administrators.",
      },
      { property: "og:title", content: "About the Portal | ScholarMetrics" },
      {
        property: "og:description",
        content: "The mission, architecture and modules behind the student performance analytics portal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const timeline = [
  { phase: "Data capture", body: "Faculty record marks and hour-wise attendance through validated entry forms." },
  { phase: "Consolidation", body: "Records normalise into a relational academic schema with credit weighting." },
  { phase: "Analytics", body: "Semester trends, cohort ranking and grade distributions are computed nightly." },
  { phase: "Guidance", body: "The AI mentor turns signals into concrete, subject-level study interventions." },
];

const stack = [
  { label: "Interface", value: "Responsive component-driven UI with role-scoped navigation" },
  { label: "Services", value: "Auth, marks, attendance, reporting and chatbot service layers" },
  { label: "Data", value: "Relational schema for students, faculty, marks and attendance" },
  { label: "Reporting", value: "Power BI datasets, DAX measures and exportable summaries" },
];

function About() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="An academic record system that finally explains itself"
        description="ScholarMetrics was designed for departments drowning in spreadsheets. It replaces scattered registers with one auditable source of truth and makes the numbers legible to everyone who depends on them."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">How the pipeline works</h2>
            <ol className="mt-8 space-y-6">
              {timeline.map((t, i) => (
                <li key={t.phase} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-ink-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold">{t.phase}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold">System composition</h2>
            <dl className="mt-8 grid gap-4">
              {stack.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="mt-1.5 text-sm">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
