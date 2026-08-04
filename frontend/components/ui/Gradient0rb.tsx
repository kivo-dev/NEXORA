import React from "react";

export interface GradientOrbProps {
  size?: number;
  className?: string;
  color?: string;
  blur?: number;
}

export function GradientOrb({
  size = 400,
  className = "",
  color = "rgba(107, 140, 255, 0.35)",
  blur = 80,
}: GradientOrbProps): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
