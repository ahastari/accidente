<?php
require "conexion.php";

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Consulta SQL para obtener la media de la columna 'valor'
        $sql = "SELECT AVG(valor) AS media FROM accidente";

        $query = $conexion->query($sql);

        if ($query) {
            $row = $query->fetch_assoc();
            $media = $row['media'];

            // Devolver la media en formato JSON
            header('Content-Type: application/json');
            echo json_encode(array('media' => $media));
        } else {
            echo "Error al calcular la media.";
        }

        $conexion->close();

        break;
    case 'DELETE':
        // Código para manejar un request DELETE si es necesario
        break;
    default:
        echo '¡Tipo de solicitud no definido!';
}
?>
