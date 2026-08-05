import React, { useState } from 'react';
import { Inbox, Star, Filter, Tag, CheckCircle2, MessageSquare, Download, Sparkles } from 'lucide-react';

export default function FeedbacksPage() {
  const [filterRating, setFilterRating] = useState('All');

  const feedbacks = [
    { id: 1, author: 'Dr. Arthur Pendelton', email: 'a.pendelton@edutopia.edu', category: 'Education', rating: 5, sentiment: '+0.96', text: 'End of semester feedback collection response rates jumped significantly. The automated summary reports saved our department hours.', date: 'Today, 10:14 AM' },
    { id: 2, author: 'Elena Rostova', email: 'elena@techflow.io', category: 'SaaS UX', rating: 5, sentiment: '+0.94', text: 'The new analytics dashboard gives our product team immediate clarity on UX friction points.', date: 'Today, 09:42 AM' },
    { id: 3, author: 'Samantha Wu', email: 'swu@luminaretail.com', category: 'HR Pulse', rating: 4, sentiment: '+0.78', text: 'Quarterly employee pulse survey insights helped us address store employee concerns early.', date: 'Yesterday, 04:15 PM' },
    { id: 4, author: 'Marcus Vance', email: 'mvance@nexatech.com', category: 'Customer Success', rating: 5, sentiment: '+0.98', text: 'Anonymous response protection gave our team maximum confidence during internal feedback reviews.', date: 'Yesterday, 02:30 PM' },
  ];

  const filteredFeedbacks = filterRating === 'All' 
    ? feedbacks 
    : feedbacks.filter(f => f.rating === Number(filterRating));

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] tracking-tight">
            Centralized Feedback Inbox
          </h1>
          <p className="text-sm text-[#4B4B4B]">
            Review incoming responses, sentiment scores, and respondent details in real-time.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting all feedback responses to CSV format...')}
          className="px-5 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] font-semibold text-sm hover:bg-[#D8CCB3] flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export All Submissions</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="p-4 rounded-2xl border border-[#D8CCB3] bg-[#FAF7F0] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#3B6215]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">Filter Rating:</span>
          <div className="flex items-center gap-1.5 ml-2">
            {['All', '5', '4', '3'].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRating(r)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filterRating === r 
                    ? 'bg-[#3B6215] text-white shadow-xs' 
                    : 'bg-[#E8DFC8]/60 text-[#4B4B4B] hover:text-[#3B6215]'
                }`}
              >
                {r === 'All' ? 'All Ratings' : `${r} Stars`}
              </button>
            ))}
          </div>
        </div>
        <span className="text-xs text-[#6B6B6B]">Showing {filteredFeedbacks.length} items</span>
      </div>

      {/* Feedbacks List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((item) => (
          <div key={item.id} className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] shadow-sm space-y-4 hover:border-[#3B6215] transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#D8CCB3] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-[#1F1F1F]">{item.author}</span>
                  <span className="text-xs font-mono text-[#6B6B6B]">({item.email})</span>
                </div>
                <span className="text-xs text-[#3B6215] font-semibold">{item.category}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#3B6215]/15 text-[#3B6215] border border-[#3B6215]/30 font-mono font-bold">
                  Score: {item.sentiment}
                </span>
                <span className="text-xs text-[#6B6B6B]">{item.date}</span>
              </div>
            </div>

            <p className="text-sm text-[#1F1F1F] italic leading-relaxed">
              "{item.text}"
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#3B6215] text-[#3B6215]" />
                ))}
              </div>

              <button className="text-xs font-bold text-[#3B6215] hover:underline">
                Reply to Respondent →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
