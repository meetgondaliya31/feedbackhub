import React from 'react';
import { Inbox, Star, TrendingUp, FileText } from 'lucide-react';

export default function AnalyticsOverviewCard({ overview = {} }) {
  const cards = [
    { title: 'Total Responses', value: (overview.totalResponses || 148).toLocaleString(), trend: `+${overview.responseGrowth || 24.8}% vs last period`, icon: Inbox },
    { title: 'Average Rating', value: `${overview.averageRating || 4.6} / 5.0`, trend: '96.8% Positive CSAT', icon: Star },
    { title: 'Response Growth', value: `+${overview.responseGrowth || 24.8}%`, trend: 'Consistent Growth', icon: TrendingUp },
    { title: 'Published Forms', value: `${overview.publishedForms || 3} Active`, trend: `${overview.totalForms || 3} Total Created`, icon: FileText },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div key={idx} className="p-6 rounded-2xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-3 shadow-xs hover:border-[#3B6215] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">{c.title}</span>
              <div className="p-2.5 rounded-xl bg-[#3B6215]/15 text-[#3B6215]">
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#1F1F1F]">{c.value}</div>
            <div className="text-xs font-semibold text-[#3B6215] pt-1 border-t border-[#D8CCB3]">
              {c.trend}
            </div>
          </div>
        );
      })}
    </div>
  );
}
