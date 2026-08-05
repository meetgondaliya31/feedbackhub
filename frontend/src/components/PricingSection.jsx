import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PricingSection({ onOpenTrial }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Essential feedback collection tools for small teams and early-stage projects.',
      monthlyPrice: 29,
      annualPrice: 23,
      popular: false,
      ctaText: 'Start Free 14-Day Trial',
      features: [
        'Up to 5 active feedback forms',
        '1,000 response submissions / month',
        'Basic real-time analytics & charts',
        'Standard email support',
        'CSV & PDF response export',
        'Embeddable web widget'
      ]
    },
    {
      name: 'Professional',
      description: 'Complete feedback intelligence platform for growing businesses and departments.',
      monthlyPrice: 79,
      annualPrice: 63,
      popular: true,
      badgeText: 'MOST POPULAR',
      ctaText: 'Start Free 14-Day Trial',
      features: [
        'Unlimited active feedback forms',
        '25,000 response submissions / month',
        'Advanced AI sentiment analysis',
        'Team collaboration (5 seats included)',
        'Priority email & live chat support',
        'Custom branding & white-label domains',
        'Slack & MS Teams integration webhooks',
        'Automated scheduled report digests'
      ]
    },
    {
      name: 'Enterprise',
      description: 'Tailored security, custom integrations, and dedicated SLAs for large organizations.',
      monthlyPrice: 199,
      annualPrice: 159,
      popular: false,
      ctaText: 'Contact Enterprise Team',
      features: [
        'Unlimited active forms & responses',
        'Custom integrations (Salesforce, HubSpot, LMS)',
        'Dedicated account manager & 24/7 SLA support',
        'Advanced security (SOC2, SAML 2.0 SSO, Audit Logs)',
        'Custom onboarding & staff training',
        'Role-Based Access Control (RBAC)',
        'Data residency & custom retention rules'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-[#D8CCB3] bg-[#E8DFC8]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-[#D8CCB3] bg-[#FAF7F0] text-[#3B6215]">
            <Sparkles className="w-3.5 h-3.5 text-[#3B6215]" />
            <span>Transparent Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1F1F1F]">
            Simple Pricing for Growing Teams
          </h2>

          <p className="text-base sm:text-lg text-[#4B4B4B]">
            Choose the plan that fits your organization’s feedback scale. All plans include a 14-day free trial.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-[#1F1F1F]' : 'text-[#6B6B6B]'}`}>
              Billed Monthly
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-[#3B6215] p-1 transition-colors relative focus:outline-none"
              aria-label="Toggle annual pricing"
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-200 ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>

            <span className={`text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-[#1F1F1F]' : 'text-[#6B6B6B]'}`}>
              <span>Billed Annually</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#3B6215]/15 text-[#3B6215] border border-[#3B6215]/30">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 border transition-all duration-300 relative flex flex-col justify-between ${
                  plan.popular
                    ? 'bg-[#FAF7F0] border-[#3B6215] ring-1 ring-[#3B6215] shadow-md'
                    : 'bg-[#FAF7F0] border-[#D8CCB3] hover:border-[#3B6215] shadow-xs'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#3B6215] text-white font-bold text-xs tracking-wider shadow-xs">
                    {plan.badgeText}
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-[#1F1F1F]">
                    {plan.name}
                  </h3>
                  <p className="text-xs mt-2 min-h-[36px] text-[#6B6B6B]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="my-6">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#1F1F1F]">
                      ${price}
                    </span>
                    <span className="text-sm font-medium ml-1 text-[#6B6B6B]">/ month</span>
                    {isAnnual && (
                      <div className="text-[11px] text-[#3B6215] font-semibold mt-1">
                        Billed annually (${price * 12}/yr)
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => onOpenTrial('trial')}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 mb-8 ${
                      plan.popular
                        ? 'bg-[#3B6215] hover:bg-[#2F5010] text-white shadow-olive-soft'
                        : 'bg-[#E8DFC8] hover:bg-[#D8CCB3] text-[#3B6215] border border-[#3B6215]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Features List */}
                  <div className="space-y-3 pt-4 border-t border-[#D8CCB3]">
                    <span className="text-xs font-bold uppercase tracking-wider block mb-2 text-[#6B6B6B]">
                      Included Capabilities:
                    </span>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                        <Check className="w-4 h-4 text-[#3B6215] flex-shrink-0 mt-0.5" />
                        <span className="text-[#1F1F1F]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#D8CCB3] text-[11px] text-center flex items-center justify-center gap-1 text-[#6B6B6B]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3B6215]" />
                  <span>14-day risk-free trial • No card needed</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
