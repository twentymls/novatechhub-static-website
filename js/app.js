document.addEventListener('DOMContentLoaded', () => {

  // === Mega Menu & Home Link Injection ===
  (function initNavEnhancements() {
    // Inject mega-menu CSS
    const style = document.createElement('style');
    style.textContent = `
      .mega-menu-trigger { position: relative; }
      .mega-menu-trigger .mega-menu-chevron { transition: transform 0.2s ease; }
      .mega-menu-trigger:hover .mega-menu-chevron,
      .mega-menu-trigger.mega-menu-open .mega-menu-chevron { transform: rotate(180deg); }

      .mega-menu-panel {
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        background: #0f1729;
        border-top: 1px solid rgba(51, 65, 85, 0.5);
        border-bottom: 1px solid rgba(51, 65, 85, 0.5);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-8px);
        transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
        z-index: 49;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
      }
      .mega-menu-panel.mega-menu-visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .mega-menu-service-item {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 12px 16px;
        border-radius: 12px;
        transition: background 0.15s ease;
        text-decoration: none;
        color: inherit;
      }
      .mega-menu-service-item:hover {
        background: rgba(59, 130, 246, 0.08);
      }
      .mega-menu-service-item:hover .mega-menu-service-title {
        color: #60a5fa;
      }
      .mega-menu-service-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: rgba(59, 130, 246, 0.1);
        font-size: 18px;
        flex-shrink: 0;
        margin-top: 2px;
      }
      .mega-menu-service-title {
        font-weight: 600;
        font-size: 14px;
        color: #f1f5f9;
        transition: color 0.15s ease;
        line-height: 1.3;
      }
      .mega-menu-service-desc {
        font-size: 12px;
        color: #94a3b8;
        margin-top: 2px;
        line-height: 1.4;
      }

      .mega-menu-service-item:hover .mega-menu-arrow-icon {
        opacity: 1;
        transform: translateX(0);
      }
      .mega-menu-arrow-icon {
        opacity: 0;
        transform: translateX(-4px);
        transition: opacity 0.15s ease, transform 0.15s ease;
        margin-left: auto;
        align-self: center;
        flex-shrink: 0;
      }

      .mega-menu-cta-card {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        height: 100%;
        min-height: 280px;
      }
      .mega-menu-cta-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        inset: 0;
      }
      .mega-menu-cta-card .mega-menu-cta-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0.3) 100%);
      }
      .mega-menu-cta-card .mega-menu-cta-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 24px;
      }

      .mega-menu-all-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border: 1px solid rgba(96, 165, 250, 0.3);
        border-radius: 9999px;
        color: #60a5fa;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s ease;
        text-decoration: none;
        margin-top: 8px;
      }
      .mega-menu-all-link:hover {
        background: rgba(59, 130, 246, 0.1);
        border-color: rgba(96, 165, 250, 0.5);
      }

      .mega-menu-mobile-accordion {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
      .mega-menu-mobile-accordion.open {
        max-height: 600px;
      }
      .mega-menu-mobile-service {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        color: #94a3b8;
        text-decoration: none;
        font-size: 14px;
        border-radius: 8px;
        transition: color 0.15s ease, background 0.15s ease;
      }
      .mega-menu-mobile-service:hover {
        color: #f1f5f9;
        background: rgba(59, 130, 246, 0.08);
      }
      .mega-menu-mobile-service span.icon { font-size: 16px; }
    `;
    document.head.appendChild(style);

    // Detect base path from existing nav links
    function getBasePath() {
      const existingLink = document.querySelector('#main-nav a[href*="#services"], #main-nav a[href*="#blog"], #main-nav a[href*="#contact"]');
      if (!existingLink) return './';
      const href = existingLink.getAttribute('href');
      const hashIndex = href.indexOf('#');
      return hashIndex > 0 ? href.substring(0, hashIndex) : './';
    }
    const basePath = getBasePath();

    const services = [
      { emoji: '&#127760;', title: 'Sviluppo Web', desc: 'Siti web e web app performanti e scalabili', href: basePath + 'services/sviluppo-web.html' },
      { emoji: '&#128241;', title: 'App Mobile', desc: 'App native e cross-platform ad alte prestazioni', href: basePath + 'services/app-mobile.html' },
      { emoji: '&#9881;&#65039;', title: 'Software Gestionali', desc: 'Digitalizza e automatizza i tuoi processi', href: basePath + 'services/software-gestionali.html' },
      { emoji: '&#128161;', title: 'Consulenza Tech', desc: 'Strategia, architettura e AI per il tuo business', href: basePath + 'services/consulenza-tech.html' },
      { emoji: '&#128200;', title: 'Digital Marketing & ADV', desc: 'Campagne data-driven per far crescere il tuo business', href: basePath + 'services/digital-marketing-adv.html' },
      { emoji: '&#128202;', title: 'Analytics & Tracking', desc: 'Misura, analizza, ottimizza ogni touchpoint', href: basePath + 'services/analytics-tracking.html' },
    ];

    // --- Desktop: Add Home link + Servizi mega-menu ---
    const desktopNav = document.querySelector('#main-nav .hidden.lg\\:flex');
    if (desktopNav) {
      // Find the Servizi link
      const serviziLink = Array.from(desktopNav.querySelectorAll('a')).find(a => a.textContent.trim() === 'Servizi');

      // Add Home link before Servizi
      const homeLink = document.createElement('a');
      homeLink.href = basePath;
      homeLink.className = 'text-sm text-slate-300 hover:text-white transition-colors';
      homeLink.textContent = 'Home';
      if (serviziLink) {
        desktopNav.insertBefore(homeLink, serviziLink);
      } else {
        desktopNav.insertBefore(homeLink, desktopNav.firstChild);
      }

      // Add "La nostra storia" link after Blog (before Contattaci)
      const contattaciLink = Array.from(desktopNav.querySelectorAll('a')).find(a => a.textContent.trim() === 'Contattaci');
      const storiaLink = document.createElement('a');
      storiaLink.href = basePath + 'la-nostra-storia.html';
      storiaLink.className = 'text-sm text-slate-300 hover:text-white transition-colors';
      storiaLink.textContent = 'La nostra storia';
      if (contattaciLink) {
        desktopNav.insertBefore(storiaLink, contattaciLink);
      } else {
        desktopNav.appendChild(storiaLink);
      }

      // Create mega-menu trigger wrapper for Servizi
      if (serviziLink) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mega-menu-trigger';

        const triggerBtn = document.createElement('button');
        triggerBtn.type = 'button';
        triggerBtn.className = 'text-sm text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1';
        triggerBtn.innerHTML = 'Servizi <svg class="mega-menu-chevron w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>';

        serviziLink.replaceWith(wrapper);
        wrapper.appendChild(triggerBtn);

        // Build mega-menu panel
        const panel = document.createElement('div');
        panel.className = 'mega-menu-panel';

        function renderServiceItem(s) {
          return `<a href="${s.href}" class="mega-menu-service-item">
            <div class="mega-menu-service-icon">${s.emoji}</div>
            <div>
              <div class="mega-menu-service-title">${s.title}</div>
              <div class="mega-menu-service-desc">${s.desc}</div>
            </div>
            <svg class="mega-menu-arrow-icon w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>`;
        }

        panel.innerHTML = `
          <div style="max-width:80rem;margin:0 auto;padding:2rem 2rem;display:grid;grid-template-columns:1fr 1fr 320px;gap:2rem;align-items:start;">
            <div>
              <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#60a5fa;margin-bottom:12px;padding-left:16px;">I NOSTRI SERVIZI</div>
              ${services.slice(0, 3).map(renderServiceItem).join('')}
            </div>
            <div>
              <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#60a5fa;margin-bottom:12px;padding-left:16px;">&nbsp;</div>
              ${services.slice(3).map(renderServiceItem).join('')}
              <div style="padding-left:16px;margin-top:16px;">
                <a href="${basePath}services/" class="mega-menu-all-link">
                  Vedi tutti i servizi
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>
            <div class="mega-menu-cta-card">
              <img src="${basePath}images/hero-bg.jpg" alt="Soluzioni digitali su misura" loading="lazy">
              <div class="mega-menu-cta-overlay"></div>
              <div class="mega-menu-cta-content">
                <div style="font-size:18px;font-weight:700;color:#f1f5f9;line-height:1.3;">Soluzioni digitali<br>su misura</div>
                <div style="font-size:13px;color:#cbd5e1;margin-top:8px;line-height:1.5;">Progettiamo e sviluppiamo prodotti digitali che fanno crescere il tuo business.</div>
                <a href="${basePath}#contact" style="display:inline-flex;align-items:center;gap:6px;margin-top:14px;padding:8px 20px;background:#3b82f6;border-radius:9999px;color:white;font-size:13px;font-weight:500;text-decoration:none;transition:background 0.2s;" onmouseover="this.style.background='#60a5fa'" onmouseout="this.style.background='#3b82f6'">
                  Parliamoci
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </a>
              </div>
            </div>
          </div>
        `;

        document.body.appendChild(panel);

        // Hover logic with delay
        let hoverTimeout = null;
        let isOverTrigger = false;
        let isOverPanel = false;

        function showPanel() {
          clearTimeout(hoverTimeout);
          panel.classList.add('mega-menu-visible');
          wrapper.classList.add('mega-menu-open');
        }

        function scheduleHide() {
          hoverTimeout = setTimeout(() => {
            if (!isOverTrigger && !isOverPanel) {
              panel.classList.remove('mega-menu-visible');
              wrapper.classList.remove('mega-menu-open');
            }
          }, 200);
        }

        wrapper.addEventListener('mouseenter', () => { isOverTrigger = true; showPanel(); });
        wrapper.addEventListener('mouseleave', () => { isOverTrigger = false; scheduleHide(); });
        panel.addEventListener('mouseenter', () => { isOverPanel = true; showPanel(); });
        panel.addEventListener('mouseleave', () => { isOverPanel = false; scheduleHide(); });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            isOverTrigger = false;
            isOverPanel = false;
            panel.classList.remove('mega-menu-visible');
            wrapper.classList.remove('mega-menu-open');
          }
        });
      }
    }

    // --- Mobile: Add Home link + Servizi accordion ---
    const mobileMenuLinks = document.querySelector('#mobile-menu .flex.flex-col');
    if (mobileMenuLinks) {
      const mobileServiziLink = Array.from(mobileMenuLinks.querySelectorAll('a')).find(a => a.textContent.trim() === 'Servizi');

      // Add Home link at top of mobile menu
      const mobileHome = document.createElement('a');
      mobileHome.href = basePath;
      mobileHome.className = 'block py-3 text-lg text-slate-300 hover:text-white transition-colors';
      mobileHome.textContent = 'Home';
      mobileMenuLinks.insertBefore(mobileHome, mobileMenuLinks.firstChild);

      // Add "La nostra storia" link in mobile menu (before Contattaci divider)
      const mobileContattaciDiv = mobileMenuLinks.querySelector('.border-t');
      const mobileStoriaLink = document.createElement('a');
      mobileStoriaLink.href = basePath + 'la-nostra-storia.html';
      mobileStoriaLink.className = 'block py-3 text-lg text-slate-300 hover:text-white transition-colors';
      mobileStoriaLink.textContent = 'La nostra storia';
      if (mobileContattaciDiv) {
        mobileMenuLinks.insertBefore(mobileStoriaLink, mobileContattaciDiv);
      } else {
        mobileMenuLinks.appendChild(mobileStoriaLink);
      }

      // Convert Servizi to accordion
      if (mobileServiziLink) {
        const accordionWrapper = document.createElement('div');

        const toggleLink = document.createElement('button');
        toggleLink.type = 'button';
        toggleLink.className = 'flex items-center justify-between w-full py-3 text-lg text-slate-300 hover:text-white transition-colors';
        toggleLink.innerHTML = 'Servizi <svg class="mega-menu-chevron w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>';

        const accordion = document.createElement('div');
        accordion.className = 'mega-menu-mobile-accordion';
        accordion.innerHTML = services.map(s =>
          `<a href="${s.href}" class="mega-menu-mobile-service">
            <span class="icon">${s.emoji}</span>
            ${s.title}
          </a>`
        ).join('') + `<a href="${basePath}services/" class="mega-menu-mobile-service" style="color:#60a5fa;font-weight:500;margin-top:4px;">
            Tutti i servizi &rarr;
          </a>`;

        toggleLink.addEventListener('click', () => {
          accordion.classList.toggle('open');
          const chevron = toggleLink.querySelector('.mega-menu-chevron');
          if (accordion.classList.contains('open')) {
            chevron.style.transform = 'rotate(180deg)';
          } else {
            chevron.style.transform = '';
          }
        });

        accordionWrapper.appendChild(toggleLink);
        accordionWrapper.appendChild(accordion);
        mobileServiziLink.replaceWith(accordionWrapper);
      }
    }
  })();

  // === Scroll Reveal ===
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.scrollRevealDelay || '0', 10);
          setTimeout(() => {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('[data-scroll-reveal]').forEach((el) => {
    revealObserver.observe(el);
  });

  // === Navbar Mobile Menu ===
  const nav = document.getElementById('main-nav');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const toggleBtn = document.getElementById('navbar-toggle');
  const closeBtns = document.querySelectorAll('[data-navbar-close]');

  function openMenu() {
    menu.classList.remove('translate-x-full');
    menu.classList.add('translate-x-0');
    overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    nav.classList.add('navbar-opaque');
  }

  function closeMenu() {
    menu.classList.add('translate-x-full');
    menu.classList.remove('translate-x-0');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    nav.classList.remove('navbar-opaque');
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  closeBtns.forEach((btn) => btn.addEventListener('click', closeMenu));

  // Close menu when mobile nav links are clicked
  document.querySelectorAll('#mobile-menu a[data-section]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // === Active Nav (IntersectionObserver for sections) ===
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const sections = [];

  navLinks.forEach((link) => {
    const sectionId = link.dataset.section;
    const section = document.getElementById(sectionId);
    if (section) {
      sections.push({ id: sectionId, element: section });
    }
  });

  if (sections.length > 0) {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              if (link.dataset.section === entry.target.id) {
                link.classList.add('text-white');
                link.classList.remove('text-slate-300');
              } else {
                link.classList.remove('text-white');
                link.classList.add('text-slate-300');
              }
            });
          }
        });
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => activeObserver.observe(s.element));
  }

  // === Smooth Scroll for nav links ===
  document.querySelectorAll('[data-section]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const sectionId = link.dataset.section;
      const section = document.getElementById(sectionId);
      if (section) {
        e.preventDefault();
        const navbarHeight = 80;
        const top = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // === Contact Form (honeypot + disable) ===
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const honeypot = contactForm.querySelector('[data-honeypot]');
      if (honeypot && honeypot.value !== '') {
        e.preventDefault();
        return;
      }
      const submitBtn = contactForm.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Invio in corso...';
      }
    });
  }
});
