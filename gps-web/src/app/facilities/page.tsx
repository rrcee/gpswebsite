"use client";

import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Monitor, FlaskConical, BookOpen, Bus, Shield, Utensils, Zap, Play } from "lucide-react";

const facilityDetails = [
  {
    title: "Air-Conditioned Smart Classrooms",
    spec: "37 Classrooms | 7,784 sq.m total area",
    desc: "Fully air-conditioned, digitally enabled smart classrooms. Equipped with interactive screens, digital projectors, and ergonomic seating to create a comfortable, interactive, and media-rich learning environment.",
    icon: <Monitor className="w-6 h-6 text-accent" />
  },
  {
    title: "Science & Mathematics Laboratories",
    spec: "Physics: 78 sq.m | Chemistry: 103 sq.m | Biology: 103 sq.m | Maths: 36 sq.m",
    desc: "State-of-the-art laboratory spaces containing scientific instruments, specimens, safety equipment, and practical study counters. Direct hands-on learning helps solidify textbook science concepts.",
    icon: <FlaskConical className="w-6 h-6 text-accent" />
  },
  {
    title: "Central Library Hub",
    spec: "Senior: 148 sq.m | Junior: 78 sq.m | 13,000+ Volumes",
    desc: "A massive knowledge catalog containing encyclopedias, reference texts, research periodicals, and digital reading monitors. The junior reading room is dedicated to early literacy and storytelling.",
    icon: <BookOpen className="w-6 h-6 text-accent" />
  },
  {
    title: "Safe Transport System",
    spec: "AC Buses | GPS Trackers | CCTV Monitors",
    desc: "A professional school transport system. All buses are fully air-conditioned and fitted with high-definition security cameras, live GPS position trackers, and trained drivers/conductors.",
    icon: <Bus className="w-6 h-6 text-accent" />
  },
  {
    title: "Campus Security & CCTV",
    spec: "CCTV Surveillance | Security Guards 24/7",
    desc: "The campus is monitored by high-definition cameras spanning corridors, classrooms, gates, and play fields. Access control gates secure the entrance at Kaloor.",
    icon: <Shield className="w-6 h-6 text-accent" />
  },
  {
    title: "School Cafeteria & Nutrition",
    spec: "Hygienic Dining | Nutritional Menus",
    desc: "Provides wholesome meals, hot beverages, and fresh snacks prepared under strict sanitation guidelines. Menu structures are verified to support student health.",
    icon: <Utensils className="w-6 h-6 text-accent" />
  },
  {
    title: "Uninterrupted Power Backup",
    spec: "Central Generator | 100% Load Backup",
    desc: "Equipped with large central diesel generators and automatic UPS systems. Ensures classrooms, smartboards, and labs run smoothly during grid power outages.",
    icon: <Zap className="w-6 h-6 text-accent" />
  },
  {
    title: "Sports Fields & Activity Playgrounds",
    spec: "Indoor Games | Basketball | Play Parks",
    desc: "Spacious play areas and indoor activity spaces configured for badminton, basketball, chess, table tennis, and specialized kindergarten play equipment.",
    icon: <Play className="w-6 h-6 text-accent" />
  }
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-transparent pt-36 pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">
            Infrastructure & Environment
          </span>
          <h1 className="text-heading-lg text-white font-black">
            Campus <span className="text-gold-gradient">Facilities</span>
          </h1>
          <p className="text-subheading text-white/70 mt-4 max-w-2xl mx-auto tracking-tight">
            Our campus features air-conditioned smart spaces, fully equipped laboratories, and rigorous security structures to foster creative potential.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilityDetails.map((fac, i) => (
            <LiquidGlassCard key={i} className="p-8 sm:p-10 flex flex-col justify-between" options={{ scale: -85 }}>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {fac.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold uppercase text-white tracking-wide">{fac.title}</h3>
                    <span className="text-[10px] font-bold text-accent/70 tracking-wider uppercase block mt-0.5">
                      {fac.spec}
                    </span>
                  </div>
                </div>
                <p className="text-body-sm text-white/75 leading-relaxed tracking-tight">
                  {fac.desc}
                </p>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
