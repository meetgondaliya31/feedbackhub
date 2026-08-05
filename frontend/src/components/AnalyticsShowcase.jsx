import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Sparkles, 
  PieChart, 
  Download, 
  Star,
  CheckCircle,
  Clock,
  ArrowUpRight,
  MessageSquare,
  Zap,
  Activity
} from 'lucide-react';

export default function AnalyticsShowcase({ onOpenTrial }) {
  const [timeRange, setTimeRange] = useState('30d');

  const sentimentFeed = [
    {
      id: 1,
      source: 'Post-Checkout Survey',
      user: 'David K. (Enterprise Buyer)',
      rating: 5,
      comment: 'Checkout process was effortless. Received instant order confirmation and clear delivery ETA.',
      category: 'UX / Checkout',
      sentiment: 'Positive',
      sentimentScore: '+0.94',
      date: 'Today, 10:24 AM'
    },
    {
      id: 2,
      source: 'Support Ticket #4821',
      user: 'Maria Santos (Account Manager)',
      rating: 5,
      comment: 'Resolution time was under 10 minutes. Representative was extremely helpful and courteous.',
      category: 'Customer Support',
      sentiment: 'Positive',
      sentimentScore: '+0.98',
      date: 'Today, 09:45 AM'
    },
    {
      id: 3,
      source: 'Quarterly Employee Pulse',
      user: 'Anonymous (Engineering)',
      rating: 4,
      comment: 'Great team collaboration tools, but would love clearer documentation around deployment steps.',
      category: 'Internal Docs',
      sentiment: 'Neutral',
      sentimentScore: '+0.42',
      date: 'Yesterday, 04:15 PM'
    }
  ];

  return (
    <section id="analytics" className="py-20 md:py-28 border-t border-[#D8CCB3] bg-[#E8DFC8]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-[#D8CCB3] bg-[#FAF7F0] text-[#3B6215]">
            <Sparkles className="w-3.5 h-3.5 text-[#3B6215]" />
            <span>AI-Powered Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1F1F1F]">
            Turn Feedback into Actionable Insights
          </h2>

          <p className="text-base sm:text-lg text-[#4B4B4B]">
            Identify sentiment trends, aggregate CSAT scores, and make confident business decisions backed by real-time data visualizers.
          </p>
        </div>

        {/* Dashboard Frame Wrapper */}
        <div className="rounded-3xl p-4 sm:p-7 border border-[#D8CCB3] bg-[#FAF7F0] text-[#1F1F1F] shadow-xl transition-all">
          
          {/* Dashboard Bar Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-[#D8CCB3] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#3B6215]" />
                <h3 className="text-lg font-bold text-[#1F1F1F]">Live Feedback Intelligence Hub</h3>
                <span className="px-2 py-0.5 rounded-md bg-[#3B6215]/15 text-[#3B6215] text-xs font-semibold border border-[#3B6215]/30">
                  Real-Time Syncing
                </span>
              </div>
              <p className="text-xs mt-0.5 text-[#6B6B6B]">Aggregated metrics across all active response collection channels</p>
            </div>

            {/* Time Filter Pills & Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center p-1 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-xs">
                {['7d', '30d', '90d', '1y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      timeRange === range ? 'bg-[#3B6215] text-white shadow-xs' : 'text-[#4B4B4B] hover:text-[#3B6215]'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => onOpenTrial('trial')}
                className="px-3 py-1.5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-xs font-semibold text-[#1F1F1F] hover:bg-[#D8CCB3] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#3B6215]" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Metric Summary Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            <div className="p-4 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#6B6B6B]">
                <span>TOTAL RESPONSES</span>
                <MessageSquare className="w-4 h-4 text-[#3B6215]" />
              </div>
              <div className="text-2xl font-extrabold text-[#1F1F1F]">24,510</div>
              <div className="flex items-center text-xs text-[#3B6215] font-semibold">
                <TrendingUp className="w-3.5 h-3.5 mr-1" /> +18.2% vs previous period
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#6B6B6B]">
                <span>CSAT INDEX</span>
                <Star className="w-4 h-4 text-[#3B6215] fill-[#3B6215]" />
              </div>
              <div className="text-2xl font-extrabold text-[#1F1F1F]">4.88 / 5.0</div>
              <div className="flex items-center text-xs text-[#3B6215] font-semibold">
                <CheckCircle className="w-3.5 h-3.5 mr-1" /> 97.2% Satisfaction rate
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#6B6B6B]">
                <span>AVG RESPONSE TIME</span>
                <Clock className="w-4 h-4 text-[#3B6215]" />
              </div>
              <div className="text-2xl font-extrabold text-[#1F1F1F]">1m 42s</div>
              <div className="flex items-center text-xs text-[#3B6215] font-semibold">
                <Zap className="w-3.5 h-3.5 mr-1" /> 45% faster than benchmark
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#6B6B6B]">
                <span>NPS PROMOTERS</span>
                <PieChart className="w-4 h-4 text-[#3B6215]" />
              </div>
              <div className="text-2xl font-extrabold text-[#1F1F1F]">84.2%</div>
              <div className="flex items-center text-xs text-[#3B6215] font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> High customer loyalty
              </div>
            </div>

          </div>

          {/* Main Visual Charts Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            
            {/* Visual Feedback Trend Chart (8 Cols) */}
            <div className="lg:col-span-8 p-5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]/60 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#1F1F1F] flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-[#3B6215]" />
                    <span>Response Volume & Sentiment Trend</span>
                  </h4>
                  <span className="text-xs text-[#6B6B6B]">Weekly breakdown of response submissions and sentiment distribution</span>
                </div>
                
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1 text-[#3B6215]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B6215] inline-block" /> Submissions
                  </span>
                  <span className="flex items-center gap-1 text-[#5D8A2D]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5D8A2D] inline-block" /> Positive %
                  </span>
                </div>
              </div>

              {/* Bar Chart Visual Graphic */}
              <div className="h-48 pt-4 flex items-end justify-between gap-2 sm:gap-4 border-b border-[#D8CCB3] pb-2 px-2">
                {[
                  { label: 'Week 1', height: '60%', pct: '92%' },
                  { label: 'Week 2', height: '75%', pct: '94%' },
                  { label: 'Week 3', height: '50%', pct: '91%' },
                  { label: 'Week 4', height: '88%', pct: '96%' },
                  { label: 'Week 5', height: '95%', pct: '97%' },
                  { label: 'Week 6', height: '70%', pct: '95%' },
                  { label: 'Week 7', height: '100%', pct: '98%' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-[#6B6B6B]">
                      {bar.pct}
                    </div>
                    <div 
                      className="w-full bg-[#3B6215] rounded-t-md transition-all duration-300 group-hover:bg-[#2F5010]"
                      style={{ height: bar.height }}
                    />
                    <span className="text-[11px] font-medium text-[#6B6B6B]">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Distribution Side Card (4 Cols) */}
            <div className="lg:col-span-4 p-5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]/60 space-y-4">
              <h4 className="text-sm font-bold text-[#1F1F1F] flex items-center justify-between">
                <span>Rating Distribution</span>
                <Star className="w-4 h-4 text-[#3B6215] fill-[#3B6215]" />
              </h4>

              <div className="space-y-3 pt-2">
                {[
                  { star: '5 Stars', count: 18420, pct: 75 },
                  { star: '4 Stars', count: 4890, pct: 20 },
                  { star: '3 Stars', count: 850, pct: 3.5 },
                  { star: '2 Stars', count: 250, pct: 1.0 },
                  { star: '1 Star', count: 100, pct: 0.5 },
                ].map((item) => (
                  <div key={item.star} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-[#4B4B4B]">
                      <span className="font-medium">{item.star}</span>
                      <span className="font-mono text-[#6B6B6B]">{item.count.toLocaleString()} ({item.pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden bg-[#D8CCB3]">
                      <div className="h-full bg-[#3B6215] rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#D8CCB3] text-center">
                <span className="text-xs text-[#6B6B6B]">Total CSAT Sample: 24,510 respondents</span>
              </div>
            </div>

          </div>

          {/* Recent Live Feed Stream */}
          <div className="p-5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]/60">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-[#1F1F1F]">Live Feedback Activity Stream</h4>
              <span className="text-xs text-[#3B6215] hover:underline cursor-pointer" onClick={() => onOpenTrial('trial')}>
                View all in inbox →
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sentimentFeed.map((feed) => (
                <div key={feed.id} className="p-4 rounded-xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-2 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#3B6215]">{feed.source}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3B6215]/15 text-[#3B6215] border border-[#3B6215]/30 font-mono">
                      {feed.sentimentScore}
                    </span>
                  </div>

                  <p className="text-xs font-medium italic text-[#1F1F1F]">"{feed.comment}"</p>

                  <div className="flex items-center justify-between pt-2 text-[11px] text-[#6B6B6B] border-t border-[#D8CCB3]">
                    <span>{feed.user}</span>
                    <span>{feed.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
