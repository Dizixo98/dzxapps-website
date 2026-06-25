/* ════════════════════════════════════════════════════════════════════
   DZXapps — Landing Page Script
   ════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Smooth scroll for in-page links ────────────────────────── */
  /* Handles both "#contact" (pure anchor) and "index.html#contact"
     (anchor links that also include the filename, used on privacy.html
     and terms.html so the link works from any page). When the target
     anchor exists on the CURRENT page, we intercept the click and smooth
     scroll directly instead of letting the browser reload/jump, which
     previously caused a visible "jump to top, then scroll down" effect. */
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const hashIndex = href.indexOf('#');
    const pathPart = href.slice(0, hashIndex);   // e.g. "" or "index.html"
    const hashPart = href.slice(hashIndex);       // e.g. "#contact"

    // Resolve whether this link points at the current page.
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const pointsToCurrentPage = pathPart === '' || pathPart === currentFile;

    if (!pointsToCurrentPage) return; // let the browser navigate normally (e.g. privacy.html -> index.html#contact)

    const target = document.querySelector(hashPart);
    if (!target) return; // no matching element on this page; let default behavior happen

    link.addEventListener('click', e => {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
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

});
