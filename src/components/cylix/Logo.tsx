import { cn } from "@/lib/utils";
import lightLogo from "@/assets/cylix-logo-light.png";
import darkLogo from "@/assets/cylix-logo-dark.png";

/**
 * Cylix logo — uses the actual brand artwork.
 * Two prepared variants are rendered; CSS swaps them based on the active theme,
 * so the speedometer arc colors stay identical and only the wordmark adapts.
 */
export function Logo({
  className,
  showTagline = true,
  size = 40,
}: {
  className?: string;
  showTagline?: boolean;
  size?: number;
}) {
  // Original artwork is roughly 1.85:1 with tagline, ~2.1:1 without.
  const ratio = showTagline ? 1.85 : 2.1;
  const height = size;
  const width = Math.round(height * ratio);

  return (
    <span
      className={cn("inline-flex select-none items-center", className)}
      aria-label="Cylix, Real Time Gas Level"
      style={{ height, width, position: "relative", flexShrink: 0 }}
    >
      <img
        src={lightLogo}
        alt="Cylix"
        className="cylix-logo-light absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />
      <img
        src={darkLogo}
        alt="Cylix"
        className="cylix-logo-dark absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />
    </span>
  );
}

/** Compact gauge-only mark for tight spots (e.g. modal header). */
export function GaugeMark({ size = 40 }: { size?: number; className?: string }) {
  return (
    <span
      className="inline-block overflow-hidden"
      style={{ width: size, height: size, position: "relative" }}
      aria-hidden="true"
    >
      <img
        src={lightLogo}
        alt=""
        className="cylix-logo-light absolute h-full w-auto"
        style={{ right: 0, top: "50%", transform: "translateY(-50%) scale(2.4)", transformOrigin: "100% 50%" }}
        draggable={false}
      />
      <img
        src={darkLogo}
        alt=""
        className="cylix-logo-dark absolute h-full w-auto"
        style={{ right: 0, top: "50%", transform: "translateY(-50%) scale(2.4)", transformOrigin: "100% 50%" }}
        draggable={false}
      />
    </span>
  );
}
