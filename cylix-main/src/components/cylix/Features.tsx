import { useReveal } from "@/hooks/useReveal";
import {
  Activity,
  BellRing,
  Cylinder,
  BatteryCharging,
  LineChart,
  ChefHat,
} from "lucide-react";

const FEATURES = [
  {
    icon: Activity,
    title: "Real weight, real time",
    body: "Continuous gram-accurate readings, not estimates from pressure or temperature.",
  },
  {
    icon: BellRing,
    title: "Smart in-app alerts",
    body: "Live levels and low-gas warnings pushed to the Cylix app, set your own refill threshold.",
  },
  {
    icon: Cylinder,
    title: "Any standard cylinder",
    body: "Works with the 11.8kg and 15kg cylinders Pakistani homes already use. No special tank.",
  },
  {
    icon: BatteryCharging,
    title: "Months on a charge",
    body: "A low-power sensor that sips battery, so you set it once and forget it.",
  },
  {
    icon: LineChart,
    title: "Usage history",
    body: "See how fast you burn through a cylinder, useful for budgeting and dhaba operators.",
  },
  {
    icon: ChefHat,
    title: "Multi-burner ready",
    body: "Designed for both home kitchens and commercial dhaba setups with heavy daily load.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--gradient-gas)", opacity: 0.4 }}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Head />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Card key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Head() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <span className="eyebrow">Why Cylix</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          A small box that saves the meal.
        </h2>
      </div>
      <p className="max-w-md text-sm text-muted-foreground">
        Built for Pakistani kitchens, hardened for dhabas. No gimmicks, just an honest
        signal you can plan around.
      </p>
    </div>
  );
}

function Card({
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
      className="reveal group relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-6 transition-all hover:-translate-y-0.5 hover:bg-surface"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-60"
        style={{ background: "var(--gradient-gas)" }}
      />
      <span
        className="grid h-10 w-10 place-items-center rounded-xl text-foreground"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
