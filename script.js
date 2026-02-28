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
    if (action === "feed") petData.hunger += 20;
    if (action === "play") petData.happiness += 10;
    if (action === "clean") petData.cleanliness += 20;
    if (action === "sleep") petData.energy += 25;

    clampStats();
    savePet();
    updateStatBars();
    updateStatusMessage();
}