import React, { useState } from "react";
import { useClubState } from "../context/ClubStateContext";
import { UserRole } from "../types";
import { Send, FileText, CheckCircle, Clock, ShieldAlert, BadgeCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Introductions: React.FC = () => {
  const { currentUser, introductions, createMatchmaking, triggerNotification } = useClubState();

  const [targetIndustry, setTargetIndustry] = useState("");
  const [goal, setGoal] = useState("");

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetIndustry || !goal) {
      alert("Please state target industry and business networking goals.");
      return;
    }

    createMatchmaking(targetIndustry, goal);
    setTargetIndustry("");
    setGoal("");
  };

  const getStatusBadge = (status: "PENDING" | "APPROVED" | "REJECTED") => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-950/80 text-emerald-400 border border-emerald-800/80";
      case "REJECTED":
        return "bg-red-950/80 text-red-400 border border-red-800/80";
      default:
        return "bg-amber-950/80 text-[#d4af37] border border-amber-800/80";
    }
  };

  // Filter current user's request
  const myRequests = introductions.filter(i => i.requesterId === currentUser.id);

  const isEligible = currentUser.role !== UserRole.MEMBER;

  return (
    <div className="min-h-screen bg-[#060605] py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10" id="introductions_title">
          <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase">Verified B2B Alliance Tunnel</span>
          <h1 className="text-3xl font-display font-semibold text-white mt-1">BUSINESS INTRODUCTIONS</h1>
          <p className="text-xs text-stone-500 font-mono mt-1">
            VIP member utility to coordinate highly confidential matching pipelines mediated by our internal counselors.
          </p>
        </div>

        {!isEligible ? (
          /* Gated screen for standard members */
          <div className="bg-[#0b0b0a] border border-zinc-900 rounded-2xl p-8 text-center max-w-xl mx-auto my-12 shadow-2xl">
            <ShieldAlert className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">VIP LEVEL REQUIRED</h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Business Matchmaking and direct introduction pipelines are reserved under strict KYC protocols of our closed premium circle.
            </p>
            <div className="mt-8">
              <span className="text-xs text-stone-500 block font-mono">Upgrade in seconds on the Billing Dashboard.</span>
            </div>
          </div>
        ) : (
          /* Main Interactive Panel */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side: Request Form */}
            <div className="lg:col-span-5 bg-[#0b0b0a] border border-zinc-900 rounded-xl p-6 h-fit shadow-xl">
              <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider mb-2 font-display">
                Request Matchmaking Introduction
              </h3>
              <p className="text-[11px] text-stone-500 font-mono mb-6 leading-relaxed">
                Kylyvnyk Club provides strict peer-to-peer verification and direct counseling. We don't employ automated spam, direct bot listings, or MLM trees.
              </p>

              <form onSubmit={handleSub} className="space-y-4">
                
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Target Sector / Industry *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Swiss Asset Management, UK Concierge hubs..."
                    value={targetIndustry}
                    onChange={(e) => setTargetIndustry(e.target.value)}
                    className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Networking Goal & Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please state what professional or business entities you would like to connect with, and what conditions you are prepared to offer in exchange..."
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80 font-sans leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gold-gradient text-black font-extrabold text-xs rounded-lg uppercase tracking-wider hover:opacity-90 transition-all shadow-md mt-4 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Request Introduction Line
                </button>

              </form>

              {/* Integrity Warning */}
              <div className="mt-8 p-3.5 bg-zinc-950 rounded border border-zinc-900 leading-relaxed text-[10px] text-stone-500">
                <span className="font-bold text-[#d4af37] block uppercase mb-1">Matchmaker Integrity Notice:</span>
                Kylyvnyk matches professional profiles with complete respect for integrity. No multi-tier passive revenue, referral schemes, or percentage distribution models exist here.
              </div>
            </div>

            {/* Right side: previous requests list */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xs font-mono font-bold text-stone-400 tracking-[0.12em] uppercase">
                My Linkage Logs ({myRequests.length})
              </h3>

              {myRequests.length === 0 ? (
                <div className="bg-[#0b0b0a]/40 border border-zinc-900 border-dashed rounded-xl p-12 text-center text-stone-500">
                  <FileText className="w-8 h-8 text-stone-600 mx-auto mb-3" />
                  <p className="text-xs font-mono uppercase">No requests logged</p>
                  <p className="text-[11px] mt-1 text-stone-500">Your submitted B2B requests will show up in this column with review logs.</p>
                </div>
              ) : (
                myRequests.map(req => (
                  <div 
                    key={req.id}
                    className="bg-[#0b0b0a] border border-zinc-900/80 rounded-xl p-5 shadow-lg relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] bg-zinc-950 px-2.5 py-0.5 rounded border border-zinc-900 text-stone-400 font-mono">
                        Target: {req.targetIndustry}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono tracking-wider font-semibold uppercase ${getStatusBadge(req.status)}`}>
                        {req.status}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed mb-4">
                      {req.goal}
                    </p>

                    {/* Counselor response display */}
                    {req.adminNote && (
                      <div className="p-3 bg-zinc-950 rounded border border-zinc-905 flex items-start gap-2">
                        <BadgeCheck className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-[#d4af37] font-mono uppercase block">COUNSELOR ASSISTANCE SUGGESTION:</span>
                          <span className="text-xs text-stone-300 font-medium tracking-wide mt-1 block leading-relaxed italic">
                            "{req.adminNote}"
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="text-[9px] font-mono text-stone-500 text-right mt-3">
                      Logged on: {new Date(req.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
