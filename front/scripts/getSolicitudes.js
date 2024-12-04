const container = document.getElementById('container');

async function cargarSolicitudes() {
    try {
        const response = await fetch('http://localhost:3000/api/solicitudes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        const fragment = document.createDocumentFragment(); // Crear fragmento para agregar elementos

        data.forEach(solicitud => {
            const solicitudDiv = document.createElement('div');
            solicitudDiv.classList.add('solicitud');
            solicitudDiv.innerHTML = `
                <h2 class="solicitud-titulo">${solicitud['tit_sol']}</h2>
                <p class="solicitud-fecha">${solicitud['fec_sol']}</p>
                <p class="solicitud-proyecto">${solicitud['proy_sol']}</p>
                <p class="solicitud-solicitante">${solicitud['solicitante']}</p>
                <p class="solicitud-departamento">${solicitud['dep_sol']}</p>
                <p class="solicitud-email">${solicitud['ema_sol']}</p>
                <p class="solicitud-telefono">${solicitud['tel_sol']}</p>
                <p class="solicitud-gerente">${solicitud['ger_sol']}</p>
                <p class="solicitud-tipo">${solicitud['tip_sol'] ? solicitud['tip_sol'] : 'S/T'}</p>
                <p class="solicitud-descripcion">${solicitud['des_sol']}</p>
                <p class="solicitud-adjuntos">${solicitud['arc_sol'] ? solicitud['arc_sol'] : 'No hay archivos'}</p>
                <div class="solicitud-acciones">
                    <button class="solicitud-boton material-icons" aria-label="Editar">Aceptar</button>
                    <button class="solicitud-boton material-icons" aria-label="Eliminar">Rechazar</button>
                </div>
            `;
            fragment.appendChild(solicitudDiv);
        });

        const container = document.getElementById('container');
        container.appendChild(fragment);

    } catch (error) {
        // En caso de error, muestra un mensaje de error
        const mensajeDiv = document.getElementById('mensaje');
        mensajeDiv.innerHTML = '<div class="mensaje mensaje-error">Hubo un error al cargar las solicitudes. Por favor, inténtalo de nuevo.</div>';
        console.error('Error:', error);
    }
}

// Llamar a la función para cargar las solicitudes
cargarSolicitudes();



