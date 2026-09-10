import { gameState, resetGameStatus } from "./story.js";
import { showView } from "./navigation.js";

const arena = document.getElementById("game-arena");
const target = document.getElementById("target");

function moveTarget() {
  const arenaWidth = arena.clientWidth;
  const arenaHeight = arena.clientHeight;

  const targetWidth = target.offsetWidth;
  const targetHeight = target.offsetHeight;

  const maxX = arenaWidth - targetWidth;
  const maxY = arenaHeight - targetHeight;

  const randomX = Math.floor(Math.random() * (maxX + 1));
  const randomY = Math.floor(Math.random() * (maxY + 1));

  target.style.left = randomX + "px";
  target.style.top = randomY + "px";
}

function handleTargetClick(e) {
  if (performance.now() >= gameState.endTime) {
    return;
  }
  if (gameState.gameActive === true) {
    gameState.score++;
    gameState.hits++;
    moveTarget();
  }
}
target.addEventListener("click", handleTargetClick);

export function startGame() {
  resetGameStatus();
  gameState.gameActive = true;
  gameState.endTime = performance.now() + gameState.duration * 1000;
  moveTarget();
  gameState.timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = performance.now();
  const remainingTime = gameState.endTime - currentTime;
  const HUD = Math.floor(remainingTime / 1000);

  const gameTime = document.getElementById("game-time");

  if (remainingTime > 0) {

    gameTime.textContent = HUD;
  }else{ 


  if (gameState.gameEnded === true) {
      return;
    }

    gameState.gameEnded = true;

    clearInterval(gameState.timerId);

    gameState.gameActive = false;


    const resltScore = document.getElementById("result-score")
    resltScore.textContent = gameState.score
    const resultMisses = document.getElementById("result-misses")
    resultMisses.textContent = gameState.misses
    const resultPrecision = document.getElementById("result-precision")
    resultPrecision.textContent = gameState.hits / (gameState.hits + gameState.misses) *100
    showView("results");
  // time ensd
}
}
