import React from 'react';
import { ShieldCheck, User } from 'lucide-react';

export default function AnonymousToggle({ 
  isAnonymous, 
  onToggle, 
  submittedBy, 
  onSubmittedByChange 
}) {
  return (
    <div className="p-5 rounded-2xl border border-[#D8CCB3] bg-[#E8DFC8]/60 space-y-3">
      
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2.5 text-xs font-bold text-[#1F1F1F] cursor-pointer">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => onToggle(e.target.checked)}
            className="w-4 h-4 rounded border-[#D8CCB3] text-[#3B6215] focus:ring-[#3B6215]"
          />
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#3B6215]" />
            Submit response anonymously
          </span>
        </label>
        
        <span className="text-[11px] font-mono text-[#6B6B6B]">
          {isAnonymous ? 'Privacy Protected' : 'Identified Response'}
        </span>
      </div>

      {!isAnonymous && (
        <div className="pt-2 border-t border-[#D8CCB3] space-y-1.5 animate-fadeIn">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">
            Your Name / Contact Info (Optional)
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
            <input
              type="text"
              value={submittedBy}
              onChange={(e) => onSubmittedByChange(e.target.value)}
              placeholder="e.g. Alex Morgan (alex@company.com)"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#FAF7F0] text-xs font-medium text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
            />
          </div>
        </div>
      )}

    </div>
  );
}
