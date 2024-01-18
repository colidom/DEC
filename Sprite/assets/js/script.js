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
    speed: 2.5,
    velocity: { x: 0, y: 0 },
};

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
        switch (event.key) {
            case "ArrowLeft":
                player.velocity.x = -player.speed;
                player.velocity.y = 5;
                break;
            case "ArrowRight":
                player.velocity.x = player.speed;
                player.velocity.y = 5;
                break;
            case "ArrowUp":
                player.velocity.x = 5;
                player.velocity.y = -player.speed;
                break;
            case "ArrowDown":
                player.velocity.x = 5;
                player.velocity.y = player.speed;
                break;
        }
    });

    // Actualizar la posición del jugador
    player.x += player.velocity.x;
    player.y += player.velocity.y;

    // Limitar al jugador dentro del canvas
    player.x = Math.max(0, Math.min(canvas.width - scaledWidth, player.x));
    player.y = Math.max(0, Math.min(canvas.height - scaledHeight, player.y));
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
    drawFrame(1, 0, player.x, player.y);

    window.requestAnimationFrame(step);
}

function init() {
    window.requestAnimationFrame(step);
}
