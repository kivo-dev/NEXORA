import { SectionHeading } from "@/components/ui/SectionHeading";

type Principle = {
  title: string;
  description: string;
};

const PRINCIPLES: Principle[] = [
  {
    title: "Non-custodial by default",
    description:
      "Nexora reads; it never holds funds or signs transactions on your behalf. Structurally incapable of moving your money.",
  },
  {
    title: "Trustworthy math",
    description:
      "Every balance, percentage, and fee total comes from deterministic computation. The AI narrates results — it never generates a number.",
  },
  {
    title: "Explain, don't just display",
    description:
      "Every figure ships with a sentence of plain-language context. Nexora's real content is sentences, not charts.",
  },
  {
    title: "Always traceable",
    description:
      "Every AI-generated claim links back to the transactions that produced it, so you can verify anything Nexora tells you.",
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="border-t border-[#2A2A3A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          title="Built to be verified, not just trusted"
          description="Nexora separates deterministic computation from AI narrative on purpose — so an AI-first product doesn't come with an AI-hallucination problem."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.title}
              className="rounded-xl border border-[#2A2A3A] bg-[#13131A] p-6"
            >
              <h3 className="text-base font-semibold text-white">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A0A0B8]">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
