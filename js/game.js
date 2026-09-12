import { gameState, resetGameStatus } from "./story.js";
import { showView } from "./navigation.js";
import { getRecord, updateRecord, addHistory } from "./storage.js";

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
// ====
function getTargetSize() {
  switch (gameState.difficulty) {
    case "easy":
      return 80;
    case "medium":
      return 60;
    case "hard":
      return 40;
    default:
      return 60;
  }
}
// ==
function applyDifficulty() {
  const size = getTargetSize();

  target.style.width = `${size}px`;
  target.style.height = `${size}px`;
}

function handleTargetClick(e) {
  e.stopPropagation();
  if (performance.now() >= gameState.endTime) {
    return;
  }
  if (gameState.gameActive === true) {
    gameState.score++;
    gameState.hits++;

    document.getElementById("game-score").textContent = gameState.score;

    moveTarget();
  }
}
// ====
function handleArenaClick(event) {
  if (!gameState.gameActive) {
    return;
  }

  if (performance.now() >= gameState.endTime) {
    return;
  }

  if (gameState.mode === "precision" && event.target !== target) {
    gameState.misses++;
  }
}
target.addEventListener("click", handleTargetClick);
// ===
arena.addEventListener("click", handleArenaClick);

export function startGame() {
  resetGameStatus();
  const record = getRecord(
    gameState.mode,
    gameState.difficulty,
    gameState.duration,
  );

  document.getElementById("game-record").textContent = record;
  applyDifficulty();
  gameState.gameActive = true;
  //   =====
  gameState.endTime = performance.now() + gameState.duration * 1000;
  moveTarget();
  gameState.timerId = setInterval(updateTimer, 100);
}

function updateTimer() {
  const currentTime = performance.now();
  const remainingTime = gameState.endTime - currentTime;
  const HUD = Math.floor(remainingTime / 1000);

  const gameTime = document.getElementById("game-time");

  if (remainingTime > 0) {
    gameTime.textContent = HUD;
  } else {
    if (gameState.gameEnded === true) {
      return;
    }

    gameState.gameEnded = true;

    clearInterval(gameState.timerId);

    gameState.gameActive = false;

    const resltScore = document.getElementById("result-score");
    resltScore.textContent = gameState.score;
    const resultMisses = document.getElementById("result-misses");
    resultMisses.textContent = gameState.misses;
    const resultPrecision = document.getElementById("result-precision");
    // =======
    let precision = null;
    if (gameState.mode === "precision") {
      const totalClicks = gameState.hits + gameState.misses;

      precision = totalClicks === 0 ? 0 : (gameState.hits / totalClicks) * 100;

      resultPrecision.textContent = `${precision.toFixed(1)}%`;
    } else {
      resultPrecision.textContent = "Not measured";
    }

    const isNewRecord = updateRecord(
      gameState.mode,
      gameState.difficulty,
      gameState.duration,
      gameState.score,
    );

    const resultRecordMessage = document.getElementById(
      "result-record-message",
    );

    if (isNewRecord) {
      resultRecordMessage.textContent = "New Record!";
    } else {
      resultRecordMessage.textContent = "";
    }

    addHistory({
      pseudo: gameState.pseudo,
      mode: gameState.mode,
      difficulty: gameState.difficulty,
      duration: gameState.duration,
      score: gameState.score,
      hits: gameState.hits,
      misses: gameState.misses,
      precision: precision,
      date: new Date().toISOString(),
    });
    showView("results");
    // time ensd
  }
}
