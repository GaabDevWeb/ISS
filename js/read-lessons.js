/**
 * ISS — Persistência de aulas "lidas" em localStorage
 */

const READ_LESSONS_STORAGE_KEY = 'iss-read-lessons';

function getReadLessonIds() {
  try {
    const raw = localStorage.getItem(READ_LESSONS_STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch {
    return new Set();
  }
}

function isLessonRead(disciplineSlug, lessonSlug) {
  if (!disciplineSlug || !lessonSlug) return false;
  const ids = getReadLessonIds();
  return ids.has(disciplineSlug + '_' + lessonSlug);
}

function markLessonAsRead(disciplineSlug, lessonSlug) {
  if (!disciplineSlug || !lessonSlug) return;
  const ids = getReadLessonIds();
  ids.add(disciplineSlug + '_' + lessonSlug);
  try {
    localStorage.setItem(READ_LESSONS_STORAGE_KEY, JSON.stringify([...ids]));
  } catch (_) {}
}

function markLessonAsUnread(disciplineSlug, lessonSlug) {
  if (!disciplineSlug || !lessonSlug) return;
  const ids = getReadLessonIds();
  ids.delete(disciplineSlug + '_' + lessonSlug);
  try {
    localStorage.setItem(READ_LESSONS_STORAGE_KEY, JSON.stringify([...ids]));
  } catch (_) {}
}
