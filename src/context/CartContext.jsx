import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { COUPONS } from '../data/booksData';

const CartContext = createContext(null);

const STORAGE_KEY_CART = 'bookstore_cart_items';
const STORAGE_KEY_ORDERS = 'bookstore_placed_orders';

export const CartProvider = ({ children }) => {
  // Cart items: [{ book, quantity }]
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Applied Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Selected Shipping Method: 'standard' | 'express' | 'next-day'
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Past Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Add to cart
  const addToCart = (book, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.book.id === book.id);
      if (existingIndex > -1) {
        const currentQty = prevCart[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, book.stock);
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        return updated;
      } else {
        const initialQty = Math.min(quantity, book.stock);
        return [...prevCart, { book, quantity: initialQty }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (bookId) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  // Update item quantity
  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.book.id === bookId) {
          const clampedQty = Math.min(newQuantity, item.book.stock);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  // Coupon handling
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      return { success: false, message: 'Please enter a coupon code.' };
    }
    if (COUPONS[clean]) {
      setAppliedCoupon({ code: clean, ...COUPONS[clean] });
      setCouponCode(clean);
      return { success: true, message: `Coupon "${clean}" applied successfully!` };
    }
    return { success: false, message: 'Invalid coupon code. Try BOOKWORM10 or SAVE5' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  // Calculations
  const totalItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  }, [cart]);

  const originalTotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + (item.book.originalPrice || item.book.price) * item.quantity,
      0
    );
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') {
      return subtotal * appliedCoupon.discount;
    }
    if (appliedCoupon.type === 'fixed') {
      return Math.min(subtotal, appliedCoupon.discount);
    }
    return 0;
  }, [subtotal, appliedCoupon]);

  const shippingCost = useMemo(() => {
    if (cart.length === 0) return 0;
    if (appliedCoupon && appliedCoupon.type === 'shipping') return 0;

    if (shippingMethod === 'express') return 9.99;
    if (shippingMethod === 'next-day') return 14.99;

    // Standard shipping is free over $35, else $4.99
    return subtotal >= 35 ? 0 : 4.99;
  }, [cart.length, appliedCoupon, shippingMethod, subtotal]);

  const taxAmount = useMemo(() => {
    if (cart.length === 0) return 0;
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    return taxableAmount * 0.05; // 5% estimated tax
  }, [cart.length, subtotal, discountAmount]);

  const totalAmount = useMemo(() => {
    if (cart.length === 0) return 0;
    const amount = subtotal - discountAmount + shippingCost + taxAmount;
    return Math.max(0, amount);
  }, [cart.length, subtotal, discountAmount, shippingCost, taxAmount]);

  const totalSavings = useMemo(() => {
    const listSavings = Math.max(0, originalTotal - subtotal);
    return listSavings + discountAmount;
  }, [originalTotal, subtotal, discountAmount]);

  // Place order
  const placeOrder = ({ customerInfo, shippingAddress, paymentMethod }) => {
    const orderId = 'BK-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      date: new Date().toISOString(),
      items: [...cart],
      customerInfo,
      shippingAddress,
      shippingMethod,
      paymentMethod,
      totals: {
        subtotal,
        discountAmount,
        shippingCost,
        taxAmount,
        totalAmount,
        appliedCoupon: appliedCoupon ? appliedCoupon.code : null
      },
      status: 'Confirmed',
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (id) => {
    return orders.find((o) => o.orderId === id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        couponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shippingMethod,
        setShippingMethod,
        subtotal,
        originalTotal,
        discountAmount,
        shippingCost,
        taxAmount,
        totalAmount,
        totalSavings,
        totalItemCount,
        orders,
        placeOrder,
        getOrderById
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
