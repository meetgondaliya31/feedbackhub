import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import EmptyState from './EmptyState';

export default function RecentFeedbackTable({ responses = [], onNavigateForms }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  if (!responses || responses.length === 0) {
    return (
      <EmptyState
        title="No feedback responses yet."
        message="Create your first feedback form to start collecting responses from customers or students."
        actionText="Create Feedback Form"
        onAction={onNavigateForms}
      />
    );
  }

  const totalPages = Math.ceil(responses.length / itemsPerPage);
  const paginatedItems = responses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-4 shadow-sm">
      
      {/* Table Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#D8CCB3]">
        <div>
          <h3 className="text-base font-bold text-[#1F1F1F] flex items-center gap-2">
            <Inbox className="w-4 h-4 text-[#3B6215]" />
            <span>Recent Feedback Activity</span>
          </h3>
          <p className="text-xs text-[#6B6B6B]">Latest submissions received across your published forms</p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#3B6215]/15 text-[#3B6215] border border-[#3B6215]/30">
          Real-time Feed
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-[#1F1F1F]">
          <thead className="bg-[#E8DFC8] border-b border-[#D8CCB3] text-[11px] uppercase tracking-wider text-[#4B4B4B] font-extrabold">
            <tr>
              <th className="py-3 px-4 rounded-l-xl">Form Name</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Submitted By</th>
              <th className="py-3 px-4 text-right rounded-r-xl">Submission Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8CCB3]">
            {paginatedItems.map((item, idx) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <tr key={item.id || idx} className="hover:bg-[#F4EEE3]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#1F1F1F]">
                    {item.formTitle || item.title || 'Q3 Customer CSAT Survey'}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#3B6215] text-[#3B6215]" />
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#4B4B4B]">
                    {item.submittedBy || 'Anonymous Participant'}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-xs text-[#6B6B6B]">
                    {formattedDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-3 border-t border-[#D8CCB3] text-xs font-semibold text-[#4B4B4B]">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
