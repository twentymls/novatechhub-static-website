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
    const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.setProperty('--p', p + '%');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ==========================================
  // 4. Scroll reveal (IntersectionObserver)
  // ==========================================
  const toReveal = document.querySelectorAll(
    '.section-head, .svc, .blog-card, .method-step, .hero-stat, ' +
    '.cta-block, .stack-grid, .contact-grid, .marquee'
  );
  toReveal.forEach(el => {
    if (!el.classList.contains('method-step')) {
      el.classList.add('reveal');
    }
  });

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  toReveal.forEach(el => revealIO.observe(el));

  // Stagger method steps
  document.querySelectorAll('.method-step').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
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
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu-links a, .mobile-menu-cta').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
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
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // 11. Contact form (honeypot + disable)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const honeypot = contactForm.querySelector('[data-honeypot]');
      if (honeypot && honeypot.value !== '') {
        e.preventDefault();
        return;
      }
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Invio in corso...';
      }
    });
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

  if (observedSections.length > 0) {
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
