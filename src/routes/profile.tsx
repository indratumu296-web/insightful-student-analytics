import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Panel } from "@/routes/student-dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { student } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile | ScholarMetrics" },
      {
        name: "description",
        content: "Personal details, academic enrolment information and account settings for the portal.",
      },
      { property: "og:title", content: "Student Profile | ScholarMetrics" },
      { property: "og:description", content: "Manage your enrolment details and portal account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Profile,
});

const fields = [
  { label: "Full name", value: student.name },
  { label: "Roll number", value: student.id },
  { label: "Institutional email", value: student.email },
  { label: "Phone", value: student.phone },
  { label: "Department", value: student.department },
  { label: "Batch", value: student.batch },
  { label: "Guardian", value: student.guardian },
  { label: "Address", value: student.address },
];

function Profile() {
  return (
    <DashboardShell title="Profile" subtitle="Enrolment record and account settings">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-ink font-display text-xl font-bold text-ink-foreground">
              AS
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold">{student.name}</h2>
              <p className="truncate text-sm text-muted-foreground">{student.id}</p>
            </div>
          </div>
          <Separator className="my-5" />
          <dl className="grid gap-3 text-sm">
            <Row label="Semester" value={`Semester ${student.semester}`} />
            <Row label="Section" value={student.section} />
            <Row label="CGPA" value={student.cgpa.toFixed(2)} />
            <Row label="Attendance" value={`${student.attendance}%`} />
            <Row label="Class rank" value={`#${student.rank} of ${student.classSize}`} />
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant="secondary">Active enrolment</Badge>
            <Badge variant="secondary">Hostel resident</Badge>
            <Badge variant="secondary">Scholarship holder</Badge>
          </div>
        </section>

        <Panel title="Personal details" subtitle="Contact the examination cell for corrections">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.label} className="grid gap-2">
                <Label>{f.label}</Label>
                <Input defaultValue={f.value} readOnly />
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <h3 className="text-sm font-bold">Notification preferences</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Attendance shortage alerts and result publication notices are sent to your institutional email.
          </p>
          <Button className="mt-5" variant="outline">
            Request record update
          </Button>
        </Panel>
      </div>
    </DashboardShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
