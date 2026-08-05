import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import StatCard from '../components/StatCard';
import DashboardChart from '../components/DashboardChart';
import RatingDistribution from '../components/RatingDistribution';
import RecentFeedbackTable from '../components/RecentFeedbackTable';
import PopularFormsCard from '../components/PopularFormsCard';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';

import { 
  FileText, 
  Inbox, 
  Star, 
  TrendingUp, 
  Plus, 
  Sparkles,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [overview, setOverview] = useState({
    totalForms: 12,
    totalResponses: 148,
    averageRating: 4.6,
    responseGrowth: 24.8
  });

  const [recentResponses, setRecentResponses] = useState([]);
  const [chartsData, setChartsData] = useState({ timeline: [], ratingDistribution: [] });
  const [popularForms, setPopularForms] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [overviewRes, recentRes, chartsRes, popularRes] = await Promise.all([
          API.get('/dashboard/overview').catch(() => null),
          API.get('/dashboard/recent-feedback').catch(() => null),
          API.get('/dashboard/charts').catch(() => null),
          API.get('/dashboard/popular-forms').catch(() => null),
        ]);

        if (isMounted) {
          if (overviewRes?.data?.success) setOverview(overviewRes.data);
          if (recentRes?.data?.success) setRecentResponses(recentRes.data.data);
          if (chartsRes?.data?.success) {
            setChartsData({
              timeline: chartsRes.data.timeline,
              ratingDistribution: chartsRes.data.ratingDistribution
            });
          }
          if (popularRes?.data?.success) setPopularForms(popularRes.data.popularForms);
        }
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
        if (isMounted) setError('Unable to retrieve dashboard metrics from server.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* SECTION 1: Welcome Area */}
      <div className="rounded-3xl p-6 sm:p-8 border border-[#D8CCB3] bg-[#E8DFC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF7F0] text-[#3B6215] border border-[#D8CCB3]">
            <Sparkles className="w-3.5 h-3.5 text-[#3B6215]" />
            <span>Workspace Active • Professional Plan</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1F1F1F] tracking-tight">
            Welcome back, {user?.fullName || 'John'}
          </h1>
          
          <p className="text-sm font-medium text-[#4B4B4B]">
            You collected <span className="font-extrabold text-[#3B6215]">{overview.totalResponses} responses</span> this month across your active feedback forms.
          </p>
        </div>

        <button
          onClick={() => navigate('/forms')}
          className="px-6 py-3.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-sm shadow-olive-soft flex items-center gap-2 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Create New Form</span>
        </button>
      </div>

      {/* SECTION 2: 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Forms"
          value={overview.totalForms}
          trend="+3 active forms"
          subtitle="Forms Published"
          icon={FileText}
        />
        <StatCard
          title="Total Responses"
          value={overview.totalResponses.toLocaleString()}
          trend={`+${overview.responseGrowth}% vs last month`}
          subtitle="Monthly Submissions"
          icon={Inbox}
        />
        <StatCard
          title="Average Rating"
          value={`${overview.averageRating} / 5.0`}
          trend="96.4% CSAT Index"
          subtitle="Satisfaction Score"
          icon={Star}
        />
        <StatCard
          title="Response Growth"
          value={`+${overview.responseGrowth}%`}
          trend="Consistent Growth"
          subtitle="MoM Increase"
          icon={BarChart3}
        />
      </div>

      {/* SECTION 4 & SECTION 5: Response Overview Line Chart & Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <DashboardChart timeline={chartsData.timeline} />
        </div>
        <div className="lg:col-span-4">
          <RatingDistribution distribution={chartsData.ratingDistribution} />
        </div>
      </div>

      {/* SECTION 3: Recent Feedback Activity Table */}
      <RecentFeedbackTable 
        responses={recentResponses} 
        onNavigateForms={() => navigate('/forms')} 
      />

      {/* SECTION 6: Popular Forms */}
      <PopularFormsCard forms={popularForms} />

    </div>
  );
}
