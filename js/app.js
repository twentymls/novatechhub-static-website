(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================
  // 1. Inject decorative elements
  // ==========================================
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.prepend(progress);

  if (!reduce) {
    const orb1 = document.createElement('div'); orb1.className = 'float-orb o1';
    const orb2 = document.createElement('div'); orb2.className = 'float-orb o2';
    document.body.appendChild(orb1);
    document.body.appendChild(orb2);
  }

  // ==========================================
  // 2. Hero title: word-by-word rise animation
  // ==========================================
  const title = document.querySelector('.hero-title');
  if (title && !reduce) {
    const wrap = (node, delayRef) => {
      const frag = document.createDocumentFragment();
      node.childNodes.forEach(n => {
        if (n.nodeType === Node.TEXT_NODE) {
          const parts = n.textContent.split(/(\s+)/);
          parts.forEach(p => {
            if (!p) return;
            if (/^\s+$/.test(p)) {
              const spacer = document.createElement('span');
              spacer.style.display = 'inline-block';
              spacer.style.width = '0.28em';
              spacer.textContent = ' ';
              frag.appendChild(spacer);
            } else {
              const w = document.createElement('span');
              w.className = 'word';
              w.textContent = p;
              w.style.animationDelay = (delayRef.v += 0.08) + 's';
              frag.appendChild(w);
            }
          });
        } else if (n.nodeType === Node.ELEMENT_NODE) {
          if (n.tagName === 'BR') {
            frag.appendChild(n.cloneNode());
          } else if (n.tagName === 'EM') {
            const em = document.createElement('em');
            const w = document.createElement('span');
            w.className = 'word';
            w.textContent = n.textContent;
            w.style.animationDelay = (delayRef.v += 0.08) + 's';
            em.appendChild(w);
            frag.appendChild(em);
          } else {
            frag.appendChild(n.cloneNode(true));
          }
        }
      });
      node.innerHTML = '';
      node.appendChild(frag);
    };
    wrap(title, { v: 0.1 });
  }

  // ==========================================
  // 3. Scroll progress bar
  // ==========================================
  const onScroll = () => {
    const h = document.documentElement;
    const scrollable = h.scrollHeight - h.clientHeight;
    const p = scrollable > 0 ? Math.min(100, Math.max(0, h.scrollTop / scrollable * 100)) : 0;
    progress.style.setProperty('--p', p + '%');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ==========================================
  // 4. Scroll reveal (IntersectionObserver)
  // ==========================================
  const toReveal = document.querySelectorAll(
    '.section-head, .svc, .blog-card, .method-step, .hero-stat, ' +
    '.cta-block, .stack-grid, .contact-grid, .marquee, [data-scroll-reveal]'
  );
  toReveal.forEach(el => {
    if (!el.classList.contains('method-step')) {
      el.classList.add('reveal');
    }
    const delay = Number(el.getAttribute('data-scroll-reveal-delay'));
    if (!reduce && Number.isFinite(delay) && delay > 0) {
      el.style.animationDelay = `${Math.min(delay, 500)}ms`;
    }
  });

  // Content stays visible by default. Observation only adds an entrance
  // animation; a missing or blocked observer must never hide page content.
  const revealAll = () => toReveal.forEach(el => el.classList.add('in'));
  if (!reduce && 'IntersectionObserver' in window) {
    try {
      const revealIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            revealIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      toReveal.forEach(el => revealIO.observe(el));
    } catch (_) {
      revealAll();
    }
  } else {
    revealAll();
  }

  // Stagger method steps
  document.querySelectorAll('.method-step').forEach((el, i) => {
    if (!reduce) el.style.animationDelay = (i * 0.08) + 's';
  });

  // ==========================================
  // 5. Hero cursor spotlight
  // ==========================================
  const hero = document.querySelector('.hero');
  if (hero && !reduce) {
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      hero.style.setProperty('--mx', mx + '%');
      hero.style.setProperty('--my', my + '%');
    });
  }

  // ==========================================
  // 6. Service card cursor-follow radial glow
  // ==========================================
  document.querySelectorAll('.svc').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ==========================================
  // 7. (removed)
  // ==========================================

  // ==========================================
  // 8. Magnetic effect on buttons
  // ==========================================
  if (!reduce) {
    document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${mx * 0.18}px, ${my * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ==========================================
  // 9. Mobile menu
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle') || document.getElementById('navbar-toggle');
  const mobileClose = document.getElementById('mobile-close') || document.querySelector('[data-navbar-close]');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const legacyMenu = mobileMenu && !mobileMenu.classList.contains('mobile-menu');
  const desktopMenu = window.matchMedia(legacyMenu ? '(min-width: 1024px)' : '(min-width: 981px)');
  let menuOpen = false;
  let previousFocus = null;
  let previousOverflow = '';

  const menuFocusable = () => mobileMenu ? Array.from(mobileMenu.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter(el => el.getClientRects().length > 0) : [];

  if (mobileMenu) {
    mobileMenu.setAttribute('role', 'dialog');
    mobileMenu.setAttribute('aria-label', 'Menu di navigazione');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.inert = true;
  }
  if (mobileToggle && mobileMenu) {
    mobileToggle.setAttribute('aria-controls', mobileMenu.id);
    mobileToggle.setAttribute('aria-expanded', 'false');
  }
  if (mobileClose) mobileClose.setAttribute('aria-label', 'Chiudi menu');
  if (mobileOverlay) mobileOverlay.setAttribute('aria-hidden', 'true');

  function openMobileMenu() {
    if (!mobileMenu || menuOpen || desktopMenu.matches) return;
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    menuOpen = true;
    mobileMenu.inert = false;
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.setAttribute('aria-modal', 'true');
    mobileMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const firstControl = mobileClose || menuFocusable()[0];
    if (firstControl) firstControl.focus({ preventScroll: true });
  }
  function closeMobileMenu(restoreFocus = false) {
    if (!mobileMenu || !menuOpen) return;
    menuOpen = false;
    if (restoreFocus && previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus({ preventScroll: true });
    } else if (mobileMenu.contains(document.activeElement) && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.removeAttribute('aria-modal');
    mobileMenu.inert = true;
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = previousOverflow;
  }

  if (mobileToggle) mobileToggle.addEventListener('click', () => {
    if (menuOpen) closeMobileMenu(true);
    else openMobileMenu();
  });
  if (mobileClose) mobileClose.addEventListener('click', () => closeMobileMenu(true));
  if (mobileOverlay) mobileOverlay.addEventListener('click', () => closeMobileMenu(true));

  // Close mobile menu on link click
  if (mobileMenu) mobileMenu.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu(false));
  });

  // Keep keyboard navigation inside the open drawer, and return focus on Escape.
  document.addEventListener('keydown', (e) => {
    if (!menuOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMobileMenu(true);
    } else if (e.key === 'Tab') {
      const controls = menuFocusable();
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first) return;
      if (e.shiftKey && (document.activeElement === first || !mobileMenu.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  desktopMenu.addEventListener('change', (e) => {
    if (e.matches) closeMobileMenu(false);
  });

  // ==========================================
  // 10. Smooth scroll for anchor links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target === '#') return;
      const section = document.querySelector(target);
      if (section) {
        e.preventDefault();
        const navHeight = 72;
        const top = section.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  });

  // ==========================================
  // 11. Contact form (AJAX submit: loading / success / error)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const errorBox = document.getElementById('form-error');
    const successBox = document.getElementById('contact-success');
    const successMsg = document.getElementById('contact-success-msg');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnLabel = submitBtn && submitBtn.querySelector('.btn-label');
    const phonePrefix = contactForm.querySelector('#phone_prefix');
    const phoneInput = contactForm.querySelector('#phone');

    const showError = (msg) => {
      if (errorBox) { errorBox.textContent = msg; errorBox.hidden = false; }
      if (submitBtn) { submitBtn.disabled = false; }
      if (btnLabel) { btnLabel.textContent = 'Invia messaggio'; }
    };

    // Validate in JS so we always show a visible message — the native validation
    // bubble can be invisible/off-screen on some browsers, making the button
    // appear "dead" when a required field is missing.
    contactForm.noValidate = true;

    const getPhoneValue = () => {
      if (!phonePrefix || !phoneInput) return '';

      const prefix = phonePrefix.value.trim();
      const localDigits = phoneInput.value.replace(/\D/g, '');
      const prefixDigits = prefix.replace(/\D/g, '');
      const isValid = /^\+\d{1,4}$/.test(prefix)
        && localDigits.length >= 6
        && (prefixDigits.length + localDigits.length) <= 15;

      phoneInput.setCustomValidity(isValid
        ? ''
        : 'Inserisci un numero valido completo di prefisso internazionale.');

      return isValid ? `${prefix} ${localDigits}` : '';
    };

    if (phoneInput) phoneInput.addEventListener('input', getPhoneValue);
    if (phonePrefix) phonePrefix.addEventListener('change', getPhoneValue);

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot: silently drop bot submissions.
      const honeypot = contactForm.querySelector('[data-honeypot]');
      if (honeypot && honeypot.value !== '') return;

      // Normalize and validate the full international phone number.
      const fullPhone = getPhoneValue();

      // Explicit, visible validation.
      if (!contactForm.checkValidity()) {
        const firstInvalid = contactForm.querySelector(':invalid');
        if (firstInvalid && firstInvalid.id === 'privacy') {
          showError('Per inviare devi accettare la Privacy Policy.');
        } else if (firstInvalid && (firstInvalid.id === 'phone' || firstInvalid.id === 'phone_prefix')) {
          showError('Inserisci un numero di telefono valido e seleziona il prefisso internazionale.');
        } else {
          showError('Controlla i campi obbligatori: nome, email valida, tipo di progetto e messaggio.');
        }
        if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
        return;
      }

      if (errorBox) { errorBox.hidden = true; errorBox.textContent = ''; }
      if (submitBtn) submitBtn.disabled = true;
      if (btnLabel) btnLabel.textContent = 'Invio in corso...';

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const data = new FormData(contactForm);
        if (fullPhone) {
          data.set('phone', fullPhone);
          data.delete('phone_prefix');
        }
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });

        if (res.ok) {
          const name = (data.get('name') || '').toString().trim();
          if (successMsg) {
            successMsg.textContent = name
              ? `Grazie ${name}. Ti rispondiamo entro 24 ore lavorative.`
              : 'Grazie. Ti rispondiamo entro 24 ore lavorative.';
          }
          contactForm.style.display = 'none';
          if (successBox) {
            successBox.hidden = false;
            successBox.classList.add('show');
            successBox.focus();
            successBox.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
          }
        } else {
          let msg = 'Invio non riuscito. Riprova, oppure scrivici a info@catalisilab.com.';
          try {
            const json = await res.json();
            if (json && Array.isArray(json.errors) && json.errors.length) {
              msg = json.errors.map(x => x.message).join(' ');
            }
          } catch (_) { /* keep default message */ }
          showError(msg);
        }
      } catch (err) {
        console.warn('[contact-form] submit failed:', err && err.name === 'AbortError' ? 'timeout (15s) — request never responded' : err);
        showError(err && err.name === 'AbortError'
          ? 'Invio scaduto: la richiesta non ha risposto in tempo. Riprova, oppure scrivici a info@catalisilab.com.'
          : 'Problema di rete. Controlla la connessione e riprova, oppure scrivici a info@catalisilab.com.');
      } finally {
        clearTimeout(timeout);
      }
    });

    // Robustness: some security/monitoring agents (DLP, "secure" enterprise
    // browsers, session-replay) intercept the native button→submit path so a
    // click on the button never turns into a form submit. Bind the click
    // directly (capture phase, to run before such interceptors) and drive the
    // submission ourselves via requestSubmit(), which fires the 'submit' event
    // handler above. preventDefault avoids a double submit from the native path.
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        if (submitBtn.disabled) return;
        e.preventDefault();
        if (typeof contactForm.requestSubmit === 'function') {
          contactForm.requestSubmit();
        } else {
          // Older browsers without requestSubmit: fire the submit event manually.
          contactForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }, true);
    }
  }

  // ==========================================
  // 12. Active nav highlighting
  // ==========================================
  const navAnchors = document.querySelectorAll('nav.top .nav-links a[href^="#"]');
  const observedSections = [];
  navAnchors.forEach(a => {
    const id = a.getAttribute('href').replace('#', '');
    const sec = document.getElementById(id);
    if (sec) observedSections.push({ id, element: sec, link: a });
  });

  if (observedSections.length > 0 && 'IntersectionObserver' in window) {
    const activeIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observedSections.forEach(s => {
            if (s.id === entry.target.id) {
              s.link.style.color = 'var(--ink)';
            } else {
              s.link.style.color = '';
            }
          });
        }
      });
    }, { rootMargin: '-72px 0px -50% 0px', threshold: 0 });
    observedSections.forEach(s => activeIO.observe(s.element));
  }
})();
