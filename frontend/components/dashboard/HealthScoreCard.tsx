import { ShieldCheck } from "lucide-react";

type HealthFactor = {
  label: string;
  score: number; // 0-100
};

type HealthScoreCardProps = {
  score?: number;
  summary?: string;
  factors?: HealthFactor[];
};

const DEFAULT_FACTORS: HealthFactor[] = [
  { label: "Diversification", score: 78 },
  { label: "Risk exposure", score: 65 },
  { label: "Liquidity", score: 91 },
  { label: "Activity pattern", score: 88 },
];

function scoreColor(score: number): string {
  if (score >= 75) return "#3DBD7A";
  if (score >= 50) return "#E8A33D";
  return "#E5484D";
}

function scoreLabel(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Needs attention";
}

export function HealthScoreCard({
  score = 82,
  summary = "Your portfolio is well-diversified with healthy liquidity. Risk exposure is slightly elevated due to a concentrated AQUA position.",
  factors = DEFAULT_FACTORS,
}: HealthScoreCardProps) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;
  const ringColor = scoreColor(score);

  return (
    <section className="flex h-full flex-col rounded-2xl border border-[#2A2A3A] bg-[#13131A] p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <ShieldCheck size={16} className="text-[#4A7BFF]" />
        <h2 className="text-sm font-medium text-[#A0A0B8]">
          Portfolio health score
        </h2>
      </div>

      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 96 96" className="h-24 w-24 -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke="#2A2A3A"
              strokeWidth="8"
            />
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke={ringColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-white">{score}</span>
            <span className="text-[10px] text-[#6B6B80]">/ 100</span>
          </div>
        </div>

        <div>
          <div
            className="text-sm font-semibold"
            style={{ color: ringColor }}
          >
            {scoreLabel(score)}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[#A0A0B8]">
            {summary}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-[#2A2A3A] pt-4">
        {factors.map((factor) => (
          <div key={factor.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-[#A0A0B8]">{factor.label}</span>
              <span className="font-medium text-white">{factor.score}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1C1C26]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${factor.score}%`,
                  backgroundColor: scoreColor(factor.score),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
