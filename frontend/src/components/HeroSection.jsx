import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Star, 
  TrendingUp, 
  Users, 
  BarChart3, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';

export default function HeroSection({ onOpenTrial, onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('All');

  const heroFeedItems = [
    {
      name: 'Elena Rostova',
      role: 'Product Lead @ TechFlow',
      type: 'Customer CSAT',
      rating: 5,
      comment: 'The new analytics dashboard gives our product team immediate clarity on UX friction points.',
      time: '3m ago',
      sentiment: 'Positive',
      tag: 'Product UX'
    },
    {
      name: 'Dr. Arthur Pendelton',
      role: 'Academic Director @ Edutopia',
      type: 'Student Survey',
      rating: 5,
      comment: 'Semester end feedback response rate jumped from 42% to 89% using multi-channel forms.',
      time: '14m ago',
      sentiment: 'Positive',
      tag: 'Education'
    },
    {
      name: 'Samantha Wu',
      role: 'VP Operations @ Lumina Retail',
      type: 'Employee Sentiment',
      rating: 4,
      comment: 'Quarterly pulse survey insights helped us reduce store employee turnover by 18%.',
      time: '32m ago',
      sentiment: 'Positive',
      tag: 'HR & People'
    }
  ];

  const filteredItems = activeTab === 'All' 
    ? heroFeedItems 
    : heroFeedItems.filter(item => item.type.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#F4EEE3]">
      {/* Background Soft Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#3B6215]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#E8DFC8]/50 blur-[110px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Trust Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3B6215]" />
            <span>Trusted by 4,500+ growing teams for feedback collection</span>
            <div className="flex items-center gap-0.5 ml-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#3B6215] text-[#3B6215]" />
              ))}
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-[#1F1F1F]">
            Collect Better Feedback.{' '}
            <span className="text-[#3B6215]">
              Make Better Decisions.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed text-[#4B4B4B]">
            Create customizable feedback forms, gather responses from customers and teams, and transform insights into meaningful actions with powerful real-time analytics.
          </p>

          {/* CTA Button Group */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Button */}
            <button
              onClick={() => onOpenTrial('trial')}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl text-white bg-[#3B6215] hover:bg-[#2F5010] shadow-olive-soft transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => onOpenDemo('demo')}
              className="w-full sm:w-auto px-7 py-4 text-base font-semibold rounded-xl border border-[#3B6215] bg-[#E8DFC8] text-[#3B6215] hover:bg-[#D8CCB3] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xs cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#3B6215]/20 flex items-center justify-center text-[#3B6215]">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Book a Demo</span>
            </button>
          </div>

          {/* Guarantee Subtext */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium pt-2 text-[#6B6B6B]">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#3B6215]" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#3B6215]" /> 14-day full feature trial
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#3B6215]" /> SOC2 & GDPR Compliant
            </span>
          </div>

        </div>

        {/* Dashboard SaaS Preview Mockup */}
        <div className="mt-14 max-w-6xl mx-auto">
          <div className="rounded-3xl p-5 sm:p-7 border border-[#D8CCB3] bg-[#FAF7F0] text-[#1F1F1F] shadow-2xl">
            
            {/* Top Mockup Window Header Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-5 border-b border-[#D8CCB3] gap-3 px-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3B6215]" />
                <div className="w-3 h-3 rounded-full bg-[#5D8A2D]" />
                <div className="w-3 h-3 rounded-full bg-[#D8CCB3]" />
                <span className="text-xs font-mono ml-2 text-[#6B6B6B]">
                  app.feedbackhub.io/analytics/dashboard
                </span>
              </div>
              
              {/* Category Filter Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-xs">
                {['All', 'Customer', 'Employee', 'Student'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      activeTab === tab 
                        ? 'bg-[#3B6215] text-white shadow-xs' 
                        : 'text-[#4B4B4B] hover:text-[#3B6215]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard Internal Content Layout */}
            <div className="space-y-5">
              
              {/* Top Row: 3 Equal Width Stat Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Stat Card 1 */}
                <div className="p-4 rounded-2xl border border-[#D8CCB3] bg-[#E8DFC8]/60 flex flex-col justify-between space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                      Total Responses
                    </span>
                    <span className="p-2 rounded-xl bg-[#3B6215]/20 text-[#3B6215]">
                      <BarChart3 className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-[#1F1F1F]">14,892</div>
                    <div className="flex items-center gap-1.5 text-xs text-[#3B6215] font-semibold mt-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+24.8% vs last month</span>
                    </div>
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="p-4 rounded-2xl border border-[#D8CCB3] bg-[#E8DFC8]/60 flex flex-col justify-between space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                      Average CSAT Rating
                    </span>
                    <span className="p-2 rounded-xl bg-[#3B6215]/20 text-[#3B6215]">
                      <Star className="w-4 h-4 fill-[#3B6215]" />
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-[#1F1F1F] flex items-baseline gap-2">
                      4.85 <span className="text-sm font-normal text-[#6B6B6B]">/ 5.0</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#3B6215] font-semibold mt-1">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>94.6% Positive sentiment score</span>
                    </div>
                  </div>
                </div>

                {/* Stat Card 3 */}
                <div className="p-4 rounded-2xl border border-[#D8CCB3] bg-[#E8DFC8]/60 flex flex-col justify-between space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                      Net Promoter Score (NPS)
                    </span>
                    <span className="p-2 rounded-xl bg-[#3B6215]/20 text-[#3B6215]">
                      <Users className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-[#1F1F1F]">+68</div>
                    <div className="flex items-center gap-1.5 text-xs text-[#3B6215] font-semibold mt-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Industry Benchmark: +42</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Row: Rating Breakdown (5 cols) & Recent Activity Stream (7 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Visual Rating Distribution Chart Area (5 Cols) */}
                <div className="lg:col-span-5 p-5 rounded-2xl border border-[#D8CCB3] bg-[#E8DFC8]/60 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#D8CCB3] pb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1F1F]">
                      Rating Breakdown
                    </h4>
                    <span className="text-[11px] font-semibold text-[#6B6B6B]">Last 30 Days</span>
                  </div>
                  
                  <div className="space-y-2.5">
                    {[
                      { stars: 5, pct: 76, count: '11,317' },
                      { stars: 4, pct: 18, count: '2,680' },
                      { stars: 3, pct: 4, count: '595' },
                      { stars: 2, pct: 1.5, count: '223' },
                      { stars: 1, pct: 0.5, count: '77' },
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center text-xs gap-3">
                        <span className="w-12 font-semibold text-[#4B4B4B] flex items-center gap-1">
                          {row.stars} <Star className="w-3 h-3 text-[#3B6215] fill-[#3B6215] inline" />
                        </span>
                        <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-[#D8CCB3]">
                          <div 
                            className="bg-[#3B6215] h-full rounded-full transition-all duration-500" 
                            style={{ width: `${row.pct}%` }} 
                          />
                        </div>
                        <span className="w-12 text-right font-bold text-[#1F1F1F]">{row.pct}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#D8CCB3] text-center">
                    <span className="text-[11px] font-medium text-[#6B6B6B]">Total CSAT Sample: 14,892 respondents</span>
                  </div>
                </div>

                {/* Recent Live Activity Stream Feed (7 Cols) */}
                <div className="lg:col-span-7 p-5 rounded-2xl border border-[#D8CCB3] bg-[#E8DFC8]/60 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#D8CCB3] pb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1F1F] flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-[#3B6215]" />
                      <span>Recent Activity Stream</span>
                    </h4>
                    <span className="flex items-center gap-1.5 text-[11px] text-[#3B6215] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#3B6215] animate-pulse inline-block" /> Live Syncing
                    </span>
                  </div>

                  <div className="space-y-3">
                    {filteredItems.map((feed, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-1.5 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#1F1F1F]">{feed.name}</span>
                              <span className="text-[11px] text-[#6B6B6B]">{feed.role}</span>
                            </div>
                            <p className="text-xs italic text-[#4B4B4B] mt-1">"{feed.comment}"</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3B6215]/15 text-[#3B6215] font-semibold border border-[#3B6215]/30">
                              {feed.tag}
                            </span>
                            <span className="text-[10px] font-mono text-[#6B6B6B]">{feed.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
