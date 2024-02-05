<?php
// Simulación de un array de provincias (puedes obtenerlo de una base de datos)
$provincias = [
    'Alava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
    'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
    'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
];

// Obtener el parámetro 'q' de la URL
$query = isset($_GET['q']) ? $_GET['q'] : '';

// Filtrar las provincias que coincidan con la consulta
$resultado = array_filter($provincias, function ($ciudad) use ($query) {
    return stripos($ciudad, $query) !== false;
});

// Devolver los resultados como JSON
echo json_encode(array_values($resultado));
