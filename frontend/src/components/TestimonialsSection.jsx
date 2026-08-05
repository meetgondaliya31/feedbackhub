import React from 'react';
import { Star, CheckCircle, Sparkles } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Head of Customer Experience',
      company: 'CloudScale Systems (SaaS)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      rating: 5,
      impact: '+34% CSAT Response Rate',
      quote: 'FeedbackHub completely transformed how our product and support teams analyze customer sentiment. Before FeedbackHub, our survey data was scattered across three tools. Now, real-time analytics automatically route critical customer issues straight to our Slack channels.'
    },
    {
      name: 'Prof. David Miller',
      role: 'Dean of Academic Affairs',
      company: 'Pacific Crest University (Education)',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
      rating: 5,
      impact: '89% Student Participation',
      quote: 'Collecting end-of-semester feedback from over 12,000 students used to take weeks of manual processing. FeedbackHub’s custom templates and anonymous response protection boosted student trust and gave our faculty clear, actionable evaluation metrics.'
    },
    {
      name: 'Marcus Vance',
      role: 'Director of People Operations',
      company: 'Nexa Tech Hub (Enterprise)',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
      rating: 5,
      impact: '-18% Employee Churn',
      quote: 'The anonymous response feature is second to none. Our team feels confident sharing genuine workplace feedback during our monthly pulse surveys. The sentiment analysis reports help leadership address internal friction before it escalates.'
    }
  ];

  return (
    <section className="py-20 md:py-28 relative bg-[#F4EEE3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215]">
            <Sparkles className="w-3.5 h-3.5 text-[#3B6215]" />
            <span>Proven Customer Results</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1F1F1F]">
            Loved by Leaders in CX & Operations
          </h2>

          <p className="text-base sm:text-lg text-[#4B4B4B]">
            Read how growing teams, universities, and enterprise organizations use FeedbackHub to turn opinions into measurable outcomes.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl p-7 border border-[#D8CCB3] bg-[#FAF7F0] hover:border-[#3B6215] transition-all duration-300 hover:-translate-y-1 shadow-xs flex flex-col justify-between relative"
            >
              {/* Top Quote Icon & Impact Badge */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#3B6215] fill-[#3B6215]" />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#3B6215]/15 text-[#3B6215] border border-[#3B6215]/30">
                    {item.impact}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base leading-relaxed mb-6 italic text-[#4B4B4B]">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Profile Footer */}
              <div className="pt-5 border-t border-[#D8CCB3] flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#3B6215]/40"
                />
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-1.5 text-[#1F1F1F]">
                    <span>{item.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#3B6215]" />
                  </h3>
                  <p className="text-xs text-[#3B6215] font-medium">{item.role}</p>
                  <p className="text-[11px] text-[#6B6B6B]">{item.company}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
