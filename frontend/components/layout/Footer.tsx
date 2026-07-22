import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

export function Footer() {
  return (
    <footer className="border-t border-[#2A2A3A]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <LogoMark />
              <span className="text-lg font-semibold tracking-tight">
                Nexora
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[#6B6B80]">
              The interpretive layer of on-chain finance — turning data into
              understanding, built on Stellar.
            </p>
          </div>

          <nav className="flex gap-8 text-sm">
            <a href="#features" className="text-[#A0A0B8] hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="text-[#A0A0B8] hover:text-white">
              How it works
            </a>
            <a href="#trust" className="text-[#A0A0B8] hover:text-white">
              Trust
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#2A2A3A] pt-6 text-xs text-[#6B6B80] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nexora. Non-custodial. Read-only.</p>
          <p>
            Nexora provides descriptive financial insight, not investment
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
