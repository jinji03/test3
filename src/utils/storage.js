const RESULT_LIST_KEY = 'fortune:results';
const LAST_RESULT_KEY = 'fortune:lastResult';

export function saveResult(result) {
  const stored = loadResults();
  const id = result.id || `${Date.now()}-${result.character.id}`;
  const nextResult = { ...result, id, savedAt: new Date().toISOString() };
  const next = [nextResult, ...stored.filter((item) => item.id !== id)].slice(0, 20);
  localStorage.setItem(RESULT_LIST_KEY, JSON.stringify(next));
  localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(nextResult));
  return nextResult;
}

export function loadResults() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RESULT_LIST_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function loadLastResult() {
  try {
    return JSON.parse(localStorage.getItem(LAST_RESULT_KEY)) || null;
  } catch {
    return null;
  }
}

export function deleteResult(id) {
  const next = loadResults().filter((item) => item.id !== id);
  localStorage.setItem(RESULT_LIST_KEY, JSON.stringify(next));
  const last = loadLastResult();
  if (last?.id === id) {
    localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(next[0] || null));
  }
  return next;
}
