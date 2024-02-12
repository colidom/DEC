// Obtener los datos de resultados desde el servidor al cargar la página
cargarDatosIniciales();

// Configurar y crear el gráfico de barras
var ctx = document.getElementById("graficoResultados").getContext("2d");
var myChart;

function configurarGrafico(puntuaciones) {
    myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Real Madrid", "Barcelona", "Atlético de Madrid", "Girona"],
            datasets: [
                {
                    label: "Porcentaje de Votos",
                    data: puntuaciones,
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
}

function cargarDatosIniciales() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            configurarGrafico(respuesta.puntuaciones);
            document.getElementById("mensaje").innerHTML = respuesta.mensaje;
        }
    };
    xmlhttp.open("GET", "cargar_datos.php", true);
    xmlhttp.send();
}

// Función para obtener el voto al hacer clic en un equipo
function getVoto(id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            myChart.data.datasets[0].data = respuesta.puntuaciones;
            myChart.update();
            document.getElementById("mensaje").innerHTML = respuesta.mensaje;
        }
    };
    xmlhttp.open("GET", "encuesta_voto.php?voto=" + id, true);
    xmlhttp.send();
}

// Asignar la función getVoto al hacer clic en los radios
document.getElementsByName("voto").forEach(function (radio) {
    radio.addEventListener("click", function () {
        getVoto(this.value);
    });
});
