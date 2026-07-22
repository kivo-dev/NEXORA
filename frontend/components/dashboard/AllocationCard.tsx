import { PieChart } from "lucide-react";

type Allocation = {
  asset: string;
  percent: number;
  value: number;
  color: string;
};

type AllocationCardProps = {
  allocations?: Allocation[];
};

const DEFAULT_ALLOCATIONS: Allocation[] = [
  { asset: "XLM", percent: 42, value: 53949.13, color: "#4A7BFF" },
  { asset: "USDC", percent: 27, value: 34681.59, color: "#3DBD7A" },
  { asset: "AQUA", percent: 16, value: 20552.05, color: "#6C5CE7" },
  { asset: "yXLM", percent: 9, value: 11560.53, color: "#E8A33D" },
  { asset: "Other", percent: 6, value: 7707.02, color: "#6B6B80" },
];

function buildDonutSegments(allocations: Allocation[], radius: number) {
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return allocations.map((item) => {
    const dash = (item.percent / 100) * circumference;
    const segment = {
      ...item,
      dasharray: `${dash} ${circumference - dash}`,
      dashoffset: -cumulative,
    };
    cumulative += dash;
    return segment;
  });
}

export function AllocationCard({
  allocations = DEFAULT_ALLOCATIONS,
}: AllocationCardProps) {
  const radius = 40;
  const segments = buildDonutSegments(allocations, radius);

  return (
    <section className="flex h-full flex-col rounded-2xl border border-[#2A2A3A] bg-[#13131A] p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <PieChart size={16} className="text-[#4A7BFF]" />
        <h2 className="text-sm font-medium text-[#A0A0B8]">Asset allocation</h2>
      </div>

      <div className="mt-4 flex items-center gap-6">
        <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0 -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#1C1C26"
            strokeWidth="14"
          />
          {segments.map((segment) => (
            <circle
              key={segment.asset}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="14"
              strokeDasharray={segment.dasharray}
              strokeDashoffset={segment.dashoffset}
            />
          ))}
        </svg>

        <ul className="flex-1 space-y-2.5">
          {allocations.map((item) => (
            <li
              key={item.asset}
              className="flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-2 text-[#A0A0B8]">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.asset}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-medium text-white">{item.percent}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
