import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { BookCard } from '../components/books/BookCard';
import { CartProvider } from '../context/CartContext';
import { BookProvider } from '../context/BookContext';
import { ToastProvider } from '../context/ToastContext';

const mockBook = {
  id: 'card-1',
  title: 'Mastering React Architecture',
  author: 'Jordan Walke',
  price: 29.99,
  originalPrice: 39.99,
  rating: 4.8,
  reviewCount: 420,
  category: 'Technology',
  coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
  stock: 10,
  format: 'Paperback'
};

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <BookProvider>
          <CartProvider>{ui}</CartProvider>
        </BookProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

describe('BookCard Component', () => {
  it('renders book details including title, author, price, and category', () => {
    renderWithProviders(<BookCard book={mockBook} />);

    expect(screen.getByText('Mastering React Architecture')).toBeInTheDocument();
    expect(screen.getByText('by Jordan Walke')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('$39.99')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
  });

  it('renders discount percentage badge when original price is higher', () => {
    renderWithProviders(<BookCard book={mockBook} />);

    // ((39.99 - 29.99) / 39.99) * 100 = 25%
    expect(screen.getByText('-25% OFF')).toBeInTheDocument();
  });

  it('has add to cart button', () => {
    renderWithProviders(<BookCard book={mockBook} />);

    const addButton = screen.getByRole('button', { name: /Add Mastering React Architecture to cart/i });
    expect(addButton).toBeInTheDocument();
  });
});
