import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { student, semesterTrend, subjects, attendanceBySubject } from "@/lib/mock-data";

export const Route = createFileRoute("/student-dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard | ScholarMetrics" },
      {
        name: "description",
        content: "Personal CGPA trend, attendance percentage, subject scores and class rank at a glance.",
      },
      { property: "og:title", content: "Student Dashboard | ScholarMetrics" },
      { property: "og:description", content: "Your semester performance overview in the analytics portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentDashboard,
});

function StudentDashboard() {
  return (
    <DashboardShell
      title={`Welcome back, ${student.name.split(" ")[0]}`}
      subtitle={`${student.id} · Semester ${student.semester} · Section ${student.section}`}
      actions={
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4" />
          Report card
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current CGPA" value={student.cgpa.toFixed(2)} hint="+0.14 vs last semester" tone="accent" />
        <StatCard label="Attendance" value={`${student.attendance}%`} hint="Threshold 75%" tone="success" />
        <StatCard label="Class rank" value={`#${student.rank}`} hint={`of ${student.classSize} students`} />
        <StatCard label="Credits earned" value="142" hint="of 160 required" tone="warning" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="GPA trajectory" subtitle="Semester-wise grade point average">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={semesterTrend} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="gpaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="sem" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <YAxis domain={[6, 10]} stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="gpa"
                stroke="var(--color-chart-2)"
                strokeWidth={2.5}
                fill="url(#gpaFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Attendance vs classes" subtitle="Current semester, per subject">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={attendanceBySubject} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="subject" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="total" fill="var(--color-muted)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="present" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="Attendance trend" subtitle="Percentage across semesters">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={semesterTrend} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="sem" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <YAxis domain={[70, 100]} stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="var(--color-chart-3)"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel
          title="Subject standing"
          subtitle="Total marks out of 100"
          action={
            <Button asChild size="sm" variant="ghost">
              <Link to="/marks">Full ledger</Link>
            </Button>
          }
        >
          <ul className="grid gap-4">
            {subjects.map((s) => (
              <li key={s.code}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate font-medium">
                    {s.code} · {s.name}
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-muted-foreground">
                    {s.total}
                    <Badge variant="secondary">{s.grade}</Badge>
                  </span>
                </div>
                <Progress value={s.total} className="mt-2 h-1.5" />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </DashboardShell>
  );
}

export const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: "10px",
  fontSize: "12px",
  color: "var(--color-card-foreground)",
};

export function Panel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-bold">{title}</h2>
          {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
