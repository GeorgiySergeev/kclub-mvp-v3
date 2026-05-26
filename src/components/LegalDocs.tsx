import React from "react";
import { ScrollText, ShieldAlert, Award, FileWarning } from "lucide-react";

export const LegalDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#060605] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-[#0b0b0a] border border-zinc-900 rounded-2xl p-6 sm:p-10 shadow-2xl">
        
        <div className="flex items-center gap-2.5 mb-8 border-b border-zinc-900 pb-6" id="legal_title">
          <ScrollText className="w-8 h-8 text-[#d4af37]" />
          <div>
            <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase">Club Privé regulatory compliance</span>
            <h1 className="text-2xl font-display font-semibold text-white mt-1">LEGAL AGREEMENTS & DISCOVERY</h1>
          </div>
        </div>

        <div className="space-y-8 text-xs text-stone-400 leading-relaxed font-sans">
          
          {/* Terms of Use */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              1. TERMS OF Club Use Privé
            </h3>
            <p>
              By applying for membership keycards or querying partner conditions on <strong>KYLYVNYK CLUB</strong>, you explicitly acknowledge that you have read, comprehended, and agree to stay bound to these terms, statutory notifications, and internal rules.
            </p>
            <p>
              Kylyvnyk Club maintains absolute authority to deny service credentials, block registry logins, or revise parameters on peer catalog directory lists without prior notification.
            </p>
          </section>

          {/* Privacy & PII Exclusions */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              2. PRIVACY POLICY & PII EXCLUSIONS
            </h3>
            <p>
              To protect direct peer communication systems, Kylyvnyk Club operates strict <strong>PII (Personal Identifiable Information) encryption pipelines</strong>. Customer cellular coordinates, invoices downloads, and private chat records are explicitly restricted from open scanning lookup searches. 
            </p>
            <p>
              We operate under standard GDPR and US cyber-security protection rules, performing nightly backups and database sanitization queries.
            </p>
          </section>

          {/* Refund policies */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5 font-sans">
              3. NO-REFUND POLICY & BILLING AGREEMENT
            </h3>
            <p className="p-3.5 bg-red-950/20 border border-red-900/60 rounded-lg text-red-400 font-medium">
              ⚠️ Subscription purchase licenses, membership dues, and commercial corporate listings fees processed through Stripe are fully non-refundable except where specifically mandated by international cyber-consumer protection laws.
            </p>
            <p>
              Cancelling active memberships halts automatic recurring billing schedules instantly. VIP statuses remain active until the end of the paid cycle, after which corresponding business directory listings are automatically hidden.
            </p>
          </section>

          {/* Arbitration clause */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              4. GOVERNING LAW & MANDATORY ARBITRATION
            </h3>
            <p>
              These agreements are governed exclusively under the sovereign statutes of the <strong>State of Delaware, United States</strong>, without regard to collision of laws rules.
            </p>
            <p>
              Any disputes rising from catalog listings, partner conditions mismatch, matchmaking introductions Counselor responses, or billing sandboxes will be settled conclusively through confidential binding arbitration under AAA rules in Delaware, waving class actions.
            </p>
          </section>

          {/* High risk exclusion */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              5. NO HIGH-RISK INTEGRATIONS compliance
            </h3>
            <p>
              Kylyvnyk Club enforces zero-tolerance measures on commercial partner catalogs containing: crypto assets trading, online gambling interfaces, age-restricted adult services, unlicensed fire weapons, or unlicensed cross-border financial operations with passive yields promises.
            </p>
          </section>

          {/* Liability capsule disclaimers */}
          <section className="space-y-3.5 p-5 bg-zinc-950 rounded-xl border border-zinc-900">
            <div className="flex gap-2 items-start mb-2">
              <FileWarning className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-[#d4af37] uppercase font-display leading-tight">LIMITATION OF LIABILITY DISCLAIMER</span>
            </div>
            <p className="text-[11px] leading-relaxed italic text-stone-500">
              "KYLYVNYK CLUB EXPRESSLY DISCLAIMS ALL LIABILITY FOR MATERIAL DAMAGES, TRANSITION COMPLIANCE MISMATCH, PROPERTY TRANSACTION DEFECTS, AND THIRD-PARTY LICENSING FAILS. PARTNERS ARE SOLELY RESPONSIBLE FOR THEIR ADVERTISED CONDITIONS, COMMERCIAL PERMITS, AND PROFESSIONAL INTEGRITIES."
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
