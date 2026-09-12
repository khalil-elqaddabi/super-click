import { getHistory, clearHistory } from "./storage.js";

const historyList = document.getElementById("history-list");
const historyEmpty = document.getElementById("history-empty");

const historyMode = document.getElementById("history-mode");
const historySort = document.getElementById("history-sort");

const btnClearHistory = document.getElementById("btn-clear-history");

function renderHistory() {
  let history = getHistory();

  if (historyMode.value !== "all") {
    history = history.filter((game) => game.mode === historyMode.value);
  }

  // Sort
  if (historySort.value === "date-desc") {
    history.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (historySort.value === "score-desc") {
    history.sort((a, b) => b.score - a.score);
  }

  historyList.textContent = "";

  if (history.length === 0) {
    historyEmpty.hidden = false;
    return;
  }

  historyEmpty.hidden = true;

  history.forEach((game) => {
    const item = document.createElement("article");

    item.innerHTML = `
    <div class="history-card-header">
      <h3>${game.pseudo}</h3>
      <span>${game.mode.toUpperCase()}</span>
    </div>

    <div class="history-info">
      <span>${game.difficulty.toUpperCase()}</span>
      <span>${game.duration}s</span>
    </div>

    <div class="history-stats">

      <div class="history-stat">
        
        <span class="stat-label">SCORE</span>
        <strong>${game.score}</strong>
      </div>

      <div class="history-stat">
        
        <span class="stat-label">HITS</span>
        <strong>${game.hits}</strong>
      </div>

      <div class="history-stat">
        
        <span class="stat-label">MISSES</span>
        <strong>${game.misses}</strong>
      </div>

      <div class="history-stat">
        
        <span class="stat-label">PRECISION</span>
        <strong>
          ${game.precision === null ? "—" : `${game.precision.toFixed(1)}%`}
        </strong>
      </div>

    </div>
  `;

    historyList.appendChild(item);
  });
}

historyMode.addEventListener("change", renderHistory);
historySort.addEventListener("change", renderHistory);

btnClearHistory.addEventListener("click", () => {
  const confirmed = confirm(
    "Are you sure you want to clear your game history?",
  );

  if (!confirmed) {
    return;
  }

  clearHistory();
  renderHistory();
});

export function initHistory() {
  renderHistory();
}
