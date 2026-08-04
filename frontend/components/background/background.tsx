import React from "react";

export default function Background(): React.ReactNode {
 return (
   <>
     <style>{`
       @keyframes float-slow {
         0%, 100% { transform: translate(0, 0); }
         50% { transform: translate(20px, -15px); }
       }
       @keyframes drift {
         0% { transform: translate(0, 0) rotate(0deg); }
         33% { transform: translate(15px, 10px) rotate(0.5deg); }
         66% { transform: translate(-10px, 5px) rotate(-0.3deg); }
         100% { transform: translate(0, 0) rotate(0deg); }
       }
       .bg-grid-overlay {
         background-image:
           linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
         background-size: 60px 60px;
       }
       .bg-noise-overlay {
         background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
       }
     `}</style>

     <div
       aria-hidden="true"
       className="fixed inset-0 -z-50 overflow-hidden pointer-events-none"
     >
       {/* Deep dark base */}
       <div className="absolute inset-0 bg-black" />

       {/* Ambient radial glow — top center */}
       <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] animate-[drift_30s_ease-in-out_infinite]" />

       {/* Ambient radial glow — bottom right */}
       <div className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[500px] rounded-full bg-indigo-500/5 blur-[100px] animate-[float-slow_25s_ease-in-out_infinite]" />

       {/* Ambient radial glow — left middle */}
       <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-[100px] animate-[drift_35s_ease-in-out_infinite]" />

       {/* Subtle vignette depth */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

       {/* Grid overlay */}
       <div className="absolute inset-0 bg-grid-overlay opacity-[0.03]" />

       {/* Noise overlay */}
       <div className="absolute inset-0 bg-noise-overlay opacity-[0.025]" />
     </div>
   </>
 );
}
