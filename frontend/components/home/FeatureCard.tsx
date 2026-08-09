import type { ReactNode } from 'react';

type Accent = 'blue' | 'cyan' | 'teal' | 'indigo' | 'pink' | 'white';

const ACCENT_VAR: Record<Accent, string> = {
  blue: 'var(--nx-neon-blue)',
  cyan: 'var(--nx-neon-cyan)',
  teal: 'var(--nx-neon-teal)',
  indigo: 'var(--nx-neon-indigo)',
  pink: 'var(--nx-neon-pink)',
  white: 'var(--nx-neon-white)',
};

export default function FeatureCard({
  icon,
  title,
  description,
  accent = 'blue',
}: {
  icon: ReactNode;
  title: string;
  description: string;
  accent?: Accent;
}) {
  return (
    <div className="nx-card" style={{ ['--nx-accent' as string]: ACCENT_VAR[accent] }}>
      <div className="nx-card-icon mb-4">{icon}</div>
      <h3
        className="text-base mb-2"
        style={{ fontFamily: 'var(--nx-font-heading)', fontWeight: 600, color: 'var(--nx-ink-900)' }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--nx-ink-600)' }}>
        {description}
      </p>
    </div>
  );
}
