function obtenerDirector() {
      var titulo = document.getElementById("tituloPelicula").value;
      var peticion = `https://www.omdbapi.com/?apikey=b0560da&s=${titulo}`;

      fetch(peticion)
        .then(response => {
          if (!response.ok) throw new Error("Error en la respuesta de la API");
          return response.json();
        })
        .then(data => {
          var resultados = data.Search;
          var cuadroRespuestas = document.getElementById("cuadroRespuestas");

          if (resultados) {
            var mensaje = `<h2>Resultados para "${titulo}"</h2><ul>`;

            // Para cada resultado, pedimos detalles con imdbID
            resultados.forEach(resultado => {
              fetch(`https://www.omdbapi.com/?apikey=b0560da&i=${resultado.imdbID}`)
                .then(r => r.json())
                .then(detalle => {
                  mensaje += `<li><b>${detalle.Title}</b><br>
                              Año: ${detalle.Year}<br>
                              Director: ${detalle.Director}</li><br>`;
                  cuadroRespuestas.innerHTML = mensaje + "</ul>";
                });
            });
          } else {
            cuadroRespuestas.innerHTML = "<p>No se encontraron resultados.</p>";
          }
        })
        .catch(error => {
          console.error("Error en la solicitud a la API: " + error.message);
        });
    }
