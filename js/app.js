import { showView } from "./navigation.js";
import { gameState, resetGameStatus }  from "./story.js";
import {startGame} from "./game.js"

// transiction between pages
const btnPlay = document.getElementById("btn-play");
btnPlay.addEventListener("click", function () {
  showView("config");
});

const prvHome = document.getElementById("prv-home");
prvHome.addEventListener("click", function () {
  showView("home");
});

const btnHome = document.getElementById("btn-home");
btnHome.addEventListener("click", function () {
  showView("home");
});
const btnHistoryHome = document.getElementById("btn-history-home");
btnHistoryHome.addEventListener("click", function () {
  showView("home");
});
const btbHistory = document.getElementById("btn-history");
btbHistory.addEventListener("click", function () {
  showView("history");
});

// form config
const configForm = document.getElementById("config-form");
configForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const pseudo = document.getElementById("pseudo");
  const pseudoValue = pseudo.value.trim();
  const mode = document.getElementById("mode");
  const modeValue = mode.value;
  const duration = document.getElementById("duration");
  const durationValue = duration.value;
  const difficulty = document.getElementById("difficulty");
  const difficultyValue = difficulty.value;
  const psudoError = document.getElementById("psudo-error");

  // error psudo
  if (pseudoValue.length > 20 || pseudoValue.length < 2) {
    psudoError.textContent = "Pseudo must be between 2 and 20 characters";
    return;
  } else psudoError.textContent = "";

//   enter to object 
  gameState.pseudo = pseudoValue;
  gameState.mode = modeValue;
  gameState.duration = parseInt(durationValue);
  gameState.difficulty = difficultyValue;

  
  
  //   go to game section
  showView("game");
  startGame()
  
  
});

// event.preventDefault()
