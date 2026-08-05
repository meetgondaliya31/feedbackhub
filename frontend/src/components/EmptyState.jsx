import React from 'react';
import { Inbox, Plus } from 'lucide-react';

export default function EmptyState({ 
  title = "No feedback responses yet.", 
  message = "Create your first feedback form to start collecting responses.", 
  actionText = "Create Feedback Form",
  onAction 
}) {
  return (
    <div className="p-10 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] text-center space-y-4 shadow-sm my-4">
      <div className="w-16 h-16 rounded-full bg-[#3B6215]/15 text-[#3B6215] flex items-center justify-center mx-auto border border-[#3B6215]/30">
        <Inbox className="w-8 h-8" />
      </div>

      <div className="space-y-1 max-w-md mx-auto">
        <h3 className="text-xl font-extrabold text-[#1F1F1F]">{title}</h3>
        <p className="text-sm text-[#4B4B4B]">{message}</p>
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-sm shadow-olive-soft inline-flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
