import React, { useState } from 'react';
import { 
  FileText, 
  EyeOff, 
  LineChart, 
  Star, 
  Inbox, 
  Lock, 
  ArrowRight, 
  Check, 
  Sparkles 
} from 'lucide-react';

export default function FeaturesSection({ onOpenTrial }) {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      id: 'forms',
      title: 'Custom Feedback Forms',
      description: 'Build surveys and feedback forms tailored to your organization’s precise needs with intuitive drag-and-drop question modules.',
      icon: FileText,
      badge: 'Drag & Drop Builder',
      details: [
        'Logic branching & skip patterns based on user responses',
        'Custom branding, logos, color palettes, and fonts',
        'Supports 20+ question types including NPS, CSAT & Likert scales',
        'Multi-language localization and automatic translation'
      ]
    },
    {
      id: 'anonymous',
      title: 'Anonymous Responses',
      description: 'Encourage honest and unbiased feedback with anonymous submissions, cryptographic privacy controls, and identity masking.',
      icon: EyeOff,
      badge: 'Zero-Knowledge Privacy',
      details: [
        'Configurable anonymity levels per form or field',
        'IP stripping and metadata redaction to protect respondent trust',
        'Aggregated reporting thresholds to prevent reverse identification',
        'Ideal for sensitive employee whistleblowing and HR pulse checks'
      ]
    },
    {
      id: 'analytics',
      title: 'Real-Time Analytics',
      description: 'Track responses and trends instantly through visual dashboards, real-time sentiment scoring, and automated chart generation.',
      icon: LineChart,
      badge: 'Live Dashboard',
      details: [
        'Automated AI topic modeling and sentiment classification',
        'Cross-segment filtering by demographic, channel, or date range',
        'One-click PDF & CSV export for executive presentations',
        'Automated daily/weekly email summary digests'
      ]
    },
    {
      id: 'ratings',
      title: 'Ratings and Reviews',
      description: 'Collect structured ratings alongside detailed written feedback to quantify satisfaction and uncover qualitative context.',
      icon: Star,
      badge: 'Multi-Criteria Scoring',
      details: [
        'Star ratings, numeric scales (1-10), and emoji reactions',
        'Category-specific sub-ratings (e.g. Speed, Service, Quality)',
        'Review moderation queue with flag and approval workflows',
        'Rich media uploads for screenshot or document attachments'
      ]
    },
    {
      id: 'management',
      title: 'Response Management',
      description: 'Organize, search, tag, and assign feedback efficiently from one centralized collaborative inbox.',
      icon: Inbox,
      badge: 'Unified Inbox',
      details: [
        'Smart tags, custom statuses (New, In Review, Resolved)',
        'Assign feedback items to team members with internal notes',
        'Full-text search with instant filtering across thousands of responses',
        'Slack and MS Teams real-time notification webhooks'
      ]
    },
    {
      id: 'security',
      title: 'Secure Data Handling',
      description: 'Protect feedback data with enterprise-grade AES-256 encryption, role-based access, SOC2 Type II compliance, and GDPR privacy controls.',
      icon: Lock,
      badge: 'Enterprise Security',
      details: [
        'Role-Based Access Control (RBAC) with custom admin privileges',
        'SSO integration with SAML 2.0, Okta, Google Workspace & Azure AD',
        'Audit logs for data compliance and access tracking',
        'Data retention policies and automated deletion schedules'
      ]
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative bg-[#F4EEE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215]">
            <Sparkles className="w-3.5 h-3.5 text-[#3B6215]" />
            <span>Complete Feature Suite</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1F1F1F]">
            Everything You Need to Understand Your Audience
          </h2>
          
          <p className="text-base sm:text-lg text-[#4B4B4B]">
            FeedbackHub provides an end-to-end platform for creating forms, engaging respondents, and deriving deep analytical insights with enterprise compliance.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            const isSelected = selectedFeature === index;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedFeature(index)}
                className={`group relative rounded-2xl p-7 transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FAF7F0] border-[#3B6215] ring-1 ring-[#3B6215] shadow-sm'
                    : 'bg-[#FAF7F0] border-[#D8CCB3] hover:border-[#3B6215] hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#3B6215] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#3B6215]/15 text-[#3B6215] border border-[#3B6215]/30">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-2.5 text-[#1F1F1F]">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed mb-6 text-[#4B4B4B]">
                    {item.description}
                  </p>

                  {/* Key Capabilities Checklist */}
                  <div className="space-y-2 border-t border-[#D8CCB3] pt-4">
                    {item.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-medium">
                        <Check className="w-3.5 h-3.5 text-[#3B6215] flex-shrink-0 mt-0.5" />
                        <span className="text-[#1F1F1F]">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA trigger */}
                <div className="mt-6 pt-4 border-t border-[#D8CCB3] flex items-center justify-between text-xs font-semibold text-[#3B6215] group-hover:text-[#2F5010]">
                  <span>Explore module details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Interactive Showcase Bar */}
        <div className="mt-12 p-6 rounded-2xl border border-[#D8CCB3] bg-[#E8DFC8] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-bold text-base text-[#1F1F1F]">
              Want to see how easy it is to build a feedback form?
            </h4>
            <p className="text-sm text-[#4B4B4B]">
              Launch our interactive sandbox form builder in seconds with pre-loaded question templates.
            </p>
          </div>
          
          <button
            onClick={() => onOpenTrial('trial')}
            className="px-6 py-3 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-semibold text-sm shadow-xs whitespace-nowrap transition-transform active:scale-95"
          >
            Try Form Builder Sandbox
          </button>
        </div>

      </div>
    </section>
  );
}
