import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import AnalyticsOverviewCard from '../components/AnalyticsOverviewCard';
import TrendChart from '../components/TrendChart';
import RatingChart from '../components/RatingChart';
import TopFormsCard from '../components/TopFormsCard';
import QuestionInsights from '../components/QuestionInsights';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [overview, setOverview] = useState({});
  const [timeline, setTimeline] = useState([]);
  const [activeRange, setActiveRange] = useState('30d');
  const [ratingDist, setRatingDist] = useState([]);
  const [topForms, setTopForms] = useState([]);

  const fetchAnalytics = async (range = activeRange) => {
    setLoading(true);
    setError(null);
    try {
      const [overviewRes, trendsRes, ratingsRes, formsRes] = await Promise.all([
        API.get('/analytics/overview').catch(() => null),
        API.get(`/analytics/trends?range=${range}`).catch(() => null),
        API.get('/analytics/ratings').catch(() => null),
        API.get('/analytics/forms').catch(() => null),
      ]);

      if (overviewRes?.data?.success) setOverview(overviewRes.data);
      if (trendsRes?.data?.success) setTimeline(trendsRes.data.timeline);
      if (ratingsRes?.data?.success) setRatingDist(ratingsRes.data.ratingDistribution);
      if (formsRes?.data?.success) setTopForms(formsRes.data.data);

      setLoading(false);
    } catch (err) {
      console.error('Error loading analytics:', err);
      setError('Unable to load analytics dashboard.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(activeRange);
  }, [activeRange]);

  const handleRangeChange = (newRange) => {
    setActiveRange(newRange);
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorState message={error} onRetry={() => fetchAnalytics(activeRange)} />;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] tracking-tight">
          Executive Analytics & Intelligence
        </h1>
        <p className="text-sm text-[#4B4B4B]">
          Deep analytical insights into response growth, CSAT ratings, and question performance.
        </p>
      </div>

      {/* SECTION 1: Overview Cards */}
      <AnalyticsOverviewCard overview={overview} />

      {/* SECTION 2 & SECTION 3: Response Trend & Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <TrendChart 
            timeline={timeline} 
            activeRange={activeRange}
            onRangeChange={handleRangeChange}
          />
        </div>
        <div className="lg:col-span-4">
          <RatingChart distribution={ratingDist} />
        </div>
      </div>

      {/* SECTION 4: Top Performing Forms */}
      <TopFormsCard forms={topForms} />

      {/* SECTION 6: Question Insights */}
      <QuestionInsights />

    </div>
  );
}
