import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export default function ResponseFilters({ 
  search, 
  onSearchChange, 
  formFilter, 
  onFormFilterChange, 
  ratingFilter, 
  onRatingFilterChange, 
  anonymousFilter, 
  onAnonymousFilterChange, 
  sortBy, 
  onSortByChange,
  formsList = [] 
}) {
  return (
    <div className="p-4 rounded-2xl border border-[#D8CCB3] bg-[#FAF7F0] space-y-3 shadow-xs">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        
        {/* Search */}
        <div className="lg:col-span-4 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search responses by content or user..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-xs font-semibold text-[#1F1F1F] placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
          />
        </div>

        {/* Form Filter */}
        <div className="lg:col-span-3">
          <select
            value={formFilter}
            onChange={(e) => onFormFilterChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-xs font-semibold text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
          >
            <option value="All">All Forms</option>
            {formsList.map(f => (
              <option key={f.id} value={f.id}>{f.title}</option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="lg:col-span-2">
          <select
            value={ratingFilter}
            onChange={(e) => onRatingFilterChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-xs font-semibold text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {/* Anonymous Filter */}
        <div className="lg:col-span-3">
          <select
            value={anonymousFilter}
            onChange={(e) => onAnonymousFilterChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-xs font-semibold text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#3B6215]"
          >
            <option value="All">All Identities</option>
            <option value="anonymous">Anonymous Only</option>
            <option value="identified">Identified Only</option>
          </select>
        </div>

      </div>

      {/* Sorting bar */}
      <div className="flex items-center justify-between text-xs pt-2 border-t border-[#D8CCB3]">
        <div className="flex items-center gap-1 text-[#6B6B6B] font-semibold">
          <Filter className="w-3.5 h-3.5 text-[#3B6215]" />
          <span>Active Filters Applied</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-[#4B4B4B]">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-[#D8CCB3] bg-[#E8DFC8] text-xs font-bold text-[#3B6215] focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

    </div>
  );
}
