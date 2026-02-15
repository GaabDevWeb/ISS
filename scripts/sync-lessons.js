#!/usr/bin/env node
/**
 * ISS — Sincroniza aulas a partir dos .md em content/
 *
 * Escaneia content/{disciplina}/*.md, lê o frontmatter de cada ficheiro
 * e atualiza content/lessons.json (e content/disciplines.json se surgir
 * nova disciplina). Basta colocar o .md na pasta e rodar o script para
 * a aula aparecer no front.
 *
 * Uso: node scripts/sync-lessons.js
 *      ou: npm run sync
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const LESSONS_JSON = path.join(CONTENT_DIR, 'lessons.json');
const DISCIPLINES_JSON = path.join(CONTENT_DIR, 'disciplines.json');

function extractFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const delim = '---';
  const start = raw.indexOf(delim);
  if (start === -1) return null;
  const afterFirst = raw.slice(start + delim.length);
  const end = afterFirst.indexOf(delim);
  if (end === -1) return null;
  const yaml = afterFirst.slice(0, end).trim();
  const result = {};
  const lines = yaml.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('exercises:') || line.startsWith('  ') || line.startsWith('\t')) {
      if (line.startsWith('exercises:')) {
        while (i + 1 < lines.length && (lines[i + 1].startsWith('  ') || lines[i + 1].startsWith('\t') || lines[i + 1].trim() === '')) i++;
      }
      continue;
    }
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) {
      const [, key, rest] = m;
      let value = rest.trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1).replace(/\\"/g, '"');
      } else if (key === 'order') {
        value = parseInt(value, 10) || 1;
      }
      result[key] = value;
    }
  }
  return result;
}

function slugFromFilename(filename) {
  const base = path.basename(filename, '.md');
  const m = base.match(/aula-\d+-(.+)/);
  return m ? m[1] : base.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
}

function orderFromFilename(filename) {
  const base = path.basename(filename, '.md');
  const m = base.match(/aula-(\d+)/);
  return m ? parseInt(m[1], 10) : 999;
}

function scanContentDir() {
  const lessons = [];
  const disciplineSlugs = new Set();

  if (!fs.existsSync(CONTENT_DIR) || !fs.statSync(CONTENT_DIR).isDirectory()) {
    console.error('Pasta content/ não encontrada em', ROOT);
    process.exit(1);
  }

  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });

  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const dirName = ent.name;
    if (dirName.startsWith('.')) continue;
    const dirPath = path.join(CONTENT_DIR, dirName);
    const files = fs.readdirSync(dirPath);
    const mdFiles = files.filter((f) => f.endsWith('.md'));

    for (const file of mdFiles) {
      const filePath = path.join(dirPath, file);
      const fm = extractFrontmatter(filePath);
      const discipline = (fm && fm.discipline) || dirName;
      const slug = (fm && fm.slug) || slugFromFilename(file);
      const title = (fm && fm.title) || path.basename(file, '.md');
      const order = (fm && typeof fm.order === 'number') ? fm.order : (fm && parseInt(fm.order, 10)) || orderFromFilename(file) || 999;

      disciplineSlugs.add(discipline);
      lessons.push({
        discipline,
        slug,
        title: String(title).trim(),
        order: Math.max(1, order),
        file,
      });
    }
  }

  return { lessons, disciplineSlugs: Array.from(disciplineSlugs) };
}

function loadDisciplines() {
  if (!fs.existsSync(DISCIPLINES_JSON)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(DISCIPLINES_JSON, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function mergeDisciplines(existing, disciplineSlugs) {
  const bySlug = new Map();
  for (const d of existing) bySlug.set(d.slug, d);
  for (const slug of disciplineSlugs) {
    if (!bySlug.has(slug)) {
      const title = slug
        .split(/[-_]/)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
        .join(' ');
      bySlug.set(slug, { slug, title, description: '', order: 999 });
    }
  }
  const list = Array.from(bySlug.values());
  list.sort((a, b) => (a.order || 999) - (b.order || 999));
  return list;
}

function sortLessons(lessons, disciplines) {
  const orderByDiscipline = new Map();
  disciplines.forEach((d, i) => orderByDiscipline.set(d.slug, i));
  return lessons.slice().sort((a, b) => {
    const oa = orderByDiscipline.has(a.discipline) ? orderByDiscipline.get(a.discipline) : 999;
    const ob = orderByDiscipline.has(b.discipline) ? orderByDiscipline.get(b.discipline) : 999;
    if (oa !== ob) return oa - ob;
    return (a.order || 999) - (b.order || 999);
  });
}

function main() {
  const { lessons, disciplineSlugs } = scanContentDir();
  const existingDisciplines = loadDisciplines();
  const disciplines = mergeDisciplines(existingDisciplines, disciplineSlugs);
  const sortedLessons = sortLessons(lessons, disciplines);

  fs.writeFileSync(LESSONS_JSON, JSON.stringify(sortedLessons, null, 2) + '\n', 'utf8');
  fs.writeFileSync(DISCIPLINES_JSON, JSON.stringify(disciplines, null, 2) + '\n', 'utf8');

  console.log('ISS sync: %d aula(s) em %d disciplina(s).', sortedLessons.length, disciplines.length);
  console.log('  lessons.json e disciplines.json atualizados.');
}

main();
