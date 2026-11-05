document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navHTML = `
    <nav class="nav" id="siteNav">
      <div class="nav-inner">
        <a href="index.html" class="logo">
          <img src="img/logo.png" alt="AOI Integrated Systems">
          <span>AOI Integrated Systems</span>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menú" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="nav-links" id="navLinks">
          <a href="productos.html" class="${currentPage === 'productos.html' ? 'active' : ''}">Productos</a>
          <a href="index.html#recursos" class="${currentPage === 'index.html' ? 'active' : ''}">Recursos</a>
          <a href="nosotros.html" class="${currentPage === 'nosotros.html' ? 'active' : ''}">Nosotros</a>
          <a href="index.html#contacto">Contacto</a>
        </div>
      </div>
    </nav>
  `;

  const footerHTML = `
    <footer>
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <h5>AOI Integrated Systems</h5>
            <p>Productos probados y guías prácticas para organizar tu hogar y oficina. Recomendaciones honestas, sin ruido.</p>
          </div>
          <div class="footer-col">
            <h6>Explorar</h6>
            <ul>
              <li><a href="productos.html">Productos</a></li>
              <li><a href="index.html#recursos">Recursos</a></li>
              <li><a href="index.html#blog">Guías</a></li>
              <li><a href="nosotros.html">Nosotros</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h6>Legal</h6>
            <ul>
              <li><a href="politicas.html">Políticas y Divulgación</a></li>
              <li><a href="politicas.html#privacidad">Privacidad</a></li>
              <li><a href="politicas.html#cookies">Cookies</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h6>Contacto</h6>
            <ul>
              <li><a href="index.html#contacto">Escríbenos</a></li>
              <li><a href="mailto:carlosmazo1037@gmail.com">Email</a></li>
              <li><a href="https://www.pinterest.com/carlosmazo10371041" target="_blank" rel="noopener">Pinterest</a></li>
              <li><a href="https://www.tiktok.com/@carlosmazo1037" target="_blank" rel="noopener">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="disclosure">Como Afiliado de Amazon y Digistore24, gano comisiones por las compras elegibles que se realicen a través de mis enlaces. Este sitio contiene enlaces de afiliado.</p>
          <p>© 2026 AOI Integrated Systems. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  const nav = document.getElementById('siteNav');

  if (toggle && links) {
    toggle.addEventListener('click', function() {
      const isOpen = toggle.classList.toggle('open');
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', function() {
        toggle.classList.remove('open');
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});