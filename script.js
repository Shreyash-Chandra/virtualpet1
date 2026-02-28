window.onload = () => {
    updateTimeDecay();

    updateStatusMessage();
    updateStatBars();
    updateHighScores();

    // Auto refresh bars every 10 seconds
    setInterval(() => {
        updateStatBars();
        updateStatusMessage();
    }, 10000);
};

function updateHighScores() {
    const latestData = JSON.parse(localStorage.getItem("petData"));
    if (!latestData) return;

    document.getElementById("simon-score").innerText = latestData.simonHighScore || 0;
    document.getElementById("catch-score").innerText = latestData.catchHighScore || 0;
    document.getElementById("ttt-wins").innerText = latestData.tttWins || 0;
}

function updateStatBars() {
    setBar("hunger-bar", petData.hunger);
    setBar("energy-bar", petData.energy);
    setBar("happiness-bar", petData.happiness);
    setBar("clean-bar", petData.cleanliness);
}

function setBar(id, value) {
    const bar = document.getElementById(id);
    if (!bar) return;

    const safeValue = Math.max(0, Math.min(100, value));
    bar.style.width = safeValue + "%";
}

function updateStatusMessage() {
    const name = petData.username || "Human";
    const statusText = document.getElementById("status");

    if (petData.hunger < 30) {
        statusText.innerText = `${name}, I'm hungry`;
    } else if (petData.energy < 30) {
        statusText.innerText = `${name}, I'm tired...`;
    } else if (petData.cleanliness < 30) {
        statusText.innerText = `${name}, I need a bath 😿`;
    } else {
        statusText.innerText = `Hi ${name} 💕`;
    }
}

function changeCatAction(action) {
    const petImg = document.getElementById("pet");
    const statusText = document.getElementById("status");

    if (action === "feed") {
        petImg.src = "eatingcat.gif";
        petData.hunger += 20;
        petData.happiness += 5;
        playSound("feed.mp3");
        statusText.innerText = `${petData.username}, that was delicious!`;

    } else if (action === "play") {
        petImg.src = "playingcat.gif";
        petData.happiness += 15;
        petData.energy -= 10;
        playSound("play.mp3");
        statusText.innerText = `${petData.username}, this is fun!`;

    } else if (action === "clean") {
        petImg.src = "cleaningcat.gif";
        petData.cleanliness += 25;
        playSound("clean.mp3");
        statusText.innerText = `All fresh now ✨`;

    } else if (action === "sleep") {
        petImg.src = "sleeping.gif";
        petData.energy += 30;
        playSound("sleeping.mp3");
        statusText.innerText = `Zzz... goodnight ${petData.username}`;
    }

    clampStats();
    savePet();
    updateStatBars();

    // Return to idle cat after 5 seconds
    setTimeout(() => {
        petImg.src = "cat.webp";
        updateStatusMessage();
    }, 5000);
}

function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.volume = 0.5;
    audio.play();
}
