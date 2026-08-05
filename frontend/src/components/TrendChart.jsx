import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

export default function TrendChart({ timeline = [], activeRange = '30d', onRangeChange }) {
  const timeFilters = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' },
    { id: '12m', label: 'Last 12 Months' },
  ];

  return (
    <div className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-4 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#D8CCB3]">
        <div>
          <h3 className="text-base font-bold text-[#1F1F1F] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#3B6215]" />
            <span>Response Trend Analysis</span>
          </h3>
          <p className="text-xs text-[#6B6B6B]">Daily feedback submission volume timeline</p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]">
          {timeFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => onRangeChange && onRangeChange(f.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeRange === f.id
                  ? 'bg-[#3B6215] text-white shadow-xs'
                  : 'text-[#4B4B4B] hover:text-[#3B6215]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Line / Area Chart */}
      <div className="w-full h-64 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="oliveTrendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B6215" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3B6215" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#D8CCB3" vertical={false} />
            <XAxis dataKey="date" stroke="#6B6B6B" fontSize={11} tickLine={false} />
            <YAxis stroke="#6B6B6B" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F1F1F',
                borderColor: '#3B6215',
                borderRadius: '12px',
                color: '#FAF7F0',
                fontSize: '12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="responses"
              stroke="#3B6215"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#oliveTrendGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
