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

function moveSprite() {
    sprite.x += sprite.speedX;
    sprite.y += sprite.speedY;

    // Limitar el sprite dentro del canvas y evitar esquinas
    if (sprite.x < 0 || sprite.x + scaledWidth > canvas.width) {
        sprite.speedX *= -1; // Invertir la velocidad en el eje X al llegar al borde izquierdo o derecho
    }

    if (sprite.y < 0 || sprite.y + scaledHeight > canvas.height) {
        sprite.speedY *= -1; // Invertir la velocidad en el eje Y al llegar al borde superior o inferior
    }
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

    // Aplicar fricción para desacelerar
    player.velocity.x *= 1 - player.friction;
    player.velocity.y *= 1 - player.friction;

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
            alert("¡Game Over!");
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
