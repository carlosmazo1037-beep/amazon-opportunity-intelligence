const productos = [
  {
    id: 'organizador-gianotter',
    nombre: 'Organizador de Escritorio Gianotter 4 Niveles',
    tag: 'Home Office',
    badge: 'SYS.BEST',
    descripcion: 'Con cajón deslizante y 2 portalápices. Ordena tu espacio de trabajo con estructura modular.',
    features: ['4 NIVELES', 'CAJÓN DESLIZANTE', 'PORTALÁPICES'],
    imagen: 'img/organizador-gianotter.jpg',
    enlace: 'https://amzn.to/46Jsdmx'
  },
  {
    id: 'brazo-monitor',
    nombre: 'Brazo de Monitor ErGear Ajustable',
    tag: 'Ergonomía',
    descripcion: 'Para pantallas de 13–34 pulgadas. Mejora tu postura y libera espacio en la superficie.',
    features: ['13-34"', 'AJUSTABLE', 'ERGONÓMICO'],
    imagen: 'img/brazo-monitor.jpg',
    enlace: 'https://amzn.to/4xIwLEE'
  },
  {
    id: 'bridas-cable',
    nombre: 'Bridas de Cable Reutilizables Nettbe (60 uds)',
    tag: 'Cables',
    badge: 'SYS.BEST',
    descripcion: 'Organiza todos los cables sin enredos. Ajustables, reutilizables y de alta resistencia.',
    features: ['60 UDS', 'REUTILIZABLE', 'AJUSTABLE'],
    imagen: 'img/bridas-cable.jpg',
    enlace: 'https://amzn.to/4yVRcPF'
  },
  {
    id: 'Pelota-grande',
    nombre: 'Pelota sensorial de alta calidad (Kiedle)',
    tag: 'Salud y Bienestar',
    badge: 'SYS.BEST',
    descripcion: 'Juguete sensorial no tóxico, fácil de limpiar, duradero. Alivio silencioso del estrés.',
    features: ['NO TÓXICO', 'SENSORIAL', 'ANTIESTRÉS'],
    imagen: 'img/Kiedle.png',
    enlace: 'https://amzn.to/4hAnie0'
  },
  {
    id: 'organizador-cajones',
    nombre: 'Organizador de Cajones con Divisiones',
    tag: 'Cajones',
    descripcion: 'Para que cada cosa tenga su lugar. Ajustable, modular y fácil de limpiar.',
    features: ['AJUSTABLE', 'MODULAR'],
    imagen: 'img/organizador-cajones.jpg',
    enlace: 'https://amzn.to/3T77Qg2'
  },
  {
    id: 'cajas-apilables',
    nombre: 'Cajas Apilables para Armarios y Clósets',
    tag: 'Clósets',
    descripcion: 'Aprovecha el espacio vertical. Protegen la ropa del polvo y la humedad.',
    features: ['APILABLE', 'PROTECCIÓN', 'VERTICAL'],
    imagen: 'img/cajas-apilables.jpg',
    enlace: 'https://amzn.to/4y8PhHj'
  },
  {
    id: 'ganchos-adhesivos',
    nombre: 'Ganchos Adhesivos sin Taladrar',
    tag: 'Paredes',
    descripcion: 'Para puertas y paredes. Soportan peso y se quitan sin dejar marca.',
    features: ['SIN TALADRO', 'ALTA CARGA', 'RESIDUO CERO'],
    imagen: 'img/ganchos-adhesivos.jpg',
    enlace: 'https://amzn.to/4hNejFh'
  },
  {
    id: 'bolsas-vacio',
    nombre: 'Bolsas de Vacío para Cobijas y Ropa',
    tag: 'Almacenamiento',
    descripcion: 'Reduce el volumen hasta un 80%. Protege del polvo y la humedad.',
    features: ['AHORRO 80%', 'HERMÉTICO', 'PROTECCIÓN'],
    imagen: 'img/bolsas-vacio.jpg',
    enlace: 'https://amzn.to/4yZJyE0'
  },
  {
    id: 'cesta-lavanderia',
    nombre: 'Cesta de Lavandería Plegable',
    tag: 'Lavandería',
    descripcion: 'Se guarda cuando no se usa. Perfecta para espacios pequeños o compactos.',
    features: ['PLEGABLE', 'ESPACIO REDUCIDO'],
    imagen: 'img/cesta-lavanderia.jpg',
    enlace: 'https://amzn.to/4cZrXDx'
  },
  {
    id: 'organizador-fregadero',
    nombre: 'Organizador de 2 Niveles bajo Fregadero',
    tag: 'Cocina',
    descripcion: 'Aprovecha el espacio que todos ignoramos. Se adapta a las tuberías.',
    features: ['2 NIVELES', 'ADAPTABLE'],
    imagen: 'img/organizador-fregadero.jpg',
    enlace: 'https://amzn.to/4xMJbM2'
  },
  {
    id: 'organizador-giratorio',
    nombre: 'Organizador Giratorio LAMU 2 Niveles',
    tag: 'Cocina',
    descripcion: 'Gira 360°. Perfecto para especias, frascos y botiquín.',
    features: ['ROTACIÓN 360°', '2 NIVELES'],
    imagen: 'img/organizador-giratorio.jpg',
    enlace: 'https://amzn.to/4xNa9TF'
  },
  {
    id: 'recipientes-rubbermaid',
    nombre: 'Recipientes Rubbermaid Brilliance (Set 5)',
    tag: 'Meal Prep',
    descripcion: 'Sin BPA, con tapas herméticas. Para almuerzo, meal prep y sobras.',
    features: ['SET 5', 'SIN BPA', 'HERMÉTICO'],
    imagen: 'img/recipientes-rubbermaid.jpg',
    enlace: 'https://amzn.to/4y8xDU8'
  },
  {
    id: 'recipientes-dealusy',
    nombre: 'Recipientes Dealusy con Tapa (50 uds)',
    tag: 'Meal Prep',
    descripcion: 'A prueba de fugas. Aptos para microondas, congelador y lavavajillas.',
    features: ['50 UDS', 'LEAK-PROOF', 'MICROONDAS'],
    imagen: 'img/recipientes-dealusy.jpg',
    enlace: 'https://amzn.to/4hcoBzE'
  },
  {
    id: 'recipientes-vtopmart',
    nombre: 'Recipientes Vtopmart para Despensa (8 uds)',
    tag: 'Despensa',
    descripcion: 'Transparentes y apilables. Para cocina, refrigerador y armario.',
    features: ['8 UDS', 'APILABLE', 'TRANSPARENTE'],
    imagen: 'img/recipientes-vtopmart.jpg',
    enlace: 'https://amzn.to/4hLCwwE'
  },
  {
    id: 'forros-airfryer',
    nombre: 'Forros de Silicona para Freidora de Aire (2 uds)',
    tag: 'Air Fryer',
    descripcion: 'Compatibles con Ninja y COSORI. Ahorran tiempo de limpieza.',
    features: ['SILICONA', '2 UDS', 'REUTILIZABLE'],
    imagen: 'img/forros-airfryer.jpg',
    enlace: 'https://amzn.to/4hki0lj'
  },
  {
    id: 'rodillos-pelusa',
    nombre: 'Rodillos de Pelusa para Mascotas (Pack 5)',
    tag: 'Mascotas',
    badge: 'SYS.NEW',
    descripcion: 'Elimina el pelo de perro y gato de sofás, ropa y alfombras.',
    features: ['PACK 5', 'REUTILIZABLE'],
    imagen: 'img/rodillos-pelusa.jpg',
    enlace: 'https://amzn.to/4yj8AOr'
  },
  {
    id: 'correa-perro',
    nombre: 'Correa Retráctil Antienredos TUG',
    tag: 'Paseo',
    descripcion: '16 pies, freno de una mano. Para perros medianos.',
    features: ['16 PIES', 'ANTIENREDOS', 'FRENO 1 MANO'],
    imagen: 'img/correa-perro.jpg',
    enlace: 'https://amzn.to/4h7VMEo'
  },
  {
    id: 'gel-moho',
    nombre: 'Gel Limpiador de Moho (8 oz)',
    tag: 'Limpieza',
    descripcion: 'Para juntas de lavadora, calafateo de ducha y lechada de baño.',
    features: ['8 OZ', 'ACCIÓN PROFUNDA'],
    imagen: 'img/gel-moho.jpg',
    enlace: 'https://amzn.to/4rxpgyX'
  },
  {
    id: 'sierra-circular-inalambrica',
    nombre: 'Sierra circular inalámbrica de 20 V MAX',
    tag: 'Herramientas',
    descripcion: 'Haz cortes exigentes con facilidad. Motor de 5.150 rpm y bisel de 0 a 50 grados.',
    features: ['20V MAX', '5150 RPM', 'INALÁMBRICA'],
    imagen: 'img/sierra.jpg',
    enlace: 'https://amzn.to/4s9F4IJ'
  },
  {
    id: 'fOXBC-Hoja-sierra',
    nombre: 'FOXBC Hoja de sierra circular 6-1/2"',
    tag: 'Herramientas',
    descripcion: 'Paquete Combo 40T 60T. Acabado Ultra Fino para Corte de Madera.',
    features: ['6-1/2"', '40T/60T', 'CARBURO'],
    imagen: 'img/discos.png',
    enlace: 'https://link.amazon/B07yqMDif'
  },
  {
    id: 'pistola-pulverización',
    nombre: 'Pistola de pulverización HVLP 819',
    tag: 'Herramientas',
    descripcion: 'Kit con boquillas, regulador y separador de aceite/agua. Aerosol automotriz.',
    features: ['HVLP', 'REGULADOR', 'KIT COMPLETO'],
    imagen: 'img/pintura.jpg',
    enlace: 'https://amzn.to/3VQsRMT'
  },
  {
    id: 'kasa-Smart-Light',
    nombre: 'Kasa Smart Light Switch HS200',
    tag: 'Herramientas',
    descripcion: 'Wi-Fi 2.4 GHz. Funciona con Alexa y Google Home. Certificado UL.',
    features: ['WI-FI', 'ALEXA', 'CERTIFICADO UL'],
    imagen: 'img/luz.jpg',
    enlace: 'https://amzn.to/4B3skXX'
  },
  {
    id: 'toma-corriente',
    nombre: 'Toma de corriente USB, 4.8 A',
    tag: 'Herramientas',
    descripcion: 'Puertos de cargador USB C/A de alta velocidad. Receptáculo de 20 amperios.',
    features: ['4.8A', 'USB-C/A', '20A'],
    imagen: 'img/toma.jpg',
    enlace: 'https://amzn.to/4sgf4LF'
  },
  {
    id: 'camara',
    nombre: 'Tewiky Cámara web Full HD',
    tag: 'Tecnología',
    descripcion: 'Micrófono integrado, trípode giratorio, video 1080P, cubierta de privacidad.',
    features: ['1080P', 'MICRÓFONO', 'TRÍPODE'],
    imagen: 'img/camara.jpg',
    enlace: 'https://amzn.to/4y3fAOu'
  }
];

function renderProductos(contenedorSelector, limite) {
  const contenedor = document.querySelector(contenedorSelector);
  if (!contenedor) return;
  
  const lista = limite ? productos.slice(0, limite) : productos;
  
  contenedor.innerHTML = lista.map(p => `
    <div class="card" id="${p.id}">
      <div class="card-top-bar">
        <span>${p.tag}</span>
        ${p.badge ? `<span>${p.badge}</span>` : ''}
      </div>
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      <div class="card-body">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        ${p.features ? `
          <div class="card-tags">
            ${p.features.map(f => `<span class="card-tag">${f}</span>`).join('')}
          </div>
        ` : ''}
        <a class="btn" href="${p.enlace}" target="_blank" rel="nofollow sponsored noopener">
          VER EN AMAZON 🛒
        </a>
      </div>
    </div>
  `).join('');
}

function renderProductosPorCategoria(contenedorSelector, ids) {
  const contenedor = document.querySelector(contenedorSelector);
  if (!contenedor) return;
  
  const lista = productos.filter(p => ids.includes(p.id));
  
  contenedor.innerHTML = lista.map(p => `
    <div class="card" id="${p.id}">
      <div class="card-top-bar">
        <span>${p.tag}</span>
        ${p.badge ? `<span>${p.badge}</span>` : ''}
      </div>
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      <div class="card-body">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        ${p.features ? `
          <div class="card-tags">
            ${p.features.map(f => `<span class="card-tag">${f}</span>`).join('')}
          </div>
        ` : ''}
        <a class="btn" href="${p.enlace}" target="_blank" rel="nofollow sponsored noopener">
          VER EN AMAZON 🛒
        </a>
      </div>
    </div>
  `).join('');
}