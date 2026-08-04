"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  x,
  once = true,
  className,
}: RevealProps): React.ReactElement {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: x === undefined ? y : 0,
      x: x !== undefined ? x : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
