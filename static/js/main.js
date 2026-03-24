/* ═══════════════════════════════════════════════════════════════════════════
   ARCHITECT — v2 Site JavaScript
   Scroll effects, navigation, mobile menu, form handling
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // 1. SCROLL REVEAL (enhanced — handles all directional variants + stagger)
  const revealSelectors = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .bento-card, .leader-card';

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll(revealSelectors).forEach(el => {
    revealObserver.observe(el);
  });

  // Accent line observer — reveals gold lines on scroll
  const accentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        accentObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.accent-line').forEach(el => {
    accentObserver.observe(el);
  });

  // Stagger children — parent with [data-stagger] triggers children sequentially
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('.scroll-stagger-child');
        children.forEach((child, i) => {
          child.style.animationDelay = `${i * 0.15}s`;
          child.classList.add('visible');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('[data-stagger]').forEach(el => {
    staggerObserver.observe(el);
  });


  // 2. HEADER SCROLL — transparent at top, solid on scroll
  const header = document.getElementById('main-nav');
  const navAccent = document.getElementById('nav-accent');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
        header.style.backgroundColor = 'rgba(14, 14, 14, 0.92)';
        header.style.backdropFilter = 'blur(24px)';
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
        if (navAccent) navAccent.classList.add('visible');
      } else {
        header.classList.remove('scrolled');
        header.style.backgroundColor = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';
        if (navAccent) navAccent.classList.remove('visible');
      }
    }, { passive: true });
  }


  // 3. MOBILE MENU
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu    = document.getElementById('mobile-menu');
  const menuIcon      = document.getElementById('menu-icon');

  if (mobileMenuBtn && mobileMenu) {
    let menuOpen = false;
    mobileMenuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        mobileMenu.classList.add('active');
        menuIcon.textContent = 'close';
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.remove('active');
        menuIcon.textContent = 'menu';
        document.body.style.overflow = '';
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuIcon.textContent = 'menu';
        document.body.style.overflow = '';
        menuOpen = false;
      });
    });
  }


  // 4. SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // 5. CONTACT FORM
  const contactForm    = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      successMessage.classList.remove('hidden');
      successMessage.style.display = 'block';
    });
  }


  // 6. TEXTAREA AUTO-RESIZE
  const messageField = document.getElementById('message');
  if (messageField) {
    messageField.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  }





  // 8. STAGGERED GRID REVEALS
  document.querySelectorAll('.services-grid .scroll-reveal, .services-grid .scroll-reveal-left, .services-grid .scroll-reveal-right').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.12}s`;
  });


  // 9. HLS HERO VIDEO BACKGROUND
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    const hlsSrc = 'https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8';

    function initHeroVideo() {
      if (heroVideo.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari: native HLS support
        heroVideo.src = hlsSrc;
        heroVideo.play().catch(() => {});
      } else if (typeof Hls !== 'undefined' && Hls.isSupported()) {
        // Chrome / Firefox: use hls.js
        const hls = new Hls({ enableWorker: true });
        hls.loadSource(hlsSrc);
        hls.attachMedia(heroVideo);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          heroVideo.play().catch(() => {});
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.warn('HLS error, falling back to CSS curtain');
          }
        });
      }
    }

    // Fade in video smoothly once it starts playing
    heroVideo.addEventListener('playing', () => {
      heroVideo.classList.add('loaded');
    });

    // Seamless loop: seek back just before end to avoid visible gap/cut
    heroVideo.addEventListener('timeupdate', () => {
      if (heroVideo.duration && heroVideo.currentTime > heroVideo.duration - 0.5) {
        heroVideo.currentTime = 0.1;
        heroVideo.play().catch(() => {});
      }
    });

    initHeroVideo();
  }

});
