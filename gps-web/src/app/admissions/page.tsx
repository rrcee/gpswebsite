"use client";

import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Button } from "@/components/ui/button";
import { FileText, ClipboardList, Eye, CheckSquare, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function AdmissionsPage() {
  const triggerInquiry = () => {
    window.dispatchEvent(new CustomEvent("open-inquiry-drawer"));
  };

  return (
    <div className="min-h-screen bg-transparent pt-36 pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-20 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">
            Enrollment 2026-27
          </span>
          <h1 className="text-heading-lg text-white font-black">
            Admission <span className="text-gold-gradient">Guidelines</span>
          </h1>
          <p className="text-subheading text-white/70 mt-4 max-w-2xl mx-auto tracking-tight">
            Review our academic eligibility, standard fee schedule, and four-step registration process to enroll your child.
          </p>
        </ScrollReveal>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            {
              step: "01",
              title: "Online Enquiry",
              desc: "Submit an online inquiry details regarding stream interest, or call our coordinator desk.",
              icon: <ClipboardList className="w-5 h-5 text-accent" />
            },
            {
              step: "02",
              title: "Campus Interaction",
              desc: "Schedule a physical tour to inspect laboratories, digital classrooms, and discuss methods.",
              icon: <Eye className="w-5 h-5 text-accent" />
            },
            {
              step: "03",
              title: "Form Submission",
              desc: "Fill in the application details and attach birth certificates, transcripts, and TC documents.",
              icon: <FileText className="w-5 h-5 text-accent" />
            },
            {
              step: "04",
              title: "Confirmation",
              desc: "An informal coordinator chat to check student interest, followed by fee payment confirmation.",
              icon: <CheckSquare className="w-5 h-5 text-accent" />
            }
          ].map((item, i) => (
            <LiquidGlassCard key={i} className="p-6 flex flex-col justify-between h-[250px]" options={{ scale: -75 }}>
              <div>
                <span className="text-xs font-bold text-accent/50 tracking-widest block mb-2">Step {item.step}</span>
                <h3 className="text-lg font-extrabold uppercase text-white tracking-wide mb-3">{item.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed tracking-tight">{item.desc}</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mt-4">
                {item.icon}
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* Fee Structure Table */}
        <div id="fees" className="mb-24">
          <div className="text-center sm:text-left mb-12">
            <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">Tuition & Levies</span>
            <h2 className="text-heading text-white font-extrabold">Fee Structure 2026-27</h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-3" />
          </div>

          <LiquidGlassCard className="p-8 overflow-x-auto" options={{ scale: -95 }}>
            <table className="w-full text-left border-collapse min-w-[600px] text-white">
              <thead>
                <tr className="border-b border-white/15 text-xs font-bold tracking-widest uppercase text-accent">
                  <th className="py-4 px-6">Grade Segment</th>
                  <th className="py-4 px-6 text-center">Admission Fee (One-Time)</th>
                  <th className="py-4 px-6 text-center">Tuition Fee (Per Term)</th>
                  <th className="py-4 px-6 text-center">Lab / Special Fee (Annual)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-semibold tracking-tight">
                {[
                  { segment: 'Kindergarten ("Ding Dong")', oneTime: "₹10,000", term: "₹8,500", lab: "—" },
                  { segment: "Primary (Grade I - V)", oneTime: "₹12,000", term: "₹10,200", lab: "₹1,500" },
                  { segment: "Middle School (Grade VI - VIII)", oneTime: "₹12,000", term: "₹12,400", lab: "₹2,500" },
                  { segment: "High School (Grade IX - X)", oneTime: "₹15,000", term: "₹14,500", lab: "₹3,500" },
                  { segment: "Senior Secondary (XI - XII Science)", oneTime: "₹18,000", term: "₹17,800", lab: "₹6,000" },
                  { segment: "Senior Secondary (XI - XII Commerce)", oneTime: "₹18,000", term: "₹15,500", lab: "₹4,000" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-bold uppercase text-white/90">{row.segment}</td>
                    <td className="py-4 px-6 text-center text-white/70">{row.oneTime}</td>
                    <td className="py-4 px-6 text-center text-white/70">{row.term}</td>
                    <td className="py-4 px-6 text-center text-white/70">{row.lab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </LiquidGlassCard>
        </div>

        {/* Ready to apply callout */}
        <LiquidGlassCard className="p-8 sm:p-12 text-center max-w-3xl mx-auto flex flex-col items-center gap-6" options={{ scale: -80 }}>
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-extrabold uppercase text-white tracking-wider">
            Begin the Admission Journey
          </h3>
          <p className="text-body-sm text-white/70 max-w-md leading-relaxed">
            Fill in our three-step digital application desk. Our admissions committee will review details and follow up on coordinates.
          </p>
          <Button 
            onClick={triggerInquiry}
            className="bg-accent border-accent text-navy-deep hover:bg-accent/90 font-bold uppercase tracking-wider px-8 py-5 text-xs rounded-full cursor-pointer shadow-lg"
          >
            Open Inquiry Drawer
          </Button>
        </LiquidGlassCard>
      </div>
    </div>
  );
}
