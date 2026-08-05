import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function StatCard({ title, value, trend, icon: Icon, subtitle }) {
  return (
    <div className="p-6 rounded-2xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-3 shadow-xs hover:border-[#3B6215] transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
          {title}
        </span>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-[#3B6215]/15 text-[#3B6215]">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="text-3xl font-extrabold text-[#1F1F1F]">
        {value}
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#D8CCB3]">
        {trend && (
          <span className="font-semibold text-[#3B6215] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{trend}</span>
          </span>
        )}
        {subtitle && (
          <span className="text-[#6B6B6B] font-medium">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
