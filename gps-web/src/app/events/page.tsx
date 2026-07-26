"use client";

import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Calendar, Music, Trophy, BookOpen, Star } from "lucide-react";

export default function EventsPage() {
  const upcomingEvents = [
    { date: "Aug 15, 2026", title: "Independence Day Celebration", desc: "Flag hoisting ceremony, cultural performances, and patriotic song competitions across all grades.", category: "National" },
    { date: "Sep 5, 2026", title: "Teachers Day Programme", desc: "Senior students host a special assembly celebrating the teaching profession with performances and felicitations.", category: "Cultural" },
    { date: "Oct 2, 2026", title: "Gandhi Jayanti and Eco Drive", desc: "Campus cleanliness drive, essay competitions, and a plantation initiative in memory of the Mahatma.", category: "National" },
    { date: "Nov 14, 2026", title: "Childrens Day Festivities", desc: "Inter-house talent shows, sports games, art competitions, and special lunch arranged for all students.", category: "Cultural" },
    { date: "Dec 2026", title: "Aureate Gala - Annual Day", desc: "Our flagship annual celebration featuring dance, drama, music, and academic awards for the year.", category: "Annual" },
    { date: "Jan-Feb 2027", title: "Board Examination Preparation", desc: "Special revision sessions, model exams, and counselling for Class X and XII board candidates.", category: "Academic" },
  ];

  return (
    <div className="min-h-screen bg-transparent pt-36 pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-20 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">School Calendar</span>
          <h1 className="text-heading-lg text-white font-black">Events &amp; <span className="text-gold-gradient">Programmes</span></h1>
          <p className="text-subheading text-white/70 mt-4 max-w-2xl mx-auto tracking-tight">Stay updated with upcoming celebrations, academic milestones, cultural shows, and sporting events at Greets Public School.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, i) => (
            <LiquidGlassCard key={i} className="p-8 flex flex-col gap-4" options={{ scale: -80 }}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">{event.category}</span>
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">{event.date}</span>
                <h3 className="text-lg font-extrabold uppercase text-white tracking-wide mb-2">{event.title}</h3>
                <p className="text-body-sm text-white/70 leading-relaxed tracking-tight">{event.desc}</p>
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        <LiquidGlassCard className="mt-20 p-8 sm:p-12 text-center max-w-3xl mx-auto flex flex-col items-center gap-6" options={{ scale: -80 }}>
          <Calendar className="w-8 h-8 text-accent" />
          <h3 className="text-xl font-extrabold uppercase text-white tracking-wider">Full Academic Calendar</h3>
          <p className="text-body-sm text-white/70 max-w-md leading-relaxed">Download our complete academic calendar PDF for the 2026-27 session.</p>
          <a href="https://gps.ac.in/wp-content/uploads/2026/06/Aca-cal_19062026150755.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-accent border border-accent text-navy-deep hover:bg-accent/90 font-bold uppercase tracking-wider px-8 py-3 text-xs rounded-full shadow-lg transition-all hover:scale-105">
            Download Calendar PDF
          </a>
        </LiquidGlassCard>
      </div>
    </div>
  );
}
