import React, { useState, useEffect } from 'react';
import { ActiveView } from '../../types';
import { useCart } from '../../context/CartContext';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobBooksOpen, setMobBooksOpen] = useState(false);
  const { cartCount, setIsCartOpen, addToCart } = useCart();

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    setMobileOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ══════════════════════════════════════
           HEADER / NAV (EXACT 1:1 REPLICA)
          ══════════════════════════════════════ */}
      <header id="header" className="site-header" role="banner">
        <div className="header-container">
          {/* Zone 1: Brand Area */}
          <button
            onClick={() => handleNav('home')}
            className="header-brand"
            aria-label="Dr. Ashish Indani - Home"
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center' }}
          >
            <div className="brand-monogram">
              <span className="monogram-text">AI</span>
            </div>
            <div className="brand-identity">
              <span className="brand-name">DR. ASHISH INDANI</span>
              <span className="brand-sub">Medical Device Clinical Research Expert</span>
            </div>
          </button>

          {/* Zone 2: Primary Navigation */}
          <nav className="header-nav" id="headerNav" aria-label="Primary Navigation">
            <ul className="nav-list">
              <li className="nav-item">
                <button
                  onClick={() => handleNav('home')}
                  className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNav('about')}
                  className={`nav-link ${activeView === 'about' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  About
                </button>
              </li>
              <li
                className="nav-item nav-has-dropdown"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNav('books')}
                  className={`nav-link nav-dropdown-trigger ${activeView === 'books' ? 'active' : ''}`}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>The Books</span>
                  <svg className="dropdown-caret" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="nav-dropdown-menu" role="menu" aria-label="The Books Submenu" style={{ display: 'block', opacity: 1, visibility: 'visible', transform: 'none' }}>
                    <button
                      onClick={() => handleNav('books')}
                      className="dropdown-item"
                      role="menuitem"
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <div className="item-title">Complete Collection</div>
                      <div className="item-desc">The 4-Volume Master Reference</div>
                    </button>
                    <div className="dropdown-divider" role="separator"></div>
                    <button
                      onClick={() => handleNav('books')}
                      className="dropdown-item"
                      role="menuitem"
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <div className="item-title">Volume I</div>
                      <div className="item-desc">Fundamentals &amp; Regulatory Pathways</div>
                    </button>
                    <button
                      onClick={() => handleNav('books')}
                      className="dropdown-item"
                      role="menuitem"
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <div className="item-title">Volume II</div>
                      <div className="item-desc">Scientific Core &amp; Risk Management</div>
                    </button>
                    <button
                      onClick={() => handleNav('books')}
                      className="dropdown-item"
                      role="menuitem"
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <div className="item-title">Volume III</div>
                      <div className="item-desc">Data Management &amp; Biostatistics</div>
                    </button>
                    <button
                      onClick={() => handleNav('books')}
                      className="dropdown-item"
                      role="menuitem"
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <div className="item-title">Volume IV</div>
                      <div className="item-desc">Software, AI &amp; Post-Market Evidence</div>
                    </button>
                  </div>
                )}
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNav('preview')}
                  className={`nav-link ${activeView === 'preview' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Preview &amp; Topics
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNav('reviews')}
                  className={`nav-link ${activeView === 'reviews' ? 'active' : ''}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Reviews
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleNav('about')}
                  className={`nav-link`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Speaking &amp; Advisory
                </button>
              </li>
            </ul>
          </nav>

          {/* Zone 3: Commerce Actions */}
          <div className="header-actions">
            {/* Cart Trigger */}
            <button
              className="cart-trigger"
              id="openCartBtn"
              aria-label="View Shopping Cart"
              onClick={() => setIsCartOpen(true)}
              style={{ cursor: 'pointer' }}
            >
              <svg className="cart-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="cart-badge" id="cartCountBadge" aria-label="Cart items count">{cartCount}</span>
            </button>

            {/* Purchase CTA */}
            <button
              onClick={() => addToCart('bundle')}
              className="btn-buy-cta"
              style={{ cursor: 'pointer' }}
            >
              <span>Buy the Collection</span>
              <svg className="cta-arrow" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 1L13 6M13 6L8 11M13 6H1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className={`hamburger-btn ${mobileOpen ? 'active' : ''}`}
              id="hamburger"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileOpen}
              aria-controls="mobDrawer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="hamburger-line top"></span>
              <span className="hamburger-line middle"></span>
              <span className="hamburger-line bottom"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mob-drawer ${mobileOpen ? 'active' : ''}`} id="mobDrawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div className="mob-drawer-header">
          <button
            onClick={() => handleNav('home')}
            className="header-brand"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <div className="brand-monogram">
              <span className="monogram-text">AI</span>
            </div>
            <div className="brand-identity">
              <span className="brand-name">DR. ASHISH INDANI</span>
            </div>
          </button>
          <button className="mob-close" id="mobClose" aria-label="Close Navigation Menu" onClick={() => setMobileOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="mob-drawer-body">
          <nav className="mob-nav">
            <button onClick={() => handleNav('home')} className={`mob-link ${activeView === 'home' ? 'active' : ''}`} style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }}>
              Home
            </button>
            <button onClick={() => handleNav('about')} className={`mob-link ${activeView === 'about' ? 'active' : ''}`} style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }}>
              About Author
            </button>
            
            <div className="mob-accordion">
              <button
                className="mob-accordion-btn"
                aria-expanded={mobBooksOpen}
                onClick={() => setMobBooksOpen(!mobBooksOpen)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>The Books</span>
                <svg className="mob-accordion-caret" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobBooksOpen && (
                <div className="mob-accordion-content" style={{ display: 'block' }}>
                  <button onClick={() => handleNav('books')} className="mob-sublink" style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }}>Complete Collection</button>
                  <button onClick={() => handleNav('books')} className="mob-sublink" style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }}>Volume I: Regulatory Pathways</button>
                  <button onClick={() => handleNav('books')} className="mob-sublink" style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }}>Volume II: Scientific Core</button>
                  <button onClick={() => handleNav('books')} className="mob-sublink" style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }}>Volume III: Biostatistics</button>
                  <button onClick={() => handleNav('books')} className="mob-sublink" style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }}>Volume IV: SaMD &amp; AI</button>
                </div>
              )}
            </div>
            
            <button onClick={() => handleNav('preview')} className={`mob-link ${activeView === 'preview' ? 'active' : ''}`} style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }}>
              Preview &amp; Topics
            </button>
            <button onClick={() => handleNav('reviews')} className={`mob-link ${activeView === 'reviews' ? 'active' : ''}`} style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }}>
              Reviews
            </button>
            <button onClick={() => handleNav('about')} className="mob-link" style={{ textAlign: 'left', width: '100%', background: 'none', border: 'none' }}>
              Speaking &amp; Advisory
            </button>
          </nav>
        </div>
        
        <div className="mob-drawer-footer">
          <button
            onClick={() => {
              addToCart('bundle');
              setMobileOpen(false);
            }}
            className="btn-buy-cta mob-cta-full"
          >
            <span>Buy the Collection</span>
            <svg className="cta-arrow" width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M8 1L13 6M13 6L8 11M13 6H1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && <div className="mob-overlay active" id="mobOverlay" onClick={() => setMobileOpen(false)} aria-hidden="true"></div>}
      
      {/* Mobile Sticky Bottom Action Bar */}
      <div className="mob-sticky-bar">
        <button
          className="mob-sticky-cart"
          onClick={() => setIsCartOpen(true)}
          aria-label="View Cart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          {cartCount > 0 && <span className="mob-sticky-cart-count">{cartCount}</span>}
        </button>
        <button
          className="mob-sticky-buy"
          onClick={() => addToCart('bundle')}
        >
          Order Complete Set →
        </button>
      </div>
    </>
  );
};
