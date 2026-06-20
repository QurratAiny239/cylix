import { useReveal } from "@/hooks/useReveal";
import { ClipboardCheck, Scale, BellRing, RotateCcw } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Strap it on",
    body: "Clip the Cylix sensor onto any standard LPG cylinder. No plumbing, no gas-line changes, no installer required.",
  },
  {
    icon: Scale,
    title: "It weighs, not guesses",
    body: "A precision load-cell continuously measures the actual weight of remaining gas, accurate to the gram.",
  },
  {
    icon: BellRing,
    title: "Get real-time alerts",
    body: "Live levels and low-gas alerts pushed straight to the Cylix app, well before the burner sputters out.",
  },
  {
    icon: RotateCcw,
    title: "Reorder before empty",
    body: "Set a refill threshold. Cylix nudges you with enough lead time to call your supplier and stay cooking.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Header />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Step key={s.title} index={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Header() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal max-w-2xl">
      <span className="eyebrow">How it works</span>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
        Four steps.{" "}
        <span className="text-muted-foreground">Then you stop worrying about gas.</span>
      </h2>
    </div>
  );
}

function Step({
  icon: Icon,
  title,
  body,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal group relative flex flex-col gap-4 rounded-2xl border border-border bg-surface/70 p-6 transition-colors hover:bg-surface"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold tabular-nums text-muted-foreground">
          0{index + 1}
        </span>
        <span
          className="grid h-10 w-10 place-items-center rounded-xl"
          style={{
            background: "color-mix(in oklab, var(--gas-green) 14%, transparent)",
            border: "1px solid color-mix(in oklab, var(--gas-green) 28%, transparent)",
            color: "var(--gas-green)",
          }}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: "var(--gradient-gas)" }}
      />
    </div>
  );
}
