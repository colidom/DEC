let img = new Image();
img.src = "https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png";
img.onload = function () {
    init();
};

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const scale = 2;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

const cycleLoop = [0, 1, 0, 2];
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = 0;

const sprite = {
    x: Math.random() * (canvas.width - scaledWidth),
    y: Math.random() * (canvas.height - scaledHeight),
    speedX: 2.5,
    speedY: 2.5,
};

const player = {
    x: canvas.width / 2 - scaledWidth / 2,
    y: canvas.height / 2 - scaledHeight / 2,
    speed: 0, // Velocidad inicial
    acceleration: 0.2, // Aceleración al mover con el teclado
    friction: 0.1, // Fricción para desacelerar
    velocity: { x: 0, y: 0 },
    isMoving: false, // Bandera para controlar si el jugador está en movimiento
};

// Bandera para controlar si ya ocurrió una colisión
let collisionOccurred = false;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
}

function drawPlayerText(playerNumber, color, playerX, playerY) {
    ctx.fillStyle = color;
    ctx.font = "12px Arial";
    const playerName = `Player ${playerNumber}`;
    const textWidth = ctx.measureText(playerName).width;
    ctx.fillText(playerName, playerX + (scaledWidth - textWidth) / 2, playerY - 5);
}

function moveSprite() {
    const maxSpeedChange = 0.5; // Máximo cambio de velocidad permitido en cada cuadro

    // Aplicar un cambio de velocidad aleatorio y gradual
    const speedChangeX = (Math.random() - 2.5) * maxSpeedChange;
    const speedChangeY = (Math.random() - 2.5) * maxSpeedChange;

    sprite.speedX += speedChangeX;
    sprite.speedY += speedChangeY;

    sprite.x += sprite.speedX;
    sprite.y += sprite.speedY;

    // Limitar el sprite dentro del canvas y hacer que rebote en los bordes
    if (sprite.x < 0 || sprite.x + scaledWidth > canvas.width) {
        sprite.speedX *= -1; // Invertir la velocidad en el eje X al llegar al borde izquierdo o derecho
    }

    if (sprite.y < 0 || sprite.y + scaledHeight > canvas.height) {
        sprite.speedY *= -1; // Invertir la velocidad en el eje Y al llegar al borde superior o inferior
    }

    // Asegurar que el sprite permanezca dentro del canvas
    sprite.x = Math.max(0, Math.min(canvas.width - scaledWidth, sprite.x));
    sprite.y = Math.max(0, Math.min(canvas.height - scaledHeight, sprite.y));
}
function movePlayer() {
    document.addEventListener("keydown", (event) => {
        if (!player.isMoving) {
            // Cambiar la bandera y el frame cuando se presiona la primera tecla
            player.isMoving = true;
            currentLoopIndex = 0;
        }

        switch (event.key) {
            case "ArrowLeft":
                player.velocity.x -= player.acceleration;
                break;
            case "ArrowRight":
                player.velocity.x += player.acceleration;
                break;
            case "ArrowUp":
                player.velocity.y -= player.acceleration;
                break;
            case "ArrowDown":
                player.velocity.y += player.acceleration;
                break;
        }
    });

    // Normalizar la velocidad para que sea constante
    const speed = 5.0; // Puedes ajustar la velocidad según tus preferencias
    const magnitude = Math.sqrt(player.velocity.x ** 2 + player.velocity.y ** 2);

    if (magnitude !== 0) {
        player.velocity.x = (player.velocity.x / magnitude) * speed;
        player.velocity.y = (player.velocity.y / magnitude) * speed;
    }

    // Actualizar la posición del jugador
    player.x += player.velocity.x;
    player.y += player.velocity.y;

    // Limitar al jugador dentro del canvas
    player.x = Math.max(0, Math.min(canvas.width - scaledWidth, player.x));
    player.y = Math.max(0, Math.min(canvas.height - scaledHeight, player.y));
}

function checkCollision() {
    const separationThreshold = 10;

    if (
        player.x < sprite.x + scaledWidth - separationThreshold &&
        player.x + scaledWidth > sprite.x + separationThreshold &&
        player.y < sprite.y + scaledHeight - separationThreshold &&
        player.y + scaledHeight > sprite.y + separationThreshold
    ) {
        // Verificar si ya ocurrió una colisión
        if (!collisionOccurred) {
            // Colisión detectada
            alert("¡Pillado...!");
            collisionOccurred = true; // Establecer la bandera a true para evitar alertas adicionales
        }
    } else {
        // Restablecer la bandera si no hay colisión
        collisionOccurred = false;
    }
}

function step() {
    frameCount++;
    if (frameCount < 15) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mueve y dibuja el sprite principal
    drawFrame(cycleLoop[currentLoopIndex], currentDirection, sprite.x, sprite.y);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
        currentDirection++;
    }
    if (currentDirection >= 4) {
        currentDirection = 0;
    }

    // Mueve el sprite principal
    moveSprite();

    // Dibuja el nombre del jugador automático (Player 1)
    drawPlayerText(1, "blue", player.x, player.y);

    // Dibuja el nombre del jugador controlado por el teclado (Player 2)
    drawPlayerText(2, "red", sprite.x, sprite.y);

    // Mueve al jugador controlado por el teclado
    movePlayer();

    // Verifica la colisión entre el sprite y el jugador
    checkCollision();

    // Dibuja al jugador
    drawFrame(player.isMoving ? cycleLoop[currentLoopIndex] : 1, 0, player.x, player.y);

    window.requestAnimationFrame(step);
}

function init() {
    window.requestAnimationFrame(step);
}
