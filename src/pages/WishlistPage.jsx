import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { StarRating } from '../components/common/StarRating';

export const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useBooks();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (book) => {
    if (book.stock <= 0) {
      showToast('This book is out of stock.', 'warning');
      return;
    }
    addToCart(book, 1);
    toggleWishlist(book);
    showToast(`Moved "${book.title}" to your cart!`, 'success');
  };

  const handleRemove = (book) => {
    toggleWishlist(book);
    showToast(`Removed "${book.title}" from your wishlist.`, 'info');
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-10 border border-slate-200/80 shadow-xs text-center space-y-5">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Your Wishlist is Empty</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Save books you'd love to read or purchase later by clicking the heart icon on any book card.
            </p>
          </div>
          <div>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
            >
              <span>Explore Books</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            You have <strong className="text-rose-600">{wishlist.length}</strong> saved {wishlist.length === 1 ? 'item' : 'items'}.
          </p>
        </div>

        <Link
          to="/books"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
        >
          <span>Browse More Books</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div className="p-4 flex gap-4">
              <Link to={`/books/${book.id}`} className="shrink-0 w-20 h-28 bg-slate-100 rounded-xl overflow-hidden shadow-xs">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </Link>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-600">
                  {book.category}
                </span>
                <Link to={`/books/${book.id}`}>
                  <h4 className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition line-clamp-2">
                    {book.title}
                  </h4>
                </Link>
                <p className="text-xs text-slate-500 truncate">by {book.author}</p>
                <div className="pt-1">
                  <StarRating rating={book.rating} size="w-3 h-3" showValue={true} />
                </div>
                <div className="pt-1 text-sm font-extrabold text-slate-900">
                  ${book.price.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handleRemove(book)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleMoveToCart(book)}
                disabled={book.stock <= 0}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition disabled:opacity-40"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
