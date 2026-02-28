// petSystem.js

let petData = JSON.parse(localStorage.getItem("petData"));

if (!petData) {
    petData = {
    hunger: 100,
    energy: 100,
    happiness: 100,
    cleanliness: 100,
    simonHighScore: 0,
    catchHighScore: 0,
    tttWins: 0,
    username: null,
    lastVisit: Date.now()
    };
  savePet();
}
if (!petData.username) {
  const name = prompt("Hi human 🐾 What should I call you?");
  if (name && name.trim() !== "") {
    petData.username = name;
  } else {
    petData.username = "Human";
  }
  savePet();
}

function savePet() {
  localStorage.setItem("petData", JSON.stringify(petData));
}

function updateTimeDecay() {
  const now = Date.now();
  const timePassed = Math.floor((now - petData.lastVisit) / 60000); // minutes

  petData.hunger -= timePassed * 2;
  petData.energy -= timePassed * 1;
  petData.cleanliness -= timePassed * 1;

  clampStats();
  petData.lastVisit = now;
  savePet();
}

function clampStats() {
  petData.hunger = Math.max(0, Math.min(100, petData.hunger));
  petData.energy = Math.max(0, Math.min(100, petData.energy));
  petData.happiness = Math.max(0, Math.min(100, petData.happiness));
  petData.cleanliness = Math.max(0, Math.min(100, petData.cleanliness));
}