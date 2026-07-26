"use client";

import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar with ease-out
    const duration = 2000;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(eased * 100, 100));

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setVisible(false), 800);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#080E21",
        opacity: fading ? 0 : 1,
        transition: fading ? "opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Subtle grid pattern — matches CTA section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Radial center glow — very subtle, monochrome */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glassmorphic logo container */}
        <div
          className="relative mb-10"
          style={{ animation: "splash-logo-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both" }}
        >
          {/* Outer pulse ring */}
          <div
            className="absolute inset-0 rounded-2xl border border-white/5"
            style={{ animation: "splash-ring 2.5s ease-in-out infinite", transform: "scale(1.15)" }}
          />
          
          {/* Glass card container — matches liquid-glass-card style */}
          <div
            className="w-28 h-28 rounded-2xl flex items-center justify-center relative"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow:
                "inset 0 1px 1px 0 rgba(255,255,255,0.35), inset 0 -1px 2px 0 rgba(0,0,0,0.4), 0 20px 40px -15px rgba(0,0,0,0.5)",
            }}
          >
            <span
              className="font-black select-none text-gold-gradient"
              style={{
                fontSize: "2.5rem",
                letterSpacing: "-0.05em",
              }}
            >
              GPS
            </span>
          </div>
        </div>

        {/* School name — matches hero and section heading style */}
        <div
          style={{ animation: "splash-fade-up 0.6s 0.25s cubic-bezier(0.22, 1, 0.36, 1) both" }}
          className="text-center mb-3"
        >
          <h1
            className="font-black uppercase text-white select-none tracking-tighter"
            style={{ fontSize: "clamp(20px, 3.5vw, 30px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Greets Public School
          </h1>
        </div>

        {/* Capsule badge — matches hero badge */}
        <div
          style={{ animation: "splash-fade-up 0.6s 0.45s cubic-bezier(0.22, 1, 0.36, 1) both" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/10 px-5 py-2 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold text-accent tracking-widest uppercase select-none">
              Excellence in Education
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="mt-12"
          style={{ animation: "splash-fade-up 0.6s 0.6s cubic-bezier(0.22, 1, 0.36, 1) both" }}
        >
          <div
            className="rounded-full overflow-hidden"
            style={{
              width: "160px",
              height: "2px",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "rgba(255,255,255,0.4)",
                boxShadow: "0 0 8px rgba(255,255,255,0.15)",
                transition: "width 16ms linear",
              }}
            />
          </div>
          <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase text-center mt-4 select-none font-bold">
            Loading
          </p>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes splash-ring {
          0%, 100% { opacity: 0.3; transform: scale(1.15); }
          50% { opacity: 0.08; transform: scale(1.25); }
        }
        @keyframes splash-logo-in {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes splash-fade-up {
          from { transform: translateY(12px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
