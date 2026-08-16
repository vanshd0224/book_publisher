import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Sparkles, BookOpen, Truck } from 'lucide-react';
import { BOOKS_DATA, BUNDLE_DATA } from '../../data/booksData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    savings,
    formatPrice,
    addToCart,
    clearCart,
    setIsCheckoutOpen
  } = useCart();

  // Close on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCartOpen]);

  if (!isCartOpen) return null;

  const hasBundle = cart.some((i) => i.id === 'bundle');

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[2000] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-obsidian-950/85 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-900 border-l border-gold/30 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-950/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-lg tracking-wide">Your Order</h3>
                <p className="text-xs text-slate-400">Official Publisher Direct Dispatch</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-gold/50 flex items-center justify-center transition-all cursor-pointer group"
              aria-label="Close cart"
              title="Close cart (Esc)"
            >
              <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            
            {/* Upsell to Bundle if only single books in cart */}
            {!hasBundle && cart.length > 0 && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/40 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gold-light">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Save 28% with the 4-Volume Collector Set</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Get all 4 volumes in premium edition with complete digital regulatory appendices.
                  </p>
                </div>
                <button
                  onClick={() => addToCart('bundle')}
                  className="px-3 py-1.5 bg-gold hover:bg-gold-light text-obsidian-950 font-bold text-[10px] rounded-lg uppercase tracking-wider whitespace-nowrap"
                >
                  Upgrade Set
                </button>
              </div>
            )}

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-obsidian-800 border border-white/10 flex items-center justify-center text-slate-500">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-white">Your Cart is Empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Select a single volume or order the complete 4-volume collector edition to accelerate your clinical research.
                  </p>
                </div>
                <div className="pt-2 flex flex-col items-center gap-3">
                  <button
                    onClick={() => {
                      addToCart('bundle');
                    }}
                    className="w-full max-w-xs px-6 py-2.5 rounded-lg bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Add Complete 4-Volume Set
                  </button>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs text-slate-400 hover:text-gold transition-colors font-medium cursor-pointer underline underline-offset-4"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-obsidian-850 border border-white/10 hover:border-gold/30 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-obsidian-950 border border-gold/20 flex items-center justify-center p-0.5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full rounded ${item.id === 'bundle' ? 'object-cover object-[18%_center]' : 'object-contain'}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{item.subtitle}</p>
                      
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border border-white/15 rounded-lg bg-obsidian-900">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-slate-400 hover:text-white text-xs"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-slate-400 hover:text-white text-xs"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-gold-light">
                        {formatPrice(item.priceUSD * item.quantity, item.priceINR * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-[10px] text-slate-500">
                          {formatPrice(item.priceUSD, item.priceINR)} each
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-1">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-obsidian-950/80 space-y-4">
              
              {/* Savings & Subtotal summary */}
              <div className="space-y-2">
                {savings > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-400">
                    <span>Bundle Discount Savings</span>
                    <span className="font-semibold">-{formatPrice(savings)}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-gold" />
                    <span>Global Express Shipping</span>
                  </span>
                  <span className="text-emerald-400 font-semibold uppercase text-[10px] tracking-wider">FREE</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="font-serif text-base font-bold text-white">Estimated Subtotal</span>
                  <span className="text-xl font-serif font-bold text-gold-light">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:shadow-gold-glow flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted • Direct Publisher Fulfillment</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
