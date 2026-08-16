'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Award, ArrowRight, Building2, CheckCircle2, ShoppingBag } from 'lucide-react';
import { api } from '@/lib/api';

export default function HomePage() {
  const handleAddToCartBundle = async () => {
    try {
      // Fetch bundle product ID from backend REST API
      const res: any = await api.get('/products?volumeNumber=0');
      const bundle = res.data?.[0];
      if (bundle) {
        await api.post('/cart/add', { productId: bundle.id, quantity: 1 });
        alert('3-Volume Hardcover Bundle Set added to cart successfully!');
        window.location.href = '/cart';
      }
    } catch (e: any) {
      alert(e.message || 'Failed to add item to cart');
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-sky-950 border border-sky-800 text-sky-400 px-3 py-1 rounded-full text-xs font-semibold">
              <Award className="h-4 w-4" />
              <span>By Dr. Ashish Indani</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Essentials of Medical Device Clinical Research
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              The definitive 3-volume hardcover master reference set covering medical device regulations, study design, ISO 14155, ethics, and PMCF for Indian and global markets.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleAddToCartBundle}
                className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
              >
                <ShoppingBag className="h-5 w-5" />
                Buy Complete Bundle (Rs. 9,500)
              </button>
              <Link
                href="/leads"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Building2 className="h-5 w-5" />
                Request Institutional Bulk Quote
              </Link>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-2xl space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-sky-400 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              The 3-Volume Collection Overview
            </h3>
            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Volume 1: Fundamentals & Regulations</strong>
                  <p className="text-xs text-slate-400">CDSCO India rules, ISO 14155, US FDA 510(k)/PMA, EU MDR.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Volume 2: Study Design & Management</strong>
                  <p className="text-xs text-slate-400">Clinical investigation protocol design, risk management, and data integrity.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Volume 3: Post-Market Surveillance & Ethics</strong>
                  <p className="text-xs text-slate-400">PMCF, medical device vigilance, ethics committee reviews, and RWE.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tiered Bulk Discount Engine Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-900 to-indigo-950 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-800">
          <div>
            <span className="text-sky-400 font-bold uppercase tracking-wider text-xs">Dynamic Backend Bulk Discounts</span>
            <h2 className="text-2xl font-bold mt-1">Ordering for Medical Colleges & Libraries?</h2>
            <p className="text-slate-300 text-sm mt-1">
              Automatic bulk discount pricing applied at checkout: 5–19 sets get <strong>10% OFF</strong>, 20+ sets get <strong>20% OFF</strong>.
            </p>
          </div>
          <Link
            href="/cart"
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>View Cart & Bulk Pricing</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Compliance & Institutional Support Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <ShieldCheck className="h-8 w-8 text-emerald-600" />
          <h3 className="font-bold text-slate-900">0% GST Compliance (HSN 4901)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Printed books are GST-exempt in India. Proforma and Final Tax Invoices automatically format HSN Code 4901 with 0% tax lines.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <Building2 className="h-8 w-8 text-sky-600" />
          <h3 className="font-bold text-slate-900">Purchase Order (PO) Upload</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Librarians and procurement authorities from 1400+ medical institutes can place orders via PO without upfront payment.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <Award className="h-8 w-8 text-indigo-600" />
          <h3 className="font-bold text-slate-900">SendGrid PDF Invoice Delivery</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Official tax invoices generated in-house as PDF files and delivered directly to your accounts department inbox.
          </p>
        </div>
      </section>
    </div>
  );
}
