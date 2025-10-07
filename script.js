function obtenerDirector() {
    var titulo = document.getElementById("tituloPelicula").value;
    var peticion = `https://www.omdbapi.com/?apikey=b0560da&s=${titulo}`;
    
    fetch(peticion)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Error en la respuesta de la API");
            }
            return response.json();
        })
        .then(function(data) {
            // Almacena el JSON de la respuesta en una variable
            var respuestaJson = data;

            var resultados = respuestaJson.Search;
            if (resultados) {
                console.log(resultados);
                var cuadroRespuestas = document.getElementById("cuadroRespuestas");
                var mensaje = `</br></h2> Todas las películas de ${titulo} </h2>`;
                mensaje += "<ul>";

                // Hacemos promesas para obtener el director de cada película
                var promesas = resultados.map(function(resultado) {
                    var urlDetalle = `https://www.omdbapi.com/?apikey=b0560da&i=${resultado.imdbID}`;
                    return fetch(urlDetalle)
                        .then(res => res.json())
                        .then(detalle => {
                            return {
                                titulo: resultado.Title,
                                anio: resultado.Year,
                                director: detalle.Director
                            };
                        });
                });

                // Esperamos a que todas las promesas se resuelvan
                Promise.all(promesas).then(function(detalles) {
                    detalles.forEach(function(peli) {
                        mensaje += `<li>${peli.titulo}</br>Año de la película: ${peli.anio}</br>Director: ${peli.director}</li><br>`;
                    });
                    mensaje += "</ul>";
                    cuadroRespuestas.innerHTML = mensaje;
                });
            }

        })
        .catch(function(error) {
            console.error("Error en la solicitud a la API: " + error.message);
        });
}