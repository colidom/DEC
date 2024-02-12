<?php
// Ruta al archivo de resultados
$resultadosFile = 'resultados.txt';

// Lee el contenido actual del archivo de resultados
$resultados = file_get_contents($resultadosFile);

// Divide el contenido actual en un array usando '||' como delimitador
$puntuaciones = explode('||', $resultados);

// Devuelve la respuesta como un objeto JSON
echo json_encode(array("mensaje" => "Datos cargados correctamente", "puntuaciones" => $puntuaciones));
