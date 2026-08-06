import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in | ScholarMetrics Portal" },
      {
        name: "description",
        content: "Sign in to the ScholarMetrics portal as a student, faculty member or administrator.",
      },
      { property: "og:title", content: "Sign in | ScholarMetrics Portal" },
      { property: "og:description", content: "Role-based access to the student performance analytics portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

const roles = [
  { key: "student", label: "Student", icon: GraduationCap, to: "/student-dashboard" },
  { key: "faculty", label: "Faculty", icon: Users, to: "/faculty-dashboard" },
  { key: "admin", label: "Admin", icon: ShieldCheck, to: "/admin-dashboard" },
] as const;

function Login() {
  const [role, setRole] = useState<(typeof roles)[number]>(roles[0]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <div className="surface-hero hidden flex-col justify-between p-12 text-ink-foreground lg:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-base font-bold">ScholarMetrics</span>
        </Link>
        <div>
          <h2 className="max-w-md text-3xl font-bold leading-tight">
            One sign-in for marks, attendance and academic analytics.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-ink-foreground/70">
            Sessions are role-scoped — you only ever see the records your position permits.
          </p>
        </div>
        <p className="text-xs text-ink-foreground/50">© 2026 ScholarMetrics Analytics Portal</p>
      </div>

      <div className="flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold">Sign in to your portal</h1>
          <p className="mt-2 text-sm text-muted-foreground">Choose your role and enter credentials.</p>

          <div className="mt-7 grid grid-cols-3 gap-2 rounded-xl border border-border bg-secondary p-1">
            {roles.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setRole(r)}
                className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2.5 text-xs font-medium transition-colors ${
                  role.key === r.key
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <r.icon className="h-4 w-4" />
                {r.label}
              </button>
            ))}
          </div>

          <form
            className="mt-6 grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const id = String(form.get("id") ?? "").trim();
              const password = String(form.get("password") ?? "");
              if (id.length < 4) return setError("Enter a valid ID (minimum 4 characters).");
              if (password.length < 6) return setError("Password must be at least 6 characters.");
              setError("");
              navigate({ to: role.to });
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="id">{role.label} ID</Label>
              <Input id="id" name="id" placeholder="STU-2026-0143" defaultValue="STU-2026-0143" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" defaultValue="demo1234" />
            </div>
            {error ? <p className="text-xs text-destructive">{error}</p> : null}
            <Button type="submit" size="lg">
              Continue as {role.label.toLowerCase()}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Demo build — any valid-looking credentials open the selected console.
          </p>
        </div>
      </div>
    </div>
  );
}
