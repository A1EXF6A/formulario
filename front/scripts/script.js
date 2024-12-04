const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const formData = {
        "tit_sol": document.getElementById('titulo').value, 
        "fec_sol": document.getElementById('fecha').value, 
        "proy_sol": document.getElementById('proyecto').value, 
        "solicitante": document.getElementById('solicitante').value, 
        "dep_sol": document.getElementById('departamento').value, 
        "ema_sol": document.getElementById('email').value, 
        "tel_sol": document.getElementById('telefono').value, 
        "ger_sol": document.getElementById('gerente').value, 
        "tip_sol": document.querySelector('input[name="tipo"]:checked') ? document.querySelector('input[name="tipo"]:checked').value : "", 
        "des_sol": document.getElementById('descripcion').value, 
        "arc_sol": document.getElementById('adjuntos').files.length > 0 ? document.getElementById('adjuntos').files[0].name : "" 
    };

    fetch('http://localhost:3000/api/solicitudes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            const mensajeDiv = document.getElementById('mensaje').innerHTML =
                '<div class="mensaje mensaje-exito">¡Solicitud enviada con éxito!</div>';
        })
        .catch(error => {
            const mensajeDiv = document.getElementById('mensaje').innerHTML =
                '<div class="mensaje mensaje-error">Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.</div>';
        }).then(() => {
            document.body.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                document.getElementById('mensaje').innerHTML = '';
            }, 5000);
        });
});

