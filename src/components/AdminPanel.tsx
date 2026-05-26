import React, { useState } from "react";
import { useClubState } from "../context/ClubStateContext";
import { UserRole, BusinessStatus, BusinessProfile, UserProfile } from "../types";
import { ShieldCheck, Users, Briefcase, RefreshCw, Key, ToggleLeft, ToggleRight, Check, X, ShieldAlert, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const AdminPanel: React.FC = () => {
  const { 
    users, 
    businesses, 
    introductions, 
    auditLogs, 
    categories, 
    addCategory, 
    removeCategory, 
    blockUser, 
    updateUserRole, 
    updateUserReputation, 
    updateBusinessStatus, 
    moderateMatchmaking,
    adminTwoFactorVerified,
    setAdminTwoFactorVerified,
    triggerNotification
  } = useClubState();

  const [pinCode, setPinCode] = useState("");
  const [pinError, setPinError] = useState("");

  // Tab views
  const [adminTab, setAdminTab] = useState<"users" | "businesses" | "matchmaking" | "categories" | "audit">("users");

  // Category addition
  const [newCatName, setNewCatName] = useState("");

  // Matchmaking note states
  const [matchmakingNotes, setMatchmakingNotes] = useState<Record<string, string>>({});

  // Confirm administrative 2FA security validation
  // Standard code is pre-defined as 9999 for quick demonstration
  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode === "9999" || pinCode === "2512") {
      setAdminTwoFactorVerified(true);
      setPinError("");
      triggerNotification("🛡 Admin 2FA Cleared", "Secure session tokens established for Chief executive account.", "SYSTEM");
    } else {
      setPinError("❌ Code Invalid! Pro Tip: Enter default pin code 9999 to continue.");
    }
  };

  const handleDisconnect2FA = () => {
    setAdminTwoFactorVerified(false);
    setPinCode("");
    triggerNotification("🛡 Admin Sesson Revoked", "System settings reset to encrypted lock.", "SYSTEM");
  };

  const handleApproveBusiness = (bizId: string) => {
    updateBusinessStatus(bizId, BusinessStatus.PUBLISHED);
    alert("Corporate Partner listed in directory successfully.");
  };

  const handleHideBusiness = (bizId: string) => {
    updateBusinessStatus(bizId, BusinessStatus.HIDDEN);
  };

  const handleMatchmakingEvaluation = (id: string, status: "APPROVED" | "REJECTED") => {
    const counselorResponse = matchmakingNotes[id] || "No Counselor response specified.";
    moderateMatchmaking(id, status, counselorResponse);
    alert(`B2B Matchmaking reviewed and set as ${status}.`);
  };

  const handleAddCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName.trim());
    setNewCatName("");
  };

  // Stats calculation
  const totalUsersCount = users.length;
  const VIPUsersCount = users.filter(u => u.role === UserRole.VIP).length;
  const pendingBizCount = businesses.filter(b => b.status === BusinessStatus.UNDER_REVIEW).length;
  const activeIntros = introductions.filter(i => i.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-[#060605] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Unverified prompt */}
        {!adminTwoFactorVerified ? (
          <div className="max-w-md mx-auto bg-[#0b0b0a] border border-zinc-900 rounded-2xl p-6 sm:p-8 text-center shadow-2xl relative mt-16" id="2fa_lock_prompt">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center border border-[#d4af37 ]">
              <Key className="w-7 h-7 text-[#d4af37]" />
            </div>

            <h2 className="text-xl font-display font-semibold text-white mt-6 uppercase tracking-wider">SECURE DESK 2FA CARD LOCK</h2>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              To guarantee absolute privacy and system integrity, please verify your Chief administrative code.
            </p>

            <form onSubmit={handleVerify2FA} className="mt-8 space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-550 mb-1">Enter Master SECURE PIN *</label>
                <input
                  type="password"
                  required
                  placeholder="Master Code PIN Pin"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="block w-full py-2.5 px-3 tracking-[0.6em] text-center bg-[#060605] border border-zinc-800 rounded-lg text-lg text-white font-mono placeholder-stone-750 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {pinError && (
                <p className="text-[11px] text-red-400 font-mono italic leading-normal">
                  {pinError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-red-600 to-amber-700 hover:opacity-95 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-all shadow-md cursor-pointer border border-[#d4af37]/30"
              >
                Validate Security PIN
              </button>

              <span className="text-[10px] text-stone-605 block font-mono">
                🔒 Hint: Enter default system code <strong className="text-[#d4af37]">9999</strong> to unlock panel.
              </span>
            </form>
          </div>
        ) : (
          /* Secured Operational Dashboard Panel context */
          <div id="admin_control_desk">
            
            {/* Header section with status logs and logout triggers */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] text-red-400 font-mono tracking-widest uppercase">Admin Management console</span>
                <h1 className="text-2xl font-display font-semibold text-white mt-1">CHIEF EXECUTIVE DASHBOARD</h1>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  Adjust reputation weights, publish business directories, moderate match introducers, and trace system audits.
                </p>
              </div>

              <button
                onClick={handleDisconnect2FA}
                className="px-4 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-900/60 rounded text-red-400 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Lock Session
              </button>
            </div>

            {/* Micro analytics meters cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg text-left">
                <span className="text-stone-500 text-[9px] block font-mono">REGISTRY MEMBERS</span>
                <span className="text-2xl text-stone-200 font-bold block mt-1 tracking-tight">{totalUsersCount} Profiles</span>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg text-left">
                <span className="text-stone-500 text-[9px] block font-mono">VIP MEMBERS</span>
                <span className="text-2xl text-amber-500 font-bold block mt-1 tracking-tight">{VIPUsersCount} VIPs</span>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg text-left">
                <span className="text-stone-500 text-[9px] block font-mono">PENDING COMPLIANCE REVIEW</span>
                <span className="text-2xl text-red-400 font-bold block mt-1 tracking-tight">{pendingBizCount} Partners</span>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-lg text-left">
                <span className="text-stone-500 text-[9px] block font-mono">B2B LINKAGES PENDING</span>
                <span className="text-2xl text-[#d4af37] font-bold block mt-1 tracking-tight">{activeIntros} Requests</span>
              </div>

            </div>

            {/* Internal navigation section headers */}
            <div className="flex flex-wrap border-b border-zinc-900 mb-6 gap-2">
              <button
                onClick={() => setAdminTab("users")}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-t-lg transition-colors outline-none cursor-pointer ${
                  adminTab === "users" ? "bg-zinc-900 text-white" : "text-stone-500 hover:text-stone-300"
                }`}
              >
                Users moderation
              </button>
              <button
                onClick={() => setAdminTab("businesses")}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-t-lg transition-colors outline-none cursor-pointer ${
                  adminTab === "businesses" ? "bg-zinc-900 text-white" : "text-stone-500 hover:text-stone-300"
                }`}
              >
                Businesses review
              </button>
              <button
                onClick={() => setAdminTab("matchmaking")}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-t-lg transition-colors outline-none cursor-pointer ${
                  adminTab === "matchmaking" ? "bg-zinc-900 text-white" : "text-stone-500 hover:text-stone-300"
                }`}
              >
                B2B introductions
              </button>
              <button
                onClick={() => setAdminTab("categories")}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-t-lg transition-colors outline-none cursor-pointer ${
                  adminTab === "categories" ? "bg-zinc-900 text-white" : "text-stone-500 hover:text-stone-300"
                }`}
              >
                Sponsor categories
              </button>
              <button
                onClick={() => setAdminTab("audit")}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-t-lg transition-colors outline-none cursor-pointer ${
                  adminTab === "audit" ? "bg-zinc-900 text-white" : "text-[#d4af37] hover:text-amber-500"
                }`}
              >
                Analytics Audit logs
              </button>
            </div>

            {/* TAB CORRESPONDING VIEW MODULES */}

            {adminTab === "users" && (
              /* User roster table panel */
              <div className="bg-[#0b0b0a] rounded-xl border border-zinc-900 overflow-hidden p-6" id="users_moderation_tab">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">
                  VIP Club registries control
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300 divide-y divide-zinc-900">
                    <thead>
                      <tr className="text-[10px] uppercase font-mono text-zinc-550 border-b border-zinc-900">
                        <th className="py-2.5 px-3">Avatar & Name</th>
                        <th className="py-2.5 px-3">Role Tier</th>
                        <th className="py-2.5 px-3">Card Serial</th>
                        <th className="py-2.5 px-3">Verification score</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-zinc-950/40">
                          <td className="py-3 px-3 flex items-center gap-2">
                            <img src={u.avatarUrl} alt="av" className="w-6 h-6 rounded-full object-cover" />
                            <span className="font-bold">{u.name} {u.lastName || ""}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-[10px] font-mono leading-none bg-zinc-900 p-1 rounded font-bold uppercase">{u.role}</span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[#d4af37]">{u.cardId}</td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span>★ {u.reputation}</span>
                              <div className="flex gap-1" id={`rep_btns_${u.id}`}>
                                <button 
                                  onClick={() => updateUserReputation(u.id, 10)}
                                  className="text-[9px] text-[#d4af37] border border-amber-950 px-1 hover:bg-amber-950/20 rounded font-bold cursor-pointer"
                                >
                                  +10
                                </button>
                                <button 
                                  onClick={() => updateUserReputation(u.id, -20)}
                                  className="text-[9px] text-stone-500 border border-zinc-850 px-1 hover:bg-zinc-900 rounded font-bold cursor-pointer"
                                >
                                  -20
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            {u.isBlocked ? (
                              <span className="text-[10px] font-mono tracking-wider font-bold text-red-500 bg-red-950/10 border border-red-950 px-2 py-0.5 rounded">BLOCKED</span>
                            ) : (
                              <span className="text-[10px] font-mono tracking-wider font-bold text-emerald-400 bg-emerald-950/10 border border-emerald-950 px-2 py-0.5 rounded">ACTIVE</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            {/* Toggle Block/Unblock statuses instantly */}
                            {u.role !== UserRole.ADMIN ? (
                              <button
                                onClick={() => blockUser(u.id, !u.isBlocked)}
                                className={`px-2 py-1 text-[10px] font-semibold rounded uppercase tracking-wider transition-colors cursor-pointer ${
                                  u.isBlocked 
                                    ? "bg-emerald-950 text-emerald-400 border border-emerald-900"
                                    : "bg-red-950 text-red-400 border border-red-900"
                                }`}
                              >
                                {u.isBlocked ? "Unblock User" : "Block User"}
                              </button>
                            ) : (
                              <span className="text-zinc-650 italic text-[11px]">Immune</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {adminTab === "businesses" && (
              /* Sponsors moderation review desk */
              <div className="space-y-4" id="businesses_moderation_tab">
                <h3 className="text-xs font-mono font-bold text-stone-400 tracking-[0.14em] uppercase">
                  Sponsor Directory approvals pipeline ({businesses.length})
                </h3>

                {businesses.map(b => (
                  <div key={b.id} className="bg-[#0b0b0a] rounded-xl border border-zinc-900 p-5 flex flex-col justify-between md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] bg-zinc-950 px-2 py-0.5 border border-zinc-900 rounded font-mono text-stone-400">{b.category}</span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                          b.status === BusinessStatus.PUBLISHED 
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-900"
                            : b.status === BusinessStatus.HIDDEN
                            ? "bg-zinc-900 text-zinc-500 border border-zinc-800"
                            : "bg-amber-950 text-amber-400 border border-amber-900"
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display tracking-wide">{b.name}</h4>
                      <p className="text-[11px] text-[#d4af37] font-mono">Representative: {b.representativeName} ({b.phone} • {b.email})</p>
                      <p className="text-xs text-stone-400 leading-normal mt-2">{b.description}</p>
                      <div className="p-2.5 p bg-zinc-950 rounded border border-zinc-905 mt-3 text-xs">
                        <span className="text-[9px] text-[#d4af37] tracking-wider uppercase block font-mono">Sponsor Condition:</span>
                        <span className="text-stone-300 font-semibold">{b.specialCondition}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0 md:items-end">
                      {b.status === BusinessStatus.UNDER_REVIEW && (
                        <button
                          onClick={() => handleApproveBusiness(b.id)}
                          className="px-4 py-1.5 bg-emerald-950 text-emerald-400 font-bold text-xs rounded border border-emerald-900 hover:bg-emerald-900 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Approve Profile
                        </button>
                      )}
                      
                      {b.status === BusinessStatus.PUBLISHED ? (
                        <button
                          onClick={() => handleHideBusiness(b.id)}
                          className="px-4 py-1.5 bg-zinc-900 text-stone-400 text-xs font-semibold rounded border border-zinc-800 hover:text-red-400 hover:border-red-900 transition-colors cursor-pointer"
                        >
                          Hide Listing
                        </button>
                      ) : (
                        b.status !== BusinessStatus.UNDER_REVIEW && (
                          <button
                            onClick={() => handleApproveBusiness(b.id)}
                            className="px-4 py-1.5 bg-zinc-900 text-[#d4af37] text-xs font-semibold rounded border border-zinc-800 hover:bg-zinc-850 transition-colors cursor-pointer"
                          >
                            Republish Offer
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {adminTab === "matchmaking" && (
              /* VIP closed matchmaking review desk */
              <div className="space-y-4" id="matchmaking_moderation_tab">
                <h3 className="text-xs font-mono font-bold text-stone-400 tracking-[0.14em] uppercase">
                  B2B Introductions counselor desk
                </h3>
                
                {introductions.map(req => (
                  <div key={req.id} className="bg-[#0b0b0a] border border-zinc-900 rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900 text-stone-400 font-mono">TARGET OUTLET: {req.targetIndustry}</span>
                        <h4 className="text-xs text-[#d4af37] font-mono mt-1">Requested by: {req.requesterName}</h4>
                      </div>
                      <span className="text-[9px] font-mono uppercase bg-amber-950/20 text-[#d4af37] border border-amber-950/40 px-2 py-0.5 rounded">
                        {req.status}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed mb-4">{req.goal}</p>

                    {/* Review text actions */}
                    {req.status === "PENDING" ? (
                      <div className="space-y-3.5 pt-3 border-t border-zinc-900/40">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-550 mb-1">Counselor Response/Match Recommendation *</label>
                          <input
                            type="text"
                            placeholder="e.g., Connected with Marc Keller at Prestige Swiss Advisors directly."
                            value={matchmakingNotes[req.id] || ""}
                            onChange={(e) => setMatchmakingNotes({ ...matchmakingNotes, [req.id]: e.target.value })}
                            className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded text-xs text-stone-200 placeholder-stone-700 focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>

                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleMatchmakingEvaluation(req.id, "REJECTED")}
                            className="px-3 py-1 bg-red-950/20 text-red-400 text-[10px] font-bold rounded border border-red-900 uppercase cursor-pointer"
                          >
                            Return
                          </button>
                          <button
                            onClick={() => handleMatchmakingEvaluation(req.id, "APPROVED")}
                            className="px-4.5 py-1 bg-gold-gradient text-black text-[10px] font-extrabold rounded uppercase tracking-wider cursor-pointer"
                          >
                            Verify & Dispatch Linkage
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-zinc-950 rounded border border-zinc-910 flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] text-emerald-400 font-mono uppercase block">DISPATCHED RESOLUTION:</span>
                          <span className="text-xs text-stone-400 italic block mt-1">
                            "{req.adminNote || "Approved without notes."}"
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {adminTab === "categories" && (
              /* Directory Category configuration manager */
              <div className="bg-[#0b0b0a] rounded-xl border border-zinc-900 p-6" id="categories_configuration_tab">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 font-display">
                  Sponsors and Businesses categorizer
                </h3>

                <form onSubmit={handleAddCat} className="flex gap-2 max-w-md mb-8">
                  <input
                    type="text"
                    required
                    placeholder="New category name: e.g., Private Island Villas"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="flex-1 py-1.5 px-3 bg-[#060605] border border-zinc-800 rounded text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="py-1.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-[#d4af37] text-xs font-semibold rounded border border-zinc-850 cursor-pointer"
                  >
                    Add Row
                  </button>
                </form>

                <div className="space-y-2 max-w-md font-mono text-xs">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="p-2.5 bg-zinc-950 rounded border border-zinc-900 flex justify-between items-center text-stone-300">
                      <span>{cat}</span>
                      <button
                        onClick={() => removeCategory(cat)}
                        className="text-stone-500 hover:text-red-400 text-[10px] uppercase font-bold transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {adminTab === "audit" && (
              /* Read-only Security and Activity Analytics trace logs */
              <div className="bg-[#0b0b0a] rounded-xl border border-zinc-900 p-6" id="audit_logs_tab">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                      Security & Operation Audits Tracker
                    </h3>
                    <p className="text-[10px] text-stone-500 mt-0.5">Real-time system behavior logs representing in-app member analytics tracking</p>
                  </div>
                </div>

                <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
                  {auditLogs.map(log => (
                    <div 
                      key={log.id} 
                      className="p-3.5 rounded bg-zinc-950 border border-zinc-905 font-mono text-xs hover:border-zinc-800 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between mb-2 gap-2 text-[10px] text-stone-500">
                        <span className="text-[#d4af37] font-semibold uppercase">{log.action}</span>
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-stone-300 leading-normal">{log.details}</p>
                      <div className="mt-2 text-[9px] text-stone-550 text-right">
                        Executor: {log.userName} (ID: {log.userId})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
