import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ErrorState({ 
  message = "Failed to load dashboard metrics. Please check your network connection.", 
  onRetry 
}) {
  return (
    <div className="p-8 rounded-3xl border border-[#3B6215]/30 bg-[#E8DFC8]/60 text-center space-y-4 shadow-sm my-6">
      <div className="w-12 h-12 rounded-2xl bg-[#3B6215]/20 text-[#3B6215] flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="space-y-1 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-[#1F1F1F]">Unable to load dashboard data</h3>
        <p className="text-xs text-[#4B4B4B]">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-xs shadow-xs inline-flex items-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry Loading Dashboard</span>
        </button>
      )}
    </div>
  );
}
