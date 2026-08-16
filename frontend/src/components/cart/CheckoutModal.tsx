import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, CheckCircle, ShieldCheck, CreditCard, Building, MapPin, Truck, Sparkles, Download, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotal, formatPrice, clearCart } = useCart();
  
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    address: '',
    city: '',
    country: 'United States',
    postalCode: '',
    paymentMethod: 'card'
  });

  // Close on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep('success');
      clearCart();

      // Trigger Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4A44A', '#F0C97B', '#FFFFFF', '#060D15']
        });
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('form');
  };

  const orderId = `AI-MED-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-[2100] overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center relative">
        <div className="w-full max-w-2xl bg-obsidian-900 border border-gold/40 rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-6 bg-obsidian-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-lg tracking-wide">
                  {step === 'form' ? 'Secure Checkout' : 'Order Confirmed!'}
                </h3>
                <p className="text-xs text-slate-400">
                  {step === 'form' ? 'Direct Publisher Fulfillment & Priority Air Dispatch' : `Order Reference #${orderId}`}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {step === 'form' ? (
            <form onSubmit={handleSubmitOrder} className="p-6 md:p-8 space-y-6">
              
              {/* Order Summary Mini Bar */}
              <div className="p-4 rounded-xl bg-obsidian-850 border border-gold/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Items in Order</span>
                  <span className="text-sm font-semibold text-white">
                    {cart.reduce((s, i) => s + i.quantity, 0)} reference books
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Due (incl. Free Global Shipping)</span>
                  <span className="text-lg font-serif font-bold text-gold-light">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Recipient & Shipping Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Delivery Destination &amp; Recipient</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Dr. / Prof. / Full Name"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Professional Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@institution.com"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Organization / Hospital / University</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. MedTech Innovations Inc."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-slate-300 block mb-1">Shipping Street Address *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Suite, building number, street name"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Country *</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-800 border border-white/15 text-white focus:outline-none focus:border-gold"
                    >
                      <option value="United States">United States</option>
                      <option value="India">India</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Japan">Japan</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Other">Other International Destination</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector (Simulation) */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Payment Gateway</span>
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-gold bg-gold/10 text-white'
                        : 'border-white/10 bg-obsidian-850 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="text-gold focus:ring-gold"
                    />
                    <div className="text-left">
                      <span className="text-xs font-bold block text-slate-200">Credit / Debit Card</span>
                      <span className="text-[10px] text-slate-400">Visa, Mastercard, Amex</span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'invoice'
                        ? 'border-gold bg-gold/10 text-white'
                        : 'border-white/10 bg-obsidian-850 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'invoice'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'invoice' })}
                      className="text-gold focus:ring-gold"
                    />
                    <div className="text-left">
                      <span className="text-xs font-bold block text-slate-200">Corporate PO / Invoice</span>
                      <span className="text-[10px] text-slate-400">Institutional Net-30</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>30-Day Money-Back Quality Guarantee</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:shadow-gold-glow hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? 'Authorizing Dispatch...' : `Complete Order • ${formatPrice(subtotal)}`}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-950/70 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-xl">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">Order Successfully Dispatched</span>
                <h3 className="font-serif text-2xl font-bold text-white">Thank You, {formData.fullName || 'Doctor / Colleague'}</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your reference materials have been registered with B Jain Publishers. A formal confirmation and tracking courier dossier have been transmitted to <strong className="text-white">{formData.email || 'your email'}</strong>.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-4 rounded-xl bg-obsidian-850 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Order Number:</span>
                  <span className="font-mono text-gold-light font-bold">{orderId}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Arrival:</span>
                  <span className="text-slate-200">3–5 Business Days (Express Courier)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Destination:</span>
                  <span className="text-slate-200 truncate max-w-[200px]">{formData.city}, {formData.country}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm transition-all"
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
