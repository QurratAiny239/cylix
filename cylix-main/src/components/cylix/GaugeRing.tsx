import { useEffect, useState } from "react";

/**
 * Animated full circular gauge with the brand's gas-gradient.
 * Shows percentage and a state label. Auto-animates if `auto` is true.
 */
export function GaugeRing({
  value,
  size = 280,
  animated = false,
  auto = false,
  thickness = 14,
}: {
  value?: number;
  size?: number;
  animated?: boolean;
  auto?: boolean;
  thickness?: number;
}) {
  const [v, setV] = useState(value ?? 92);

  useEffect(() => {
    if (typeof value === "number") setV(value);
  }, [value]);

  useEffect(() => {
    if (!auto) return;
    let cancelled = false;
    let cur = 96;
    const tick = () => {
      if (cancelled) return;
      cur -= 0.45;
      if (cur < 6) cur = 96;
      setV(cur);
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [auto]);

  const segments = 56;
  const cx = 100;
  const cy = 100;
  const r = 86;
  const filled = Math.round((v / 100) * segments);

  const colorAt = (t: number) => {
    if (t < 0.33) return "#E84C3D"; // empty side first when reading from "current level outward"
    if (t < 0.6) return "#F2862E";
    if (t < 0.85) return "#F2C12E";
    return "#3CB54A";
  };

  const stateLabel =
    v > 60 ? "Plenty left" : v > 30 ? "Plan refill" : v > 12 ? "Low" : "Refill now";
  const stateColor =
    v > 60 ? "#3CB54A" : v > 30 ? "#F2C12E" : v > 12 ? "#F2862E" : "#E84C3D";

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
      aria-label={`Gas level ${Math.round(v)} percent`}
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <radialGradient id="gauge-glow" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="rgba(60,181,74,0)" />
            <stop offset="100%" stopColor="rgba(60,181,74,0.18)" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={r + 8} fill="url(#gauge-glow)" />

        {Array.from({ length: segments }).map((_, i) => {
          const t = i / (segments - 1);
          // Start angle at top (-90°) and sweep full circle
          const angle = (-90 + t * 360) * (Math.PI / 180);
          const inner = r - thickness / 2;
          const outer = r + thickness / 2;
          const x1 = cx + Math.cos(angle) * inner;
          const y1 = cy + Math.sin(angle) * inner;
          const x2 = cx + Math.cos(angle) * outer;
          const y2 = cy + Math.sin(angle) * outer;
          const active = i < filled;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={active ? colorAt(t) : "rgba(255,255,255,0.06)"}
              strokeWidth={4}
              strokeLinecap="round"
              style={{ transition: animated ? "stroke 200ms ease" : undefined }}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline gap-1">
          <span
            className="font-display font-semibold tabular-nums"
            style={{ fontSize: size * 0.22, color: "var(--logo-fg)" }}
          >
            {Math.round(v)}
          </span>
          <span className="text-muted-foreground font-medium" style={{ fontSize: size * 0.07 }}>
            %
          </span>
        </div>
        <div
          className="mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: stateColor,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: stateColor, boxShadow: `0 0 10px ${stateColor}` }}
          />
          {stateLabel}
        </div>
      </div>
    </div>
  );
}
