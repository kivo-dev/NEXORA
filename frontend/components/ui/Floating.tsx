"use client";

import React from "react";
import { motion } from "framer-motion";

export interface FloatingProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}

export function Floating({
  children,
  duration = 4,
  distance = 10,
  className,
}: FloatingProps): React.ReactElement {
  return (
    <motion.div
      className={className}
      animate={{ y: [-distance, distance] }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {children}
    </motion.div>
  );
}