"use client";

import { governance } from "@/lib/data/governance";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import React, { useState } from "react";

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<"board" | "smc">("board");

  const members = activeTab === "board" 
    ? governance.boardOfDirectors 
    : governance.schoolManagingCommittee;

  return (
    <div className="min-h-screen bg-transparent pt-36 pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">
            Leadership & Committees
          </span>
          <h1 className="text-heading-lg text-white font-black">
            School <span className="text-gold-gradient">Governance</span>
          </h1>
          <p className="text-subheading text-white/70 mt-4 max-w-2xl mx-auto tracking-tight">
            The board of directors and administrative committees providing governance, financial guidance, and structural oversight.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-white/[0.03] border border-white/10 p-1">
            <button
              onClick={() => setActiveTab("board")}
              className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === "board"
                  ? "bg-accent text-navy-deep shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Board of Directors
            </button>
            <button
              onClick={() => setActiveTab("smc")}
              className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === "smc"
                  ? "bg-accent text-navy-deep shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              School Managing Committee
            </button>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, i) => (
            <LiquidGlassCard key={`${activeTab}-${i}`} className="p-6 flex flex-col justify-between h-[180px]" options={{ scale: -70 }}>
              <div>
                <span className="text-[10px] font-bold text-accent tracking-widest uppercase block mb-1">
                  {member.role || "Member"}
                </span>
                <h4 className="text-base font-extrabold uppercase text-white tracking-wide leading-tight">
                  {member.name}
                </h4>
              </div>
              {member.qualification && (
                <div className="mt-4 text-xs bg-white/5 border border-white/10 text-white/80 p-2 rounded-lg font-medium text-center uppercase tracking-wider">
                  {member.qualification}
                </div>
              )}
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
