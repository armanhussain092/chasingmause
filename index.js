const chaserBox = document.getElementById("chaser-box");
const targetBox = document.getElementById("target-box");
let speed = 10; // Adjust the speed value as needed
let gameActive = false;
let timer;

function startGame() {
    if (!gameActive) {
        gameActive = true;
        resetGame();
        timer = setTimeout(endGame, 300000); // 5 minutes (300,000 milliseconds)
    }
}

function resetGame() {
    chaserBox.style.left = '0px';
    chaserBox.style.top = '0px';
    moveTarget();
}

function endGame() {
    gameActive = false;
    clearTimeout(timer); // Clear the timer
    alert("Game over! Time's up. You didn't catch the rat in time.");
    resetGame();
}

function move(direction) {
    if (gameActive) {
        const step = speed;
        const currentLeft = parseInt(chaserBox.style.left) || 0;
        const currentTop = parseInt(chaserBox.style.top) || 0;

        switch (direction) {
            case "left":
                chaserBox.style.left = `${currentLeft - step}px`;
                break;
            case "up":
                chaserBox.style.top = `${currentTop - step}px`;
                break;
            case "down":
                chaserBox.style.top = `${currentTop + step}px`;
                break;
            case "right":
                chaserBox.style.left = `${currentLeft + step}px`;
                break;
        }
        checkCollision();
    }
}

function checkCollision() {
    const chaserRect = chaserBox.getBoundingClientRect();
    const targetRect = targetBox.getBoundingClientRect();

    if (
        chaserRect.left < targetRect.right &&
        chaserRect.right > targetRect.left &&
        chaserRect.top < targetRect.bottom &&
        chaserRect.bottom > targetRect.top
    ) {
        winGame();
    }
}

function winGame() {
    gameActive = false;
    clearTimeout(timer); // Clear the timer
    alert("Congratulations! You caught the rat and won the game!");
    resetGame();
}

function moveTarget() {
    const newX = Math.floor(Math.random() * (window.innerWidth - 50));
    const newY = Math.floor(Math.random() * (window.innerHeight - 50));

    targetBox.style.left = `${newX}px`;
    targetBox.style.top = `${newY}px`;
}

function addEventListeners() {
    const directions = ["left", "up", "down", "right"];
    const startButton = document.getElementById("start-button");

    startButton.addEventListener("click", startGame);

    for (const direction of directions) {
        const button = document.getElementById(`${direction}-button`);

        button.addEventListener("click", () => move(direction));
        button.addEventListener("touchstart", (event) => {
            event.preventDefault(); // Prevents the button from being "sticky" on touch
            move(direction);
        });
    }
}

// Add event listeners after the DOM has loaded
document.addEventListener("DOMContentLoaded", addEventListeners);
