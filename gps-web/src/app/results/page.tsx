"use client";

import { results } from "@/lib/data/results";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import React, { useState } from "react";
import { Star, Trophy, Award } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ResultsPage() {
  const years = Object.keys(results).sort((a, b) => parseInt(b) - parseInt(a));
  const [activeYear, setActiveYear] = useState(years[0] || "2025");

  const toppers = (results as any)[activeYear] || [];

  return (
    <div className="min-h-screen bg-transparent pt-36 pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-16 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">
            Academic Toppers
          </span>
          <h1 className="text-heading-lg text-white font-black">
            Board <span className="text-gold-gradient">Results</span>
          </h1>
          <p className="text-subheading text-white/70 mt-4 max-w-2xl mx-auto tracking-tight">
            Celebrating the academic excellence and dedicated hard work of our students in the CBSE Class X and Class XII examinations.
          </p>
        </ScrollReveal>

        {/* Year Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap justify-center rounded-full bg-white/[0.03] border border-white/10 p-1 gap-1">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  activeYear === year
                    ? "bg-accent text-navy-deep shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Toppers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toppers.map((member: any, i: number) => (
            <div key={`${activeYear}-${i}`} className="p-6 flex flex-col justify-between h-[280px] relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 shadow-2xl hover:border-white/25 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:scale-101">
              {/* Top Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-accent tracking-widest uppercase block flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-accent" /> Topper
                  </span>
                  <div className="flex gap-0.5 text-accent">
                    <Star className="w-3 h-3 fill-accent" />
                    <Star className="w-3 h-3 fill-accent" />
                    <Star className="w-3 h-3 fill-accent" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-base font-extrabold uppercase text-white tracking-wide leading-tight">
                    {member.name}
                  </h4>
                  <p className="text-[10px] text-white/50 font-bold uppercase mt-1">
                    {member.role || "Board Topper"}
                  </p>
                </div>
              </div>

              {/* Bottom Percentage/Score Section */}
              {member.qualification && (
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Score</span>
                  </div>
                  <span className="text-lg font-black text-gold-gradient tracking-tight">
                    {member.qualification}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
