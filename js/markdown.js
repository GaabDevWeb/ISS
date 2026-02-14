/**
 * ISS — Parse frontmatter, render Markdown (Marked.js), Highlight.js, injeção de exercícios
 */

function parseFrontmatter(raw) {
  const delim = '---';
  const start = raw.indexOf(delim);
  if (start === -1) return { frontmatter: {}, body: raw.trim() };
  const afterFirst = raw.slice(start + delim.length);
  const end = afterFirst.indexOf(delim);
  if (end === -1) return { frontmatter: {}, body: raw.trim() };
  const yamlStr = afterFirst.slice(0, end).trim();
  const body = afterFirst.slice(end + delim.length).trim();

  const frontmatter = {};
  const lines = yamlStr.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      const [, key, rest] = keyMatch;
      let value = rest.trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1).replace(/\\"/g, '"');
      } else if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (/^\d+$/.test(value)) value = parseInt(value, 10);
      if (key !== 'exercises') frontmatter[key] = value;
    }
    if (line.match(/^exercises:\s*$/)) {
      const exercises = [];
      i++;
      while (i < lines.length) {
        const ln = lines[i];
        if (ln.match(/^\s+-\s+question:/)) {
          const ex = { question: '', answer: '', hint: '' };
          const q = ln.match(/question:\s*["']([^"']*)["']/);
          if (q) ex.question = q[1];
          i++;
          while (i < lines.length && !lines[i].match(/^\s+-\s+question:/)) {
            const rest = lines[i];
            const an = rest.match(/answer:\s*["']([^"']*)["']/);
            const hi = rest.match(/hint:\s*["']([^"']*)["']/);
            if (an) ex.answer = an[1];
            if (hi) ex.hint = hi[1];
            i++;
          }
          if (ex.question && ex.answer) exercises.push(ex);
        } else {
          i++;
        }
      }
      frontmatter.exercises = exercises;
      continue;
    }
    i++;
  }

  return { frontmatter, body };
}

function renderBody(body) {
  if (typeof marked === 'undefined') return escapeHtml(body).replace(/\n/g, '<br>');
  return marked.parse(body);
}

function highlightCodeBlocks(container) {
  if (typeof hljs === 'undefined' || !container) return;
  container.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
}

function ensureSectionIds(container) {
  if (!container) return;
  const h2s = container.querySelectorAll('.iss-prose h2');
  const ids = ['resumo', 'explicacoes'];
  h2s.forEach((h2, i) => {
    if (ids[i]) h2.id = ids[i];
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderExercisesHTML(exercises) {
  if (!Array.isArray(exercises) || exercises.length === 0) return '';
  const list = exercises
    .map(
      (ex) => `
    <div class="iss-exercise">
      <p class="font-medium mb-2">${escapeHtml(ex.question)}</p>
      <details class="group">
        <summary class="iss-exercise__toggle cursor-pointer list-none">
          <span class="inline">Ver resposta sugerida</span>
        </summary>
        <div class="mt-3 pt-3 border-t border-zinc-200">
          <p class="mb-0">${escapeHtml(ex.answer)}</p>
          ${ex.hint ? `<p class="text-sm text-zinc-500 mt-2 mb-0"><strong>Dica:</strong> ${escapeHtml(ex.hint)}</p>` : ''}
        </div>
      </details>
    </div>
  `
    )
    .join('');
  return `
  <h2 id="exercicios" class="text-xl font-semibold mt-8 mb-4 pb-1 border-b border-zinc-200">Exercícios</h2>
  <div class="space-y-4">${list}</div>
  `;
}

function renderAulaPage({ raw, lesson, discipline }) {
  const { frontmatter, body } = parseFrontmatter(raw);
  const title = frontmatter.title || lesson.title;

  document.title = `${title} — ISS`;

  const breadcrumbEl = document.getElementById('breadcrumb-aula');
  if (breadcrumbEl) {
    const d = new URLSearchParams(window.location.search).get('d');
    breadcrumbEl.innerHTML = `
      <a href="index.html" class="text-zinc-500 hover:text-zinc-900">Home</a>
      <span class="text-zinc-400 mx-1">/</span>
      <a href="disciplina.html?d=${encodeURIComponent(d)}" class="text-zinc-500 hover:text-zinc-900">${escapeHtml(discipline ? discipline.title : d)}</a>
      <span class="text-zinc-400 mx-1">/</span>
      <span>${escapeHtml(title)}</span>
    `;
  }

  const titleEl = document.getElementById('lesson-title');
  if (titleEl) titleEl.textContent = title;

  const contentEl = document.getElementById('lesson-content');
  if (contentEl) {
    const bodyHtml = renderBody(body);
    const exercisesHtml = renderExercisesHTML(frontmatter.exercises || []);
    contentEl.innerHTML = `<nav class="mb-6 text-sm" aria-label="Nesta página"><a href="#resumo" class="text-zinc-500 hover:text-zinc-900 mr-3">Resumo</a><a href="#explicacoes" class="text-zinc-500 hover:text-zinc-900 mr-3">Explicações</a><a href="#exercicios" class="text-zinc-500 hover:text-zinc-900">Exercícios</a></nav><div class="iss-prose">${bodyHtml}</div>${exercisesHtml}`;
    highlightCodeBlocks(contentEl);
    ensureSectionIds(contentEl);
  }

}
