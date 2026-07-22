import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Connect a wallet",
    description:
      "Enter a Stellar public address or connect via Freighter. Only your public key is shared — never a private key, never signing authority.",
  },
  {
    number: "02",
    title: "Nexora reads and computes",
    description:
      "Balances, allocation, fees, and risk metrics are computed deterministically from your on-chain history, typically within 60 seconds.",
  },
  {
    number: "03",
    title: "Get your first insight",
    description:
      "One meaningful observation about your finances, explained in plain language, with the source transactions available on demand.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-t border-[#2A2A3A] bg-[#13131A] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="From wallet to understanding in under a minute"
          description="No spreadsheets, no explorer tabs, no manual reconciliation."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((step) => (
            <div key={step.number}>
              <span className="text-sm font-semibold text-[#4A7BFF]">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A0A0B8]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
