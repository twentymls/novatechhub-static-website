document.addEventListener('DOMContentLoaded', () => {
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
