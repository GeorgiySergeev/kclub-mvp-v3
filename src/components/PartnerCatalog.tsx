import React, { useState } from "react";
import { useClubState } from "../context/ClubStateContext";
import { UserRole, BusinessStatus, BusinessProfile } from "../types";
import { Search, Filter, Lock, Unlock, ArrowRight, ShieldCheck, Plus, Globe, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PartnerCatalogProps {
  onOpenPartnerModal: (partner: BusinessProfile) => void;
}

export const PartnerCatalog: React.FC<PartnerCatalogProps> = ({ onOpenPartnerModal }) => {
  const { 
    currentUser, 
    businesses, 
    categories, 
    submitBusiness,
    triggerNotification 
  } = useClubState();

  // Filter local state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  // Manage business submission modal
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newBizName, setNewBizName] = useState("");
  const [newBizCategory, setNewBizCategory] = useState(categories[0] || "");
  const [newBizCountry, setNewBizCountry] = useState("");
  const [newBizCity, setNewBizCity] = useState("");
  const [newBizDesc, setNewBizDesc] = useState("");
  const [newBizCondition, setNewBizCondition] = useState("");
  const [newBizWeb, setNewBizWeb] = useState("");
  const [newBizMail, setNewBizMail] = useState(currentUser.email || "");
  const [newBizPhone, setNewBizPhone] = useState(currentUser.phone || "");

  // Gather list of active published partner countries and cities for filters
  const publishedBusinesses = businesses.filter(b => b.status === BusinessStatus.PUBLISHED);

  const countries = ["All", ...Array.from(new Set(publishedBusinesses.map(b => b.country)))];
  const cities = ["All", ...Array.from(new Set(publishedBusinesses.map(b => b.city)))];

  // Apply filters
  const filteredBusinesses = publishedBusinesses.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.specialCondition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
    const matchesCountry = selectedCountry === "All" || b.country === selectedCountry;
    const matchesCity = selectedCity === "All" || b.city === selectedCity;
    return matchesSearch && matchesCategory && matchesCountry && matchesCity;
  });

  const handleCreateBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBizName || !newBizDesc || !newBizCondition) {
      alert("Please fill in company name, description, and discount condition.");
      return;
    }

    submitBusiness({
      name: newBizName,
      representativeName: `${currentUser.name} ${currentUser.lastName || ""}`.trim(),
      email: newBizMail,
      phone: newBizPhone,
      country: newBizCountry || currentUser.country || "Ukraine",
      city: newBizCity || currentUser.city || "Kyiv",
      category: newBizCategory,
      description: newBizDesc,
      specialCondition: newBizCondition,
      website: newBizWeb,
      status: BusinessStatus.UNDER_REVIEW,
      reputationRequired: 0
    });

    // Reset fields
    setNewBizName("");
    setNewBizDesc("");
    setNewBizCondition("");
    setNewBizWeb("");
    setShowSubmitModal(false);
  };

  const getSponsorLogoInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#060605] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10" id="catalog_header">
          <div>
            <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase">Global Member Benefits</span>
            <h1 className="text-3xl font-display font-semibold text-white mt-1">PARTNER CATALOG</h1>
            <p className="text-xs text-stone-500 font-mono mt-1">
              Select verified conditions filter and enjoy closed club advantages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* VIP submitting action */}
            {currentUser.role === UserRole.VIP || currentUser.role === UserRole.PARTNER || currentUser.role === UserRole.ADMIN ? (
              <button
                id="add_business_btn"
                onClick={() => setShowSubmitModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-[#d4af37] hover:to-amber-500 text-black text-xs font-bold rounded-lg uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Submit Business
              </button>
            ) : (
              <div className="bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-900 text-[11px] text-[#d4af37] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> VIP Membership is required to list business
              </div>
            )}
          </div>
        </div>

        {/* Global Catalog Filter Panel */}
        <div className="bg-[#0b0b0a] border border-zinc-900 rounded-xl p-4 sm:p-6 mb-8 shadow-xl" id="filter_panel">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            
            {/* Search query input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-stone-500" />
              </span>
              <input
                type="text"
                placeholder="Find a partner, product or benefit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 placeholder-stone-500 focus:outline-none focus:border-[#d4af37]/80 font-sans transition-all"
              />
            </div>

            {/* Category selection */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80 font-sans cursor-pointer transition-all"
              >
                <option value="All">All categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Country selection */}
            <div>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80 font-sans cursor-pointer transition-all"
              >
                <option value="All">All countries</option>
                {countries.filter(c => c !== "All").map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* City selection */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80 font-sans cursor-pointer transition-all"
              >
                <option value="All">All cities</option>
                {cities.filter(c => c !== "All").map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Results Count indicator */}
        <div className="text-right text-stone-500 text-[11px] font-mono mb-6 uppercase tracking-wider">
          Found {filteredBusinesses.length} partner offer{filteredBusinesses.length !== 1 ? "s" : ""} match{filteredBusinesses.length !== 1 ? "es" : ""}
        </div>

        {/* Dynamic Business List Rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="catalog_grid">
          {filteredBusinesses.length === 0 ? (
            <div className="col-span-full bg-[#0b0b0a] rounded-xl p-12 text-center border border-zinc-900">
              <p className="text-xs text-stone-500 font-mono uppercase">0 listings found</p>
              <p className="text-sm text-stone-400 mt-2">No matching businesses exist for current filter conditions.</p>
              <button 
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedCountry("All");
                  setSelectedCity("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-[#d4af37] text-xs font-semibold rounded hover:bg-zinc-800 uppercase tracking-widest transition-all"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredBusinesses.map(biz => {
              const offersLocked = currentUser.role === UserRole.MEMBER;
              return (
                <div 
                  key={biz.id}
                  className="group bg-[#0c0c0b] border border-zinc-900/80 rounded-xl p-6 hover:border-[#d4af37]/45 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-yellow-500/[0.02]"
                  onClick={() => onOpenPartnerModal(biz)}
                >
                  <div>
                    {/* Header badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase font-mono bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-800 text-stone-400">
                        {biz.category}
                      </span>
                      {offersLocked ? (
                        <span className="text-[10px] text-amber-500 flex items-center gap-1 font-mono uppercase bg-amber-950/20 px-2 py-0.5 rounded border border-amber-950/40">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono uppercase bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-950/40">
                          <Unlock className="w-3 h-3" /> Unlocked
                        </span>
                      )}
                    </div>

                    {/* Logo Representative & Title */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-11 h-11 bg-zinc-900 border border-[#d4af37]/25 rounded-xl flex items-center justify-center font-display font-medium text-lg text-[#d4af37]">
                        {getSponsorLogoInitial(biz.name)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-stone-200 tracking-wide leading-tight group-hover:text-white transition-colors">{biz.name}</h3>
                        <p className="text-[11px] text-stone-400 font-mono mt-0.5">📍 {biz.city}, {biz.country}</p>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-400 leading-relaxed font-sans mt-3 line-clamp-3">
                      {biz.description}
                    </p>

                    {/* Condition highlight box */}
                    <div className="mt-5 p-3.5 rounded bg-zinc-950 border border-zinc-900/80">
                      <p className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase">CLUB PRIVILÈGE CONDITION:</p>
                      {offersLocked ? (
                        <div className="blur-sm select-none pointer-events-none mt-1.5 text-xs text-[#d4af37] font-semibold">
                          Exclusive premium condition hidden for free tier members.
                        </div>
                      ) : (
                        <p className="text-xs text-stone-200 font-semibold mt-1.5 leading-tight">
                          {biz.specialCondition}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900/40 flex items-center justify-between text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
                    <span>Explore details</span>
                    <ArrowRight className="w-4.5 h-4.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Business Submission Form Modal for authenticated high-tier profiles */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f0f0e] border border-zinc-800 rounded-xl max-w-lg w-full p-6 sm:p-8"
              id="submit_business_modal"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">SUBMIT BUSINESS PROPOSAL</h3>
                  <p className="text-[10px] text-[#d4af37] font-mono mt-1">
                    YOUR LISTING WILL GO LIVE FOLLOWING MANAGER COMPLIANCE REVIEW
                  </p>
                </div>
                <button 
                  onClick={() => setShowSubmitModal(false)}
                  className="text-stone-400 hover:text-white text-xs uppercase"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateBusiness} className="space-y-4">
                
                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Company legal name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Zenith Aviation Group"
                    value={newBizName}
                    onChange={(e) => setNewBizName(e.target.value)}
                    className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Service category</label>
                    <select
                      value={newBizCategory}
                      onChange={(e) => setNewBizCategory(e.target.value)}
                      className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80 cursor-pointer"
                    >
                      {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Corporate website</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newBizWeb}
                      onChange={(e) => setNewBizWeb(e.target.value)}
                      className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Country Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Ukraine"
                      value={newBizCountry}
                      onChange={(e) => setNewBizCountry(e.target.value)}
                      className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">City District *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Kyiv"
                      value={newBizCity}
                      onChange={(e) => setNewBizCity(e.target.value)}
                      className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Brief services description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly state private jet leasing catalogs, target audiences, and yacht configurations..."
                    value={newBizDesc}
                    onChange={(e) => setNewBizDesc(e.target.value)}
                    className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Exclusive special member reward *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 20% discount on flight hours, custom booking champagne..."
                    value={newBizCondition}
                    onChange={(e) => setNewBizCondition(e.target.value)}
                    className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80 font-semibold"
                  />
                  <span className="text-[10px] text-stone-500 font-mono mt-1 block leading-tight">
                    Warning: Discounts must stay high-touch and verified specifically for Kylyvnyk Club.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Representative email</label>
                    <input
                      type="email"
                      value={newBizMail}
                      onChange={(e) => setNewBizMail(e.target.value)}
                      className="block w-full py-2 px-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-stone-400 cursor-not-allowed"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Representative phone</label>
                    <input
                      type="tel"
                      value={newBizPhone}
                      onChange={(e) => setNewBizPhone(e.target.value)}
                      className="block w-full py-2 px-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-stone-400 cursor-not-allowed"
                      disabled
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3.5">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="py-2 px-4 text-xs font-semibold text-stone-450 hover:text-white uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-6 bg-gold-gradient text-black text-xs font-extrabold rounded-lg uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
                  >
                    Send to Review
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
