const SETTINGS_KEY = "clickFast.settings";
const RECORDS_KEY = "clickFast.records";
const HISTORY_KEY = "clickFast.history";

const DEFAULT_SETTINGS = {
  pseudo: "",
  mode: "classic",
  duration: 10,
  difficulty: "medium",
  soundEnabled: false,
};


export function getSettings() {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);

    if (!data) {
      return { ...DEFAULT_SETTINGS };
    }

    const settings = JSON.parse(data);

    if (
      typeof settings !== "object" ||
      settings === null ||
      Array.isArray(settings)
    ) {
      return { ...DEFAULT_SETTINGS };
    }

    return {
      ...DEFAULT_SETTINGS,
      ...settings,
    };
  } catch (error) {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}


export function getRecords() {
  try {
    const data = localStorage.getItem(RECORDS_KEY);

    if (!data) {
      return {};
    }

    const records = JSON.parse(data);

    if (
      typeof records !== "object" ||
      records === null ||
      Array.isArray(records)
    ) {
      return {};
    }

    return records;
  } catch (error) {
    return {};
  }
}

export function saveRecords(records) {
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

export function getRecordKey(mode, difficulty, duration) {
  return `${mode}_${difficulty}_${duration}`;
}

export function getRecord(mode, difficulty, duration) {
  const records = getRecords();

  const key = getRecordKey(mode, difficulty, duration);

  return records[key] ?? 0;
}

export function updateRecord(mode, difficulty, duration, score) {
  const records = getRecords();

  const key = getRecordKey(mode, difficulty, duration);

  const currentRecord = records[key] ?? 0;

  if (score > currentRecord) {
    records[key] = score;

    saveRecords(records);

    return true;
  }

  return false;
}



export function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);

    if (!data) {
      return [];
    }

    const history = JSON.parse(data);

    if (!Array.isArray(history)) {
      return [];
    }

    return history;
  } catch (error) {
    return [];
  }
}

export function saveHistory(history) {
  const limitedHistory = history.slice(-20);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
}

export function addHistory(game) {
  const history = getHistory();

  history.push(game);

  saveHistory(history);
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
