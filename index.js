const chaserBox = document.getElementById("chaser-box");
const targetBox = document.getElementById("target-box");
let catSpeed = 12; // Cat speed (adjust as needed)
let gameActive = false;
let timer;
let startX, startY;

function startGame() {
    console.log("Game started");
    if (!gameActive) {
        gameActive = true;
        resetGame();
        timer = setTimeout(endGame, 300000); // 5 minutes (300,000 milliseconds)
    }
}

function resetGame() {
    console.log("Game reset");
    chaserBox.style.left = '0px';
    chaserBox.style.top = '0px';
    moveTarget();
}

function endGame() {
    console.log("Game ended");
    gameActive = false;
    clearTimeout(timer); // Clear the timer
    alert("Game over! Time's up. You didn't catch the rat in time.");
    resetGame();
}

function move(direction, speed) {
    if (gameActive) {
        console.log(`Moving ${direction}`);
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

    setTimeout(() => {
        moveTarget(); // Move the target again after a delay
    }, 5000); // 5 seconds (adjust as needed)
}

function addEventListeners() {
    console.log("Event listeners added");
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");

    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);

    // Add touch events for movement
    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
}

function handleTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
}

function handleTouchMove(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    // Determine the primary direction of the swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
            move("right", catSpeed);
        } else {
            move("left", catSpeed);
        }
    } else {
        // Vertical swipe
        if (deltaY > 0) {
            move("down", catSpeed);
        } else {
            move("up", catSpeed);
        }
    }

    startX = touch.clientX;
    startY = touch.clientY;
}

document.addEventListener("DOMContentLoaded", addEventListeners);
