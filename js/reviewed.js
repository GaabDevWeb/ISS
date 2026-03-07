/**
 * ISS — Persistência de exercícios "já revistos" em localStorage
 * Formato: array de { id, timestamp } (com fallback para array de strings).
 */

const REVIEWED_STORAGE_KEY = 'iss-reviewed-exercises';

function getReviewedExerciseIds() {
  try {
    const raw = localStorage.getItem(REVIEWED_STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(arr)) return new Set();
    const ids = arr.map(function (item) {
      return typeof item === 'string' ? item : (item && item.id);
    }).filter(Boolean);
    return new Set(ids);
  } catch {
    return new Set();
  }
}

function getReviewedRaw() {
  try {
    const raw = localStorage.getItem(REVIEWED_STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(arr)) return [];
    return arr.map(function (item) {
      if (typeof item === 'string') return { id: item, timestamp: null };
      return { id: item && item.id, timestamp: item && item.timestamp != null ? item.timestamp : null };
    }).filter(function (x) { return x.id; });
  } catch {
    return [];
  }
}

function markExerciseAsReviewed(id) {
  const list = getReviewedRaw();
  if (list.some(function (x) { return x.id === id; })) return;
  list.push({ id: id, timestamp: Date.now() });
  try {
    localStorage.setItem(REVIEWED_STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}
