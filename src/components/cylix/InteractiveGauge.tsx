import { useState } from "react";
import { GaugeRing } from "./GaugeRing";
import { useReveal } from "@/hooks/useReveal";

export function InteractiveGauge() {
  const [v, setV] = useState(72);
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="gauge" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          ref={ref}
          className="reveal grid gap-12 rounded-3xl border border-border bg-surface/60 p-8 md:grid-cols-2 md:p-16"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top right, rgba(242,134,46,.10), transparent 60%)",
          }}
        >
          <div className="flex flex-col justify-center">
            <span className="eyebrow">The gauge</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              This is what peace of mind looks like.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Drag to simulate gas levels. Green is plenty. Yellow is plan-ahead. Orange
              is order-now. Red is the moment you'd otherwise discover with cold dough on
              the tawa.
            </p>

            <div className="mt-8 max-w-md">
              <input
                type="range"
                min={0}
                max={100}
                value={v}
                onChange={(e) => setV(Number(e.target.value))}
                aria-label="Simulate gas level"
                className="cylix-range w-full"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Empty</span>
                <span>Full</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-2 text-xs">
              {[
                { l: "Plenty", c: "#3CB54A", r: ">60%" },
                { l: "Plan", c: "#F2C12E", r: "30–60%" },
                { l: "Low", c: "#F2862E", r: "12–30%" },
                { l: "Refill", c: "#E84C3D", r: "<12%" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-lg border border-border bg-background/50 p-3"
                >
                  <div
                    className="h-1.5 w-full rounded-full"
                    style={{ background: s.c }}
                  />
                  <div className="mt-2 font-medium text-foreground">{s.l}</div>
                  <div className="text-muted-foreground">{s.r}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid place-items-center">
            <div className="aspect-square w-full max-w-[300px] sm:max-w-[360px] [&_svg]:!h-full [&_svg]:!w-full [&>div]:!h-full [&>div]:!w-full">
              <GaugeRing value={v} size={360} animated />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cylix-range {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 999px;
          background: var(--gradient-gas);
          outline: none;
        }
        .cylix-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px; height: 22px; border-radius: 999px;
          background: #fff;
          border: 3px solid #0B0E0C;
          box-shadow: 0 4px 14px rgba(0,0,0,.4), 0 0 0 4px rgba(255,255,255,.06);
          cursor: grab;
        }
        .cylix-range::-moz-range-thumb {
          width: 22px; height: 22px; border-radius: 999px;
          background: #fff;
          border: 3px solid #0B0E0C;
          box-shadow: 0 4px 14px rgba(0,0,0,.4);
          cursor: grab;
        }
      `}</style>
    </section>
  );
}
