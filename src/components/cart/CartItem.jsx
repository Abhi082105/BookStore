import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useBooks } from '../../context/BookContext';
import { useToast } from '../../context/ToastContext';

export const CartItem = ({ item }) => {
  const { book, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  const { isWishlisted, toggleWishlist } = useBooks();
  const { showToast } = useToast();

  const wishlisted = isWishlisted(book.id);

  const handleDecrease = () => {
    if (quantity <= 1) {
      removeFromCart(book.id);
      showToast(`Removed "${book.title}" from cart.`, 'info');
    } else {
      updateQuantity(book.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity >= book.stock) {
      showToast(`Cannot add more than ${book.stock} available copies.`, 'warning');
      return;
    }
    updateQuantity(book.id, quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(book.id);
    showToast(`Removed "${book.title}" from cart.`, 'info');
  };

  const handleMoveToWishlist = () => {
    if (!wishlisted) {
      toggleWishlist(book);
    }
    removeFromCart(book.id);
    showToast(`Moved "${book.title}" to your wishlist.`, 'success');
  };

  const lineTotal = book.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors">
      {/* Book details & Thumbnail */}
      <div className="flex items-center gap-4 flex-1">
        <Link to={`/books/${book.id}`} className="shrink-0 w-20 h-28 bg-slate-100 rounded-xl overflow-hidden shadow-xs">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </Link>

        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
            {book.category}
          </span>
          <Link to={`/books/${book.id}`}>
            <h4 className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition line-clamp-1">
              {book.title}
            </h4>
          </Link>
          <p className="text-xs text-slate-500">by {book.author}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-700">${book.price.toFixed(2)} each</span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span className="text-slate-400 line-through text-[11px]">
                ${book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
          <button
            onClick={handleDecrease}
            className="p-1.5 hover:bg-slate-200 text-slate-600 transition active:scale-95"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center text-xs font-bold text-slate-800">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            disabled={quantity >= book.stock}
            className="p-1.5 hover:bg-slate-200 text-slate-600 transition active:scale-95 disabled:opacity-40"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[70px]">
          <span className="block text-sm font-extrabold text-slate-900">
            ${lineTotal.toFixed(2)}
          </span>
          {quantity > 1 && (
            <span className="text-[10px] text-slate-400 block">
              (${book.price.toFixed(2)} ea)
            </span>
          )}
        </div>

        {/* Delete & Wishlist */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleMoveToWishlist}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
            title="Move to Wishlist"
            aria-label="Move to wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            onClick={handleRemove}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
