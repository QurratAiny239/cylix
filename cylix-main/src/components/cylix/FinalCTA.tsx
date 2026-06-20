export function FinalCTA({ onReserve }: { onReserve: () => void }) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-10 md:p-20"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--gas-green) 22%, var(--surface)) 0%, var(--surface) 70%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full blur-3xl"
            style={{ background: "var(--gradient-gas-soft)", opacity: 0.5 }}
          />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Be among the first
              <br />
              to never run out
              <br />
              of gas again.
            </h2>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <p className="max-w-md text-sm text-muted-foreground md:text-right">
                Limited first-wave units. Reserve free, lock in founder pricing, and
                we'll keep you posted as we get closer to ship.
              </p>
              <button
                onClick={onReserve}
                className="btn-brand inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold"
              >
                Reserve yours
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
