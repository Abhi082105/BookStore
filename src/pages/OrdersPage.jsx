import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Calendar,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrdersPage = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-10 border border-slate-200/80 shadow-xs text-center space-y-5">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">No Orders Yet</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              You haven't placed any book orders yet. Once you complete a purchase, you can track it right here!
            </p>
          </div>
          <div>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
            >
              <span>Explore Bookstore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Order History & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View details, tracking status, and receipts for your past purchases.
          </p>
        </div>
        <Link
          to="/books"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition hover:border-slate-300"
          >
            {/* Order Header */}
            <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Order Placed
                  </span>
                  <span className="font-bold text-slate-800">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Total Amount
                  </span>
                  <span className="font-bold text-indigo-600">
                    ${order.totals.totalAmount.toFixed(2)}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    Order Number
                  </span>
                  <span className="font-mono font-bold text-slate-800">
                    #{order.orderId}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{order.status || 'Confirmed'}</span>
                </span>

                <Link
                  to={`/order-success/${order.orderId}`}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 transition"
                  title="View Receipt"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Tracker Progress Bar */}
            <div className="px-6 py-4 border-b border-slate-100 bg-white">
              <div className="flex items-center justify-between max-w-xl mx-auto text-[11px] font-bold text-slate-700">
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <span>Order Placed</span>
                </div>
                <div className="h-0.5 flex-1 mx-2 bg-emerald-400" />

                <div className="flex items-center gap-1.5 text-emerald-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <span>Processing</span>
                </div>
                <div className="h-0.5 flex-1 mx-2 bg-indigo-200" />

                <div className="flex items-center gap-1.5 text-indigo-600">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] animate-pulse">
                    3
                  </div>
                  <span>In Transit</span>
                </div>
                <div className="h-0.5 flex-1 mx-2 bg-slate-200" />

                <div className="flex items-center gap-1.5 text-slate-400">
                  <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">
                    4
                  </div>
                  <span>Delivered</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 divide-y divide-slate-100">
              {order.items.map((item) => (
                <div key={item.book.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.book.coverImage}
                      alt={item.book.title}
                      className="w-14 h-20 object-cover rounded-xl bg-slate-100 shadow-xs"
                    />
                    <div>
                      <Link to={`/books/${item.book.id}`}>
                        <h4 className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition line-clamp-1">
                          {item.book.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-slate-500">by {item.book.author}</p>
                      <div className="flex items-center gap-3 text-xs mt-1">
                        <span className="text-slate-700 font-semibold">
                          ${item.book.price.toFixed(2)} each
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-indigo-600 font-bold">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span>
                  Delivering to: <strong className="text-slate-700">{order.shippingAddress.street}, {order.shippingAddress.city}</strong>
                </span>
              </div>
              <Link
                to={`/order-success/${order.orderId}`}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
              >
                View Printable Receipt
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
