<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change Image</title>
</head>

<body>
    <p>Click en la imágen para cambiar su tamaño</p>
    <img id="myFPImage" src="http://myfpschool.com/wp-content/uploads/2016/01/monkey-tablet.jpg" alt="Image" width="100" height="100" onClick="cambiaPic()">
    <hr>
    <img id="container" src='http://myfpschool.com/wp-content/uploads/2016/01/monkey-tablet.jpg' alt="Image" width="100" height="100" />
    <button>Resize</button>
</body>

</html>
<script>
    function cambiaPic() {

        var image = document.getElementById("myFPImage");
        width = image.getAttribute("width");
        height = image.getAttribute("height");

        if (width == 100 && height == 100) {
            image.setAttribute("width", "500");
            image.setAttribute("height", "500");
        } else {
            image.setAttribute("width", "100");
            image.setAttribute("height", "100");
        }
    }

    document.querySelector('button').onclick = function() {
        var image = document.getElementById('container');
        if (image.style.width < '500px') {
            image.style.width = '500px';
            image.style.height = 'auto';
        } else {
            image.style.width = '100px';

        }
    }
</script>