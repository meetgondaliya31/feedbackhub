import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function RatingSelector({ value = 5, onChange }) {
  const [hovered, setHovered] = useState(null);

  const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const activeRating = hovered !== null ? hovered : value;

  return (
    <div className="space-y-2 py-1">
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
            aria-label={`Rate ${star} out of 5 stars`}
          >
            <Star
              className={`w-8 h-8 ${
                star <= activeRating
                  ? 'text-[#3B6215] fill-[#3B6215]'
                  : 'text-[#D8CCB3]'
              }`}
            />
          </button>
        ))}
      </div>

      <div className="text-xs font-bold text-[#3B6215]">
        {activeRating ? `${activeRating} Star${activeRating > 1 ? 's' : ''} — ${ratingLabels[activeRating - 1]}` : 'Select a rating'}
      </div>
    </div>
  );
}
