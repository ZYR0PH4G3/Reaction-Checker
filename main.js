const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message")

const startGame = () => {
    clickableArea.style.backgroundColor = "#c1121f"
    message.innerHTML = "Wait for the Green Color.";
    message.style.color = "#fff";
};

mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
});