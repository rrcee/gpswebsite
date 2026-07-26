"use client";

import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { BookOpen, GraduationCap, Microscope, Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function AcademicsPage() {
  const triggerInquiry = () => {
    window.dispatchEvent(new CustomEvent("open-inquiry-drawer"));
  };

  return (
    <div className="min-h-screen bg-transparent pt-36 pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-20 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">
            Curriculum & Streams
          </span>
          <h1 className="text-heading-lg text-white font-black">
            Academic <span className="text-gold-gradient">Excellence</span>
          </h1>
          <p className="text-subheading text-white/70 mt-4 max-w-2xl mx-auto tracking-tight">
            Our CBSE curriculum spans from Kindergarten to Senior Secondary, preparing students for university success through rigorous theory and laboratory application.
          </p>
        </ScrollReveal>

        {/* School Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <LiquidGlassCard className="p-8 sm:p-10 flex flex-col justify-between" options={{ scale: -80 }}>
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-extrabold uppercase text-white tracking-wider mb-4">
                Primary & Middle School (I - VIII)
              </h3>
              <p className="text-body-sm text-white/85 leading-relaxed mb-4">
                Our Primary and Middle School focuses on establishing a firm grasp of core subjects. We implement activity-based learning to keep students active and curious.
              </p>
              <ul className="text-xs text-white/70 font-semibold space-y-2 uppercase tracking-wider">
                <li>• Core Mathematics & Basic Sciences</li>
                <li>• English, Hindi, and Regional Language Options</li>
                <li>• Arts, Physical Education & Social Ethics</li>
              </ul>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-8 sm:p-10 flex flex-col justify-between" options={{ scale: -80 }}>
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Microscope className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-extrabold uppercase text-white tracking-wider mb-4">
                High School Curriculum (IX - X)
              </h3>
              <p className="text-body-sm text-white/85 leading-relaxed mb-4">
                Preparation for secondary board milestones. High school introduces specialized subjects, computer science, and vocational skills.
              </p>
              <ul className="text-xs text-white/70 font-semibold space-y-2 uppercase tracking-wider">
                <li>• CBSE Board Syllabus (English, Math, Science, Social Sci)</li>
                <li>• Computer Applications, AI, and IT Skills</li>
                <li>• Laboratory practicals & Project assignments</li>
              </ul>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Senior Secondary Streams Bento */}
        <div className="mb-24">
          <div className="text-center sm:text-left mb-12">
            <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">Grade XI & XII</span>
            <h2 className="text-heading text-white font-extrabold">Senior Secondary Streams</h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Science Card */}
            <LiquidGlassCard className="p-8 sm:p-10" options={{ scale: -95 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-wide">Science Stream</h3>
              </div>
              <p className="text-body-sm text-white/80 leading-relaxed mb-8">
                Designed for students aiming for careers in Medicine, Engineering, Information Technology, and Scientific Research. Combines intensive laboratory work with theory.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-xl">
                <div>
                  <h4 className="text-xs font-extrabold text-accent uppercase tracking-widest mb-2">Group A (PCMB)</h4>
                  <p className="text-xs text-white/60 font-semibold uppercase">Physics, Chemistry, Mathematics, Biology, English</p>
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-accent uppercase tracking-widest mb-2">Group B (PCMC)</h4>
                  <p className="text-xs text-white/60 font-semibold uppercase">Physics, Chemistry, Mathematics, Computer Science, English</p>
                </div>
              </div>
            </LiquidGlassCard>

            {/* Commerce Card */}
            <LiquidGlassCard className="p-8 sm:p-10" options={{ scale: -95 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-wide">Commerce Stream</h3>
              </div>
              <p className="text-body-sm text-white/80 leading-relaxed mb-8">
                Structured for career paths in Business Management, Accounting, Economics, Finance, and Entrepreneurship. Features elective computer programming options.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-xl">
                <div>
                  <h4 className="text-xs font-extrabold text-accent uppercase tracking-widest mb-2">Required Subjects</h4>
                  <p className="text-xs text-white/60 font-semibold uppercase">Accountancy, Business Studies, Economics, English</p>
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-accent uppercase tracking-widest mb-2">Elective Options</h4>
                  <p className="text-xs text-white/60 font-semibold uppercase">IP (Informatics Practices), Mathematics, Applied Maths</p>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>

        {/* Resources & Academic Calendar CTA */}
        <LiquidGlassCard className="p-8 sm:p-12 text-center max-w-4xl mx-auto flex flex-col items-center gap-6" options={{ scale: -80 }}>
          <div className="mx-auto w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-extrabold uppercase text-white tracking-wider">
            Academic Session & Calendar
          </h3>
          <p className="text-body-sm text-white/70 max-w-xl leading-relaxed text-center mx-auto">
            Review the milestones, holiday schedules, examination sessions, and co-curricular programs organized for the current session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Button 
              className="bg-accent border-accent text-navy-deep hover:bg-accent/90 font-bold uppercase tracking-wider px-6 py-5 text-xs rounded-full cursor-pointer"
            >
              <a 
                href="https://gps.ac.in/wp-content/uploads/2026/06/Aca-cal_19062026150755.pdf" 
                target="_blank" 
                rel="noreferrer"
              >
                Download Calendar PDF
              </a>
            </Button>
            <Button 
              variant="outline" 
              onClick={triggerInquiry}
              className="border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-wider px-6 py-5 text-xs rounded-full cursor-pointer"
            >
              Request Syllabus Details
            </Button>
          </div>
        </LiquidGlassCard>
      </div>
    </div>
  );
}
