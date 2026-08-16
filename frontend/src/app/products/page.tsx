'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart, Check, BookOpen, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get('/products')
      .then((res: any) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load products');
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await api.post('/cart/add', { productId, quantity: 1 });
      setAddedId(productId);
      setTimeout(() => setAddedId(null), 2500);
    } catch (err: any) {
      alert(err.message || 'Failed to add item to cart');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-sky-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-600 text-sm font-medium">Loading catalog from backend API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg inline-flex items-center gap-2 text-sm font-medium border border-red-200">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Book Catalog & Volume Series</h1>
        <p className="text-slate-600 text-sm mt-1">
          Select individual hardcover volumes or purchase the complete 3-volume master set.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {product.volumeNumber === 0 ? 'COMPLETE BUNDLE' : `VOLUME ${product.volumeNumber}`}
                </span>
                <span className="text-xs text-slate-500 font-mono">ISBN: {product.isbn}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">{product.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed line-clamp-4">{product.description}</p>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-xs text-emerald-600 font-medium">HSN 4901 (0% GST)</span>
              </div>

              <button
                onClick={() => handleAddToCart(product.id)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  addedId === product.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-sky-600 hover:bg-sky-500 text-white'
                }`}
              >
                {addedId === product.id ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
