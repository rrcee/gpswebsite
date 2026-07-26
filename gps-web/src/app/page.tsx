"use client";

import React, { useEffect, useRef } from "react";
import { Hero } from "@/components/sections/hero";
import { stats, facilities, testimonials } from "@/lib/data/home";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Monitor, FlaskConical, BookOpen, Bus, Star, ArrowRight, Quote, Calendar } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="w-8 h-8 text-accent" />,
  FlaskConical: <FlaskConical className="w-8 h-8 text-accent" />,
  BookOpen: <BookOpen className="w-8 h-8 text-accent" />,
  Bus: <Bus className="w-8 h-8 text-accent" />,
};

export default function HomePage() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    // 1. Stats Counter Animation
    if (statsSectionRef.current) {
      const statItems = statsSectionRef.current.querySelectorAll(".stat-value-animate");
      
      const ctx = gsap.context(() => {
        statItems.forEach((item) => {
          const targetVal = parseFloat(item.getAttribute("data-target") || "0");
          const suffix = item.getAttribute("data-suffix") || "";
          const isDecimal = targetVal % 1 !== 0;
          
          const obj = { value: 0 };
          gsap.to(obj, {
            value: targetVal,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              item.textContent = isDecimal 
                ? obj.value.toFixed(1) + suffix
                : Math.floor(obj.value) + suffix;
            }
          });
        });
      }, statsSectionRef);

      return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    // 2. Pinned Horizontal Scroll for Facilities
    if (horizontalSectionRef.current && scrollContainerRef.current) {
      const section = horizontalSectionRef.current;
      const container = scrollContainerRef.current;

      const totalScrollWidth = container.scrollWidth - window.innerWidth;

      const ctx = gsap.context(() => {
        gsap.to(container, {
          x: () => -totalScrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${container.scrollWidth}`,
            invalidateOnRefresh: true,
          }
        });
      }, section);

      return () => ctx.revert();
    }
  }, []);

  // 3. Parallax effects for decorative elements & sections
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax floating glow orbs
      gsap.utils.toArray<HTMLElement>(".parallax-glow").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.3");
        gsap.to(el, {
          yPercent: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Parallax section content — subtle upward shift for depth
      gsap.utils.toArray<HTMLElement>(".parallax-content").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.08");
        gsap.fromTo(
          el,
          { y: 40 * speed * 100 },
          {
            y: -20 * speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const triggerInquiry = () => {
    window.dispatchEvent(new CustomEvent("open-inquiry-drawer"));
  };

  return (
    <div ref={pageRef}>
      <Hero />

      {/* Quick Stats Section */}
      <section ref={statsSectionRef} className="py-16 sm:py-24 relative z-20 bg-transparent">
        {/* Parallax glow orb */}
        <div
          className="parallax-glow absolute -top-32 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          data-speed="0.5"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 parallax-content" data-speed="0.06">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1} y={30}>
                <LiquidGlassCard className="p-8 text-center" options={{ scale: -70 }}>
                  <div 
                    className="text-gold-gradient font-black tracking-tighter stat-value-animate"
                    style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1 }}
                    data-target={stat.value}
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix}
                  </div>
                  <div className="text-xs font-bold text-white/50 tracking-widest uppercase mt-2">
                    {stat.label}
                  </div>
                </LiquidGlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Genesis (History) Section */}
      <section id="genesis" className="py-20 sm:py-32 relative z-20 bg-transparent">
        {/* Parallax glow orb */}
        <div
          className="parallax-glow absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          data-speed="0.4"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 parallax-content" data-speed="0.05">
          <ScrollReveal y={40}>
            <LiquidGlassCard className="p-8 sm:p-16" options={{ scale: -100, blur: 4 }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column Text */}
                <div className="lg:col-span-7 space-y-6">
                  <ScrollReveal delay={0.1}>
                    <span className="text-xs font-bold text-accent tracking-widest uppercase block">Our Roots</span>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2} y={25}>
                    <h2 className="text-heading-lg text-white font-black leading-tight">
                      A Legacy of <br className="hidden sm:inline" />
                      <span className="text-gold-gradient">Excellence</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent rounded-full mt-4" />
                  </ScrollReveal>
                  <ScrollReveal delay={0.3}>
                    <div className="space-y-4 text-white/80 text-subheading font-medium tracking-tight">
                      <p>
                        What began as a humble initiative by the Bethel Foundation in 1985, has grown into a beacon of educational excellence in the heart of Kochi.
                      </p>
                      <p>
                        From the Ding Dong Kindergarten to an English Medium School in 1986, and ultimately securing CBSE affiliation in 1991, our journey has been one of continuous growth, dedication, and holistic development.
                      </p>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.4}>
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-wider px-6 py-5 text-xs rounded-full cursor-pointer">
                        <Link href="/about">Read Detailed History</Link>
                      </Button>
                    </div>
                  </ScrollReveal>
                </div>
                
                {/* Right Column Parallax Year */}
                <ScrollReveal delay={0.3} y={50} className="lg:col-span-5">
                  <div className="flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden h-[300px]">
                    <div className="text-[120px] font-black text-white/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      ESTD
                    </div>
                    <div className="text-[96px] sm:text-[110px] font-black text-gold-gradient tracking-tighter relative z-10 leading-none">
                      1985
                    </div>
                    <div className="text-xs font-bold tracking-widest text-white/60 uppercase mt-2 relative z-10">
                      Bethel Foundation
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </LiquidGlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Academics Showcase */}
      <section id="academics-overview" className="py-20 sm:py-32 relative z-20 bg-transparent">
        {/* Parallax glow orb */}
        <div
          className="parallax-glow absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          data-speed="0.35"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 parallax-content" data-speed="0.05">
          <ScrollReveal y={30}>
            <div className="max-w-3xl mb-16 text-center sm:text-left">
              <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">Academics</span>
              <h2 className="text-heading-lg text-white font-black">
                Nurturing <span className="text-gold-gradient">Potential</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                num: "01", 
                title: "Primary Segment", 
                desc: "Building a strong foundation with interactive, activity-based learning. Nurturing curiosity in early childhood." 
              },
              { 
                num: "02", 
                title: "Secondary School", 
                desc: "Focusing on core subject strength, digital coding (AI & IT), and sports to build versatile characters." 
              },
              { 
                num: "03", 
                title: "Senior Secondary", 
                desc: "Specialized Science and Commerce streams equipped with advanced laboratories to prepare for career milestones." 
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={0.15 * i} y={40}>
                <LiquidGlassCard className="p-8 flex flex-col justify-between h-[300px]" options={{ scale: -85 }}>
                  <div className="text-heading font-black text-white/10">{item.num}</div>
                  <div className="space-y-3">
                    <h3 className="text-heading-sm font-extrabold text-white uppercase">{item.title}</h3>
                    <p className="text-body-sm text-white/70 tracking-tight leading-relaxed">{item.desc}</p>
                  </div>
                </LiquidGlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GSAP Pinned Horizontal Scroll Section for Infrastructure */}
      <div id="facilities" className="relative z-20">
        <section ref={horizontalSectionRef} className="h-auto sm:h-screen w-full overflow-hidden bg-transparent flex flex-col justify-center py-16 sm:py-0">
          {/* Section Header */}
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 sm:mb-12">
            <ScrollReveal y={25}>
              <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">Infrastructure</span>
              <h2 className="text-heading-lg text-white font-black">
                Our <span className="text-gold-gradient">Campus Facilities</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Scrollable Container */}
          <div className="w-full flex items-center overflow-x-auto sm:overflow-x-hidden pb-4 sm:pb-0">
            <div 
              ref={scrollContainerRef}
              className="flex gap-8 px-4 sm:px-6 lg:px-[10vw] w-max py-4"
            >
              {facilities.map((fac, i) => (
                <div 
                  key={i} 
                  className="w-[85vw] sm:w-[480px] shrink-0"
                >
                  <LiquidGlassCard 
                    className="p-8 sm:p-10 flex flex-col justify-between h-[360px]" 
                    options={{ scale: -90 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {iconMap[fac.icon]}
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-extrabold uppercase text-white tracking-wide">{fac.title}</h4>
                      <p className="text-body-sm text-white/75 leading-relaxed tracking-tight">{fac.description}</p>
                    </div>
                    <Link href="/facilities" className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest hover:text-white transition-colors mt-4">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </LiquidGlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Student Testimonials */}
      <section id="testimonials" className="py-32 relative z-20 bg-transparent">
        {/* Parallax glow orb */}
        <div
          className="parallax-glow absolute top-20 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none"
          data-speed="0.45"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 parallax-content" data-speed="0.05">
          <ScrollReveal y={30}>
            <div className="max-w-3xl mb-16 text-center sm:text-left">
              <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">Testimonials</span>
              <h2 className="text-heading-lg text-white font-black">
                Voice of <span className="text-gold-gradient">Our Toppers</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <ScrollReveal key={i} delay={0.12 * i} y={35}>
                <LiquidGlassCard className="p-8 flex flex-col justify-between h-[320px]" options={{ scale: -75 }}>
                  <Quote className="w-8 h-8 text-accent/20 rotate-180" />
                  <p className="text-body-sm italic text-white/80 leading-relaxed tracking-tight flex-1 py-4">
                    &quot;{test.quote}&quot;
                  </p>
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <div>
                      <h5 className="text-sm font-extrabold text-white uppercase tracking-wide">{test.name}</h5>
                      <p className="text-[10px] text-white/50 font-bold uppercase mt-0.5">{test.role}</p>
                    </div>
                    <div className="flex gap-0.5 text-accent">
                      {[...Array(test.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-accent" />
                      ))}
                    </div>
                  </div>
                </LiquidGlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section id="admissions-cta" className="py-24 relative z-20 bg-transparent">
        {/* Parallax glow orb */}
        <div
          className="parallax-glow absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          data-speed="0.3"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 parallax-content" data-speed="0.04">
          <ScrollReveal y={50} duration={0.8}>
            <LiquidGlassCard 
              className="p-6 sm:p-12 md:p-20 text-center flex flex-col items-center space-y-6 sm:space-y-8 relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]" 
              options={{ scale: -45, blur: 6 }}
            >
              {/* Subtle floating background grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0 opacity-40" />
              
              {/* Glowing radial center blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] blur-[40px] pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col items-center space-y-8">
                <ScrollReveal delay={0.1}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-accent uppercase tracking-widest shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Admissions Open 2026
                  </span>
                </ScrollReveal>
                
                <ScrollReveal delay={0.2} y={25}>
                  <h2 className="text-heading-lg text-white font-black max-w-xl leading-tight">
                    Join Our <br />
                    <span className="text-gold-gradient drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">Learning Community</span>
                  </h2>
                </ScrollReveal>
                
                <ScrollReveal delay={0.3}>
                  <p className="text-subheading text-white/80 max-w-xl font-medium tracking-tight leading-relaxed">
                    Admissions are currently active for the upcoming academic sessions. Connect with our admissions office to review syllabus and schedule a physical campus tour.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal delay={0.4} y={15}>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full sm:w-auto items-center justify-center">
                    <Button 
                      onClick={triggerInquiry}
                      className="bg-accent border-accent text-navy-deep hover:bg-accent/90 font-bold uppercase tracking-wider px-8 py-5 text-xs rounded-full cursor-pointer shadow-lg hover:shadow-accent/20 transition-all hover:scale-105"
                    >
                      Inquire Admissions
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-wider px-8 py-5 text-xs rounded-full cursor-pointer transition-all hover:scale-105"
                    >
                      <Link href="/contact">Get Location Map</Link>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            </LiquidGlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
