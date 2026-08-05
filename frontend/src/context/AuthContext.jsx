import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('feedbackhub_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const storedToken = localStorage.getItem('feedbackhub_token');
      if (storedToken) {
        try {
          const res = await API.get('/auth/me');
          if (isMounted) {
            if (res.data.success) {
              setUser(res.data.user);
              setToken(storedToken);
              setIsAuthenticated(true);
            } else {
              handleLocalLogout();
            }
          }
        } catch (err) {
          if (isMounted) handleLocalLogout();
        }
      } else {
        if (isMounted) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      if (isMounted) {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLocalLogout = () => {
    localStorage.removeItem('feedbackhub_token');
    localStorage.removeItem('feedbackhub_user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (fullName, email, password) => {
    setError(null);
    try {
      const res = await API.post('/auth/register', { fullName, email, password });
      if (res.data.success) {
        const { token: newToken, user: newUser } = res.data;
        localStorage.setItem('feedbackhub_token', newToken);
        localStorage.setItem('feedbackhub_user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please check your credentials.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        const { token: newToken, user: newUser } = res.data;
        localStorage.setItem('feedbackhub_token', newToken);
        localStorage.setItem('feedbackhub_user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password. Please try again.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    handleLocalLogout();
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
