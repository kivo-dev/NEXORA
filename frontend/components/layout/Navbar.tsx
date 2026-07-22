"use client";

import { Menu, Search, Bell, Moon } from "lucide-react";

type NavbarProps = {
  title: string;
  onOpenMobileMenu: () => void;
};

export function Navbar({ title, onOpenMobileMenu }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[#2A2A3A] bg-[#0A0A0F]/80 px-4 backdrop-blur-md sm:gap-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenMobileMenu}
        aria-label="Open menu"
        className="rounded-lg p-2 text-[#A0A0B8] transition-colors hover:bg-[#13131A] hover:text-white lg:hidden"
      >
        <Menu size={20} />
      </button>

      <h1 className="truncate text-base font-semibold tracking-tight text-white sm:text-lg">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* Search — full field on larger screens, icon-only on mobile */}
        <div className="hidden items-center gap-2 rounded-lg border border-[#2A2A3A] bg-[#13131A] px-3 py-2 sm:flex">
          <Search size={16} className="shrink-0 text-[#6B6B80]" />
          <input
            type="text"
            placeholder="Search transactions, assets..."
            className="w-40 bg-transparent text-sm text-white placeholder:text-[#6B6B80] focus:outline-none lg:w-64"
          />
        </div>
        <button
          type="button"
          aria-label="Search"
          className="rounded-lg border border-[#2A2A3A] p-2 text-[#A0A0B8] transition-colors hover:bg-[#13131A] hover:text-white sm:hidden"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg border border-[#2A2A3A] p-2 text-[#A0A0B8] transition-colors hover:bg-[#13131A] hover:text-white"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#4A7BFF]" />
        </button>

        {/* Theme toggle — placeholder, dark is the only theme for now */}
        <button
          type="button"
          disabled
          title="Theme switching — coming soon"
          aria-label="Theme switching, coming soon"
          className="hidden cursor-not-allowed rounded-lg border border-[#2A2A3A] p-2 text-[#6B6B80] opacity-60 sm:block"
        >
          <Moon size={18} />
        </button>

        {/* User avatar */}
        <button
          type="button"
          aria-label="Account menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4A7BFF] to-[#6C5CE7] text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          N
        </button>
      </div>
    </header>
  );
}
