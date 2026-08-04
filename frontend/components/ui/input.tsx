import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, disabled = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full rounded-[var(--radius-md)] border bg-[var(--background-card)] px-4 py-2.5 text-sm text-[var(--foreground)] shadow-[var(--shadow-sm)] outline-none transition-all duration-200 placeholder:text-[var(--foreground-muted)]",
          "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20",
          error
            ? "border-red-500/40 focus:border-red-500 focus:ring-red-500/20"
            : "border-[var(--border)] hover:border-[var(--border-hover)]",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
