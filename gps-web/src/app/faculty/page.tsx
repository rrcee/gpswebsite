"use client";

import { faculty } from "@/lib/data/faculty";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Users, GraduationCap } from "lucide-react";

export default function FacultyPage() {
  return (
    <div className="min-h-screen bg-transparent pt-36 pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">
            Dedicated Educators
          </span>
          <h1 className="text-heading-lg text-white font-black">
            Our <span className="text-gold-gradient">Faculty Directory</span>
          </h1>
          <p className="text-subheading text-white/70 mt-4 max-w-2xl mx-auto tracking-tight">
            Meet the academic directors, subject lecturers, and kindergarten guides who shape characters and mentor our students toward excellence.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {faculty.map((member, i) => (
            <LiquidGlassCard key={i} className="p-6 flex flex-col justify-between h-[200px]" options={{ scale: -75 }}>
              <div>
                <span className="text-[10px] font-bold text-accent tracking-widest uppercase block mb-1.5 flex items-center gap-1">
                  <Users className="w-3 h-3" /> {member.role || "Educator"}
                </span>
                <h4 className="text-base font-extrabold uppercase text-white tracking-wide leading-snug">
                  {member.name}
                </h4>
              </div>
              
              {member.qualification && (
                <div className="mt-4 pt-3 border-t border-white/5 flex items-start gap-2 text-white/60">
                  <GraduationCap className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider leading-relaxed">
                    {member.qualification}
                  </span>
                </div>
              )}
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
