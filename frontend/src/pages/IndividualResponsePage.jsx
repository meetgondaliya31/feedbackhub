import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';

import { 
  ArrowLeft, 
  ShieldCheck, 
  UserCheck, 
  Calendar, 
  Star, 
  FileText, 
  Trash2 
} from 'lucide-react';

export default function IndividualResponsePage() {
  const { responseId } = useParams();
  const navigate = useNavigate();

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponse = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get(`/responses/${responseId}`);
        if (res.data.success) {
          setResponse(res.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching response:', err);
        setError('Unable to load response details.');
        setLoading(false);
      }
    };

    fetchResponse();
  }, [responseId]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this response record?')) return;
    try {
      const res = await API.delete(`/responses/${responseId}`);
      if (res.data.success) {
        navigate('/responses', { replace: true });
      }
    } catch (err) {
      alert('Failed to delete response.');
    }
  };

  if (loading) return <SkeletonLoader />;
  if (error || !response) return <ErrorState message={error || 'Response record not found'} onRetry={() => navigate('/responses')} />;

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#D8CCB3]">
        <div className="flex items-center gap-3">
          <Link
            to="/responses"
            className="p-2.5 rounded-xl border border-[#D8CCB3] bg-[#FAF7F0] text-[#3B6215] hover:bg-[#E8DFC8] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1F1F1F] tracking-tight">
              Feedback Submission Record
            </h1>
            <p className="text-xs text-[#6B6B6B]">
              ID: #{response.id}
            </p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="px-4 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] font-bold text-xs hover:bg-red-100 hover:text-red-700 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Record</span>
        </button>
      </div>

      {/* Response Information Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-[#1F1F1F] flex items-center gap-2 border-b border-[#D8CCB3] pb-3">
          <FileText className="w-5 h-5 text-[#3B6215]" />
          <span>Submission Information</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-[#1F1F1F]">
          
          <div className="p-3.5 rounded-2xl border border-[#D8CCB3] bg-[#F4EEE3] space-y-1">
            <span className="text-[11px] text-[#6B6B6B] font-bold uppercase tracking-wider block">Form Title</span>
            <div className="font-bold text-sm text-[#1F1F1F] truncate">{response.formTitle}</div>
          </div>

          <div className="p-3.5 rounded-2xl border border-[#D8CCB3] bg-[#F4EEE3] space-y-1">
            <span className="text-[11px] text-[#6B6B6B] font-bold uppercase tracking-wider block">Submission Date</span>
            <div className="font-mono text-xs text-[#1F1F1F]">
              {new Date(response.submittedAt).toLocaleString()}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border border-[#D8CCB3] bg-[#F4EEE3] space-y-1">
            <span className="text-[11px] text-[#6B6B6B] font-bold uppercase tracking-wider block">Respondent Identity</span>
            <div>
              {response.isAnonymous ? (
                <span className="inline-flex items-center gap-1 text-xs text-[#3B6215] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3B6215]" /> Anonymous Participant
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-[#3B6215] font-bold">
                  <UserCheck className="w-3.5 h-3.5" /> {response.submittedBy}
                </span>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Answers Section */}
      <div className="p-6 sm:p-8 rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] shadow-sm space-y-6">
        <h3 className="text-lg font-extrabold text-[#1F1F1F] border-b border-[#D8CCB3] pb-3">
          Question & Answer Details
        </h3>

        <div className="space-y-4">
          {(response.answers || []).map((ans, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-[#D8CCB3] bg-[#F4EEE3] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3B6215] block">
                Question {idx + 1}
              </span>
              <h4 className="text-sm font-bold text-[#1F1F1F]">
                {ans.questionText}
              </h4>
              <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#D8CCB3] text-sm text-[#1F1F1F] font-semibold leading-relaxed">
                {ans.answerText}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
