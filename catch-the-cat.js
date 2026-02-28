let score = 0;

function moveCat() {
    const cat = document.getElementById("cat");
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 120;

    cat.style.left = Math.random() * maxX + "px";
    cat.style.top = Math.random() * maxY + "px";
}

function catchCat() {
    score++;
    document.getElementById("score").innerText = score;

    // Update high score
    if (score > petData.catchHighScore) {
        petData.catchHighScore = score;
        petData.happiness += 5;
        clampStats();
        savePet();
    }

    moveCat();
}

// Slight passive happiness decrease if idle
setInterval(() => {
    petData.happiness -= 1;
    clampStats();
    savePet();
}, 7000);

setInterval(moveCat, 1000);