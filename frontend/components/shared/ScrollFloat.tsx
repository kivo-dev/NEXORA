"use client";

import React, { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollFloatProps {
  children: ReactNode;
  /** Vertical drift in pixels as the section enters/leaves the viewport. */
  intensity?: number;
  /** Extra downward offset before scale/fade kick in — use for staggering
   *  multiple sections so they don't all move in lockstep. */
  delay?: number;
  className?: string;
}

/**
 * Wraps a section so it drifts and fades gently as the user scrolls it
 * into and out of view — the floating, cosmic continuation of the hero.
 * Usage: wrap each section on the landing page individually, e.g.
 *   <ScrollFloat><FeaturesSection /></ScrollFloat>
 *   <ScrollFloat intensity={60} delay={0.05}><HowItWorksSection /></ScrollFloat>
 */
export function ScrollFloat({
  children,
  intensity = 40,
  delay = 0,
  className,
}: ScrollFloatProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [intensity, -delay * 20, -intensity]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.15, 1], [0.96, 1, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className={className}>
      {children}
    </motion.div>
  );
}
