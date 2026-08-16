'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Building2, Tag } from 'lucide-react';
import { api } from '@/lib/api';

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = () => {
    setLoading(true);
    api
      .get('/cart')
      .then((res: any) => {
        setCart(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId: string, newQty: number) => {
    if (newQty <= 0) return;
    try {
      await api.put(`/cart/update/${itemId}`, { quantity: newQty });
      fetchCart();
    } catch (e: any) {
      alert(e.message || 'Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await api.delete(`/cart/remove/${itemId}`);
      fetchCart();
    } catch (e: any) {
      alert(e.message || 'Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-sky-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-600 text-sm font-medium">Calculating cart totals & dynamic bulk discounts...</p>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="h-16 w-16 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-800">Your cart is currently empty</h2>
        <p className="text-slate-600 text-sm">
          Browse the 3-volume hardcover book series and add items to view bulk discount pricing.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-2"
        >
          View Book Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Cart & Bulk Pricing</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item: any) => (
            <div key={item.id} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">{item.productTitle}</h3>
                <div className="text-xs text-slate-500 font-mono">HSN Code: {item.hsnCode || '4901'} (0% GST)</div>
                <div className="text-sm font-semibold text-slate-700">₹{item.unitPrice.toLocaleString('en-IN')} per unit</div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center border border-slate-300 rounded-md">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-l-md"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 font-semibold text-slate-800 text-sm">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-r-md"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-slate-900 text-base">₹{item.itemSubtotal.toLocaleString('en-IN')}</div>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Dynamic Discount Breakdown */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6 h-fit">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Total Quantity</span>
              <span className="font-semibold text-slate-900">{cart.totalQuantity} units</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">₹{cart.subtotal.toLocaleString('en-IN')}</span>
            </div>

            {cart.applicableDiscountPercent > 0 && (
              <div className="flex justify-between text-emerald-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 font-medium">
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  Bulk Discount ({cart.applicableDiscountPercent}%)
                </span>
                <span>- ₹{cart.discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>GST (0% Printed Books)</span>
              <span className="font-semibold text-slate-900">₹0.00</span>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
              <span className="text-base font-bold text-slate-900">Total Amount</span>
              <span className="text-2xl font-extrabold text-sky-700">₹{cart.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg shadow transition-colors"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/leads"
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-semibold py-2.5 rounded-lg border border-slate-800 text-xs transition-colors"
            >
              <Building2 className="h-4 w-4" />
              Request Official Purchase Order (PO) Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
