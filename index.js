const chaserBox = document.getElementById("chaser-box");
const targetBox = document.getElementById("target-box");

function move(direction) {
    const step = 10;
    switch (direction) {
        case "left":
            chaserBox.style.left = `${parseInt(chaserBox.style.left || 0) - step}px`;
            break;
        case "up":
            chaserBox.style.top = `${parseInt(chaserBox.style.top || 0) - step}px`;
            break;
        case "down":
            chaserBox.style.top = `${parseInt(chaserBox.style.top || 0) + step}px`;
            break;
        case "right":
            chaserBox.style.left = `${parseInt(chaserBox.style.left || 0) + step}px`;
            break;
    }
    checkCollision();
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
        moveTarget();
    }
}

function moveTarget() {
    const newX = Math.floor(Math.random() * (window.innerWidth - 50));
    const newY = Math.floor(Math.random() * (window.innerHeight - 50));

    targetBox.style.left = `${newX}px`;
    targetBox.style.top = `${newY}px`;
}

function addEventListeners() {
    const directions = ["left", "up", "down", "right"];
    
    for (const direction of directions) {
        const button = document.getElementById(`${direction}-button`);
        
        button.addEventListener("click", () => move(direction));
        button.addEventListener("touchstart", (event) => {
            event.preventDefault(); // Prevents the button from being "sticky" on touch
            move(direction);
        });
    }
}

// Automatically move the target box every 3 seconds (adjust the interval as needed)
setInterval(moveTarget, 3000);

// Add event listeners after the DOM has loaded
document.addEventListener("DOMContentLoaded", addEventListeners);

