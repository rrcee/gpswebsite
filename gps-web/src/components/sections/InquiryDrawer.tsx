"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useLiquidGlass } from "@/lib/hooks/useLiquidGlass";
import { Button } from "@/components/ui/button";

export function InquiryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gradeLevel: "",
    passionStream: "",
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    message: "",
  });

  const glassRef = useLiquidGlass({
    scale: -60,       // slightly lighter refraction for overlay drawer to read text clearly
    blur: 8,
    saturate: 1.2,
    fallbackBlur: 20
  });

  // Listen to global open event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
    };
    window.addEventListener("open-inquiry-drawer", handleOpen);
    return () => window.removeEventListener("open-inquiry-drawer", handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectGrade = (grade: string) => {
    setFormData((prev) => ({ ...prev, gradeLevel: grade }));
    setStep(2);
  };

  const handleSelectStream = (stream: string) => {
    setFormData((prev) => ({ ...prev, passionStream: stream }));
    setStep(3);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setStep(4);
  };

  const drawerVariants = {
    closed: { x: "100%", transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
    open: { x: 0, transition: { type: "spring" as const, damping: 30, stiffness: 200 } },
  };

  const stepVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0, transition: { duration: 0.3 } }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            ref={glassRef}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] z-50 shadow-2xl flex flex-col p-8 sm:p-10 border-l border-white/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 z-10">
              <div>
                <span className="text-xs font-bold text-accent tracking-widest uppercase">Admissions 2026-27</span>
                <h3 className="text-heading-sm font-extrabold uppercase text-white mt-1">Inquiry Form</h3>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps Progress */}
            {step <= 3 && (
              <div className="flex gap-2 mb-10 z-10">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      step >= num ? "bg-accent" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Content & Steps Form */}
            <div className="flex-1 flex flex-col justify-start relative overflow-hidden z-10">
              <AnimatePresence mode="wait" custom={step}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={1}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-6 w-full"
                  >
                    <h4 className="text-lg font-bold text-white uppercase">1. Select Grade Level</h4>
                    <p className="text-body-sm text-white/70">Which academic segment are you inquiring for?</p>
                    <div className="flex flex-col gap-3">
                      {[
                        { key: "kindergarten", name: 'Kindergarten ("Ding Dong")' },
                        { key: "primary", name: "Primary Section (I - V)" },
                        { key: "middle", name: "Middle School (VI - VIII)" },
                        { key: "high", name: "High & Senior Secondary (IX - XII)" },
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => handleSelectGrade(item.name)}
                          className={`w-full py-4 px-6 text-left rounded-xl border border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-accent/40 transition-all font-medium cursor-pointer ${
                            formData.gradeLevel === item.name ? "border-accent! bg-accent/10" : ""
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={1}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-6 w-full"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setStep(1)}
                        className="text-white/60 hover:text-white flex items-center gap-1 text-sm font-medium cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    </div>
                    <h4 className="text-lg font-bold text-white uppercase">2. Select Stream / Passion</h4>
                    <p className="text-body-sm text-white/70">What subjects or activities interest the student most?</p>
                    <div className="flex flex-col gap-3">
                      {[
                        { key: "science", name: "Science Stream (PCMB / PCMC)" },
                        { key: "commerce", name: "Commerce Stream" },
                        { key: "stem", name: "STEM & Digital Tech / AI" },
                        { key: "sports", name: "Athletics & Physical Training" },
                        { key: "arts", name: "Creative Arts, Music & Drama" },
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => handleSelectStream(item.name)}
                          className={`w-full py-4 px-6 text-left rounded-xl border border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-accent/40 transition-all font-medium cursor-pointer ${
                            formData.passionStream === item.name ? "border-accent! bg-accent/10" : ""
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={1}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-5 w-full h-full"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setStep(2)}
                        className="text-white/60 hover:text-white flex items-center gap-1 text-sm font-medium cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    </div>
                    <h4 className="text-lg font-bold text-white uppercase">3. Contact Details</h4>
                    <p className="text-body-sm text-white/70">We need these to follow up with details regarding eligibility.</p>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-2">Student Name</label>
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleTextChange}
                          required
                          placeholder="Enter student's full name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-hidden focus:border-accent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-2">Parent / Guardian Name</label>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleTextChange}
                          required
                          placeholder="Enter parent's full name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-hidden focus:border-accent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-white/60 uppercase mb-2">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleTextChange}
                            required
                            placeholder="+91"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-hidden focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/60 uppercase mb-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleTextChange}
                            required
                            placeholder="mail@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-hidden focus:border-accent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white/60 uppercase mb-2">Message (Optional)</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleTextChange}
                          rows={2}
                          placeholder="Any specific questions?"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-hidden focus:border-accent resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-accent text-navy-deep font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 cursor-pointer mt-4"
                      >
                        Submit Application <ArrowRight className="w-5 h-5" />
                      </Button>
                    </form>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    custom={1}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col items-center justify-center text-center gap-6 py-12"
                  >
                    <CheckCircle className="w-20 h-20 text-accent" />
                    <h4 className="text-2xl font-black text-white uppercase">Inquiry Received!</h4>
                    <p className="text-body text-white/80 leading-relaxed max-w-sm">
                      Thank you for your interest in Greets Public School. Our admissions officer will contact you within 24 hours to review your eligibility and schedule a campus tour.
                    </p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-left w-full text-xs space-y-1 mt-4">
                      <p><span className="text-white/50 font-bold uppercase">Grade Level:</span> <span className="text-white">{formData.gradeLevel}</span></p>
                      <p><span className="text-white/50 font-bold uppercase">Stream Interest:</span> <span className="text-white">{formData.passionStream}</span></p>
                      <p><span className="text-white/50 font-bold uppercase">Candidate:</span> <span className="text-white">{formData.studentName}</span></p>
                    </div>
                    <Button
                      onClick={handleClose}
                      className="bg-white/10 text-white font-bold hover:bg-white/20 py-3 px-8 rounded-full border border-white/10 cursor-pointer mt-4"
                    >
                      Close Window
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
