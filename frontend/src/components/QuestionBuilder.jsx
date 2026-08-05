import React from 'react';
import QuestionCard from './QuestionCard';
import { Plus, HelpCircle } from 'lucide-react';

export default function QuestionBuilder({ questions = [], onChange }) {
  
  const handleAddQuestion = () => {
    const newQ = {
      id: 'temp_' + Date.now() + Math.random().toString(36).substring(2, 6),
      questionText: '',
      questionType: 'short_text',
      isRequired: false,
      options: []
    };
    onChange([...questions, newQ]);
  };

  const handleUpdateQuestion = (index, updatedQuestion) => {
    const updated = [...questions];
    updated[index] = updatedQuestion;
    onChange(updated);
  };

  const handleRemoveQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...questions];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  const handleMoveDown = (index) => {
    if (index === questions.length - 1) return;
    const updated = [...questions];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1F1F1F] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#3B6215]" />
            <span>Form Questions Builder</span>
          </h2>
          <p className="text-xs text-[#6B6B6B]">Add and customize questions for your survey respondents</p>
        </div>

        <button
          type="button"
          onClick={handleAddQuestion}
          className="px-4 py-2.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-xs shadow-olive-soft flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Question</span>
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="p-8 rounded-2xl border-2 border-dashed border-[#D8CCB3] bg-[#FAF7F0] text-center space-y-3">
          <p className="text-sm font-semibold text-[#4B4B4B]">No questions added yet.</p>
          <button
            type="button"
            onClick={handleAddQuestion}
            className="px-4 py-2 rounded-xl border border-[#3B6215] bg-[#E8DFC8] text-[#3B6215] font-bold text-xs hover:bg-[#D8CCB3] inline-flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Question</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, index) => (
            <QuestionCard
              key={q.id || index}
              question={q}
              index={index}
              totalQuestions={questions.length}
              onUpdate={(updated) => handleUpdateQuestion(index, updated)}
              onRemove={() => handleRemoveQuestion(index)}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
            />
          ))}
        </div>
      )}

    </div>
  );
}
