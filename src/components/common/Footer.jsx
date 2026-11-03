import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, ShieldCheck, Truck, RefreshCw, Headphones, Heart } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('🎉 Thank you for subscribing! Check your inbox for exclusive offers.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Free Fast Shipping</h4>
              <p className="text-xs text-slate-400">On all orders over $35</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Secure Checkout</h4>
              <p className="text-xs text-slate-400">256-bit SSL encryption</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Easy 30-Day Returns</h4>
              <p className="text-xs text-slate-400">Hassle-free guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 Reader Support</h4>
              <p className="text-xs text-slate-400">Dedicated assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">PageTurn</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              PageTurn is a modern interactive destination for book lovers worldwide. Explore bestsellers, timeless classics, and tech manuals carefully curated for curious minds.
            </p>
            <div className="text-xs text-slate-400">
              <p>📍 100 Literary Lane, Bookseller District</p>
              <p className="mt-1">📞 +1 (800) 555-READ (7323)</p>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore Genres
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/books" className="hover:text-white transition">Fiction & Literature</Link></li>
              <li><Link to="/books" className="hover:text-white transition">Sci-Fi & Fantasy</Link></li>
              <li><Link to="/books" className="hover:text-white transition">Technology & Coding</Link></li>
              <li><Link to="/books" className="hover:text-white transition">Mystery & Thriller</Link></li>
              <li><Link to="/books" className="hover:text-white transition">Biographies & Memoirs</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/orders" className="hover:text-white transition">Track Your Order</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition">Your Wishlist</Link></li>
              <li><span className="text-slate-400">Shipping Rates & Policies</span></li>
              <li><span className="text-slate-400">FAQs & Help Desk</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Bookworm Newsletter
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for weekly author interviews, new releases, and exclusive member discounts.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold tracking-wide transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PageTurn Bookstore Inc. Built with ReactJS & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
