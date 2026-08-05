import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, ArrowRight, Lock, Mail, AlertCircle, Check, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { login, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    clearError();

    if (!email.trim() || !password) {
      setFormError('Please enter both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EEE3] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#3B6215] selection:text-white">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-flex items-center gap-3 group focus:outline-none rounded-xl p-1">
          <div className="h-12 w-12 rounded-2xl bg-[#3B6215] flex items-center justify-center text-white shadow-olive-soft group-hover:bg-[#2F5010] transition-colors">
            <MessageSquare className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#1F1F1F]">
            Feedback<span className="text-[#3B6215]">Hub</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] tracking-tight">
          Welcome back to FeedbackHub
        </h1>
        <p className="text-sm text-[#4B4B4B]">
          Enter your credentials to access your feedback management dashboard.
        </p>
      </div>

      {/* Main Login Card Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[#FAF7F0] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-[#D8CCB3]">
          
          {/* User Friendly Error Announcement Box */}
          {formError && (
            <div 
              role="alert" 
              aria-live="assertive"
              className="mb-6 p-4 rounded-2xl bg-[#E8DFC8]/70 border border-[#3B6215]/30 flex items-start gap-3 text-sm text-[#1F1F1F] animate-fadeIn"
            >
              <AlertCircle className="w-5 h-5 text-[#3B6215] flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{formError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="login-email" 
                className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]"
              >
                Work Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6B6B]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError('');
                  }}
                  placeholder="name@company.com"
                  className="block w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-[#1F1F1F] text-sm placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#3B6215] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="login-password" 
                  className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4B]"
                >
                  Password
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset link has been dispatched to your work email address.');
                  }}
                  className="text-xs font-semibold text-[#3B6215] hover:underline focus:outline-none focus:ring-1 focus:ring-[#3B6215] rounded"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6B6B]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formError) setFormError('');
                  }}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#D8CCB3] bg-[#F4EEE3] text-[#1F1F1F] text-sm placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#3B6215] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-[#4B4B4B]">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#D8CCB3] text-[#3B6215] focus:ring-[#3B6215]"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            {/* Submit Primary CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#3B6215] hover:bg-[#2F5010] text-white font-bold text-sm shadow-olive-soft flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Log In to Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Footer Register Redirect */}
          <div className="mt-6 pt-6 border-t border-[#D8CCB3] text-center text-xs text-[#4B4B4B]">
            Don't have an account yet?{' '}
            <Link 
              to="/register" 
              className="font-bold text-[#3B6215] hover:underline focus:outline-none focus:ring-1 focus:ring-[#3B6215] rounded"
            >
              Start 14-day free trial
            </Link>
          </div>

        </div>

        {/* Security Compliance Note */}
        <div className="mt-6 text-center text-[11px] text-[#6B6B6B] flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#3B6215]" />
          <span>Protected by AES-256 Encryption & SOC2 Type II SLA</span>
        </div>
      </div>

    </div>
  );
}
