import { Sparkles, ArrowUpRight } from "lucide-react";

type WelcomeCardProps = {
  userName?: string;
  walletsConnected?: number;
  portfolioValue?: number;
  changePercent24h?: number;
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function WelcomeCard({
  userName = "Alex",
  walletsConnected = 3,
  portfolioValue = 128450.32,
  changePercent24h = 4.82,
}: WelcomeCardProps) {
  const isPositive = changePercent24h >= 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#2A2A3A] bg-[#13131A] p-6 sm:p-8">
      {/* Ambient accent — subtle, not neon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#4A7BFF]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-[#6C5CE7]/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#6B6B80]">
            <Sparkles size={13} className="text-[#4A7BFF]" />
            {walletsConnected} wallets connected · monitoring active
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {getGreeting()}, {userName}
          </h1>
          <p className="mt-1.5 max-w-md text-sm text-[#A0A0B8]">
            Here&apos;s what&apos;s happening across your portfolio since yesterday.
          </p>
        </div>

        <div className="flex items-end gap-3 border-t border-[#2A2A3A] pt-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-[#6B6B80]">
              Total portfolio value
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight text-white">
              $
              {portfolioValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div
              className={[
                "mt-1 flex items-center gap-1 text-sm font-medium",
                isPositive ? "text-[#3DBD7A]" : "text-[#E5484D]",
              ].join(" ")}
            >
              <ArrowUpRight
                size={14}
                className={isPositive ? "" : "rotate-90"}
              />
              {isPositive ? "+" : ""}
              {changePercent24h.toFixed(2)}% today
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
