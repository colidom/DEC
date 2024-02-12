// Obtén los datos de resultados desde el servidor (puedes cambiar esto según tu estructura de datos)
var resultadosData = "<?php echo file_get_contents($resultadosFile); ?>";
var resultadosArray = resultadosData.split("||").map(Number);

// Configura y crea el gráfico de barras
var ctx = document.getElementById("graficoResultados").getContext("2d");
var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Real Madrid", "Barcelona", "Atlético de Madrid", "Girona"],
        datasets: [
            {
                label: "Porcentaje de Votos",
                data: resultadosArray,
                backgroundColor: ["#FF5733", "#3498db", "#27ae60", "#f39c12"],
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function (value) {
                        return value + "%";
                    },
                },
            },
        },
    },
});

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
