import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Package,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useBooks } from '../../context/BookContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemCount } = useCart();
  const { wishlist, searchQuery, setSearchQuery } = useBooks();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    if (location.pathname !== '/books') {
      navigate('/books');
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner */}
      <div className="bg-indigo-600 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2">
        <span>🎉 Special Offer: Free shipping on all orders over $35! Use code <strong className="underline tracking-wider font-bold">BOOKWORM10</strong> for 10% off</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 via-indigo-800 to-violet-900 bg-clip-text text-transparent tracking-tight">
                PageTurn
              </span>
              <span className="text-[10px] block font-semibold text-indigo-500 uppercase tracking-widest -mt-1">
                Bookstore
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-600">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/books"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/books')
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Explore Books
            </Link>
            <Link
              to="/orders"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/orders')
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              My Orders
            </Link>
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center flex-1 max-w-md mx-2 relative"
          >
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 px-2.5 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            >
              Search
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
              title="My Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 p-2 px-3 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition group"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-700">
                Cart
              </span>
            </Link>

            {/* User Profile / Auth */}
            <div className="relative">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-full border border-slate-200 hover:bg-slate-50 transition"
                  >
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-slate-700 max-w-[90px] truncate hidden sm:inline-block">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/orders"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition"
                      >
                        <Package className="w-4 h-4 text-slate-400" />
                        My Order History
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition"
                      >
                        <Heart className="w-4 h-4 text-slate-400" />
                        Saved Wishlist
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search and Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 flex flex-col gap-3 animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search title, author, ISBN..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </form>

            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
              >
                Home
              </Link>
              <Link
                to="/books"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
              >
                Explore Books
              </Link>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
              >
                My Orders
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
              >
                Wishlist ({wishlist.length})
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg flex items-center justify-between"
              >
                <span>Shopping Cart</span>
                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {totalItemCount}
                </span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
