import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import FormStatusBadge from '../components/FormStatusBadge';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EmptyState from '../components/EmptyState';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';

import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ArrowUpDown,
  Sparkles 
} from 'lucide-react';

export default function FormsPage() {
  const navigate = useNavigate();

  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const [deletingForm, setDeletingForm] = useState(null);

  const fetchForms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get('/forms', {
        params: { search: searchQuery, status: statusFilter, sortBy }
      });
      if (res.data.success) {
        setForms(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching forms list:', err);
      setError('Unable to load feedback forms.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, [searchQuery, statusFilter, sortBy]);

  const handleDuplicate = async (id) => {
    try {
      const res = await API.post(`/forms/${id}/duplicate`);
      if (res.data.success) {
        fetchForms();
      }
    } catch (err) {
      alert('Failed to duplicate form.');
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    try {
      const res = await API.patch(`/forms/${id}/status`, { status: nextStatus });
      if (res.data.success) {
        fetchForms();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingForm) return;
    try {
      const res = await API.delete(`/forms/${deletingForm.id}`);
      if (res.data.success) {
        setDeletingForm(null);
        fetchForms();
      }
    } catch (err) {
      alert('Failed to delete form.');
      setDeletingForm(null);
    }
  };

  if (loading && forms.length === 0) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchForms} />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] tracking-tight">
            Feedback Form Management
          </h1>
          <p className="text-sm text-[#4B4B4B]">
            Build, edit, publish, and manage survey forms for respondents.
          </p>
        </div>

        <Link
          to="/forms/create"
          className="px-6 py-3.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-sm shadow-olive-soft flex items-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Create New Form</span>
        </Link>
      </div>

      {/* Search & Filtering Toolbar */}
      <div className="p-4 rounded-2xl border border-[#D8CCB3] bg-[#FAF7F0] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search forms by title..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-sm text-[#1F1F1F] placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center p-1 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-xs">
            {['All', 'Draft', 'Published', 'Archived'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  statusFilter === st ? 'bg-[#3B6215] text-white shadow-xs' : 'text-[#4B4B4B] hover:text-[#3B6215]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-xs font-semibold text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

      </div>

      {/* Forms Table / Empty State */}
      {forms.length === 0 ? (
        <EmptyState
          title="You haven't created any feedback forms yet."
          message="Build your first feedback form to start collecting responses from customers, students, or team members."
          actionText="Create Your First Form"
          onAction={() => navigate('/forms/create')}
        />
      ) : (
        <div className="rounded-3xl border border-[#D8CCB3] bg-[#FAF7F0] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#1F1F1F]">
              <thead className="bg-[#E8DFC8] border-b border-[#D8CCB3] text-xs uppercase tracking-wider text-[#4B4B4B] font-extrabold">
                <tr>
                  <th className="py-4 px-6">Form Title</th>
                  <th className="py-4 px-6">Questions</th>
                  <th className="py-4 px-6">Responses</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Created Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8CCB3]">
                {forms.map((form) => (
                  <tr key={form.id} className="hover:bg-[#F4EEE3]/60 transition-colors">
                    
                    {/* Title */}
                    <td className="py-4 px-6 font-bold flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#3B6215]/15 text-[#3B6215] flex items-center justify-center shrink-0">
                        <FileText className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <Link to={`/forms/${form.id}`} className="text-sm font-bold text-[#1F1F1F] hover:text-[#3B6215] hover:underline">
                          {form.title}
                        </Link>
                        {form.description && (
                          <p className="text-xs text-[#6B6B6B] truncate max-w-xs">{form.description}</p>
                        )}
                      </div>
                    </td>

                    {/* Questions count */}
                    <td className="py-4 px-6 font-semibold text-xs text-[#4B4B4B]">
                      {form.questionsCount} questions
                    </td>

                    {/* Responses count */}
                    <td className="py-4 px-6 font-extrabold text-sm text-[#3B6215]">
                      {form.responsesCount.toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <FormStatusBadge status={form.status} />
                    </td>

                    {/* Created Date */}
                    <td className="py-4 px-6 text-xs text-[#6B6B6B] font-mono">
                      {new Date(form.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>

                    {/* Actions Button Group */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        
                        <Link
                          to={`/forms/${form.id}`}
                          className="p-2 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] hover:bg-[#D8CCB3]"
                          title="View Form Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                          to={`/forms/${form.id}/edit`}
                          className="p-2 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] hover:bg-[#D8CCB3]"
                          title="Edit Form & Questions"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDuplicate(form.id)}
                          className="p-2 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] hover:bg-[#D8CCB3]"
                          title="Duplicate Form"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeletingForm(form)}
                          className="p-2 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] hover:bg-red-100"
                          title="Delete Form"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Deletion */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingForm)}
        formTitle={deletingForm?.title}
        onClose={() => setDeletingForm(null)}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}
