import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { Panel } from "@/routes/student-dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { subjects } from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/marks")({
  head: () => ({
    meta: [
      { title: "Marks & Grades | ScholarMetrics" },
      {
        name: "description",
        content: "Subject-wise internal, external and total marks with credit-weighted grade points.",
      },
      { property: "og:title", content: "Marks & Grades | ScholarMetrics" },
      { property: "og:description", content: "Your semester marks ledger and grade summary." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Marks,
});

const gradePoints: Record<string, number> = { "A+": 10, A: 9, "B+": 8, B: 7, C: 6 };

function Marks() {
  const totalCredits = subjects.reduce((a, s) => a + s.credits, 0);
  const weighted = subjects.reduce((a, s) => a + s.credits * (gradePoints[s.grade] ?? 0), 0);
  const sgpa = weighted / totalCredits;
  const average = subjects.reduce((a, s) => a + s.total, 0) / subjects.length;

  return (
    <DashboardShell
      title="Marks & grades"
      subtitle="Semester 6 · Examination cell verified"
      actions={
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="SGPA" value={sgpa.toFixed(2)} hint="Credit weighted" tone="accent" />
        <StatCard label="Average score" value={average.toFixed(1)} hint="Out of 100" />
        <StatCard label="Credits" value={String(totalCredits)} hint="Registered this semester" />
        <StatCard label="Backlogs" value="0" hint="All subjects cleared" tone="success" />
      </div>

      <div className="mt-6">
        <Panel title="Subject ledger" subtitle="Internal 30 · External 70">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead className="text-right">Cr.</TableHead>
                  <TableHead className="text-right">Int.</TableHead>
                  <TableHead className="text-right">Ext.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((s) => (
                  <TableRow key={s.code}>
                    <TableCell className="font-medium">{s.code}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell className="text-muted-foreground">{s.faculty}</TableCell>
                    <TableCell className="text-right">{s.credits}</TableCell>
                    <TableCell className="text-right">{s.internal}</TableCell>
                    <TableCell className="text-right">{s.external}</TableCell>
                    <TableCell className="text-right font-semibold">{s.total}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={s.total >= 80 ? "default" : "secondary"}>{s.grade}</Badge>
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
