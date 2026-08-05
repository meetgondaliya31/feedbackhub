import React, { useState } from 'react';
import { Star, Send, Eye, Sparkles } from 'lucide-react';

export default function FormPreview({ title, description, questions = [] }) {
  const [answers, setAnswers] = useState({});

  const handleRatingClick = (qId, val) => {
    setAnswers({ ...answers, [qId]: val });
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-6 shadow-md relative">
      
      {/* Top Preview Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-[#D8CCB3]">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#3B6215]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#3B6215]">
            Live Respondent Preview
          </span>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#3B6215]/15 text-[#3B6215] border border-[#3B6215]/30 font-semibold">
          Interactive Mode
        </span>
      </div>

      {/* Form Title & Description */}
      <div className="space-y-2 border-b border-[#D8CCB3] pb-4">
        <h2 className="text-2xl font-extrabold text-[#1F1F1F]">
          {title || 'Untitled Feedback Form'}
        </h2>
        {description && (
          <p className="text-sm text-[#4B4B4B] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Questions Preview List */}
      {questions.length === 0 ? (
        <div className="py-8 text-center text-xs text-[#6B6B6B] italic">
          Questions will appear here in real-time as you build them.
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id || idx} className="space-y-2.5 p-4 rounded-2xl border border-[#D8CCB3] bg-[#F4EEE3]/60">
              <label className="block text-sm font-bold text-[#1F1F1F]">
                {idx + 1}. {q.questionText || 'Question prompt placeholder'}
                {q.isRequired && <span className="text-[#3B6215] ml-1">*</span>}
              </label>

              {/* Short Text */}
              {q.questionType === 'short_text' && (
                <input
                  type="text"
                  placeholder="Your answer..."
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#FAF7F0] text-sm text-[#1F1F1F] placeholder-[#6B6B6B]"
                />
              )}

              {/* Long Text */}
              {q.questionType === 'long_text' && (
                <textarea
                  rows={3}
                  placeholder="Share detailed comments..."
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#FAF7F0] text-sm text-[#1F1F1F] placeholder-[#6B6B6B]"
                />
              )}

              {/* Rating (1-5) */}
              {q.questionType === 'rating' && (
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(q.id || idx, star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (answers[q.id || idx] || 5)
                            ? 'text-[#3B6215] fill-[#3B6215]'
                            : 'text-[#D8CCB3]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Single Choice */}
              {q.questionType === 'single_choice' && (
                <div className="space-y-2 pt-1">
                  {(q.options || ['Option 1', 'Option 2']).map((opt, oIdx) => (
                    <label key={oIdx} className="flex items-center gap-2.5 text-xs font-medium text-[#1F1F1F] cursor-pointer">
                      <input
                        type="radio"
                        name={`preview_radio_${q.id || idx}`}
                        className="text-[#3B6215] focus:ring-[#3B6215]"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Multiple Choice */}
              {q.questionType === 'multiple_choice' && (
                <div className="space-y-2 pt-1">
                  {(q.options || ['Option 1', 'Option 2']).map((opt, oIdx) => (
                    <label key={oIdx} className="flex items-center gap-2.5 text-xs font-medium text-[#1F1F1F] cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded text-[#3B6215] focus:ring-[#3B6215]"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      )}

      {/* Submit Button Preview */}
      <div className="pt-4 border-t border-[#D8CCB3]">
        <button
          type="button"
          disabled
          className="w-full py-3.5 rounded-xl bg-[#3B6215] text-white font-bold text-sm shadow-olive-soft flex items-center justify-center gap-2 opacity-90"
        >
          <span>Submit Response (Preview)</span>
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
