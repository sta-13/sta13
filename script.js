function obtenerDirector() {
    const titulo = document.getElementById("tituloPelicula").value.trim();
    
    // Validar que se haya ingresado un título
    if (!titulo) {
        alert("Por favor, ingresa el título de una película");
        return;
    }
    
    // Mostrar estado de carga
    const cuadroRespuestas = document.getElementById("cuadroRespuestas");
    cuadroRespuestas.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Buscando "${titulo}"...</p>
        </div>
    `;
    
    const peticion = `https://www.omdbapi.com/?apikey=b0560da&s=${encodeURIComponent(titulo)}`;

    fetch(peticion)
        .then(response => {
            if (!response.ok) throw new Error("Error en la respuesta de la API");
            return response.json();
        })
        .then(data => {
            const resultados = data.Search;

            if (resultados && resultados.length > 0) {
                // Creamos un array de promesas para obtener detalles de cada película
                const promesas = resultados.slice(0, 5).map(resultado =>
                    fetch(`https://www.omdbapi.com/?apikey=b0560da&i=${resultado.imdbID}`)
                        .then(r => r.json())
                );

                // Esperamos a que todas las promesas se resuelvan
                Promise.all(promesas).then(detalles => {
                    let mensaje = `
                        <h2 style="margin-bottom: 20px; color: #e94560;">
                            Resultados para "${titulo}"
                        </h2>
                        <ul class="movie-list">
                    `;

                    detalles.forEach(detalle => {
                        mensaje += `
                            <li class="movie-item">
                                <div class="movie-title">${detalle.Title}</div>
                                <div class="movie-details">
                                    <span class="detail-item">🎬 Año: ${detalle.Year}</span>
                                    <span class="detail-item">🎭 Director: ${detalle.Director !== "N/A" ? detalle.Director : "No disponible"}</span>
                                    <span class="detail-item">⭐ Rating: ${detalle.imdbRating !== "N/A" ? detalle.imdbRating : "No disponible"}</span>
                                    <span class="detail-item">⏱️ Duración: ${detalle.Runtime !== "N/A" ? detalle.Runtime : "No disponible"}</span>
                                </div>
                            </li>
                        `;
                    });

                    mensaje += "</ul>";
                    cuadroRespuestas.innerHTML = mensaje;
                }).catch(error => {
                    console.error("Error al obtener detalles:", error);
                    cuadroRespuestas.innerHTML = `
                        <div class="no-results">
                            <p>Error al cargar los detalles de las películas.</p>
                        </div>
                    `;
                });
            } else {
                cuadroRespuestas.innerHTML = `
                    <div class="no-results">
                        <p>No se encontraron resultados para "${titulo}".</p>
                        <p>Intenta con otro título.</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error("Error en la solicitud a la API: " + error.message);
            cuadroRespuestas.innerHTML = `
                <div class="no-results">
                    <p>Error al conectar con la API. Intenta nuevamente.</p>
                </div>
            `;
        });
}

// Función para manejar la tecla Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        obtenerDirector();
    }
}

// Código para probar que JavaScript está funcionando
console.log("JavaScript cargado correctamente");
document.addEventListener('DOMContentLoaded', function() {
    console.log("Página completamente cargada");
});