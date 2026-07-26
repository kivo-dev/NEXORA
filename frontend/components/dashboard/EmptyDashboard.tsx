"use client";

import { HeroAnimation } from "./HeroAnimation";
import { FeatureList } from "./FeatureList";
import { SubmitWalletButton } from "./SubmitWalletButton";

export function EmptyDashboard() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center">
      <div className="w-full max-w-3xl px-4 text-center">
        {/* Hero Animation Placeholder */}
        <div className="mb-10 flex justify-center">
          <HeroAnimation />
        </div>

        {/* Title */}
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Welcome to Nexora
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-[#A0A0B8] sm:text-lg">
          Connect your Stellar wallet to unlock AI-powered portfolio analytics,
          transaction intelligence, and financial insights.
        </p>

        {/* Feature List */}
        <div className="mb-10 flex justify-center">
          <FeatureList />
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <SubmitWalletButton />
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg border border-[#2A2A3A] bg-transparent px-6 py-3 text-sm font-medium text-[#A0A0B8] transition-all duration-200 hover:border-[#4A7BFF]/30 hover:bg-[#13131A] hover:text-white"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
