import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold text-base mb-3">Essentials of Medical Device Clinical Research</h3>
          <p className="leading-relaxed mb-4 text-xs">
            The authoritative 3-volume hardcover book series by Dr. Ashish Indani. Designed for individual researchers, clinical investigators, and 1400+ medical colleges across India.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="h-4 w-4" />
            <span>GST Exempted under HSN Code 4901 (Printed Books Rule)</span>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold text-base mb-3">Institutional & Bulk Purchasing</h3>
          <ul className="space-y-2 text-xs">
            <li>• Bulk Discount Tiers: 5–19 sets (10% OFF), 20+ sets (20% OFF)</li>
            <li>• Proforma Invoice generation for accounts approval</li>
            <li>• Purchase Order (PO) & Bank Transfer payment support</li>
            <li>• TDS Reconciliation fields included on all invoices</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-base mb-3">Publisher & Support</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-sky-400" />
              <span>invoices@bookpublisher.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-sky-400" />
              <span>+91 98765 43210 (SMS / WhatsApp)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-400" />
              <span>New Delhi, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Book Publisher Platform. All rights reserved. Dr. Ashish Indani.
      </div>
    </footer>
  );
}
