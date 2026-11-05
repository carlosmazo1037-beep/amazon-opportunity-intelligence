// main.js — Capa de interacción AOI Integrated Systems
// No modifica contenido, solo añade comportamiento visual.

(function () {
  'use strict';

  /* =========================================================
     1. REVEAL AL SCROLL
     Anima cards, títulos y bloques al entrar en viewport.
     ========================================================= */
  function initReveal() {
    const targets = document.querySelectorAll(
      '.card, .blog-card, .testimonial, .carousel-card, .section h2, .section .subtitle, .hero-content > *'
    );
    if (!targets.length || !('IntersectionObserver' in window)) return;

    targets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => io.observe(el));
  }

  /* =========================================================
     2. CARRUSEL DE GUÍAS CON FLECHAS + DRAG + PAUSA
     Convierte el carrusel CSS en uno interactivo.
     ========================================================= */
  function initCarousel() {
    const wrapper = document.querySelector('.carousel-wrapper');
    const track = document.querySelector('.carousel-track');
    if (!wrapper || !track) return;

    // Pausar animación CSS y controlar por JS
    track.style.animation = 'none';
    track.style.transition = 'transform .45s cubic-bezier(.2,.7,.2,1)';

    let offset = 0;
    let isDragging = false;
    let startX = 0;
    let startOffset = 0;
    let autoPlayId = null;

    const getStep = () => {
      const card = track.querySelector('.carousel-card');
      if (!card) return 300;
      const gap = 18;
      return card.offsetWidth + gap;
    };

    const getMaxOffset = () => {
      return Math.max(0, track.scrollWidth - wrapper.offsetWidth);
    };

    const clamp = (v) => Math.max(-getMaxOffset(), Math.min(0, v));

    const apply = () => {
      track.style.transform = `translateX(${offset}px)`;
    };

    const next = () => {
      offset = clamp(offset - getStep());
      apply();
    };

    const prev = () => {
      offset = clamp(offset + getStep());
      apply();
    };

    // Flechas
    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    nav.innerHTML = `
      <button class="carousel-btn carousel-btn--prev" aria-label="Anterior">‹</button>
      <button class="carousel-btn carousel-btn--next" aria-label="Siguiente">›</button>
    `;
    wrapper.appendChild(nav);

    nav.querySelector('.carousel-btn--prev').addEventListener('click', () => {
      prev();
      restartAutoPlay();
    });
    nav.querySelector('.carousel-btn--next').addEventListener('click', () => {
      next();
      restartAutoPlay();
    });

    // Drag / swipe
    const onDown = (x) => {
      isDragging = true;
      startX = x;
      startOffset = offset;
      track.style.transition = 'none';
      wrapper.classList.add('is-dragging');
      stopAutoPlay();
    };
    const onMove = (x) => {
      if (!isDragging) return;
      const delta = x - startX;
      offset = clamp(startOffset + delta);
      apply();
    };
    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = 'transform .45s cubic-bezier(.2,.7,.2,1)';
      wrapper.classList.remove('is-dragging');
      // Snap al step más cercano
      const step = getStep();
      offset = clamp(Math.round(offset / step) * step);
      apply();
      restartAutoPlay();
    };

    wrapper.addEventListener('mousedown', (e) => onDown(e.clientX));
    window.addEventListener('mousemove', (e) => onMove(e.clientX));
    window.addEventListener('mouseup', onUp);
    wrapper.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (isDragging) onMove(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', onUp);

    // Pausa al hover
    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', restartAutoPlay);

    // Autoplay suave
    function startAutoPlay() {
      stopAutoPlay();
      autoPlayId = setInterval(() => {
        if (offset <= -getMaxOffset() + 4) {
          offset = 0;
          apply();
        } else {
          next();
        }
      }, 3800);
    }
    function stopAutoPlay() {
      if (autoPlayId) {
        clearInterval(autoPlayId);
        autoPlayId = null;
      }
    }
    function restartAutoPlay() {
      startAutoPlay();
    }

    startAutoPlay();
  }

  /* =========================================================
     3. TILT 3D EN CARDS DE PRODUCTO
     Da sensación de profundidad al mover el mouse.
     ========================================================= */
  function initTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* =========================================================
     4. RIPPLE EN BOTONES
     Feedback al hacer clic.
     ========================================================= */
  function initRipple() {
    document.querySelectorAll('.btn, .btn-primary, .btn-secondary').forEach((btn) => {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /* =========================================================
     5. CONTADORES ANIMADOS
     Anima números en stats (si existen).
     ========================================================= */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10) || 0;
          const duration = 1400;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => io.observe(el));
  }

  /* =========================================================
     6. SCROLL PROGRESS BAR
     Barra superior que indica avance de lectura.
     ========================================================= */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.transform = `scaleX(${Math.min(scrolled, 1)})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* =========================================================
     7. SCROLL SPY EN NAV
     Marca el link activo según la sección visible.
     ========================================================= */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a[href*="#"]');
    if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href').endsWith('#' + id));
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* =========================================================
     8. PULSO EN BADGES "MÁS VENDIDO"
     Llama la atención sin ser molesto.
     ========================================================= */
  function initBadgePulse() {
    document.querySelectorAll('.badge-seller').forEach((badge, i) => {
      badge.style.animationDelay = i * 0.25 + 's';
      badge.classList.add('pulse');
    });
  }

  /* =========================================================
     9. INIT
     ========================================================= */
  function init() {
    initReveal();
    initCarousel();
    initTilt();
    initRipple();
    initCounters();
    initScrollProgress();
    initScrollSpy();
    initBadgePulse();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }



  /* =========================================================
   BUSCADOR DE CATÁLOGO + FILTROS POR CHIP
   ========================================================= */
(function initCatalogSearch() {
  const input = document.getElementById('productSearch');
  const clearBtn = document.getElementById('searchClear');
  const chips = document.querySelectorAll('.chip');
  const resultCount = document.getElementById('resultCount');
  const searchSection = document.getElementById('searchResultsSection');
  const searchResults = document.getElementById('searchResults');
  const emptyState = document.getElementById('emptyState');
  const categorySections = document.querySelectorAll('.catalog-section');
  const categoryContainer = document.getElementById('categorySections');

  if (!input || !searchResults) return;

  // Recolecta todos los productos renderizados en el DOM (cards)
  function getAllCards() {
    return Array.from(document.querySelectorAll('.card[id]')).filter(
      (card) => card.closest('#searchResults') === null
    );
  }

  // Normaliza texto para búsqueda sin acentos
  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Obtiene el texto buscable de una card
  function getCardText(card) {
    return normalize(
      (card.querySelector('h3')?.textContent || '') +
        ' ' +
        (card.querySelector('.tag')?.textContent || '') +
        ' ' +
        (card.querySelector('p')?.textContent || '')
    );
  }

  // Filtra y muestra resultados
  function runSearch(query, activeCategory) {
    const q = normalize(query.trim());
    const allCards = getAllCards();

    // Modo búsqueda: hay texto o categoría distinta de "all"
    const isSearching = q.length > 0 || (activeCategory && activeCategory !== 'all');

    if (!isSearching) {
      // Restaurar vista normal
      searchSection.style.display = 'none';
      categoryContainer.style.display = '';
      categorySections.forEach((s) => s.classList.remove('is-hidden'));
      resultCount.textContent = '';
      clearBtn.classList.remove('visible');
      // Restaurar chips
      chips.forEach((c) => c.classList.toggle('is-active', c.dataset.category === 'all'));
      return;
    }

    // Ocultar secciones normales
    categoryContainer.style.display = 'none';

    // Filtrar cards
    const matches = allCards.filter((card) => {
      const text = getCardText(card);
      const tag = normalize(card.querySelector('.tag')?.textContent || '');

      const matchesQuery = !q || text.includes(q);
      const matchesCategory =
        !activeCategory || activeCategory === 'all' || tag === normalize(activeCategory);

      return matchesQuery && matchesCategory;
    });

    // Renderizar resultados clonando las cards
    searchResults.innerHTML = '';
    matches.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.style.animation = 'none'; // evita re-animación
      searchResults.appendChild(clone);
    });

    // Mostrar sección de resultados
    searchSection.style.display = '';
    clearBtn.classList.toggle('visible', q.length > 0);

    // Contador
    const label = matches.length === 1 ? 'producto' : 'productos';
    resultCount.textContent = `${matches.length} ${label} encontrado${matches.length === 1 ? '' : 's'}`;

    // Empty state
    emptyState.style.display = matches.length === 0 ? '' : 'none';
    searchResults.style.display = matches.length === 0 ? 'none' : '';
  }

  // Evento: escribir en el buscador
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const activeChip = document.querySelector('.chip.is-active');
      const category = activeChip ? activeChip.dataset.category : 'all';
      runSearch(input.value, category);
    }, 150);
  });

  // Evento: limpiar búsqueda
  clearBtn?.addEventListener('click', () => {
    input.value = '';
    input.focus();
    runSearch('', 'all');
  });

  // Evento: chips de categoría
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      runSearch(input.value, chip.dataset.category);
    });
  });

  // Función global para el botón del empty state
  window.clearSearch = function () {
    input.value = '';
    runSearch('', 'all');
  };
})();

})();