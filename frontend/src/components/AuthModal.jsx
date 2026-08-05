import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'trial' }) {
  const [mode, setMode] = useState(initialMode);
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [teamSize, setTeamSize] = useState('10-50');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      
      <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#D8CCB3] bg-[#FAF7F0] text-[#1F1F1F] shadow-2xl transition-all">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full transition-colors text-[#6B6B6B] hover:bg-[#E8DFC8] hover:text-[#1F1F1F]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-9 rounded-xl bg-[#3B6215] flex items-center justify-center text-white shadow-xs">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-[#1F1F1F]">
              Feedback<span className="text-[#3B6215]">Hub</span>
            </span>
            <span className="text-[10px] text-[#3B6215] font-semibold uppercase tracking-wider block -mt-1">
              {mode === 'login' ? 'Account Access' : mode === 'demo' ? 'Product Demo Request' : '14-Day Free Trial'}
            </span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#1F1F1F]">
                {mode === 'login' 
                  ? 'Log in to your workspace' 
                  : mode === 'demo' 
                    ? 'Schedule a personalized demo' 
                    : 'Start your 14-day free trial'}
              </h3>
              <p className="text-xs text-[#4B4B4B]">
                {mode === 'login'
                  ? 'Enter your credentials to access your feedback dashboard.'
                  : mode === 'demo'
                    ? 'Our CX specialists will walk you through customized setup options.'
                    : 'Full access to all Professional features. No credit card required.'}
              </p>
            </div>

            {mode !== 'login' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#4B4B4B]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-[#D8CCB3] bg-[#F4EEE3] text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#4B4B4B]">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-[#D8CCB3] bg-[#F4EEE3] text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
              />
            </div>

            {mode !== 'login' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#4B4B4B]">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Company name"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-[#D8CCB3] bg-[#F4EEE3] text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#4B4B4B]">
                    Team Size
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-[#D8CCB3] bg-[#F4EEE3] text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="10-50">10-50 employees</option>
                    <option value="50-250">50-250 employees</option>
                    <option value="250+">250+ employees</option>
                  </select>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#4B4B4B]">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-[#D8CCB3] bg-[#F4EEE3] text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
                />
              </div>
            )}

            {/* Mode Switcher links */}
            <div className="text-xs flex items-center justify-between pt-1 text-[#6B6B6B]">
              {mode === 'login' ? (
                <span>Don't have an account? <button type="button" onClick={() => setMode('trial')} className="text-[#3B6215] font-semibold hover:underline">Start Trial</button></span>
              ) : (
                <span>Already registered? <button type="button" onClick={() => setMode('login')} className="text-[#3B6215] font-semibold hover:underline">Log in</button></span>
              )}
              {mode !== 'demo' && (
                <button type="button" onClick={() => setMode('demo')} className="text-[#3B6215] font-semibold hover:underline">
                  Book a demo instead
                </button>
              )}
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-sm shadow-olive-soft flex items-center justify-center gap-2 transition-all mt-4"
            >
              <span>
                {mode === 'login' ? 'Access Workspace' : mode === 'demo' ? 'Submit Demo Request' : 'Create Free Trial Account'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-[11px] flex items-center justify-center gap-1 text-[#6B6B6B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B6215]" />
              <span>AES-256 Encrypted & SOC2 Compliant Data Protection</span>
            </div>

          </form>
        ) : (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#3B6215]/15 text-[#3B6215] flex items-center justify-center mx-auto border border-[#3B6215]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-[#1F1F1F]">
              {mode === 'login' ? 'Welcome Back!' : mode === 'demo' ? 'Demo Request Confirmed!' : 'Welcome to FeedbackHub!'}
            </h3>

            <p className="text-sm text-[#4B4B4B]">
              {mode === 'login'
                ? 'Redirecting to your analytics dashboard...'
                : mode === 'demo'
                  ? 'Our product team will reach out to schedule your personalized session within 2 business hours.'
                  : `Confirmation email sent to ${workEmail}. Your 14-day trial workspace is ready.`}
            </p>

            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-semibold text-xs shadow-xs transition-colors"
            >
              Continue to Site
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
