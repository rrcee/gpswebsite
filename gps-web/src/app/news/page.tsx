"use client";

import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Newspaper, Award, BookOpen, Star } from "lucide-react";

export default function NewsPage() {
  const newsItems = [
    { date: "Jul 2026", title: "Class XII Board Results 2025-26", desc: "Greets Public School achieves outstanding board results with 98% pass rate and 12 distinctions in Science and Commerce streams.", tag: "Results" },
    { date: "Jun 2026", title: "New Smart Classroom Wing Inauguration", desc: "The school inaugurates its newly constructed block with 8 additional air-conditioned smart classrooms, expanding capacity for the upcoming academic year.", tag: "Infrastructure" },
    { date: "May 2026", title: "Aureate Gala 2025-26 Highlights", desc: "The annual day Aureate Gala 2025-26 was a spectacular showcase of student talent in dance, drama, music, and oratory.", tag: "Events" },
    { date: "Apr 2026", title: "CBSE Science Exhibition Winners", desc: "Students from Grade IX and XI secured 1st and 2nd position at the Regional CBSE Science Exhibition held in Ernakulam.", tag: "Achievement" },
    { date: "Mar 2026", title: "Admissions Open for 2026-27", desc: "Greets Public School officially opens admissions for all grades from Kindergarten to Class XII for the academic year 2026-27.", tag: "Admissions" },
    { date: "Feb 2026", title: "Republic Day Cultural Parade Award", desc: "The school contingent represented Kaloor at the District Republic Day parade and was awarded for best drill performance.", tag: "Achievement" },
  ];

  return (
    <div className="min-h-screen bg-transparent pt-36 pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-20 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">Latest Updates</span>
          <h1 className="text-heading-lg text-white font-black">School <span className="text-gold-gradient">News</span></h1>
          <p className="text-subheading text-white/70 mt-4 max-w-2xl mx-auto tracking-tight">Stay informed with the latest achievements, announcements, and highlights from Greets Public School.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsItems.map((item, i) => (
            <LiquidGlassCard key={i} className="p-8 flex flex-col gap-4" options={{ scale: -80 }}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">{item.tag}</span>
                <Newspaper className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">{item.date}</span>
                <h3 className="text-lg font-extrabold uppercase text-white tracking-wide mb-2">{item.title}</h3>
                <p className="text-body-sm text-white/70 leading-relaxed tracking-tight">{item.desc}</p>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
