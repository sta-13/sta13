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
            // Creamos un array de promesas para obtener detalles de cada película
            let promesas = resultados.map(resultado =>
              fetch(`https://www.omdbapi.com/?apikey=b0560da&i=${resultado.imdbID}`)
                .then(r => r.json())
            );

            // Esperamos a que todas las promesas se resuelvan
            Promise.all(promesas).then(detalles => {
              let mensaje = `<h2>Resultados para "${titulo}"</h2><ul>`;

              detalles.forEach(detalle => {
                mensaje += `<li><b>${detalle.Title}</b><br>
                            Año: ${detalle.Year}<br>
                            Director: ${detalle.Director}</li><br>`;
              });

              mensaje += "</ul>";
              cuadroRespuestas.innerHTML = mensaje;
            });
          } else {
            cuadroRespuestas.innerHTML = "<p>No se encontraron resultados.</p>";
          }
        })
        .catch(error => {
          console.error("Error en la solicitud a la API: " + error.message);
        });
    }