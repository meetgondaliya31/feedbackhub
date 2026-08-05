import React from 'react';
import RatingSelector from './RatingSelector';
import ValidationMessage from './ValidationMessage';

export default function QuestionRenderer({ 
  question, 
  index, 
  value, 
  onChange, 
  error 
}) {
  const handleMultipleChoiceToggle = (optionText) => {
    const currentList = Array.isArray(value) ? value : [];
    if (currentList.includes(optionText)) {
      onChange(currentList.filter(item => item !== optionText));
    } else {
      onChange([...currentList, optionText]);
    }
  };

  return (
    <div className={`p-6 rounded-3xl border ${error ? 'border-[#3B6215] bg-red-50/20' : 'border-[#D8CCB3] bg-[#FAF7F0]'} space-y-3.5 shadow-sm transition-all`}>
      
      {/* Question Header */}
      <div className="space-y-1">
        <label className="block text-base font-extrabold text-[#1F1F1F]">
          {index + 1}. {question.questionText}
          {question.isRequired && <span className="text-[#3B6215] ml-1">*</span>}
        </label>
        <span className="text-[11px] text-[#6B6B6B]">
          {question.isRequired ? 'Required question' : 'Optional question'}
        </span>
      </div>

      {/* Short Text */}
      {question.questionType === 'short_text' && (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your response here..."
          className="w-full px-4 py-3 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-sm text-[#1F1F1F] font-medium placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#3B6215] transition-all"
        />
      )}

      {/* Long Text */}
      {question.questionType === 'long_text' && (
        <textarea
          rows={4}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Share your detailed feedback or comments..."
          className="w-full px-4 py-3 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-sm text-[#1F1F1F] font-medium placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#3B6215] transition-all"
        />
      )}

      {/* Rating 1-5 */}
      {question.questionType === 'rating' && (
        <RatingSelector
          value={Number(value || 5)}
          onChange={(val) => onChange(val)}
        />
      )}

      {/* Single Choice */}
      {question.questionType === 'single_choice' && (
        <div className="space-y-2.5 pt-1">
          {(question.options || []).map((optionText, optIdx) => (
            <label
              key={optIdx}
              className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                value === optionText
                  ? 'border-[#3B6215] bg-[#E8DFC8]/70 shadow-xs'
                  : 'border-[#D8CCB3] bg-[#F4EEE3] hover:bg-[#E8DFC8]/40'
              }`}
            >
              <input
                type="radio"
                name={`q_radio_${question.id}`}
                checked={value === optionText}
                onChange={() => onChange(optionText)}
                className="w-4 h-4 text-[#3B6215] focus:ring-[#3B6215]"
              />
              <span className="text-xs font-bold text-[#1F1F1F]">{optionText}</span>
            </label>
          ))}
        </div>
      )}

      {/* Multiple Choice */}
      {question.questionType === 'multiple_choice' && (
        <div className="space-y-2.5 pt-1">
          {(question.options || []).map((optionText, optIdx) => {
            const isChecked = Array.isArray(value) && value.includes(optionText);
            return (
              <label
                key={optIdx}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'border-[#3B6215] bg-[#E8DFC8]/70 shadow-xs'
                    : 'border-[#D8CCB3] bg-[#F4EEE3] hover:bg-[#E8DFC8]/40'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleMultipleChoiceToggle(optionText)}
                  className="w-4 h-4 rounded text-[#3B6215] focus:ring-[#3B6215]"
                />
                <span className="text-xs font-bold text-[#1F1F1F]">{optionText}</span>
              </label>
            );
          })}
        </div>
      )}

      {/* Inline Validation Error Message */}
      <ValidationMessage message={error} />

    </div>
  );
}
