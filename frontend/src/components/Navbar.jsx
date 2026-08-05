import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Menu, X, ArrowRight, Sun, Moon, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Analytics', href: '#analytics' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4EEE3]/95 backdrop-blur-md border-b border-[#D8CCB3] shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none rounded-lg">
            <div className="h-10 w-10 rounded-xl bg-[#3B6215] flex items-center justify-center text-white shadow-xs group-hover:bg-[#2F5010] transition-colors duration-200">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#1F1F1F]">
                Feedback<span className="text-[#3B6215]">Hub</span>
              </span>
              <span className="text-[10px] font-semibold text-[#3B6215] uppercase tracking-widest -mt-1 hidden sm:inline-block">
                Intelligence Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full border border-[#D8CCB3] bg-[#E8DFC8]/60 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium rounded-full text-[#4B4B4B] hover:text-[#3B6215] hover:bg-[#FAF7F0] transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-semibold rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white flex items-center gap-2 shadow-xs transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl border border-[#D8CCB3] bg-[#E8DFC8] text-[#3B6215] hover:bg-[#D8CCB3] transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold rounded-xl text-[#1F1F1F] hover:text-[#3B6215] hover:bg-[#E8DFC8] transition-colors"
                >
                  Log in
                </Link>

                {/* Primary Button */}
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white transition-all duration-200 shadow-olive-soft active:scale-95 flex items-center gap-2 group"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1F1F1F] hover:bg-[#E8DFC8]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D8CCB3] bg-[#F0E7D6] transition-all animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-[#4B4B4B] hover:text-[#3B6215] hover:bg-[#E8DFC8]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[#D8CCB3] flex flex-col gap-2.5">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center font-semibold rounded-xl bg-[#3B6215] text-white flex items-center justify-center gap-2"
                  >
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-2.5 text-center font-semibold rounded-xl border border-[#3B6215] text-[#3B6215] bg-[#E8DFC8]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center font-semibold rounded-xl border border-[#3B6215] text-[#3B6215] bg-[#E8DFC8]"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center font-semibold rounded-xl bg-[#3B6215] text-white flex items-center justify-center gap-2"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
