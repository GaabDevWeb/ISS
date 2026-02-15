/**
 * ISS — Persistência de exercícios "já revistos" em localStorage
 */

const REVIEWED_STORAGE_KEY = 'iss-reviewed-exercises';

function getReviewedExerciseIds() {
  try {
    const raw = localStorage.getItem(REVIEWED_STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch {
    return new Set();
  }
}

function markExerciseAsReviewed(id) {
  const ids = getReviewedExerciseIds();
  if (ids.has(id)) return;
  ids.add(id);
  try {
    localStorage.setItem(REVIEWED_STORAGE_KEY, JSON.stringify([...ids]));
  } catch (_) {}
}
