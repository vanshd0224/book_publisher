'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, ShieldCheck, CreditCard, FileText, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';

export default function CheckoutPage() {
  const [cart, setCart] = useState<any>(null);
  const [buyerType, setBuyerType] = useState<'INDIVIDUAL' | 'INSTITUTIONAL'>('INDIVIDUAL');
  const [shippingAddress, setShippingAddress] = useState('');
  const [tdsExpected, setTdsExpected] = useState(0);
  const [poFile, setPoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderCreated, setOrderCreated] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/cart').then((res: any) => setCart(res.data)).catch(() => {});
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (!cart || !cart.items || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      const items = cart.items.map((i: any) => ({ productId: i.productId, quantity: i.quantity }));

      if (buyerType === 'INDIVIDUAL') {
        const res: any = await api.post('/orders/create', {
          items,
          shippingAddress,
          paymentMethod: 'RAZORPAY',
        });
        setOrderCreated(res.data);
        alert(`Individual order #${res.data.order.id} created! Opening Razorpay Checkout...`);
      } else {
        const res: any = await api.post('/orders/institutional', {
          items,
          shippingAddress,
          paymentMethod: 'PO',
          tdsExpected,
        });

        const createdOrder = res.data.order;
        setOrderCreated(res.data);

        // Upload PO file if provided
        if (poFile) {
          const formData = new FormData();
          formData.append('file', poFile);
          await api.post(`/orders/${createdOrder.id}/upload-po`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          alert('PO document uploaded successfully!');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderCreated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
        <h1 className="text-3xl font-extrabold text-slate-900">Order Placed Successfully!</h1>
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-left space-y-2 text-sm text-slate-700">
          <div><strong>Order ID:</strong> {orderCreated.order?.id}</div>
          <div><strong>Order Type:</strong> {orderCreated.order?.orderType}</div>
          <div><strong>Status:</strong> {orderCreated.order?.status}</div>
          <div><strong>Total Payable:</strong> ₹{orderCreated.order?.total?.toLocaleString('en-IN')}</div>
        </div>
        <p className="text-xs text-slate-500">
          Tax invoice PDF will be generated and delivered to your registered email via SendGrid once verified.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Checkout</h1>
        <p className="text-slate-600 text-sm mt-1">Complete your purchase for Essentials of Medical Device Clinical Research.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2 text-sm font-medium border border-red-200">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Buyer Type Switcher */}
      <div className="grid grid-cols-2 gap-4 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => setBuyerType('INDIVIDUAL')}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${
            buyerType === 'INDIVIDUAL' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CreditCard className="h-4 w-4" />
          Individual Buyer (Card/UPI via Razorpay)
        </button>

        <button
          type="button"
          onClick={() => setBuyerType('INSTITUTIONAL')}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${
            buyerType === 'INSTITUTIONAL' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="h-4 w-4" />
          Institutional Buyer (PO & Bank Transfer)
        </button>
      </div>

      <form onSubmit={handleCheckout} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-900">Shipping / Delivery Address *</label>
          <textarea
            required
            rows={3}
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Complete college library, department, or home delivery address..."
            className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
          />
        </div>

        {buyerType === 'INSTITUTIONAL' && (
          <div className="space-y-6 border-t border-slate-100 pt-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-900">Expected TDS Amount (if deducted by Govt College)</label>
              <input
                type="number"
                min="0"
                value={tdsExpected}
                onChange={(e) => setTdsExpected(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-900">Upload Purchase Order (PO) Document (PDF/JPG)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setPoFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="po-file-input"
                />
                <label htmlFor="po-file-input" className="cursor-pointer text-sky-600 font-semibold text-sm hover:underline">
                  {poFile ? poFile.name : 'Click to upload PO Document'}
                </label>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-400 text-white font-bold py-3.5 rounded-lg shadow-md transition-colors"
        >
          {submitting ? 'Processing Order...' : buyerType === 'INDIVIDUAL' ? 'Pay via Razorpay' : 'Submit Institutional PO Order'}
        </button>
      </form>
    </div>
  );
}
