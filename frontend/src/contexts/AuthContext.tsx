'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      // Get CSRF cookie first
      await authApi.getCsrfCookie();
      
      // Try to get authenticated user
      const response = await authApi.getUser();
      setUser(response.data);
    } catch {
      console.log('Not authenticated');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Get CSRF cookie
      await authApi.getCsrfCookie();
      
      // Login
      await authApi.login(email, password);
      
      // Get user data
      const response = await authApi.getUser();
      setUser(response.data);
    } catch (error: unknown) {
      const errorObj = error as { response?: { data?: unknown } };
      throw errorObj.response?.data || error;
    }
  };

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      // Get CSRF cookie
      await authApi.getCsrfCookie();
      
      // Register
      await authApi.register(name, email, password, passwordConfirmation);
      
      // Get user data
      const response = await authApi.getUser();
      setUser(response.data);
    } catch (error: unknown) {
      const errorObj = error as { response?: { data?: unknown } };
      throw errorObj.response?.data || error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};