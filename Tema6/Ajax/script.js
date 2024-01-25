$(document).ready(function () {
    $("#respuestaAjax").hide();
    $("#respuestaFetch").hide();

    // Llamada AJAX
    $("#enviarAjax").on("click", function () {
        realizarLlamadaAjax();
    });

    // Llamada Fetch
    $("#enviarFetch").on("click", function () {
        realizarLlamadaFetch();
    });
});

// Función AJAX
function realizarLlamadaAjax() {
    var datos = $("#datosInputAjax").val();

    $.ajax({
        type: "POST",
        url: "back.php",
        data: { datos: datos },
        dataType: "json",
        success: function (respuestaJSON) {
            $("#respuestaAjax").html(`<p>${respuestaJSON.resultado}</p>`);

            // Oculta el bloque después de 10 segundos
            setTimeout(function () {
                $("#respuestaAjax").hide();
            }, 10000);
        },
        error: function () {
            alert("Error en la llamada AJAX");
        },
    });

    // Muestra el bloque #respuestaAjax
    $("#respuestaAjax").show();
}

// Función Fetch
function realizarLlamadaFetch() {
    var datos = $("#datosInputFetch").val();

    fetch("back.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "datos=" + encodeURIComponent(datos),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("La respuesta del servidor no fue exitosa");
            }
            return response.json();
        })
        .then((respuestaJSON) => {
            // Utilizar un template tag para mostrar la respuesta
            $("#respuestaFetch").html(`<p>${respuestaJSON.resultado}</p>`);
            // Muestra el bloque #respuestaFetch
            $("#respuestaFetch").show();

            // Oculta el bloque después de 10 segundos
            setTimeout(function () {
                $("#respuestaFetch").hide();
            }, 10000);
        })
        .catch((error) => {
            // Manejar errores si es necesario
            alert("Error en la llamada Fetch: " + error.message);
            console.error(error);
        });
}
