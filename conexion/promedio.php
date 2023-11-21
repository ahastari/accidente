<?php
require "conexion.php";

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Consulta SQL para obtener el promedio de la columna 'valor'
        $sql = "SELECT AVG(año) AS promedio FROM accidente";

        $query = $conexion->query($sql);

        if ($query) {
            $row = $query->fetch_assoc();
            $promedio = $row['promedio'];

            // Devolver el promedio en formato JSON
            header('Content-Type: application/json');
            echo json_encode(array('promedio' => $promedio));
        } else {
            echo "Error al calcular el promedio.";
        }

        $conexion->close();

        break;
    case 'DELETE':
        // Código para manejar un request DELETE si es necesario
        break;
    default:
        echo 'Tipo de solicitud no definido.';
}
?>
