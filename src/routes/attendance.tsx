import { createFileRoute } from "@tanstack/react-router";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { Panel, tooltipStyle } from "@/routes/student-dashboard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { attendanceBySubject, attendanceLog, semesterTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance Register | ScholarMetrics" },
      {
        name: "description",
        content: "Subject-wise attendance percentages, shortage alerts and a daily attendance log.",
      },
      { property: "og:title", content: "Attendance Register | ScholarMetrics" },
      { property: "og:description", content: "Track hour-wise attendance and stay above the 75% threshold." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Attendance,
});

function Attendance() {
  const present = attendanceBySubject.reduce((a, s) => a + s.present, 0);
  const total = attendanceBySubject.reduce((a, s) => a + s.total, 0);
  const pct = (present / total) * 100;

  return (
    <DashboardShell title="Attendance register" subtitle="Semester 6 · Updated 5 Aug 2026">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall attendance" value={`${pct.toFixed(1)}%`} hint="Threshold 75%" tone="success" />
        <StatCard label="Hours attended" value={`${present}`} hint={`of ${total} conducted`} />
        <StatCard label="Shortage subjects" value="1" hint="CS605 nearing limit" tone="warning" />
        <StatCard label="Leaves approved" value="3" hint="Medical: 2 · Duty: 1" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Panel title="Subject-wise attendance" subtitle="Percentage of conducted hours">
          <ul className="grid gap-4">
            {attendanceBySubject.map((s) => {
              const p = (s.present / s.total) * 100;
              return (
                <li key={s.subject}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{s.subject}</span>
                    <span className={p < 78 ? "text-destructive" : "text-muted-foreground"}>
                      {p.toFixed(1)}% · {s.present}/{s.total}
                    </span>
                  </div>
                  <Progress value={p} className="mt-2 h-1.5" />
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="Attendance across semesters" subtitle="Historical percentage">
          <ResponsiveContainer width="100%" height={280}>
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
      </div>

      <div className="mt-6">
        <Panel title="Daily log" subtitle="Most recent classes">
          <ul className="grid gap-2.5">
            {attendanceLog.map((l, i) => (
              <li
                key={`${l.date}-${i}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{l.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {l.date} · {l.hours} hour{l.hours > 1 ? "s" : ""}
                  </p>
                </div>
                <Badge
                  className="shrink-0"
                  variant={
                    l.status === "Present" ? "secondary" : l.status === "Late" ? "outline" : "destructive"
                  }
                >
                  {l.status}
                </Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </DashboardShell>
  );
}
