import { Button } from "@/components/ui/Button";
import { BlockchainOrb } from "@/components/home/BlockchainOrb";
export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.7s ease-out both; }
      `}</style>

      {/* Ambient top wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#4A7BFF] to-[#6C5CE7] opacity-20 blur-[120px]"
      />

      {/* Subtle analytics grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 sm:pt-28 md:gap-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-32 lg:pt-32">
        {/* Left column — headline, copy, CTAs */}
        <div>
          <span
            className="fade-in-up inline-flex items-center gap-2 rounded-full border border-[#38384A] bg-[#13131A] px-3 py-1 text-xs font-medium text-[#A0A0B8]"
            style={{ animationDelay: "0ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A7BFF]" />
            AI financial intelligence for Stellar
          </span>

          <h1
            className="fade-in-up mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[58px]"
            style={{ animationDelay: "80ms" }}
          >
            Your wallet shows transactions.
            <br />
            <span className="bg-gradient-to-r from-[#4A7BFF] to-[#6C5CE7] bg-clip-text text-transparent">
              Nexora
            </span>{" "}
            shows what they mean.
          </h1>

          <p
            className="fade-in-up mt-6 max-w-xl text-lg leading-relaxed text-[#A0A0B8]"
            style={{ animationDelay: "160ms" }}
          >
            Connect a Stellar wallet — read-only, nothing to sign — and Nexora
            turns your balances, activity, and fees into a financial picture
            you can actually understand. Every figure is computed
            deterministically. Every claim is traceable back to the
            transaction behind it.
          </p>

          <div
            className="fade-in-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <Button
              href="/dashboard"
              className="px-6 py-3 text-center shadow-lg shadow-[#4A7BFF]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]"
            >
              Enter Dashboard
            </Button>
            <Button
              href="/#features"
              variant="outline"
              className="px-6 py-3 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]"
            >
              Explore Features
            </Button>
          </div>

          <div
            className="fade-in-up mt-6 flex flex-col gap-2 border-t border-[#2A2A3A] pt-5 text-xs text-[#6B6B80] sm:flex-row sm:items-center sm:gap-6"
            style={{ animationDelay: "300ms" }}
          >
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3DBD7A" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Read-only, non-custodial
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3DBD7A" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Deterministic math, always verifiable
            </span>
          </div>
        </div>

        {/* Right column — floating AI analytics visual */}
        <div
          className="fade-in-up relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          style={{ animationDelay: "200ms" }}
        >
          {/* Local ambient glow behind the visual */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-[#4A7BFF]/25 via-[#6C5CE7]/10 to-transparent blur-3xl"
          />

          {/* Stacked ghost card for depth */}
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-8 bottom-0 -z-10 rotate-3 rounded-2xl border border-[#2A2A3A]/50 bg-[#13131A]/40 blur-[1px]"
          />

          {/* Floating trust chips — desktop only, keeps mobile uncluttered */}
          <div className="absolute -left-4 top-8 z-10 hidden items-center gap-2 rounded-full border border-[#2A2A3A] bg-[#13131A]/90 px-3 py-1.5 text-xs font-medium text-[#A0A0B8] shadow-xl shadow-black/40 backdrop-blur-sm lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3DBD7A]" />
            Live on-chain read
          </div>
          <div className="absolute -right-4 bottom-16 z-10 hidden items-center gap-2 rounded-full border border-[#2A2A3A] bg-[#13131A]/90 px-3 py-1.5 text-xs font-medium text-[#A0A0B8] shadow-xl shadow-black/40 backdrop-blur-sm lg:flex">
            Verified against source data
          </div>

          {/* The card itself, gently tilted, straightens on hover */}
          <div className="relative">
            <BlockchainOrb />
          </div>
          </div>
        </div>
    </section>
  );
}
