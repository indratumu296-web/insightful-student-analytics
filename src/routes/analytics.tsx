import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { Panel, tooltipStyle } from "@/routes/student-dashboard";
import {
  attendanceBySubject,
  departmentPerformance,
  semesterTrend,
  skillRadar,
  subjects,
} from "@/lib/mock-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Performance Analytics | ScholarMetrics" },
      {
        name: "description",
        content: "Correlation of attendance and scores, competency radar and departmental benchmarking analytics.",
      },
      { property: "og:title", content: "Performance Analytics | ScholarMetrics" },
      { property: "og:description", content: "Interactive academic analytics across semesters and departments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  const correlation = subjects.map((s) => {
    const att = attendanceBySubject.find((a) => a.subject === s.code);
    return {
      subject: s.code,
      attendance: att ? Math.round((att.present / att.total) * 100) : 0,
      score: s.total,
      credits: s.credits,
    };
  });

  return (
    <DashboardShell title="Performance analytics" subtitle="Cross-sectional academic intelligence">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Predicted SGPA" value="8.9" hint="Next semester projection" tone="accent" />
        <StatCard label="Improvement rate" value="+14%" hint="Since Semester 1" tone="success" />
        <StatCard label="Consistency index" value="0.82" hint="Score variance normalised" />
        <StatCard label="Weakest area" value="CS605" hint="Cyber Security · 65 marks" tone="warning" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Panel title="GPA and attendance together" subtitle="Semester overlay">
          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={semesterTrend} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="sem" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <YAxis yAxisId="l" domain={[6, 10]} stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis
                yAxisId="r"
                orientation="right"
                domain={[70, 100]}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area
                yAxisId="l"
                type="monotone"
                dataKey="gpa"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                fill="url(#a1)"
              />
              <Area
                yAxisId="r"
                type="monotone"
                dataKey="attendance"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Competency radar" subtitle="Normalised skill scoring">
          <ResponsiveContainer width="100%" height={290}>
            <RadarChart data={skillRadar} outerRadius={100}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
              <Radar
                dataKey="score"
                stroke="var(--color-chart-2)"
                fill="var(--color-chart-2)"
                fillOpacity={0.35}
              />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="Attendance vs score" subtitle="Each point is a subject">
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                type="number"
                dataKey="attendance"
                name="Attendance"
                domain={[70, 100]}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis
                type="number"
                dataKey="score"
                name="Score"
                domain={[50, 100]}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <ZAxis dataKey="credits" range={[60, 200]} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={correlation} fill="var(--color-chart-5)" />
            </ScatterChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Departmental benchmark" subtitle="Average CGPA and pass rate">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentPerformance} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="dept" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="pass" name="Pass %" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avg" name="Avg CGPA" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </DashboardShell>
  );
}
