/**
 * ISS — Fetch de conteúdo estático (disciplines.json, lessons.json, .md)
 */

const CONTENT_BASE = 'content';

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function fetchJSON(path) {
  const res = await fetch(`${CONTENT_BASE}/${path}`);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

async function fetchText(path) {
  const res = await fetch(`${CONTENT_BASE}/${path}`);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.text();
}

async function fetchDisciplines() {
  const data = await fetchJSON('disciplines.json');
  return Array.isArray(data) ? data.sort((a, b) => (a.order || 0) - (b.order || 0)) : [];
}

async function fetchLessons() {
  const data = await fetchJSON('lessons.json');
  return Array.isArray(data) ? data : [];
}

function getLessonsByDiscipline(lessons, disciplineSlug) {
  return lessons
    .filter((l) => l.discipline === disciplineSlug)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

function getLesson(lessons, disciplineSlug, lessonSlug) {
  return lessons.find(
    (l) => l.discipline === disciplineSlug && l.slug === lessonSlug
  );
}

function getDiscipline(disciplines, slug) {
  return disciplines.find((d) => d.slug === slug);
}

async function fetchLessonMarkdown(disciplineSlug, filename) {
  const prefix = `${disciplineSlug}/`;
  const path = filename.startsWith(prefix) ? filename : `${prefix}${filename}`;
  return fetchText(path);
}

async function fetchSearchIndex() {
  const data = await fetchJSON('search-index.json');
  return Array.isArray(data) ? data : [];
}

async function fetchExercises() {
  const data = await fetchJSON('exercises/exercises.json');
  const list = Array.isArray(data) ? data : [];
  return list.sort((a, b) => (a.order || 0) - (b.order || 0));
}

function getExercise(exercises, slug) {
  return exercises.find((e) => e.slug === slug);
}

async function fetchExerciseMarkdown(filename) {
  return fetchText(`exercises/${filename}`);
}

async function fetchStudyPath(disciplineSlug) {
  try {
    const data = await fetchJSON(`${disciplineSlug}/study-path.json`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
