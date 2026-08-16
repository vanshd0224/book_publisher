import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Currency, PreviewTopic, VolumeId } from '../types';
import { BOOKS_DATA, BUNDLE_DATA } from '../data/booksData';

interface CartContextType {
  cart: CartItem[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedPreviewTopic: PreviewTopic | null;
  setSelectedPreviewTopic: (topic: PreviewTopic | null) => void;
  addToCart: (volumeId: VolumeId, quantity?: number) => void;
  removeFromCart: (volumeId: VolumeId) => void;
  updateQuantity: (volumeId: VolumeId, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  savings: number;
  formatPrice: (amountUSD: number, amountINR?: number) => string;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CURRENCY_RATES = {
  USD: { rate: 1, symbol: '$', prefix: true },
  INR: { rate: 83.5, symbol: '₹', prefix: true },
  EUR: { rate: 0.92, symbol: '€', prefix: false },
  GBP: { rate: 0.79, symbol: '£', prefix: true }
};

const normalizeVolumeId = (id: VolumeId): VolumeId => {
  if (id === 'vol1') return 'vol-1';
  if (id === 'vol2') return 'vol-2';
  if (id === 'vol3') return 'vol-3';
  if (id === 'vol4') return 'vol-4';
  return id;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dr_indani_cart');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        // Automatically sync latest image paths and metadata for bundle & individual books
        return parsed.map((item) => {
          const normId = normalizeVolumeId(item.id);
          if (normId === 'bundle') {
            return {
              ...item,
              id: 'bundle',
              image: BUNDLE_DATA.image,
              title: BUNDLE_DATA.title,
              subtitle: BUNDLE_DATA.subtitle
            };
          }
          const book = BOOKS_DATA.find((b) => normalizeVolumeId(b.id) === normId);
          if (book) {
            return {
              ...item,
              id: book.id,
              image: book.image,
              title: `${book.volRoman}: ${book.title}`,
              subtitle: book.subtitle
            };
          }
          return item;
        });
      }
      return [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState<Currency>('USD');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedPreviewTopic, setSelectedPreviewTopic] = useState<PreviewTopic | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('dr_indani_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (rawVolumeId: VolumeId, quantity = 1) => {
    const volumeId = normalizeVolumeId(rawVolumeId);
    setCart((prev) => {
      const existing = prev.find((item) => normalizeVolumeId(item.id) === volumeId);
      if (existing) {
        return prev.map((item) =>
          normalizeVolumeId(item.id) === volumeId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      if (volumeId === 'bundle') {
        const newItem: CartItem = {
          id: 'bundle',
          title: BUNDLE_DATA.title,
          subtitle: BUNDLE_DATA.subtitle,
          image: BUNDLE_DATA.image,
          priceUSD: BUNDLE_DATA.priceUSD,
          priceINR: BUNDLE_DATA.priceINR,
          quantity,
          isBundle: true
        };
        showToast('Added Complete 4-Volume Collector Set to Cart!');
        return [...prev, newItem];
      }

      const book = BOOKS_DATA.find((b) => normalizeVolumeId(b.id) === volumeId);
      if (book) {
        const newItem: CartItem = {
          id: book.id,
          title: `${book.volRoman}: ${book.title}`,
          subtitle: book.subtitle,
          image: book.image,
          priceUSD: book.priceUSD,
          priceINR: book.priceINR,
          quantity,
          isBundle: false
        };
        showToast(`Added ${book.volRoman} to Cart!`);
        return [...prev, newItem];
      }
      return prev;
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (rawVolumeId: VolumeId) => {
    const volumeId = normalizeVolumeId(rawVolumeId);
    setCart((prev) => prev.filter((item) => normalizeVolumeId(item.id) !== volumeId));
  };

  const updateQuantity = (rawVolumeId: VolumeId, qty: number) => {
    const volumeId = normalizeVolumeId(rawVolumeId);
    if (qty <= 0) {
      removeFromCart(volumeId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (normalizeVolumeId(item.id) === volumeId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    if (currency === 'INR') {
      return total + item.priceINR * item.quantity;
    }
    const converted = item.priceUSD * CURRENCY_RATES[currency].rate;
    return total + converted * item.quantity;
  }, 0);

  const savings = cart.reduce((total, item) => {
    if (item.isBundle) {
      const origUSD = BUNDLE_DATA.originalPriceUSD;
      const saveUSD = origUSD - BUNDLE_DATA.priceUSD;
      if (currency === 'INR') {
        return total + (BUNDLE_DATA.originalPriceINR - BUNDLE_DATA.priceINR) * item.quantity;
      }
      return total + (saveUSD * CURRENCY_RATES[currency].rate) * item.quantity;
    }
    return total;
  }, 0);

  const formatPrice = (amountUSD: number, amountINR?: number): string => {
    if (currency === 'INR') {
      const val = amountINR ?? Math.round(amountUSD * 83.5);
      return `₹${val.toLocaleString('en-IN')}`;
    }
    const config = CURRENCY_RATES[currency];
    const converted = Math.round(amountUSD * config.rate);
    return config.prefix ? `${config.symbol}${converted}` : `${converted} ${config.symbol}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        currency,
        setCurrency,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedPreviewTopic,
        setSelectedPreviewTopic,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        savings,
        formatPrice,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
