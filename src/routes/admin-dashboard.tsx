import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { Panel, tooltipStyle } from "@/routes/student-dashboard";
import { Badge } from "@/components/ui/badge";
import { adminStats, departmentPerformance, gradeDistribution } from "@/lib/mock-data";

export const Route = createFileRoute("/admin-dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Console | ScholarMetrics" },
      {
        name: "description",
        content: "Institution-wide KPIs, department benchmarking and grade distribution for administrators.",
      },
      { property: "og:title", content: "Admin Console | ScholarMetrics" },
      { property: "og:description", content: "Institutional analytics and departmental performance benchmarking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminDashboard,
});

const chartColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

const audit = [
  { actor: "Dr. R. Menon", action: "Published CS601 internal marks", time: "12 min ago" },
  { actor: "System", action: "Nightly analytics refresh completed", time: "6 hours ago" },
  { actor: "Prof. K. Iyer", action: "Corrected attendance for STU-0131", time: "Yesterday" },
  { actor: "Registrar", action: "Approved Semester 6 result freeze", time: "2 days ago" },
];

function AdminDashboard() {
  return (
    <DashboardShell title="Administration console" subtitle="Institution-wide academic operations · AY 2025–26">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} hint={s.delta} />
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Panel title="Department benchmarking" subtitle="Average CGPA and pass percentage">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentPerformance} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="dept" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="pass" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avg" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Grade distribution" subtitle="Percentage of all results">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {gradeDistribution.map((entry, i) => (
                  <Cell key={entry.name} fill={chartColors[i % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-wrap gap-2">
            {gradeDistribution.map((g, i) => (
              <span key={g.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: chartColors[i % chartColors.length] }}
                />
                {g.name} · {g.value}%
              </span>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Recent activity" subtitle="Audit log of academic transactions">
          <ul className="grid gap-3">
            {audit.map((a) => (
              <li
                key={a.action}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.actor}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {a.time}
                </Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </DashboardShell>
  );
}
