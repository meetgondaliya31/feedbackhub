import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Play } from 'lucide-react';

export default function CTASection({ onOpenTrial, onOpenDemo }) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#F4EEE3]">
      {/* Background Subtle Warm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#3B6215]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-16 border border-[#D8CCB3] bg-[#E8DFC8] text-center relative overflow-hidden shadow-xl">
          
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF7F0] text-[#3B6215] border border-[#D8CCB3]">
              <Sparkles className="w-3.5 h-3.5 text-[#3B6215]" />
              <span>Get Started in 2 Minutes</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1F1F1F] leading-tight">
              Start Collecting Better Feedback Today
            </h2>

            <p className="text-base sm:text-lg text-[#4B4B4B] max-w-2xl mx-auto leading-relaxed">
              Join thousands of organizations that use structured feedback to improve customer experiences, employee engagement, and business decisions.
            </p>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Button */}
              <button
                onClick={() => onOpenTrial('trial')}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl text-white bg-[#3B6215] hover:bg-[#2F5010] shadow-olive-soft transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Button */}
              <button
                onClick={() => onOpenDemo('demo')}
                className="w-full sm:w-auto px-7 py-4 text-base font-semibold rounded-xl bg-[#FAF7F0] hover:bg-[#F4EEE3] border border-[#3B6215] text-[#3B6215] flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Play className="w-4 h-4 text-[#3B6215] fill-current" />
                <span>Schedule Demo</span>
              </button>
            </div>

            {/* Trust Bulletins */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B6B6B] font-medium border-t border-[#D8CCB3]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3B6215]" /> Instant Setup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#3B6215]" /> No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3B6215]" /> Cancel Anytime
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
