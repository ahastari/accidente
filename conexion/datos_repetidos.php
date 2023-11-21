<?php
require "conexion.php";

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Consulta SQL para encontrar datos duplicados en la columna 'nombre'
        $sql = "SELECT indicador, COUNT(*) AS cantidad FROM accidente GROUP BY indicador HAVING COUNT(*) > 1";

        $query = $conexion->query($sql);

        if ($query !== false) {
            if ($query->num_rows > 0) {
                $data = array();
                while ($row = $query->fetch_assoc()) {
                    $data[] = $row;
                }
                // Devolver los resultados en formato JSON
                header('Content-Type: application/json');
                echo json_encode($data);
            } else {
                echo "No se encontraron registros duplicados en la columna 'nombre'.";
            }
        } else {
            echo "Error al ejecutar la consulta: " . $conexion->error;
        }

        $conexion->close();
        break;
    case 'DELETE':
        // Código para eliminar datos (si es necesario)
        break;
    default:
        echo 'Tipo de solicitud no definido!';
}
?>
