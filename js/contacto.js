const contacto = {
  pinterest: 'https://www.pinterest.com/carlosmazo10371041',
  medium: 'https://medium.com/@carlosmazo1037',
  tiktok: 'https://www.tiktok.com/@carlosmazo1037',
  email: 'carlosmazo1037@gmail.com'//'contacto@aoiintegrated.com'
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
