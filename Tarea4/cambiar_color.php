<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Define el nuevo color para las palabras en negrita
    $nuevoColor = 'darkred'; // Puedes cambiar esto por el color que desees

    // Genera el estilo CSS para aplicar el nuevo color a las palabras en negrita
    $estilo = '<style>.color-texto strong { color: ' . $nuevoColor . '; font-weight: bold; }</style>';

    // Contenido del HTML que se mostrará con el nuevo estilo
    $contenidoHTML = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Cambiar Color</title>
            <style>
                .color-texto {
                    color: black;
                }
                .oscuro {
                    color: red;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <form action="cambiar_color.php" method="post">
                <div class="color-texto">Este es el primer bloque con <strong>palabras en negrita</strong>.</div>
                <div class="color-texto">Este es el segundo bloque con <strong>otras palabras en negrita</strong>.</div>
                <div class="color-texto">Este es el tercer bloque con <strong>más palabras en negrita</strong>.</div>
                <div class="color-texto">Este es el cuarto bloque con <strong>algunas palabras en negrita</strong>.</div>
                <button type="submit" name="cambiarColorPHP">Cambiar Color (PHP)</button>
            </form>
            ' . $estilo . '
        </body>
        </html>
    ';

    // Imprime el contenido HTML actualizado con el nuevo estilo
    echo $contenidoHTML;
}
