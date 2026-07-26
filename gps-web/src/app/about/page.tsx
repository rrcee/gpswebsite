"use client";

import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Award, Compass, Heart, Users } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-36 pb-16 sm:pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-12 sm:mb-20 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">
            Who We Are
          </span>
          <h1 className="text-heading-lg text-white font-black">
            Our <span className="text-gold-gradient">Story & Legacy</span>
          </h1>
          <p className="text-subheading text-white/70 mt-4 max-w-2xl mx-auto tracking-tight">
            Nurturing young minds in Kochi since 1985, Greets Public School has grown from a local kindergarten to a CBSE educational hub.
          </p>
        </ScrollReveal>

        {/* Vision, Mission, Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-24">
          <LiquidGlassCard className="p-8 sm:p-10 flex flex-col justify-between" options={{ scale: -80 }}>
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-extrabold uppercase text-white tracking-wider mb-4">Our Vision</h3>
              <p className="text-body-sm text-white/80 leading-relaxed tracking-tight">
                To develop future citizens who are intellectually competent, morally upright, socially committed, and spiritually inspired. We aspire to build a culture of excellence, self-awareness, and constant growth in every student.
              </p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-8 sm:p-10 flex flex-col justify-between" options={{ scale: -80 }}>
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-extrabold uppercase text-white tracking-wider mb-4">Our Mission</h3>
              <p className="text-body-sm text-white/80 leading-relaxed tracking-tight">
                To provide a stimulating learning environment that inspires academic curiosity, fosters critical thinking, and empowers students to discover their potential to make constructive contributions to society.
              </p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Timeline Milestones Section */}
        <div className="space-y-12">
          <div className="text-center sm:text-left mb-12">
            <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">Milestones</span>
            <h2 className="text-heading text-white font-extrabold">Chronological Evolution</h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-3" />
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-8 sm:space-y-12 py-4">
            {[
              {
                year: "1985",
                title: "Bethel Foundation Initiative & Establishment",
                desc: "Bethel Foundation establishes 'Ding Dong Kindergarten' and begins schooling, laying the groundwork for academic excellence in Kochi.",
                icon: <Users className="w-5 h-5 text-accent" />
              },
              {
                year: "1986",
                title: "Formal English Schooling",
                desc: "Reorganized and formally established as an English Medium school, broadening the curriculum scope to primary grade classes.",
                icon: <Compass className="w-5 h-5 text-accent" />
              },
              {
                year: "1991",
                title: "CBSE Affiliation Secured",
                desc: "Greets Public School achieves formal CBSE affiliation (Affiliation No: 930080), establishing high school and senior secondary divisions.",
                icon: <Award className="w-5 h-5 text-accent" />
              },
              {
                year: "2026",
                title: "41 Years of Academic Service",
                desc: "Celebrating 41 years of educational service and holistic leadership. Re-engineering our portal and campus for digital-first pedagogy.",
                icon: <Heart className="w-5 h-5 text-accent" />
              }
            ].map((milestone, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                {/* Timeline Circle */}
                <div className="absolute -left-[21px] top-1.5 w-10 h-10 rounded-full bg-navy-deep border-2 border-white/20 flex items-center justify-center z-10 shadow-lg">
                  {milestone.icon}
                </div>

                {/* Left side Absolute Year for Desktop */}
                <div className="hidden md:block absolute -left-[140px] top-2 text-right w-24">
                  <span className="text-2xl font-black text-gold-gradient tracking-tight">{milestone.year}</span>
                </div>

                {/* Content Card */}
                <LiquidGlassCard className="p-6 sm:p-8" options={{ scale: -75 }}>
                  <div className="md:hidden mb-2">
                    <span className="text-xl font-black text-gold-gradient tracking-tight">{milestone.year}</span>
                  </div>
                  <h4 className="text-base font-extrabold uppercase text-white tracking-wide mb-2">
                    {milestone.title}
                  </h4>
                  <p className="text-body-sm text-white/70 leading-relaxed tracking-tight">
                    {milestone.desc}
                  </p>
                </LiquidGlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
