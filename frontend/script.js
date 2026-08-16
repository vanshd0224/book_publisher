'use strict';

(function () {

  /* Header scroll class */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* Active Nav Scrollspy */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const isAboutPage = window.location.pathname.endsWith('about.html');
  const isBooksPage = window.location.pathname.endsWith('books.html');
  const isPreviewPage = window.location.pathname.endsWith('preview.html');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (sec.offsetTop - 140 <= window.scrollY) {
        current = sec.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      if (isAboutPage) {
        if (href === 'about.html') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      } else if (isBooksPage) {
        if (href === 'books.html') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      } else if (isPreviewPage) {
        if (href === 'preview.html') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      } else {
        if (href.startsWith('#')) {
          link.classList.toggle('active', href === '#' + current);
        } else {
          link.classList.remove('active');
        }
      }
    });
  }, { passive: true });

  /* Mobile Navigation Drawer & Accordion */
  const hamburger = document.getElementById('hamburger');
  const mobDrawer = document.getElementById('mobDrawer');
  const mobOverlay = document.getElementById('mobOverlay');
  const mobClose = document.getElementById('mobClose');

  function openDrawer() {
    if (mobDrawer) mobDrawer.classList.add('open');
    if (mobOverlay) mobOverlay.classList.add('vis');
    if (hamburger) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobDrawer) mobDrawer.classList.remove('open');
    if (mobOverlay) mobOverlay.classList.remove('vis');
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (mobDrawer && mobDrawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }
  if (mobClose) mobClose.addEventListener('click', closeDrawer);
  if (mobOverlay) mobOverlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mob-link, .mob-sublink, .mob-cta-full').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  const mobAccordionBtn = document.querySelector('.mob-accordion-btn');
  if (mobAccordionBtn) {
    mobAccordionBtn.addEventListener('click', () => {
      const expanded = mobAccordionBtn.classList.toggle('expanded');
      mobAccordionBtn.setAttribute('aria-expanded', expanded);
    });
  }

  /* Global Keyboard Accessibility Listener (ESC key) */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobDrawer && mobDrawer.classList.contains('open')) closeDrawer();
    }
  });

  /* Animated Count-up for Stats */
  function animateCount(el, target, duration = 1800) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count, 10);
        animateCount(entry.target, target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  /* Sticky Mobile Order Bar */
  const mobStickyBar = document.getElementById('mobStickyBar');
  const heroSec = document.getElementById('hero');
  const orderSec = document.getElementById('order');

  function updateMobileBar() {
    if (!mobStickyBar || !heroSec) return;
    const heroH = heroSec.offsetHeight;
    const orderBottom = orderSec ? orderSec.getBoundingClientRect().bottom : 1;
    const isPastHero = window.scrollY > heroH * 0.5;
    const isBeforeOrderEnd = orderBottom > 0;
    mobStickyBar.classList.toggle('vis', isPastHero && isBeforeOrderEnd);
  }

  window.addEventListener('scroll', updateMobileBar, { passive: true });

  /* Preview Dots Auto Carousel */
  const dots = document.querySelectorAll('.cdot');
  if (dots.length > 0) {
    let dotIndex = 0;
    setInterval(() => {
      dots.forEach(d => d.classList.remove('active'));
      dotIndex = (dotIndex + 1) % dots.length;
      dots[dotIndex].classList.add('active');
    }, 2800);
  }

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 76;
      const pos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    });
  });

  /* Scroll to Hash on load */
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const offset = 76;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    }, 100);
  }

  /* Footer Subscribe Form */
  const fForm = document.getElementById('fForm');
  if (fForm) {
    fForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('.f-input');
      if (input && input.value.includes('@')) {
        input.style.borderColor = '#5eda8a';
        input.value = '';
        setTimeout(() => input.style.borderColor = '', 3000);
      } else if (input) {
        input.style.borderColor = '#e05252';
      }
    });
  }

  /* ══════════════════════════════════════════════════════
     DIRECT E-COMMERCE STORE & CHECKOUT SYSTEM
  ══════════════════════════════════════════════════════ */
  const PRODUCTS = {
    'set': { id: 'set', name: 'Essentials of Medical Device Clinical Research (Complete 4-Volume Set)', price: 12999, img: 'exact_master_books_showcase.png' },
    'vol1': { id: 'vol1', name: 'Volume I: Fundamentals & Regulatory Pathways', price: 3499, img: 'v1_nobg.png' },
    'vol2': { id: 'vol2', name: 'Volume II: Scientific Core & Risk Management', price: 3499, img: 'v2_nobg.png' },
    'vol3': { id: 'vol3', name: 'Volume III: Data Management & Biostatistics', price: 3499, img: 'v3_nobg.png' },
    'vol4': { id: 'vol4', name: 'Volume IV: Software, AI & Post-Market Evidence', price: 3499, img: 'v4_nobg.png' }
  };

  let cart = [];

  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const openCartBtn = document.getElementById('openCartBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const checkoutSummaryBox = document.getElementById('checkoutSummaryBox');
  const orderSuccessModal = document.getElementById('orderSuccessModal');

  function updateCartUI() {
    const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

    if (cartCountBadge) {
      cartCountBadge.textContent = totalCount;
      cartCountBadge.classList.add('pop');
      setTimeout(() => cartCountBadge.classList.remove('pop'), 300);
    }
    if (cartSubtotalEl) cartSubtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');

    if (cartItemsList) {
      if (cart.length === 0) {
        cartItemsList.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 3rem 0;">Your shopping cart is currently empty.</div>';
      } else {
        cartItemsList.innerHTML = cart.map((item, idx) => `
          <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" class="cart-item-img"/>
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">Qty: ${item.qty} × ₹${item.price.toLocaleString('en-IN')}</div>
            </div>
            <button class="cart-item-remove" onclick="window.removeCartItem(${idx})">✕</button>
          </div>
        `).join('');
      }
    }
  }

  window.addToCart = function(prodId) {
    const prod = PRODUCTS[prodId];
    if (!prod) return;
    const existing = cart.find(i => i.id === prodId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...prod, qty: 1 });
    }
    updateCartUI();
    openCart();
  };

  window.removeCartItem = function(idx) {
    cart.splice(idx, 1);
    updateCartUI();
  };

  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  /* Direct Checkout System */
  window.buyNowDirect = function(prodId) {
    const prod = PRODUCTS[prodId];
    if (!prod) return;
    openCheckout([{ ...prod, qty: 1 }]);
  };

  window.quickBuy = function(prodId) {
    window.buyNowDirect(prodId);
  };

  window.checkoutFromCart = function() {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add a product first.');
      return;
    }
    closeCart();
    openCheckout(cart);
  };

  const checkoutTriggerBtn = document.getElementById('checkoutTriggerBtn');
  if (checkoutTriggerBtn) {
    checkoutTriggerBtn.addEventListener('click', window.checkoutFromCart);
  }

  function openCheckout(itemsToCheckout) {
    const total = itemsToCheckout.reduce((sum, i) => sum + (i.price * i.qty), 0);
    if (checkoutSummaryBox) {
      checkoutSummaryBox.innerHTML = `
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--gold-main); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem;">ORDER SUMMARY</div>
        ${itemsToCheckout.map(i => `
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.5rem; color: rgba(255,255,255,0.9);">
            <span>${i.name} (x${i.qty})</span>
            <strong>₹${(i.price * i.qty).toLocaleString('en-IN')}</strong>
          </div>
        `).join('')}
        <div style="border-top: 1px solid rgba(199,154,86,0.2); margin-top: 0.75rem; padding-top: 0.75rem; display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 700; color: #ffffff;">
          <span>Total (Express Delivery Included)</span>
          <span style="color: var(--gold-light);">₹${total.toLocaleString('en-IN')}</span>
        </div>
      `;
    }
    if (checkoutModal) checkoutModal.classList.add('active');
    if (checkoutOverlay) checkoutOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckout() {
    if (checkoutModal) checkoutModal.classList.remove('active');
    if (checkoutOverlay) checkoutOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);
  if (checkoutOverlay) checkoutOverlay.addEventListener('click', closeCheckout);

  /* Checkout Form Submission */
  function handleCheckoutSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('custName')?.value || 'Valued Customer';
    const email = document.getElementById('custEmail')?.value || 'customer@email.com';
    const orderId = 'AI-' + Math.floor(100000 + Math.random() * 900000);

    closeCheckout();

    if (orderSuccessModal) {
      const orderSuccessDetails = document.getElementById('orderSuccessDetails');
      if (orderSuccessDetails) {
        orderSuccessDetails.innerHTML = `
          <div style="font-size: 0.95rem; line-height: 1.6; color: rgba(255,255,255,0.9); margin-bottom: 1.5rem;">
            Thank you, <strong>${name}</strong>! Your order <strong>#${orderId}</strong> has been successfully placed.<br/><br/>
            A detailed confirmation invoice and live shipment tracking link have been dispatched to <strong>${email}</strong>.<br/>
            Your books will be dispatched via Express Courier within 24 hours.
          </div>
        `;
      }
      orderSuccessModal.classList.add('active');
      if (checkoutOverlay) checkoutOverlay.classList.add('active');
    }

    /* Clear cart */
    cart = [];
    updateCartUI();
  }

  const directCheckoutForm = document.getElementById('directCheckoutForm');
  if (directCheckoutForm) directCheckoutForm.addEventListener('submit', handleCheckoutSubmit);

  const genericCheckoutForm = document.getElementById('checkoutForm');
  if (genericCheckoutForm) genericCheckoutForm.addEventListener('submit', handleCheckoutSubmit);

  window.closeOrderSuccessModal = function() {
    if (orderSuccessModal) orderSuccessModal.classList.remove('active');
    if (checkoutOverlay) checkoutOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  /* ══════════════════════════════════════════════════════
     PREVIEW PAGE: TOPIC FILTER & LIVE SEARCH
     ══════════════════════════════════════════════════════ */
  const topicSearchInput = document.getElementById('topicSearchInput');
  const volTabBtns = document.querySelectorAll('.vol-tab-btn');
  const domainPillBtns = document.querySelectorAll('.domain-pill-btn');
  const topicCards = document.querySelectorAll('.topic-detail-card');
  const topicCountDisplay = document.getElementById('topicCountDisplay');

  let activeVolFilter = 'all';
  let activeDomainFilter = 'all';
  let activeSearchQuery = '';

  function filterTopics() {
    if (!topicCards || topicCards.length === 0) return;
    let visibleCount = 0;

    topicCards.forEach(card => {
      const cardVol = card.getAttribute('data-vol');
      const cardDomain = card.getAttribute('data-domain');
      const cardKeywords = (card.getAttribute('data-keywords') || '') + ' ' + (card.innerText || '');
      const cleanKeywords = cardKeywords.toLowerCase();

      const matchesVol = (activeVolFilter === 'all' || cardVol === activeVolFilter);
      const matchesDomain = (activeDomainFilter === 'all' || cardDomain === activeDomainFilter);
      const matchesSearch = (!activeSearchQuery || cleanKeywords.includes(activeSearchQuery));

      if (matchesVol && matchesDomain && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (topicCountDisplay) {
      if (visibleCount === topicCards.length) {
        topicCountDisplay.textContent = `Showing all ${visibleCount} core topics`;
      } else {
        topicCountDisplay.textContent = `Showing ${visibleCount} matching topic${visibleCount === 1 ? '' : 's'}`;
      }
    }
  }

  if (topicSearchInput) {
    topicSearchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value.trim().toLowerCase();
      filterTopics();
    });
  }

  if (volTabBtns.length > 0) {
    volTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        volTabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        activeVolFilter = btn.getAttribute('data-vol');
        filterTopics();
      });
    });
  }

  if (domainPillBtns.length > 0) {
    domainPillBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        domainPillBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeDomainFilter = btn.getAttribute('data-domain');
        filterTopics();
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     PREVIEW PAGE: INTERACTIVE SAMPLE BOOK SPREAD READER
     ══════════════════════════════════════════════════════ */
  const readerTabBtns = document.querySelectorAll('.reader-tab-btn');
  const spreadPageLeft = document.getElementById('spreadPageLeft');
  const spreadPageRight = document.getElementById('spreadPageRight');

  const SAMPLE_EXCERPTS = {
    'paradigm': {
      left: `
        <div class="page-header-strip">
          <span>VOLUME I: FUNDAMENTALS &amp; DIVERGENCES</span>
          <span>CHAPTER 1</span>
        </div>
        <div class="page-content-body">
          <div class="page-chapter-label">Section 1.2 — The Methodological Problem</div>
          <h3>1.2 The Failure of Drug Retrofitting in Medical Devices</h3>
          <p>
            Medical devices do not simply move from an engineering concept to a patient’s bedside. Between innovation and clinical adoption lies a demanding journey of scientific evaluation, clinical investigation, ethical oversight, regulatory scrutiny, and continuous post-market learning.
          </p>
          <p>
            Historically, medical device clinical studies continued to depend upon conventional retrofitting from drugs-oriented systems and methods. However, the drug and device differ in clinical science from various aspects—which are not only operational but deeply pragmatic.
          </p>
          <div class="page-diagram-box">
            <strong>Key Divergence Principle:</strong> Unlike pharmaceuticals whose active ingredient acts primarily through systemic metabolic or pharmacological pathways, a medical device exerts its primary intended action through physical, mechanical, optical, thermal, or electrical means.
            <div class="diagram-caption">Figure 1.1 — Fundamental Interaction Taxonomy (Indani et al.)</div>
          </div>
        </div>
        <div class="page-footer-num">
          <span>Essentials of Medical Device Clinical Research</span>
          <span>Page 24</span>
        </div>
      `,
      right: `
        <div class="page-header-strip">
          <span>DR. ASHISH INDANI</span>
          <span>PART I: FOUNDATIONS</span>
        </div>
        <div class="page-content-body">
          <div class="page-chapter-label">Section 1.3 — The Device Evidence Ecosystem</div>
          <h3>1.3 The Integrated Lifecycle Evidence Ecosystem</h3>
          <p>
            Rather than treating clinical research, regulation, operations, and technology as isolated subjects, the device evidence ecosystem functions as an interdependent continuum:
          </p>
          <p>
            A clinical protocol directly shapes the quality of data collected; that data directly determines the validity of the Clinical Evaluation Report (CER); the CER establishes regulatory confidence for market approval; and post-market clinical follow-up (PMCF) continually feeds back into the device risk management file.
          </p>
          <div class="page-diagram-box" style="border-left: 3px solid var(--gold-main); background: #FAF5EA;">
            <strong>Practical Rule for Investigators:</strong> In medical device trials, the surgeon or operator is an inherent co-factor of clinical efficacy. Trial protocols must account for user training, device handling ergonomics, and surgical learning curves as controlled variables.
          </div>
          <p>
            Without this device-first orientation, trials risk false-negative conclusions stemming from operator error rather than device inadequacy.
          </p>
        </div>
        <div class="page-footer-num">
          <span>Regulatory Science &amp; Operational Strategy</span>
          <span>Page 25</span>
        </div>
      `
    },
    'risk': {
      left: `
        <div class="page-header-strip">
          <span>VOLUME II: SCIENTIFIC CORE &amp; RISK</span>
          <span>CHAPTER 4</span>
        </div>
        <div class="page-content-body">
          <div class="page-chapter-label">Section 4.1 — ISO 14971 Integration</div>
          <h3>4.1 Risk Management in Clinical Investigation Design</h3>
          <p>
            ISO 14971:2019 defines risk as the combination of the probability of occurrence of harm and the severity of that harm. In clinical trials, risk analysis cannot remain an isolated engineering exercise.
          </p>
          <p>
            Each clinical hazard identified during pre-clinical bench testing and Failure Mode and Effects Analysis (FMEA) must be directly addressed in the Clinical Investigation Plan (CIP) through proactive mitigation controls.
          </p>
          <div class="page-diagram-box">
            <strong>Risk-Mitigation Hierarchy:</strong>
            <ol style="margin-left: 1.25rem; margin-top: 0.35rem; font-size: 0.82rem;">
              <li>Inherent safety by design (geometry, biocompatible material selection)</li>
              <li>Protective measures in the device or manufacturing (sterile barrier, fail-safe cutoffs)</li>
              <li>Information for safety (Instructions for Use IFU, surgeon warning labels)</li>
            </ol>
            <div class="diagram-caption">Figure 4.2 — ISO 14971 Risk Mitigation Priority Ladder</div>
          </div>
        </div>
        <div class="page-footer-num">
          <span>Essentials of Medical Device Clinical Research</span>
          <span>Page 148</span>
        </div>
      `,
      right: `
        <div class="page-header-strip">
          <span>DR. ASHISH INDANI</span>
          <span>PART II: RISK &amp; EVIDENCE</span>
        </div>
        <div class="page-content-body">
          <div class="page-chapter-label">Section 4.3 — Benefit-Risk Determination</div>
          <h3>4.3 Quantitative Clinical Benefit-Risk Ratio</h3>
          <p>
            Under EU MDR Annex I (GSPR 1) and US FDA PMA requirements, medical technologies must demonstrate that clinical benefits to the target patient population outweigh all known and foreseeable residual risks.
          </p>
          <p>
            Clinical endpoints in the trial protocol must be chosen specifically to quantify these clinical benefits against state-of-the-art alternative therapeutic standards:
          </p>
          <div class="page-diagram-box" style="border-left: 3px solid var(--gold-main); background: #FAF5EA;">
            <strong>Residual Risk Acceptability Formula:</strong>
            <p style="font-family: monospace; font-size: 0.85rem; margin: 0.35rem 0;">Residual Risk Acceptable ⇔ Total Measurable Benefit &gt; (Baseline Medical Risk + Device Specific Hazard Probabilities)</p>
          </div>
          <p>
            Safety reporting must classify all device deficiencies and unanticipated serious adverse device effects (USADE) in accordance with ISO 14155:2020 Clause 9.
          </p>
        </div>
        <div class="page-footer-num">
          <span>Patient Safety &amp; Risk Control</span>
          <span>Page 149</span>
        </div>
      `
    },
    'samd': {
      left: `
        <div class="page-header-strip">
          <span>VOLUME IV: SAMD, AI &amp; EMERGING TECH</span>
          <span>CHAPTER 10</span>
        </div>
        <div class="page-content-body">
          <div class="page-chapter-label">Section 10.1 — Software as a Medical Device</div>
          <h3>10.1 SaMD Architecture &amp; IEC 62304 SDLC</h3>
          <p>
            Software intended to be used for one or more medical purposes without being part of a hardware medical device is classified as Software as a Medical Device (SaMD) under IMDRF guidelines.
          </p>
          <p>
            Unlike physical devices with wear-and-tear degradation, software risks arise from systematic errors, algorithmic edge cases, and cybersecurity vulnerabilities.
          </p>
          <div class="page-diagram-box">
            <strong>IEC 62304 Software Safety Classification:</strong>
            <ul style="margin-left: 1.25rem; margin-top: 0.35rem; font-size: 0.82rem;">
              <li><strong>Class A:</strong> No injury or damage to health possible</li>
              <li><strong>Class B:</strong> Non-serious injury possible</li>
              <li><strong>Class C:</strong> Death or serious injury possible (Requires formal verification)</li>
            </ul>
            <div class="diagram-caption">Table 10.1 — Safety Class Stratification &amp; Verification Rigor</div>
          </div>
        </div>
        <div class="page-footer-num">
          <span>Essentials of Medical Device Clinical Research</span>
          <span>Page 286</span>
        </div>
      `,
      right: `
        <div class="page-header-strip">
          <span>DR. ASHISH INDANI</span>
          <span>PART IV: AI &amp; DIGITAL HEALTH</span>
        </div>
        <div class="page-content-body">
          <div class="page-chapter-label">Section 10.4 — Artificial Intelligence Validation</div>
          <h3>10.4 Clinical Validation of Machine Learning Models</h3>
          <p>
            Generating acceptable clinical evidence for AI/ML diagnostic and prognostic algorithms requires adherence to Good Machine Learning Practice (GMLP) principles:
          </p>
          <p>
            1. <strong>Dataset Independence:</strong> Absolute separation between training, tuning, and locked testing datasets to prevent data leakage.<br/>
            2. <strong>Demographic Generalizability:</strong> Multi-center clinical validation across diverse patient cohorts, scanner hardware, and operator skill levels.
          </p>
          <div class="page-diagram-box" style="border-left: 3px solid var(--gold-main); background: #FAF5EA;">
            <strong>Predetermined Change Control Plan (PCCP):</strong> For adaptive algorithms, manufacturers must specify in advance the types of anticipated modifications, validation methodology, and re-testing criteria to maintain regulatory clearance.
          </div>
        </div>
        <div class="page-footer-num">
          <span>Machine Learning Clinical Evaluation</span>
          <span>Page 287</span>
        </div>
      `
    },
    'cer': {
      left: `
        <div class="page-header-strip">
          <span>VOLUME II: SCIENTIFIC CORE</span>
          <span>CHAPTER 6</span>
        </div>
        <div class="page-content-body">
          <div class="page-chapter-label">Section 6.1 — Clinical Evaluation Framework</div>
          <h3>6.1 The 4-Stage CER Lifecycle Architecture</h3>
          <p>
            Under EU MDR 2017/745 Article 61 and MEDDEV 2.7/1 Rev 4, clinical evaluation is a continuous, documented method to assess clinical data for a medical device:
          </p>
          <p>
            <strong>Stage 0 (Scoping):</strong> Define the Clinical Evaluation Plan (CEP), intended purpose, clinical claims, and state-of-the-art (SOTA) benchmarks.<br/>
            <strong>Stage 1 (Identification):</strong> Systematic literature search across MEDLINE/PubMed, EMBASE, and Cochrane databases, alongside device registry files.
          </p>
          <div class="page-diagram-box">
            <strong>Systematic Search Quality Gate:</strong> Every bibliographic search must be accompanied by explicit Boolean search syntax, inclusion/exclusion filters, and a PRISMA flowchart.
            <div class="diagram-caption">Figure 6.2 — Methodological Search Audit Standard</div>
          </div>
        </div>
        <div class="page-footer-num">
          <span>Essentials of Medical Device Clinical Research</span>
          <span>Page 194</span>
        </div>
      `,
      right: `
        <div class="page-header-strip">
          <span>DR. ASHISH INDANI</span>
          <span>PART II: CLINICAL EVALUATION</span>
        </div>
        <div class="page-content-body">
          <div class="page-chapter-label">Section 6.3 — Appraisal &amp; Synthesis</div>
          <h3>6.3 Data Appraisal &amp; Demonstrating Equivalence</h3>
          <p>
            <strong>Stage 2 (Appraisal):</strong> Evaluate each data source for methodological quality, scientific relevance, and weight of evidence (scoring from Level 1 randomized trials to Level 4 retrospective case series).
          </p>
          <p>
            <strong>Stage 3 (Synthesis &amp; Conclusion):</strong> Synthesize all appraisal outputs to prove that clinical performance meets clinical safety objectives without unmitigated hazards.
          </p>
          <div class="page-diagram-box" style="border-left: 3px solid var(--gold-main); background: #FAF5EA;">
            <strong>MDR Equivalence Triple Test:</strong> To claim clinical equivalence with a predicate device, manufacturers must demonstrate equivalence across Technical, Biological, and Clinical characteristics simultaneously.
          </div>
          <p>
            The final CER forms an integral part of the Technical File and is updated annually for Class III and implantable devices.
          </p>
        </div>
        <div class="page-footer-num">
          <span>Regulatory Compliance &amp; Notified Body Audit</span>
          <span>Page 195</span>
        </div>
      `
    }
  };

  if (readerTabBtns.length > 0) {
    readerTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        readerTabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const sampleKey = btn.getAttribute('data-sample');
        const excerpt = SAMPLE_EXCERPTS[sampleKey];
        if (excerpt && spreadPageLeft && spreadPageRight) {
          spreadPageLeft.innerHTML = excerpt.left;
          spreadPageRight.innerHTML = excerpt.right;
        }
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     LANDING PAGE: INTERACTIVE MANUSCRIPT SPECIMEN SWITCHER
     ══════════════════════════════════════════════════════ */
  const landingSpecimenBtns = document.querySelectorAll('.m-tab-btn');
  const landingSpecimenHeaderLeft = document.getElementById('landingSpecimenHeaderLeft');
  const landingSpecimenHeaderRight = document.getElementById('landingSpecimenHeaderRight');
  const landingSpecimenKicker = document.getElementById('landingSpecimenKicker');
  const landingSpecimenTitle = document.getElementById('landingSpecimenTitle');
  const landingSpecimenLead = document.getElementById('landingSpecimenLead');
  const landingSpecimenDiagram = document.getElementById('landingSpecimenDiagram');
  const landingSpecimenQuote = document.getElementById('landingSpecimenQuote');
  const landingSpecimenFooterPage = document.getElementById('landingSpecimenFooterPage');

  const LANDING_SPECIMENS = {
    'risk': {
      headerLeft: 'VOL II · SECTION 4.1',
      headerRight: 'ISO 14971:2019 COMPLIANCE',
      kicker: 'Device Risk Integration Protocol',
      title: 'ISO 14971 Risk-Benefit Determination in CIP Design',
      lead: 'Clinical risk management cannot remain an isolated post-design activity. Pre-clinical FMEA failure modes must directly map to Clinical Investigation Plan safety endpoints.',
      diagramHtml: `
        <div class="m-diagram-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span>Evidence Mitigation Pipeline</span>
        </div>
        <div class="m-flow-row">
          <div class="m-flow-step">
            <div class="m-step-num">Step 01</div>
            <div class="m-step-text">Hazard Analysis (FMEA)</div>
          </div>
          <div class="m-flow-step">
            <div class="m-step-num">Step 02</div>
            <div class="m-step-text">CIP Safety Endpoints</div>
          </div>
          <div class="m-flow-step">
            <div class="m-step-num">Step 03</div>
            <div class="m-step-text">Residual Benefit-Risk</div>
          </div>
        </div>
      `,
      quote: '<strong>Core Rule:</strong> Measurable Clinical Benefit must mathematically outweigh the combination of baseline physiological risk and device-specific failure probabilities.',
      page: 'Page 148'
    },
    'divergence': {
      headerLeft: 'VOL I · SECTION 1.2',
      headerRight: 'PARADIGM DIVERGENCE',
      kicker: 'Clinical Science Foundational Gap',
      title: 'Mode of Action Divergence: Physical vs Pharmacological',
      lead: 'Traditional pharmaceutical trials test systemic chemical bioavailability. Medical devices act via physical, mechanical, thermal, optical, or electrical modalities.',
      diagramHtml: `
        <div class="m-diagram-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
          <span>Mechanism Taxonomy</span>
        </div>
        <div class="m-flow-row">
          <div class="m-flow-step">
            <div class="m-step-num">Modality 01</div>
            <div class="m-step-text">Physical Action Mode</div>
          </div>
          <div class="m-flow-step">
            <div class="m-step-num">Modality 02</div>
            <div class="m-step-text">Operator Technique</div>
          </div>
          <div class="m-flow-step">
            <div class="m-step-num">Modality 03</div>
            <div class="m-step-text">Localized Biocompatibility</div>
          </div>
        </div>
      `,
      quote: '<strong>Key Principle:</strong> In medical device investigations, operator technique and anatomical fit are controlled co-factors of trial efficacy.',
      page: 'Page 24'
    },
    'samd': {
      headerLeft: 'VOL IV · SECTION 10.1',
      headerRight: 'IEC 62304 & GMLP ARCHITECTURE',
      kicker: 'Digital Health & AI Clinical Science',
      title: 'SaMD Software Safety & Good Machine Learning Practice',
      lead: 'Algorithms require validation across diverse patient demographics and clinical scanner hardware to avoid training bias and data leakage.',
      diagramHtml: `
        <div class="m-diagram-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          <span>GMLP Validation Gateway</span>
        </div>
        <div class="m-flow-row">
          <div class="m-flow-step">
            <div class="m-step-num">Gate 01</div>
            <div class="m-step-text">Data Independence</div>
          </div>
          <div class="m-flow-step">
            <div class="m-step-num">Gate 02</div>
            <div class="m-step-text">Multi-Center Trial</div>
          </div>
          <div class="m-flow-step">
            <div class="m-step-num">Gate 03</div>
            <div class="m-step-text">Predetermined PCCP</div>
          </div>
        </div>
      `,
      quote: '<strong>Regulatory Mandate:</strong> Adaptive AI algorithms must establish Predetermined Change Control Plans (PCCP) prior to commercial market clearance.',
      page: 'Page 286'
    },
    'cer': {
      headerLeft: 'VOL II · SECTION 6.1',
      headerRight: 'EU MDR 2017/745 ART 61',
      kicker: 'Continuous Clinical Evidence Architecture',
      title: '4-Stage Clinical Evaluation Report & PMCF Feedback Loop',
      lead: 'Clinical evaluation is an active lifecycle requirement under MDR. Literature appraisal matrices feed directly into Post-Market Clinical Follow-Up.',
      diagramHtml: `
        <div class="m-diagram-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>4-Stage CER Lifecycle</span>
        </div>
        <div class="m-flow-row">
          <div class="m-flow-step">
            <div class="m-step-num">Stage 01</div>
            <div class="m-step-text">Systematic SOTA Scoping</div>
          </div>
          <div class="m-flow-step">
            <div class="m-step-num">Stage 02</div>
            <div class="m-step-text">Methodological Appraisal</div>
          </div>
          <div class="m-flow-step">
            <div class="m-step-num">Stage 03</div>
            <div class="m-step-text">Continuous PMCF Loop</div>
          </div>
        </div>
      `,
      quote: '<strong>MDR Equivalence Standard:</strong> Clinical equivalence requires concurrent, verifiable proof across Technical, Biological, and Clinical dimensions.',
      page: 'Page 194'
    }
  };

  if (landingSpecimenBtns.length > 0) {
    landingSpecimenBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        landingSpecimenBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const key = btn.getAttribute('data-specimen');
        const spec = LANDING_SPECIMENS[key];
        if (spec) {
          if (landingSpecimenHeaderLeft) landingSpecimenHeaderLeft.textContent = spec.headerLeft;
          if (landingSpecimenHeaderRight) landingSpecimenHeaderRight.textContent = spec.headerRight;
          if (landingSpecimenKicker) landingSpecimenKicker.textContent = spec.kicker;
          if (landingSpecimenTitle) landingSpecimenTitle.textContent = spec.title;
          if (landingSpecimenLead) landingSpecimenLead.textContent = spec.lead;
          if (landingSpecimenDiagram) landingSpecimenDiagram.innerHTML = spec.diagramHtml;
          if (landingSpecimenQuote) landingSpecimenQuote.innerHTML = spec.quote;
          if (landingSpecimenFooterPage) landingSpecimenFooterPage.textContent = spec.page;
        }
      });
    });
  }

})();



