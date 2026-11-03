import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Package,
  Calendar,
  Truck,
  Printer,
  ArrowRight,
  BookOpen,
  MapPin,
  CreditCard
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const { getOrderById } = useCart();

  const order = getOrderById(orderId);

  useEffect(() => {
    // Launch delightful confetti burst!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Order Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          We couldn't locate order #{orderId}. It may have expired or was placed on another device.
        </p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
        >
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Success Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md text-center space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-9 h-9" />
        </div>

        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600">
            Payment Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2">
            A confirmation receipt has been generated and dispatched to{' '}
            <strong className="text-slate-800 font-semibold">{order.customerInfo.email}</strong>.
          </p>
        </div>

        {/* Order ID & Estimated Delivery Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900 font-bold">
            Order ID: <span className="text-indigo-600 font-extrabold">{order.orderId}</span>
          </div>

          <div className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Estimated Delivery: <strong>{order.estimatedDelivery}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>

          <Link
            to="/orders"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold border border-indigo-200 transition"
          >
            <Package className="w-4 h-4" />
            <span>View All My Orders</span>
          </Link>

          <Link
            to="/books"
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-indigo-600/20"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Itemized Order Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          Items Ordered ({order.items.length})
        </h3>

        <div className="divide-y divide-slate-100">
          {order.items.map((item) => (
            <div key={item.book.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="w-12 h-16 object-cover rounded-lg bg-slate-100 shrink-0"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                    {item.book.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">by {item.book.author}</p>
                  <span className="text-[10px] text-indigo-600 font-semibold">
                    Qty: {item.quantity} × ${item.book.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-slate-800">
                  ${(item.book.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600 max-w-sm ml-auto">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold text-slate-800">
              ${order.totals.subtotal.toFixed(2)}
            </span>
          </div>

          {order.totals.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Discount ({order.totals.appliedCoupon || 'Promo'}):</span>
              <span>-${order.totals.discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="font-semibold text-slate-800">
              {order.totals.shippingCost === 0 ? 'FREE' : `$${order.totals.shippingCost.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Estimated Sales Tax:</span>
            <span className="font-semibold text-slate-800">
              ${order.totals.taxAmount.toFixed(2)}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
            <span>Total Paid:</span>
            <span className="text-indigo-600 text-base font-extrabold">
              ${order.totals.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Shipping and Payment Recap */}
        <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>Delivery Address</span>
            </div>
            <p className="text-slate-700 font-semibold">{order.customerInfo.name}</p>
            <p className="text-slate-500">{order.shippingAddress.street}</p>
            <p className="text-slate-500">
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zipCode}
            </p>
            <p className="text-slate-500">{order.shippingAddress.country}</p>
            <p className="text-slate-400 text-[11px] pt-1">Phone: {order.customerInfo.phone}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Payment Information</span>
            </div>
            <p className="text-slate-700 font-semibold uppercase">{order.paymentMethod.type}</p>
            <p className="text-slate-500">{order.paymentMethod.details}</p>
            <p className="text-slate-500">Status: <strong className="text-emerald-600 font-semibold">Payment Successful</strong></p>
            <p className="text-slate-400 text-[11px] pt-1">Processed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
