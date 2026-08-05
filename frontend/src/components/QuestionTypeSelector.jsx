import React from 'react';
import { Type, AlignLeft, Star, CheckSquare, ListFilter } from 'lucide-react';

export default function QuestionTypeSelector({ value, onChange }) {
  const types = [
    { id: 'short_text', name: 'Short Text', icon: Type },
    { id: 'long_text', name: 'Long Text', icon: AlignLeft },
    { id: 'rating', name: 'Rating (1–5)', icon: Star },
    { id: 'single_choice', name: 'Single Choice', icon: ListFilter },
    { id: 'multiple_choice', name: 'Multiple Choice', icon: CheckSquare },
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-sm text-[#1F1F1F] font-semibold focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
    >
      {types.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
