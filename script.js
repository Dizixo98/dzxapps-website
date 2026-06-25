/* ════════════════════════════════════════════════════════════════════
   DZXapps — Landing Page Script
   ════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Smooth scroll for pure in-page anchor links (nav, mobile menu) ─── */
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

  /* ─── Footer "Kontakt" link: always smooth-scroll on this page ───────
     This link uses href="index.html#contact" so it still works correctly
     when clicked from privacy.html or terms.html (full navigation there).
     But when we're already on index.html, we want a smooth scroll instead
     of a hard reload-then-jump. We target it directly by id rather than
     trying to pattern-match every link on the page. */
  const footerContactLink = document.getElementById('footerContactLink');
  const contactSection = document.getElementById('contact');

  if (footerContactLink && contactSection) {
    footerContactLink.addEventListener('click', e => {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    });
  }

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

});
