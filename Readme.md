# Click Fast!

A small browser game built around one simple idea: **how fast can you react?**

Click Fast! is a reflex and precision game developed as a front-end project for **Nova Arcade Studio**. The player chooses a game mode, difficulty and duration, then tries to click the target as many times as possible before the timer runs out.

The whole application runs directly in the browser. There is no backend, no account and no database. Settings, records and recent games are stored locally using `localStorage`.

---

## 🎮 Features

- Single Page Application with no page reloads
- Two game modes:
  - **Classic** — only successful target clicks count
  - **Precision** — missed clicks are also tracked
- Three difficulty levels:
  - Easy — 80×80 px target
  - Medium — 60×60 px target
  - Hard — 40×40 px target
- Three game durations:
  - 10 seconds
  - 20 seconds
  - 30 seconds
- Random target movement after each successful click
- Real-time score and timer
- Precision calculation in Precision mode
- Personal records for each mode/difficulty/duration combination
- History of the last 20 completed games
- History filtering and sorting
- Safe history clearing with confirmation
- Settings restored after refreshing the page
- Responsive layout for smaller screens
- Local data recovery when stored data is missing or corrupted

---

## 🕹️ How to Play

1. Enter a nickname between **2 and 20 characters**.
2. Choose a game mode.
3. Select a duration.
4. Choose a difficulty.
5. Start the game.
6. Click the target as quickly as possible.
7. The target moves after every successful click.
8. Keep going until the timer reaches zero.
9. Check your final score and compare it with your record.

### Classic Mode

Only clicks directly on the target are counted.

```text
Target click → +1 score
Outside click → ignored
```

### Precision Mode

Both successful and missed clicks are tracked.

```text
Target click  → +1 score / +1 hit
Outside click → +1 miss
```

Precision is calculated using:

```text
hits / (hits + misses) × 100
```

For example:

```text
3 hits + 1 miss = 75.0%
```

---

## 🏆 Records

Records are independent for every game configuration.

For example:

```text
Classic / Easy / 10s
Classic / Easy / 20s
Precision / Hard / 10s
```

Each combination has its own best score.

A record is updated only when the new score is **higher** than the current one. An equal score does not replace the existing record.

---

## 📜 Game History

The application keeps the **20 most recent completed games**.

When a 21st game is added, the oldest entry is removed.

The history can be:

- filtered by game mode
- sorted by date
- sorted by score

Filtering and sorting only affect what is displayed. They do not modify the stored history.

Records are stored separately, so removing an old game from the history does not remove its record.

---

## 💾 Local Storage

Click Fast! uses three local storage keys:

```text
clickFast.settings
clickFast.records
clickFast.history
```

### Settings

```js
{
  pseudo,
  mode,
  duration,
  difficulty,
  soundEnabled
}
```

### Records

Records are stored using a composite key:

```text
mode_difficulty_duration
```

Example:

```text
classic_easy_10
precision_hard_30
```

### History

Each completed game is stored as an object containing its configuration and results.

The history is limited to 20 entries.

---

## 🛡️ Data Handling

The application does not assume that local storage data is always valid.

If a stored value is missing or corrupted, the application falls back to safe default data instead of breaking the game.

```text
Settings → default settings
Records  → empty records
History  → empty history
```

Each storage item is handled independently so that valid data is not unnecessarily lost.

---

## 🧱 Project Structure

```text
click-fast/
│
├── index.html
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── game.js
│   ├── storage.js
│   └── history.js
│
├── assets/
│   └── ...
│
└── README.md
```

The exact structure may evolve during development as the project grows.

---

## 🔧 Technologies

- HTML5
- CSS3
- JavaScript (Vanilla)
- DOM API
- `localStorage`
- JSON
- Git / GitHub

No framework or backend is required for this version.

---

## 🚀 Run the Project

Clone the repository:

```bash
git clone <repository-url>
```

Open the project folder:

```bash
cd click-fast
```

Then open `index.html` in a modern web browser.

For development, using a local server such as VS Code Live Server is recommended.

---

## 📱 Responsive Design

The game is designed to work on both desktop and mobile screens.

The game arena is designed around a 500×500 px desktop layout and adapts to smaller screens, including widths around 360 px.

The target position is calculated so that the complete target stays inside the playable area.

---

## 🧪 Testing Checklist

Before considering the project finished, the following cases should be tested:

- [ ] Invalid nickname is rejected
- [ ] All durations work correctly
- [ ] All difficulty levels change the target size
- [ ] Classic mode ignores outside clicks
- [ ] Precision mode counts misses correctly
- [ ] `3 hits + 1 miss = 75.0%`
- [ ] Zero clicks gives `0%`
- [ ] Clicks after the deadline are rejected
- [ ] A game is saved only once
- [ ] Multiple games do not create duplicate timers
- [ ] Records remain independent
- [ ] Equal scores do not replace records
- [ ] History never contains more than 20 games
- [ ] Filters and sorting work together
- [ ] Canceling history deletion keeps the data
- [ ] Confirming deletion clears only the history
- [ ] Settings survive a page refresh
- [ ] Missing localStorage keys do not break the app
- [ ] Corrupted localStorage data is handled safely
- [ ] The target stays inside the arena after resizing
- [ ] The application works around 360 px width

---

## 📌 Known Limitations

This version is intentionally client-side only.

- No backend
- No user accounts
- No online leaderboard
- Records are stored per browser/device
- Clearing browser storage removes the saved application data
- The Challenge mode is optional and may not be included in the first version

---

## 🗺️ Project Roadmap

### Day 1 — Setup & Planning
- Project setup
- Technical documentation
- SPA architecture
- Game state definition
- Local storage structure
- Initial README and planning

### Day 2 — UI & Classic Mode
- Five main views
- HTML/CSS integration
- SPA navigation
- Classic gameplay
- Target movement
- 10-second timer

### Day 3 — Configuration & Precision
- Form validation
- Durations
- Difficulties
- Precision mode
- Results screen
- Navigation flow

### Day 4 — Persistence
- Records
- 20-game history
- Filters
- Sorting
- Local storage resilience

### Day 5 — Finalization
- Functional testing
- Responsive design
- Accessibility checks
- Bug fixes
- Deployment
- Final documentation

---

## 👤 Project

**Click Fast!**  
mocro— **DFT**