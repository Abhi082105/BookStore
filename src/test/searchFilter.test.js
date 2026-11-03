import { describe, it, expect } from 'vitest';
import { initialBooksData } from '../data/booksData';

describe('Search and Filter Catalog Utilities', () => {
  it('correctly filters books by title substring match', () => {
    const query = 'atomic';
    const matches = initialBooksData.filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase())
    );
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].title).toBe('Atomic Habits');
  });

  it('correctly filters books by author name match', () => {
    const query = 'Andy Weir';
    const matches = initialBooksData.filter((b) =>
      b.author.toLowerCase().includes(query.toLowerCase())
    );
    expect(matches.length).toBe(1);
    expect(matches[0].title).toBe('Project Hail Mary');
  });

  it('filters books accurately by selected genre category', () => {
    const category = 'Technology';
    const matches = initialBooksData.filter((b) => b.category === category);
    expect(matches.length).toBeGreaterThan(0);
    matches.forEach((book) => {
      expect(book.category).toBe('Technology');
    });
  });

  it('filters books within a defined price range', () => {
    const minPrice = 15;
    const maxPrice = 25;
    const matches = initialBooksData.filter(
      (b) => b.price >= minPrice && b.price <= maxPrice
    );
    expect(matches.length).toBeGreaterThan(0);
    matches.forEach((book) => {
      expect(book.price).toBeGreaterThanOrEqual(minPrice);
      expect(book.price).toBeLessThanOrEqual(maxPrice);
    });
  });

  it('filters books by minimum customer rating', () => {
    const minRating = 4.8;
    const matches = initialBooksData.filter((b) => b.rating >= minRating);
    expect(matches.length).toBeGreaterThan(0);
    matches.forEach((book) => {
      expect(book.rating).toBeGreaterThanOrEqual(minRating);
    });
  });

  it('sorts books by price ascending (low to high)', () => {
    const sorted = [...initialBooksData].sort((a, b) => a.price - b.price);
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].price).toBeLessThanOrEqual(sorted[i + 1].price);
    }
  });

  it('sorts books alphabetically by title A to Z', () => {
    const sorted = [...initialBooksData].sort((a, b) => a.title.localeCompare(b.title));
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].title.localeCompare(sorted[i + 1].title)).toBeLessThanOrEqual(0);
    }
  });
});
