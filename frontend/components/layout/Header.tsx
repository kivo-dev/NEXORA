import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2A3A] bg-[#0A0A0F]/80 backdrop-blur-md">
      {/* Pure-CSS mobile menu toggle — keeps this a Server Component */}
      <input type="checkbox" id="nav-toggle" className="peer hidden" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="text-lg font-semibold tracking-tight">Nexora</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <a
            href="#features"
            className="text-sm text-[#A0A0B8] transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-[#A0A0B8] transition-colors hover:text-white"
          >
            How it works
          </a>
          <a
            href="#trust"
            className="text-sm text-[#A0A0B8] transition-colors hover:text-white"
          >
            Trust
          </a>
        </nav>

        <div className="hidden lg:block">
          <Button
            href="/connect"
            className="px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A7BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]"
          >
            Connect Wallet
          </Button>
        </div>

        <label
          htmlFor="nav-toggle"
          aria-label="Toggle menu"
          className="-mr-2 cursor-pointer p-2 lg:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            />
          </svg>
        </label>
      </div>

      <div className="hidden border-t border-[#2A2A3A] bg-[#0A0A0F] px-6 py-4 peer-checked:block lg:hidden">
        <nav className="flex flex-col gap-4">
          <a href="#features" className="text-sm text-[#A0A0B8] hover:text-white">
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-[#A0A0B8] hover:text-white"
          >
            How it works
          </a>
          <a href="#trust" className="text-sm text-[#A0A0B8] hover:text-white">
            Trust
          </a>
          <Button href="/connect" className="mt-2 px-4 py-2.5 text-center">
            Connect Wallet
          </Button>
        </nav>
      </div>
    </header>
  );
}
