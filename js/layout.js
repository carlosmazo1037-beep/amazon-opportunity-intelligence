document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  const navHTML = `
    <nav class="nav">
      <div class="nav-inner">
        <a href="index.html" class="logo">
          <img src="img/logo.png" alt="AOI Integrated Systems">
          <span>AOI Integrated Systems</span>
        </a>
        <div class="nav-links">
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
});
