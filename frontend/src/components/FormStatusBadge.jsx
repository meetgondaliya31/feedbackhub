import React from 'react';
import { CheckCircle2, Clock, Archive } from 'lucide-react';

export default function FormStatusBadge({ status = 'Draft' }) {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Published':
        return {
          bg: 'bg-[#3B6215]/15 text-[#3B6215] border-[#3B6215]/30',
          icon: CheckCircle2,
          label: 'Published'
        };
      case 'Archived':
        return {
          bg: 'bg-[#D8CCB3]/60 text-[#4B4B4B] border-[#D8CCB3]',
          icon: Archive,
          label: 'Archived'
        };
      case 'Draft':
      default:
        return {
          bg: 'bg-[#E8DFC8] text-[#1F1F1F] border-[#D8CCB3]',
          icon: Clock,
          label: 'Draft'
        };
    }
  };

  const badge = getBadgeStyle();
  const Icon = badge.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{badge.label}</span>
    </span>
  );
}
