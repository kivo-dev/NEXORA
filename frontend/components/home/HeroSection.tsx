import Link from 'next/link';
import CandlestickBackground from './CandlestickBackground';
import TypewriterHeadline from './TypewriterHeadline';

export function HeroSection() {
  return (
    <section className="nx-page relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-28 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="relative z-10">
          <span className="nx-eyebrow inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{ borderColor: 'var(--nx-border)', background: 'rgba(255,255,255,0.6)' }}>
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--nx-neon-cyan)', boxShadow: '0 0 8px var(--nx-neon-cyan)' }}
            />
            AI-Powered Multi-Chain Intelligence
          </span>

          <TypewriterHeadline />

          <p className="mt-6 text-lg max-w-md" style={{ color: 'var(--nx-ink-600)', fontFamily: 'var(--nx-font-body)' }}>
            AI insights for better decisions.
          </p>

          <div className="mt-9 flex items-center gap-4">
            <Link href="/dashboard" className="nx-btn-primary inline-block">
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Right: signature element — live-feeling candlestick chart,
            sitting directly on the page gradient, no card/box around it */}
        <div className="relative h-[360px] lg:h-[440px]">
          <div
            className="absolute inset-0 nx-float-subtle"
            style={{
              maskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 100%)',
            }}
          >
            <CandlestickBackground />
          </div>

          {/* faint baseline grid, same-family blue, to ground the chart on the bg */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15]"
            style={{
              backgroundImage:
                'linear-gradient(var(--nx-border) 1px, transparent 1px), linear-gradient(90deg, var(--nx-border) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* AI system-terminal panel — quiet, controlled, reads like the
              product actually watching the market rather than decoration */}
          <div className="absolute top-4 right-2 lg:top-8 lg:right-4 z-10">
            
          </div>
        </div>
      </div>
    </section>
  );
}
