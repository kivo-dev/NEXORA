"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  NotebookPen,
  LineChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Portfolio", href: "/portfolio", icon: Wallet },
  { label: "Journal", href: "/journal", icon: NotebookPen },
  { label: "Analytics", href: "/analytics", icon: LineChart },
  { label: "Settings", href: "/settings", icon: Settings },
];

type SidebarProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
};

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside
      className={[
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#2A2A3A] bg-[#0A0A0F] transition-transform duration-300 ease-out",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:transition-[width] lg:duration-300",
        isCollapsed ? "lg:w-20" : "lg:w-64",
      ].join(" ")}
    >
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-[#2A2A3A] px-5">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect x="2" y="6" width="16" height="16" rx="5" fill="#4A7BFF" />
          <rect
            x="10"
            y="2"
            width="16"
            height="16"
            rx="5"
            fill="#6C5CE7"
            fillOpacity="0.85"
          />
        </svg>

        {!isCollapsed && (
          <span className="text-base font-semibold tracking-tight text-white">
            NEXORA
          </span>
        )}

        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close menu"
          className="ml-auto rounded-lg p-1.5 text-[#A0A0B8] hover:bg-[#13131A] hover:text-white lg:hidden"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              title={isCollapsed ? item.label : undefined}
              className={[
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#1C1C26] text-white"
                  : "text-[#A0A0B8] hover:bg-[#13131A] hover:text-white",
                isCollapsed ? "lg:justify-center lg:px-0" : "",
              ].join(" ")}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[#4A7BFF]" />
              )}
              <Icon size={18} strokeWidth={1.8} className="shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer: AI status + collapse toggle */}
      <div className="border-t border-[#2A2A3A] p-3">
        {!isCollapsed && (
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-[#2A2A3A] bg-[#13131A] px-3 py-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DBD7A] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3DBD7A]" />
            </span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#A0A0B8]">
              <Sparkles size={13} className="text-[#4A7BFF]" />
              AI monitoring active
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden w-full items-center justify-center gap-2 rounded-lg border border-[#2A2A3A] py-2 text-xs font-medium text-[#A0A0B8] transition-colors hover:bg-[#13131A] hover:text-white lg:flex"
        >
          {isCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <>
              <ChevronLeft size={16} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
