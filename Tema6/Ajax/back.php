<?php
$datosCliente = isset($_POST['datos']) ? $_POST['datos'] : '';

$resultado = 'El servidor recibió: ' . $datosCliente;

header('Content-Type: application/json');
echo json_encode(['resultado' => $resultado]);
