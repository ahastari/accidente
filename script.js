document.addEventListener('DOMContentLoaded', function() {
    const btnRecargar = document.getElementById('btnRecargar');
    const tablaBody = document.getElementById('tabla-body');
    const promedioContainer = document.getElementById('promedioValor');
    const registrosRepetidosContainer = document.getElementById('registrosRepetidos');
    const mediaAnioContainer = document.getElementById('mediaAnio');

    function cargarDatos() {
        fetch('conexion/accidente.php')
            .then(response => response.json())
            .then(data => {
                tablaBody.innerHTML = ''; // Limpiar contenido existente

                let totalValor = 0;
                let sumAnio = 0;
                let contadorRegistros = {};
                let maxRepetido = {};

                data.forEach(item => {
                    totalValor += parseFloat(item.valor); // Sumar los valores para calcular el promedio
                    sumAnio += parseInt(item.año); // Sumar los valores de 'año' para calcular la media

                    // Contar registros repetidos en cada columna
                    for (const key in item) {
                        if (contadorRegistros.hasOwnProperty(key)) {
                            contadorRegistros[key][item[key]] = (contadorRegistros[key][item[key]] || 0) + 1;

                            if (!maxRepetido[key] || contadorRegistros[key][item[key]] > contadorRegistros[key][maxRepetido[key]]) {
                                maxRepetido[key] = item[key];
                            }
                        } else {
                            contadorRegistros[key] = {};
                            contadorRegistros[key][item[key]] = 1;
                            maxRepetido[key] = item[key];
                        }
                    }

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id_a}</td>
                        <td>${item.cve_municipio}</td>
                        <td>${item.desc_municipio}</td>
                        <td>${item.id_indicador}</td>
                        <td>${item.indicador}</td>
                        <td>${item.año}</td>
                        <td>${item.valor}</td>
                        <td>${item.unidad_medida}</td>
                    `;
                    tablaBody.appendChild(row);
                });

                // Calcular el promedio
                const promedio = totalValor / data.length;
                promedioContainer.textContent = `El promedio de la columna "valor" es: ${promedio.toFixed(2)}`;

                // Mostrar los encabezados de las columnas y sus datos más repetidos en una tabla
                let registrosRepetidosTexto = '<thead><tr><th>Columna</th><th>Dato más repetido</th><th>Cantidad de repeticiones</th></tr></thead><tbody>';
                for (const key in contadorRegistros) {
                    registrosRepetidosTexto += `<tr><td>${key}</td><td>${maxRepetido[key]}</td><td>${contadorRegistros[key][maxRepetido[key]]}</td></tr>`;
                }
                registrosRepetidosTexto += '</tbody>';
                registrosRepetidosContainer.innerHTML = registrosRepetidosTexto;

                // Calcular la media de la columna "año"
                const mediaAnio = sumAnio / data.length;
                mediaAnioContainer.textContent = `La media de la columna "año" es: ${mediaAnio.toFixed(2)}`;
            })
            .catch(error => console.error('Error:', error));
    }

    cargarDatos(); // Para cargar los datos al inicio sin necesidad de hacer clic en el botón

    btnRecargar.addEventListener('click', cargarDatos); // Evento click para recargar datos
});
