"use client";

import React from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Inline network icons (no external deps)                           */
/* ------------------------------------------------------------------ */

function EthereumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L4.5 12.3 12 16.5l7.5-4.2L12 2zM4.5 13.5L12 22l7.5-8.5-7.5 4.2-7.5-4.2z" />
    </svg>
  );
}

function BitcoinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 11h-2V9h2v2zm0 2h-2v2h2v-2zm2-6.5V3h-2v2.5h-1V3h-2v2.5H9c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h1V22h2v-3.5h1V22h2v-3.5h1c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-1z" />
    </svg>
  );
}

function SolanaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 15.5L8.5 11H20l-4.5 4.5H4zM4 8.5L8.5 4H20l-4.5 4.5H4zM4 13h11.5L20 17.5H8.5L4 13z" />
    </svg>
  );
}

function StellarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PolygonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbit ring component                                               */
/* ------------------------------------------------------------------ */

interface OrbitRingProps {
  size: number;
  duration: number;
  reverse?: boolean;
  children: React.ReactNode;
}

function OrbitRing({ size, duration, reverse, children }: OrbitRingProps) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
      style={{ width: size, height: size }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Network node positioned on an orbit                                */
/* ------------------------------------------------------------------ */

interface NodeProps {
  angle: number;
  radius: number;
  icon: React.ReactNode;
  color: string;
}

function Node({ angle, radius, icon, color }: NodeProps) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <motion.div
      className="absolute flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] shadow-lg backdrop-blur-md sm:h-9 sm:w-9"
      style={{
        left: `calc(50% + ${x}px - 16px)`,
        top: `calc(50% + ${y}px - 16px)`,
        backgroundColor: `${color}15`,
        boxShadow: `0 0 20px -4px ${color}30`,
      }}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }}>
        {icon}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export interface BlockchainOrbProps {
  className?: string;
}

export function BlockchainOrb({ className = "" }: BlockchainOrbProps): React.ReactElement {
  return (
    <div className={`relative flex aspect-square w-full max-w-[480px] items-center justify-center ${className}`}>
      {/* Ambient glow behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl"
      />

      {/* Inner orbit ring */}
      <OrbitRing size={160} duration={30}>
        <Node
          angle={45}
          radius={80}
          icon={<EthereumIcon />}
          color="#627EEA"
        />
        <Node
          angle={225}
          radius={80}
          icon={<SolanaIcon />}
          color="#14F195"
        />
      </OrbitRing>

      {/* Middle orbit ring */}
      <OrbitRing size={240} duration={45} reverse>
        <Node
          angle={120}
          radius={120}
          icon={<BitcoinIcon />}
          color="#F7931A"
        />
        <Node
          angle={300}
          radius={120}
          icon={<PolygonIcon />}
          color="#8247E5"
        />
      </OrbitRing>

      {/* Outer orbit ring */}
      <OrbitRing size={320} duration={60}>
        <Node
          angle={200}
          radius={160}
          icon={<StellarIcon />}
          color="#3E1CDB"
        />
      </OrbitRing>

      {/* Central orb */}
      <motion.div
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glow layers */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-400/10 blur-lg"
        />
        {/* Core */}
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-2xl backdrop-blur-xl">
          <span className="text-lg font-bold tracking-tight text-white/90 sm:text-xl">
            N
          </span>
        </div>
      </motion.div>
    </div>
  );
}
