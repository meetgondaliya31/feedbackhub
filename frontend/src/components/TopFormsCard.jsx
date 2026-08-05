import React from 'react';
import { Sparkles, MessageSquare, Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopFormsCard({ forms = [] }) {
  if (!forms || forms.length === 0) return null;

  return (
    <div className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#D8CCB3]">
        <h3 className="text-base font-bold text-[#1F1F1F] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#3B6215]" />
          <span>Top Performing Forms</span>
        </h3>
        <Link to="/forms" className="text-xs font-bold text-[#3B6215] hover:underline">
          View All Forms →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {forms.map((form) => (
          <div key={form.id} className="p-4 rounded-2xl border border-[#D8CCB3] bg-[#F4EEE3] space-y-3 hover:border-[#3B6215] transition-all">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-[#1F1F1F] line-clamp-1">{form.title}</h4>
                <span className="text-[11px] font-semibold text-[#3B6215]">{form.category || 'Feedback'}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3B6215]/15 text-[#3B6215] border border-[#3B6215]/30 font-bold shrink-0">
                {form.growth || '+20%'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#D8CCB3]">
              <div className="flex items-center gap-1 font-bold text-[#1F1F1F]">
                <MessageSquare className="w-3.5 h-3.5 text-[#3B6215]" />
                <span>{form.responseCount} responses</span>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#3B6215]">
                <Star className="w-3.5 h-3.5 fill-[#3B6215] text-[#3B6215]" />
                <span>{form.avgRating} / 5.0</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
