import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface GlowProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function Glow({
  children,
  className = "",
  intensity = "medium",
}: GlowProps): React.ReactElement {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute pointer-events-none rounded-[inherit]",
          "bg-gradient-to-br from-blue-500/15 to-indigo-500/5",
          intensity === "low" && "-inset-2 blur-xl opacity-20",
          intensity === "medium" && "-inset-3 blur-2xl opacity-30",
          intensity === "high" && "-inset-4 blur-3xl opacity-40"
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute pointer-events-none rounded-[inherit]",
          "bg-gradient-to-tr from-indigo-500/10 to-blue-500/5",
          intensity === "low" && "-inset-2 blur-xl opacity-20",
          intensity === "medium" && "-inset-3 blur-2xl opacity-30",
          intensity === "high" && "-inset-4 blur-3xl opacity-40"
        )}
      />
      {children}
    </div>
  );
}