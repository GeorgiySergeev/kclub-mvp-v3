import React, { useState } from "react";
import { useClubState } from "../context/ClubStateContext";
import { UserRole, BusinessProfile } from "../types";
import { X, Lock, Unlock, Phone, Mail, Send, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PartnerModalProps {
  partner: BusinessProfile | null;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ partner, onClose }) => {
  const { currentUser, sendPrivateMessage, triggerNotification } = useClubState();
  const [queryText, setQueryText] = useState("");

  if (!partner) return null;

  const handleQuerySponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) return;

    // Send private message from current user to the dynamic owner of the business partner profile!
    sendPrivateMessage(partner.ownerId, `[Catalog Query about ${partner.name}]: ${queryText.trim()}`);
    
    setQueryText("");
    triggerNotification(
      "✉ Negotiation Dispatched", 
      `Direct inquiry about "${partner.name}" has been routed securely to owner. Check Private messages thread!`, 
      "MESSAGE"
    );
    alert(`Success: Inquiry dispatched to ${partner.representativeName}. Direct thread initialized in Networking tab!`);
    onClose();
  };

  const isLocked = currentUser.role === UserRole.MEMBER;
  const logoInitial = partner.name.charAt(0).toUpperCase();

  const meetsRep = currentUser.reputation >= partner.reputationRequired;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0f0f0e] border border-zinc-900 rounded-xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl relative"
        id="partner_details_modal"
      >
        {/* Absolute top close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-white text-sm font-semibold uppercase tracking-wider cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Categories badge & locking */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[9px] uppercase font-mono bg-zinc-950 px-2.5 py-0.5 rounded border border-zinc-900 text-stone-400">
            {partner.category}
          </span>
          {isLocked ? (
            <span className="text-[9px] text-amber-500 flex items-center gap-1 font-mono uppercase bg-amber-950/20 px-2 py-0.5 rounded border border-amber-950/40">
              <Lock className="w-3 h-3" /> Offer Locked for standard users
            </span>
          ) : (
            <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-mono uppercase bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-950/40">
              <Unlock className="w-3 h-3" /> Verified Member Unlocked
            </span>
          )}
        </div>

        {/* Corporate Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-zinc-950 border border-[#d4af37]/30 rounded-xl flex items-center justify-center font-display font-bold text-2xl text-[#d4af37]">
            {logoInitial}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide font-display">{partner.name}</h2>
            <p className="text-xs text-stone-550 font-mono mt-0.5">📍 Location: {partner.city}, {partner.country}</p>
          </div>
        </div>

        {/* Detailed description text */}
        <div className="space-y-4 text-xs text-stone-400 leading-relaxed font-sans mb-6">
          <p>{partner.description}</p>
          
          {partner.website && (
            <div className="pt-2">
              <span className="text-zinc-650 font-mono text-[10px] uppercase block mb-1">Corporate website:</span>
              <a 
                href={partner.website} 
                target="_blank" 
                rel="noreferrer"
                className="text-[#d4af37] hover:underline font-mono"
              >
                {partner.website}
              </a>
            </div>
          )}
        </div>

        {/* Locked conditions banner / Unlocked box */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 mb-6">
          <span className="text-[9px] text-[#d4af37] font-mono tracking-widest uppercase block mb-2">EXCLUSIVE SPECIAL REWARD:</span>
          
          {isLocked ? (
            <div className="space-y-3">
              <p className="text-xs text-stone-500 italic leading-relaxed">
                Unlock exclusive partner rewards, rates, amenities booking slots, and champagne views. This asset is reserved strictly for VIP tier members.
              </p>
              <div className="p-2 bg-amber-950/15 border border-amber-950 rounded text-[10px] text-amber-500 font-mono flex items-center gap-1.5 uppercase leading-none font-bold">
                <Lock className="w-3.5 h-3.5" /> UPGRADE ACCOUNT SYSTEM PRIVILEGES TO UNLOCK DISCOUNTS
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-bold text-stone-100 leading-snug">
                {partner.specialCondition}
              </p>
              
              {/* Trust validation checklist */}
              <div className="mt-4 pt-3 border-t border-zinc-900/60 flex flex-wrap gap-4 text-[10px] text-stone-550 font-mono">
                <div className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#d4af37]" /> Required reputation: {partner.reputationRequired}★
                </div>
                <div className="flex items-center gap-1">
                  {meetsRep ? (
                    <span className="text-emerald-400 uppercase font-bold">✓ reputation score cleared</span>
                  ) : (
                    <span className="text-rose-400 uppercase font-bold">⚠️ rep below threshold</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Negotiation Form - Locked if user is member */}
        {!isLocked && (
          <div className="pt-4 border-t border-zinc-900/40">
            <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2 font-display">
              Initiate Corporate negotiations
            </h4>
            <p className="text-[10px] text-zinc-550 mb-3 font-mono leading-relaxed">
              Query representative <span className="font-bold text-[#d4af37]">{partner.representativeName}</span> directly. System launches secure matching messengers thread on submit.
            </p>

            <form onSubmit={handleQuerySponsor} className="flex gap-2">
              <input 
                type="text"
                required
                placeholder="State your question or request..."
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                className="flex-1 py-1.5 px-3 bg-[#060605] border border-zinc-800 rounded text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80"
              />
              <button 
                type="submit"
                className="py-1.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-[#d4af37] border border-zinc-800 text-xs font-semibold rounded uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Query
              </button>
            </form>
          </div>
        )}

      </motion.div>
    </div>
  );
};
