"use client";

import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import React, { useState } from "react";

// --- Social Button Component ---
interface SocialButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  href: string;
  gradient: {
    border: string;
    bg: string;
    shimmer: string;
    glow: string;
    iconBg: string;
  };
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, title, subtitle, href, gradient }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden border-2 cursor-pointer transition-all duration-500 ease-out 
                  shadow-2xl hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95
                  p-4 rounded-2xl flex w-full
                  ${gradient.border} ${gradient.bg}`}
    >
      {/* Moving shimmer layer */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${gradient.shimmer} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out`}></div>

      {/* Overlay glow */}
      <div className={`absolute inset-0 rounded-2xl ${gradient.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4 w-full">
        {/* Icon */}
        <div className={`p-3 rounded-lg backdrop-blur-sm transition-all duration-300 ${gradient.iconBg}`}>
          <div className="w-7 h-7 text-white group-hover:text-white/90 transition-all duration-300 group-hover:scale-110 drop-shadow-lg flex items-center justify-center">
            {icon}
          </div>
        </div>

        {/* Texts */}
        <div className="flex-1 text-left">
          <p className="text-white font-bold text-lg group-hover:text-white/90 transition-colors duration-300 drop-shadow-sm">
            {title}
          </p>
          {subtitle && (
            <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">
              {subtitle}
            </p>
          )}
        </div>

        {/* Arrow */}
        <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-white">
            <path d="M9 5l7 7-7 7" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-transparent pt-36 pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">
            Get In Touch
          </span>
          <h1 className="text-heading-lg text-white font-black">
            Contact <span className="text-gold-gradient">Greets School</span>
          </h1>
          <p className="text-subheading text-white/70 mt-4 max-w-2xl mx-auto tracking-tight">
            Whether you are a prospective parent looking to enroll, an alumnus, or checking vacancies, we are here to support you.
          </p>
        </div>

        {/* Info & Form Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <LiquidGlassCard className="p-8" options={{ scale: -70 }}>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-white tracking-wider mb-2">Visit Our Campus</h3>
                  <a 
                    href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x3b080d6b15fcf3db:0xeb86e2e27cdaae1a?source=g.page.share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/70 font-semibold uppercase leading-relaxed hover:text-accent transition-colors"
                  >
                    Ashoka Road, Kaloor,<br />
                    Kochi, Kerala, India - 682017
                  </a>
                </div>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard className="p-8" options={{ scale: -70 }}>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-white tracking-wider mb-2">Phone Call</h3>
                  <p className="text-xs text-white/70 font-semibold uppercase leading-relaxed">
                    +91 (484) 2533744<br />
                    +91 (484) 2535400
                  </p>
                </div>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard className="p-8" options={{ scale: -70 }}>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-white tracking-wider mb-2">Electronic Mail</h3>
                  <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">
                    INFO@GPS.AC.IN
                  </p>
                </div>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard className="p-8" options={{ scale: -70 }}>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-white tracking-wider mb-2">School Hours</h3>
                  <p className="text-xs text-white/70 font-semibold uppercase leading-relaxed">
                    Monday - Friday: 8:00 AM - 3:30 PM<br />
                    Saturday Office Hours: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard className="p-8" options={{ scale: -70 }}>
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-accent" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.58 2.023 14.12 1 11.517 1 6.08 1 1.657 5.37 1.654 10.8c-.001 1.674.439 3.313 1.277 4.747L1.99 21.02l4.657-1.866z"/>
                    <path d="M17.386 14.39c-.315-.158-1.86-.92-2.15-.992-.288-.072-.498-.108-.707.206-.21.314-.81.992-.992 1.206-.18.214-.36.24-.675.082-.315-.158-1.33-.49-2.53-1.562-.934-.834-1.564-1.864-1.748-2.179-.18-.314-.018-.485.138-.642.14-.14.315-.365.472-.547.158-.18.21-.309.315-.515.105-.206.052-.387-.026-.546-.078-.158-.707-1.702-.97-2.332-.255-.614-.514-.53-.706-.54l-.603-.01c-.21 0-.55.078-.838.394-.288.314-1.1 1.077-1.1 2.628 0 1.551 1.127 3.05 1.284 3.262.158.213 2.218 3.387 5.373 4.747.75.324 1.336.518 1.793.663.754.24 1.44.207 1.983.126.604-.09 1.86-.76 2.122-1.492.263-.732.263-1.359.184-1.492-.078-.133-.288-.21-.603-.368z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-white tracking-wider mb-2">WhatsApp</h3>
                  <a 
                    href="https://web.whatsapp.com/send?phone=919562627170&text=Hi%2C%20I%20would%20like%20to%20get%20more%20information" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-accent uppercase tracking-widest hover:text-white transition-colors"
                  >
                    +91 95626 27170
                  </a>
                </div>
              </div>
            </LiquidGlassCard>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <LiquidGlassCard className="p-8 sm:p-10 h-full flex flex-col justify-center" options={{ scale: -90 }}>
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-extrabold uppercase text-white tracking-wide">Message Submitted!</h3>
                  <p className="text-body-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                    Thank you. We have received your query. Our office administration staff will follow up shortly at your email.
                  </p>
                  <Button 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-6 bg-white/10 text-white hover:bg-white/20 border border-white/10 px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider cursor-pointer"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-extrabold uppercase tracking-wide text-white mb-6">
                    Send An Enquiry
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Your Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-hidden focus:border-accent text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-hidden focus:border-accent text-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Subject</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-hidden focus:border-accent text-sm"
                        placeholder="Admissions Query, Feedback, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Message Content</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-hidden focus:border-accent resize-none text-sm"
                        placeholder="Write details of your enquiry..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-accent text-navy-deep font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 cursor-pointer shadow-lg uppercase text-xs tracking-wider transition-all hover:scale-[1.01] active:scale-[0.99] group/btn"
                    >
                      Submit Message
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </form>
                </>
              )}
            </LiquidGlassCard>
          </div>
        </div>

        {/* Connect With Us Section */}
        <div className="mb-20">
          <div className="text-center sm:text-left mb-12">
            <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">Stay Connected</span>
            <h2 className="text-heading text-white font-extrabold">Connect With Us</h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
            {/* Instagram */}
            <SocialButton
              href="https://www.instagram.com/greets_publicschool/"
              title="Instagram"
              subtitle="@greets_publicschool"
              gradient={{
                border: "border-pink-500/40",
                bg: "bg-gradient-to-br from-purple-600/30 via-pink-500/25 to-orange-400/30",
                shimmer: "via-pink-300/30",
                glow: "bg-gradient-to-r from-purple-500/15 via-pink-400/10 to-orange-400/15",
                iconBg: "bg-gradient-to-br from-purple-600/50 to-pink-500/40 group-hover:from-purple-500/60 group-hover:to-orange-400/50",
              }}
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              }
            />

            {/* Facebook */}
            <SocialButton
              href="https://www.facebook.com/greetspublicschool/"
              title="Facebook"
              subtitle="Greets Public School"
              gradient={{
                border: "border-blue-500/40",
                bg: "bg-gradient-to-br from-blue-600/30 via-blue-500/20 to-blue-700/30",
                shimmer: "via-blue-300/30",
                glow: "bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-600/20",
                iconBg: "bg-gradient-to-br from-blue-600/50 to-blue-500/40 group-hover:from-blue-500/60 group-hover:to-blue-700/50",
              }}
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              }
            />

            {/* YouTube */}
            <SocialButton
              href="https://www.youtube.com/channel/UCHm-aTdRmMuTa0VkyIIGTfg"
              title="YouTube"
              subtitle="Greets Public School"
              gradient={{
                border: "border-red-500/40",
                bg: "bg-gradient-to-br from-red-600/30 via-red-500/20 to-red-700/30",
                shimmer: "via-red-300/30",
                glow: "bg-gradient-to-r from-red-500/20 via-red-400/10 to-red-600/20",
                iconBg: "bg-gradient-to-br from-red-600/50 to-red-500/40 group-hover:from-red-500/60 group-hover:to-red-700/50",
              }}
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
              }
            />

            {/* LinkedIn */}
            <SocialButton
              href="https://www.linkedin.com/company/greets-public-school"
              title="LinkedIn"
              subtitle="Greets Public School"
              gradient={{
                border: "border-sky-600/40",
                bg: "bg-gradient-to-br from-sky-700/30 via-sky-600/20 to-blue-700/30",
                shimmer: "via-sky-300/30",
                glow: "bg-gradient-to-r from-sky-600/20 via-sky-400/10 to-blue-600/20",
                iconBg: "bg-gradient-to-br from-sky-700/50 to-sky-600/40 group-hover:from-sky-600/60 group-hover:to-blue-700/50",
              }}
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              }
            />

            {/* X / Twitter */}
            <SocialButton
              href="https://x.com/greetsschool"
              title="X (Twitter)"
              subtitle="@greetsschool"
              gradient={{
                border: "border-slate-400/30",
                bg: "bg-gradient-to-br from-slate-700/30 via-slate-600/20 to-slate-800/30",
                shimmer: "via-slate-300/20",
                glow: "bg-gradient-to-r from-slate-500/15 via-slate-400/10 to-slate-600/15",
                iconBg: "bg-gradient-to-br from-slate-600/50 to-slate-700/40 group-hover:from-slate-500/60 group-hover:to-slate-800/50",
              }}
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              }
            />

            {/* WhatsApp */}
            <SocialButton
              href="https://web.whatsapp.com/send?phone=919562627170&text=Hi%2C%20I%20would%20like%20to%20get%20more%20information"
              title="WhatsApp"
              subtitle="+91 95626 27170"
              gradient={{
                border: "border-green-500/40",
                bg: "bg-gradient-to-br from-green-600/30 via-green-500/20 to-emerald-600/30",
                shimmer: "via-green-300/30",
                glow: "bg-gradient-to-r from-green-500/20 via-green-400/10 to-emerald-500/20",
                iconBg: "bg-gradient-to-br from-green-600/50 to-emerald-500/40 group-hover:from-green-500/60 group-hover:to-emerald-600/50",
              }}
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.58 2.023 14.12 1 11.517 1 6.08 1 1.657 5.37 1.654 10.8c-.001 1.674.439 3.313 1.277 4.747L1.99 21.02l4.657-1.866z"/>
                  <path d="M17.386 14.39c-.315-.158-1.86-.92-2.15-.992-.288-.072-.498-.108-.707.206-.21.314-.81.992-.992 1.206-.18.214-.36.24-.675.082-.315-.158-1.33-.49-2.53-1.562-.934-.834-1.564-1.864-1.748-2.179-.18-.314-.018-.485.138-.642.14-.14.315-.365.472-.547.158-.18.21-.309.315-.515.105-.206.052-.387-.026-.546-.078-.158-.707-1.702-.97-2.332-.255-.614-.514-.53-.706-.54l-.603-.01c-.21 0-.55.078-.838.394-.288.314-1.1 1.077-1.1 2.628 0 1.551 1.127 3.05 1.284 3.262.158.213 2.218 3.387 5.373 4.747.75.324 1.336.518 1.793.663.754.24 1.44.207 1.983.126.604-.09 1.86-.76 2.122-1.492.263-.732.263-1.359.184-1.492-.078-.133-.288-.21-.603-.368z"/>
                </svg>
              }
            />
          </div>
        </div>

        {/* Location Map Frame */}
        <div>
          <div className="text-center sm:text-left mb-12">
            <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">Campus Position</span>
            <h2 className="text-heading text-white font-extrabold">Google Map Location</h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-3" />
          </div>

          <LiquidGlassCard className="p-2 h-[260px] sm:h-[400px] overflow-hidden" options={{ scale: -95 }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.355609355745!2d76.29953937479374!3d10.00397757304191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d2c3886545b%3A0x6b3b27b38d384073!2sGreets%20Public%20School!5e0!3m2!1sen!2sin!4v1721979400000!5m2!1sen!2sin" 
              className="w-full h-full rounded-[14px] border-0 grayscale opacity-80" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </LiquidGlassCard>
        </div>
      </div>
    </div>
  );
}
