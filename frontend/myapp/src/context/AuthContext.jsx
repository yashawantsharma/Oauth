import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = uAseState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  // Parse JWT token payload if needed
  const parseJwt = (tokenStr) => {
    try {
      const base64Url = tokenStr.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const loginSuccess = (jwtToken, userInfo = null) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);

    if (userInfo) {
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
    } else {
      const decoded = parseJwt(jwtToken);
      const fallbackUser = {
        id: decoded?.id,
        email: decoded?.email || 'User',
        name: decoded?.name || decoded?.email?.split('@')[0] || 'User',
      };
      localStorage.setItem('user', JSON.stringify(fallbackUser));
      setUser(fallbackUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        isAuthenticated: !!token,
        loading,
        setLoading,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
