"use client";

import { useState } from "react";
import { Activity } from "lucide-react";

type PerformanceCardProps = {
  seriesByRange?: Record<string, number[]>;
};

const DEFAULT_SERIES: Record<string, number[]> = {
  "7D": [121300, 123900, 122100, 125400, 124800, 126900, 128450],
  "30D": [
    112400, 114800, 113200, 116900, 119300, 118100, 120400, 122800, 121600,
    123900, 125700, 124300, 126100, 127800, 126400, 128450,
  ],
  "90D": [
    98200, 101500, 104300, 108900, 105600, 110200, 113800, 116400, 119900,
    117200, 122500, 125100, 121800, 126900, 128450,
  ],
};

const RANGES = ["7D", "30D", "90D"] as const;

function buildLinePath(data: number[], width: number, height: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  return data
    .map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - min) / range) * (height - 8) - 4;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function PerformanceCard({
  seriesByRange = DEFAULT_SERIES,
}: PerformanceCardProps) {
  const [range, setRange] = useState<(typeof RANGES)[number]>("30D");
  const data = seriesByRange[range];
  const width = 640;
  const height = 180;
  const path = buildLinePath(data, width, height);
  const first = data[0];
  const last = data[data.length - 1];
  const changePercent = ((last - first) / first) * 100;
  const isPositive = changePercent >= 0;

  return (
    <section className="flex h-full flex-col rounded-2xl border border-[#2A2A3A] bg-[#13131A] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-[#4A7BFF]" />
          <h2 className="text-sm font-medium text-[#A0A0B8]">
            Performance overview
          </h2>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-[#2A2A3A] bg-[#0A0A0F] p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={[
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                range === r
                  ? "bg-[#1C1C26] text-white"
                  : "text-[#6B6B80] hover:text-[#A0A0B8]",
              ].join(" ")}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2">
        <span
          className={[
            "text-sm font-medium",
            isPositive ? "text-[#3DBD7A]" : "text-[#E5484D]",
          ].join(" ")}
        >
          {isPositive ? "+" : ""}
          {changePercent.toFixed(2)}%
        </span>
        <span className="ml-2 text-xs text-[#6B6B80]">
          over the last {range.toLowerCase()}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-3 h-40 w-full sm:h-44"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="performanceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A7BFF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#4A7BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((fraction) => (
          <line
            key={fraction}
            x1="0"
            x2={width}
            y1={height * fraction}
            y2={height * fraction}
            stroke="#2A2A3A"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        ))}
        <path d={`${path} L${width},${height} L0,${height} Z`} fill="url(#performanceFill)" />
        <path
          d={path}
          fill="none"
          stroke={isPositive ? "#4A7BFF" : "#E5484D"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </section>
  );
}
