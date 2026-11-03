import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Check, Book } from 'lucide-react';
import { StarRating } from '../common/StarRating';
import { useCart } from '../../context/CartContext';
import { useBooks } from '../../context/BookContext';
import { useToast } from '../../context/ToastContext';

export const BookCard = ({ book }) => {
  const { cart, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useBooks();
  const { showToast } = useToast();

  const cartItem = cart.find((item) => item.book.id === book.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const wishlisted = isWishlisted(book.id);

  const discountPercent = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (book.stock <= 0) {
      showToast('This book is currently out of stock.', 'warning');
      return;
    }

    if (quantityInCart >= book.stock) {
      showToast(`Only ${book.stock} copies available in stock.`, 'warning');
      return;
    }

    addToCart(book, 1);
    showToast(`Added "${book.title}" to your cart!`, 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(book);
    showToast(
      wishlisted
        ? `Removed "${book.title}" from wishlist.`
        : `Added "${book.title}" to your wishlist!`,
      wishlisted ? 'info' : 'success'
    );
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Cover Image & Badges */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <Link to={`/books/${book.id}`} className="block w-full h-full">
          <img
            src={book.coverImage}
            alt={book.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-md transition-all ${
            wishlisted
              ? 'bg-rose-500 text-white hover:bg-rose-600'
              : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start pointer-events-none">
          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {book.bestseller && (
            <span className="bg-amber-500 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Format Badge */}
        <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md pointer-events-none">
          {book.format || 'Paperback'}
        </span>
      </div>

      {/* Book Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-indigo-600 font-semibold mb-1">
            <span className="uppercase tracking-wider text-[11px]">{book.category}</span>
            {book.stock <= 5 && book.stock > 0 && (
              <span className="text-amber-600 font-bold text-[10px]">Only {book.stock} left!</span>
            )}
          </div>

          <Link to={`/books/${book.id}`}>
            <h3
              className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-indigo-600 transition-colors"
              title={book.title}
            >
              {book.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-1 truncate">by {book.author}</p>

          <div className="mt-2">
            <StarRating rating={book.rating} showValue={true} reviewCount={book.reviewCount} />
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && book.originalPrice > book.price && (
                <span className="text-xs text-slate-400 line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={book.stock <= 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all ${
              book.stock <= 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : quantityInCart > 0
                ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/20 active:scale-95'
            }`}
            aria-label={`Add ${book.title} to cart`}
          >
            {quantityInCart > 0 ? (
              <>
                <Check className="w-3.5 h-3.5 text-indigo-700" />
                <span>In Cart ({quantityInCart})</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
