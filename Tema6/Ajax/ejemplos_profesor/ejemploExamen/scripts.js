function getVoto(id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Parsea la respuesta JSON en lugar de usar innerHTML
            var respuesta = JSON.parse(this.responseText);

            // Actualiza la gráfica
            myChart.data.datasets[0].data = respuesta.puntuaciones;
            myChart.update();

            // Muestra el mensaje
            document.getElementById("mensaje").innerHTML = respuesta.mensaje;
        }
    };
    xmlhttp.open("GET", "encuesta_voto.php?voto=" + id, true);
    xmlhttp.send();
}
