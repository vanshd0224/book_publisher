import React, { useState, useEffect } from 'react';
import { ActiveView } from './types';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { PreviewModal } from './components/preview/PreviewModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { BooksView } from './views/BooksView';
import { PreviewView } from './views/PreviewView';
import { ReviewsView } from './views/ReviewsView';
import { ContactView } from './views/ContactView';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const { toastMessage } = useCart();

  // Sync with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'about', 'books', 'preview', 'reviews', 'contact'].includes(hash)) {
        setActiveView(hash as ActiveView);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetView = (view: ActiveView) => {
    setActiveView(view);
    window.location.hash = view;
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col font-sans selection:bg-gold selection:text-obsidian-950">
      
      {/* Sticky Top Navbar */}
      <Navbar activeView={activeView} setActiveView={handleSetView} />

      {/* Main Content View Container */}
      <main className="flex-1">
        {activeView === 'home' && <HomeView setActiveView={handleSetView} />}
        {activeView === 'about' && <AboutView setActiveView={handleSetView} />}
        {activeView === 'books' && <BooksView setActiveView={handleSetView} />}
        {activeView === 'preview' && <PreviewView setActiveView={handleSetView} />}
        {activeView === 'reviews' && <ReviewsView setActiveView={handleSetView} />}
        {activeView === 'contact' && <ContactView setActiveView={handleSetView} />}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <PreviewModal />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[2500] bg-obsidian-900 border-2 border-gold text-white px-5 py-3.5 rounded-2xl shadow-luxury flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-gold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-xs font-semibold text-gold-light">{toastMessage}</span>
        </div>
      )}

      {/* Luxury Footer */}
      <Footer setActiveView={handleSetView} />

    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
