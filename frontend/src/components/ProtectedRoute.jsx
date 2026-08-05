import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Loader2 } from 'lucide-react';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4EEE3] flex flex-col items-center justify-center p-4">
        <div className="p-8 rounded-3xl bg-[#FAF7F0] border border-[#D8CCB3] shadow-xl text-center space-y-4 max-w-sm w-full">
          <div className="w-12 h-12 rounded-xl bg-[#3B6215] text-white flex items-center justify-center mx-auto shadow-xs animate-pulse">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#1F1F1F]">Restoring Session...</h3>
            <p className="text-xs text-[#6B6B6B]">Verifying your security credentials</p>
          </div>
          <div className="flex justify-center pt-2">
            <Loader2 className="w-6 h-6 text-[#3B6215] animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated users to /login and pass current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
