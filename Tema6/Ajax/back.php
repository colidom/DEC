<?php
$datosCliente = isset($_POST['datos']) ? $_POST['datos'] : '';

if ($datosCliente) {
    $resultado = 'El servidor recibió: ' . $datosCliente;
} else {
    $resultado = "El servidor recibió la respuesta pero no se han enviado datos en el formulario";
}

header('Content-Type: application/json');
echo json_encode(['resultado' => $resultado]);
