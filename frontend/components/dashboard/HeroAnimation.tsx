"use client";

/**
 * HeroAnimation — Reusable placeholder for future animation media.
 *
 * Ready to host:
 * - Lottie (via lottie-react)
 * - Video (HTML5 <video> or react-player)
 * - Three.js (via @react-three/fiber Canvas)
 * - SVG Animation (CSS or GSAP)
 *
 * Swap the inner content when animation assets are ready.
 */
export function HeroAnimation() {
  return (
    <div className="relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56 lg:h-64 lg:w-64">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full border border-[#2A2A3A] bg-[#0A0A0F]" />

      {/* Animated pulse rings (CSS only, subtle) */}
      <div className="absolute inset-0 rounded-full border border-[#4A7BFF]/10" />
      <div className="absolute inset-2 rounded-full border border-[#6C5CE7]/10" />
      <div className="absolute inset-4 rounded-full border border-[#4A7BFF]/5" />

      {/* Center placeholder content */}
      <div className="relative flex flex-col items-center gap-2">
        {/* Logo icon */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
          className="opacity-80"
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

        {/* Placeholder label */}
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B80]">
          Animation
        </span>
      </div>

      {/* Corner markers — technical aesthetic */}
      <div className="absolute left-3 top-3 h-2 w-2 border-l border-t border-[#4A7BFF]/30" />
      <div className="absolute right-3 top-3 h-2 w-2 border-r border-t border-[#4A7BFF]/30" />
      <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[#4A7BFF]/30" />
      <div className="absolute bottom-3 right-3 h-2 w-2 border-b border-r border-[#4A7BFF]/30" />
    </div>
  );
}
