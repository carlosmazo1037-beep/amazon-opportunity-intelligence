(function () {
  'use strict';

  // 1. Reveal al scroll (sin conflicto)
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('.card, .carousel-card, .category-card, .how-step');
    targets.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    targets.forEach(el => io.observe(el));
  }

  // 2. Carrusel de Guías y Productos
  function setupCarousel(wrapper) {
    const track = wrapper.querySelector('.carousel-track');
    if (!track) return;

    // Esperar a que renderGuias() llene el track
    if (track.children.length === 0) {
      const observer = new MutationObserver(() => {
        if (track.children.length > 0) {
          observer.disconnect();
          startCarousel(wrapper, track);
        }
      });
      observer.observe(track, { childList: true });
    } else {
      startCarousel(wrapper, track);
    }
  }

  function startCarousel(wrapper, track) {
    if (wrapper.dataset.ready === '1') return;
    wrapper.dataset.ready = '1';

    let offset = 0;
    let isDragging = false;
    let startX = 0;
    let startOffset = 0;
    let autoPlayId = null;

    const getStep = () => {
      const first = track.children[0];
      if (!first) return 300;
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      return first.getBoundingClientRect().width + gap;
    };

    const getMaxOffset = () => Math.max(0, track.scrollWidth - wrapper.clientWidth);
    const clamp = v => Math.max(-getMaxOffset(), Math.min(0, v));
    const apply = () => { track.style.transform = `translateX(${offset}px)`; };

    // Flechas
    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    nav.innerHTML = `
      <button class="carousel-btn prev" type="button">‹</button>
      <button class="carousel-btn next" type="button">›</button>
    `;
    wrapper.appendChild(nav);

    nav.querySelector('.prev').addEventListener('click', () => { offset = clamp(offset + getStep()); apply(); restart(); });
    nav.querySelector('.next').addEventListener('click', () => { offset = clamp(offset - getStep()); apply(); restart(); });

    // Drag
    const onDown = x => {
      isDragging = true; startX = x; startOffset = offset;
      track.style.transition = 'none';
      stop();
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
      offset = clamp(Math.round(offset / getStep()) * getStep());
      apply();
      restart();
    };

    wrapper.addEventListener('mousedown', e => { if (!e.target.closest('a')) onDown(e.clientX); });
    window.addEventListener('mousemove', e => onMove(e.clientX));
    window.addEventListener('mouseup', onUp);
    wrapper.addEventListener('touchstart', e => { if (!e.target.closest('a')) onDown(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', e => { if (isDragging) onMove(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', onUp);

    wrapper.addEventListener('mouseenter', stop);
    wrapper.addEventListener('mouseleave', restart);

    function start() {
      stop();
      autoPlayId = setInterval(() => {
        if (getMaxOffset() === 0) return;
        if (offset <= -getMaxOffset() + 4) {
          offset = 0;
          track.style.transition = 'transform .8s cubic-bezier(.2,.7,.2,1)';
          apply();
        } else {
          offset = clamp(offset - getStep());
          apply();
        }
      }, 3500); // Gira cada 3.5s constantemente
    }
    function stop() { if (autoPlayId) { clearInterval(autoPlayId); autoPlayId = null; } }
    function restart() { start(); }

    setTimeout(start, 600);
  }

  function initCarousels() {
    document.querySelectorAll('.carousel-wrapper').forEach(setupCarousel);
  }

  // 3. Buscador del Catálogo
  function initCatalogSearch() {
    const input = document.getElementById('productSearch');
    if (!input) return;

    const clearBtn = document.getElementById('searchClear');
    const chips = document.querySelectorAll('.chip');
    const resultCount = document.getElementById('resultCount');
    const searchSection = document.getElementById('searchResultsSection');
    const searchResults = document.getElementById('searchResults');
    const emptyState = document.getElementById('emptyState');
    const categoryContainer = document.getElementById('categorySections');

    function getAllCards() {
      return Array.from(document.querySelectorAll('.card[id]')).filter(c => !c.closest('#searchResults'));
    }

    function normalize(str) {
      return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function getCardText(card) {
      return normalize(
        (card.querySelector('h3')?.textContent || '') + ' ' +
        (card.querySelector('.card-top-bar span')?.textContent || '') + ' ' +
        (card.querySelector('p')?.textContent || '') + ' ' +
        (card.querySelector('.card-tags')?.textContent || '')
      );
    }

    function runSearch(query, activeCategory) {
      const q = normalize(query.trim());
      const isSearching = q.length > 0 || (activeCategory && activeCategory !== 'all');

      if (!isSearching) {
        searchSection.style.display = 'none';
        categoryContainer.style.display = '';
        if (resultCount) resultCount.textContent = '';
        if (clearBtn) clearBtn.classList.remove('visible');
        return;
      }

      categoryContainer.style.display = 'none';
      const matches = getAllCards().filter(card => {
        const text = getCardText(card);
        const tag = normalize(card.querySelector('.card-top-bar span')?.textContent || '');
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
        const label = matches.length === 1 ? 'módulo' : 'módulos';
        resultCount.textContent = `[SYS.LOG] ${matches.length} ${label} encontrados.`;
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
      }, 200);
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

  // INIT
  function init() {
    initReveal();
    initCarousels();
    initCatalogSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();