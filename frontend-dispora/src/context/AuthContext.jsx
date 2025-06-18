import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../utils/notifications';
import { API_BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.ME}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.loggedIn && data.admin) {
        const userData = {
          id: data.admin.id,
          username: data.admin.username,
          fullName: data.admin.nama_lengkap,
          role: 'admin' // Default role since this is admin panel
        };
        localStorage.setItem('adminUser', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error(data.message || 'Not authenticated');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('adminUser');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data && data.admin) {
        const userData = {
          id: data.admin.id,
          username: data.admin.username,
          fullName: data.admin.nama_lengkap,
          role: 'admin' // Default role since this is admin panel
        };
        localStorage.setItem('adminUser', JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      
      throw new Error('Invalid response format from server');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`, {
        method: 'POST',
        credentials: 'include' // Untuk mengirim session cookie
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminUser');
      setUser(null);
      showSuccess('Anda berhasil logout');
      navigate('/admin/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
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

export default AuthContext;
