import { useReveal } from "@/hooks/useReveal";
import { PRICING } from "@/config/site";
import { Check } from "lucide-react";

const INCLUDED = [
  "1 × Cylix sensor unit",
  "Cylix companion app (iOS & Android)",
  "Priority shipping in launch wave",
  "Founder pricing locked in when announced",
  "Free firmware updates for life",
];

export function ReserveSection({ onReserve }: { onReserve: () => void }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="reserve" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div ref={ref} className="reveal text-center">
          <span className="eyebrow">Pre-order</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Cylix is launching soon.
            <br />
            <span className="text-gradient-gas">Reserve yours.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            We're shipping a limited first wave to Pakistani households and dhabas.
            Reserve now, pay nothing until pricing is announced and your unit ships.
          </p>
        </div>

        <div className="reveal-card relative mt-12 overflow-hidden rounded-3xl ring-gradient-gas p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "var(--gradient-gas-soft)" }}
          />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--gas-green)", boxShadow: "0 0 10px var(--gas-green)" }}
                />
                Early access reservation
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold md:text-6xl">
                  {PRICING.DEPOSIT_AMOUNT > 0
                    ? `${PRICING.CURRENCY} ${PRICING.DEPOSIT_AMOUNT}`
                    : "Free to reserve"}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {PRICING.DEPOSIT_AMOUNT > 0
                  ? "Refundable deposit. Counts toward your final purchase."
                  : "Price to be announced, no charge until your unit is confirmed."}
              </p>

              <button
                onClick={onReserve}
                className="btn-brand mt-7 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold"
              >
                Reserve my Cylix
                <span aria-hidden>→</span>
              </button>
            </div>

            <ul className="space-y-3">
              {INCLUDED.map((i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm"
                >
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                    style={{ background: "color-mix(in oklab, var(--gas-green) 18%, transparent)", color: "var(--gas-green)" }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
