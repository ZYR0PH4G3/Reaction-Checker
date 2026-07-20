const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message")
const endScreen = document.querySelector(".end-screen");

let timer;
let greeDispalyed;
let timeNow;
let waitingForStart;
let waitingForGreen;
let scores;

const init = () => {
    greeDispalyed = false;
    waitingForStart = false;
    waitingForGreen = false;
    scores = [];
};

init();

const setGreenColor = () => {
    clickableArea.style.backgroundColor = "#32cd32";
    message.innerHTML = "Click Now!";
    message.style.color = "#111"
    greeDispalyed = true;
    timeNow = Date.now();
};

const startGame = () => {
    clickableArea.style.backgroundColor = "#c1121f"
    message.innerHTML = "Wait for the Green Color.";
    message.style.color = "#fff";

    let randomNumber = Math.floor(Math.random() * 4000 + 3000);
    timer = setTimeout(setGreenColor, randomNumber);

    waitingForStart = false;
    waitingForGreen = true;

    console.log("Random Number: ", randomNumber);
};

mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
});

const endGame = () => {
    endScreen.classList.add("active");
    clearTimeout(timer);

    let total = 0;

    scores.forEach((s) => {
        total += s;
    });

    let averageScore = Math.round(total / scores.length);
    console.log("Total; ", total);
    console.log("Average Score: ", averageScore);
};

const displayReactionTime = (rt) => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = `<div class='reaction-time-text'>${rt} ms</div>Click to continue.`;
    greeDispalyed = false;
    waitingForStart = true;
    scores.push(rt);
    console.log("Scores: ", scores);

    if (scores.length >= 3) {
        endGame();
    };
};

const displayTooSoon = () => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = "Too Soon. Click to continue.";
    message.style.color = "#111";
    waitingForStart = true;
    clearTimeout(timer);
};

clickableArea.addEventListener("click", () => {
    if (greeDispalyed) {
        let clickTime = Date.now();
        let reactionTime = clickTime - timeNow;
        console.log("Reaction Time: ", reactionTime);
        displayReactionTime(reactionTime);
        return;
    };

    if (waitingForStart) {
        startGame();
        return;
    };

    if (waitingForGreen) {
        displayTooSoon();
    };
});