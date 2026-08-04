import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Card from "@/components/ui/Card";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, subtitle, icon, trend, trendValue, className }, ref) => {
    const trendConfig = {
      up: {
        color: "text-emerald-400",
        icon: (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        ),
      },
      down: {
        color: "text-red-400",
        icon: (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        ),
      },
      neutral: {
        color: "text-white/40",
        icon: (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
          </svg>
        ),
      },
    };

    return (
      <Card ref={ref} hover className={cn("p-5 sm:p-6", className)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {icon && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/50">
                {icon}
              </span>
            )}
            <span className="text-sm font-medium text-white/50">{title}</span>
          </div>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trendConfig[trend].color
              )}
            >
              {trendConfig[trend].icon}
              {trendValue && <span>{trendValue}</span>}
            </div>
          )}
        </div>
        <div className="mt-3">
          <span className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {value}
          </span>
        </div>
        {subtitle && (
          <p className="mt-1.5 text-xs leading-relaxed text-white/30">
            {subtitle}
          </p>
        )}
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

export default StatCard;