import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (authMode === 'register' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      let res;
      if (authMode === 'login') {
        res = login(email, password);
      } else {
        res = register(name, email, password);
      }

      setLoading(false);
      if (res.success) {
        showToast(
          authMode === 'login' ? 'Welcome back!' : 'Account registered successfully!',
          'success'
        );
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(res.error || 'Authentication failed.');
      }
    }, 400);
  };

  const fillDemoAccount = () => {
    setEmail('alex@example.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-2 text-center">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {authMode === 'login' ? 'Sign in to PageTurn' : 'Create an Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {authMode === 'login'
              ? 'Access your orders, saved wishlist, and faster checkout.'
              : 'Join our community of bookworms and enjoy exclusive perks.'}
          </p>
        </div>

        {/* Demo Quick Fill */}
        {authMode === 'login' && (
          <div className="px-6 pt-2">
            <button
              type="button"
              onClick={fillDemoAccount}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-indigo-50/80 hover:bg-indigo-100/80 text-indigo-700 rounded-lg text-xs font-semibold transition border border-indigo-200/60"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Demo Credentials (alex@example.com)</span>
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}

          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <span>{loading ? 'Processing...' : authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer switch */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-600">
          {authMode === 'login' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setAuthMode('register');
                }}
                className="font-bold text-indigo-600 hover:text-indigo-800 underline ml-1"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setAuthMode('login');
                }}
                className="font-bold text-indigo-600 hover:text-indigo-800 underline ml-1"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
