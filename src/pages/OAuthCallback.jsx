import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get token & email sent by Backend
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (token) {
      localStorage.setItem('token', token);
      if (email) localStorage.setItem('userEmail', email);
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login?error=Google login failed', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-sm font-semibold text-slate-600">Logging in with Google...</p>
    </div>
  );
};

export default OAuthCallback;
