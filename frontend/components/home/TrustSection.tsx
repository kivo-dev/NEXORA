import { ShieldCheck, Calculator, MessageSquareText, Link2 } from 'lucide-react';
import FeatureCard from './FeatureCard';

export function TrustSection() {
  return (
    <section id="trust" className="nx-page py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="nx-display text-3xl sm:text-4xl" style={{ color: 'var(--nx-ink-900)' }}>
          Built to be verified,
          <br />
          not just trusted
        </h2>
        <p className="mt-4 max-w-2xl text-base" style={{ color: 'var(--nx-ink-600)' }}>
          Nexora separates deterministic computation from AI narrative on purpose — so an
          AI-first product doesn&apos;t come with an AI-hallucination problem.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          <FeatureCard
            accent="cyan"
            icon={<ShieldCheck size={20} />}
            title="Non-custodial by default"
            description="Nexora reads; it never holds funds or signs transactions on your behalf. Structurally incapable of moving your money."
          />
          <FeatureCard
            accent="teal"
            icon={<Calculator size={20} />}
            title="Trustworthy math"
            description="Every balance, percentage, and fee total comes from deterministic computation. The AI narrates results — it never generates a number."
          />
          <FeatureCard
            accent="indigo"
            icon={<MessageSquareText size={20} />}
            title="Explain, don't just display"
            description="Every figure ships with a sentence of plain-language context. Nexora's real content is sentences, not charts."
          />
          <FeatureCard
            accent="pink"
            icon={<Link2 size={20} />}
            title="Always traceable"
            description="Every AI-generated claim links back to the transactions that produced it, so you can verify anything Nexora tells you."
          />
        </div>
      </div>
    </section>
  );
}
