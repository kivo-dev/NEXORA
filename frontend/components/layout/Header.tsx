import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Trust', href: '#trust' },
];

export function Header() {
  return (
    <header className="nx-header sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-full"
            style={{
              background: 'linear-gradient(135deg, var(--nx-blue-500), var(--nx-neon-cyan))',
              boxShadow: '0 0 12px rgba(0, 229, 255, 0.55)',
            }}
          />
          <span
            className="text-lg"
            style={{ fontFamily: 'var(--nx-font-heading)', fontWeight: 700, color: 'var(--nx-ink-900)' }}
          >
            Nexora
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors"
              style={{ fontFamily: 'var(--nx-font-heading)', color: 'var(--nx-ink-600)', fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/dashboard" className="nx-btn-primary text-sm py-2 px-4">
          Submit Wallet
        </Link>
      </div>
    </header>
  );
}
