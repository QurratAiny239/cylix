import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Home, UtensilsCrossed, Store } from "lucide-react";

const TABS = [
  {
    key: "home",
    label: "Home use",
    icon: Home,
    headline: "Cook through Sunday lunch without the panic.",
    body: "Strap Cylix to your kitchen cylinder. Get a heads-up two days before it empties so you can call the supplier on your own schedule, not mid-paratha.",
    bullets: [
      "Single-cylinder monitoring",
      "Live level visible to the whole family in-app",
      "Track how long a cylinder lasts your household",
    ],
  },
  {
    key: "dhaba",
    label: "Dhabas & restaurants",
    icon: UtensilsCrossed,
    headline: "Never lose a dinner rush to an empty tank.",
    body: "Heavy commercial burners drain cylinders fast. Cylix monitors each one, alerts the manager, and keeps a running log so suppliers can be scheduled, not chased.",
    bullets: [
      "Multi-cylinder dashboard",
      "Per-cylinder thresholds for manager and chef",
      "Daily usage report for cost control",
    ],
  },
  {
    key: "shops",
    label: "Small businesses",
    icon: Store,
    headline: "Tea stalls, bakeries, food carts, covered.",
    body: "If your livelihood runs on gas, you can't afford to guess. Cylix gives small businesses the same monitoring confidence enterprise kitchens get.",
    bullets: [
      "Affordable single-unit setup",
      "Lightweight Cylix app, works on any phone",
      "Reorder reminder built around your shift",
    ],
  },
];

export function UseCases() {
  const [active, setActive] = useState(TABS[0].key);
  const ref = useReveal<HTMLDivElement>();
  const current = TABS.find((t) => t.key === active)!;

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div ref={ref} className="reveal max-w-2xl">
          <span className="eyebrow">Built for every use case</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Same sensor.{" "}
            <span className="text-muted-foreground">Three jobs to be done.</span>
          </h2>
        </div>

        <div className="mt-10 -mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
          <div className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface/70 p-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--btn-brand-bg)] text-[var(--btn-brand-fg)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={current.key}
          className="mt-10 grid gap-8 rounded-3xl border border-border bg-surface/60 p-8 md:grid-cols-2 md:p-12"
          style={{ animation: "fade-up .55s cubic-bezier(.22,1,.36,1) both" }}
        >
          <div>
            <h3 className="text-2xl font-semibold tracking-tight md:text-4xl">
              {current.headline}
            </h3>
            <p className="mt-4 text-muted-foreground">{current.body}</p>
            <ul className="mt-6 space-y-3">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--gas-green)" }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <UseCaseVisual variant={current.key} />
        </div>
      </div>
    </section>
  );
}

function UseCaseVisual({ variant }: { variant: string }) {
  return (
    <div className="relative grid place-items-center rounded-2xl border border-border bg-background/50 p-8 min-h-[260px]">
      <div className="grid w-full max-w-sm gap-3">
        {(variant === "dhaba" ? [78, 42, 14] : variant === "shops" ? [55, 88] : [62]).map(
          (level, i) => (
            <CylinderRow key={i} index={i + 1} level={level} />
          )
        )}
      </div>
    </div>
  );
}

function CylinderRow({ level, index }: { level: number; index: number }) {
  const color =
    level > 60 ? "#3CB54A" : level > 30 ? "#F2C12E" : level > 12 ? "#F2862E" : "#E84C3D";
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/70 px-4 py-3">
      <span className="font-display text-xs font-semibold tabular-nums text-muted-foreground">
        #{index}
      </span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/5">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
      </div>
      <span className="w-12 text-right font-display text-sm font-semibold tabular-nums">
        {level}%
      </span>
    </div>
  );
}
