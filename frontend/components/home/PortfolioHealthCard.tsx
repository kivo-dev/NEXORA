import { StatusBadge } from "@/components/ui/StatusBadge";

/**
 * Hero mock-up card. Content mirrors the documented dashboard
 * example (Stable · 84/100 · 4.2% · 60% XLM) — illustrative, not
 * fabricated copy.
 */
export function PortfolioHealthCard() {
  return (
    <div className="rounded-2xl border border-[#2A2A3A] bg-[#13131A] p-6 shadow-[0_16px_64px_rgba(0,0,0,0.5)] sm:p-8">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#A0A0B8]">
          Portfolio Health
        </span>
        <StatusBadge label="Stable" />
      </div>

      <div className="mt-4 text-4xl font-semibold tracking-tight">
        84<span className="text-xl text-[#6B6B80]">/100</span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[#A0A0B8]">
        Your portfolio is well-diversified across four assets, with no
        single holding exceeding half your total value.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#2A2A3A] pt-6">
        <div>
          <div className="text-xs text-[#6B6B80]">30-day performance</div>
          <div className="mt-1 text-sm font-medium text-[#3DBD7A]">
            ▲ 4.2%
          </div>
        </div>
        <div>
          <div className="text-xs text-[#6B6B80]">Largest holding</div>
          <div className="mt-1 text-sm font-medium text-white">60% XLM</div>
        </div>
      </div>

      <button className="mt-6 w-full rounded-lg border border-[#38384A] py-2 text-xs font-medium text-[#A0A0B8] transition-colors hover:bg-[#1C1C26] hover:text-white">
        See source transactions
      </button>
    </div>
  );
}
