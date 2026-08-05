import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import { Star } from 'lucide-react';

export default function RatingChart({ distribution = [] }) {
  const defaultColors = ['#3B6215', '#4E7A1C', '#5D8A2D', '#80A846', '#A3C663'];

  return (
    <div className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#D8CCB3]">
        <h3 className="text-base font-bold text-[#1F1F1F] flex items-center gap-2">
          <Star className="w-4 h-4 text-[#3B6215] fill-[#3B6215]" />
          <span>Rating Distribution</span>
        </h3>
        <span className="text-xs font-semibold text-[#6B6B6B]">5-Star CSAT</span>
      </div>

      <div className="w-full h-64 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distribution} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis type="number" stroke="#6B6B6B" fontSize={11} hide />
            <YAxis dataKey="star" type="category" stroke="#1F1F1F" fontSize={12} tickLine={false} width={65} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F1F1F',
                borderColor: '#3B6215',
                borderRadius: '12px',
                color: '#FAF7F0',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="count" radius={[0, 8, 8, 0]}>
              {distribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || defaultColors[index % defaultColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-[11px] text-[#6B6B6B] font-medium pt-1 border-t border-[#D8CCB3]">
        75.7% of respondents gave a 5-star rating
      </div>
    </div>
  );
}
