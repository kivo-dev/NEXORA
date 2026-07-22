"use client";

import { Wallet } from "lucide-react";

export function ConnectWalletButton() {
  return (
    <button
      type="button"
      className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#4A7BFF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A7BFF]/20 transition-all duration-200 hover:bg-[#3A6AEF] hover:shadow-[#4A7BFF]/30 active:scale-[0.98]"
    >
      <Wallet
        size={18}
        strokeWidth={1.8}
        className="transition-transform duration-200 group-hover:-translate-y-0.5"
      />
      Connect Wallet
    </button>
  );
}
