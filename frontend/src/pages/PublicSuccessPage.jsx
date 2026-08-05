import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SuccessScreen from '../components/SuccessScreen';

export default function PublicSuccessPage() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const formTitle = location.state?.formTitle || '';

  const handleReset = () => {
    navigate(`/feedback/${formId}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F4EEE3]">
      <SuccessScreen
        formTitle={formTitle}
        onReset={handleReset}
      />
    </div>
  );
}
