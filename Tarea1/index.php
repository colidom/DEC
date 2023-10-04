<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change Image</title>
</head>

<body>
    <p>Click sobre las letas para cambiarlas</p>
    <img id="myFPImage" src="http://myfpschool.com/wp-content/uploads/2016/06/myblack.jpeg" alt="Image" width="100" height="100" onClick="cambiaPic()">


</body>

</html>
<script>
    function cambiaPic() {
        var image = document.getElementById("myFPImage");
        if (image.src.match("green")) {
            image.src = "http://myfpschool.com/wp-content/uploads/2016/06/myblack.jpeg";
        } else {
            image.src = "http://myfpschool.com/wp-content/uploads/2016/06/mygreen.jpeg"
        }
    }
</script>