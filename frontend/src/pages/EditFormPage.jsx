import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import QuestionBuilder from '../components/QuestionBuilder';
import FormPreview from '../components/FormPreview';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';

import { 
  ArrowLeft, 
  Save, 
  Send, 
  FileText, 
  AlertCircle, 
  Eye 
} from 'lucide-react';

export default function EditFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Draft');
  const [questions, setQuestions] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [activeTab, setActiveTab] = useState('builder');

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`/forms/${id}`);
        if (res.data.success) {
          const data = res.data.data;
          setTitle(data.title);
          setDescription(data.description || '');
          setStatus(data.status || 'Draft');
          setQuestions(data.questions || []);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching form for edit:', err);
        setError('Unable to load form for editing.');
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleUpdate = async (targetStatus = status) => {
    setFormError('');

    if (!title.trim()) {
      setFormError('Please enter a form title.');
      return;
    }

    if (targetStatus === 'Published' && questions.length === 0) {
      setFormError('Cannot publish a form without at least one question.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await API.put(`/forms/${id}`, {
        title,
        description,
        status: targetStatus,
        questions
      });

      setIsSubmitting(false);
      if (res.data.success) {
        navigate('/forms', { replace: true });
      }
    } catch (err) {
      setIsSubmitting(false);
      setFormError(err.response?.data?.message || 'Failed to update form.');
    }
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorState message={error} onRetry={() => navigate('/forms')} />;

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#D8CCB3]">
        <div className="flex items-center gap-3">
          <Link
            to="/forms"
            className="p-2.5 rounded-xl border border-[#D8CCB3] bg-[#FAF7F0] text-[#3B6215] hover:bg-[#E8DFC8] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1F1F1F] tracking-tight">
              Edit Feedback Form
            </h1>
            <p className="text-xs text-[#6B6B6B]">
              Form ID: #{id} • Currently: <span className="font-bold text-[#3B6215]">{status}</span>
            </p>
          </div>
        </div>

        {/* Action Button Group */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleUpdate('Draft')}
            className="px-5 py-2.5 rounded-xl border border-[#3B6215] bg-[#E8DFC8] text-[#3B6215] font-bold text-xs hover:bg-[#D8CCB3] flex items-center gap-2 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleUpdate('Published')}
            className="px-6 py-2.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-xs shadow-olive-soft flex items-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* Error Announcement */}
      {formError && (
        <div className="p-4 rounded-2xl bg-[#E8DFC8]/70 border border-[#3B6215]/30 flex items-center gap-3 text-xs font-semibold text-[#1F1F1F] animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-[#3B6215] shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Mode Switcher */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center p-1 rounded-2xl border border-[#D8CCB3] bg-[#E8DFC8]">
          <button
            type="button"
            onClick={() => setActiveTab('builder')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'builder'
                ? 'bg-[#3B6215] text-white shadow-xs'
                : 'text-[#4B4B4B] hover:text-[#3B6215]'
            }`}
          >
            Questions Builder
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'preview'
                ? 'bg-[#3B6215] text-white shadow-xs'
                : 'text-[#4B4B4B] hover:text-[#3B6215]'
            }`}
          >
            Live Preview
          </button>
        </div>
      </div>

      {/* Builder Content Split View */}
      {activeTab === 'builder' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Basic Info */}
            <div className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-4 shadow-sm">
              <h2 className="text-base font-bold text-[#1F1F1F] flex items-center gap-2 border-b border-[#D8CCB3] pb-3">
                <FileText className="w-5 h-5 text-[#3B6215]" />
                <span>1. Basic Form Information</span>
              </h2>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">
                    Form Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Form Title"
                    className="w-full px-4 py-3 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-sm text-[#1F1F1F] font-bold focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]">
                    Form Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Form Description"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-sm text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
                  />
                </div>
              </div>
            </div>

            {/* Questions Builder */}
            <div className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-4 shadow-sm">
              <QuestionBuilder
                questions={questions}
                onChange={setQuestions}
              />
            </div>

          </div>

          <div className="lg:col-span-5">
            <FormPreview
              title={title}
              description={description}
              questions={questions}
            />
          </div>

        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <FormPreview
            title={title}
            description={description}
            questions={questions}
          />
        </div>
      )}

    </div>
  );
}
