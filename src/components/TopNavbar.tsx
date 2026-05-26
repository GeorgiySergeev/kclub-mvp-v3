import React, { useState } from "react";
import { useClubState } from "../context/ClubStateContext";
import { UserRole } from "../types";
import { Bell, ShieldAlert, Award, User, RefreshCw, Layers, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ClubLogo } from "./ClubLogo";

interface TopNavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ activeSection, setActiveSection }) => {
  const { 
    currentUser, 
    availableUsers, 
    switchUser, 
    notifications, 
    markNotificationRead,
    clearNotifications,
    language,
    setLanguage
  } = useClubState();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead);

  // Helper to style active category navigation item
  const navItemClass = (sec: string) => {
    const isActive = activeSection === sec;
    return `relative px-3 py-2 text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
      isActive 
        ? "text-[#d4af37] font-semibold" 
        : "text-gray-400 hover:text-white"
    }`;
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return "bg-red-950/80 text-red-400 border border-red-800/60";
      case UserRole.MANAGER: return "bg-purple-950/80 text-purple-300 border border-purple-800/65";
      case UserRole.PARTNER: return "bg-blue-950/80 text-blue-300 border border-blue-800/60";
      case UserRole.VIP: return "bg-amber-950/80 text-amber-300 border border-[#d4af37]/60";
      default: return "bg-zinc-800 text-zinc-400 border border-zinc-700";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a09]/95 border-b border-zinc-900/80 backdrop-blur-md px-4 sm:px-6 py-[15px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveSection("LANDING")} 
          className="flex items-center gap-2 cursor-pointer group"
          id="nav_logo"
        >
          <ClubLogo size="sm" showText={false} idPrefix="nav-logo" />
          <div className="text-left">
            <span className="font-serif tracking-[0.16em] text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 block -mb-0.5 group-hover:from-yellow-400 group-hover:to-amber-500 transition-all duration-300">
              KYLYVNYK
            </span>
            <span className="text-stone-400 font-sans text-[8px] sm:text-[9px] block tracking-[0.32em] uppercase">
              BUSINESS CLUB
            </span>
          </div>
        </div>

        {/* Central Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <div className={navItemClass("LANDING")} onClick={() => setActiveSection("LANDING")}>
            {language === "RU" ? "Главная" : "Home"}
            {activeSection === "LANDING" && <motion.div layoutId="navline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />}
          </div>
          <div className={navItemClass("DIRECTORY")} onClick={() => setActiveSection("DIRECTORY")}>
            {language === "RU" ? "Партнеры" : "Partners"}
            {activeSection === "DIRECTORY" && <motion.div layoutId="navline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />}
          </div>
          <div className={navItemClass("EVENTS")} onClick={() => setActiveSection("EVENTS")}>
            {language === "RU" ? "События" : "Events"}
            {activeSection === "EVENTS" && <motion.div layoutId="navline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />}
          </div>
          <div className={navItemClass("NETWORKING")} onClick={() => setActiveSection("NETWORKING")}>
            {language === "RU" ? "Нетворкинг" : "Networking"}
            {activeSection === "NETWORKING" && <motion.div layoutId="navline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />}
          </div>
          
          {(currentUser.role === UserRole.VIP || currentUser.role === UserRole.PARTNER || currentUser.role === UserRole.ADMIN) && (
            <div className={navItemClass("INTRODUCTIONS")} onClick={() => setActiveSection("INTRODUCTIONS")}>
              {language === "RU" ? "Интро" : "Intros"}
              {activeSection === "INTRODUCTIONS" && <motion.div layoutId="navline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />}
            </div>
          )}

          <div className={navItemClass("MY_CARD")} onClick={() => setActiveSection("MY_CARD")}>
            {language === "RU" ? "Личный Кабинет" : "Personal Cabinet"}
            {activeSection === "MY_CARD" && <motion.div layoutId="navline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />}
          </div>

          <div className={navItemClass("BILLING")} onClick={() => setActiveSection("BILLING")}>
            {language === "RU" ? "Оплата" : "Billing"}
            {activeSection === "BILLING" && <motion.div layoutId="navline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />}
          </div>

          {(currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.MANAGER) && (
            <div className="relative" id="nav_admin_sec">
              <span 
                onClick={() => setActiveSection("ADMIN_PANEL")} 
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeSection === "ADMIN_PANEL"
                    ? "bg-[#d4af37] text-black shadow-md"
                    : "bg-red-950/20 text-red-400 hover:bg-red-950/40 border border-red-900/40"
                }`}
              >
                {language === "RU" ? "Панель Управления" : "Control Panel"}
              </span>
            </div>
          )}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">

          {/* Premium Language Switcher */}
          <div className="flex items-center bg-zinc-950/80 border border-zinc-900 rounded-lg p-0.5 select-none" id="nav_lang_switcher">
            <button
              onClick={() => setLanguage("EN")}
              className={`px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded-sm transition-all cursor-pointer ${
                language === "EN"
                  ? "bg-[#d4af37] text-black shadow-inner"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("RU")}
              className={`px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded-sm transition-all cursor-pointer ${
                language === "RU"
                  ? "bg-[#d4af37] text-black shadow-inner"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              RU
            </button>
          </div>
          
          {/* Quick Notification Bell */}
          <div className="relative" id="nav_notifs">
            <button 
              onClick={() => {
                setShowNotifDropdown(!showNotifDropdown);
                setShowUserDropdown(false);
              }}
              className="p-2 rounded-full text-stone-400 hover:text-[#d4af37] hover:bg-stone-900/60 transition-colors relative"
              title="Push Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-[#0a0a09]" />
              )}
            </button>

            {/* Notification Dropdown Container */}
            <AnimatePresence>
              {showNotifDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0f0f0e] border border-zinc-800/90 rounded-xl shadow-2xl overflow-hidden z-50 text-stone-200"
                >
                  <div className="px-4 py-3 bg-[#141412] border-b border-zinc-800 flex items-center justify-between">
                    <h3 className="text-xs font-semibold tracking-wider text-[#d4af37] uppercase">Notifications</h3>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={clearNotifications}
                        className="text-[10px] text-stone-500 hover:text-stone-300 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-zinc-900">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-stone-600 font-mono">
                        No notifications triggered yet
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3 text-left transition-colors cursor-pointer ${
                            n.isRead ? "bg-[#0f0f0e] opacity-60" : "bg-amber-950/10 hover:bg-amber-950/20"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-semibold text-stone-300">{n.title}</h4>
                            <span className="text-[9px] font-mono text-stone-500">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">{n.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Persona Role Switcher Simulator Toggle */}
          <div className="relative" id="nav_user_profile">
            <button 
              onClick={() => {
                setShowUserDropdown(!showUserDropdown);
                setShowNotifDropdown(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-stone-900/60 transition-colors border border-zinc-800"
            >
              <img 
                src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"} 
                alt={currentUser.name} 
                className="w-7 h-7 rounded-full object-cover border border-[#d4af37]/30"
                referrerPolicy="no-referrer"
              />
              <span className="hidden sm:inline-block text-xs font-medium text-stone-300 pr-1 select-none">
                {currentUser.name}
              </span>
            </button>

            {/* User Account / Role Switch Simulator Dropdown */}
            <AnimatePresence>
              {showUserDropdown && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-72 bg-[#0f0f0e] border border-zinc-800/90 rounded-xl shadow-2xl overflow-hidden z-50 p-1"
                >
                  <div className="px-4 py-3 border-b border-zinc-900 bg-[#121210]/60 rounded-t-lg">
                    <p className="text-xs text-stone-500 font-mono tracking-wider">MEMBER PROFILE</p>
                    <p className="text-sm font-semibold text-stone-200 mt-1">
                      {currentUser.name} {currentUser.lastName || ""}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${getRoleBadgeColor(currentUser.role)}`}>
                        {currentUser.role}
                      </span>
                      <span className="text-xs text-[#d4af37] flex items-center gap-0.5">
                        <Award className="w-3.5 h-3.5" />
                        Rep: {currentUser.reputation}
                      </span>
                    </div>
                  </div>

                  {/* Simulator Switching Option */}
                  <div className="p-2">
                    <p className="px-3 py-1 text-[10px] text-stone-500 font-bold uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <RefreshCw className="w-3 h-3 text-[#d4af37]" /> Simulate Club Role
                    </p>
                    <div className="space-y-1 mt-1">
                      {availableUsers.map(user => (
                        <button
                          key={user.id}
                          onClick={() => {
                            switchUser(user.id);
                            setShowUserDropdown(false);
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                            user.id === currentUser.id 
                              ? "bg-amber-950/20 text-[#d4af37] border border-amber-950" 
                              : "text-stone-300 hover:bg-zinc-900"
                          }`}
                        >
                          <img 
                            src={user.avatarUrl} 
                            alt={user.name} 
                            className="w-5 h-5 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-[11px] leading-tight flex items-center justify-between">
                              {user.name}
                              <span className="text-[9px] font-mono text-amber-500 uppercase">{user.role}</span>
                            </div>
                            <div className="text-[9px] text-stone-500">
                              {user.city}, {user.country}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Sub-bar Navigation for Mobile Screens */}
      <div className="flex lg:hidden overflow-x-auto gap-2 border-t border-zinc-900/50 py-2.5 max-w-full justify-start no-scrollbar flex-nowrap" id="mobile_sub_nav">
        <button 
          onClick={() => setActiveSection("LANDING")} 
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeSection === "LANDING" ? "bg-amber-950/20 text-[#d4af37] border border-amber-500/30" : "text-stone-400 hover:text-white"}`}
        >
          {language === "RU" ? "Главная" : "Home"}
        </button>
        <button 
          onClick={() => setActiveSection("DIRECTORY")} 
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeSection === "DIRECTORY" ? "bg-amber-950/20 text-[#d4af37] border border-amber-500/30" : "text-stone-400 hover:text-white"}`}
        >
          {language === "RU" ? "Партнеры" : "Partners"}
        </button>
        <button 
          onClick={() => setActiveSection("EVENTS")} 
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeSection === "EVENTS" ? "bg-amber-950/20 text-[#d4af37] border border-amber-500/30" : "text-stone-400 hover:text-white"}`}
        >
          {language === "RU" ? "События" : "Events"}
        </button>
        <button 
          onClick={() => setActiveSection("NETWORKING")} 
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeSection === "NETWORKING" ? "bg-amber-950/20 text-[#d4af37] border border-amber-500/30" : "text-stone-400 hover:text-white"}`}
        >
          {language === "RU" ? "Нетворкинг" : "Networking"}
        </button>

        {(currentUser.role === UserRole.VIP || currentUser.role === UserRole.PARTNER || currentUser.role === UserRole.ADMIN) && (
          <button 
            onClick={() => setActiveSection("INTRODUCTIONS")} 
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeSection === "INTRODUCTIONS" ? "bg-amber-950/20 text-[#d4af37] border border-amber-500/30" : "text-stone-400 hover:text-white"}`}
          >
            {language === "RU" ? "Интро" : "Intros"}
          </button>
        )}

        <button 
          onClick={() => setActiveSection("MY_CARD")} 
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeSection === "MY_CARD" ? "bg-amber-950/20 text-[#d4af37] border border-amber-500/30" : "text-stone-400 hover:text-white"}`}
        >
          {language === "RU" ? "Личный Кабинет" : "Personal Cabinet"}
        </button>
        <button 
          onClick={() => setActiveSection("BILLING")} 
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeSection === "BILLING" ? "bg-amber-950/20 text-[#d4af37] border border-amber-500/30" : "text-stone-400 hover:text-white"}`}
        >
          {language === "RU" ? "Оплата" : "Billing"}
        </button>

        {(currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.MANAGER) && (
          <button 
            onClick={() => setActiveSection("ADMIN_PANEL")} 
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${activeSection === "ADMIN_PANEL" ? "bg-red-950/40 text-red-400 border border-red-900" : "text-red-400 hover:bg-stone-900 bg-red-950/10"}`}
          >
            {language === "RU" ? "Панель Управления" : "Control"}
          </button>
        )}
      </div>
    </header>
  );
};
