/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ClubStateProvider, useClubState } from "./context/ClubStateContext";
import { TopNavbar } from "./components/TopNavbar";
import { MainLanding } from "./components/MainLanding";
import { PartnerCatalog } from "./components/PartnerCatalog";
import { EventCalendar } from "./components/EventCalendar";
import { NetworkMessages } from "./components/NetworkMessages";
import { Introductions } from "./components/Introductions";
import { DigitalCard } from "./components/DigitalCard";
import { StripeCheckout } from "./components/StripeCheckout";
import { AdminPanel } from "./components/AdminPanel";
import { LegalDocs } from "./components/LegalDocs";
import { PartnerModal } from "./components/PartnerModal";
import { ClubLogo } from "./components/ClubLogo";
import { BusinessProfile } from "./types";
import { HelpCircle, ScrollText, Lock, ShieldCheck, Mail } from "lucide-react";

function ClubAppContent() {
  const { currentUser } = useClubState();
  
  // Navigation active view tab
  const [activeSection, setActiveSection] = useState<string>("LANDING");
  
  // Modal tracking state for catalog partner disclosures
  const [selectedPartner, setSelectedPartner] = useState<BusinessProfile | null>(null);

  const handleOpenPartnerModal = (partner: BusinessProfile) => {
    setSelectedPartner(partner);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "LANDING":
        return (
          <MainLanding 
            setActiveSection={setActiveSection} 
            onOpenPartnerModal={handleOpenPartnerModal} 
          />
        );
      case "DIRECTORY":
        return (
          <PartnerCatalog 
            onOpenPartnerModal={handleOpenPartnerModal} 
          />
        );
      case "EVENTS":
        return <EventCalendar />;
      case "NETWORKING":
        return <NetworkMessages />;
      case "INTRODUCTIONS":
        return <Introductions />;
      case "MY_CARD":
        return <DigitalCard />;
      case "BILLING":
        return <StripeCheckout />;
      case "ADMIN_PANEL":
        return <AdminPanel />;
      case "LEGAL":
        return <LegalDocs />;
      default:
        return (
          <MainLanding 
            setActiveSection={setActiveSection} 
            onOpenPartnerModal={handleOpenPartnerModal} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#060605] flex flex-col font-sans select-none antialiased">
      
      {/* Dynamic persistent Header Navbar */}
      <TopNavbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {/* Main core screen body layout with fade visual entry */}
      <main className="flex-grow">
        {renderActiveSection()}
      </main>

      {/* Corporate Compliance static bottom disclaimer bar */}
      <footer className="bg-black py-5 border-t border-zinc-950 font-mono text-[10px] text-zinc-550 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-12 select-none">
        <div className="flex items-center gap-2.5">
          <ClubLogo size="xs" showText={false} idPrefix="app-footer-logo" />
          <span>KYLYVNYK CLUB INC. • SECURE DELAWARE REGISTRY</span>
        </div>
        <button 
          onClick={() => setActiveSection("LEGAL")}
          className="hover:text-amber-500 hover:underline cursor-pointer flex items-center gap-1.5 uppercase font-medium tracking-wider"
        >
          <ScrollText className="w-3.5 h-3.5 text-[#d4af37]" /> Corporate Compliance Terms of Use
        </button>
        <div className="flex items-center gap-1.5 text-zinc-500 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm animate-pulse" />
          <span>SSL ENCRYPTED SECURE</span>
        </div>
      </footer>

      {/* Dual Partner Detail Modal */}
      <PartnerModal 
        partner={selectedPartner}
        onClose={() => setSelectedPartner(null)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ClubStateProvider>
      <ClubAppContent />
    </ClubStateProvider>
  );
}
