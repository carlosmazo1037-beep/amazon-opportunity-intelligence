document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  const navHTML = `
    <nav class="nav">
      <div class="nav-inner">
        <a href="index.html" class="logo">
          <img src="img/logo.png" alt="AOI Integrated Systems">
          <span>AOI Integrated Systems</span>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="nav-links" id="navLinks">
          <a href="productos.html" class="${currentPage === 'productos.html' ? 'active' : ''}">Productos</a>
          <a href="nosotros.html" class="${currentPage === 'nosotros.html' ? 'active' : ''}">Nosotros</a>
          <a href="index.html#contacto">Contacto</a>
        </div>
      </div>
    </nav>
  `;
  
  const footerHTML = `
    <footer>
      <p class="disclosure">Como Afiliado de Amazon, gano comisiones por las compras adyacentes que cumplan los requisitos. Este sitio contiene enlaces de afiliado.</p>
      <p>© 2026 AOI Integrated Systems. Todos los derechos reservados.</p>
    </footer>
  `;
  
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
  
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', function() {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }
});
