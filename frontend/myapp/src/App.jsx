import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Deshbord from './pages/Deshbord';
import OAuthCallback from './pages/OAuthCallback';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Login Page */}
        <Route path="/login" element={<Login />} />

        {/* 2. Google OAuth Callback */}
        <Route path="/auth/callback" element={<OAuthCallback />} />

        {/* 3. Dashboard Page */}
        <Route path="/dashboard" element={<Deshbord />} />

        {/* Default route -> Redirect to Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
