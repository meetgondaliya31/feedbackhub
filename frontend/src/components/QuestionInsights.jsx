import React from 'react';
import { HelpCircle, Star, BarChart2, MessageSquareText } from 'lucide-react';

export default function QuestionInsights() {
  const insightsData = [
    {
      type: 'rating',
      question: 'How satisfied are you with overall product usability?',
      avgScore: '4.8 / 5.0',
      totalResponses: 113,
      distribution: [
        { label: '5 Stars', pct: 82 },
        { label: '4 Stars', pct: 14 },
        { label: '3 Stars', pct: 4 },
      ]
    },
    {
      type: 'choice',
      question: 'Which feature provided the most value for your team?',
      avgScore: 'Single Select',
      totalResponses: 113,
      distribution: [
        { label: 'Analytics Dashboard', pct: 58 },
        { label: 'Custom Forms Builder', pct: 28 },
        { label: 'Real-time Inbox', pct: 14 },
      ]
    },
    {
      type: 'text',
      question: 'What improvements would you suggest?',
      avgScore: 'Text Submissions',
      totalResponses: 45,
      comments: [
        '"The new analytics UI is lightning fast and very intuitive."',
        '"Anonymous submission option gave our students full confidence to share genuine insights."',
        '"Support ticket resolution speed was fast and helpful."'
      ]
    }
  ];

  return (
    <div className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#D8CCB3]">
        <div>
          <h3 className="text-base font-bold text-[#1F1F1F] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#3B6215]" />
            <span>Question Insights & Analytical Breakdown</span>
          </h3>
          <p className="text-xs text-[#6B6B6B]">Per-question response breakdown and option frequencies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {insightsData.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-[#D8CCB3] bg-[#F4EEE3] space-y-4 shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3B6215]">
                {item.avgScore} • {item.totalResponses} Responses
              </span>
              <h4 className="text-sm font-bold text-[#1F1F1F] line-clamp-2">{item.question}</h4>
            </div>

            {item.distribution && (
              <div className="space-y-2 pt-2 border-t border-[#D8CCB3]">
                {item.distribution.map((d, dIdx) => (
                  <div key={dIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#4B4B4B]">
                      <span>{d.label}</span>
                      <span className="font-mono text-[#3B6215]">{d.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden bg-[#D8CCB3]">
                      <div className="bg-[#3B6215] h-full rounded-full" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {item.comments && (
              <div className="space-y-2 pt-2 border-t border-[#D8CCB3]">
                {item.comments.map((c, cIdx) => (
                  <p key={cIdx} className="text-xs italic text-[#4B4B4B] line-clamp-2">
                    {c}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
