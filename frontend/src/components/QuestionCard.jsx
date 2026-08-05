import React from 'react';
import QuestionTypeSelector from './QuestionTypeSelector';
import { Trash2, ArrowUp, ArrowDown, Plus, X, GripVertical } from 'lucide-react';

export default function QuestionCard({ 
  question, 
  index, 
  totalQuestions, 
  onUpdate, 
  onRemove, 
  onMoveUp, 
  onMoveDown 
}) {
  const handleTextChange = (text) => {
    onUpdate({ ...question, questionText: text });
  };

  const handleTypeChange = (type) => {
    const updated = { ...question, questionType: type };
    if ((type === 'single_choice' || type === 'multiple_choice') && (!updated.options || updated.options.length === 0)) {
      updated.options = ['Option 1', 'Option 2'];
    }
    onUpdate(updated);
  };

  const handleRequiredChange = (req) => {
    onUpdate({ ...question, isRequired: req });
  };

  const handleAddOption = () => {
    const currentOpts = question.options || [];
    onUpdate({
      ...question,
      options: [...currentOpts, `Option ${currentOpts.length + 1}`]
    });
  };

  const handleOptionChange = (optIdx, val) => {
    const currentOpts = [...(question.options || [])];
    currentOpts[optIdx] = val;
    onUpdate({ ...question, options: currentOpts });
  };

  const handleRemoveOption = (optIdx) => {
    const currentOpts = (question.options || []).filter((_, i) => i !== optIdx);
    onUpdate({ ...question, options: currentOpts });
  };

  const isChoiceType = question.questionType === 'single_choice' || question.questionType === 'multiple_choice';

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-4 shadow-xs hover:border-[#3B6215] transition-all">
      
      {/* Header controls */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#D8CCB3]">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-[#6B6B6B]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#3B6215]">
            Question {index + 1}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1.5 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] disabled:opacity-30"
            title="Move Question Up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === totalQuestions - 1}
            className="p-1.5 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] disabled:opacity-30"
            title="Move Question Down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] hover:bg-red-100 transition-colors ml-2"
            title="Delete Question"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Question Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 space-y-1">
          <label className="block text-xs font-semibold text-[#4B4B4B]">
            Question Title / Prompt
          </label>
          <input
            type="text"
            required
            value={question.questionText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="e.g. How likely are you to recommend our product?"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-sm text-[#1F1F1F] font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
          />
        </div>

        <div className="md:col-span-4 space-y-1">
          <label className="block text-xs font-semibold text-[#4B4B4B]">
            Question Type
          </label>
          <QuestionTypeSelector
            value={question.questionType}
            onChange={handleTypeChange}
          />
        </div>
      </div>

      {/* Choice Options Editor */}
      {isChoiceType && (
        <div className="p-4 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]/50 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">
            Options List ({question.questionType === 'single_choice' ? 'Single Select' : 'Multiple Select'})
          </label>

          <div className="space-y-2">
            {(question.options || []).map((opt, optIdx) => (
              <div key={optIdx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-[#D8CCB3] bg-[#FAF7F0] text-xs font-medium text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(optIdx)}
                  className="p-1.5 rounded-lg text-[#6B6B6B] hover:text-[#3B6215]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddOption}
            className="px-3 py-1.5 rounded-lg border border-[#3B6215] bg-[#FAF7F0] text-xs font-bold text-[#3B6215] hover:bg-[#E8DFC8] inline-flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Option</span>
          </button>
        </div>
      )}

      {/* Required Checkbox Toggle */}
      <div className="pt-2 border-t border-[#D8CCB3] flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-[#4B4B4B]">
          <input
            type="checkbox"
            checked={question.isRequired}
            onChange={(e) => handleRequiredChange(e.target.checked)}
            className="rounded text-[#3B6215] focus:ring-[#3B6215]"
          />
          <span>Mark as Required Question</span>
        </label>

        <span className="text-[11px] text-[#6B6B6B] font-mono">
          Type: {question.questionType}
        </span>
      </div>

    </div>
  );
}
