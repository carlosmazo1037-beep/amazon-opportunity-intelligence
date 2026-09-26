const contacto = {
  pinterest: 'https://www.pinterest.com/TU_USUARIO',
  medium: 'https://medium.com/@TU_USUARIO',
  tiktok: 'https://www.tiktok.com/@TU_USUARIO',
  email: 'contacto@aoiintegrated.com'
};

function renderContacto(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;
  
  const redes = [
    { nombre: 'Pinterest', url: contacto.pinterest },
    { nombre: 'Medium', url: contacto.medium },
    { nombre: 'TikTok', url: contacto.tiktok },
    { nombre: 'Email', url: `mailto:${contacto.email}` }
  ].filter(r => r.url && r.url !== '');
  
  contenedor.innerHTML = redes.map(r => 
    `<a href="${r.url}" target="_blank" rel="noopener">${r.nombre}</a>`
  ).join('');
}
