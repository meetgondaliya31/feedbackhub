import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, formTitle = 'this form' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 border border-[#D8CCB3] bg-[#FAF7F0] text-[#1F1F1F] shadow-2xl space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#6B6B6B] hover:bg-[#E8DFC8]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-2xl bg-[#3B6215]/15 text-[#3B6215] flex items-center justify-center border border-[#3B6215]/30">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#1F1F1F]">Delete Feedback Form?</h3>
          <p className="text-xs text-[#4B4B4B] leading-relaxed">
            Are you sure you want to delete <span className="font-bold text-[#1F1F1F]">"{formTitle}"</span>? This action cannot be undone and will permanently remove all associated question data.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-[#1F1F1F] font-semibold text-xs hover:bg-[#D8CCB3] transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-xs shadow-olive-soft transition-all"
          >
            Delete Form
          </button>
        </div>

      </div>
    </div>
  );
}
