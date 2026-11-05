// main.js — Interacción de AOI Integrated Systems
// Reveal + Carrusel (espera render) + Búsqueda de catálogo

(function () {
  'use strict';

  /* =========================================================
     1. REVEAL AL SCROLL
     ========================================================= */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll(
      '.card, .blog-card, .testimonial, .carousel-card, .category-card, .how-step, .section h2'
    );
    if (!targets.length) return;

    targets.forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(el => io.observe(el));
  }

  /* =========================================================
     2. CARRUSEL — se inicializa cuando el track tiene hijos
     (Soluciona el problema de que renderGuias se ejecuta después)
     ========================================================= */
  function setupCarousel(wrapper) {
    const track = wrapper.querySelector('.carousel-track');
    if (!track || !track.children.length) return;
    if (wrapper.dataset.carouselReady === '1') return;
    wrapper.dataset.carouselReady = '1';

    let offset = 0;
    let isDragging = false;
    let startX = 0;
    let startOffset = 0;
    let autoPlayId = null;

    const getStep = () => {
      const first = track.children[0];
      if (!first) return 300;
      const gap = parseFloat(getComputedStyle(track).gap) || 18;
      return first.getBoundingClientRect().width + gap;
    };

    const getMaxOffset = () => Math.max(0, track.scrollWidth - wrapper.clientWidth);
    const clamp = v => Math.max(-getMaxOffset(), Math.min(0, v));
    const apply = () => { track.style.transform = `translateX(${offset}px)`; };

    const next = () => { offset = clamp(offset - getStep()); apply(); };
    const prev = () => { offset = clamp(offset + getStep()); apply(); };

    // Flechas
    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    nav.innerHTML = `
      <button class="carousel-btn carousel-btn--prev" aria-label="Anterior" type="button">‹</button>
      <button class="carousel-btn carousel-btn--next" aria-label="Siguiente" type="button">›</button>
    `;
    wrapper.appendChild(nav);

    nav.querySelector('.carousel-btn--prev').addEventListener('click', () => { prev(); restartAutoPlay(); });
    nav.querySelector('.carousel-btn--next').addEventListener('click', () => { next(); restartAutoPlay(); });

    // Drag
    const onDown = x => {
      isDragging = true;
      startX = x;
      startOffset = offset;
      track.style.transition = 'none';
      wrapper.classList.add('is-dragging');
      stopAutoPlay();
    };
    const onMove = x => {
      if (!isDragging) return;
      offset = clamp(startOffset + (x - startX));
      apply();
    };
    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = '';
      wrapper.classList.remove('is-dragging');
      const step = getStep();
      offset = clamp(Math.round(offset / step) * step);
      apply();
      restartAutoPlay();
    };

    wrapper.addEventListener('mousedown', e => {
      if (e.target.closest('.read')) return; // no bloquear clic del botón
      onDown(e.clientX);
    });
    window.addEventListener('mousemove', e => onMove(e.clientX));
    window.addEventListener('mouseup', onUp);
    wrapper.addEventListener('touchstart', e => onDown(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchmove', e => { if (isDragging) onMove(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', onUp);

    // Autoplay pausable
    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', restartAutoPlay);

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayId = setInterval(() => {
        if (getMaxOffset() === 0) return; // no hay overflow
        if (offset <= -getMaxOffset() + 4) {
          offset = 0;
          track.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
          apply();
        } else {
          next();
        }
      }, 3500);
    }
    function stopAutoPlay() { if (autoPlayId) { clearInterval(autoPlayId); autoPlayId = null; } }
    function restartAutoPlay() { startAutoPlay(); }

    // Iniciar autoplay tras un pequeño delay (evita saltos raros al cargar)
    setTimeout(startAutoPlay, 600);
  }

  function initCarousel() {
    document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
      const track = wrapper.querySelector('.carousel-track');
      if (!track) return;

      if (track.children.length > 0) {
        setupCarousel(wrapper);
      } else {
        // Esperar a que renderGuias / renderProductos llenen el track
        const observer = new MutationObserver(() => {
          if (track.children.length > 0) {
            observer.disconnect();
            setupCarousel(wrapper);
          }
        });
        observer.observe(track, { childList: true });
      }
    });
  }

  /* =========================================================
     3. BÚSQUEDA DE CATÁLOGO (solo en productos.html)
     ========================================================= */
  function initCatalogSearch() {
    const input = document.getElementById('productSearch');
    const clearBtn = document.getElementById('searchClear');
    const chips = document.querySelectorAll('.chip');
    const resultCount = document.getElementById('resultCount');
    const searchSection = document.getElementById('searchResultsSection');
    const searchResults = document.getElementById('searchResults');
    const emptyState = document.getElementById('emptyState');
    const categoryContainer = document.getElementById('categorySections');

    if (!input || !searchResults || !searchSection) return;

    function getAllCards() {
      return Array.from(document.querySelectorAll('.card[id]')).filter(
        c => !c.closest('#searchResults')
      );
    }

    function normalize(str) {
      return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function getCardText(card) {
      return normalize(
        (card.querySelector('h3')?.textContent || '') + ' ' +
        (card.querySelector('.tag')?.textContent || '') + ' ' +
        (card.querySelector('p')?.textContent || '')
      );
    }

    function runSearch(query, activeCategory) {
      const q = normalize(query.trim());
      const isSearching = q.length > 0 || (activeCategory && activeCategory !== 'all');

      if (!isSearching) {
        searchSection.style.display = 'none';
        if (categoryContainer) categoryContainer.style.display = '';
        if (resultCount) resultCount.textContent = '';
        if (clearBtn) clearBtn.classList.remove('visible');
        if (emptyState) emptyState.style.display = 'none';
        return;
      }

      if (categoryContainer) categoryContainer.style.display = 'none';

      const matches = getAllCards().filter(card => {
        const text = getCardText(card);
        const tag = normalize(card.querySelector('.tag')?.textContent || '');
        const matchesQuery = !q || text.includes(q);
        const matchesCategory = !activeCategory || activeCategory === 'all' || tag === normalize(activeCategory);
        return matchesQuery && matchesCategory;
      });

      searchResults.innerHTML = '';
      matches.forEach(card => {
        const clone = card.cloneNode(true);
        clone.removeAttribute('id');
        searchResults.appendChild(clone);
      });

      searchSection.style.display = '';
      if (clearBtn) clearBtn.classList.toggle('visible', q.length > 0);
      if (resultCount) {
        const label = matches.length === 1 ? 'producto' : 'productos';
        resultCount.textContent = `${matches.length} ${label} encontrado${matches.length === 1 ? '' : 's'}`;
      }
      if (emptyState) emptyState.style.display = matches.length === 0 ? '' : 'none';
      searchResults.style.display = matches.length === 0 ? 'none' : '';
    }

    let debounce;
    input.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const active = document.querySelector('.chip.is-active');
        runSearch(input.value, active ? active.dataset.category : 'all');
      }, 150);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus();
        runSearch('', 'all');
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        runSearch(input.value, chip.dataset.category);
      });
    });

    window.clearSearch = () => {
      input.value = '';
      runSearch('', 'all');
    };
  }

  /* =========================================================
     4. INIT
     ========================================================= */
  function init() {
    initReveal();
    initCarousel();
    initCatalogSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();