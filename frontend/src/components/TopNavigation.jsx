import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Bell, 
  Menu, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function TopNavigation({ title = 'Dashboard', onOpenMobileSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'New CSAT Response', desc: '5 stars received on Q3 Customer CSAT Survey', time: '10m ago' },
    { id: 2, title: 'Weekly Insight Summary', desc: 'Average CSAT increased to 4.87/5.0 this week', time: '2h ago' },
    { id: 3, title: 'System Security Audit', desc: 'SOC2 Compliance scan passed successfully', time: '1d ago' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#D8CCB3] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-xl text-[#1F1F1F] hover:bg-[#E8DFC8] focus:outline-none"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F1F1F] tracking-tight">
          {title}
        </h1>
      </div>

      {/* Center: Search Field */}
      <div className="hidden sm:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search forms, responses, or analytics..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-[#1F1F1F] text-sm placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#3B6215] transition-all"
          />
        </div>
      </div>

      {/* Right: Notifications & User Profile Menu */}
      <div className="flex items-center gap-3 relative">
        
        {/* Notifications Icon with Counter Badge */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2.5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] hover:bg-[#D8CCB3] transition-colors relative"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#3B6215] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#FAF7F0]">
              3
            </span>
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-[#D8CCB3] bg-[#FAF7F0] shadow-2xl p-4 space-y-3 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-[#D8CCB3]">
                <span className="font-bold text-sm text-[#1F1F1F]">Notifications</span>
                <span className="text-[11px] font-semibold text-[#3B6215] cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>

              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1F1F1F]">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3B6215]" />
                        {n.title}
                      </span>
                      <span className="text-[10px] text-[#6B6B6B]">{n.time}</span>
                    </div>
                    <p className="text-xs text-[#4B4B4B]">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8]/70 hover:bg-[#E8DFC8] transition-colors focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#3B6215] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="hidden md:inline text-xs font-bold text-[#1F1F1F] max-w-[100px] truncate">
              {user?.fullName || 'John Doe'}
            </span>
            <ChevronDown className="w-4 h-4 text-[#6B6B6B]" />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-[#D8CCB3] bg-[#FAF7F0] shadow-2xl p-2 space-y-1 z-50 animate-fadeIn text-xs">
              <div className="p-3 border-b border-[#D8CCB3]">
                <p className="font-bold text-[#1F1F1F] truncate">{user?.fullName || 'John Doe'}</p>
                <p className="text-[11px] text-[#6B6B6B] truncate">{user?.email || 'user@feedbackhub.io'}</p>
              </div>

              <Link
                to="/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#4B4B4B] hover:text-[#3B6215] hover:bg-[#E8DFC8]/60 font-semibold"
              >
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#3B6215] hover:bg-[#E8DFC8]/60 font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
