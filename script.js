document.addEventListener('DOMContentLoaded', () => {
  // Burger menu functionality
  const burgerMenu = document.getElementById('burger-menu');
  const navPanel = document.getElementById('nav-panel');
  const closeNav = document.getElementById('close-nav');
  
  if (burgerMenu && navPanel && closeNav) {
    burgerMenu.addEventListener('click', () => {
      navPanel.classList.add('open');
      burgerMenu.classList.add('hidden');
    });
    
    closeNav.addEventListener('click', () => {
      navPanel.classList.remove('open');
      burgerMenu.classList.remove('hidden');
    });
    
    // Close menu when clicking outside
    navPanel.addEventListener('click', (e) => {
      if (e.target === navPanel) {
        navPanel.classList.remove('open');
        burgerMenu.classList.remove('hidden');
      }
    });
  }

  // GSAP: focal hero motion + scroll reveal. Progressive enhancement only —
  // the page is already fully visible and usable via CSS defaults if this
  // script or the vendored GSAP files fail to load.
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Images below the fold (showcase screenshots, hero devices) have no
    // explicit dimensions, so the page grows taller as they load in. Without
    // this, ScrollTrigger caches trigger positions from the shorter
    // pre-image-load layout, and later triggers (showcase, footer) can end
    // up unreachable — stuck at opacity:0 forever.
    window.addEventListener('load', () => ScrollTrigger.refresh());

    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('reveal-ready');
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => el.classList.add('reveal-visible'),
      });
    });

    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const devices = document.querySelectorAll('.device--front, .device--mid, .device--back');
      if (!devices.length) return;

      // One bound group, fixed phase offsets (not independent/drifting bobs):
      // the three phones "breathe together" in product order (diary, calendar, share).
      const floatTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
      devices.forEach((el, i) => {
        floatTl.to(el, { '--float-y': '-7px', duration: 2 }, i * 0.6);
      });

      // Nonessential loop stops when the hero is offscreen.
      ScrollTrigger.create({
        trigger: '.hero-visual',
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play pause resume pause',
        animation: floatTl,
      });

      return () => floatTl.kill();
    });
  }
});