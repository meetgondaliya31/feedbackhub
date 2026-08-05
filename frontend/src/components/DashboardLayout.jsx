import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard Overview';
      case '/forms':
        return 'Feedback Forms';
      case '/feedbacks':
        return 'Responses Inbox';
      case '/analytics':
        return 'Analytics & Intelligence';
      case '/settings':
        return 'Account Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EEE3] text-[#1F1F1F] font-sans selection:bg-[#3B6215] selection:text-white flex">
      
      {/* Sidebar Navigation (Desktop Fixed / Mobile Collapsible) */}
      <Sidebar 
        isOpen={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Content Area Container */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        
        {/* Top Navigation */}
        <TopNavigation 
          title={getPageTitle()}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Dashboard Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-[#D8CCB3] bg-[#E8DFC8]/40 py-4 px-8 text-center text-xs text-[#6B6B6B]">
          FeedbackHub © {new Date().getFullYear()} • Enterprise Feedback Intelligence Platform
        </footer>

      </div>

    </div>
  );
}
