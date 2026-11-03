import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, X, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const CartSummary = ({ showCheckoutBtn = true }) => {
  const {
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    totalAmount,
    totalSavings,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cart
  } = useCart();

  const { showToast } = useToast();
  const [promoInput, setPromoInput] = useState('');

  const handleApply = (codeToApply) => {
    const code = codeToApply || promoInput;
    if (!code) return;
    const res = applyCoupon(code);
    if (res.success) {
      showToast(res.message, 'success');
      setPromoInput('');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
      <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
        Order Summary
      </h3>

      {/* Savings Callout */}
      {totalSavings > 0 && (
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center gap-2.5 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>You are saving ${totalSavings.toFixed(2)} on this order!</span>
        </div>
      )}

      {/* Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Items Subtotal</span>
          <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between items-center text-emerald-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Coupon ({appliedCoupon.code})</span>
              <button
                onClick={removeCoupon}
                className="text-slate-400 hover:text-rose-500 p-0.5 rounded transition"
                title="Remove Coupon"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <div className="flex items-center gap-1">
            <span>Shipping</span>
            {shippingCost === 0 && (
              <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.2 rounded">
                FREE
              </span>
            )}
          </div>
          <span className="font-semibold text-slate-800">
            {shippingCost === 0 ? '$0.00' : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Estimated Sales Tax (5%)</span>
          <span className="font-semibold text-slate-800">${taxAmount.toFixed(2)}</span>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-slate-900">
          <span className="text-base font-bold">Total</span>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-indigo-600">
              ${totalAmount.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-400 block">USD includes all taxes</span>
          </div>
        </div>
      </div>

      {/* Coupon input */}
      <div className="pt-2 border-t border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Have a Promo Code?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
            placeholder="e.g. BOOKWORM10"
            className="flex-1 px-3 py-2 text-xs uppercase font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
          <button
            onClick={() => handleApply()}
            disabled={!promoInput.trim()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition disabled:opacity-40"
          >
            Apply
          </button>
        </div>

        {/* Quick Promo Pills */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          <button
            type="button"
            onClick={() => handleApply('BOOKWORM10')}
            className="text-[11px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-md border border-indigo-200/60 transition"
          >
            🏷️ BOOKWORM10 (10% Off)
          </button>
          <button
            type="button"
            onClick={() => handleApply('SAVE5')}
            className="text-[11px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-md border border-indigo-200/60 transition"
          >
            🏷️ SAVE5 ($5 Off)
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      {showCheckoutBtn && (
        <div>
          <Link
            to="/checkout"
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
              cart.length === 0
                ? 'bg-slate-200 text-slate-400 pointer-events-none'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 active:scale-[0.98]'
            }`}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Guaranteed Safe & Secure Checkout</span>
          </div>
        </div>
      )}
    </div>
  );
};
