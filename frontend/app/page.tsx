import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TrustSection } from "@/components/home/TrustSection";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Nexora — AI Financial Intelligence for Stellar",
  description:
    "Connect a Stellar wallet, read-only, and get a clear, plain-language picture of your on-chain finances — deterministic math, AI narrative, every claim traceable.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white antialiased">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TrustSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

