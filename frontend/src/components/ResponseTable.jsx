import React from 'react';
import { Star, Eye, Trash2, ShieldCheck, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from './EmptyState';

export default function ResponseTable({ 
  responses = [], 
  pagination = {}, 
  onPageChange, 
  onDelete 
}) {
  if (!responses || responses.length === 0) {
    return (
      <EmptyState
        title="No responses collected yet."
        message="Publish a form to start gathering feedback from customers, students, or team members."
      />
    );
  }

  return (
    <div className="rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] overflow-hidden shadow-sm space-y-4 p-6">
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#1F1F1F]">
          <thead className="bg-[#E8DFC8] border-b border-[#D8CCB3] text-xs uppercase tracking-wider text-[#4B4B4B] font-extrabold">
            <tr>
              <th className="py-3.5 px-4 rounded-l-xl">Form Name</th>
              <th className="py-3.5 px-4">Submitted Date</th>
              <th className="py-3.5 px-4">Anonymous</th>
              <th className="py-3.5 px-4">Rating</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8CCB3]">
            {responses.map((r) => (
              <tr key={r.id} className="hover:bg-[#F4EEE3]/60 transition-colors">
                
                {/* Form Name */}
                <td className="py-4 px-4 font-bold text-[#1F1F1F]">
                  <Link to={`/responses/${r.id}`} className="hover:text-[#3B6215] hover:underline">
                    {r.formTitle}
                  </Link>
                </td>

                {/* Submitted Date */}
                <td className="py-4 px-4 text-xs font-mono text-[#6B6B6B]">
                  {new Date(r.submittedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>

                {/* Anonymous */}
                <td className="py-4 px-4">
                  {r.isAnonymous ? (
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-[#E8DFC8] text-[#1F1F1F] font-semibold border border-[#D8CCB3]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3B6215]" /> Anonymous
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-[#3B6215]/15 text-[#3B6215] font-semibold border border-[#3B6215]/30">
                      <UserCheck className="w-3.5 h-3.5" /> Identified
                    </span>
                  )}
                </td>

                {/* Rating */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#3B6215] text-[#3B6215]" />
                    ))}
                  </div>
                </td>

                {/* Response Status */}
                <td className="py-4 px-4">
                  <span className="text-xs font-bold text-[#3B6215]">
                    {r.status || 'Completed'}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      to={`/responses/${r.id}`}
                      className="p-2 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] hover:bg-[#D8CCB3] transition-colors"
                      title="View Response Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => onDelete(r.id)}
                      className="p-2 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] hover:bg-red-100 transition-colors"
                      title="Delete Response"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-3 border-t border-[#D8CCB3] text-xs font-semibold text-[#4B4B4B]">
          <span>Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-1.5 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
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
