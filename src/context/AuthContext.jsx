import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY_USER = 'bookstore_auth_user';
const STORAGE_KEY_ACCOUNTS = 'bookstore_registered_accounts';

// Seed demo user
const DEFAULT_DEMO_USER = {
  id: 'usr-1',
  name: 'Alex Reader',
  email: 'alex@example.com',
  password: 'password123',
  address: {
    fullName: 'Alex Reader',
    street: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zipCode: '97477',
    country: 'United States',
    phone: '+1 (555) 234-5678'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    // Seed initial demo account if not exists
    try {
      const accounts = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      if (!accounts) {
        localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify([DEFAULT_DEMO_USER]));
      }
    } catch (e) {
      console.error('Failed to access localStorage', e);
    }
  }, []);

  const login = (email, password) => {
    try {
      const rawAccounts = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      const accounts = rawAccounts ? JSON.parse(rawAccounts) : [DEFAULT_DEMO_USER];
      const match = accounts.find((acc) => acc.email.toLowerCase() === email.toLowerCase());

      if (!match) {
        throw new Error('No account found with this email.');
      }
      if (match.password !== password) {
        throw new Error('Incorrect password. (Try "password123" for demo)');
      }

      const sessionUser = {
        id: match.id,
        name: match.name,
        email: match.email,
        address: match.address || {}
      };
      setUser(sessionUser);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(sessionUser));
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const register = (name, email, password) => {
    try {
      const rawAccounts = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      const accounts = rawAccounts ? JSON.parse(rawAccounts) : [DEFAULT_DEMO_USER];

      if (accounts.some((acc) => acc.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('An account with this email already exists.');
      }

      const newAccount = {
        id: 'usr-' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        address: {
          fullName: name.trim()
        }
      };

      accounts.push(newAccount);
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));

      const sessionUser = {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        address: newAccount.address
      };
      setUser(sessionUser);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(sessionUser));
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal
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
