import React from 'react';
import { GraduationCap, ShoppingBag, Layers, Calendar, Briefcase, CheckCircle2 } from 'lucide-react';

export default function SocialProof() {
  const industries = [
    {
      category: 'Educational Institutions',
      icon: GraduationCap,
      color: 'bg-[#3B6215]/15 text-[#3B6215]',
      names: ['Pacific Crest University', 'Stanford EdTech', 'Global STEM Academy'],
      metric: '92% completion rate on student surveys'
    },
    {
      category: 'Retail & E-Commerce',
      icon: ShoppingBag,
      color: 'bg-[#3B6215]/15 text-[#3B6215]',
      names: ['Lumina Retail Group', 'UrbanVibe Apparel', 'SwiftCart Online'],
      metric: '4.8/5 CSAT score tracked across 120+ stores'
    },
    {
      category: 'Product & Engineering',
      icon: Layers,
      color: 'bg-[#3B6215]/15 text-[#3B6215]',
      names: ['SaaSflow Platform', 'DevMetrics Inc', 'StackPulse Cloud'],
      metric: '+35% feature adoption speed from user feedback'
    },
    {
      category: 'Event Organizations',
      icon: Calendar,
      color: 'bg-[#3B6215]/15 text-[#3B6215]',
      names: ['Global Tech Expo', 'Summit Live Media', 'DirectCon 2026'],
      metric: 'Real-time post-session speaker analytics'
    },
    {
      category: 'Professional Services',
      icon: Briefcase,
      color: 'bg-[#3B6215]/15 text-[#3B6215]',
      names: ['Apex Financial Advisory', 'NexaConsulting', 'Elevate Cloud Ops'],
      metric: 'SOC2 compliant employee engagement pulse'
    }
  ];

  return (
    <section className="py-16 border-y border-[#D8CCB3] bg-[#F0E7D6] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3B6215]">
            Trusted Industry Standard
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1F1F1F]">
            Teams Across Industries Use FeedbackHub
          </h2>
          <p className="text-sm sm:text-base text-[#4B4B4B]">
            From higher education to enterprise product teams, leaders rely on FeedbackHub to collect, organize, and transform responses into growth.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[#D8CCB3] bg-[#FAF7F0] hover:border-[#3B6215] transition-all duration-300 hover:-translate-y-1 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ind.color} mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-bold text-sm mb-2 text-[#1F1F1F]">
                    {ind.category}
                  </h3>

                  <div className="space-y-1 text-xs font-medium text-[#4B4B4B]">
                    {ind.names.map((name, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#3B6215] flex-shrink-0" />
                        <span className="truncate">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D8CCB3] text-[11px] font-semibold italic text-[#3B6215]">
                  {ind.metric}
                </div>
              </div>
            );
          })}
        </div>

        {/* Aggregate Stats Strip */}
        <div className="mt-12 pt-8 border-t border-[#D8CCB3] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#3B6215]">4,500+</div>
            <div className="text-xs font-medium mt-1 text-[#4B4B4B]">Active Organizations</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#3B6215]">18M+</div>
            <div className="text-xs font-medium mt-1 text-[#4B4B4B]">Responses Processed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#3B6215]">99.99%</div>
            <div className="text-xs font-medium mt-1 text-[#4B4B4B]">Platform Uptime SLA</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#3B6215]">4.9 / 5</div>
            <div className="text-xs font-medium mt-1 text-[#4B4B4B]">Customer Rating</div>
          </div>
        </div>

      </div>
    </section>
  );
}
