import React, { useState } from 'react';
import { ActiveView } from '../../types';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" id="contact" role="contentinfo">
      <div className="footer-container">
        
        {/* Brand Col */}
        <div className="f-col f-brand-col">
          <div className="f-brand-head">
            <div className="nav-mono">AI</div>
            <div>
              <span className="f-brand-name">Dr. Ashish Indani</span>
              <div className="brand-sub">Medical Device Clinical Research Expert</div>
            </div>
          </div>
          <p className="f-brand-text">
            Advancing global standards in Medical Device Clinical Research through education, regulatory mentorship &amp; clinical innovation.
          </p>
          <div className="f-socials">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="f-soc-btn" aria-label="LinkedIn">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 100 3.26 1.63 1.63 0 000-3.26z"/></svg>
            </a>
            <a href="https://www.youtube.com/watch?v=Zyhmdm7TSVg" target="_blank" rel="noopener noreferrer" className="f-soc-btn" aria-label="YouTube / Keynotes">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M21.58 7.19a2.7 2.7 0 00-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.68.49a2.7 2.7 0 00-1.9 1.9A28.3 28.3 0 002 12a28.3 28.3 0 00.42 4.81 2.7 2.7 0 001.9 1.9c1.68.49 7.68.49 7.68.49s6 0 7.68-.49a2.7 2.7 0 001.9-1.9A28.3 28.3 0 0022 12a28.3 28.3 0 00-.42-4.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
            </a>
            <a href="mailto:ashish@advanceresearchteck.com" className="f-soc-btn" aria-label="Email Author">
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="1.5"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="f-col">
          <h4 className="f-title">QUICK LINKS</h4>
          <button onClick={() => handleNav('about')} className="f-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            About the Author
          </button>
          <button onClick={() => handleNav('books')} className="f-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            The Books Collection
          </button>
          <button onClick={() => handleNav('preview')} className="f-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            Preview &amp; Topics
          </button>
          <button onClick={() => handleNav('reviews')} className="f-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            Reviews &amp; Acclaim
          </button>
          <button onClick={() => handleNav('about')} className="f-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            Speaking &amp; Advisory
          </button>
        </div>

        {/* The 4 Volumes */}
        <div className="f-col">
          <h4 className="f-title">THE 4 VOLUMES</h4>
          <button onClick={() => handleNav('books')} className="f-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            Vol I: Regulatory Pathways
          </button>
          <button onClick={() => handleNav('books')} className="f-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            Vol II: Scientific Core &amp; Risk
          </button>
          <button onClick={() => handleNav('books')} className="f-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            Vol III: Clinical Ops &amp; Biostats
          </button>
          <button onClick={() => handleNav('books')} className="f-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            Vol IV: SaMD &amp; AI Evidence
          </button>
          <button onClick={() => handleNav('books')} className="f-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            Order Complete Series
          </button>
        </div>

        {/* Official Stores */}
        <div className="f-col">
          <h4 className="f-title">OFFICIAL STORES</h4>
          <a href="http://www.booksbyashishindani.com" target="_blank" rel="noopener noreferrer" className="f-link">Direct Publisher (10% Off)</a>
          <a href="https://www.amazon.in" target="_blank" rel="noopener noreferrer" className="f-link">Amazon India</a>
          <a href="https://www.flipkart.com" target="_blank" rel="noopener noreferrer" className="f-link">Flipkart</a>
          <a href="https://retailmaharaj.com" target="_blank" rel="noopener noreferrer" className="f-link">Retail Maharaj</a>
          <a href="https://www.diaglobal.org" target="_blank" rel="noopener noreferrer" className="f-link">DIA Global Profile</a>
        </div>

        {/* Stay Updated */}
        <div className="f-col f-subscribe-col">
          <h4 className="f-title">STAY UPDATED</h4>
          <p className="f-sub-text">Subscribe for updates on new publications, training programs &amp; industry insights.</p>
          {subscribed ? (
            <div style={{ color: 'var(--gold-light)', fontSize: '0.85rem', padding: '0.5rem 0' }}>
              ✓ Thank you for subscribing to updates!
            </div>
          ) : (
            <form className="f-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="f-input"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-label="Enter email"
              />
              <button type="submit" className="f-btn">→</button>
            </form>
          )}
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Dr. Ashish Indani. All Rights Reserved. Published by B Jain Publishers.</p>
      </div>
    </footer>
  );
};
