import React, { useState } from 'react';
import { MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer({ onOpenTrial }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const footerLinks = {
    Company: [
      { name: 'About', href: '#features' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#footer' },
      { name: 'Press & Media', href: '#' },
    ],
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Integrations', href: '#solutions' },
      { name: 'Changelog', href: '#' },
    ],
    Resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'API Reference', href: '#' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Security Policy', href: '#' },
      { name: 'Cookie Preferences', href: '#' },
    ]
  };

  return (
    <footer id="footer" className="border-t border-[#D8CCB3] bg-[#E8DFC8] text-[#4B4B4B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Newsletter & Brand Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#D8CCB3]">
          
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <a href="#" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#3B6215] flex items-center justify-center text-white shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-[#1F1F1F]">
                Feedback<span className="text-[#3B6215]">Hub</span>
              </span>
            </a>

            <p className="text-sm text-[#4B4B4B] leading-relaxed max-w-md">
              FeedbackHub is the enterprise feedback platform helping organizations collect customizable responses, analyze sentiment trends, and drive data-informed decisions.
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-[#3B6215]">
              <span className="flex items-center gap-1.5 text-[#3B6215]">
                <span className="w-2 h-2 rounded-full bg-[#3B6215] animate-pulse inline-block" /> All Systems Operational
              </span>
              <span>•</span>
              <span>SOC2 Certified</span>
            </div>
          </div>

          {/* Newsletter Subscription (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FAF7F0] p-6 rounded-2xl border border-[#D8CCB3] space-y-3">
            <h3 className="text-base font-bold text-[#1F1F1F]">Subscribe to Feedback Best Practices Weekly</h3>
            <p className="text-xs text-[#6B6B6B]">
              Join 15,000+ CX leaders, HR directors, and product managers receiving our weekly playbook on response rate optimization and sentiment analytics.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your work email..."
                className="px-4 py-2.5 rounded-xl bg-[#F4EEE3] border border-[#D8CCB3] text-sm text-[#1F1F1F] placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#3B6215] flex-1"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-xs"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {newsletterSubscribed && (
              <div className="text-xs text-[#3B6215] font-medium flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[#3B6215]" />
                <span>Thank you! You've been subscribed to our newsletter.</span>
              </div>
            )}
          </div>

        </div>

        {/* Link Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2.5 text-sm font-medium">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-[#3B6215] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Social & Copyright Bar */}
        <div className="pt-8 border-t border-[#D8CCB3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#6B6B6B]">
          <div>
            © {new Date().getFullYear()} FeedbackHub Inc. All rights reserved. Built with precision for feedback management.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-[#FAF7F0] border border-[#D8CCB3] text-[#3B6215] hover:bg-[#3B6215] hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-[#FAF7F0] border border-[#D8CCB3] text-[#3B6215] hover:bg-[#3B6215] hover:text-white transition-colors"
              aria-label="Twitter / X"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-[#FAF7F0] border border-[#D8CCB3] text-[#3B6215] hover:bg-[#3B6215] hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
