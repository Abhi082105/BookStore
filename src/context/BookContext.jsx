import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { initialBooksData } from '../data/booksData';

const BookContext = createContext(null);

const STORAGE_KEY_BOOKS = 'bookstore_books_catalog';
const STORAGE_KEY_WISHLIST = 'bookstore_wishlist';

export const BookProvider = ({ children }) => {
  // Books list
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKS);
      return saved ? JSON.parse(saved) : initialBooksData;
    } catch {
      return initialBooksData;
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Persist books changes (e.g. when user submits reviews or stock updates)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(books));
    } catch (e) {
      console.error('Failed to save books', e);
    }
  }, [books]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Wishlist toggling
  const toggleWishlist = (book) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === book.id);
      if (exists) {
        return prev.filter((item) => item.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  };

  const isWishlisted = (bookId) => {
    return wishlist.some((b) => b.id === bookId);
  };

  // Add review
  const addReview = (bookId, { author, rating, comment }) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          const newReview = {
            id: 'rev-' + Date.now(),
            author: author || 'Anonymous Reader',
            rating: Number(rating),
            comment,
            date: new Date().toISOString().split('T')[0]
          };
          const updatedReviews = [newReview, ...book.reviews];
          const avgRating = (
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          ).toFixed(1);

          return {
            ...book,
            reviews: updatedReviews,
            rating: parseFloat(avgRating),
            reviewCount: updatedReviews.length
          };
        }
        return book;
      })
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([0, 100]);
    setMinRating(0);
    setSortBy('featured');
    setInStockOnly(false);
    setCurrentPage(1);
  };

  // Filtered & Sorted books calculation
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchTitle = book.title.toLowerCase().includes(query);
          const matchAuthor = book.author.toLowerCase().includes(query);
          const matchCategory = book.category.toLowerCase().includes(query);
          const matchISBN = book.isbn ? book.isbn.toLowerCase().includes(query) : false;
          if (!matchTitle && !matchAuthor && !matchCategory && !matchISBN) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && book.category !== selectedCategory) {
          return false;
        }

        // Price filter
        if (book.price < priceRange[0] || book.price > priceRange[1]) {
          return false;
        }

        // Rating filter
        if (book.rating < minRating) {
          return false;
        }

        // In-stock filter
        if (inStockOnly && book.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
          case 'featured':
          default:
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return b.rating - a.rating;
        }
      });
  }, [books, searchQuery, selectedCategory, priceRange, minRating, inStockOnly, sortBy]);

  // Paginated books
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBooks, currentPage, itemsPerPage]);

  const getBookById = (id) => {
    return books.find((b) => b.id === id);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        filteredBooks,
        paginatedBooks,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        searchQuery,
        setSearchQuery,
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
        getBookById,
        addReview,
        wishlist,
        toggleWishlist,
        isWishlisted
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
