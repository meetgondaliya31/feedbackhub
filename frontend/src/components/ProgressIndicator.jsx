import React from 'react';

export default function ProgressIndicator({ completed = 0, total = 1 }) {
  const percentage = Math.min(Math.round((completed / total) * 100), 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-[#4B4B4B]">
        <span className="text-[#3B6215]">
          {completed} of {total} Questions Completed
        </span>
        <span className="font-mono text-[#6B6B6B]">{percentage}%</span>
      </div>

      <div className="h-2 rounded-full overflow-hidden bg-[#D8CCB3]">
        <div 
          className="bg-[#3B6215] h-full rounded-full transition-all duration-300 shadow-xs" 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
}
