/**
 * ISS — Parse frontmatter, render Markdown (Marked.js), Highlight.js, injeção de exercícios
 */

function parseSimpleYamlValue(value) {
  const v = String(value || '').trim();
  if (!v) return '';
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
  }
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v === 'null') return null;
  if (/^-?\d+$/.test(v)) return parseInt(v, 10);
  if (/^-?\d+\.\d+$/.test(v)) return parseFloat(v);
  if ((v.startsWith('[') && v.endsWith(']')) || (v.startsWith('{') && v.endsWith('}'))) {
    try {
      return JSON.parse(v);
    } catch (_) {
      return v;
    }
  }
  return v;
}

function pagePath(fileName) {
  if (typeof Router !== 'undefined' && typeof Router.pagePath === 'function') return Router.pagePath(fileName);
  return fileName;
}

function homePath() {
  if (typeof Router !== 'undefined' && typeof Router.homePath === 'function') return Router.homePath();
  return 'index.html';
}

function getLineIndent(line) {
  const m = String(line || '').match(/^(\s*)/);
  return m ? m[1].length : 0;
}

function parseYamlLiteralBlock(lines, startIndex) {
  const block = [];
  let i = startIndex;
  let baseIndent = null;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      block.push('');
      i++;
      continue;
    }
    const indent = getLineIndent(line);
    if (baseIndent == null) baseIndent = indent;
    if (indent < baseIndent) break;
    // Encerra o bloco ao encontrar nova chave YAML no mesmo nível (ex.: "tests:")
    if (indent === baseIndent && line.trim().match(/^\w+:\s*$/)) break;
    block.push(line.slice(baseIndent));
    i++;
  }
  return { value: block.join('\n').replace(/\s+$/, ''), nextIndex: i };
}

function parseYamlObjectList(lines, startIndex) {
  const list = [];
  let i = startIndex;
  let listIndent = null;
  let current = null;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const indent = getLineIndent(line);
    const itemMatch = line.match(/^\s*-\s*(.*)$/);
    if (itemMatch) {
      if (listIndent == null) listIndent = indent;
      if (indent < listIndent) break;
      if (indent > listIndent && current) {
        i++;
        continue;
      }
      current = {};
      const inline = itemMatch[1].trim();
      if (inline) {
        const kvInline = inline.match(/^([\w-]+):\s*(.*)$/);
        if (kvInline) current[kvInline[1]] = parseSimpleYamlValue(kvInline[2]);
      }
      list.push(current);
      i++;
      continue;
    }

    if (listIndent == null || indent <= listIndent) break;
    const kv = line.trim().match(/^([\w-]+):\s*(.*)$/);
    if (kv && current) current[kv[1]] = parseSimpleYamlValue(kv[2]);
    i++;
  }

  return { value: list, nextIndex: i };
}

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
    const keyMatch = line.match(/^\s*(\w+):\s*(.*)$/);
    if (keyMatch) {
      const [, key, rest] = keyMatch;
      const value = rest.trim();
      if (value === '|') {
        const parsedBlock = parseYamlLiteralBlock(lines, i + 1);
        if (key !== 'exercises') frontmatter[key] = parsedBlock.value;
        i = parsedBlock.nextIndex;
        continue;
      }
      if (key === 'tests' && value === '') {
        const parsedTests = parseYamlObjectList(lines, i + 1);
        frontmatter.tests = parsedTests.value;
        i = parsedTests.nextIndex;
        continue;
      }
      const parsedValue = parseSimpleYamlValue(value);
      if (key !== 'exercises') frontmatter[key] = parsedValue;
    }
    if (line.match(/^exercises:\s*$/)) {
      const exercises = [];
      // Captura string entre aspas permitindo aspas do outro tipo dentro (ex.: "texto com 'aspas'")
      const quotedValue = (key, line) => {
        const re = new RegExp(`${key}:\\s*(["'])((?:\\\\.|(?!\\1)[\\s\\S])*)\\1`);
        const m = line.match(re);
        return m ? m[2].replace(/\\(.)/g, '$1') : null;
      };
      i++;
      while (i < lines.length) {
        const ln = lines[i];
        if (ln.match(/^\s+-\s+question:/)) {
          const ex = { question: '', answer: '', hint: '' };
          const q = quotedValue('question', ln);
          if (q != null) ex.question = q;
          i++;
          while (i < lines.length && !lines[i].match(/^\s+-\s+question:/)) {
            const rest = lines[i];
            const an = quotedValue('answer', rest);
            const hi = quotedValue('hint', rest);
            if (an != null) ex.answer = an;
            if (hi != null) ex.hint = hi;
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

/**
 * Tema Mermaid alinhado a css/styles.css (:root — ISS dark).
 * theme: 'base' + themeVariables (hex) — necessário para customizar cards e setas.
 */
function getIssMermaidConfig() {
  return {
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      darkMode: true,
      background: '#1E1E1E',
      mainBkg: '#1E1E1E',
      secondBkg: '#27272a',
      fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
      fontSize: '14px',
      primaryColor: '#27272a',
      primaryTextColor: '#DADADA',
      primaryBorderColor: '#3f3f46',
      secondaryColor: '#27272a',
      tertiaryColor: '#3f3f46',
      lineColor: '#5B88B2',
      secondaryTextColor: '#a1a1aa',
      tertiaryTextColor: '#a1a1aa',
      clusterBkg: '#1E1E1E',
      clusterBorder: '#3f3f46',
      titleColor: '#DADADA',
      edgeLabelBackground: '#27272a',
      nodeTextColor: '#DADADA',
      actorBkg: '#27272a',
      actorBorder: '#3f3f46',
      actorTextColor: '#DADADA',
      signalColor: '#5B88B2',
      labelTextColor: '#DADADA',
      loopTextColor: '#DADADA',
      activationBorderColor: '#5B88B2',
      sequenceNumberColor: '#DADADA',
      sectionBkgColor: '#27272a',
      altSectionBkgColor: '#1E1E1E',
      gridColor: '#3f3f46',
      classText: '#DADADA',
    },
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      padding: 10,
    },
    sequence: {
      actorFontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
      noteFontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
    },
  };
}

function renderMermaidDiagrams(container) {
  if (!container || typeof mermaid === 'undefined') return;

  const codeBlocks = container.querySelectorAll(
    'pre code.language-mermaid, pre code.lang-mermaid, code.language-mermaid, code.lang-mermaid'
  );

  codeBlocks.forEach((code) => {
    const text = code.textContent || '';
    const pre = code.parentElement && code.parentElement.tagName === 'PRE' ? code.parentElement : null;
    const host = pre || code;
    const wrapper = document.createElement('div');
    wrapper.className = 'mermaid iss-mermaid';
    wrapper.textContent = text.trim();
    if (host.parentElement) {
      host.parentElement.replaceChild(wrapper, host);
    }
  });
  
  try {
    if (!renderMermaidDiagrams._initialized) {
      mermaid.initialize(getIssMermaidConfig());
      renderMermaidDiagrams._initialized = true;
    }
    mermaid.run({ querySelector: '.mermaid' });
  } catch (_) {}
}

function highlightCodeBlocks(container) {
  if (typeof hljs === 'undefined' || !container) return;
  container.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
}

function addCopyButtons(container) {
  if (!container) return;
  container.querySelectorAll('pre').forEach((pre) => {
    const code = pre.querySelector('code');
    if (!code) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'iss-copy-btn';
    btn.setAttribute('aria-label', 'Copiar código');
    btn.textContent = 'Copiar';

    btn.addEventListener('click', () => {
      const text = code.innerText || code.textContent || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copiado!';
          btn.classList.add('iss-copy-btn--copied');
          setTimeout(() => {
            btn.textContent = 'Copiar';
            btn.classList.remove('iss-copy-btn--copied');
          }, 2000);
        }).catch(() => {
          btn.textContent = 'Erro';
          setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
        });
      }
    });

    pre.appendChild(btn);
  });
}

function slugify(text) {
  return text
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function ensureSectionIds(container) {
  if (!container) return;
  const headings = container.querySelectorAll('.iss-prose h2, .iss-prose h3');
  const seen = {};
  headings.forEach((h) => {
    let slug = slugify(h.textContent || '');
    if (!slug) slug = 'heading';
    if (seen[slug]) {
      seen[slug]++;
      slug = slug + '-' + seen[slug];
    } else {
      seen[slug] = 1;
    }
    h.id = slug;
  });
  // Manter IDs compatíveis para os dois primeiros H2
  const h2s = container.querySelectorAll('.iss-prose h2');
  if (h2s[0]) h2s[0].id = 'resumo';
  if (h2s[1]) h2s[1].id = 'explicacoes';
}


/** Remove do primeiro nó de texto o prefixo "[ ]", "[x]", "☐", "☑" etc. (marcadores do markdown). */
function stripChecklistPrefix(container) {
  if (!container) return;
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = node.textContent || '';
      const m = t.match(/^\s*(?:\[\s*[x ]?\s*\]|[\u2610\u2611]\s*)\s*/i);
      if (m) node.textContent = t.slice(m[0].length);
      return true;
    }
    if (node.nodeType === Node.ELEMENT_NODE)
      for (const child of node.childNodes) if (walk(child)) return true;
    return false;
  };
  for (const child of container.childNodes) if (walk(child)) break;
}

function initChecklists(contentEl, disciplineSlug, lessonSlug) {
  if (!contentEl || !disciplineSlug || !lessonSlug) return;
  const headings = contentEl.querySelectorAll('.iss-prose h3');
  for (const h3 of headings) {
    if (!h3.textContent || !h3.textContent.includes('Checklist de domínio')) continue;
    const ul = h3.nextElementSibling;
    if (!ul || ul.tagName !== 'UL') continue;
    ul.classList.add('iss-checklist');
    const state = getChecklistState(disciplineSlug, lessonSlug);
    const listItems = ul.querySelectorAll(':scope > li');
    listItems.forEach((li, index) => {
      li.querySelectorAll('input[type="checkbox"]').forEach((input) => input.remove());
      li.classList.add('iss-checklist-item');
      const checked = state[index] === true;
      if (checked) li.classList.add('iss-checklist-item--checked');
      const box = document.createElement('span');
      box.className = 'iss-checklist-box';
      box.setAttribute('aria-hidden', 'true');
      box.setAttribute('role', 'button');
      box.setAttribute('tabindex', '0');
      box.setAttribute('aria-pressed', checked ? 'true' : 'false');
      li.prepend(box);
      const textWrap = document.createElement('span');
      textWrap.className = 'iss-checklist-item__text';
      while (li.childNodes.length > 1) textWrap.appendChild(li.childNodes[1]);
      li.appendChild(textWrap);
      stripChecklistPrefix(textWrap);
      const updateState = () => {
        const newState = listItems.length ? Array.from(listItems).map((item) => item.classList.contains('iss-checklist-item--checked')) : [];
        setChecklistState(disciplineSlug, lessonSlug, newState);
      };
      const toggle = () => {
        li.classList.toggle('iss-checklist-item--checked');
        box.setAttribute('aria-pressed', li.classList.contains('iss-checklist-item--checked') ? 'true' : 'false');
        updateState();
      };
      box.addEventListener('click', (e) => { e.preventDefault(); toggle(); });
      box.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
      li.addEventListener('click', (e) => { if (e.target !== box && !box.contains(e.target)) toggle(); });
    });
    break;
  }
}

function buildOutline(contentEl) {
  if (!contentEl) return;
  const headings = Array.from(contentEl.querySelectorAll('.iss-prose h2, .iss-prose h3, #exercicios'));
  const listEl = document.getElementById('iss-outline-list');
  const asideEl = document.getElementById('iss-outline');
  if (!listEl || !asideEl) return;
  if (headings.length < 2) return;

  listEl.innerHTML = '';
  headings.forEach((h) => {
    const li = document.createElement('li');
    if (h.tagName === 'H3') li.className = 'iss-outline__item--h3';
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    listEl.appendChild(li);
  });

  asideEl.removeAttribute('hidden');

  const itemMap = {};
  headings.forEach((h) => {
    itemMap[h.id] = listEl.querySelector('a[href="#' + h.id + '"]');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          listEl.querySelectorAll('li').forEach((li) => li.classList.remove('iss-outline__item--active'));
          const activeLink = itemMap[entry.target.id];
          if (activeLink) activeLink.parentElement.classList.add('iss-outline__item--active');
        }
      });
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0 }
  );
  headings.forEach((h) => observer.observe(h));
}

function renderExercisesHTML(exercises, disciplineSlug, lessonSlug, reviewedIds) {
  if (!Array.isArray(exercises) || exercises.length === 0) return '';
  const ids = reviewedIds instanceof Set ? reviewedIds : new Set();
  const list = exercises
    .map((ex, i) => {
      const exerciseId = `${disciplineSlug}_${lessonSlug}_${i}`;
      const isReviewed = ids.has(exerciseId);
      const revisadoClass = isReviewed ? ' iss-exercise--revisado' : '';
      const revisadoLabel = isReviewed ? ' <span class="iss-exercise__revisado-label text-sm iss-text-muted">Revisado</span>' : '';
      return `
    <div class="iss-exercise${revisadoClass}" data-exercise-id="${escapeHtml(exerciseId)}">
      <p class="font-medium mb-2">${escapeHtml(ex.question)}${revisadoLabel}</p>
      <details class="group">
        <summary class="iss-exercise__toggle cursor-pointer list-none">
          <span class="inline">Ver resposta sugerida</span>
        </summary>
        <div class="mt-3 pt-3 border-t iss-border">
          <p class="mb-0">${escapeHtml(ex.answer)}</p>
          ${ex.hint ? `<p class="text-sm iss-text-muted mt-2 mb-0"><strong>Dica:</strong> ${escapeHtml(ex.hint)}</p>` : ''}
        </div>
      </details>
    </div>
  `;
    })
    .join('');
  return `
  <h2 id="exercicios" class="text-xl font-semibold mt-8 mb-4 pb-1 border-b iss-border">Exercícios</h2>
  <div class="space-y-4">${list}</div>
  `;
}

function renderPrevNextNav(prevLesson, nextLesson, disciplineSlug) {
  if (!prevLesson && !nextLesson) return '';
  const prevLink = prevLesson
    ? `<a href="${pagePath('aula.html')}?d=${encodeURIComponent(disciplineSlug)}&a=${encodeURIComponent(prevLesson.slug)}" class="iss-link">Aula anterior</a>`
    : '<span class="iss-text-muted">Aula anterior</span>';
  const nextLink = nextLesson
    ? `<a href="${pagePath('aula.html')}?d=${encodeURIComponent(disciplineSlug)}&a=${encodeURIComponent(nextLesson.slug)}" class="iss-link">Próxima aula</a>`
    : '<span class="iss-text-muted">Próxima aula</span>';
  return `<nav class="mt-8 pt-6 border-t iss-border flex justify-between text-sm" aria-label="Navegação entre aulas">${prevLink}${nextLink}</nav>`;
}

function renderLessonClosure(readToggleHtml) {
  const content = readToggleHtml ? `✓ Aula concluída, ${readToggleHtml}` : '✓ Aula concluída';
  return `<div class="mt-8 pt-6 border-t iss-border"><p class="mb-0">${content}</p></div>`;
}

function renderAulaPage({ raw, lesson, discipline, prevLesson, nextLesson, lessonIndex, totalLessons }) {
  const { frontmatter, body } = parseFrontmatter(raw);
  const title = frontmatter.title || lesson.title;

  document.title = `${title} — ISS`;

  const breadcrumbEl = document.getElementById('breadcrumb-aula');
  if (breadcrumbEl) {
    const d = new URLSearchParams(window.location.search).get('d');
    breadcrumbEl.innerHTML = `
      <button type="button" onclick="history.back()" class="iss-link-muted p-1 -ml-1 rounded hover:bg-black/5 dark:hover:bg-white/5 inline-flex items-center" aria-label="Voltar à página anterior" title="Voltar à página anterior">&lt;</button>
      <a href="${homePath()}" class="iss-link-muted">Home</a>
      <span class="iss-text-muted mx-1">/</span>
      <a href="${pagePath('disciplina.html')}?d=${encodeURIComponent(d)}" class="iss-link-muted">${escapeHtml(discipline ? discipline.title : d)}</a>
      <span class="iss-text-muted mx-1">/</span>
      <span class="iss-breadcrumb-current" title="${escapeHtml(title)}">${escapeHtml(title)}</span>
    `;
  }

  const titleEl = document.getElementById('lesson-title');
  if (titleEl) titleEl.textContent = title;

  const contentEl = document.getElementById('lesson-content');
  if (contentEl) {
    const disciplineSlug = discipline ? discipline.slug : '';
    const lessonSlug = lesson.slug;
    const read = typeof isLessonRead !== 'undefined' && isLessonRead(disciplineSlug, lessonSlug);
    const readToggleLabel = read ? 'Desmarcar como lida' : 'Marcar como lida';
    const readToggleBtnHtml = `<button type="button" id="iss-mark-read-toggle" class="text-sm iss-link border-0 bg-transparent cursor-pointer p-0 underline hover:no-underline">${escapeHtml(readToggleLabel)}</button>`;

    const words = body.trim().split(/\s+/).filter(Boolean).length;
    const readingMinutes = frontmatter.readingMinutes != null
      ? Math.max(1, parseInt(frontmatter.readingMinutes, 10) || 1)
      : Math.max(1, Math.ceil(words / 200));
    const exerciseCount = (frontmatter.exercises || []).length;
    const readingTimeText = exerciseCount > 0
      ? `~${readingMinutes} min de leitura, ${exerciseCount} exercícios`
      : `~${readingMinutes} min de leitura`;
    const readingTimeHtml = `<p class="iss-reading-time iss-text-muted text-sm mb-4">${readingTimeText}</p>`;
    const bodyHtml = renderBody(body);
    const reviewedIds = typeof getReviewedExerciseIds !== 'undefined' ? getReviewedExerciseIds() : new Set();
    const exercisesHtml = renderExercisesHTML(frontmatter.exercises || [], disciplineSlug, lesson.slug, reviewedIds);
    const closureHtml = renderLessonClosure(readToggleBtnHtml);
    const prevNextHtml = renderPrevNextNav(prevLesson || null, nextLesson || null, disciplineSlug);
    contentEl.innerHTML = `${readingTimeHtml}<nav class="mb-6 text-sm" aria-label="Nesta página"><a href="#resumo" class="iss-link hover:underline">Resumo</a><span class="iss-text-muted mx-1" aria-hidden="true">·</span><a href="#explicacoes" class="iss-link hover:underline">Explicações</a><span class="iss-text-muted mx-1" aria-hidden="true">·</span><a href="#exercicios" class="iss-link hover:underline">Exercícios</a></nav><div class="iss-prose">${bodyHtml}</div>${exercisesHtml}${closureHtml}${prevNextHtml}`;
    contentEl.querySelectorAll('img').forEach((img) => img.setAttribute('loading', 'lazy'));
    contentEl.querySelectorAll('iframe').forEach((iframe) => iframe.setAttribute('loading', 'lazy'));
    if (typeof renderMermaidDiagrams === 'function') renderMermaidDiagrams(contentEl);
    highlightCodeBlocks(contentEl);
    addCopyButtons(contentEl);
    ensureSectionIds(contentEl);
    buildOutline(contentEl);
    initChecklists(contentEl, disciplineSlug, lesson.slug);
    const resumoH2 = contentEl.querySelector('#resumo');
    if (resumoH2) {
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'text-sm iss-link border-0 bg-transparent cursor-pointer p-0 underline hover:no-underline block mb-7';
      copyBtn.textContent = 'Copiar resumo';
      copyBtn.addEventListener('click', () => {
        const explicacoesEl = contentEl.querySelector('#explicacoes');
        let node = resumoH2.nextSibling;
        const parts = [];
        while (node && node !== explicacoesEl) {
          if (node.nodeType === Node.ELEMENT_NODE && node.innerText) parts.push(node.innerText);
          node = node.nextSibling;
        }
        const bodyText = parts.join('\n\n');
        const text = (resumoH2.innerText ? resumoH2.innerText + '\n\n' : '') + bodyText;
        if (text && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = 'Copiado!';
            setTimeout(() => { copyBtn.textContent = 'Copiar resumo'; }, 2000);
          });
        }
      });
      resumoH2.after(copyBtn);
    }
    contentEl.querySelectorAll('.iss-exercise').forEach((block) => {
      const details = block.querySelector('details');
      const id = block.getAttribute('data-exercise-id');
      if (details && id && typeof markExerciseAsReviewed !== 'undefined') {
        details.addEventListener('toggle', () => {
          if (details.open) {
            markExerciseAsReviewed(id);
            block.classList.add('iss-exercise--revisado');
            const label = block.querySelector('.iss-exercise__revisado-label');
            if (!label) {
              const p = block.querySelector('p.font-medium');
              if (p) {
                const span = document.createElement('span');
                span.className = 'iss-exercise__revisado-label text-sm iss-text-muted';
                span.textContent = ' Revisado';
                p.appendChild(span);
              }
            }
          }
        });
      }
    });

    const readToggleBtn = contentEl.querySelector('#iss-mark-read-toggle');
    if (readToggleBtn && typeof markLessonAsRead !== 'undefined' && typeof markLessonAsUnread !== 'undefined') {
      readToggleBtn.addEventListener('click', () => {
        const nowRead = isLessonRead(disciplineSlug, lessonSlug);
        if (nowRead) {
          markLessonAsUnread(disciplineSlug, lessonSlug);
          readToggleBtn.textContent = 'Marcar como lida';
        } else {
          markLessonAsRead(disciplineSlug, lessonSlug);
          readToggleBtn.textContent = 'Desmarcar como lida';
        }
      });
    }
  }

}
