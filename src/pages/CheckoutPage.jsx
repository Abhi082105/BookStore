import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
  Banknote,
  Smartphone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { CartSummary } from '../components/cart/CartSummary';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, placeOrder, shippingMethod, setShippingMethod, totalAmount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || user?.address?.fullName || '',
    email: user?.email || '',
    phone: user?.address?.phone || '+1 (555) 019-2834',
    street: user?.address?.street || '742 Evergreen Terrace',
    city: user?.address?.city || 'Springfield',
    state: user?.address?.state || 'OR',
    zipCode: user?.address?.zipCode || '97477',
    country: 'United States',
    paymentType: 'card', // 'card' | 'upi' | 'cod'
    cardNumber: '4242 •••• •••• 4242',
    cardName: user?.name || 'Alex Reader',
    cardExpiry: '12/28',
    cardCvv: '888',
    upiId: 'alexreader@okaxis'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          You don't have any books in your cart to checkout.
        </p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Books Catalog</span>
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim() || !formData.email.includes('@'))
      newErrors.email = 'Valid email is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!formData.street.trim()) newErrors.street = 'Street address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.state.trim()) newErrors.state = 'State is required.';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required.';

    if (formData.paymentType === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required.';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry is required.';
      if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV is required.';
    } else if (formData.paymentType === 'upi') {
      if (!formData.upiId.trim() || !formData.upiId.includes('@'))
        newErrors.upiId = 'Valid UPI ID is required (e.g. user@bank).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fill out all required checkout fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate payment authorization
    setTimeout(() => {
      const order = placeOrder({
        customerInfo: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: {
          type: formData.paymentType,
          details:
            formData.paymentType === 'card'
              ? `Card ending in ${formData.cardNumber.slice(-4)}`
              : formData.paymentType === 'upi'
              ? `UPI ID: ${formData.upiId}`
              : 'Cash on Delivery'
        }
      });

      setIsSubmitting(false);
      showToast('🎉 Order placed successfully!', 'success');
      navigate(`/order-success/${order.orderId}`);
    }, 1200);
  };

  const autoFillDemo = () => {
    setFormData({
      fullName: 'Alex Reader',
      email: 'alex@example.com',
      phone: '+1 (555) 234-5678',
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      zipCode: '97477',
      country: 'United States',
      paymentType: 'card',
      cardNumber: '4242 4242 4242 4242',
      cardName: 'Alex Reader',
      cardExpiry: '12/28',
      cardCvv: '888',
      upiId: 'alex@okhdfcbank'
    });
    setErrors({});
    showToast('Auto-filled with verified test details!', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Complete your shipping and payment details below.
          </p>
        </div>

        <button
          type="button"
          onClick={autoFillDemo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold border border-indigo-200 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Autofill Test Info</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section 1: Customer & Shipping Information */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-base">Shipping Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Reader"
                    className={`w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address (for order tracking) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className={`w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 234-5678"
                    className={`w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="123 Literary Boulevard, Apt 4B"
                    className={`w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.street
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
                    }`}
                  />
                  {errors.street && (
                    <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.street}</span>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Springfield"
                    className={`w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.city
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
                    }`}
                  />
                  {errors.city && (
                    <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.city}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="OR"
                      className={`w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.state
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
                      }`}
                    />
                    {errors.state && (
                      <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.state}</span>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      ZIP / Postal Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="97477"
                      className={`w-full p-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.zipCode
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
                      }`}
                    />
                    {errors.zipCode && (
                      <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.zipCode}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Speed Method */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-base">Delivery Options</h3>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                    shippingMethod === 'standard'
                      ? 'border-indigo-600 bg-indigo-50/50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Standard Delivery (3-5 business days)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Free on orders over $35, otherwise $4.99
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-600">Standard</span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                    shippingMethod === 'express'
                      ? 'border-indigo-600 bg-indigo-50/50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Express Tracked Shipping (2 business days)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Priority courier dispatch with live tracking
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-800">$9.99</span>
                </label>

                <label
                  onClick={() => setShippingMethod('next-day')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                    shippingMethod === 'next-day'
                      ? 'border-indigo-600 bg-indigo-50/50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'next-day'}
                      onChange={() => setShippingMethod('next-day')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Next-Day Priority Air (Tomorrow by 7 PM)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Fastest expedited courier delivery
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-800">$14.99</span>
                </label>
              </div>
            </div>

            {/* Section 3: Payment Method */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-base">Payment Method</h3>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentType: 'card' }))}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-xs font-semibold ${
                    formData.paymentType === 'card'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentType: 'upi' }))}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-xs font-semibold ${
                    formData.paymentType === 'upi'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI / Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, paymentType: 'cod' }))}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-xs font-semibold ${
                    formData.paymentType === 'cod'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Banknote className="w-4 h-4" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Card Inputs */}
              {formData.paymentType === 'card' && (
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="4242 4242 4242 4242"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Expires (MM/YY)
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        name="cardCvv"
                        maxLength="4"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        placeholder="•••"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Inputs */}
              {formData.paymentType === 'upi' && (
                <div className="pt-2 text-xs space-y-2">
                  <label className="block font-semibold text-slate-700">Virtual Payment Address (VPA)</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="username@okhdfcbank"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <p className="text-[11px] text-slate-400">A payment prompt will be sent to your UPI app for authorization.</p>
                </div>
              )}

              {/* COD notice */}
              {formData.paymentType === 'cod' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                  💵 You can pay with cash or card upon delivery to the courier driver.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order Button */}
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            <CartSummary showCheckoutBtn={false} />

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-emerald-200" />
              <span>
                {isSubmitting
                  ? 'Authorizing & Placing Order...'
                  : `Place Order • $${totalAmount.toFixed(2)}`}
              </span>
            </button>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>SSL Encrypted & Safe Checkout</span>
              </div>
              <p className="text-[11px] text-slate-400">
                By clicking "Place Order", you agree to PageTurn Bookstore's terms of service and delivery policy.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
