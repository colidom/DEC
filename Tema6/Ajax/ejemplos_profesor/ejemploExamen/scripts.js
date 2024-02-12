function getVoto(id) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("resultados").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "encuesta_voto.php?voto=" + id, true);
    xmlhttp.send();
}
