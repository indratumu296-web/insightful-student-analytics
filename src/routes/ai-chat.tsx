import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Send, UserRound } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/ai-chat")({
  head: () => ({
    meta: [
      { title: "AI Academic Mentor | ScholarMetrics" },
      {
        name: "description",
        content: "Ask the AI mentor about your marks, attendance risks and personalised study strategies.",
      },
      { property: "og:title", content: "AI Academic Mentor | ScholarMetrics" },
      { property: "og:description", content: "Conversational guidance built on your academic performance data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AiChat,
});

type Msg = { role: "user" | "assistant"; content: string };

const seed: Msg[] = [
  {
    role: "assistant",
    content:
      "Hello Ananya. I've reviewed Semester 6. Machine Learning (90) and Project Work (93) are your strongest subjects, while Cyber Security sits at 65 with 82.5% attendance — the lowest of your registered courses. Where would you like to start?",
  },
];

const suggestions = [
  "Why is my Cyber Security score low?",
  "How do I reach a 9.0 CGPA?",
  "Am I at risk of attendance shortage?",
  "Summarise my semester in three points.",
];

const replies: Record<string, string> = {
  cyber:
    "CS605 lost most marks in internal assessment II (21/30). Your attendance in that subject is 82.5%, and missed sessions align with the cryptography module. Reworking those three topics before the revision test should lift the total by 8–12 marks.",
  cgpa: "You need an SGPA of roughly 9.4 across the next two semesters to reach a 9.0 CGPA. That means converting your two B-grade subjects into A grades while holding current performance — realistic given your +0.14 trend per semester.",
  attendance:
    "You are safe overall at 91.4%, comfortably above the 75% threshold. Only CS605 (82.5%) is trending downwards; missing four more hours there would put you into the shortage bracket.",
  default:
    "Based on your record: CGPA 8.74, attendance 91.4%, rank 7 of 128. Your consistency index is strong, and the single lever with the largest effect is improving internal assessment performance in Cyber Security and Data Warehousing.",
};

function answerFor(q: string) {
  const t = q.toLowerCase();
  if (t.includes("cyber") || t.includes("low")) return replies["cyber"]!;
  if (t.includes("9.0") || t.includes("cgpa")) return replies["cgpa"]!;
  if (t.includes("attendance") || t.includes("shortage")) return replies["attendance"]!;
  return replies["default"]!;
}

function AiChat() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  function send(text: string) {
    const q = text.trim();
    if (!q || thinking) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: answerFor(q) }]);
      setThinking(false);
    }, 650);
  }

  return (
    <DashboardShell title="AI academic mentor" subtitle="Guidance grounded in your performance records">
      <div className="rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-ink-foreground">
            <Bot className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">ScholarMetrics Mentor</p>
            <p className="truncate text-xs text-muted-foreground">Reading Semester 6 records</p>
          </div>
        </div>

        <div className="grid gap-6 px-5 py-6">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex gap-3"}>
              {m.role === "assistant" ? (
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                  <Bot className="h-3.5 w-3.5" />
                </span>
              ) : null}
              <div
                className={
                  m.role === "user"
                    ? "flex max-w-[85%] items-start gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                    : "max-w-[85%] text-sm leading-relaxed"
                }
              >
                {m.role === "user" ? <UserRound className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : null}
                <p>{m.content}</p>
              </div>
            </div>
          ))}
          {thinking ? (
            <p className="animate-pulse text-sm text-muted-foreground">Analysing your records…</p>
          ) : null}
        </div>

        <div className="border-t border-border px-5 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder="Ask about your marks, attendance or study plan…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            <Button type="submit" size="icon" disabled={thinking} aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
