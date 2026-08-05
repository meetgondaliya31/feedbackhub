import React, { useState } from 'react';
import { 
  FilePlus2, 
  Share2, 
  BarChart4, 
  CheckCircle, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

export default function HowItWorks({ onOpenTrial }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Create a Form',
      subtitle: 'Build custom feedback forms using flexible question types.',
      description: 'Select from pre-built industry templates or start from scratch using our drag-and-drop builder. Add rating scales, NPS questions, text feedback fields, and conditional skip logic with ease.',
      icon: FilePlus2,
      badge: 'Step 1: Design',
      previewContent: {
        title: 'Q: How would you rate your recent support session?',
        type: 'Star Rating + Comment Box',
        options: ['1 Star - Poor', '2 Stars - Fair', '3 Stars - Good', '4 Stars - Very Good', '5 Stars - Excellent']
      }
    },
    {
      number: '02',
      title: 'Share with Participants',
      subtitle: 'Distribute forms through links, email invitations, or embedded pages.',
      description: 'Reach your target audience across every channel. Send trackable email invites, generate instant QR codes, embed popup widgets directly into your web app, or share direct URL links.',
      icon: Share2,
      badge: 'Step 2: Collect',
      previewContent: {
        title: 'Multi-Channel Distribution',
        type: 'Shareable Shortlink, QR Code & In-App Embed',
        options: ['Email Blast (SMTP / API)', 'Website Slide-In Widget', 'Custom Domain URL', 'QR Code for In-Person Events']
      }
    },
    {
      number: '03',
      title: 'Analyze Results',
      subtitle: 'Monitor trends, ratings, and comments to improve decision-making.',
      description: 'Watch incoming feedback flow into your real-time analytics dashboard. Utilize AI sentiment scoring, automated rating breakdowns, and cohort filters to pinpoint high-priority improvements.',
      icon: BarChart4,
      badge: 'Step 3: Act',
      previewContent: {
        title: 'Executive Real-Time Insights',
        type: 'Sentiment Heatmap & CSAT Trend',
        options: ['Automated Sentiment Categorization', 'NPS Promoters vs Detractors', 'Export to PDF, CSV & Executive Slide Deck']
      }
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 border-t border-[#D8CCB3] bg-[#E8DFC8]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-[#D8CCB3] bg-[#FAF7F0] text-[#3B6215]">
            <Sparkles className="w-3.5 h-3.5 text-[#3B6215]" />
            <span>Seamless Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1F1F1F]">
            Three Simple Steps
          </h2>

          <p className="text-base sm:text-lg text-[#4B4B4B]">
            Go from zero to collecting high-value audience insights in under 5 minutes.
          </p>
        </div>

        {/* 3 Step Progression Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Steps Timeline Column */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-[#FAF7F0] border-[#3B6215] shadow-xs'
                      : 'bg-[#FAF7F0]/60 border-[#D8CCB3] hover:bg-[#FAF7F0]'
                  }`}
                >
                  {/* Step Active Accent Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#3B6215]" />
                  )}

                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 transition-transform ${
                      isActive
                        ? 'bg-[#3B6215] text-white shadow-xs scale-105'
                        : 'bg-[#E8DFC8] text-[#3B6215]'
                    }`}>
                      {step.number}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-[#1F1F1F]">
                          {step.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-[#3B6215] px-2 py-0.5 rounded-full bg-[#3B6215]/15 border border-[#3B6215]/30">
                          {step.badge}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-[#3B6215]">
                        {step.subtitle}
                      </p>

                      <p className="text-xs leading-relaxed pt-1 text-[#4B4B4B]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Visual Step Interactive Mockup */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl p-6 border border-[#D8CCB3] bg-[#FAF7F0] text-[#1F1F1F] shadow-xl relative overflow-hidden transition-all">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#D8CCB3] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#3B6215]/20 flex items-center justify-center text-[#3B6215]">
                    {React.createElement(steps[activeStep].icon, { className: 'w-4 h-4' })}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1F1F1F]">
                      {steps[activeStep].previewContent.title}
                    </h4>
                    <span className="text-[11px] text-[#6B6B6B]">
                      {steps[activeStep].previewContent.type}
                    </span>
                  </div>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-full bg-[#3B6215]/15 text-[#3B6215] border border-[#3B6215]/30 font-mono">
                  Live Preview Mode
                </span>
              </div>

              {/* Step Context Dynamic View */}
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">
                  Key Deliverables & Workflow Features:
                </p>

                <div className="space-y-3">
                  {steps[activeStep].previewContent.options.map((opt, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#3B6215]/20 text-[#3B6215] flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-[#1F1F1F]">{opt}</span>
                      </div>
                      <span className="text-xs font-mono text-[#3B6215]">Enabled</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Step Action Button */}
                <div className="pt-4 border-t border-[#D8CCB3] flex items-center justify-between">
                  <span className="text-xs text-[#6B6B6B]">Step {activeStep + 1} of 3</span>
                  <button
                    onClick={() => onOpenTrial('trial')}
                    className="px-4 py-2 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <span>Launch This Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
