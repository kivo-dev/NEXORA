"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

type OverviewMetric = {
  label: string;
  value: string;
  changePercent: number;
};

type PortfolioOverviewProps = {
  totalValue?: number;
  changeValue?: number;
  changePercent?: number;
  sparklineData?: number[];
  metrics?: OverviewMetric[];
};

const DEFAULT_SPARKLINE = [
  118200, 119800, 117650, 121300, 123900, 122100, 125400, 124800, 126900,
  125700, 127300, 128450,
];

const DEFAULT_METRICS: OverviewMetric[] = [
  { label: "Realized P&L (30d)", value: "$6,240.18", changePercent: 5.1 },
  { label: "Unrealized P&L", value: "$2,980.44", changePercent: 2.4 },
  { label: "Avg. cost basis", value: "$0.1187 / XLM", changePercent: -0.6 },
];

function buildSparklinePath(data: number[], width: number, height: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  return data
    .map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function PortfolioOverview({
  totalValue = 128450.32,
  changeValue = 5892.11,
  changePercent = 4.82,
  sparklineData = DEFAULT_SPARKLINE,
  metrics = DEFAULT_METRICS,
}: PortfolioOverviewProps) {
  const isPositive = changeValue >= 0;
  const path = buildSparklinePath(sparklineData, 280, 64);

  return (
    <section className="flex h-full flex-col rounded-2xl border border-[#2A2A3A] bg-[#13131A] p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-medium text-[#A0A0B8]">
            Portfolio overview
          </h2>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-white">
            $
            {totalValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div
            className={[
              "mt-1.5 flex items-center gap-1.5 text-sm font-medium",
              isPositive ? "text-[#3DBD7A]" : "text-[#E5484D]",
            ].join(" ")}
          >
            {isPositive ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
            {isPositive ? "+" : ""}
            {changeValue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            <span className="text-[#6B6B80]">
              ({isPositive ? "+" : ""}
              {changePercent.toFixed(2)}% · 30d)
            </span>
          </div>
        </div>

        <svg
          viewBox="0 0 280 64"
          className="hidden h-16 w-40 shrink-0 sm:block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sparklineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A7BFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4A7BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L280,64 L0,64 Z`} fill="url(#sparklineFill)" />
          <path
            d={path}
            fill="none"
            stroke="#4A7BFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#2A2A3A] pt-5 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="text-xs text-[#6B6B80]">{metric.label}</div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-sm font-semibold text-white">
                {metric.value}
              </span>
              <span
                className={[
                  "text-xs font-medium",
                  metric.changePercent >= 0
                    ? "text-[#3DBD7A]"
                    : "text-[#E5484D]",
                ].join(" ")}
              >
                {metric.changePercent >= 0 ? "+" : ""}
                {metric.changePercent.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
