import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import ResponseFilters from '../components/ResponseFilters';
import ResponseTable from '../components/ResponseTable';
import ExportButton from '../components/ExportButton';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';

export default function ResponsesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [responses, setResponses] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [formsList, setFormsList] = useState([]);

  // Filters state
  const [search, setSearch] = useState('');
  const [formFilter, setFormFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [anonymousFilter, setAnonymousFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const fetchResponses = async () => {
    setLoading(true);
    setError(null);
    try {
      const [resRes, formsRes] = await Promise.all([
        API.get('/responses', {
          params: {
            search,
            formId: formFilter,
            rating: ratingFilter,
            anonymous: anonymousFilter,
            sortBy,
            page,
            limit: 10
          }
        }),
        API.get('/forms').catch(() => null)
      ]);

      if (resRes.data.success) {
        setResponses(resRes.data.data);
        setPagination(resRes.data.pagination);
      }
      if (formsRes?.data?.success) {
        setFormsList(formsRes.data.data);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching responses:', err);
      setError('Unable to load feedback responses.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, [search, formFilter, ratingFilter, anonymousFilter, sortBy, page]);

  const handleDeleteResponse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this response record?')) return;
    try {
      const res = await API.delete(`/responses/${id}`);
      if (res.data.success) {
        fetchResponses();
      }
    } catch (err) {
      alert('Failed to delete response record.');
    }
  };

  if (loading && responses.length === 0) return <SkeletonLoader />;
  if (error) return <ErrorState message={error} onRetry={fetchResponses} />;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] tracking-tight">
            Response Management Inbox
          </h1>
          <p className="text-sm text-[#4B4B4B]">
            Review, filter, search, and export incoming feedback submissions.
          </p>
        </div>

        <ExportButton />
      </div>

      {/* Filters Toolbar */}
      <ResponseFilters
        search={search}
        onSearchChange={setSearch}
        formFilter={formFilter}
        onFormFilterChange={setFormFilter}
        ratingFilter={ratingFilter}
        onRatingFilterChange={setRatingFilter}
        anonymousFilter={anonymousFilter}
        onAnonymousFilterChange={setAnonymousFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        formsList={formsList}
      />

      {/* Responses Table */}
      <ResponseTable
        responses={responses}
        pagination={pagination}
        onPageChange={setPage}
        onDelete={handleDeleteResponse}
      />

    </div>
  );
}
