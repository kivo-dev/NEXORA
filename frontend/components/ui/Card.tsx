import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
  glow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { hover = false, glass = false, glow = false, children, className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-lg)] border transition-all duration-300",
          glass
            ? "border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl"
            : "border-[var(--border)] bg-[var(--background-card)] backdrop-blur-sm",
          glow ? "shadow-[var(--shadow-glow-sm)]" : "shadow-[var(--shadow-md)]",
          hover &&
            "hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-lg)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
