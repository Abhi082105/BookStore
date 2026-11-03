import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Compass,
  Star,
  CheckCircle,
  Clock,
  ShieldCheck,
  Quote
} from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { BookCard } from '../components/books/BookCard';
import { CATEGORIES } from '../data/booksData';

export const HomePage = () => {
  const navigate = useNavigate();
  const { books, setSelectedCategory, setSearchQuery, setCurrentPage } = useBooks();

  const featuredBooks = books.filter((b) => b.featured).slice(0, 4);
  const bestsellers = books.filter((b) => b.bestseller).slice(0, 4);
  const topRated = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setCurrentPage(1);
    navigate('/books');
  };

  const categoryIcons = {
    Fiction: '📚',
    'Sci-Fi': '🚀',
    Mystery: '🔍',
    Technology: '💻',
    Biography: '🖋️',
    'Self-Help': '🌱',
    Business: '📈'
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white py-20 lg:py-28">
        {/* Glow ambient circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Over 100,000+ Titles Curated For Thinkers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Discover Stories That{' '}
                <span className="bg-gradient-to-r from-amber-300 via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                  Expand Your Mind.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Immerse yourself in world-class fiction, breakthrough science, inspiring memoirs, and modern coding masterpieces. Free delivery on orders over $35.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/books"
                  className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore All Books</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => handleCategoryClick('Technology')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-semibold text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Browse Tech Catalog</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 border-t border-indigo-800/60 grid grid-cols-3 gap-6 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">25k+</div>
                  <div className="text-xs text-indigo-300">Happy Readers</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">4.9★</div>
                  <div className="text-xs text-indigo-300">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">24hr</div>
                  <div className="text-xs text-indigo-300">Express Dispatch</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                {/* Floating promo badge */}
                <div className="absolute -top-4 -left-4 z-20 bg-white/95 text-slate-900 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md border border-slate-200/80 hidden sm:flex items-center gap-3 animate-bounce">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg">
                    🎁
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Coupon Code</p>
                    <p className="text-[11px] text-indigo-600 font-extrabold">BOOKWORM10</p>
                  </div>
                </div>

                {/* Book Collage */}
                <div className="relative rounded-3xl bg-gradient-to-tr from-indigo-800/40 to-white/10 p-6 border border-white/15 backdrop-blur-md shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
                      alt="Atomic Habits"
                      className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 aspect-[3/4] object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
                      alt="Project Hail Mary"
                      className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 aspect-[3/4] object-cover mt-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Genres Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Compass className="w-4 h-4" />
              <span>Catalog Navigation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Browse by Genre
            </h2>
          </div>
          <Link
            to="/books"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
          >
            <span>View all categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-500 hover:shadow-lg transition-all text-center flex flex-col items-center justify-center gap-2 group hover:-translate-y-1"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {categoryIcons[cat] || '📖'}
              </span>
              <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600">
                {cat}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Books Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Handpicked</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Titles
            </h2>
          </div>
          <Link
            to="/books"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
          >
            <span>See more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="bg-indigo-50/60 border-y border-indigo-100/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Readers Prefer PageTurn
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              We are passionate about reading, quality literature, and delivering smiles to your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-2">100% Genuine Editions</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Directly sourced from trusted publishers and verified distributors worldwide. No counterfeits, ever.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-2">Lightning Quick Dispatch</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Orders are packed with care in eco-friendly bubble armor and shipped within 24 hours of placement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-xs flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-2">30-Day Happiness Guarantee</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Not captivated by your read? Return it within 30 days in original condition for a swift refund or exchange.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Top Bestsellers
            </h2>
          </div>
          <Link
            to="/books"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
          >
            <span>View all bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestsellers.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <Award className="w-4 h-4" />
            <span>Community Love</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Loved by 25,000+ Readers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center text-amber-400 gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "PageTurn is hands down my favorite online bookstore. The packaging was immaculate, and the software craftsmanship books arrived in pristine shape!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                DK
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">David Kowalski</h4>
                <p className="text-[10px] text-slate-400">Software Engineer, Berlin</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center text-amber-400 gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The search and filtering make discovering new sci-fi novels effortless. The promo code worked instantly, and customer support answered my shipping query in minutes."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center">
                SM
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Samantha Miller</h4>
                <p className="text-[10px] text-slate-400">Avid Sci-Fi Reader, Toronto</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center text-amber-400 gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Clean checkout process, easy tracking, and a wonderful selection of personal finance and psychology reads. Highly recommended to anyone who loves physical books."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                AR
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Alex Rodriguez</h4>
                <p className="text-[10px] text-slate-400">Product Manager, Austin</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
