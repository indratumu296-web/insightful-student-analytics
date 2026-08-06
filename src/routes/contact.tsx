import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Support | ScholarMetrics" },
      {
        name: "description",
        content:
          "Reach the ScholarMetrics academic support desk for portal access, marks corrections or attendance queries.",
      },
      { property: "og:title", content: "Contact Support | ScholarMetrics" },
      {
        property: "og:description",
        content: "Support desk contacts and enquiry form for the student performance analytics portal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const details = [
  { icon: Mail, label: "Email", value: "support@scholarmetrics.edu" },
  { icon: Phone, label: "Helpdesk", value: "+91 80 4512 8890" },
  { icon: MapPin, label: "Office", value: "Examination Cell, Block C, Campus Road, Bengaluru" },
];

function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the academic support desk"
        description="Portal access issues, marks discrepancies and attendance corrections are handled by the examination cell within two working days."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid content-start gap-4">
          {details.map((d) => (
            <div key={d.label} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-soft">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                <d.icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {d.label}
                </p>
                <p className="mt-1 text-sm">{d.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          className="rounded-2xl border border-border bg-card p-7 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            setTimeout(() => {
              setSending(false);
              toast.success("Enquiry submitted", {
                description: "Ticket raised with the examination cell.",
              });
              (e.target as HTMLFormElement).reset();
            }, 700);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required placeholder="Ananya Sharma" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="roll">Roll number</Label>
              <Input id="roll" required placeholder="STU-2026-0143" />
            </div>
          </div>
          <div className="mt-5 grid gap-2">
            <Label htmlFor="email">Institutional email</Label>
            <Input id="email" type="email" required placeholder="you@university.edu" />
          </div>
          <div className="mt-5 grid gap-2">
            <Label htmlFor="message">How can we help?</Label>
            <Textarea id="message" required rows={5} placeholder="Describe your query in detail…" />
          </div>
          <Button type="submit" className="mt-6" disabled={sending}>
            {sending ? "Submitting…" : "Submit enquiry"}
          </Button>
        </form>
      </section>
    </PageShell>
  );
}
