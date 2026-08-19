/* ════════════════════════════════════════════════════════════════════
   DZXapps — MainzIQ Landing Page
   ════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ================================================================
     MOBILE MENU
     ================================================================ */

  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    if (!burger || !mobileMenu) return;

    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && mobileMenu) {

    burger.addEventListener('click', () => {

      const isOpen = burger.classList.toggle('open');

      mobileMenu.classList.toggle('open');

      burger.setAttribute(
        'aria-expanded',
        isOpen ? 'true' : 'false'
      );

    });

  }


  /* ================================================================
     SMOOTH SCROLL
     ================================================================ */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', event => {

      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      closeMobileMenu();

    });

  });


  /* ================================================================
     NAVIGATION BACKGROUND ON SCROLL
     ================================================================ */

  const nav = document.getElementById('nav');

  function updateNav() {

    if (!nav) {
      return;
    }

    nav.classList.toggle(
      'scrolled',
      window.scrollY > 24
    );

  }

  window.addEventListener(
    'scroll',
    updateNav,
    { passive: true }
  );

  updateNav();


  /* ================================================================
     SCROLL REVEAL
     ================================================================ */

  const revealElements =
    document.querySelectorAll('.reveal');

  if (
    'IntersectionObserver' in window &&
    revealElements.length
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add('visible');

            revealObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        }
      );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add('visible');
    });

  }


  /* ================================================================
     APP SCREEN SHOWCASE
     ================================================================ */

  const screenTabs =
    document.querySelectorAll('.screen-tab');

  const screenTexts =
    document.querySelectorAll('.screen-text');

  const screenPhones =
    document.querySelectorAll('.screen-phone');


  function activateScreen(key) {

    screenTabs.forEach(tab => {

      tab.classList.toggle(
        'active',
        tab.dataset.screen === key
      );

    });


    screenTexts.forEach(text => {

      text.classList.toggle(
        'active',
        text.dataset.screen === key
      );

    });


    screenPhones.forEach(phone => {

      phone.classList.toggle(
        'active',
        phone.dataset.screen === key
      );

    });

  }


  screenTabs.forEach(tab => {

    tab.addEventListener('click', () => {

      activateScreen(
        tab.dataset.screen
      );

      stopAutoCycle();

    });

  });


  /* ================================================================
     AUTO-CYCLE
     ================================================================ */

  let autoCycle = true;
  let cycleIndex = 0;
  let cycleTimer = null;

  const screenKeys =
    Array.from(screenTabs)
      .map(tab => tab.dataset.screen);


  function stopAutoCycle() {

    autoCycle = false;

    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }

  }


  if (screenKeys.length > 1) {

    cycleTimer = setInterval(() => {

      if (!autoCycle) {
        return;
      }

      cycleIndex =
        (cycleIndex + 1) %
        screenKeys.length;

      activateScreen(
        screenKeys[cycleIndex]
      );

    }, 6000);

  }


  /* ================================================================
     PAUSE AUTO-CYCLE WHEN USER HOVERS OVER SHOWCASE
     ================================================================ */

  const screenSection =
    document.querySelector('.screens');

  if (screenSection) {

    screenSection.addEventListener(
      'mouseenter',
      () => {
        autoCycle = false;
      }
    );

    screenSection.addEventListener(
      'mouseleave',
      () => {

        if (!cycleTimer) {
          return;
        }

        autoCycle = true;

      }
    );

  }


  /* ================================================================
     ESC KEY CLOSES MOBILE MENU
     ================================================================ */

  document.addEventListener(
    'keydown',
    event => {

      if (event.key === 'Escape') {
        closeMobileMenu();
      }

    }
  );

});
