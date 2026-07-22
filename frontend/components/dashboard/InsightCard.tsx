import { Sparkles, TrendingUp, AlertTriangle, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type InsightTone = "positive" | "warning" | "info";

type Insight = {
  id: string;
  tone: InsightTone;
  title: string;
  description: string;
  evidence: string;
};

type InsightCardProps = {
  insights?: Insight[];
};

const DEFAULT_INSIGHTS: Insight[] = [
  {
    id: "ins-1",
    tone: "positive",
    title: "Yield opportunity on idle USDC",
    description:
      "12,400 USDC has sat inactive for 21 days. Moving it into a liquidity pool at current rates could earn roughly $340/month.",
    evidence: "Based on 3 wallet balance snapshots",
  },
  {
    id: "ins-2",
    tone: "warning",
    title: "Concentration risk in AQUA",
    description:
      "AQUA now represents 16% of total holdings, up from 9% last month, driven by price appreciation rather than new buys.",
    evidence: "Based on 42 transactions across 90 days",
  },
  {
    id: "ins-3",
    tone: "info",
    title: "Recurring payment pattern detected",
    description:
      "A 500 XLM transfer to the same address occurs on the 1st of each month, consistent with a subscription or payroll payment.",
    evidence: "Based on 6 matching transactions",
  },
];

const TONE_CONFIG: Record<
  InsightTone,
  { icon: LucideIcon; color: string; bg: string }
> = {
  positive: { icon: TrendingUp, color: "#3DBD7A", bg: "#3DBD7A1A" },
  warning: { icon: AlertTriangle, color: "#E8A33D", bg: "#E8A33D1A" },
  info: { icon: Info, color: "#4A7BFF", bg: "#4A7BFF1A" },
};

export function InsightCard({ insights = DEFAULT_INSIGHTS }: InsightCardProps) {
  return (
    <section className="rounded-2xl border border-[#2A2A3A] bg-[#13131A] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#4A7BFF]" />
          <h2 className="text-sm font-medium text-[#A0A0B8]">AI insights</h2>
        </div>
        <button
          type="button"
          className="text-xs font-medium text-[#4A7BFF] hover:text-white"
        >
          Ask Nexora
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {insights.map((insight) => {
          const config = TONE_CONFIG[insight.tone];
          const Icon = config.icon;

          return (
            <article
              key={insight.id}
              className="flex flex-col rounded-xl border border-[#2A2A3A] bg-[#0A0A0F] p-4"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: config.bg }}
              >
                <Icon size={15} style={{ color: config.color }} />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">
                {insight.title}
              </h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-[#A0A0B8]">
                {insight.description}
              </p>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-wide text-[#6B6B80]">
                {insight.evidence}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
