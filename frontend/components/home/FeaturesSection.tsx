import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard, type Feature } from "@/components/home/FeatureCard";

const FEATURES: Feature[] = [
  {
    title: "Portfolio Health Score",
    description:
      "A single, plain-language status for your holdings — diversification, volatility exposure, and stability — recalculated continuously, never a bare number.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    ),
  },
  {
    title: "Asset Allocation Intelligence",
    description:
      "Deterministic allocation by asset, paired with AI commentary on concentration risk and drift versus your own historical baseline.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
      />
    ),
  },
  {
    title: "Transaction Intelligence Feed",
    description:
      "Every transaction categorized and annotated with a one-line explanation, replacing raw explorer-style hex and memo data.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
      />
    ),
  },
  {
    title: "Fee & Cost Analysis",
    description:
      "Fees paid over time, flagged when unusually costly, expressed as a percentage of activity so real financial drag is visible.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3.75-9.75h5.25a2.25 2.25 0 0 1 0 4.5H10.5a2.25 2.25 0 0 0 0 4.5h5.25"
      />
    ),
  },
  {
    title: "AI Financial Report",
    description:
      "A periodic, readable statement covering performance, risk, and behavior — modeled on the legibility of a bank statement, not a dashboard.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 3.75h6M9 8.25h6M5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V5.25A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25v13.5A2.25 2.25 0 0 0 5.25 21Z"
      />
    ),
  },
  {
    title: "Ask Nexora",
    description:
      "Ask direct questions about your own data in plain English. Figures are always retrieved deterministically, then phrased by AI — never invented.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 10.5h7.5m-7.5 3h4.5M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-3.362-.59L3 21l1.395-4.185A8.19 8.19 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
      />
    ),
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="border-t border-[#2A2A3A] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Everything you need to know, nothing you don't"
          description="Nexora filters aggressively and explains what's financially significant, rather than showing everything and leaving the interpretation to you."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
