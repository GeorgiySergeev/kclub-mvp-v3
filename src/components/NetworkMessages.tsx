import React, { useState, useRef, useEffect } from "react";
import { useClubState } from "../context/ClubStateContext";
import { UserRole, ClubMessage, UserProfile } from "../types";
import { Send, Users, ShieldAlert, Award, MessageSquare, Flame } from "lucide-react";
import { motion } from "motion/react";

export const NetworkMessages: React.FC = () => {
  const { 
    currentUser, 
    users, 
    messages, 
    sendCommunityMessage, 
    sendPrivateMessage 
  } = useClubState();

  const [activeTab, setActiveTab] = useState<"lobby" | "private">("lobby");
  const [selectedPeerId, setSelectedPeerId] = useState<string>("");
  const [lobbyInput, setLobbyInput] = useState("");
  const [privateInput, setPrivateInput] = useState("");

  const lobbyEndRef = useRef<HTMLDivElement>(null);
  const privateEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll messages
  useEffect(() => {
    lobbyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTab]);

  useEffect(() => {
    privateEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedPeerId, activeTab]);

  // Filter messages
  const lobbyMessages = messages.filter(m => m.recipientId === "ALL");
  
  const privateMessages = messages.filter(m => 
    (m.senderId === currentUser.id && m.recipientId === selectedPeerId) || 
    (m.senderId === selectedPeerId && m.recipientId === currentUser.id)
  );

  // Filter peers (all users except current, who are not blocked)
  const availablePeers = users.filter(u => u.id !== currentUser.id && !u.isBlocked);

  // Pre-select first peer if none selected
  useEffect(() => {
    if (!selectedPeerId && availablePeers.length > 0) {
      setSelectedPeerId(availablePeers[0].id);
    }
  }, [availablePeers, selectedPeerId]);

  const handleSendLobby = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lobbyInput.trim()) return;
    sendCommunityMessage(lobbyInput.trim());
    setLobbyInput("");
  };

  const handleSendPrivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privateInput.trim() || !selectedPeerId) return;
    sendPrivateMessage(selectedPeerId, privateInput.trim());
    setPrivateInput("");
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return "text-red-400";
      case UserRole.MANAGER: return "text-purple-400";
      case UserRole.PARTNER: return "text-blue-400";
      case UserRole.VIP: return "text-amber-400";
      default: return "text-stone-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#060605] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Page title */}
        <div className="mb-10" id="networking_title">
          <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase">Encrypted Core Communications</span>
          <h1 className="text-3xl font-display font-semibold text-white mt-1">NETWORKING PLATFORM</h1>
          <p className="text-xs text-stone-500 font-mono mt-1">
            Build high-touch international syndicates, chat with colleagues, and consult VIP professionals directly.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-900 mb-8 gap-6">
          <button
            onClick={() => setActiveTab("lobby")}
            className={`pb-3 text-sm font-semibold tracking-wider uppercase flex items-center gap-2.5 transition-all outline-none ${
              activeTab === "lobby" 
                ? "border-b-2 border-[#d4af37] text-white" 
                : "text-stone-550 hover:text-stone-300"
            }`}
          >
            <Users className="w-4.5 h-4.5 text-[#d4af37]" /> Lobby Community Feed
          </button>
          <button
            onClick={() => setActiveTab("private")}
            className={`pb-3 text-sm font-semibold tracking-wider uppercase flex items-center gap-2.5 transition-all outline-none ${
              activeTab === "private" 
                ? "border-b-2 border-[#d4af37] text-white" 
                : "text-stone-550 hover:text-stone-300"
            }`}
          >
            <MessageSquare className="w-4.5 h-4.5 text-[#d4af37]" /> Private Encrypted chats
          </button>
        </div>

        {activeTab === "lobby" ? (
          /* Lobby Forum UI */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="lobby_forum_layout">
            
            {/* Left Column: Peer list snapshot */}
            <div className="lg:col-span-1 bg-[#0b0b0a] border border-zinc-900 rounded-xl p-4 h-fit">
              <h3 className="text-xs font-bold text-stone-400 tracking-wider uppercase mb-4 flex items-center gap-1.5 font-display">
                <Flame className="w-4 h-4 text-orange-500" /> Active Members
              </h3>
              <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
                {users.map(peer => (
                  <div key={peer.id} className="flex items-center gap-2.5">
                    <img 
                      src={peer.avatarUrl} 
                      alt={peer.name} 
                      className="w-8 h-8 rounded-full object-cover border border-zinc-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-stone-300 truncate">
                        {peer.name} {peer.lastName || ""}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[8.5px] uppercase font-mono font-bold leading-none ${getRoleColor(peer.role)}`}>
                          {peer.role}
                        </span>
                        <span className="text-[10px] text-stone-500 flex items-center gap-0.5 leading-none">
                          ★ {peer.reputation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Chat layout */}
            <div className="lg:col-span-3 bg-[#0a0a09] border border-zinc-900 rounded-xl flex flex-col h-[520px] shadow-2xl relative">
              <div className="px-5 py-3 border-b border-zinc-900 flex justify-between items-center bg-[#10100f]">
                <div>
                  <h3 className="text-xs font-bold tracking-wider text-[#d4af37] uppercase">Lobby Lounge</h3>
                  <p className="text-[10px] text-stone-500 font-mono">Collective communications board - visible to all registered members</p>
                </div>
              </div>

              {/* Chat messages viewport */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans bg-[#080807]/30">
                {lobbyMessages.map(msg => {
                  const isOwn = msg.senderId === currentUser.id;
                  return (
                    <div 
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] ${isOwn ? "ml-auto flex-row-reverse text-right" : "text-left"}`}
                    >
                      {!isOwn && (
                        <img 
                          src={msg.senderAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"} 
                          alt={msg.senderName} 
                          className="w-8 h-8 rounded-full object-cover border border-zinc-800 self-end"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div>
                        <div className={`flex items-center gap-1 text-[11px] font-mono text-stone-500 ${isOwn ? "justify-end" : "justify-start"}`}>
                          <span className="font-semibold text-stone-400">{msg.senderName}</span>
                          <span>•</span>
                          <span>{formatTime(msg.timestamp)}</span>
                        </div>
                        <div className={`mt-1.5 p-3 rounded-lg text-xs leading-relaxed ${
                          isOwn 
                            ? "bg-[#d4af37] text-black font-medium rounded-tr-none shadow-md"
                            : "bg-zinc-900 text-stone-300 rounded-tl-none border border-zinc-800"
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={lobbyEndRef} />
              </div>

              {/* Sticky bottom send bar */}
              <form onSubmit={handleSendLobby} className="p-4 border-t border-zinc-900 bg-[#0c0c0b] flex gap-2 rounded-b-xl">
                <input
                  type="text"
                  placeholder="Share announcement or greeting message..."
                  value={lobbyInput}
                  onChange={(e) => setLobbyInput(e.target.value)}
                  className="flex-1 py-2 px-4 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80 placeholder-stone-600"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[#d4af37] rounded-lg cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          /* Private Message UI */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="private_chat_layout">
            
            {/* Left Column: Peer selector list */}
            <div className="lg:col-span-1 bg-[#0b0b0a] border border-zinc-900 rounded-xl p-4 flex flex-col h-[520px]">
              <h3 className="text-xs font-bold text-stone-400 tracking-wider uppercase mb-4 font-display">
                Select Peer Connection
              </h3>
              <div className="space-y-1.5 overflow-y-auto flex-1 pr-1">
                {availablePeers.map(peer => {
                  const isSelected = peer.id === selectedPeerId;
                  const latestPeerMessage = messages
                    .filter(m => (m.senderId === peer.id && m.recipientId === currentUser.id) || (m.senderId === currentUser.id && m.recipientId === peer.id))
                    .pop();

                  return (
                    <button
                      key={peer.id}
                      onClick={() => setSelectedPeerId(peer.id)}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                        isSelected 
                          ? "bg-amber-950/25 border border-amber-500/30 text-white" 
                          : "text-stone-450 hover:bg-zinc-900 border border-transparent"
                      }`}
                    >
                      <img 
                        src={peer.avatarUrl} 
                        alt={peer.name} 
                        className="w-9 h-9 rounded-full object-cover border border-zinc-800"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold truncate block">{peer.name}</span>
                          <span className="text-[8px] font-mono text-amber-500 font-bold uppercase">{peer.role}</span>
                        </div>
                        <p className="text-[10px] text-stone-500 truncate mt-0.5">
                          {latestPeerMessage ? latestPeerMessage.content : `Consult ${peer.name} directly`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active chat thread */}
            <div className="lg:col-span-3 bg-[#0a0a09] border border-zinc-900 rounded-xl flex flex-col h-[520px] shadow-2xl relative">
              {selectedPeerId ? (
                <>
                  <div className="px-5 py-3 border-b border-zinc-900 flex justify-between items-center bg-[#10100f] rounded-t-xl">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={users.find(u => u.id === selectedPeerId)?.avatarUrl} 
                        alt="peer" 
                        className="w-7 h-7 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                          {users.find(u => u.id === selectedPeerId)?.name} {users.find(u => u.id === selectedPeerId)?.lastName || ""}
                        </h3>
                        <p className="text-[9px] text-[#d4af37] font-mono">
                          Direct consultation channel • REPUTATION SCORE {users.find(u => u.id === selectedPeerId)?.reputation} ★
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages container */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans bg-[#080807]/30">
                    {privateMessages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <Award className="w-8 h-8 text-[#d4af37] opacity-40 mb-3" />
                        <p className="text-xs font-mono text-zinc-500 uppercase">Secure Tunnel Opened</p>
                        <p className="text-stone-400 text-xs mt-1 max-w-sm">
                          Send a secure direct query to initiate corporate matchmaking and negotiations.
                        </p>
                      </div>
                    ) : (
                      privateMessages.map(msg => {
                        const isOwn = msg.senderId === currentUser.id;
                        return (
                          <div 
                            key={msg.id}
                            className={`flex gap-3 max-w-[85%] ${isOwn ? "ml-auto flex-row-reverse text-right" : "text-left"}`}
                          >
                            <div>
                              <div className={`flex items-center gap-1.5 text-[11px] font-mono text-stone-500 ${isOwn ? "justify-end" : "justify-start"}`}>
                                <span>{formatTime(msg.timestamp)}</span>
                              </div>
                              <div className={`mt-1.5 p-3 rounded-lg text-xs leading-relaxed ${
                                isOwn 
                                  ? "bg-[#d4af37] text-black font-semibold rounded-tr-none shadow-md"
                                  : "bg-zinc-900 text-stone-300 rounded-tl-none border border-zinc-800"
                              }`}>
                                {msg.content}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={privateEndRef} />
                  </div>

                  {/* Message submit footer form */}
                  <form onSubmit={handleSendPrivate} className="p-4 border-t border-zinc-900 bg-[#0c0c0b] flex gap-2 rounded-b-xl">
                    <input
                      type="text"
                      placeholder="Write private executive message..."
                      value={privateInput}
                      onChange={(e) => setPrivateInput(e.target.value)}
                      className="flex-1 py-2 px-4 bg-[#060605] border border-zinc-800 rounded-lg text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/80 placeholder-stone-600"
                    />
                    <button
                      type="submit"
                      className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[#d4af37] rounded-lg cursor-pointer transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center text-stone-500">
                  <Flame className="w-10 h-10 select-none opacity-25 text-amber-500 mb-3" />
                  <p className="text-sm font-semibold text-stone-300">No Target Peer Selected</p>
                  <p className="text-xs mt-1">Please select a validated member from the left list block.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
