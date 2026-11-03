import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RefreshCw,
  BookOpen,
  Calendar,
  Layers,
  Globe,
  Share2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  MessageSquarePlus,
  ArrowLeft
} from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { StarRating } from '../components/common/StarRating';
import { BookCard } from '../components/books/BookCard';
import { ReviewModal } from '../components/books/ReviewModal';

export const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, getBookById, isWishlisted, toggleWishlist, addReview } = useBooks();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'specs' | 'reviews'
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const book = getBookById(id);

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Book Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          The requested book could not be found or may have been removed.
        </p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(book.id);
  const discountPercent = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (book.stock <= 0) {
      showToast('This book is currently out of stock.', 'warning');
      return;
    }
    addToCart(book, quantity);
    showToast(`Added ${quantity} ${quantity === 1 ? 'copy' : 'copies'} of "${book.title}" to cart!`, 'success');
  };

  const handleBuyNow = () => {
    if (book.stock <= 0) {
      showToast('This book is currently out of stock.', 'warning');
      return;
    }
    addToCart(book, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author} on PageTurn Bookstore!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  // Related books
  const relatedBooks = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-indigo-600 transition">
          Home
        </Link>
        <span>/</span>
        <Link to="/books" className="hover:text-indigo-600 transition">
          Catalog
        </Link>
        <span>/</span>
        <span className="text-slate-400">{book.category}</span>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-sm">
          {book.title}
        </span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
        {/* Left: Book Cover Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200/60 group">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
              }}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
              {discountPercent > 0 && (
                <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  SAVE {discountPercent}%
                </span>
              )}
              {book.bestseller && (
                <span className="bg-amber-500 text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                  BESTSELLER
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                toggleWishlist(book);
                showToast(
                  wishlisted
                    ? `Removed "${book.title}" from wishlist.`
                    : `Added "${book.title}" to wishlist!`,
                  wishlisted ? 'info' : 'success'
                );
              }}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-md transition-all ${
                wishlisted
                  ? 'bg-rose-500 text-white hover:bg-rose-600'
                  : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
              }`}
              title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-label="Wishlist toggle"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Truck className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-700">Free Delivery</p>
              <p className="text-[10px] text-slate-400">Orders $35+</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-700">100% Genuine</p>
              <p className="text-[10px] text-slate-400">Guaranteed</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <RefreshCw className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <p className="text-[11px] font-bold text-slate-700">30-Day Return</p>
              <p className="text-[10px] text-slate-400">Hassle free</p>
            </div>
          </div>
        </div>

        {/* Right: Book Details & Purchase controls */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Share */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                {book.category}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-medium transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            {/* Title & Author */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {book.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1 font-medium">
                by{' '}
                <span className="text-indigo-600 font-bold hover:underline cursor-pointer">
                  {book.author}
                </span>{' '}
                (Author)
              </p>
            </div>

            {/* Ratings & Reviews summary */}
            <div className="flex items-center gap-4 py-2 border-y border-slate-100">
              <StarRating
                rating={book.rating}
                showValue={true}
                reviewCount={book.reviewCount}
                size="w-4 h-4"
              />
              <span className="text-xs text-slate-300">|</span>
              <button
                onClick={() => {
                  setActiveTab('reviews');
                  setIsReviewModalOpen(true);
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Pricing block */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">
                    ${book.price.toFixed(2)}
                  </span>
                  {book.originalPrice && book.originalPrice > book.price && (
                    <span className="text-sm text-slate-400 line-through">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {discountPercent > 0 && (
                  <p className="text-xs font-semibold text-emerald-600 mt-1">
                    You save ${(book.originalPrice - book.price).toFixed(2)} ({discountPercent}% off)
                  </p>
                )}
              </div>

              {/* Stock status indicator */}
              <div>
                {book.stock > 5 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>In Stock ({book.stock} available)</span>
                  </span>
                ) : book.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Hurry! Only {book.stock} left in stock</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Out of Stock</span>
                  </span>
                )}
              </div>
            </div>

            {/* Synopsis overview */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              "{book.synopsis || book.description.substring(0, 160) + '...'}"
            </p>

            {/* Quantity Selector & Purchase Buttons */}
            {book.stock > 0 && (
              <div className="pt-2 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 hover:bg-slate-200 text-slate-600 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center text-xs font-bold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(book.stock, q + 1))}
                      className="p-2 hover:bg-slate-200 text-slate-600 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Max: {book.stock} per customer
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick specs pill row */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block text-[10px]">Format</span>
              <span className="font-semibold text-slate-800">{book.format || 'Paperback'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Pages</span>
              <span className="font-semibold text-slate-800">{book.pages || 320} pages</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Language</span>
              <span className="font-semibold text-slate-800">{book.language || 'English'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Published</span>
              <span className="font-semibold text-slate-800">{book.publishedYear || 2021}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specifications, Reviews */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 gap-4 sm:gap-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === 'description'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Description & Overview
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === 'specs'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Full Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === 'reviews'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Customer Reviews ({book.reviews ? book.reviews.length : 0})
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'description' && (
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed animate-in fade-in duration-150">
            <h3 className="font-bold text-slate-900 text-base">About "{book.title}"</h3>
            <p className="whitespace-pre-line">{book.description}</p>
          </div>
        )}

        {/* Tab 2: Specs */}
        {activeTab === 'specs' && (
          <div className="animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl text-xs sm:text-sm">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">ISBN-13</span>
                <span className="font-bold text-slate-800">{book.isbn}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Publisher</span>
                <span className="font-bold text-slate-800">{book.publisher}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Publication Year</span>
                <span className="font-bold text-slate-800">{book.publishedYear}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Pages Count</span>
                <span className="font-bold text-slate-800">{book.pages}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Binding / Format</span>
                <span className="font-bold text-slate-800">{book.format}</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Language</span>
                <span className="font-bold text-slate-800">{book.language}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Verified Reader Reviews</h3>
                <p className="text-xs text-slate-500">Real feedback from verified purchasers</p>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Write a Review
              </button>
            </div>

            <div className="space-y-4">
              {book.reviews && book.reviews.length > 0 ? (
                book.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                          {rev.author.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-slate-800">{rev.author}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <StarRating rating={rev.rating} size="w-3.5 h-3.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">
                  No reviews yet for this title. Be the first to share your thoughts!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Books Section */}
      {relatedBooks.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600">
                Recommended
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Readers Also Explored in {book.category}
              </h2>
            </div>
            <Link
              to="/books"
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedBooks.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        book={book}
        onAddReview={addReview}
      />
    </div>
  );
};
