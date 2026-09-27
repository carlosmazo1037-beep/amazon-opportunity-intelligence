const guias = [
  {
    id: 'escritorio',
    titulo: 'Cómo Organizar tu Escritorio en 15 Minutos',
    descripcion: 'El cambio más simple que transformó mi espacio de trabajo.',
    enlace: 'https://medium.com/@carlosmazo1037/desk-organizer-2f7507d1d26b'
  },
  {
    id: 'pelo-mascota',
    titulo: 'Cómo Quitar el Pelo de Mascota de tus Muebles',
    descripcion: 'La solución que sí funciona y por qué las otras fallan.',
    enlace: 'https://medium.com/@carlosmazo1037/c%C3%B3mo-quitar-el-pelo-de-mascota-de-tus-muebles-9e91850c1ff8'
  },
  {
    id: 'Organizar-Despensa ',
    titulo: 'Cómo Organizar tu Despensa con Recipientes Transparentes (Y Que Todo se Vea)',
    descripcion: 'Abrir la despensa y no encontrar nada es una de esas cosas que parecen pequeñas pero desgastan todos los días.',
    enlace: 'https://medium.com/@carlosmazo1037/pantry-organizer-c109a33b86ff'
  },
  {
    id: 'Organizar-Comidas',
    titulo: 'Cómo Organizar tus Comidas de la Semana sin Que se Derramen en el Camino',
    descripcion: 'Preparar la comida de la semana es una de las mejores decisiones que puedes tomar para ahorrar tiempo y dinero.',
    enlace: 'https://medium.com/@carlosmazo1037/los-mejores-recipientes-para-meal-prep-305b144ecb1c'
  },
  {
    id: 'correa-retractil',
    titulo: 'Cómo Evitar que tu Perro se Enrede con la Correa en Cada Paseo',
    descripcion: 'Pasear a un perro debería ser relajante.',
    enlace: 'https://medium.com/@carlosmazo1037/dog-leash-da39366023cd'
  },
  {
    id: 'moho',
    titulo: 'Cómo Eliminar el Moho de la Lavadora',
    descripcion: 'Gel removedor que actúa sin frotar.',
    enlace: 'https://medium.com/@carlosmazo1037/c%C3%B3mo-eliminar-el-moho-del-ba%C3%B1o-gu%C3%ADa-paso-a-paso-2a21b0c1b211'
  },
  {
    id: 'Air-Fryer',
    titulo: 'Accesorios Imprescindibles para tu Air Fryer: Cómo Mantenerla Limpia sin Perder Tiempo',
    descripcion: 'La freidora de aire se volvió el electrodoméstico favorito de muchas cocinas.',
    enlace: 'https://medium.com/@carlosmazo1037/5-accesorios-imprescindibles-para-tu-air-fryer-df98e3d0df4a'
  },
  {
    id: 'Estantes flotantes',
    titulo: 'Estantes flotantes — Aprovechan las paredes verticales sin ocupar suelo.',
    descripcion: 'Cuando vives en un espacio pequeño, cada centímetro cuenta.',
    enlace: 'https://medium.com/@carlosmazo1037/7-ideas-de-almacenamiento-para-apartamentos-peque%C3%B1os-d48416029001'
  }
];

function renderGuias(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;
  
  contenedor.innerHTML = guias.map(g => `
    <a class="carousel-card" href="${g.enlace}" target="_blank" rel="noopener">
      <h4>${g.titulo}</h4>
      <p>${g.descripcion}</p>
      <span class="read">Leer guía →</span>
    </a>
  `).join('');
}
