import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  user_id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for existing token on initial load (only in browser)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        setUser({
          user_id: data.user_id,
          email: data.email,
          name: data.user_name,
        });

        // Store in localStorage (only in browser)
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('authToken', data.access_token);
          localStorage.setItem('user', JSON.stringify({
            user_id: data.user_id,
            email: data.email,
            name: data.user_name,
          }));
        }

        return true;
      } else {
        console.error('Login failed:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        setUser({
          user_id: data.user_id,
          email: data.email,
          name: data.user_name,
        });

        // Store in localStorage (only in browser)
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('authToken', data.access_token);
          localStorage.setItem('user', JSON.stringify({
            user_id: data.user_id,
            email: data.email,
            name: data.user_name,
          }));
        }

        return true;
      } else {
        console.error('Registration failed:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // Remove from localStorage (only in browser)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const contextValue: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};