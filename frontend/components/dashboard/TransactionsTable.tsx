import { ArrowDownLeft, ArrowUpRight, Repeat, type LucideIcon } from "lucide-react";

type TransactionType = "receive" | "send" | "swap";

type Transaction = {
  id: string;
  type: TransactionType;
  label: string;
  counterparty: string;
  amount: string;
  value: string;
  timestamp: string;
};

type TransactionsTableProps = {
  transactions?: Transaction[];
};

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    type: "receive",
    label: "Received XLM",
    counterparty: "GB3Q...K9F2",
    amount: "+2,400 XLM",
    value: "$308.16",
    timestamp: "Today, 09:41",
  },
  {
    id: "tx-2",
    type: "swap",
    label: "Swapped XLM → USDC",
    counterparty: "Stellar DEX",
    amount: "1,000 XLM → 128.4 USDC",
    value: "$128.40",
    timestamp: "Today, 07:15",
  },
  {
    id: "tx-3",
    type: "send",
    label: "Sent USDC",
    counterparty: "GD7X...M4A1",
    amount: "-500 USDC",
    value: "$500.00",
    timestamp: "Yesterday, 18:22",
  },
  {
    id: "tx-4",
    type: "receive",
    label: "Received AQUA",
    counterparty: "GA2K...P8T6",
    amount: "+18,200 AQUA",
    value: "$236.60",
    timestamp: "Yesterday, 11:03",
  },
  {
    id: "tx-5",
    type: "send",
    label: "Sent XLM",
    counterparty: "GC9M...R3D5",
    amount: "-500 XLM",
    value: "$64.20",
    timestamp: "Mar 1, 08:00",
  },
];

const TYPE_CONFIG: Record<TransactionType, { icon: LucideIcon; color: string }> = {
  receive: { icon: ArrowDownLeft, color: "#3DBD7A" },
  send: { icon: ArrowUpRight, color: "#E5484D" },
  swap: { icon: Repeat, color: "#4A7BFF" },
};

export function TransactionsTable({
  transactions = DEFAULT_TRANSACTIONS,
}: TransactionsTableProps) {
  return (
    <section className="flex h-full flex-col rounded-2xl border border-[#2A2A3A] bg-[#13131A] p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-[#A0A0B8]">
          Recent transactions
        </h2>
        <button
          type="button"
          className="text-xs font-medium text-[#4A7BFF] hover:text-white"
        >
          View all
        </button>
      </div>

      <ul className="mt-3 flex-1 divide-y divide-[#2A2A3A]">
        {transactions.map((tx) => {
          const config = TYPE_CONFIG[tx.type];
          const Icon = config.icon;

          return (
            <li key={tx.id} className="flex items-center gap-3 py-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${config.color}1A` }}
              >
                <Icon size={16} style={{ color: config.color }} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">
                  {tx.label}
                </div>
                <div className="truncate text-xs text-[#6B6B80]">
                  {tx.counterparty} · {tx.timestamp}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-sm font-medium text-white">
                  {tx.amount}
                </div>
                <div className="text-xs text-[#6B6B80]">{tx.value}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
