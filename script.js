/* ════════════════════════════════════════════════════════════════════
   DZXapps — Landing Page Script
   ════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Smooth scroll for in-page links ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileMenu();
      }
    });
  });

  /* ─── Nav background on scroll ───────────────────────────────── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ─── Mobile menu toggle ──────────────────────────────────────── */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    if (burger) burger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
  }

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  /* ─── Scroll reveal animation ─────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ─── Screens showcase tabs ───────────────────────────────────── */
  const screenTabs = document.querySelectorAll('.screen-tab');
  const screenTexts = document.querySelectorAll('.screen-text');
  const screenPhones = document.querySelectorAll('.screen-phone');

  function activateScreen(key) {
    screenTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.screen === key));
    screenTexts.forEach(t => t.classList.toggle('active', t.dataset.screen === key));
    screenPhones.forEach(p => p.classList.toggle('active', p.dataset.screen === key));
  }

  screenTabs.forEach(tab => {
    tab.addEventListener('click', () => activateScreen(tab.dataset.screen));
  });

  /* Optional: auto-cycle through screens every 6s, pause on interaction */
  let autoCycle = true;
  let cycleIndex = 0;
  const screenKeys = Array.from(screenTabs).map(t => t.dataset.screen);

  let cycleTimer = setInterval(() => {
    if (!autoCycle || !screenKeys.length) return;
    cycleIndex = (cycleIndex + 1) % screenKeys.length;
    activateScreen(screenKeys[cycleIndex]);
  }, 6000);

  screenTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      autoCycle = false;
      clearInterval(cycleTimer);
    });
  });

  /* ─── Contact form — opens a pre-filled mailto to support@DZXapps.com ─── */
  const contactForm = document.getElementById('contactForm');
  const contactNote = document.getElementById('contactNote');
  const SUPPORT_EMAIL = 'support@DZXapps.com';

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value.trim() || '';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      const subject = `Melding fra ${name || 'DZXapps.com'}`;
      const body = `${message}\n\n— ${name}\n${email}`;

      const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      if (contactNote) {
        contactNote.textContent = 'Åpner e-postappen din med meldingen ferdig utfylt …';
      }
      contactForm.reset();
    });
  }

});
