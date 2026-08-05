import React, { useState } from 'react';
import { 
  Users, 
  Smile, 
  GraduationCap, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  MessageSquareQuote,
  Layers
} from 'lucide-react';

export default function UseCasesSection({ onOpenTrial }) {
  const [activeTab, setActiveTab] = useState(0);

  const useCases = [
    {
      id: 'customer',
      title: 'Customer Feedback',
      subtitle: 'Collect reviews and satisfaction insights from customers.',
      icon: Smile,
      description: 'Measure Net Promoter Score (NPS), CSAT after support tickets, and post-purchase checkout surveys to eliminate friction in the buyer journey.',
      metrics: '4.85 / 5 Avg CSAT Score',
      keyBenefits: [
        'Automated post-ticket satisfaction triggers',
        'Customer effort score (CES) friction detection',
        'Instant alerts for negative feedback to churn risk teams'
      ],
      sampleQuestion: '"How likely are you to recommend FeedbackHub to a colleague?" (NPS 0-10)'
    },
    {
      id: 'employee',
      title: 'Employee Feedback',
      subtitle: 'Understand workplace sentiment and employee engagement.',
      icon: Users,
      description: 'Conduct anonymous quarterly pulse surveys, 360-degree peer reviews, onboarding check-ins, and exit interviews with complete privacy.',
      metrics: '89% Response Rate',
      keyBenefits: [
        'Guaranteed zero-knowledge anonymity controls',
        'eNPS & organizational culture heatmaps',
        'Manager benchmark reporting & action tracking'
      ],
      sampleQuestion: '"I feel empowered and supported to do my best work every day." (Strongly Agree - Disagree)'
    },
    {
      id: 'educational',
      title: 'Educational Feedback',
      subtitle: 'Gather feedback from students, faculty, and workshop participants.',
      icon: GraduationCap,
      description: 'Streamline end-of-course evaluations, instructor feedback, campus facility surveys, and online webinar learning assessments.',
      metrics: '3.2x Higher Completion',
      keyBenefits: [
        'LMS integration with Canvas, Blackboard & Moodle',
        'Course quality and accreditation report templates',
        'Student sentiment tracking across academic terms'
      ],
      sampleQuestion: '"The course materials and assignments effectively reinforced learning objectives."'
    },
    {
      id: 'event',
      title: 'Event Feedback',
      subtitle: 'Measure attendee experiences, speaker ratings, and event success.',
      icon: Calendar,
      description: 'Capture real-time live audience feedback via QR codes during keynote sessions, post-event surveys, and sponsor ROI evaluations.',
      metrics: '94% On-Site QR Scans',
      keyBenefits: [
        'Session-by-session speaker leaderboard ratings',
        'Venue, catering, and schedule feedback breakdown',
        'Instant post-event executive slide generation'
      ],
      sampleQuestion: '"Which session topic provided the highest actionable value for your team?"'
    },
    {
      id: 'product',
      title: 'Product Research',
      subtitle: 'Validate ideas and improve products with continuous user input.',
      icon: Layers,
      description: 'Run beta feature polls, UX micro-surveys, feature prioritization voting, and product-market fit (PMF) surveys directly in your app.',
      metrics: '+38% Roadmap Clarity',
      keyBenefits: [
        'Targeted in-app micro-survey popups',
        'Feature voting and request prioritization boards',
        'User cohort sentiment tagging'
      ],
      sampleQuestion: '"How would you feel if you could no longer use this feature?" (Very disappointed - Not disappointed)'
    }
  ];

  return (
    <section id="solutions" className="py-20 md:py-28 relative bg-[#F4EEE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215]">
            <Sparkles className="w-3.5 h-3.5 text-[#3B6215]" />
            <span>Tailored Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1F1F1F]">
            Built for Different Teams
          </h2>

          <p className="text-base sm:text-lg text-[#4B4B4B]">
            Whether you run customer success, people operations, higher ed courses, or product development, FeedbackHub provides purpose-built workflows.
          </p>
        </div>

        {/* Use Cases Tab Controls */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {useCases.map((uc, index) => {
            const Icon = uc.icon;
            const isActive = activeTab === index;

            return (
              <button
                key={uc.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#3B6215] border-[#2F5010] text-white shadow-xs'
                    : 'bg-[#E8DFC8]/60 border-[#D8CCB3] text-[#4B4B4B] hover:text-[#3B6215] hover:bg-[#FAF7F0]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{uc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Use Case Content Showcase Box */}
        <div className="mt-8">
          {(() => {
            const current = useCases[activeTab];
            const Icon = current.icon;

            return (
              <div className="rounded-3xl p-6 sm:p-10 border border-[#D8CCB3] bg-[#FAF7F0] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Information */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#3B6215] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F]">
                        {current.title}
                      </h3>
                      <span className="text-xs font-semibold text-[#3B6215]">{current.subtitle}</span>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed text-[#4B4B4B]">
                    {current.description}
                  </p>

                  {/* Key Benefits List */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                      Key Workflows & Capabilities:
                    </h4>
                    {current.keyBenefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#3B6215] flex-shrink-0" />
                        <span className="text-[#1F1F1F]">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <button
                      onClick={() => onOpenTrial('trial')}
                      className="px-6 py-3 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-semibold text-sm shadow-xs flex items-center gap-2 transition-all"
                    >
                      <span>Explore {current.title} Templates</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Interactive Mockup Card */}
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-2xl border border-[#D8CCB3] bg-[#E8DFC8]/60 space-y-4">
                    
                    <div className="flex items-center justify-between pb-3 border-b border-[#D8CCB3]">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                        Sample Form Template
                      </span>
                      <span className="text-xs text-[#3B6215] font-medium flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> {current.metrics}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-3">
                      <div className="flex items-center gap-2 text-[#3B6215] text-xs font-semibold">
                        <MessageSquareQuote className="w-4 h-4" />
                        <span>Pre-Built Question Prompt</span>
                      </div>
                      <p className="text-sm font-medium italic text-[#1F1F1F]">
                        {current.sampleQuestion}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[#3B6215]/30 bg-[#FAF7F0] space-y-2">
                      <div className="text-xs font-bold text-[#3B6215]">Automated Action Trigger:</div>
                      <div className="text-xs text-[#4B4B4B]">
                        When rating &lt; 3 stars, automatically trigger an alert to the customer success team Slack channel and open a support ticket.
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })()}
        </div>

      </div>
    </section>
  );
}
