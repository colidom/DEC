<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halloween Gift</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="./assets/css/style.css">
</head>

<body>
    <div class="container">
        <div class="col-sm-12">
            <div class="col-sm-6">
                <div class="content text-center texto">
                    <p>!Truco o Trato! FELICIDADES te hemos elegido para recibir un fantástico regalo por estas terroríficas fiestas, no lo dejes escapar...</p>
                    <p>¡Feliz Hallowen!</p>
                </div>
            </div>
        </div>
        <!-- Button trigger modal -->
        <div class="col text-center">
            <button type="button" class="btn btn-warning main-button" id="scareButton" onclick="fadeWindow()">
                Reclamar regalo
            </button>
        </div>
    </div>

    <div class="scary-image" hidden id="scaryImage"></div>
</body>

</html>
<script src="./assets/js/script.js"></script>