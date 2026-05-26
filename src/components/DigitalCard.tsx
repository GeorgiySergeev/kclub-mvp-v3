import React, { useState } from "react";
import { useClubState } from "../context/ClubStateContext";
import { UserRole } from "../types";
import { 
  Award, 
  CheckCircle, 
  RefreshCw, 
  Search, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Layers, 
  Settings, 
  CreditCard,
  Building,
  ArrowRight,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const DigitalCard: React.FC = () => {
  const { 
    currentUser, 
    users, 
    updateUserProfile, 
    updateUserReputation, 
    triggerNotification, 
    language,
    events,
    toggleEventRSVP
  } = useClubState();

  // Active section tab inside the Personal Cabinet
  const [activeTab, setActiveTab] = useState<"card" | "profile" | "events" | "validator">("card");
  
  // Card customization states
  const [cardFlipped, setCardFlipped] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Profile Form States
  const [formName, setFormName] = useState(currentUser.name);
  const [formLastName, setFormLastName] = useState(currentUser.lastName || "");
  const [formEmail, setFormEmail] = useState(currentUser.email || "");
  const [formPhone, setFormPhone] = useState(currentUser.phone);
  const [formCountry, setFormCountry] = useState(currentUser.country);
  const [formCity, setFormCity] = useState(currentUser.city);
  const [formAvatarUrl, setFormAvatarUrl] = useState(currentUser.avatarUrl || "");

  // Keycard Peer Scanner Lookup States
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [lookupError, setLookupError] = useState("");

  const t = translations[language] || translations["EN"];

  // Pre-configured high-end avatars for prestige aesthetic choice
  const avatarPresets = [
    { name: "Catherine (VIP Monaco)", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
    { name: "Alex (Kyiv Founder)", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
    { name: "Marc (Swiss Wealth)", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
    { name: "Elena (Miami Concierge)", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
    { name: "Arthur (Chief Admin)", url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" }
  ];

  const handleVerificationCheck = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      updateUserReputation(currentUser.id, 10);
      triggerNotification(
        language === "RU" ? "★ Репутация Подтверждена" : "★ Reputation Verified", 
        language === "RU" 
          ? "Администраторы проверили ваши репутационные метрики. Рейтинг повышен на +10 ★!" 
          : "Your trust metrics have been verified by administrators, and reputation increased by +10 ★", 
        "SYSTEM"
      );
    }, 1500);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: formName,
      lastName: formLastName,
      email: formEmail,
      phone: formPhone,
      country: formCountry,
      city: formCity,
      avatarUrl: formAvatarUrl
    });
    triggerNotification(
      language === "RU" ? "✅ Профиль Сохранен" : "✅ Profile Registry Keys Updated",
      language === "RU"
        ? "Новые суверенные данные успешно зафиксированы в реестре!"
        : "Your new personal configuration has been securely saved and written to the registry database.",
      "SYSTEM"
    );
  };

  const handleCardLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError("");
    setLookupResult(null);

    const term = lookupQuery.trim();
    if (!term) return;

    // Search users by Card ID (case insensitive)
    const matched = users.find(u => u.cardId.toLowerCase() === term.toLowerCase());
    
    if (matched) {
      if (matched.isBlocked) {
        setLookupError(t.warningBlocked);
        return;
      }

      setLookupResult({
        name: matched.name,
        lastName: matched.lastName ? `${matched.lastName.charAt(0)}.` : "",
        role: matched.role,
        country: matched.country,
        city: matched.city,
        cardId: matched.cardId,
        cardExpiry: matched.cardExpiry,
        reputation: matched.reputation,
        registrationDate: matched.registrationDate
      });

      triggerNotification(
        "💳 Card Checked",
        `Card ID verified: ${matched.cardId}. Status active.`,
        "SYSTEM"
      );
    } else {
      setLookupError(t.errorInvalid);
    }
  };

  // Filter events register list the logged-in member has RSVPs
  const rsvpEvents = events.filter(evt => evt.attendedUserIds.includes(currentUser.id));

  const isVIP = currentUser.role === UserRole.VIP || currentUser.role === UserRole.PARTNER || currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.MANAGER;

  return (
    <div className="min-h-screen bg-[#060605] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Personal Cabinet Branding */}
        <div className="mb-10 text-left relative" id="cabinet_header_section">
          <div className="absolute top-0 right-0 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">{t.activeStatus}</span>
          </div>
          
          <span className="text-[10px] text-[#d4af37] font-mono tracking-[0.2em] uppercase font-bold">
            {language === "RU" ? "ПЕРСОНАЛЬНЫЙ ШЛЮЗ ЧЛЕНА КЛУБА" : "KYLYVNYK SECURE GATEWAY"}
          </span>
          <h1 className="text-3xl font-display font-semibold text-white mt-1 uppercase tracking-tight">
            {t.cabTitle}
          </h1>
          <p className="text-xs text-stone-500 font-mono mt-1 max-w-2xl leading-relaxed">
            {t.cabSubtitle}
          </p>
        </div>

        {/* Sub-Tabs Grid Navigation inside Personal Cabinet */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-10" id="cabinet_tabs_bar">
          <button
            onClick={() => setActiveTab("card")}
            className={`py-3 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "card"
                ? "bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-amber-900/10 text-[#d4af37] border-[#d4af37]/60 shadow-md"
                : "bg-[#0b0b0a] text-stone-400 hover:text-white border-zinc-900"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            {t.tabCard}
          </button>
          
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-3 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-amber-900/10 text-[#d4af37] border-[#d4af37]/60 shadow-md"
                : "bg-[#0b0b0a] text-stone-400 hover:text-white border-zinc-900"
            }`}
          >
            <Settings className="w-4 h-4" />
            {t.tabProfile}
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`py-3 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "events"
                ? "bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-amber-900/10 text-[#d4af37] border-[#d4af37]/60 shadow-md animate-none"
                : "bg-[#0b0b0a] text-stone-400 hover:text-white border-zinc-900"
            }`}
          >
            <Calendar className="w-4 h-4" />
            {t.tabPrivileges}
            {rsvpEvents.length > 0 && (
              <span className="bg-[#d4af37] text-black text-[9px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                {rsvpEvents.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("validator")}
            className={`py-3 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "validator"
                ? "bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-amber-900/10 text-[#d4af37] border-[#d4af37]/60 shadow-md"
                : "bg-[#0b0b0a] text-stone-400 hover:text-white border-zinc-900"
            }`}
          >
            <Search className="w-4 h-4" />
            {t.tabValidator}
          </button>
        </div>

        {/* Dynamic Inner Tab Execution */}
        <div className="min-h-96">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: CARD TAB */}
            {activeTab === "card" && (
              <motion.div
                key="tab-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
              >
                
                {/* Visual Front/Back Digital Card Block */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  
                  {/* Perspective container */}
                  <div className="w-full max-w-sm h-56 perspective-1000">
                    
                    {/* card rotary inner */}
                    <motion.div
                      animate={{ rotateY: cardFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      onClick={() => setCardFlipped(!cardFlipped)}
                      className={`w-full h-full rounded-2xl relative overflow-hidden preserve-3d cursor-pointer shadow-2xl border ${
                        isVIP 
                          ? "border-[#d4af37]/50 shadow-[#d4af37]/5" 
                          : "border-zinc-800"
                      }`}
                    >
                      {/* CARD FRONT VIEW */}
                      <div className="absolute inset-0 w-full h-full backface-hidden p-6 flex flex-col justify-between bg-gradient-to-br from-[#12110e] via-[#090908] to-[#1d170a]">
                        <div className="absolute top-0 right-0 w-36 h-36 bg-[#d4af37]/5 rounded-full blur-[45px] pointer-events-none" />
                        
                        {/* Header front */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-display font-bold tracking-[0.25em] text-sm text-transparent bg-clip-text bg-gradient-to-r from-stone-100 to-[#d4af37]">
                              KYLYVNYK
                            </span>
                            <span className="text-[#d4af37]/45 block font-mono text-[7px] tracking-widest uppercase -mt-0.5">
                              {language === "RU" ? "КЛУБНАЯ КАРТА ОСОБОГО ДОСТУПА" : "Privé Member Credential"}
                            </span>
                          </div>
                          
                          <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-black tracking-widest uppercase ${
                            isVIP 
                              ? "bg-amber-950/80 text-[#d4af37] border border-[#d4af37]/40" 
                              : "bg-zinc-900 text-zinc-400 border border-zinc-700/60"
                          }`}>
                            {currentUser.role} TIER
                          </span>
                        </div>

                        {/* Middle Chip & Vector QR code */}
                        <div className="flex items-center justify-between">
                          {/* Simulated luxury card smart chip */}
                          <div className="w-9 h-7 rounded-md bg-gradient-to-br from-yellow-100 via-amber-300 to-amber-700 relative overflow-hidden flex items-center justify-center opacity-85">
                            <div className="w-full h-full border border-[rgba(0,0,0,0.15)] flex flex-wrap p-1">
                              <div className="w-1/2 h-1/3 border-b border-r border-black/10" />
                              <div className="w-1/2 h-1/3 border-b border-black/10" />
                              <div className="w-1/2 h-1/3 border-b border-r border-black/10" />
                              <div className="w-1/2 h-1/3 border-b border-black/10" />
                            </div>
                          </div>

                          <div className="text-right flex items-center gap-2">
                            <span className="text-[7.5px] font-mono text-zinc-550 uppercase tracking-widest">
                              {language === "RU" ? "ПЕЧАТЬ ВЕРИФИКАЦИИ" : "Ledger Signed"}
                            </span>
                            <div className="p-0.5 bg-white rounded border border-zinc-300">
                              <div className="grid grid-cols-4 gap-0.5 w-6 h-6 bg-white">
                                <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                                <div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div>
                                <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div>
                                <div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div><div className="bg-black"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Holder name */}
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest leading-none">{t.holder}</p>
                            <p className="text-sm font-bold text-stone-200 mt-1 uppercase font-display tracking-widest">
                              {currentUser.name} {currentUser.lastName || ""}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[7.5px] text-zinc-500 font-mono tracking-widest leading-none">{t.serial}</p>
                            <p className="text-xs font-mono font-medium text-[#d4af37] tracking-wider mt-1 font-semibold">
                              {currentUser.cardId}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* CARD BACK VIEW */}
                      <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#0c0c0b] via-[#10100f] to-[#121211] [transform:rotateY(180deg)] backface-hidden">
                        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                        
                        {/* Black magnetic stripe */}
                        <div className="-mx-6 -mt-2 h-9 bg-zinc-950 border-y border-zinc-900" />

                        {/* Authorized Signature area */}
                        <div className="my-2 p-2 bg-zinc-900/60 border border-zinc-800 rounded flex justify-between items-center">
                          <span className="text-[8px] text-emerald-500 font-mono tracking-widest uppercase">
                            ✓ SECURE SIGNATURE ACTIVE
                          </span>
                          <span className="font-serif italic text-stone-300 text-xs text-right pr-2">
                            {currentUser.name} {currentUser.lastName?.charAt(0) || ""}.
                          </span>
                        </div>

                        {/* Expiry / Legalese */}
                        <div className="text-[6.5px] font-mono text-zinc-600 leading-relaxed uppercase">
                          {language === "RU" 
                            ? "Данная карта выдана на правах суверенной Delaware реестрации. Использование разрешено исключительно авторизованным членам Kylyvnyk Business Club. Все права защищены." 
                            : "This credential is issued under Delaware Registry incorporation. Usage restricted solely to authenticated Kylyvnyk Business Club partners. SSL crypt secured."
                          }
                        </div>

                        {/* Back footer info */}
                        <div className="flex justify-between items-center text-[8px] font-mono border-t border-zinc-900 pt-2 text-stone-500">
                          <span>CONCIERGE HOTLINE: +1 (202) 555-0143</span>
                          <span className="text-[#d4af37]">EXP: {currentUser.cardExpiry}</span>
                        </div>

                      </div>

                    </motion.div>
                  </div>

                  {/* Quick Card instruction */}
                  <span className="text-[9px] text-zinc-500 font-mono mt-3 uppercase tracking-wider">
                    {language === "RU" ? "💡 Кликните на карту, чтобы перевернуть" : "💡 Click card to flip and view reverse security strip"}
                  </span>

                  {/* Reputation points indicator block */}
                  <div className="w-full max-w-sm bg-[#0b0b0a] mt-6 border border-zinc-900 rounded-xl p-5 shadow-lg space-y-3.5 font-mono text-[11px] text-zinc-400">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-[10px] tracking-wide uppercase">{t.expiry}:</span>
                      <span className="text-stone-200 font-bold">{currentUser.cardExpiry}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-[10px] tracking-wide uppercase">{t.reputation}:</span>
                      <span className="text-[#d4af37] font-bold text-xs flex items-center gap-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        ★ {currentUser.reputation} Pt
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-[10px] tracking-wide uppercase">{t.security}:</span>
                      <span className="text-stone-300 font-bold tracking-widest text-[9px] bg-zinc-900 px-2 py-0.5 rounded text-emerald-400 border border-emerald-950">
                        PII-SECURE SSL
                      </span>
                    </div>
                    
                    <div className="pt-3.5 border-t border-zinc-900/60">
                      <button
                        onClick={handleVerificationCheck}
                        disabled={isVerifying}
                        className="w-full py-2 px-3 bg-[#13120c] hover:bg-zinc-900 text-[#d4af37] border border-[#d4af37]/35 rounded-lg text-[10px] uppercase font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isVerifying ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-amber-500" /> 
                            <span>{t.verifying}</span>
                          </>
                        ) : (
                          <>
                            <Award className="w-4 h-4 text-emerald-400" /> 
                            <span>{t.evalBtn}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Right block: Quick stats & Action instructions */}
                <div className="lg:col-span-6 space-y-6">
                  
                  {/* Visual Welcoming summary profile */}
                  <div className="bg-[#0b0b0a] border border-zinc-900 rounded-xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/3 rounded-full blur-[25px] pointer-events-none" />
                    
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"} 
                        alt={currentUser.name} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#d4af37]/40 shadow-md"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">
                          {language === "RU" ? "ПРИВЕТСТВУЕМ ВАС" : "WELCOME BACK"}
                        </span>
                        <h2 className="text-xl font-display font-medium text-stone-100 uppercase tracking-wide">
                          {currentUser.name} {currentUser.lastName || ""}
                        </h2>
                        <p className="text-[10px] font-mono text-stone-400 mt-0.5">
                          {currentUser.city}, {currentUser.country}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-zinc-900/60 font-mono text-[11px]">
                      <div className="bg-[#070706] p-3 rounded-lg border border-zinc-905">
                        <span className="text-zinc-550 uppercase text-[9px] block mb-0.5">
                          {language === "RU" ? "СТАТУС КАРТЫ" : "CARD STATUS"}
                        </span>
                        <span className="text-emerald-500 font-semibold uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {language === "RU" ? "АКТИВЕН" : "ACTIVE"}
                        </span>
                      </div>
                      
                      <div className="bg-[#070706] p-3 rounded-lg border border-zinc-905">
                        <span className="text-zinc-550 uppercase text-[9px] block mb-0.5">
                          {language === "RU" ? "БИЗНЕС-СВЯЗИ" : "PARTNERS ACTIVE"}
                        </span>
                        <span className="text-stone-300 font-semibold italic">
                          {currentUser.businessId ? "★ Approved Corp" : "None Locked"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fast directions list */}
                  <div className="bg-[#0b0b0a] border border-zinc-900 rounded-xl p-6 shadow-xl">
                    <h3 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-4 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      {language === "RU" ? "Первые Клубные Шаги" : "Executive Onboarding Checklist"}
                    </h3>
                    
                    <ul className="space-y-4 font-mono text-[11px] text-zinc-400">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] text-[#d4af37] shrink-0">1</span>
                        <div>
                          <strong className="text-stone-300 block">
                            {language === "RU" ? "Заполните Профиль" : "Verify Registry Profile"}
                          </strong>
                          <span className="text-stone-500 text-[10px] block">
                            {language === "RU" ? "Перейдите в вкладку 'Мой Профиль' и укажите свои контакты, чтобы с вами могли связаться." : "Configure secure contacts in the Profile settings tab for matching."}
                          </span>
                        </div>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] text-[#d4af37] shrink-0">2</span>
                        <div>
                          <strong className="text-stone-300 block">
                            {language === "RU" ? "Получите Очки Доверия" : "Elevate Reputation Rating"}
                          </strong>
                          <span className="text-stone-500 text-[10px] block">
                            {language === "RU" ? "Нажмите кнопку верификации репутации, чтобы администраторы обновили ваши параметры." : "Request verified reputation checks below the digital keycard to unlock luxury tier perks."}
                          </span>
                        </div>
                      </li>

                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] text-[#d4af37] shrink-0">3</span>
                        <div>
                          <strong className="text-stone-300 block">
                            {language === "RU" ? "Забронируйте Участие" : "RSVP Upcoming Meetings"}
                          </strong>
                          <span className="text-stone-500 text-[10px] block">
                            {language === "RU" ? "Запишитесь на мероприятие в Календаре Событий. Записи отобразятся на вкладке 'RSVP'." : "Confirm seat reservation on yacht summits or private roundtables via the Event section."}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>

              </motion.div>
            )}

            {/* TAB 2: PROFILE FORM TAB */}
            {activeTab === "profile" && (
              <motion.div
                key="tab-profile"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-[#0b0b0a] border border-zinc-900 rounded-xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto"
              >
                
                <div className="mb-6">
                  <h2 className="text-lg font-display font-medium text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-[#d4af37]" />
                    {t.profileTitle}
                  </h2>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">
                    {t.profileSub}
                  </p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-6">
                  
                  {/* Name section inside Profile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{t.firstName}</label>
                      <input 
                        type="text" 
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full py-2.5 px-3.5 bg-[#060605] border border-zinc-805 rounded-lg text-xs font-mono text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/75 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{t.lastName}</label>
                      <input 
                        type="text" 
                        value={formLastName}
                        onChange={(e) => setFormLastName(e.target.value)}
                        className="w-full py-2.5 px-3.5 bg-[#060605] border border-zinc-805 rounded-lg text-xs font-mono text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/75 transition-all"
                      />
                    </div>
                  </div>

                  {/* Mail & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{t.email}</label>
                      <input 
                        type="email" 
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full py-2.5 px-3.5 bg-[#060605] border border-zinc-805 rounded-lg text-xs font-mono text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/75 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{t.phone}</label>
                      <input 
                        type="text" 
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full py-2.5 px-3.5 bg-[#060605] border border-zinc-805 rounded-lg text-xs font-mono text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/75 transition-all"
                      />
                    </div>
                  </div>

                  {/* Country & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{t.country}</label>
                      <input 
                        type="text" 
                        required
                        value={formCountry}
                        onChange={(e) => setFormCountry(e.target.value)}
                        className="w-full py-2.5 px-3.5 bg-[#060605] border border-zinc-805 rounded-lg text-xs font-mono text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/75 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{t.city}</label>
                      <input 
                        type="text" 
                        required
                        value={formCity}
                        onChange={(e) => setFormCity(e.target.value)}
                        className="w-full py-2.5 px-3.5 bg-[#060605] border border-zinc-805 rounded-lg text-xs font-mono text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/75 transition-all"
                      />
                    </div>
                  </div>

                  {/* Avatar Picker Preset Emblems */}
                  <div className="border-t border-zinc-900 pt-5 space-y-4">
                    <div>
                      <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-3">
                        {t.avatarLabel}
                      </span>
                      
                      {/* Luxury Preset Buttons Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" id="avatar_presets_selection">
                        {avatarPresets.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormAvatarUrl(p.url)}
                            className={`flex flex-col items-center p-2 rounded-xl transition-all border cursor-pointer ${
                              formAvatarUrl === p.url
                                ? "bg-amber-950/25 border-[#d4af37] text-white"
                                : "bg-black/40 border-zinc-900 text-stone-400 hover:bg-zinc-900"
                            }`}
                          >
                            <img 
                              src={p.url} 
                              alt={p.name} 
                              className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                              referrerPolicy="no-referrer"
                            />
                            <span className="text-[8px] font-mono text-center mt-1.5 truncate w-full">
                              {p.name.split(" ")[0]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Or Manual URL pointer option */}
                    <div>
                      <label className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{t.customAvatar}</label>
                      <input 
                        type="text" 
                        placeholder="https://images.unsplash.com/..."
                        value={formAvatarUrl}
                        onChange={(e) => setFormAvatarUrl(e.target.value)}
                        className="w-full py-2 px-3 bg-[#060605] border border-zinc-805 rounded-lg text-[11px] font-mono text-stone-300 placeholder-stone-700 focus:outline-none focus:border-[#d4af37]/60"
                      />
                    </div>
                  </div>

                  {/* Submit profile button custom interactive */}
                  <div className="pt-4 border-t border-zinc-900 flex justify-end">
                    <button
                      type="submit"
                      className="py-2.5 px-6 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-black font-semibold rounded-lg text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg shadow-amber-950/20"
                    >
                      {t.saveBtn}
                    </button>
                  </div>

                </form>

              </motion.div>
            )}

            {/* TAB 3: RSVP AND PRIVILEGES TAB */}
            {activeTab === "events" && (
              <motion.div
                key="tab-events"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
              >
                
                {/* RSVP Booked events column */}
                <div className="lg:col-span-7 bg-[#0b0b0a] border border-zinc-900 rounded-xl p-6 shadow-xl">
                  <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider mb-2 font-display">
                    {t.myJoinedEvents}
                  </h3>
                  <p className="text-xs text-stone-500 font-mono mb-6">
                    {language === "RU" ? "Трансграничные встречи, ужины и презентации, на которые вы забронировали место:" : "Your authorized confirmations for sovereign dining tables, closed yacht briefings and network summits."}
                  </p>

                  {rsvpEvents.length === 0 ? (
                    <div className="py-12 px-4 border border-zinc-900 border-dashed rounded-xl text-center space-y-4">
                      <Calendar className="w-10 h-10 text-stone-600 mx-auto" strokeWidth={1} />
                      <p className="text-xs text-stone-500 font-mono tracking-wide">
                        {t.noEvents}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4" id="rsvp_events_list">
                      {rsvpEvents.map(evt => (
                        <div key={evt.id} className="p-4 rounded-xl border border-zinc-900 bg-black/45 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          <div className="space-y-1">
                            <span className="text-[8px] font-mono text-amber-500 bg-amber-950/40 border border-amber-900/30 px-2 py-0.5 rounded uppercase">
                              {evt.city}, {evt.country}
                            </span>
                            <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider mt-1 leading-tight font-display">
                              {evt.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-zinc-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-stone-500" />
                                {evt.date} • {evt.time}
                              </span>
                              <span>|</span>
                              <span className="text-stone-400 font-semibold uppercase">
                                {language === "RU" ? "Зал:" : "Venue:"} {evt.location.split(",")[0]}
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => toggleEventRSVP(evt.id, currentUser.id)}
                            className="py-1.5 px-3 bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/40 rounded-lg text-[9px] font-mono uppercase font-bold tracking-wider transition-colors shrink-0 cursor-pointer self-start sm:self-center"
                          >
                            {t.rsvpCancelBtn}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Level Privileges list column */}
                <div className="lg:col-span-5 bg-[#0b0b0a] border border-zinc-900 rounded-xl p-6 shadow-xl space-y-6">
                  
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#d4af37]" />
                      {t.privilegesTitle}
                    </h3>

                    {/* Tier Benefits */}
                    <div className="space-y-4 text-xs font-mono">
                      
                      <div className={`p-3 rounded-xl border ${currentUser.role === UserRole.MEMBER ? "bg-amber-950/10 border-amber-900/40" : "bg-black/30 border-zinc-950 opacity-60"}`}>
                        <div className="flex justify-between font-bold text-[11px] text-stone-200">
                          <span>MEMBER PRIVILEGES</span>
                          <span className="text-amber-500">FREE</span>
                        </div>
                        <p className="text-[10px] text-stone-400 mt-1.5 leading-relaxed">
                          • {language === "RU" ? "Просмотр каталога партнеров" : "Direct access to cross-border partner discount catalogs."} <br/>
                          • {language === "RU" ? "Доступ к открытым нетворкинг-диалогам" : "Post and answer networking forum announcements."} <br/>
                          • {language === "RU" ? "Репутационный паспорт доверия" : "Sovereign keycard passport with basic PII shield."}
                        </p>
                      </div>

                      <div className={`p-3 rounded-xl border ${currentUser.role === UserRole.VIP ? "bg-amber-950/10 border-amber-900/40 animate-none" : "bg-black/30 border-zinc-950 opacity-60"}`}>
                        <div className="flex justify-between font-bold text-[11px] text-stone-200">
                          <span>VIP LEVEL ACCESS</span>
                          <span className="text-[#d4af37]">VIP ACTIVE</span>
                        </div>
                        <p className="text-[10px] text-stone-405 mt-1.5 leading-relaxed">
                          • {language === "RU" ? "Индивидуальные подборы интро-знакомств" : "Custom matchmaking intro queries moderate-approved."} <br/>
                          • {language === "RU" ? "Доступ к премиум-событиям (Monaco Yacht Summit)" : "Automatic RSVP seats unlocked for top-tier summits."} <br/>
                          • {language === "RU" ? "Золотой дизайн карты на черном стекле" : "Exclusive black-gold obsidian card design with priority concierge hotline."}
                        </p>
                      </div>

                      <div className={`p-3 rounded-xl border ${currentUser.role === UserRole.PARTNER ? "bg-amber-950/10 border-amber-900/40" : "bg-black/30 border-zinc-950 opacity-60"}`}>
                        <div className="flex justify-between font-bold text-[11px] text-stone-200">
                          <span>PARTNER RIGHTS</span>
                          <span className="text-blue-400">PARTNER</span>
                        </div>
                        <p className="text-[10px] text-stone-405 mt-1.5 leading-relaxed">
                          • {language === "RU" ? "Размещение собственных спецпредложений в каталоге" : "Publish custom luxury offers looking up targeted member audience."} <br/>
                          • {language === "RU" ? "Повышенный рейтинг доверия в сопоставлениях" : "Priority referral weights for premium introduction structures."}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Reputation unlocking logic rewards */}
                  <div className="border-t border-zinc-900 pt-5">
                    <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-3.5 font-mono">
                      {t.repTitle}
                    </h4>

                    <div className="space-y-3.5 font-mono text-[10px]">
                      <div className="flex items-center justify-between text-zinc-400">
                        <span className="flex items-center gap-1">
                          <span className={currentUser.reputation >= 20 ? "text-emerald-500" : "text-zinc-600"}>✓</span>
                          {language === "RU" ? "Частный офф-маркет реестр" : "Off-market real-estate catalogs"}
                        </span>
                        <span className="text-stone-550 font-semibold">{t.unlockedAt} 20 Rep</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-zinc-400">
                        <span className="flex items-center gap-1">
                          <span className={currentUser.reputation >= 50 ? "text-emerald-500" : "text-zinc-600"}>✓</span>
                          {language === "RU" ? "Премиум ужины в Монако" : "VIP Monaco Yacht summit entry"}
                        </span>
                        <span className="text-stone-550 font-semibold">{t.unlockedAt} 50 Rep</span>
                      </div>

                      <div className="flex items-center justify-between text-zinc-400">
                        <span className="flex items-center gap-1">
                          <span className={currentUser.reputation >= 100 ? "text-emerald-500" : "text-zinc-600"}>✓</span>
                          {language === "RU" ? "Создание альянс-запросов" : "Create sovereign alliance structures"}
                        </span>
                        <span className="text-stone-550 font-semibold">{t.unlockedAt} 100 Rep</span>
                      </div>
                    </div>
                  </div>

                </div>

              </motion.div>
            )}

            {/* TAB 4: CARD LOOKUP VALIDATOR TAB */}
            {activeTab === "validator" && (
              <motion.div
                key="tab-validator"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-[#0b0b0a] border border-zinc-900 rounded-xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto"
              >
                
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-display">
                  {t.lookupTitle}
                </h3>
                <p className="text-xs text-stone-500 font-mono mb-6 leading-relaxed">
                  {t.lookupSub} ({language === "RU" ? "Пример:" : "e.g. попробовать:"} <strong className="text-[#d4af37]">{currentUser.cardId}</strong> or <strong className="text-stone-300">VIP-UK-000501</strong>).
                </p>

                <form onSubmit={handleCardLookup} className="flex gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder={t.placeholder}
                    value={lookupQuery}
                    onChange={(e) => setLookupQuery(e.target.value)}
                    className="flex-1 py-2.5 px-3.5 bg-[#060605] border border-zinc-850 rounded-lg text-xs font-mono text-stone-100 uppercase tracking-widest placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-zinc-900 border border-zinc-805 text-[#d4af37] text-xs font-semibold rounded-lg hover:bg-zinc-855 uppercase font-mono tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Search className="w-4 h-4" /> 
                    <span>{t.lookupBtn}</span>
                  </button>
                </form>

                {/* Error alerts */}
                {lookupError && (
                  <div className="mt-6 p-4 bg-red-950/25 border border-red-900/60 rounded-lg text-xs text-red-400 font-mono tracking-wide leading-relaxed">
                    {lookupError}
                  </div>
                )}

                {/* Real Lookup result preview (Satisfies PII secure requirements!) */}
                {lookupResult && (
                  <div className="mt-6 border border-zinc-900 bg-zinc-950/45 p-5 rounded-xl" id="scan_lookup_result">
                    
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5 font-mono mb-3.5">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0" /> 
                      {t.verifiedTitle}
                    </p>

                    <div className="space-y-3.5 font-mono text-xs select-none">
                      <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span className="text-zinc-500">MEMBER NAME:</span>
                        <span className="text-stone-205 font-bold">{lookupResult.name} {lookupResult.lastName}</span>
                      </div>

                      <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span className="text-zinc-500">SOVEREIGN ORIGIN:</span>
                        <span className="text-stone-205 font-bold">{lookupResult.city}, {lookupResult.country}</span>
                      </div>

                      <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span className="text-zinc-500">MEMBER TIER:</span>
                        <span className="text-[#d4af37] font-bold uppercase">{lookupResult.role}</span>
                      </div>

                      <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span className="text-zinc-500">SERIAL ID:</span>
                        <span className="text-[#d4af37] font-bold uppercase">{lookupResult.cardId}</span>
                      </div>

                      <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span className="text-zinc-500">EXPIRATION DATE:</span>
                        <span className="text-stone-400 font-bold">{lookupResult.cardExpiry}</span>
                      </div>

                      <div className="flex justify-between border-b border-zinc-900 pb-2">
                        <span className="text-zinc-500">VERIFIED TRUST:</span>
                        <span className="text-amber-500 font-bold">★ {lookupResult.reputation} REPUTE</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-mono">REGISTRY REGISTER:</span>
                        <span className="text-stone-405 font-bold font-mono">{lookupResult.registrationDate}</span>
                      </div>
                    </div>

                    {/* Secure PII Notice */}
                    <div className="mt-4 pt-4 border-t border-zinc-900/60 leading-relaxed text-[10px] text-zinc-550 italic font-sans flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold font-mono">PII EXCLUSION SHIELD:</span>
                      <span>{t.verifiedText}</span>
                    </div>

                  </div>
                )}

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

// Russian & English translations catalog supporting full executive dual localization
const translations: Record<string, Record<string, string>> = {
  EN: {
    cabTitle: "MEMBER PERSONAL CABINET",
    cabSubtitle: "Manage your digital club credentials, luxury status metrics, and premium profile settings.",
    tabCard: "Club Card",
    tabProfile: "My Profile",
    tabPrivileges: "RSVP & Privileges",
    tabValidator: "Card Validator",
    holder: "Holder Identity",
    serial: "CARD SERIAL ID",
    expiry: "MEMBERSHIP EXPIRY",
    reputation: "REPUTATION EVALUATION",
    security: "SECURITY LEVEL DESIGN",
    evalBtn: "Eval Verification Rating (+10 Rep)",
    verifying: "Verifying metrics...",
    lookupTitle: "PEERS CARD SCANNER / LOOKUP",
    lookupSub: "Verify authentic QR code references or member keys. Input any valid card ID to inspect.",
    lookupBtn: "Scan Card",
    placeholder: "e.g. VIP-UK-000501",
    profileTitle: "PERSONAL REGISTRY CONFIGURATION",
    profileSub: "Update your cross-border residency fields, secure communication emails, and premium avatar emblems.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Secure Email",
    phone: "Registry Phone",
    country: "Sovereign Country",
    city: "Operating City",
    avatarLabel: "Select Prestige Representative Emblem",
    presets: "Luxury Presets",
    customAvatar: "Or Paste Custom URL Pointer",
    saveBtn: "Save Profile Keys",
    myJoinedEvents: "My RSVP Event Bookings",
    noEvents: "You have not registered for any upcoming meetings yet.",
    browseEventsBtn: "Browse Event Calendar",
    rsvpCancelBtn: "Cancel RSVP",
    privilegesTitle: "KYLYVNYK CLUB TIER PRIVILEGES",
    repTitle: "Reputation-Unlocked Directives",
    unlockedAt: "Unlocked at",
    verifiedTitle: "AUTHENTIC CLUB CREDENTIAL VERIFIED",
    verifiedText: "Emails, transactions history, matching introduction orders, and phone lists are encrypted on the ledger.",
    warningBlocked: "WARNING: THIS CARD/MEMBER RECORD IS BLOCKED!",
    errorInvalid: "INVALID MATCH: No member record exists for this Card Serial ID.",
    statusLabel: "REGISTRY STATUS",
    activeStatus: "ACTIVE SECURE"
  },
  RU: {
    cabTitle: "ЛИЧНЫЙ КАБИНЕТ ЧЛЕНА КЛУБА",
    cabSubtitle: "Управляйте своим цифровым профилем, статусом привилегий, репутацией и настройками безопасности.",
    tabCard: "Клубная Карта",
    tabProfile: "Мой Профиль",
    tabPrivileges: "RSVP и Записи",
    tabValidator: "Валидатор Карт",
    holder: "Владелец Карты",
    serial: "СЕРИЙНЫЙ НОМЕР",
    expiry: "СРОК ДЕЙСТВИЯ КЛУБА",
    reputation: "ОЦЕНКА РЕПУТАЦИИ",
    security: "КЛАСС ЗАЩИТЫ ДАННЫХ",
    evalBtn: "Запустить верификацию (+10 Rep)",
    verifying: "Синхронизация метрик...",
    lookupTitle: "ВАЛИДАТОР КЛУБНЫХ КАРТ",
    lookupSub: "Проверьте подлинность QR-кода или серийного номера коллеги. Введите ID карты для поиска.",
    lookupBtn: "Проверить",
    placeholder: "например, VIP-UK-000501",
    profileTitle: "РЕГИСТРАЦИОННЫЕ ДАННЫЕ ПРОФИЛЯ",
    profileSub: "Обновите свои трансграничные данные резиденции, защищенный email и парадную клубную аватарку.",
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Защищенный Email",
    phone: "Регистрационный Телефон",
    country: "Суверенная Страна",
    city: "Город Операций",
    avatarLabel: "Выберите престижное оформление профиля",
    presets: "Готовые варианты",
    customAvatar: "Или укажите свою ссылку на изображение",
    saveBtn: "Сохранить Ключи Профиля",
    myJoinedEvents: "Мои Записи на События",
    noEvents: "Вы пока не зарегистрировались ни на одно закрытое событие клуба.",
    browseEventsBtn: "Перейти к Событиям",
    rsvpCancelBtn: "Отменить Запись",
    privilegesTitle: "ПРИВИЛЕГИИ КЛУБНОГО СТАТУСА (TIER)",
    repTitle: "Репутационные Достижения",
    unlockedAt: "Доступно при",
    verifiedTitle: "ПОДЛИННОСТЬ КАРТЫ ВЕРИФИЦИРОВАНА",
    verifiedText: "Email-адреса, транзакции, сопоставленные интро-запросы и контакты надежно защищены шифрованием.",
    warningBlocked: "ВНИМАНИЕ: ЭТА КАРТА И ПРОФИЛЬ ЗАБЛОКИРОВАНЫ АДМИНИСТРАЦИЕЙ!",
    errorInvalid: "ОШИБКА: Запись члена клуба с таким серийным ID не найдена.",
    statusLabel: "СТАТУС В РЕЕСТРЕ",
    activeStatus: "АКТИВЕН / ЗАЩИЩЕН"
  }
};
