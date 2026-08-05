import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="space-y-8 animate-pulse">
      
      {/* Welcome Banner Skeleton */}
      <div className="h-32 rounded-3xl bg-[#E8DFC8]/60 border border-[#D8CCB3]" />

      {/* 4 Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-36 rounded-2xl bg-[#FAF7F0] border border-[#D8CCB3] p-6 space-y-3">
            <div className="h-4 bg-[#D8CCB3]/50 rounded w-1/2" />
            <div className="h-8 bg-[#D8CCB3]/70 rounded w-3/4" />
            <div className="h-3 bg-[#D8CCB3]/40 rounded w-1/3" />
          </div>
        ))}
      </div>

      {/* Main Charts & Content Skeleton Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-80 rounded-3xl bg-[#FAF7F0] border border-[#D8CCB3]" />
        <div className="lg:col-span-4 h-80 rounded-3xl bg-[#FAF7F0] border border-[#D8CCB3]" />
      </div>

      {/* Table Skeleton */}
      <div className="h-64 rounded-3xl bg-[#FAF7F0] border border-[#D8CCB3]" />

    </div>
  );
}
