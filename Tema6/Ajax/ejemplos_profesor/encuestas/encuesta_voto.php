<?php
// Ruta al archivo de resultados
$resultadosFile = 'resultados.txt';

// Verifica si se recibió un voto a través del método GET
if (isset($_GET['voto'])) {
    // Recupera el valor del voto
    $voto = $_GET['voto'];

    // Lee el contenido actual del archivo de resultados
    $resultados = file_get_contents($resultadosFile);

    // Divide el contenido actual en un array usando '||' como delimitador
    $puntuaciones = explode('||', $resultados);

    // Incrementa la puntuación correspondiente al voto seleccionado
    switch ($voto) {
        case 'RealMadrid':
            $puntuaciones[0]++;
            break;
        case 'Barcelona':
            $puntuaciones[1]++;
            break;
        case 'AtleticoMadrid':
            $puntuaciones[2]++;
            break;
        case 'Girona':
            $puntuaciones[3]++;
            break;
    }

    // Une el array de puntuaciones en una cadena usando '||' como separador
    $nuevosResultados = implode('||', $puntuaciones);

    // Escribe la nueva cadena de resultados en el archivo
    file_put_contents($resultadosFile, $nuevosResultados);

    // Construye el mensaje a mostrar en el frontend
    $mensaje = "¡Has votado por {$voto}!";

    // Devuelve la respuesta como un objeto JSON
    echo json_encode(array("votoMsg" => $mensaje, "puntuaciones" => $puntuaciones));
} else {
    // Si no se recibió el voto, muestra un mensaje de error
    echo "Error: No se recibió el voto.";
}
