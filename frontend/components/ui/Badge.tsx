import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "outline";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  icon?: React.ReactNode;
  removable?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      rounded = false,
      icon,
      removable = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center gap-1.5 font-medium border transition-colors duration-200";

    const variantClasses = {
      default:
        "bg-white/[0.04] text-white/60 border-white/[0.06] hover:bg-white/[0.07]",
      primary:
        "bg-blue-500/10 text-blue-400 border-blue-500/15 hover:bg-blue-500/15",
      secondary:
        "bg-white/[0.07] text-white/70 border-white/[0.08] hover:bg-white/[0.1]",
      success:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/15 hover:bg-emerald-500/15",
      warning:
        "bg-amber-500/10 text-amber-400 border-amber-500/15 hover:bg-amber-500/15",
      danger:
        "bg-red-500/10 text-red-400 border-red-500/15 hover:bg-red-500/15",
      info:
        "bg-sky-500/10 text-sky-400 border-sky-500/15 hover:bg-sky-500/15",
      outline:
        "bg-transparent text-white/50 border-white/[0.08] hover:bg-white/[0.03] hover:text-white/70",
    };

    const sizeClasses = {
      sm: "text-[11px] px-1.5 h-5",
      md: "text-xs px-2 h-6",
      lg: "text-sm px-2.5 h-7",
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          rounded ? "rounded-full" : "rounded-md",
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0 opacity-70">{icon}</span>}
        <span className="truncate">{children}</span>
        {removable && (
          <button
            type="button"
            aria-label="Remove"
            tabIndex={-1}
            className="ml-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full opacity-40 transition-opacity duration-150 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
