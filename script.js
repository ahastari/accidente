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

            })
            .catch(error => console.error('Error:', error));
    }

    cargarDatos(); // Para cargar los datos al inicio sin necesidad de hacer clic en el botón

    btnRecargar.addEventListener('click', cargarDatos); // Evento click para recargar datos
});
