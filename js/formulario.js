const WEB3FORMS_ACCESS_KEY = '162beb59-485d-47f0-a0e6-8751f0fee919';

function renderFormularioContacto(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;
  
  contenedor.innerHTML = `
    <form id="contactForm" class="contact-form">
      <input type="hidden" name="access_key" value="${WEB3FORMS_ACCESS_KEY}">
      <input type="hidden" name="subject" value="Nuevo mensaje desde AOI Integrated Systems">
      <input type="checkbox" name="botcheck" class="hidden" style="display:none">
      
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="tu@email.com" required>
      </div>
      
      <div class="form-group">
        <label for="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows="5" placeholder="Escribe tu mensaje..." required></textarea>
      </div>
      
      <button type="submit" class="btn-primary">Enviar mensaje</button>
      <p id="formStatus" class="form-status"></p>
    </form>
  `;
  
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    status.textContent = 'Enviando...';
    status.className = 'form-status';
    
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        status.textContent = '¡Mensaje enviado! Te responderemos pronto.';
        status.className = 'form-status success';
        form.reset();
      } else {
        status.textContent = 'Error al enviar. Intenta de nuevo.';
        status.className = 'form-status error';
      }
    } catch (error) {
      status.textContent = 'Error de conexión. Intenta de nuevo.';
      status.className = 'form-status error';
    }
  });
}
