import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Public Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Public Feedback Submission Pages
import PublicFeedbackPage from './pages/PublicFeedbackPage';
import PublicSuccessPage from './pages/PublicSuccessPage';

// Protected Dashboard & Management Pages
import DashboardPage from './pages/DashboardPage';
import FormsPage from './pages/FormsPage';
import CreateFormPage from './pages/CreateFormPage';
import EditFormPage from './pages/EditFormPage';
import ViewFormPage from './pages/ViewFormPage';
import FeedbacksPage from './pages/FeedbacksPage';
import ResponsesPage from './pages/ResponsesPage';
import IndividualResponsePage from './pages/IndividualResponsePage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

// Landing Page Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SocialProof from './components/SocialProof';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import UseCasesSection from './components/UseCasesSection';
import LiveDemoWidget from './components/LiveDemoWidget';
import AnalyticsShowcase from './components/AnalyticsShowcase';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleOpenTrial = (mode = 'trial') => {
    if (mode === 'login') {
      navigate('/login');
    } else {
      navigate('/register');
    }
  };

  const handleOpenDemo = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen font-sans bg-[#F4EEE3] text-[#1F1F1F] selection:bg-[#3B6215] selection:text-white">
      {/* Sticky Navigation */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Main Sections */}
      <main>
        <HeroSection onOpenTrial={handleOpenTrial} onOpenDemo={handleOpenDemo} />
        <SocialProof />
        <FeaturesSection onOpenTrial={handleOpenTrial} />
        <HowItWorks onOpenTrial={handleOpenTrial} />
        <UseCasesSection onOpenTrial={handleOpenTrial} />
        <LiveDemoWidget />
        <AnalyticsShowcase onOpenTrial={handleOpenTrial} />
        <TestimonialsSection />
        <PricingSection onOpenTrial={handleOpenTrial} />
        <CTASection onOpenTrial={handleOpenTrial} onOpenDemo={handleOpenDemo} />
      </main>

      {/* Footer */}
      <Footer onOpenTrial={handleOpenTrial} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Public Respondent Feedback Submission Routes */}
        <Route path="/feedback/:formId" element={<PublicFeedbackPage />} />
        <Route path="/feedback/:formId/success" element={<PublicSuccessPage />} />

        {/* Protected Dashboard & Form Management Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Form Management Module Routes */}
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/forms/create" element={<CreateFormPage />} />
            <Route path="/forms/:id/edit" element={<EditFormPage />} />
            <Route path="/forms/:id" element={<ViewFormPage />} />

            {/* Response Management & Analytics Module Routes */}
            <Route path="/responses" element={<ResponsesPage />} />
            <Route path="/responses/:responseId" element={<IndividualResponsePage />} />
            <Route path="/feedbacks" element={<ResponsesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Catch-all Fallback Route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </AuthProvider>
  );
}
