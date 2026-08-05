import React, { useState } from 'react';
import { Star, Send, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';

export default function LiveDemoWidget() {
  const [rating, setRating] = useState(5);
  const [feedbackCategory, setFeedbackCategory] = useState('Customer Support');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setComment('');
    setRating(5);
  };

  return (
    <section className="py-16 border-t border-[#D8CCB3] bg-[#E8DFC8]/40 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="rounded-3xl p-6 sm:p-10 border border-[#D8CCB3] bg-[#FAF7F0] shadow-xl relative">
          
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215]">
              <Sparkles className="w-3.5 h-3.5 text-[#3B6215]" />
              <span>Interactive Widget Sandbox</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F]">
              Test the FeedbackHub Embed Widget Live
            </h3>
            
            <p className="text-sm text-[#4B4B4B]">
              This is how your customers, students, or team members will experience feedback collection on your website.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
              
              {/* Category Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">
                  1. Select Feedback Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Customer Support', 'Product UX', 'General Review'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFeedbackCategory(cat)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        feedbackCategory === cat
                          ? 'bg-[#3B6215] border-[#2F5010] text-white shadow-xs'
                          : 'bg-[#E8DFC8]/60 border-[#D8CCB3] text-[#4B4B4B] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Star Rating Picker */}
              <div className="space-y-2 text-center">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">
                  2. Rate Your Experience
                </label>
                <div className="flex items-center justify-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'text-[#3B6215] fill-[#3B6215] drop-shadow-xs'
                            : 'text-[#D8CCB3]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#3B6215] block pt-1">
                  {rating === 5 ? '5 Stars - Outstanding!' : rating === 4 ? '4 Stars - Very Good' : '3 Stars - Satisfactory'}
                </span>
              </div>

              {/* Written Comment Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">
                  3. Share Detailed Comments (Optional)
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you liked or what we can improve..."
                  className="w-full p-3 rounded-xl text-sm border border-[#D8CCB3] bg-[#F4EEE3] text-[#1F1F1F] placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#3B6215] transition-all"
                />
              </div>

              {/* Anonymous Checkbox Toggle */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-[#4B4B4B]">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-[#3B6215] focus:ring-[#3B6215]"
                  />
                  <span>Submit as anonymous response</span>
                </label>

                <span className="text-[11px] font-mono text-[#6B6B6B]">Form ID: #FH-DEMO-2026</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-sm shadow-olive-soft flex items-center justify-center gap-2 transition-all"
              >
                <span>Submit Demo Response</span>
                <Send className="w-4 h-4" />
              </button>

            </form>
          ) : (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#3B6215]/15 text-[#3B6215] flex items-center justify-center mx-auto border border-[#3B6215]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <h4 className="text-2xl font-bold text-[#1F1F1F]">
                Response Received & Processed!
              </h4>

              <p className="text-sm text-[#4B4B4B]">
                In a live production environment, this response would instantly reflect on your FeedbackHub analytics dashboard with sentiment score <span className="text-[#3B6215] font-bold">+0.96</span>.
              </p>

              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-colors border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] hover:bg-[#D8CCB3]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Test Another Response</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
