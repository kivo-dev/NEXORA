import { CircleCheck, PieChart, ListChecks, Percent, FileText, MessageCircle } from 'lucide-react';
import FeatureCard from './FeatureCard';

export function FeaturesSection() {
  return (
    <section id="features" className="nx-page py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="nx-display text-3xl sm:text-4xl" style={{ color: 'var(--nx-ink-900)' }}>
          Everything you need to know,
          <br />
          nothing you don&apos;t
        </h2>
        <p className="mt-4 max-w-2xl text-base" style={{ color: 'var(--nx-ink-600)' }}>
          Nexora filters aggressively and explains what&apos;s financially significant, rather than
          showing everything and leaving the interpretation to you.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            accent="blue"
            icon={<CircleCheck size={20} />}
            title="Portfolio Health Score"
            description="A single, plain-language status for your holdings — diversification, volatility exposure, and stability — recalculated continuously, never a bare number."
          />
          <FeatureCard
            accent="cyan"
            icon={<PieChart size={20} />}
            title="Asset Allocation Intelligence"
            description="Deterministic allocation by asset, paired with AI commentary on concentration risk and drift versus your own historical baseline."
          />
          <FeatureCard
            accent="indigo"
            icon={<ListChecks size={20} />}
            title="Transaction Intelligence Feed"
            description="Every transaction categorized and annotated with a one-line explanation, replacing raw explorer-style hex and memo data."
          />
          <FeatureCard
            accent="teal"
            icon={<Percent size={20} />}
            title="Fee & Cost Analysis"
            description="Fees paid over time, flagged when unusually costly, expressed as a percentage of activity so real financial drag is visible."
          />
          <FeatureCard
            accent="pink"
            icon={<FileText size={20} />}
            title="AI Financial Report"
            description="A periodic, readable statement covering performance, risk, and behavior — modeled on the legibility of a bank statement, not a dashboard."
          />
          <FeatureCard
            accent="white"
            icon={<MessageCircle size={20} />}
            title="Ask Nexora"
            description="Ask direct questions about your own data in plain English. Figures are always retrieved deterministically, then phrased by AI — never invented."
          />
        </div>
      </div>
    </section>
  );
}
