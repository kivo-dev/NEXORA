import { Eye } from "lucide-react";

type WatchlistItem = {
  symbol: string;
  name: string;
  price: string;
  changePercent: number;
};

type WatchlistCardProps = {
  items?: WatchlistItem[];
};

const DEFAULT_ITEMS: WatchlistItem[] = [
  { symbol: "XLM", name: "Stellar Lumens", price: "$0.1284", changePercent: 3.4 },
  { symbol: "USDC", name: "USD Coin", price: "$1.0001", changePercent: 0.0 },
  { symbol: "AQUA", name: "Aquarius", price: "$0.01301", changePercent: -2.1 },
  { symbol: "yXLM", name: "yieldblox XLM", price: "$0.1291", changePercent: 3.6 },
  { symbol: "EURC", name: "Euro Coin", price: "$1.0842", changePercent: -0.3 },
];

export function WatchlistCard({ items = DEFAULT_ITEMS }: WatchlistCardProps) {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-[#2A2A3A] bg-[#13131A] p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Eye size={16} className="text-[#4A7BFF]" />
        <h2 className="text-sm font-medium text-[#A0A0B8]">Watchlist</h2>
      </div>

      <ul className="mt-3 flex-1 divide-y divide-[#2A2A3A]">
        {items.map((item) => {
          const isPositive = item.changePercent > 0;
          const isFlat = item.changePercent === 0;

          return (
            <li
              key={item.symbol}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1C1C26] text-[10px] font-semibold text-[#A0A0B8]">
                  {item.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {item.symbol}
                  </div>
                  <div className="text-xs text-[#6B6B80]">{item.name}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {item.price}
                </div>
                <div
                  className={[
                    "text-xs font-medium",
                    isFlat
                      ? "text-[#6B6B80]"
                      : isPositive
                        ? "text-[#3DBD7A]"
                        : "text-[#E5484D]",
                  ].join(" ")}
                >
                  {isFlat ? "" : isPositive ? "+" : ""}
                  {item.changePercent.toFixed(1)}%
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
