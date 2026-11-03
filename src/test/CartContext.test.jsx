import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext';

const sampleBook = {
  id: 'test-1',
  title: 'Test Book One',
  author: 'Test Author',
  price: 20.00,
  originalPrice: 30.00,
  stock: 5,
  category: 'Fiction'
};

const sampleBookTwo = {
  id: 'test-2',
  title: 'Test Book Two',
  author: 'Another Author',
  price: 15.00,
  originalPrice: 20.00,
  stock: 2,
  category: 'Sci-Fi'
};

const TestCartConsumer = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItemCount,
    applyCoupon,
    discountAmount,
    totalAmount,
    placeOrder,
    orders
  } = useCart();

  return (
    <div>
      <span data-testid="item-count">{totalItemCount}</span>
      <span data-testid="subtotal">{subtotal}</span>
      <span data-testid="discount">{discountAmount}</span>
      <span data-testid="total">{totalAmount}</span>
      <span data-testid="orders-count">{orders.length}</span>

      <button onClick={() => addToCart(sampleBook, 1)} data-testid="add-btn">
        Add Book 1
      </button>
      <button onClick={() => addToCart(sampleBookTwo, 1)} data-testid="add-btn-2">
        Add Book 2
      </button>
      <button onClick={() => updateQuantity('test-1', 3)} data-testid="update-qty-btn">
        Update Qty to 3
      </button>
      <button onClick={() => removeFromCart('test-1')} data-testid="remove-btn">
        Remove Book 1
      </button>
      <button onClick={() => clearCart()} data-testid="clear-btn">
        Clear Cart
      </button>
      <button onClick={() => applyCoupon('BOOKWORM10')} data-testid="apply-coupon-btn">
        Apply Coupon
      </button>
      <button
        onClick={() =>
          placeOrder({
            customerInfo: { name: 'John Doe', email: 'john@example.com', phone: '123' },
            shippingAddress: { street: 'Main St', city: 'City', state: 'ST', zipCode: '12345', country: 'US' },
            paymentMethod: { type: 'card', details: 'Visa ending 4242' }
          })
        }
        data-testid="place-order-btn"
      >
        Place Order
      </button>
    </div>
  );
};

describe('Cart Context & Calculations', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('initially has empty cart with 0 items', () => {
    render(
      <CartProvider>
        <TestCartConsumer />
      </CartProvider>
    );

    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('subtotal')).toHaveTextContent('0');
  });

  it('adds item to cart and calculates subtotal correctly', () => {
    render(
      <CartProvider>
        <TestCartConsumer />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-btn').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('1');
    expect(screen.getByTestId('subtotal')).toHaveTextContent('20');
  });

  it('updates quantity and adjusts subtotal accordingly', () => {
    render(
      <CartProvider>
        <TestCartConsumer />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-btn').click();
      screen.getByTestId('update-qty-btn').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('3');
    expect(screen.getByTestId('subtotal')).toHaveTextContent('60');
  });

  it('applies promotional discount coupon correctly', () => {
    render(
      <CartProvider>
        <TestCartConsumer />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-btn').click(); // $20
      screen.getByTestId('apply-coupon-btn').click(); // 10% off $20 = $2
    });

    expect(screen.getByTestId('discount')).toHaveTextContent('2');
  });

  it('removes item from cart', () => {
    render(
      <CartProvider>
        <TestCartConsumer />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-btn').click();
      screen.getByTestId('remove-btn').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
  });

  it('clears cart and places order successfully', () => {
    render(
      <CartProvider>
        <TestCartConsumer />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-btn').click();
      screen.getByTestId('place-order-btn').click();
    });

    // Cart should be cleared and order recorded
    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('orders-count')).toHaveTextContent('1');
  });
});
