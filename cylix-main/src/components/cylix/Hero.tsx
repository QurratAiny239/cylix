import { GaugeRing } from "./GaugeRing";
import { useReveal } from "@/hooks/useReveal";

export function Hero({ onReserve }: { onReserve: () => void }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      {/* Ambient backdrop */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-40 h-[640px] opacity-60 grid-bg"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 h-[420px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "var(--gradient-gas-soft)", opacity: 0.55 }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 md:grid-cols-12 md:gap-8 md:px-8 md:pb-32">
        <div ref={ref} className="reveal md:col-span-7">
          <span className="eyebrow inline-flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--gas-green)", boxShadow: "0 0 12px var(--gas-green)" }}
            />
            Pre-launch · Built in Pakistan
          </span>

          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Never run out of gas
            <br />
            <span className="italic font-light text-muted-foreground">
              without warning.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Cylix straps onto your existing LPG cylinder and gives you an
            accurate, real-time reading of exactly how much gas is left. No
            more cooking-time surprises, no more shaking the tank to guess.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onReserve}
              className="btn-brand group inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold"
            >
              Reserve yours
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <a
              href="#how"
              className="btn-ghost inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium"
            >
              See how it works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <Trust label="Built for Pakistani homes" />
            <Trust label="Works with 11kg & 15kg cylinders" />
            <Trust label="Gram-accurate readings" />
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative md:col-span-5">
          <div
            className="relative mx-auto aspect-square w-full max-w-[320px] animate-float sm:max-w-[400px] md:max-w-[460px]"
            aria-hidden
          >
            <div
              className="absolute inset-4 rounded-[2rem] border border-border bg-surface/60 sm:inset-6 sm:rounded-[2.5rem]"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,.05), 0 60px 80px -40px rgba(0,0,0,.7)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center p-6">
              <div className="aspect-square w-[78%] max-w-[340px]">
                <div className="grid h-full w-full place-items-center [&>div]:!h-full [&>div]:!w-full [&_svg]:!h-full [&_svg]:!w-full">
                  <GaugeRing auto size={340} animated />
                </div>
              </div>
            </div>
            {/* Floating chips */}
            <FloatingChip
              text="14h to refill"
              className="left-2 top-6"
              dot="var(--gas-green)"
            />
            <FloatingChip
              text="Low gas, plan refill"
              className="right-2 bottom-12"
              dot="var(--gas-orange)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="h-1 w-1 rounded-full"
        style={{ background: "var(--muted-foreground)" }}
      />
      {label}
    </span>
  );
}

function FloatingChip({
  text,
  className = "",
  dot,
}: {
  text: string;
  className?: string;
  dot: string;
}) {
  return (
    <div
      className={`absolute hidden items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur md:inline-flex ${className}`}
      style={{ boxShadow: "0 12px 30px -12px rgba(0,0,0,.6)" }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: dot, boxShadow: `0 0 10px ${dot}` }}
      />
      {text}
    </div>
  );
}
