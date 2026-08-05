import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';
import API from '../api/axios';

export default function ExportButton() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleExportCSV = async () => {
    setDownloading(true);
    try {
      const response = await API.get('/responses/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'FeedbackHub_Responses_Report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error('Export CSV Error:', err);
      setDownloading(false);
      alert('Failed to export CSV report.');
    }
  };

  return (
    <button
      onClick={handleExportCSV}
      disabled={downloading}
      className="px-4 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] font-bold text-xs hover:bg-[#D8CCB3] flex items-center gap-2 transition-all cursor-pointer shadow-xs shrink-0"
    >
      {downloaded ? (
        <>
          <Check className="w-4 h-4 text-[#3B6215]" />
          <span>CSV Exported!</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Exporting CSV...' : 'Export Responses (CSV)'}</span>
        </>
      )}
    </button>
  );
}
