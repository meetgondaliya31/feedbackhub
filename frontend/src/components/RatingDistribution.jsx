import React from 'react';
import { Star } from 'lucide-react';

export default function RatingDistribution({ distribution = [] }) {
  if (!distribution || distribution.length === 0) return null;

  return (
    <div className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#D8CCB3]">
        <h3 className="text-base font-bold text-[#1F1F1F] flex items-center gap-2">
          <Star className="w-4 h-4 text-[#3B6215] fill-[#3B6215]" />
          <span>Rating Distribution</span>
        </h3>
        <span className="text-xs font-semibold text-[#6B6B6B]">All Submissions</span>
      </div>

      <div className="space-y-3 pt-1">
        {distribution.map((item) => (
          <div key={item.star} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#4B4B4B]">
              <span className="flex items-center gap-1.5 text-[#1F1F1F]">
                <span>{item.star} Star{item.star > 1 ? 's' : ''}</span>
                <Star className="w-3.5 h-3.5 text-[#3B6215] fill-[#3B6215]" />
              </span>
              <span className="font-mono text-[#6B6B6B]">
                {item.count} ({item.percentage}%)
              </span>
            </div>
            
            <div className="h-2.5 rounded-full overflow-hidden bg-[#D8CCB3]">
              <div 
                className="bg-[#3B6215] h-full rounded-full transition-all duration-500" 
                style={{ width: `${item.percentage}%` }} 
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-center text-[11px] text-[#6B6B6B] font-medium border-t border-[#D8CCB3]">
        Based on 148 aggregate CSAT responses
      </div>
    </div>
  );
}
