const WEB3FORMS_ACCESS_KEY = '162beb59-485d-47f0-a0e6-8751f0fee919';

function renderFormularioContacto(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;
  
  contenedor.innerHTML = `
    <form id="contactForm" class="contact-form">
      <input type="hidden" name="access_key" value="${WEB3FORMS_ACCESS_KEY}">
      <input type="hidden" name="subject" value="Nuevo mensaje desde AOI Integrated Systems">
      <input type="hidden" name="from_name" value="AOI Integrated Systems">
      
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
      
      <button type="submit" class="btn-primary" id="btnEnviar">Enviar mensaje</button>
      <p id="formStatus" class="form-status"></p>
    </form>
  `;
  
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const btn = document.getElementById('btnEnviar');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    status.textContent = '';
    
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });
      
      const result = await response.json();
      
      if (result.success) {
       status.innerHTML = '✅ ¡Mensaje enviado con éxito!<br><span style="font-size: 0.85rem; color: #6e6e73;">Muchas gracias por escribirnos. Te responderemos lo antes posible.</span>';
        status.className = 'form-status success';
        form.reset();
      } else {
        status.textContent = 'Error: ' + (result.message || 'Intenta de nuevo.');
        status.className = 'form-status error';
      }
    } catch (error) {
      status.textContent = 'Error de conexión. Intenta de nuevo.';
      status.className = 'form-status error';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Enviar mensaje';
    }
  });
}
