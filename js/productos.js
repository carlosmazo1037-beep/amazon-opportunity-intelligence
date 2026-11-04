const productos = [
  {
    id: 'organizador-gianotter',
    nombre: 'Organizador de Escritorio Gianotter 4 Niveles',
    tag: 'Home Office',
    badge: 'Más vendido',
    descripcion: 'Con cajón deslizante y 2 portalápices. Ordena tu espacio de trabajo.',
    imagen: 'img/organizador-gianotter.jpg',
    enlace: 'https://amzn.to/46Jsdmx'
  },
  {
    id: 'brazo-monitor',
    nombre: 'Brazo de Monitor ErGear Ajustable',
    tag: 'Ergonomía',
    descripcion: 'Para pantallas de 13–34 pulgadas. Mejora tu postura y libera espacio.',
    imagen: 'img/brazo-monitor.jpg',
    enlace: 'https://amzn.to/4xIwLEE'
  },
  {
    id: 'bridas-cable',
    nombre: 'Bridas de Cable Reutilizables Nettbe (60 uds)',
    tag: 'Cables',
    badge: 'Más vendido',
    descripcion: 'Organiza todos los cables sin enredos. Ajustables y reutilizables.',
    imagen: 'img/bridas-cable.jpg',
    enlace: 'https://amzn.to/4yVRcPF'
  },
  {
    id: 'Pelota-grande',
    nombre: 'Pelota grande de alta calidad con copos de nieve, elevación lenta sin olor, no tóxica',
    tag: 'Salud y Bienestar',
    badge: 'Más vendido',
    descripcion: 'lindo juguete sensorial para apretar, propiedad de una familia estadounidense, fácil de limpiar, duradera, Alivio silencioso del estrés',
    imagen: 'img/Kiedle.png',
    enlace: 'https://amzn.to/4hAnie0'
  },
  {
    id: 'organizador-cajones',
    nombre: 'Organizador de Cajones con Divisiones',
    tag: 'Cajones',
    descripcion: 'Para que cada cosa tenga su lugar. Ajustable y fácil de limpiar.',
    imagen: 'img/organizador-cajones.jpg',
    enlace: 'https://amzn.to/3T77Qg2'
  },
  {
    id: 'cajas-apilables',
    nombre: 'Cajas Apilables para Armarios y Clósets',
    tag: 'Clósets',
    descripcion: 'Aprovecha el espacio vertical. Protegen la ropa del polvo y la humedad.',
    imagen: 'img/cajas-apilables.jpg',
    enlace: 'https://amzn.to/4y8PhHj'
  },
  {
    id: 'ganchos-adhesivos',
    nombre: 'Ganchos Adhesivos sin Taladrar',
    tag: 'Paredes',
    descripcion: 'Para puertas y paredes. Soportan peso y se quitan sin dejar marca.',
    imagen: 'img/ganchos-adhesivos.jpg',
    enlace: 'https://amzn.to/4hNejFh'
  },
  {
    id: 'bolsas-vacio',
    nombre: 'Bolsas de Vacío para Cobijas y Ropa',
    tag: 'Almacenamiento',
    descripcion: 'Reduce el volumen hasta un 80%. Protege del polvo y la humedad.',
    imagen: 'img/bolsas-vacio.jpg',
    enlace: 'https://amzn.to/4yZJyE0'
  },
  {
    id: 'cesta-lavanderia',
    nombre: 'Cesta de Lavandería Plegable',
    tag: 'Lavandería',
    descripcion: 'Se guarda cuando no se usa. Perfecta para espacios pequeños.',
    imagen: 'img/cesta-lavanderia.jpg',
    enlace: 'https://amzn.to/4cZrXDx'
  },
  {
    id: 'organizador-fregadero',
    nombre: 'Organizador de 2 Niveles bajo Fregadero',
    tag: 'Cocina',
    descripcion: 'Aprovecha el espacio que todos ignoramos. Se adapta a las tuberías.',
    imagen: 'img/organizador-fregadero.jpg',
    enlace: 'https://amzn.to/4xMJbM2'
  },
  {
    id: 'organizador-giratorio',
    nombre: 'Organizador Giratorio LAMU 2 Niveles',
    tag: 'Cocina',
    descripcion: 'Gira 360°. Perfecto para especias, frascos y botiquín.',
    imagen: 'img/organizador-giratorio.jpg',
    enlace: 'https://amzn.to/4xNa9TF'
  },
  {
    id: 'recipientes-rubbermaid',
    nombre: 'Recipientes Rubbermaid Brilliance (Set 5)',
    tag: 'Meal Prep',
    descripcion: 'Sin BPA, con tapas herméticas. Para almuerzo, meal prep y sobras.',
    imagen: 'img/recipientes-rubbermaid.jpg',
    enlace: 'https://amzn.to/4y8xDU8'
  },
  {
    id: 'recipientes-dealusy',
    nombre: 'Recipientes Dealusy con Tapa (50 uds)',
    tag: 'Meal Prep',
    descripcion: 'A prueba de fugas. Aptos para microondas, congelador y lavavajillas.',
    imagen: 'img/recipientes-dealusy.jpg',
    enlace: 'https://amzn.to/4hcoBzE'
  },
  {
    id: 'recipientes-vtopmart',
    nombre: 'Recipientes Vtopmart para Despensa (8 uds)',
    tag: 'Despensa',
    descripcion: 'Transparentes y apilables. Para cocina, refrigerador y armario.',
    imagen: 'img/recipientes-vtopmart.jpg',
    enlace: 'https://amzn.to/4hLCwwE'
  },
  {
    id: 'forros-airfryer',
    nombre: 'Forros de Silicona para Freidora de Aire (2 uds)',
    tag: 'Air Fryer',
    descripcion: 'Compatibles con Ninja y COSORI. Ahorran tiempo de limpieza.',
    imagen: 'img/forros-airfryer.jpg',
    enlace: 'https://amzn.to/4hki0lj'
  },
  {
    id: 'rodillos-pelusa',
    nombre: 'Rodillos de Pelusa para Mascotas (Pack 5)',
    tag: 'Mascotas',
    badge: 'Nuevo',
    descripcion: 'Elimina el pelo de perro y gato de sofás, ropa y alfombras.',
    imagen: 'img/rodillos-pelusa.jpg',
    enlace: 'https://amzn.to/4yj8AOr'
  },
  {
    id: 'correa-perro',
    nombre: 'Correa Retráctil Antienredos TUG',
    tag: 'Paseo',
    descripcion: '16 pies, freno de una mano. Para perros medianos.',
    imagen: 'img/correa-perro.jpg',
    enlace: 'https://amzn.to/4h7VMEo'
  },
  {
    id: 'gel-moho',
    nombre: 'Gel Limpiador de Moho (8 oz)',
    tag: 'Limpieza',
    descripcion: 'Para juntas de lavadora, calafateo de ducha y lechada de baño.',
    imagen: 'img/gel-moho.jpg',
    enlace: 'https://amzn.to/4rxpgyX'
  },
  {
    id: 'estante-flotante',
    nombre: 'Conjunto de Estantes Flotantes (3 uds)',
    tag: 'Limpieza',
    descripcion: 'Aprovechan las paredes verticales sin ocupar suelo.',
    imagen: 'img/estante-flotante.jpg',
    enlace: 'https://amzn.to/4xMJbM2'
  },
  {
    id: 'recipientes-reutilizables-dealusy',
    nombre: 'Recipientes Reutilizables Dealusy (50 uds)',
    tag: 'Limpieza',
    descripcion: 'Recipientes con tapa reutilizables de 24 onzas para alimentos preparados, resistentes, a prueba de fugas, seguros, aptos para microondas, congelador y lavavajillas.',
    imagen: 'img/recipientes-reutilizables.jpg',
    enlace: 'https://amzn.to/4hcoBzE'
  },
  {
    id: 'sierra-circular-inalambrica',
    nombre: 'Sierra circular inalámbrica de 20 V MAX',
    tag: 'herramientas',
    descripcion: 'Haz cortes exigentes con facilidad utilizando el 20 V MAX* 6-1/2 pulgadas. Sierra circular. Con un 6-1/2 pulgadas. Hoja con punta de carburo alimentada por un potente motor de 5.150 rpm, este cortador de madera ligero ofrece una capacidad de bisel de 0 a 50 para la máxima versatilidad de una sierra de mano eléctrica. La batería y el cargador se venden por separado',
    imagen: 'img/sierra.jpg',
    enlace: 'https://amzn.to/4s9F4IJ'
  },
  {
    id: 'fOXBC-Hoja-sierra',
    nombre: 'FOXBC Hoja de sierra circular de 6-1/2 pulgadas',
    tag: 'herramientas',
    descripcion: 'FOXBC Hoja de sierra circular de 6-1/2 pulgadas 40T 60T Paquete Combo, Acabado Ultra Fino para Corte de Madera, Ranura Delgada con Árbol de 5/8 pulgadas.',
    imagen: 'img/discos.jpg',
    enlace: 'https://link.amazon/B07yqMDif'
  },
  {
    id: 'pistola-pulverización',
    nombre: 'Pistola de pulverización de aire HVLP 819',
    tag: 'herramientas',
    descripcion: 'Kit de pistola de pulverización de aire HVLP 819 con boquillas de HVLP - Pulverizador de pintura con regulador y separador de aceite y agua, pistola de pintura en aerosol automotriz.',
    imagen: 'img/pintura.jpg',
    enlace: 'https://amzn.to/3VQsRMT'
  },
  {
    id: 'kasa-Smart-Light',
    nombre: 'Kasa Smart Light Switch, Single Pole, Need Neutral Wire, HS200 Wi-Fi de 2.4 GHz, funciona con Alexa y Google Home, certificado UL, no requiere concentrador, blanco',
    tag: 'herramientas',
    descripcion: 'Diseñado y desarrollado en Silicon Valley, Kasa cuenta con la confianza de más de 4 millones de usuarios. Certificado UL para uso seguro. Dimensiones sin panel: 4.13 x 1.71 x 1.74 pulgadas. Requisitos del sistema: Android 5.0 o superior, iOS 10 o superior.',
    imagen: 'img/luz.jpg',
    enlace: 'https://amzn.to/4B3skXX'
  },
  {
    id: 'toma-corriente',
    nombre: 'Toma de corriente USB, 4.8 A',
    tag: 'herramientas',
    descripcion: 'Toma de corriente USB, 4.8 A de alta velocidad USB C/A, puertos de cargador de pared, toma de pared de receptáculo resistente a manipulaciones de 20 amperios, placa de pared sin tornillos.',
    imagen: 'img/toma.jpg',
    enlace: 'https://amzn.to/4sgf4LF'
  },
  {
    id: 'camara',
    nombre: 'Tewiky Cámara web Full HD',
    tag: 'tecnología',
    descripcion: 'Tewiky Cámara web Full HD con micrófono integrado y trípode giratorio, video 1080P y cámara gran angular, cubierta de privacidad, para PC de escritorio o computadora portátil.',
    imagen: 'img/camera.mp4',
    enlace: 'https://amzn.to/4y3fAOu'
  }
];

function renderProductos(contenedorId, limite) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;
  
  const lista = limite ? productos.slice(0, limite) : productos;
  
  contenedor.innerHTML = lista.map(p => `
    <div class="card" id="${p.id}">
      ${p.badge ? `<span class="badge-seller">${p.badge}</span>` : ''}
      <img src="${p.imagen}" alt="${p.nombre}">
      <div class="card-body">
        <span class="tag">${p.tag}</span>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <a class="btn" href="${p.enlace}" target="_blank" rel="nofollow sponsored noopener">Ver en Amazon</a>
      </div>
    </div>
  `).join('');
}

function renderProductosPorCategoria(contenedorId, ids) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;
  
  const lista = productos.filter(p => ids.includes(p.id));
  
  contenedor.innerHTML = lista.map(p => `
    <div class="card" id="${p.id}">
      ${p.badge ? `<span class="badge-seller">${p.badge}</span>` : ''}
      <img src="${p.imagen}" alt="${p.nombre}">
      <div class="card-body">
        <span class="tag">${p.tag}</span>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <a class="btn" href="${p.enlace}" target="_blank" rel="nofollow sponsored noopener">Ver en Amazon</a>
      </div>
    </div>
  `).join('');
}