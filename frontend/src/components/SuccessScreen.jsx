import React from 'react';
import { CheckCircle2, RotateCcw, Home, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SuccessScreen({ onReset, formTitle }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 text-center selection:bg-[#3B6215] selection:text-white">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] shadow-2xl space-y-6 animate-fadeIn">
        
        {/* Brand Badge */}
        <div className="w-16 h-16 rounded-3xl bg-[#3B6215] text-white flex items-center justify-center mx-auto shadow-olive-soft">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] tracking-tight">
            Thank You for Your Feedback
          </h1>
          <p className="text-sm font-medium text-[#4B4B4B]">
            Your response has been successfully submitted to <span className="font-bold text-[#1F1F1F]">"{formTitle || 'the survey team'}"</span>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#E8DFC8]/60 border border-[#D8CCB3] text-xs text-[#6B6B6B] leading-relaxed">
          Your feedback helps drive continuous growth, improvement, and thoughtful decision-making.
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {onReset && (
            <button
              onClick={onReset}
              className="w-full py-3 rounded-xl border border-[#3B6215] bg-[#E8DFC8] text-[#3B6215] font-bold text-xs hover:bg-[#D8CCB3] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Submit Another Response</span>
            </button>
          )}

          <button
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-xs shadow-olive-soft flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>
        </div>

      </div>
    </div>
  );
}
