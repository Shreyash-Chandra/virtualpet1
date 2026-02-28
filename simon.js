let sequence = [];
let playerSequence = [];
let level = 0;
let gameActive = false;

// Sound files
const sounds = {
    red: new Audio("red.mp3"),
    blue: new Audio("blue.wav"),
    yellow: new Audio("yellow.mp3"),
    green: new Audio("green.wav")
};

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    gameActive = true;
    document.getElementById("status").innerText = "Watch the pattern...";
    nextRound();
}

function nextRound() {
    playerSequence = [];
    level++;

    document.getElementById("status").innerText = `Level ${level}`;

    const colors = ["red", "blue", "yellow", "green"];
    sequence.push(colors[Math.floor(Math.random() * 4)]);

    let i = 0;
    let interval = setInterval(() => {
        flashColor(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 800);
}

function flashColor(color) {
    let btn = document.getElementById(color);
    btn.classList.add("flash");

    sounds[color].currentTime = 0;
    sounds[color].play();

    setTimeout(() => btn.classList.remove("flash"), 400);
}

function playerClick(color) {
    if (!gameActive) return;

    playerSequence.push(color);
    flashColor(color);

    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        document.getElementById("status").innerText = "Game Over! Click Start to try again.";

        // Reduce happiness on loss
        petData.happiness -= 5;
        clampStats();
        savePet();

        gameActive = false;
        return;
    }

    if (playerSequence.length === sequence.length) {

        // Successful round completed
        if (level > petData.simonHighScore) {
            petData.simonHighScore = level;
            petData.happiness += 10;
            clampStats();
            savePet();
        }

        setTimeout(nextRound, 1000);
    }
}