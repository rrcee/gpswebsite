"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { useState, useEffect } from "react";

const CYCLING_WORDS = [
  "Grows Here",
  "Begins Here",
  "Thrives Here",
  "Leads Here",
  "Excels Here",
];

export function Hero() {
  const triggerInquiry = () => {
    window.dispatchEvent(new CustomEvent("open-inquiry-drawer"));
  };

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-12">
        {/* Floating Capsule Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] border border-white/10 px-5 py-2 shadow-xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-xs font-bold text-accent tracking-widest uppercase">
              Admissions Open 2026 - 27
            </span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center w-full max-w-5xl"
        >
          <h1 className="text-display text-white w-full tracking-tighter">
            Learning{" "}
            <br className="sm:hidden" />
            {/* Animated cycling word */}
            <span className="inline-block relative" style={{ minWidth: "8ch" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="text-gold-gradient font-black"
                >
                  {CYCLING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </motion.div>

        {/* Hero Subtitle description */}
        <motion.p
          className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Educational Efficacy & Holistic Development in the Heart of Kochi. Nurturing academic excellence, character development, and scientific curiosity since 1986.
        </motion.p>

        {/* Interactive Call to Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full px-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            onClick={triggerInquiry}
            className="w-full sm:w-auto bg-accent border-accent text-navy-deep hover:bg-accent/90 font-bold uppercase tracking-wider px-8 py-5 sm:py-6 text-sm rounded-full shadow-2xl cursor-pointer"
          >
            Apply Online Now
          </Button>
          <Button 
            variant="outline"
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-wider px-8 py-5 sm:py-6 text-sm rounded-full cursor-pointer"
          >
            <Link href="#facilities">Explore Facilities</Link>
          </Button>
        </motion.div>

        {/* Parallax Bento Showcase Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 50 }}
          className="w-full max-w-4xl pt-4 sm:pt-8 z-10"
        >
          <LiquidGlassCard className="p-5 sm:p-8 md:p-12 text-left" options={{ scale: -80, blur: 5 }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="pt-6 md:pt-0">
                <span className="text-[10px] font-bold text-accent tracking-widest uppercase block mb-1">Affiliation</span>
                <h4 className="text-lg font-extrabold uppercase text-white">CBSE Affiliated</h4>
                <p className="text-xs text-white/60 mt-1 uppercase font-semibold">Upto Senior Secondary</p>
              </div>
              <div className="pt-6 md:pt-0 sm:pl-8">
                <span className="text-[10px] font-bold text-accent tracking-widest uppercase block mb-1">Academics</span>
                <h4 className="text-lg font-extrabold uppercase text-white">Science & Commerce</h4>
                <p className="text-xs text-white/60 mt-1 uppercase font-semibold">Specialized Electives</p>
              </div>
              <div className="pt-6 md:pt-0 md:pl-8">
                <span className="text-[10px] font-bold text-accent tracking-widest uppercase block mb-1">Key Focus</span>
                <h4 className="text-lg font-extrabold uppercase text-white">Holistic Method</h4>
                <p className="text-xs text-white/60 mt-1 uppercase font-semibold">AI, STEM, Sports & Clubs</p>
              </div>
            </div>
          </LiquidGlassCard>
        </motion.div>
      </div>
      
      {/* Decorative radial gradients for glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
    </section>
  );
}
