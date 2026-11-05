document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navHTML = `
    <nav class="nav" id="siteNav">
      <div class="nav-inner">
        <a href="index.html" class="logo">
          <img src="img/logo.png" alt="AOI Integrated Systems">
          <div>
            AOI INTEGRATED
            <span>SYSTEMS PLATFORM</span>
          </div>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <div class="nav-links" id="navLinks">
          <a href="productos.html" class="${currentPage === 'productos.html' ? 'active' : ''}">Catálogo</a>
          <a href="index.html#recursos" class="${currentPage === 'index.html' ? 'active' : ''}">Optimización</a>
          <a href="index.html#blog">Protocolo</a>
          <a href="nosotros.html" class="${currentPage === 'nosotros.html' ? 'active' : ''}">Preguntas</a>
          <a href="index.html#contacto">Contacto</a>
          <a href="productos.html" class="nav-cta">
            🛒 VER PRODUCTOS
          </a>
        </div>
      </div>
    </nav>
  `;

  const footerHTML = `
    <footer>
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <h5>
              <img src="img/logo.png" alt="Logo" style="height:24px;"> 
              AOI INTEGRATED
            </h5>
            <p>Soluciones y productos recomendados para organizar y mejorar tu vida diaria. Plataforma guiada por criterios de practicidad, conveniencia y eficiencia.</p>
            <div class="footer-social">
              <a href="https://www.pinterest.com/carlosmazo10371041" target="_blank" rel="noopener">P</a>
              <a href="https://medium.com/@carlosmazo1037" target="_blank" rel="noopener">M</a>
              <a href="https://www.tiktok.com/@carlosmazo1037" target="_blank" rel="noopener">T</a>
            </div>
          </div>
          <div class="footer-col">
            <h6>Navegación</h6>
            <ul>
              <li><a href="index.html">Inicio</a></li>
              <li><a href="productos.html">Catálogo de Productos</a></li>
              <li><a href="index.html#blog">Casos de Optimización</a></li>
              <li><a href="nosotros.html">Protocolo de Revisión</a></li>
              <li><a href="index.html#contacto">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h6>Categorías</h6>
            <ul>
              <li><a href="productos.html#cat-home-office">Oficina & Ergonomía</a></li>
              <li><a href="productos.html#cat-hogar">Almacenamiento Hogar</a></li>
              <li><a href="productos.html#cat-cocina">Cocina & Meal Prep</a></li>
              <li><a href="productos.html#cat-herramientas">Herramientas & Mascotas</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h6>Contacto Oficial</h6>
            <ul>
              <li><a href="tel:+573332586572">📞 +57 3332586572</a></li>
              <li><a href="mailto:carlosmazo1037@gmail.com">✉️ carlosmazo1037@gmail.com</a></li>
              <li><a href="#">📍 Calle 57 a sur, Medellín, Antioquia, 050029, CO</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="disclosure">© AOI Integrated Systems. Todos los derechos reservados.<br>AOI Integrated Systems participa en programas de recomendación de afiliados. Los enlaces provistos redirigen a tiendas autorizadas como Amazon.</p>
          <a href="productos.html">Catálogo Oficial de Productos ↗</a>
        </div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
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
});