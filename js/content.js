/**
 * ISS — Fetch de conteúdo estático (disciplines.json, lessons.json, .md)
 */

/** Base path absoluto desde a raiz do site (compatível com Cloudflare Pages / Vercel). */
const CONTENT_BASE = '/content';

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
  return fetchText(`${disciplineSlug}/${filename}`);
}
