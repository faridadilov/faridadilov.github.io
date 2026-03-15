
(function () {
  'use strict';

  /* Dynamic copyright year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });


  const revealTargets = document.querySelectorAll(
    '.section-card, .highlight-card, .site-main h2, .site-main h3, .site-main p, .site-main li, .intro-section'
  );

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.style.animationDelay = '0s';
    el.style.animation = 'none';
  });

  let revealDelay = 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay || 0;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  let lastParent = null;
  let groupIndex = 0;
  revealTargets.forEach(el => {
    const parent = el.parentElement;
    if (parent !== lastParent) {
      groupIndex = 0;
      lastParent = parent;
    }
    el.dataset.revealDelay = groupIndex * 60;
    groupIndex++;
    observer.observe(el);
  });


  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    btn.classList.toggle('visible', y > 400);

    // Shrink header on scroll
    const header = document.querySelector('.site-header');
    if (header) {
      header.classList.toggle('scrolled', y > 60);
    }
    lastScroll = y;
  }, { passive: true });


  document.querySelectorAll('.highlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateY(0) rotateX(0)';
      card.style.transition = 'transform 0.4s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });


  document.querySelectorAll('.section-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-3px)';
      card.style.boxShadow = '0 8px 28px rgba(27, 54, 93, 0.1)';
      card.style.borderColor = 'var(--color-blue)';
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 1px 4px rgba(0,0,0,0.03)';
      card.style.borderColor = 'var(--color-border-light)';
    });
  });


  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    // Replace inline onclick with JS
    toggle.removeAttribute('onclick');
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('open');
      toggle.classList.toggle('active');
      if (isOpen) {
        nav.style.maxHeight = '0';
        setTimeout(() => {
          nav.classList.remove('open');
          nav.style.maxHeight = '';
        }, 300);
      } else {
        nav.classList.add('open');
        nav.style.maxHeight = nav.scrollHeight + 'px';
        setTimeout(() => { nav.style.maxHeight = ''; }, 350);
      }
    });
  }


  document.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'nav-ripple';
      const rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

})();
