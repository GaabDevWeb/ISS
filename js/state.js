/**
 * ISS — Camada de estado unificada (localStorage + helpers)
 * Única fonte de verdade para: aulas lidas, exercícios concluídos, checklist, revisões, metas, conquistas.
 */

const LAST_VISITED_KEY = 'iss-last-visited';
const READ_LESSONS_KEY = 'iss-read-lessons';
const EXERCISES_COMPLETED_KEY = 'iss-exercises-completed';
const CHECKLIST_STORAGE_KEY = 'iss-checklist';
const REVIEWED_STORAGE_KEY = 'iss-reviewed-exercises';
const REVISION_LESSONS_KEY = 'iss-revision-lessons';
const REVISION_CONCEPTS_KEY = 'iss-revision-concepts';
const ACTIVITY_DATES_KEY = 'iss-activity-dates';
const ACHIEVEMENTS_UNLOCKED_KEY = 'iss-achievements-unlocked';

const MINUTES_PER_EXERCISE = 4;
const REVISION_DAYS = 3;

function getLastVisited() {
  try {
    const raw = localStorage.getItem(LAST_VISITED_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (obj && typeof obj.discipline === 'string' && typeof obj.lesson === 'string') return obj;
    return null;
  } catch {
    return null;
  }
}

function setLastVisited(disciplineSlug, lessonSlug) {
  try {
    localStorage.setItem(LAST_VISITED_KEY, JSON.stringify({ discipline: disciplineSlug, lesson: lessonSlug }));
  } catch (_) {}
}

function getReadLessonIds() {
  try {
    const raw = localStorage.getItem(READ_LESSONS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch {
    return new Set();
  }
}

function isLessonRead(disciplineSlug, lessonSlug) {
  if (!disciplineSlug || !lessonSlug) return false;
  return getReadLessonIds().has(disciplineSlug + '_' + lessonSlug);
}

function markLessonAsRead(disciplineSlug, lessonSlug) {
  if (!disciplineSlug || !lessonSlug) return;
  const ids = getReadLessonIds();
  ids.add(disciplineSlug + '_' + lessonSlug);
  try {
    localStorage.setItem(READ_LESSONS_KEY, JSON.stringify([...ids]));
  } catch (_) {}
  addTodayActivity();
  setRevisionLesson(disciplineSlug + '_' + lessonSlug, Date.now());
}

function markLessonAsUnread(disciplineSlug, lessonSlug) {
  if (!disciplineSlug || !lessonSlug) return;
  const ids = getReadLessonIds();
  ids.delete(disciplineSlug + '_' + lessonSlug);
  try {
    localStorage.setItem(READ_LESSONS_KEY, JSON.stringify([...ids]));
  } catch (_) {}
}

function getCompletedWithTimestamps() {
  try {
    const raw = localStorage.getItem(EXERCISES_COMPLETED_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(arr)) return [];
    return arr.map(function (item) {
      if (typeof item === 'string') return { slug: item, timestamp: null };
      return {
        slug: item && item.slug,
        timestamp: item && item.timestamp != null ? item.timestamp : null,
      };
    }).filter(function (x) { return x.slug; });
  } catch {
    return [];
  }
}

function getCompletedExerciseSlugs() {
  return new Set(getCompletedWithTimestamps().map(function (x) { return x.slug; }));
}

function markExerciseCompleted(slug, concepts) {
  const list = getCompletedWithTimestamps();
  if (list.some(function (x) { return x.slug === slug; })) return;
  const now = Date.now();
  list.push({ slug: slug, timestamp: now });
  try {
    localStorage.setItem(EXERCISES_COMPLETED_KEY, JSON.stringify(list));
  } catch (_) {}
  addTodayActivity();
  if (Array.isArray(concepts)) {
    concepts.forEach(function (c) { if (c) setRevisionConcept(c, now); });
  } else if (typeof concepts === 'string') {
    concepts.split(',').map(function (s) { return s.trim(); }).forEach(function (c) { if (c) setRevisionConcept(c, now); });
  }
}

function isExerciseCompleted(slug) {
  return getCompletedExerciseSlugs().has(slug);
}

function getChecklistState(disciplineSlug, lessonSlug) {
  try {
    const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    const key = disciplineSlug + ':' + lessonSlug;
    return Array.isArray(data[key]) ? data[key] : [];
  } catch {
    return [];
  }
}

function setChecklistState(disciplineSlug, lessonSlug, state) {
  try {
    const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY) || '{}';
    const data = JSON.parse(raw);
    data[disciplineSlug + ':' + lessonSlug] = state;
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
}

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

function formatDurationMinutes(totalMinutes) {
  if (totalMinutes <= 0) return '~0 min';
  if (totalMinutes < 60) return '~' + totalMinutes + ' min';
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (m === 0) return '~' + h + 'h';
  return '~' + h + 'h ' + m + 'min';
}

function getRevisionLessons() {
  try {
    const raw = localStorage.getItem(REVISION_LESSONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getRevisionConcepts() {
  try {
    const raw = localStorage.getItem(REVISION_CONCEPTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setRevisionLesson(lessonId, timestamp) {
  try {
    const data = getRevisionLessons();
    data[lessonId] = { lastSeen: timestamp };
    localStorage.setItem(REVISION_LESSONS_KEY, JSON.stringify(data));
  } catch (_) {}
}

function setRevisionConcept(concept, timestamp) {
  try {
    const data = getRevisionConcepts();
    data[concept] = timestamp;
    localStorage.setItem(REVISION_CONCEPTS_KEY, JSON.stringify(data));
  } catch (_) {}
}

function getSuggestedRevisions(lessons, exercises) {
  const revLessons = getRevisionLessons();
  const revConcepts = getRevisionConcepts();
  const now = Date.now();
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  const result = [];
  if (Array.isArray(lessons)) {
    lessons.forEach(function (l) {
      const id = l.discipline + '_' + l.slug;
      const entry = revLessons[id];
      if (entry && (now - entry.lastSeen) >= threeDays) {
        result.push({ type: 'lesson', id: id, label: l.title, url: 'aula.html?d=' + encodeURIComponent(l.discipline) + '&a=' + encodeURIComponent(l.slug) });
      }
    });
  }
  if (exercises && Array.isArray(exercises)) {
    const conceptsSeen = {};
    exercises.forEach(function (ex) {
      const concepts = Array.isArray(ex.concepts) ? ex.concepts : (typeof ex.concepts === 'string' ? ex.concepts.split(',').map(function (s) { return s.trim(); }) : []);
      concepts.forEach(function (c) {
        if (!c) return;
        const last = revConcepts[c];
        if (last && (now - last) >= threeDays && !result.some(function (r) { return r.type === 'concept' && r.id === c; })) {
          result.push({ type: 'concept', id: c, label: c, url: 'exercises.html?concept=' + encodeURIComponent(c) });
        }
      });
    });
  }
  return result;
}

function getActivityDates() {
  try {
    const raw = localStorage.getItem(ACTIVITY_DATES_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function addTodayActivity() {
  try {
    const today = new Date();
    const str = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    const dates = getActivityDates();
    if (!dates.includes(str)) {
      dates.push(str);
      dates.sort();
      localStorage.setItem(ACTIVITY_DATES_KEY, JSON.stringify(dates));
    }
  } catch (_) {}
}

function getStreak() {
  const dates = getActivityDates();
  if (dates.length === 0) return 0;
  const sorted = [...dates].sort();
  const today = new Date();
  const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  if (!sorted.includes(todayStr)) return 0;
  let streak = 0;
  let d = new Date(today);
  for (;;) {
    const s = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    if (sorted.includes(s)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function getTodayGoalMet() {
  const today = new Date();
  const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  return getActivityDates().includes(todayStr);
}

function getAchievementsUnlocked() {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_UNLOCKED_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function unlockAchievement(id) {
  const list = getAchievementsUnlocked();
  if (list.includes(id)) return;
  list.push(id);
  try {
    localStorage.setItem(ACHIEVEMENTS_UNLOCKED_KEY, JSON.stringify(list));
  } catch (_) {}
}

function getWeeklySummaryText(maiorLacunaLabel) {
  const completed = getCompletedWithTimestamps();
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const weekAgo = now - sevenDays;
  const completedThisWeek = completed.filter(function (x) { return x.timestamp && x.timestamp >= weekAgo; }).length;
  const dates = getActivityDates();
  const activityThisWeek = dates.filter(function (d) {
    const t = new Date(d).getTime();
    return t >= weekAgo;
  }).length;
  const streak = getStreak();
  var lines = ['Resumo ISS — última semana', '', 'Exercícios concluídos esta semana: ' + completedThisWeek, 'Dias com atividade: ' + activityThisWeek, 'Sequência atual: ' + streak + ' dia(s)', ''];
  if (maiorLacunaLabel) lines.push('Maior lacuna: ' + maiorLacunaLabel);
  return lines.join('\n');
}

function resetAllStats() {
  try {
    localStorage.removeItem(READ_LESSONS_KEY);
    localStorage.removeItem(EXERCISES_COMPLETED_KEY);
    localStorage.removeItem(REVIEWED_STORAGE_KEY);
    localStorage.removeItem(REVISION_LESSONS_KEY);
    localStorage.removeItem(REVISION_CONCEPTS_KEY);
    localStorage.removeItem(ACTIVITY_DATES_KEY);
    localStorage.removeItem(ACHIEVEMENTS_UNLOCKED_KEY);
  } catch (_) {}
}
