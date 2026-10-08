document.addEventListener('DOMContentLoaded', () => {
    // Cargamos únicamente el archivo de secciones
    fetch('secciones.json')
        .then(res => res.json())
        .then(seccionesData => {
            const sec = seccionesData.secciones;

            // Renderizamos únicamente la sección de grabado y arte impreso
            renderizarSeccion('grabado', sec.grabado_arte_impreso);
        })
        .catch(error => console.error('Error al cargar los datos del catálogo:', error));
});

// Función genérica para pintar cada sección de obras
function renderizarSeccion(nombreId, dataSeccion) {
    const contenedor = document.getElementById(`contenedor-${nombreId}`);
    if (!contenedor || !dataSeccion) return;

    let htmlContenido = '';

   
    // 2. Renderizar Obras Seleccionadas (con el diseño normal de grilla)
    if (dataSeccion.seleccionadas && dataSeccion.seleccionadas.length > 0) {
        htmlContenido += `<div class="galeria">`;
        dataSeccion.seleccionadas.forEach(obra => {
            const urlImagen = `img/${obra.id_archivo}.jpg`;
            htmlContenido += `
                <div class="obra-card">
                    <a href="${urlImagen}" data-lightbox="${nombreId}" data-title="${obra.titulo} - ${obra.nombre} ${obra.apellido}">
                        <img src="${urlImagen}" alt="${obra.titulo}" loading="lazy">
                    </a>
                    <h3>${obra.titulo}</h3>
					<p>${obra.tecnica}</p>
                    <h4>Autor:</strong> ${obra.nombre} ${obra.apellido}</h4>
                    <p><em>${obra.pais} ${obra.localidad}</em></p>
                </div>
            `;
        });
        htmlContenido += `</div>`;
    }

    contenedor.innerHTML = htmlContenido;
}
