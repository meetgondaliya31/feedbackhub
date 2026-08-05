import React, { useState } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';

export default function DashboardChart({ timeline = [] }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!timeline || timeline.length === 0) return null;

  const width = 700;
  const height = 220;
  const padding = 30;

  const maxVal = Math.max(...timeline.map(t => t.responses), 10);
  const points = timeline.map((item, index) => {
    const x = padding + (index / (timeline.length - 1)) * (width - padding * 2);
    const y = height - padding - (item.responses / maxVal) * (height - padding * 2);
    return { x, y, date: item.date, responses: item.responses };
  });

  const pathD = points.reduce((acc, point, index) => {
    return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-4 shadow-sm">
      
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-[#D8CCB3]">
        <div>
          <h3 className="text-base font-bold text-[#1F1F1F] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#3B6215]" />
            <span>Response Overview (Last 30 Days)</span>
          </h3>
          <p className="text-xs text-[#6B6B6B]">Daily response volume submissions timeline</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#E8DFC8] border border-[#D8CCB3] text-xs font-semibold text-[#3B6215]">
          <Calendar className="w-3.5 h-3.5" />
          <span>Last 30 Days</span>
        </div>
      </div>

      {/* SVG Interactive Line Chart */}
      <div className="relative pt-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56 overflow-visible">
          <defs>
            <linearGradient id="oliveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B6215" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3B6215" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = padding + pct * (height - padding * 2);
            return (
              <line
                key={idx}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#D8CCB3"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#oliveGradient)" />

          {/* Line Path */}
          <path d={pathD} fill="none" stroke="#3B6215" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {points.map((pt, idx) => (
            <g key={idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4"
                className="fill-[#3B6215] stroke-[#FAF7F0] stroke-2 hover:r-6 transition-all cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-10 px-3 py-1.5 rounded-xl bg-[#1F1F1F] text-white text-xs font-semibold shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{ left: `${(hoveredPoint.x / width) * 100}%`, top: '20%' }}
          >
            <div>{hoveredPoint.date}</div>
            <div className="text-[#E8DFC8] font-mono">{hoveredPoint.responses} Responses</div>
          </div>
        )}
      </div>

      {/* Axis Date Labels */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B6B6B] pt-1">
        <span>{timeline[0]?.date}</span>
        <span>{timeline[Math.floor(timeline.length / 2)]?.date}</span>
        <span>{timeline[timeline.length - 1]?.date}</span>
      </div>

    </div>
  );
}
