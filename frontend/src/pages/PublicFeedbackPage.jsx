import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import QuestionRenderer from '../components/QuestionRenderer';
import ProgressIndicator from '../components/ProgressIndicator';
import AnonymousToggle from '../components/AnonymousToggle';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';

import { 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  AlertCircle, 
  Lock 
} from 'lucide-react';

export default function PublicFeedbackPage() {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [answers, setAnswers] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submittedBy, setSubmittedBy] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchPublicForm = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`/public/forms/${formId}`);
        if (res.data.success) {
          setForm(res.data.data);
          
          // Set default values for rating questions
          const initialAnswers = {};
          (res.data.data.questions || []).forEach(q => {
            if (q.questionType === 'rating') {
              initialAnswers[q.id] = 5;
            }
          });
          setAnswers(initialAnswers);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error loading public form:', err);
        setError(err.response?.data?.message || 'Feedback form unavailable.');
        setLoading(false);
      }
    };

    fetchPublicForm();
  }, [formId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (validationErrors[questionId]) {
      setValidationErrors(prev => ({ ...prev, [questionId]: null }));
    }
  };

  // Calculate completed questions
  const questionsList = form?.questions || [];
  const completedCount = questionsList.filter(q => {
    const val = answers[q.id];
    if (val === undefined || val === null) return false;
    if (typeof val === 'string' && !val.trim()) return false;
    if (Array.isArray(val) && val.length === 0) return false;
    return true;
  }).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Client-side validation for required questions
    const errors = {};
    let hasError = false;

    questionsList.forEach(q => {
      if (q.isRequired) {
        const val = answers[q.id];
        if (val === undefined || val === null || (typeof val === 'string' && !val.trim()) || (Array.isArray(val) && val.length === 0)) {
          errors[q.id] = 'This question is required.';
          hasError = true;
        }
      }
    });

    if (hasError) {
      setValidationErrors(errors);
      setSubmitError('Please answer all required questions marked with * before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await API.post(`/public/forms/${formId}/submit`, {
        answers,
        isAnonymous,
        submittedBy: isAnonymous ? null : submittedBy
      });

      setIsSubmitting(false);
      if (res.data.success) {
        navigate(`/feedback/${formId}/success`, { state: { formTitle: form.title } });
      }
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError(err.response?.data?.message || 'Failed to submit feedback response. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4EEE3] py-12 px-4 max-w-2xl mx-auto">
        <SkeletonLoader />
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen bg-[#F4EEE3] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorState message={error || 'Feedback form unavailable.'} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EEE3] text-[#1F1F1F] font-sans selection:bg-[#3B6215] selection:text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Centered Container (Max-Width ~ 800px) */}
      <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group focus:outline-none">
            <div className="h-10 w-10 rounded-xl bg-[#3B6215] text-white flex items-center justify-center shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#1F1F1F]">
              Feedback<span className="text-[#3B6215]">Hub</span>
            </span>
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="p-4 rounded-2xl border border-[#D8CCB3] bg-[#FAF7F0] shadow-xs">
          <ProgressIndicator
            completed={completedCount}
            total={questionsList.length}
          />
        </div>

        {/* Main Form Title Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-3 shadow-md border-t-8 border-t-[#3B6215]">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] tracking-tight">
            {form.title}
          </h1>
          {form.description && (
            <p className="text-sm text-[#4B4B4B] leading-relaxed">
              {form.description}
            </p>
          )}
          <div className="text-[11px] font-medium text-[#6B6B6B] flex items-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3B6215]" />
            <span>Responses are protected and stored securely.</span>
          </div>
        </div>

        {/* Submit Error Announcement */}
        {submitError && (
          <div className="p-4 rounded-2xl bg-[#E8DFC8]/70 border border-[#3B6215]/30 flex items-center gap-3 text-xs font-semibold text-[#1F1F1F] animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-[#3B6215] shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Questions Render List */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          
          {questionsList.map((question, index) => (
            <QuestionRenderer
              key={question.id || index}
              question={question}
              index={index}
              value={answers[question.id]}
              onChange={(val) => handleAnswerChange(question.id, val)}
              error={validationErrors[question.id]}
            />
          ))}

          {/* Anonymous Toggle Option */}
          <AnonymousToggle
            isAnonymous={isAnonymous}
            onToggle={setIsAnonymous}
            submittedBy={submittedBy}
            onSubmittedByChange={setSubmittedBy}
          />

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-extrabold text-base shadow-olive-soft flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <span>Submitting Response...</span>
            ) : (
              <>
                <span>Submit Feedback Response</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </button>

        </form>

        {/* Security & Privacy Footer */}
        <div className="text-center text-[11px] text-[#6B6B6B] space-y-1">
          <p>Powered by FeedbackHub Enterprise Intelligence</p>
          <p>256-bit SSL Encryption Enabled</p>
        </div>

      </div>

    </div>
  );
}
