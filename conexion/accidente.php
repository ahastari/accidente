<?php
require "conexion.php";

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Consulta SQL para seleccionar 10 datos aleatorios de la tabla
        $sql = "SELECT * FROM accidente ORDER BY RAND() LIMIT 10";

        $query = $conexion->query($sql);

        if ($query->num_rows > 0) {
            $data = array();
            while ($row = $query->fetch_assoc()) {
                $data[] = $row;
            }
            // Devolver los resultados en formato JSON
            header('Content-Type: application/json');
            echo json_encode($data);
        } else {
            echo "No se encontraron registros en la tabla.";
        }

        $conexion->close();

        break;
    case 'DELETE':
     
        break;
    default:
        echo 'undefined request type!';
}
?>
