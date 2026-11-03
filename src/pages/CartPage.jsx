import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBooks } from '../context/BookContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { BookCard } from '../components/books/BookCard';

export const CartPage = () => {
  const { cart, clearCart, totalItemCount } = useCart();
  const { books } = useBooks();

  const recommendedBooks = books.slice(0, 3);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-10 border border-slate-200/80 shadow-xs text-center space-y-6">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Looks like you haven't added any books to your cart yet. Explore our curated catalog to find your next great read!
            </p>
          </div>
          <div>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition active:scale-95"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            You have <strong className="text-indigo-600 font-bold">{totalItemCount}</strong> {totalItemCount === 1 ? 'item' : 'items'} in your cart.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/books"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 transition px-3 py-1.5 rounded-lg hover:bg-rose-50"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Cart</span>
          </button>
        </div>
      </div>

      {/* Grid: Cart items on left, Summary on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <CartItem key={item.book.id} item={item} />
          ))}

          {/* Quick Notice */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs text-indigo-900 flex items-center justify-between">
            <span>✨ Free standard shipping automatically applied on orders over $35!</span>
            <Link to="/books" className="font-bold underline ml-2">Add more</Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 sticky top-24">
          <CartSummary />
        </div>
      </div>

      {/* Suggested Books */}
      <div className="pt-12 border-t border-slate-200 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Recommended for You</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendedBooks.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </div>
    </div>
  );
};
