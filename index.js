const chaserBox = document.getElementById("chaser-box");
const targetBox = document.getElementById("target-box");
let catSpeed = 20; // Cat speed (adjust as needed)
let gameActive = false;
let timer;
let timeLeft = 300; // 5 minutes in seconds

function startGame() {
    console.log("Game started");
    if (!gameActive) {
        gameActive = true;
        resetGame();
        updateTimer(); // Add this line to update the timer immediately
        timer = setInterval(updateTimer, 1000);
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
    clearInterval(timer); // Clear the timer
    alert("Game over! Time's up. You didn't catch the mouse in time.");
    resetGame();
}

function move(direction) {
    if (gameActive) {
        console.log(`Moving ${direction}`);
        const step = catSpeed;
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
    clearInterval(timer); // Clear the timer
    alert("Congratulations! You caught the mouse and won the game!");
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
    const leftButton = document.getElementById("left-button");
    const upButton = document.getElementById("up-button");
    const downButton = document.getElementById("down-button");
    const rightButton = document.getElementById("right-button");
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");

    leftButton.addEventListener("click", () => move("left"));
    upButton.addEventListener("click", () => move("up"));
    downButton.addEventListener("click", () => move("down"));
    rightButton.addEventListener("click", () => move("right"));
    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);
}

function updateTimer() {
    if (timeLeft > 0) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("timer").innerText = `Time Left: ${padZero(minutes)}:${padZero(seconds)}`;
        timeLeft--;
    } else {
        endGame();
    }
}

function padZero(number) {
    return number < 10 ? `0${number}` : number;
}

document.addEventListener("DOMContentLoaded", addEventListeners);
