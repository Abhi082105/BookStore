import React from 'react';
import { CATEGORIES, SORT_OPTIONS } from '../../data/booksData';
import { RotateCcw, Filter, Star, Check } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

export const BookFilters = ({ mobile = false, onClose = () => {} }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    resetFilters,
    filteredBooks,
    setCurrentPage
  } = useBooks();

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (mobile) onClose();
  };

  const handleRatingClick = (stars) => {
    setMinRating(minRating === stars ? 0 : stars);
    setCurrentPage(1);
  };

  const handleReset = () => {
    resetFilters();
    if (mobile) onClose();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-slate-800 text-sm">Filter Catalog</h3>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Sort By (useful on mobile inside drawer) */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full text-xs font-medium p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Genres & Categories
        </label>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition text-left ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Price Range
          </label>
          <span className="text-xs font-bold text-indigo-600">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="60"
          step="5"
          value={priceRange[1]}
          onChange={(e) => {
            setPriceRange([priceRange[0], Number(e.target.value)]);
            setCurrentPage(1);
          }}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>$0</span>
          <span>Max: ${priceRange[1]}</span>
          <span>$60+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Customer Rating
        </label>
        <div className="space-y-1.5">
          {[4, 3, 2].map((stars) => {
            const isSelected = minRating === stars;
            return (
              <button
                key={stars}
                onClick={() => handleRatingClick(stars)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition ${
                  isSelected
                    ? 'bg-amber-50 text-amber-900 border border-amber-200 font-semibold'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < stars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span>& Up</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock Filter */}
      <div className="pt-2 border-t border-slate-200">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => {
              setInStockOnly(e.target.checked);
              setCurrentPage(1);
            }}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
          />
          <span className="text-xs font-medium text-slate-700">In Stock Only</span>
        </label>
      </div>

      {/* Results badge */}
      <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
        <p className="text-xs text-slate-500">
          Showing <strong className="text-indigo-600">{filteredBooks.length}</strong> matching books
        </p>
      </div>
    </div>
  );
};
