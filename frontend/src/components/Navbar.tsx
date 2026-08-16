'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, BookOpen, User, Building2, LayoutDashboard } from 'lucide-react';
import { api } from '@/lib/api';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('userRole');
      setUserRole(role);
    }

    // Fetch cart count
    api
      .get('/cart')
      .then((res: any) => {
        if (res?.data?.totalQuantity) {
          setCartCount(res.data.totalQuantity);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-bold text-lg tracking-tight">
          <BookOpen className="h-6 w-6 text-sky-400" />
          <span>Essentials of Medical Device Clinical Research</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="hover:text-sky-400 transition-colors">
            Books Catalog
          </Link>
          <Link href="/leads" className="flex items-center gap-1.5 hover:text-sky-400 transition-colors text-amber-400 font-semibold">
            <Building2 className="h-4 w-4" />
            Bulk Quote (Institutions)
          </Link>
          {userRole === 'ADMIN' && (
            <Link href="/admin" className="flex items-center gap-1 hover:text-sky-400 transition-colors text-emerald-400">
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
          )}
          <Link href="/cart" className="relative flex items-center gap-1 hover:text-sky-400 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-sky-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/login" className="flex items-center gap-1 bg-sky-600 hover:bg-sky-500 px-3.5 py-1.5 rounded-md transition-colors text-white font-medium">
            <User className="h-4 w-4" />
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
