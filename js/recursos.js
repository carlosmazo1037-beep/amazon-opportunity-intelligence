const recursos = [
  {
    id: 'ebook-48h',
    nombre: 'The 48-Hour Declutter',
    tag: 'Recurso Digital',
    badge: 'Recomendado',
    descripcion: 'El plan táctico para transformar tu casa del caos a la calma en solo dos días. Sin agobios, solo un sistema paso a paso que funciona.',
    imagen: 'img/The48HourDeclutter.jpg',
    enlace: 'https://www.affyro.com/The48-Hour.html#aff=carlosmazo1037c76a'
  }
];

function renderRecursos(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;
  
  contenedor.innerHTML = recursos.map(p => `
    <div class="card">
      ${p.badge ? `<span class="badge-seller">${p.badge}</span>` : ''}
      <img src="${p.imagen}" alt="${p.nombre}">
      <div class="card-body">
        <span class="tag">${p.tag}</span>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <a class="btn" href="${p.enlace}" target="_blank" rel="nofollow sponsored noopener">Ver guía</a>
      </div>
    </div>
  `).join('');
}
