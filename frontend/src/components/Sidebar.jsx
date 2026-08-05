import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Inbox, 
  BarChart3, 
  Settings, 
  LogOut, 
  MessageSquare, 
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Feedback Forms', path: '/forms', icon: FileText },
    { name: 'Responses', path: '/feedbacks', icon: Inbox },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#FAF7F0] border-r border-[#D8CCB3] text-[#1F1F1F]">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-[#D8CCB3] flex items-center justify-between">
        <NavLink to="/dashboard" className="flex items-center gap-3 group focus:outline-none">
          <div className="h-10 w-10 rounded-xl bg-[#3B6215] flex items-center justify-center text-white shadow-olive-soft group-hover:bg-[#2F5010] transition-colors">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-[#1F1F1F]">
              Feedback<span className="text-[#3B6215]">Hub</span>
            </span>
            <span className="text-[10px] font-semibold text-[#3B6215] uppercase tracking-widest -mt-1">
              Analytics Platform
            </span>
          </div>
        </NavLink>

        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden p-2 rounded-xl text-[#6B6B6B] hover:bg-[#E8DFC8]"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Primary Navigation Items */}
      <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
        <div className="px-3 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-[#6B6B6B]">
          Main Workspace
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#3B6215] text-white shadow-olive-soft'
                    : 'text-[#4B4B4B] hover:text-[#3B6215] hover:bg-[#E8DFC8]/70'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </NavLink>
          );
        })}
      </div>

      {/* Plan Pro Badge */}
      <div className="p-4 mx-4 mb-4 rounded-2xl bg-[#E8DFC8] border border-[#D8CCB3] space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#3B6215]">
          <Sparkles className="w-4 h-4" />
          <span>Professional Plan</span>
        </div>
        <p className="text-[11px] text-[#4B4B4B]">
          148 responses collected this month (Unlimited active forms enabled).
        </p>
      </div>

      {/* User Profile & Logout Section */}
      <div className="p-4 border-t border-[#D8CCB3] bg-[#E8DFC8]/50 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#3B6215] text-white flex items-center justify-center text-sm font-bold shadow-xs shrink-0">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-[#1F1F1F] truncate">
              {user?.fullName || 'John Doe'}
            </span>
            <span className="text-[11px] text-[#6B6B6B] truncate">
              {user?.email || 'user@feedbackhub.io'}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-xl text-[#3B6215] hover:bg-[#D8CCB3] transition-colors shrink-0"
          title="Log Out"
          aria-label="Log Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden md:block w-64 fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Collapsible Overlay) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fadeIn" 
            onClick={onClose} 
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
