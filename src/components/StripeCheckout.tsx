import React, { useState } from "react";
import { useClubState } from "../context/ClubStateContext";
import { UserRole } from "../types";
import { CreditCard, DollarSign, Download, Lock, CheckCircle, Trash, RefreshCw, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const StripeCheckout: React.FC = () => {
  const { 
    currentUser, 
    simulateVIPSubscriptionPayment, 
    cancelVIPSubscription, 
    triggerNotification 
  } = useClubState();

  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNo || !expiry || !cvc) {
      alert("Please specify card details to continue with secure checkout sandbox.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      simulateVIPSubscriptionPayment();
      // Clear payment fields
      setCardNo("");
      setExpiry("");
      setCvc("");
    }, 1800);
  };

  const handleInvoiceDownload = (invNo: string) => {
    triggerNotification(
      "📁 PDF Invoice Ready",
      `Stripe Invoice ${invNo} has been compiled and downloaded securely. Check your local device downloads folders.`,
      "SYSTEM"
    );
    alert(`Secure Sandbox Action: Downloaded official club receipt ${invNo} for amount $19.99 USD.`);
  };

  const isVIP = currentUser.role === UserRole.VIP || currentUser.role === UserRole.PARTNER || currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.MANAGER;

  return (
    <div className="min-h-screen bg-[#060605] py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Banner */}
        <div className="mb-10" id="billing_title_bar">
          <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase">SSL SECURED SUBSCRIPTIONS</span>
          <h1 className="text-3xl font-display font-semibold text-white mt-1">STRIPE BILLING PORTAL</h1>
          <p className="text-xs text-stone-500 font-mono mt-1">
            Sandbox payment workspace. Upgrade memberships, cancel recurring schedules, & download invoices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Checkout Simulator */}
          <div className="lg:col-span-7 bg-[#0b0b0a] border border-zinc-900 rounded-xl p-6 sm:p-8 shadow-xl">
            
            {!isVIP ? (
              /* User is free tier -> Render checkout card forms */
              <>
                <div className="mb-6">
                  <span className="text-[9px] text-[#d4af37] font-mono tracking-widest uppercase block mb-1">KYLYVNYK VIP LICENSE</span>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">UPGRADE TO VIP CHANNELS</h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Enjoy global partner conditions lookup, direct counselor matchmaking, private directories, closed yacht summit RSVPs, and submit custom partner placements.
                  </p>
                </div>

                <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-910 flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs text-stone-400">Recurring Price:</span>
                    <span className="text-lg font-bold text-white block mt-0.5">$19.99 <span className="text-xs text-stone-500 font-normal">USD / Month</span></span>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-950/40 text-[#d4af37] border border-amber-950/50 text-[10px] font-mono rounded select-none">
                    Stripe Sandbox Active
                  </span>
                </div>

                <form onSubmit={handlePay} className="space-y-4">
                  
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-450 mb-1">CARD NUMBER (SANDBOX ANY VALUES) *</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="w-4 h-4 text-stone-550" />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="4242 4242 4242 4242"
                        value={cardNo}
                        onChange={(e) => setCardNo(e.target.value)}
                        className="block w-full pl-9 pr-3 py-2 bg-[#060605] border border-zinc-800 rounded-lg text-xs font-mono text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-450 mb-1">EXPIRY DATE *</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs font-mono text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-450 mb-1">CVC CODE *</label>
                      <input
                        type="password"
                        required
                        placeholder="•••"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="block w-full py-2 px-3 bg-[#060605] border border-zinc-800 rounded-lg text-xs font-mono text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#d4af37]/80"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 bg-gold-gradient text-black font-extrabold text-xs rounded-lg uppercase tracking-wider hover:opacity-90 transition-all shadow-md mt-6 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" /> SECURING TRANSIT THROUGH STRIPE GATE...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> CONFIRM SUBSCRIPTION BILLING
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-stone-500 font-mono text-center mt-3">
                    In sandbox mode, enter any dummy numeric parameters or card symbols. No actual money will transit.
                  </p>

                </form>
              </>
            ) : (
              /* Active VIP subscriptions -> Render cancel actions */
              <div className="text-center py-6" id="cancel_vip_pane">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">SUBSCRIPTION ACTIVE</h3>
                <p className="text-xs text-stone-400 mt-2 max-w-md mx-auto leading-relaxed">
                  Your premium VIP membership billing is fully configured through our integrated Stripe module. Recurring payments are automatically billed each cycle.
                </p>

                <div className="mt-8 p-4 bg-zinc-950 rounded-lg border border-zinc-900 max-w-sm mx-auto flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>NEXT PAYMENT ON:</span>
                  <span className="text-stone-250 font-bold">2026-06-25</span>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-900/40">
                  <p className="text-[11px] text-stone-500 leading-relaxed max-w-sm mx-auto mb-4">
                    If you decide to cancel, subscription privileges remain fully active until the end of the current paid billing cycle.
                  </p>
                  <button
                    onClick={cancelVIPSubscription}
                    className="px-6 py-2 bg-zinc-900 hover:bg-zinc-850 hover:text-red-400 text-stone-400 text-xs font-bold rounded border border-zinc-800 uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Cancel VIP Membership
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Panel: Invoice Download Sandbox */}
          <div className="lg:col-span-5 bg-[#0b0b0a] border border-zinc-900 rounded-xl p-6 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-[#d4af37] tracking-[0.14em] uppercase mb-4">
              RECEIPT ARCHIVE ({isVIP ? "2 INVOICES" : "0 INVOICES"})
            </h3>

            {!isVIP ? (
              <div className="p-8 text-center text-stone-500 border border-zinc-900 border-dashed rounded-lg">
                <DollarSign className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                <p className="text-xs font-mono uppercase">Invoices clear</p>
                <p className="text-[11px] mt-1 text-stone-500">Upgrade your account to generate verified tax receipts.</p>
              </div>
            ) : (
              <div className="space-y-3" id="invoices_history">
                
                <div className="p-3 bg-zinc-950 rounded border border-zinc-900 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[#d4af37] font-bold block">#INV-2026-621</span>
                    <span className="text-zinc-500 text-[10px]">Date: 2026-05-25</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-stone-300 font-bold">$19.99</span>
                    <button 
                      onClick={() => handleInvoiceDownload("INV-2026-621")}
                      className="p-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded text-stone-300 cursor-pointer"
                      title="Download PDF Receipt"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 rounded border border-zinc-900 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[#d4af37] font-bold block">#INV-2026-521</span>
                    <span className="text-zinc-500 text-[10px]">Date: 2026-04-25</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-stone-300 font-bold">$19.99</span>
                    <button 
                      onClick={() => handleInvoiceDownload("INV-2026-521")}
                      className="p-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded text-stone-300 cursor-pointer"
                      title="Download PDF Receipt"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
