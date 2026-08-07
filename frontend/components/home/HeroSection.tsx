"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { GalaxyScene3D } from "@/components/home/GalaxyScene3D";
import { StarsBackground } from"@/components/home/StarsBackground"; 
export function HeroSection(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90dvh]items-center overflow-hidden bg-transparent"
    >
      <StarsBackground />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.08),transparent_70%)] blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_70%)] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-16 lg:py-0">
        <div className="grid min-h-[90dvh] grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left"
            style={{ y: parallaxY }}
          >
            <motion.div style={{ x: smoothX, y: smoothY }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-purple-300/80 backdrop-blur-md"
              > 
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
                AI-Powered Financial Intelligence
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
                className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl lg:leading-[1.08]"
              >See Beyond
                
                <br />
                {" "}
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Your Assets
                </span>
                <br />
                Reveal Hidden Insights
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="mt-6 max-w-md text-base leading-relaxed text-white/45 sm:text-lg"
              >
                Nexora transforms blockchain data into clear, explainable and
                trustworthy financial intelligence powered by ai...
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
                className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
              >
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50"
                >
                  Get Started
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/#features"
                  className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-transparent px-8 py-3.5 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  Learn More
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 flex items-center justify-center gap-6 text-xs text-white/30 lg:justify-start"
              >
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Read-only
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Explainable
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Secure
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="relative flex h-[50vh] w-full items-center justify-center lg:h-full">
            <GalaxyScene3D />
          </div>
        </div>
      </div>
    </section>
  );
}
