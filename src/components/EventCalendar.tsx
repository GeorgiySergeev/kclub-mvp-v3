import React, { useState } from "react";
import { useClubState } from "../context/ClubStateContext";
import { UserRole, ClubEvent } from "../types";
import { MapPin, Calendar, Clock, Award, CheckCircle, ShieldAlert, Plus, Users, Image } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const EventCalendar: React.FC = () => {
  const { 
    currentUser, 
    events, 
    createEvent, 
    toggleEventRSVP, 
    triggerNotification 
  } = useClubState();

  // Create event states for Managers or Admins
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDate, setNewDate] = useState("2026-06-25");
  const [newTime, setNewTime] = useState("19:00 - 22:00");
  const [newLoc, setNewLoc] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newMinRole, setNewMinRole] = useState<UserRole>(UserRole.MEMBER);

  const isModerator = currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.MANAGER;

  const handleRSVP = (evt: ClubEvent) => {
    // Check role clearance
    const roleHierarchy = {
      [UserRole.MEMBER]: 1,
      [UserRole.VIP]: 2,
      [UserRole.PARTNER]: 3,
      [UserRole.MANAGER]: 4,
      [UserRole.ADMIN]: 5
    };

    const userClearance = roleHierarchy[currentUser.role];
    const eventMinClearance = roleHierarchy[evt.minRole];

    if (userClearance < eventMinClearance) {
      triggerNotification(
        "🔒 Access Denied", 
        `"${evt.title}" is restricted to ${evt.minRole} members. Please purchase a membership upgrade.`, 
        "SYSTEM"
      );
      alert(`Access Restricted! This exclusive event is gated for ${evt.minRole} memberships. Lower tier profiles cannot RSVP.`);
      return;
    }

    toggleEventRSVP(evt.id, currentUser.id);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newLoc) {
      alert("Please provide a title, description, and location.");
      return;
    }

    createEvent({
      title: newTitle,
      description: newDesc,
      date: newDate,
      time: newTime,
      location: newLoc,
      country: newCountry || "Poland",
      city: newCity || "Warsaw",
      minRole: newMinRole,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop"
    });

    // Reset parameters
    setNewTitle("");
    setNewDesc("");
    setNewLoc("");
    setShowCreateModal(false);
  };

  const formatEventDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#060605] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Page header banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10" id="events_page_header">
          <div>
            <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase">High-End Syndicates & Briefings</span>
            <h1 className="text-3xl font-display font-semibold text-white mt-1">CLOSED EVENTS CALENDAR</h1>
            <p className="text-xs text-stone-500 font-mono mt-1">
              Check private club locations, networking dinners, yacht forums, and RSVP credentials.
            </p>
          </div>

          <div>
            {isModerator ? (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-600 to-amber-700 hover:opacity-90 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-all shadow-md cursor-pointer border border-[#d4af37]/30"
              >
                <Plus className="w-4 h-4" /> Create Private Event
              </button>
            ) : (
              <span className="text-[11px] font-mono text-stone-500 bg-zinc-950 p-2 rounded-lg border border-zinc-900/40">
                ★ Contact manager to schedule private partner round-tables
              </span>
            )}
          </div>
        </div>

        {/* Calendar visual scheduler simulation box */}
        <div className="bg-[#0b0b0a] border border-zinc-900 rounded-xl p-6 mb-10 shadow-2xl">
          <h3 className="text-xs font-mono font-bold text-[#d4af37] tracking-[0.15em] uppercase mb-4">
            Q2 - Q3 2026 SCHEDULE MATRIX
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-display">
            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <span className="text-stone-500 text-[10px] block font-mono">MAY 2026</span>
              <span className="text-[#d4af37] text-lg font-bold">1 Event</span>
            </div>
            <div className="p-3 bg-[#13120c] rounded-lg border border-amber-950/40">
              <span className="text-stone-400 text-[10px] block font-mono">JUNE 2026</span>
              <span className="text-white text-lg font-bold">2 Events Scheduled</span>
            </div>
            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <span className="text-stone-500 text-[10px] block font-mono">JULY 2026</span>
              <span className="text-stone-300 text-lg font-bold">1 Active Summit</span>
            </div>
            <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <span className="text-stone-500 text-[10px] block font-mono">AUGUST 2026</span>
              <span className="text-stone-300 text-lg font-bold">1 Briefing Session</span>
            </div>
          </div>
        </div>

        {/* Dynamic Event list rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="events_grid">
          {events.map(evt => {
            const hasRSVP = evt.attendedUserIds.includes(currentUser.id);
            const userMeetsRole = 
              (currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.MANAGER) || 
              (evt.minRole === UserRole.MEMBER) || 
              (evt.minRole === UserRole.VIP && currentUser.role !== UserRole.MEMBER);

            return (
              <div 
                key={evt.id}
                className="bg-[#0b0b0a] border border-zinc-900 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#d4af37]/25 shadow-xl"
              >
                {/* Visual Image cover */}
                <div className="h-44 bg-zinc-900 relative overflow-hidden">
                  <img 
                    src={evt.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop"} 
                    alt={evt.title}
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-[#060605]/80 backdrop-blur-sm border border-zinc-800 rounded px-2.5 py-1 text-[10px] text-[#d4af37] font-mono uppercase tracking-wider">
                    Required Role: {evt.minRole}+
                  </div>
                  {hasRSVP && (
                    <div className="absolute top-4 right-4 bg-emerald-950/90 backdrop-blur-sm border border-emerald-550 rounded px-2.5 py-1 text-[10px] text-emerald-400 font-mono uppercase font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> RSVPMEMBER ✓
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide font-display">{evt.title}</h3>
                    <p className="text-stone-400 text-xs mt-2 leading-relaxed">{evt.description}</p>
                    
                    {/* Event metadata details block */}
                    <div className="mt-5 space-y-2.5 border-t border-b border-zinc-900 py-4 font-mono text-[11px] text-zinc-400">
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#d4af37]" />
                        <span>Date: {formatEventDate(evt.date)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#d4af37]" />
                        <span>Hours: {evt.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                        <span>Lobby: <strong className="text-stone-300">{evt.location}</strong></span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#d4af37]" />
                        <span>Attending members count: <strong className="text-[#d4af37]">{evt.attendeesCount} peers</strong></span>
                      </div>

                    </div>
                  </div>

                  <div className="mt-6">
                    {hasRSVP ? (
                      <button
                        onClick={() => handleRSVP(evt)}
                        className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 text-stone-300 border border-zinc-800 hover:border-red-900 text-xs font-bold rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel RSVP registration
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRSVP(evt)}
                        className={`w-full py-2.5 text-xs font-extrabold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                          userMeetsRole 
                            ? "bg-gold-gradient hover:opacity-95 text-black" 
                            : "bg-zinc-950/70 border border-zinc-900 text-stone-500 cursor-pointer"
                        }`}
                      >
                        {userMeetsRole ? "RSVP REGISTER" : "🔒 VIP ACCESS ONLY (Upgrade)"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Creation form modal for administrators */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f0f0e] border border-zinc-800 rounded-xl max-w-lg w-full p-6 sm:p-8"
              id="create_event_modal"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">SCHEDULE MANDATORY MEETING</h3>
                  <p className="text-[10px] text-[#d4af37] font-mono mt-1">
                    NEW ENTRIES WILL IMMEDIATELY PROMPT PUSH NOTIFICATIONS TO QUALIFIED TIER PROFILES
                  </p>
                </div>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-stone-400 hover:text-white text-xs uppercase"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-4">
                
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Event Summit Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Warsaw Premium Yachting cocktail & matchmaking brief"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80"
                  />
                </div>

                {/* Let's double check input handlers and ensure they bind properly */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Brief agenda briefing *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide full agenda schedules, target matching benefits..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-350 focus:outline-none focus:border-[#d4af37]/80 font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Schedule date *</label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Time ranges *</label>
                    <input
                      type="text"
                      required
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Country Registry *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Poland"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">City District *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Warsaw"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Minimum Role Requirement</label>
                    <select
                      value={newMinRole}
                      onChange={(e) => setNewMinRole(e.target.value as UserRole)}
                      className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80 cursor-pointer"
                    >
                      <option value={UserRole.MEMBER}>Free Member & Above</option>
                      <option value={UserRole.VIP}>VIP Member & Above</option>
                      <option value={UserRole.PARTNER}>Business Partner & Above</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Detailed Hub Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., InterContinental Hotel Penthouse Suite"
                      value={newLoc}
                      onChange={(e) => setNewLoc(e.target.value)}
                      className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="py-2 px-4 text-xs font-semibold text-stone-450 hover:text-white uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-6 bg-gold-gradient text-black text-xs font-extrabold rounded-lg uppercase tracking-wider hover:opacity-95 shadow-md"
                  >
                    Publish Event
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
