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
            var cargaDatosMsgElement = document.getElementById("cargaDatosMsg");

            // Mostrar el mensaje y configurar el temporizador de desvanecimiento
            cargaDatosMsgElement.innerHTML = respuesta.cargaDatos;
            cargaDatosMsgElement.style.opacity = 1;

            setTimeout(() => {
                // Desvanecer el mensaje gradualmente
                var fadeEffect = setInterval(function () {
                    if (cargaDatosMsgElement.style.opacity > 0) {
                        cargaDatosMsgElement.style.opacity -= 0.1;
                    } else {
                        // Limpiar el intervalo y restablecer la opacidad
                        clearInterval(fadeEffect);
                        cargaDatosMsgElement.style.opacity = 1;
                        cargaDatosMsgElement.innerHTML = "";
                    }
                }, 100); // Ajusta la velocidad de desvanecimiento según sea necesario
            }, 3000);
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
            var votoMsgElement = document.getElementById("votoMsg");

            // Mostrar el mensaje y configurar el temporizador de desvanecimiento
            votoMsgElement.innerHTML = respuesta.votoMsg;
            votoMsgElement.style.opacity = 1;

            setTimeout(() => {
                // Desvanecer el mensaje gradualmente
                var fadeEffect = setInterval(function () {
                    if (votoMsgElement.style.opacity > 0) {
                        votoMsgElement.style.opacity -= 0.1;
                    } else {
                        // Limpiar el intervalo y restablecer la opacidad
                        clearInterval(fadeEffect);
                        votoMsgElement.style.opacity = 1;
                        votoMsgElement.innerHTML = "";
                    }
                }, 100); // Ajusta la velocidad de desvanecimiento según sea necesario
            }, 2000);
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
