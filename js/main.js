// main.js — Mejoras progresivas AOI Integrated Systems

(function () {
  'use strict';

  // Scroll reveal para cards y títulos de sección (no rompe si no hay IO)
  const targets = document.querySelectorAll(
    '.card, .blog-card, .testimonial, .carousel-card, .section h2, .section .subtitle'
  );

  if ('IntersectionObserver' in window && targets.length) {
    targets.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => io.observe(el));
  }

  // Enlaces a Amazon: target + rel sponsored (defensa extra)
  document.querySelectorAll('a[href*="amazon"]').forEach(a => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'nofollow sponsored noopener');
  });

  // Lazy load en imágenes que no lo tengan
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  console.log('AOI Integrated Systems — premium ready.');
})();