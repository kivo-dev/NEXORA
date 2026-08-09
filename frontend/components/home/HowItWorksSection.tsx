type Step = {
  number: string;
  title: string;
  description: string;
  accent: string;
};

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Connect a wallet',
    description:
      'Enter a Stellar public address or connect via Freighter. Only your public key is shared — never a private key, never signing authority.',
    accent: 'var(--nx-neon-cyan)',
  },
  {
    number: '02',
    title: 'Nexora reads and computes',
    description:
      'Balances, allocation, fees, and risk metrics are computed deterministically from your on-chain history, typically within 60 seconds.',
    accent: 'var(--nx-neon-indigo)',
  },
  {
    number: '03',
    title: 'Get your first insight',
    description:
      'One meaningful observation about your finances, explained in plain language, with the source transactions available on demand.',
    accent: 'var(--nx-neon-teal)',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="nx-page py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'var(--nx-font-heading)', fontWeight: 700, color: 'var(--nx-ink-900)' }}>
          From wallet to understanding in under a minute
        </h2>
        <p className="mt-4 max-w-2xl text-base" style={{ color: 'var(--nx-ink-600)' }}>
          No spreadsheets, no explorer tabs, no manual reconciliation.
        </p>

        <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* connecting timeline — a single gradient line running through all three steps */}
          <div
            className="hidden md:block absolute top-6 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, var(--nx-neon-cyan) 0%, var(--nx-neon-purple) 50%, var(--nx-neon-green) 100%)',
              opacity: 0.35,
            }}
          />

          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              <span
                className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full text-sm bg-white"
                style={{
                  fontFamily: 'var(--nx-font-heading)',
                  fontWeight: 700,
                  color: step.accent,
                  border: `1.5px solid ${step.accent}`,
                  boxShadow: `0 0 16px ${step.accent}`,
                }}
              >
                {step.number}
              </span>

              <h3
                className="mt-5 text-lg"
                style={{ fontFamily: 'var(--nx-font-heading)', fontWeight: 600, color: 'var(--nx-ink-900)' }}
              >
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--nx-ink-600)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
