"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
 motion,
 useScroll,
 useTransform,
 useMotionValue,
 useSpring,
} from "framer-motion";

function sr(seed: number): number {
 const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
 return x - Math.floor(x);
}

export function StarsBackground(): React.ReactElement {
 const [reducedMotion, setReducedMotion] = useState(false);
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
   const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
   setReducedMotion(mq.matches);
   const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
   mq.addEventListener("change", onChange);

   const check = () => setIsMobile(window.innerWidth < 768);
   check();
   window.addEventListener("resize", check);

   return () => {
     mq.removeEventListener("change", onChange);
     window.removeEventListener("resize", check);
   };
 }, []);

 const { scrollY } = useScroll();
 const mouseX = useMotionValue(0);
 const mouseY = useMotionValue(0);
 const smoothMouseX = useSpring(mouseX, { damping: 60, stiffness: 120 });
 const smoothMouseY = useSpring(mouseY, { damping: 60, stiffness: 120 });

 useEffect(() => {
   const onMove = (e: MouseEvent) => {
     mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
     mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
   };
   window.addEventListener("mousemove", onMove);
   return () => window.removeEventListener("mousemove", onMove);
 }, [mouseX, mouseY]);

 const nebulaY1 = useTransform(scrollY, [0, 5000], [0, 40]);
 const nebulaY2 = useTransform(scrollY, [0, 5000], [0, -60]);
 const nebulaY3 = useTransform(scrollY, [0, 5000], [0, 80]);
 const centerGlowY = useTransform(scrollY, [0, 5000], [0, 30]);
 const starLayerY = useTransform(scrollY, [0, 5000], [0, -100]);
 const particleLayerY = useTransform(scrollY, [0, 5000], [0, -150]);

 const mx1 = useTransform(smoothMouseX, (v) => v * 4);
 const my1 = useTransform(smoothMouseY, (v) => v * 3);
 const mx2 = useTransform(smoothMouseX, (v) => v * -5);
 const my2 = useTransform(smoothMouseY, (v) => v * -2);
 const mx3 = useTransform(smoothMouseX, (v) => v * 2);
 const my3 = useTransform(smoothMouseY, (v) => v * 4);

 const starCount = isMobile ? 80 : 280;
 const particleCount = isMobile ? 10 : 28;

 const stars = useMemo(() => {
   return Array.from({ length: starCount }, (_, i) => ({
     id: i,
     x: sr(i * 3) * 100,
     y: sr(i * 3 + 1) * 100,
     size: 1 + sr(i * 3 + 2) * 2.5,
     delay: sr(i * 7) * 5,
     duration: 3 + sr(i * 11) * 5,
   }));
 }, [starCount]);

 const particles = useMemo(() => {
   return Array.from({ length: particleCount }, (_, i) => ({
     id: i,
     x: sr(i * 17) * 100,
     y: sr(i * 17 + 1) * 100,
     size: 2 + sr(i * 17 + 2) * 4,
     duration: 18 + sr(i * 17 + 3) * 24,
     xOffset: (sr(i * 17 + 4) - 0.5) * 50,
     yOffset: (sr(i * 17 + 5) - 0.5) * 50,
     delay: sr(i * 17 + 6) * 12,
   }));
 }, [particleCount]);

 if (reducedMotion) {
   return (
     <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#02040a]">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(30,27,75,0.3),transparent_60%)]" />
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(168,85,247,0.05),transparent_50%)]" />
     </div>
   );
 }

 return (
   <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#02040a]">
     <style>{`
       @keyframes starTwinkle {
         0%, 100% { opacity: 0.9; transform: scale(1); }
         50% { opacity: 0.15; transform: scale(0.7); }
       }
     `}</style>

     <div className="absolute inset-0 bg-[#02040a]" />

     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(30,27,75,0.35),transparent_65%)]" />

     <motion.div
       className="absolute left-[15%] top-[5%] h-[550px] w-[550px] rounded-full"
       style={{
         background:
           "radial-gradient(circle, rgba(99,102,241,0.14), transparent 70%)",
         filter: "blur(90px)",
         y: nebulaY1,
         x: mx1,
       }}
       animate={{ scale: [1, 1.05, 1] }}
       transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
     />

     <motion.div
       className="absolute right-[5%] top-[25%] h-[650px] w-[650px] rounded-full"
       style={{
         background:
           "radial-gradient(circle, rgba(168,85,247,0.10), transparent 70%)",
         filter: "blur(110px)",
         y: nebulaY2,
         x: mx2,
       }}
       animate={{ scale: [1, 1.08, 1] }}
       transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
     />

     <motion.div
       className="absolute bottom-[5%] left-[25%] h-[450px] w-[450px] rounded-full"
       style={{
         background:
           "radial-gradient(circle, rgba(129,140,248,0.09), transparent 70%)",
         filter: "blur(80px)",
         y: nebulaY3,
         x: mx3,
       }}
       animate={{ scale: [1, 1.04, 1] }}
       transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
     />

     <motion.div
       className="absolute left-1/2 top-[35%] h-[350px] w-[350px] -translate-x-1/2 rounded-full"
       style={{
         background:
           "radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)",
         filter: "blur(70px)",
         y: centerGlowY,
       }}
     />

     <motion.div className="absolute inset-0" style={{ y: starLayerY }}>
       {stars.map((s) => (
         <div
           key={s.id}
           className="absolute rounded-full bg-white will-change-transform"
           style={{
             left: `${s.x}%`,
             top: `${s.y}%`,
             width: s.size,
             height: s.size,
             animation: `starTwinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
           }}
         />
       ))}
     </motion.div>

     <motion.div className="absolute inset-0" style={{ y: particleLayerY }}>
       {particles.map((p) => (
         <motion.div
           key={p.id}
           className="absolute rounded-full bg-indigo-200 will-change-transform"
           style={{
             left: `${p.x}%`,
             top: `${p.y}%`,
             width: p.size,
             height: p.size,
             opacity: 0.12,
             filter: "blur(1px)",
           }}
           animate={{
             x: [0, p.xOffset, 0],
             y: [0, p.yOffset, 0],
           }}
           transition={{
             duration: p.duration,
             delay: p.delay,
             repeat: Infinity,
             ease: "easeInOut",
           }}
         />
       ))}
     </motion.div>

     <div
       className="absolute inset-0 opacity-[0.015]"
       style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
       }}
     />

     <div
       className="absolute left-[-10%] top-[15%] h-[500px] w-[500px] rounded-full"
       style={{
         background:
           "radial-gradient(circle, rgba(196,181,253,0.08), transparent 70%)",
         filter: "blur(90px)",
         opacity: 0.2,
       }}
     />

     <div
       className="absolute right-[-5%] bottom-[10%] h-[400px] w-[400px] rounded-full"
       style={{
         background:
           "radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)",
         filter: "blur(80px)",
         opacity: 0.15,
       }}
     />

     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,4,10,0.5)_100%)]" />
   </div>
 );
}
