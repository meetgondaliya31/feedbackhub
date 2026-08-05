import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Bell, ShieldCheck, CheckCircle2, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || 'John Doe');
  const [email, setEmail] = useState(user?.email || 'john@feedbackhub.io');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] tracking-tight">
          Account & Workspace Settings
        </h1>
        <p className="text-sm text-[#4B4B4B]">
          Manage your personal profile, workspace details, and notification preferences.
        </p>
      </div>

      {/* Settings Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] shadow-sm space-y-6">
        
        <div className="pb-4 border-b border-[#D8CCB3]">
          <h2 className="text-lg font-bold text-[#1F1F1F] flex items-center gap-2">
            <User className="w-5 h-5 text-[#3B6215]" />
            <span>Profile Details</span>
          </h2>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-sm text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-sm text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#D8CCB3] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
              <ShieldCheck className="w-4 h-4 text-[#3B6215]" />
              <span>SOC2 Compliant Profile Management</span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-xs shadow-olive-soft flex items-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

          {saved && (
            <div className="p-3 rounded-xl bg-[#E8DFC8] border border-[#3B6215]/30 text-xs font-bold text-[#3B6215] flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>Account settings saved successfully!</span>
            </div>
          )}
        </form>

      </div>

    </div>
  );
}
