import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { Panel, tooltipStyle } from "@/routes/student-dashboard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { facultyRoster } from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/faculty-dashboard")({
  head: () => ({
    meta: [
      { title: "Faculty Dashboard | ScholarMetrics" },
      {
        name: "description",
        content: "Class roster, at-risk student flags and section-level performance comparison for faculty.",
      },
      { property: "og:title", content: "Faculty Dashboard | ScholarMetrics" },
      { property: "og:description", content: "Monitor sections, flag at-risk students and review marks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FacultyDashboard,
});

const sectionAverages = [
  { section: "A", cgpa: 7.4, attendance: 82 },
  { section: "B", cgpa: 8.5, attendance: 91 },
  { section: "C", cgpa: 6.8, attendance: 74 },
];

function FacultyDashboard() {
  const [query, setQuery] = useState("");
  const rows = facultyRoster.filter((r) =>
    `${r.name} ${r.id} ${r.section}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <DashboardShell
      title="Faculty console"
      subtitle="Dr. R. Menon · Computer Science & Engineering · 3 sections"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Students taught" value="128" hint="Across sections A–C" />
        <StatCard label="Average CGPA" value="7.57" hint="+0.12 this term" tone="accent" />
        <StatCard label="At-risk students" value="2" hint="Attendance below 75%" tone="warning" />
        <StatCard label="Marks pending" value="14" hint="CS603 internal II" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <Panel title="Section comparison" subtitle="Average CGPA and attendance">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sectionAverages} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="section" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="attendance" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cgpa" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel
          title="Class roster"
          subtitle="Live academic standing"
          action={
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students…"
              className="h-8 w-40 text-xs"
            />
          }
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Sec</TableHead>
                  <TableHead className="text-right">CGPA</TableHead>
                  <TableHead className="text-right">Att.</TableHead>
                  <TableHead className="text-right">Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <span className="block text-sm font-medium">{r.name}</span>
                      <span className="text-xs text-muted-foreground">{r.id}</span>
                    </TableCell>
                    <TableCell>{r.section}</TableCell>
                    <TableCell className="text-right">{r.cgpa.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{r.attendance}%</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          r.risk === "High" ? "destructive" : r.risk === "Medium" ? "outline" : "secondary"
                        }
                      >
                        {r.risk}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>
      </div>
    </DashboardShell>
  );
}
