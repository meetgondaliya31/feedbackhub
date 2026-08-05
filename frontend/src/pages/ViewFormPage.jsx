import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import FormStatusBadge from '../components/FormStatusBadge';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';

import { 
  ArrowLeft, 
  Edit3, 
  Copy, 
  Share2, 
  Inbox, 
  FileText, 
  CheckCircle2, 
  Star, 
  Sparkles 
} from 'lucide-react';

export default function ViewFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`/forms/${id}`);
        if (res.data.success) {
          setForm(res.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching form details:', err);
        setError('Unable to load form details.');
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard?.writeText(`https://feedbackhub.io/f/${id}`);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) return <SkeletonLoader />;
  if (error || !form) return <ErrorState message={error || 'Form not found'} onRetry={() => navigate('/forms')} />;

  const shareUrl = `https://feedbackhub.io/f/${form.id}`;

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#D8CCB3]">
        <div className="flex items-center gap-3">
          <Link
            to="/forms"
            className="p-2.5 rounded-xl border border-[#D8CCB3] bg-[#FAF7F0] text-[#3B6215] hover:bg-[#E8DFC8] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#1F1F1F] tracking-tight">{form.title}</h1>
              <FormStatusBadge status={form.status} />
            </div>
            <p className="text-xs text-[#6B6B6B]">
              Form ID: #{form.id} • Created {new Date(form.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/forms/${form.id}/edit`}
            className="px-4 py-2.5 rounded-xl border border-[#3B6215] bg-[#E8DFC8] text-[#3B6215] font-bold text-xs hover:bg-[#D8CCB3] flex items-center gap-2 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Form</span>
          </Link>

          <Link
            to="/feedbacks"
            className="px-5 py-2.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-xs shadow-olive-soft flex items-center gap-2 transition-all"
          >
            <Inbox className="w-4 h-4" />
            <span>View Responses ({form.responsesCount})</span>
          </Link>
        </div>
      </div>

      {/* Share Link Banner */}
      <div className="p-6 rounded-3xl border border-[#D8CCB3] bg-[#E8DFC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#3B6215]">
            <Share2 className="w-4 h-4 text-[#3B6215]" />
            <span>Shareable Public Form URL</span>
          </div>
          <p className="text-xs text-[#4B4B4B]">
            Distribute this shortlink via email, QR code, or embed widget on your platform.
          </p>
          <div className="font-mono text-xs font-bold text-[#1F1F1F] pt-1">{shareUrl}</div>
        </div>

        <button
          onClick={handleCopyLink}
          className="px-5 py-3 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-xs shadow-olive-soft flex items-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
        </button>
      </div>

      {/* Form Details & Questions List */}
      <div className="p-6 sm:p-8 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-6 shadow-sm">
        
        {/* Basic Metadata */}
        <div className="space-y-2 border-b border-[#D8CCB3] pb-4">
          <h2 className="text-xl font-bold text-[#1F1F1F]">Form Overview</h2>
          {form.description ? (
            <p className="text-sm text-[#4B4B4B]">{form.description}</p>
          ) : (
            <p className="text-xs text-[#6B6B6B] italic">No description provided for this form.</p>
          )}
        </div>

        {/* Questions Breakdown */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#6B6B6B]">
            Questions Included ({form.questions ? form.questions.length : 0}):
          </h3>

          {!form.questions || form.questions.length === 0 ? (
            <div className="p-4 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-xs text-[#6B6B6B] italic">
              No questions found in this form.
            </div>
          ) : (
            <div className="space-y-3">
              {form.questions.map((q, idx) => (
                <div key={q.id || idx} className="p-4 rounded-2xl border border-[#D8CCB3] bg-[#F4EEE3] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1F1F1F]">
                      {idx + 1}. {q.questionText}
                      {q.isRequired && <span className="text-[#3B6215] ml-1">*</span>}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#3B6215]/15 text-[#3B6215] border border-[#3B6215]/30 font-semibold uppercase">
                      {q.questionType}
                    </span>
                  </div>

                  {q.options && q.options.length > 0 && (
                    <div className="text-xs text-[#6B6B6B] pt-1">
                      Options: {Array.isArray(q.options) ? q.options.join(', ') : q.options}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
