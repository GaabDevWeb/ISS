/**
 * ISS — Inicialização e orquestração por página
 */

function getParam(name) {
  return typeof Router !== 'undefined' ? Router.getParam(name) : new URLSearchParams(window.location.search).get(name) || '';
}

function initHome() {
  const container = document.getElementById('disciplines-list');
  if (!container) return;

  fetchDisciplines()
    .then((disciplines) => {
      if (disciplines.length === 0) {
        container.innerHTML = '<p class="iss-text-muted">Nenhuma disciplina disponível.</p>';
        return;
      }
      container.innerHTML = disciplines
        .map(
          (d) => `
        <a href="disciplina.html?d=${encodeURIComponent(d.slug)}" class="iss-card block no-underline text-inherit">
          <h3 class="font-semibold text-lg m-0">${escapeHtml(d.title)}</h3>
          ${d.description ? `<p class="text-sm iss-text-muted mt-1 mb-0">${escapeHtml(d.description)}</p>` : ''}
        </a>
      `
        )
        .join('');
    })
    .catch((err) => {
      container.innerHTML = '<p class="text-red-600">Erro ao carregar disciplinas.</p>';
      console.error(err);
    });
}

function initDisciplina() {
  const d = getParam('d');
  const container = document.getElementById('lessons-list');
  const titleEl = document.getElementById('discipline-title');
  const breadcrumbEl = document.getElementById('breadcrumb-discipline');

  if (!d) {
    if (typeof Router !== 'undefined') Router.navigateHome();
    else window.location.href = 'index.html';
    return;
  }

  Promise.all([fetchDisciplines(), fetchLessons()])
    .then(([disciplines, lessons]) => {
      const discipline = getDiscipline(disciplines, d);
      const disciplineLessons = getLessonsByDiscipline(lessons, d);

      if (!discipline) {
        if (titleEl) titleEl.textContent = 'Disciplina não encontrada';
        if (breadcrumbEl) breadcrumbEl.innerHTML = '<a href="index.html" class="iss-link-muted">Home</a>';
        if (container) container.innerHTML = '<p class="iss-text-muted mb-4">Esta disciplina não existe.</p><a href="index.html" class="iss-link hover:underline">Voltar à página inicial</a>';
        return;
      }

      if (disciplineLessons.length === 0) {
        if (titleEl) titleEl.textContent = discipline.title;
        if (breadcrumbEl) {
          breadcrumbEl.innerHTML = `
            <a href="index.html" class="iss-link-muted">Home</a>
            <span class="iss-text-muted mx-1">/</span>
            <span>${escapeHtml(discipline.title)}</span>
          `;
        }
        if (container) container.innerHTML = '<p class="iss-text-muted mb-4">Nenhuma aula publicada ainda.</p><a href="index.html" class="iss-link hover:underline">Voltar à página inicial</a>';
        return;
      }

      if (titleEl) titleEl.textContent = discipline.title;
      if (breadcrumbEl) {
        breadcrumbEl.innerHTML = `
          <a href="index.html" class="iss-link-muted">Home</a>
          <span class="iss-text-muted mx-1">/</span>
          <span>${escapeHtml(discipline.title)}</span>
        `;
      }

      if (container) {
        container.innerHTML = disciplineLessons
          .map(
            (l) => `
          <a href="aula.html?d=${encodeURIComponent(d)}&a=${encodeURIComponent(l.slug)}" class="iss-card block no-underline text-inherit">
            <span class="font-medium">${escapeHtml(l.title)}</span>
          </a>
        `
          )
          .join('');
      }
    })
    .catch(() => {
      if (typeof Router !== 'undefined') Router.navigateHome();
      else window.location.href = 'index.html';
    });
}

function initAula() {
  const d = getParam('d');
  const a = getParam('a');
  const contentEl = document.getElementById('lesson-content');
  const titleEl = document.getElementById('lesson-title');
  const breadcrumbEl = document.getElementById('breadcrumb-aula');

  function showAulaError(msg) {
    document.title = 'Aula não encontrada — ISS';
    if (titleEl) titleEl.textContent = 'Aula não encontrada';
    if (breadcrumbEl) breadcrumbEl.innerHTML = '<a href="index.html" class="iss-link-muted">Home</a>';
    if (contentEl) contentEl.innerHTML = '<p class="iss-text-muted mb-4">' + escapeHtml(msg) + '</p><a href="index.html" class="iss-link hover:underline">Voltar à página inicial</a>';
  }

  if (!d || !a) {
    showAulaError('Parâmetros de disciplina ou aula em falta.');
    return;
  }

  fetchLessons()
    .then((lessons) => {
      const lesson = getLesson(lessons, d, a);
      if (!lesson) {
        showAulaError('Esta aula não existe.');
        return null;
      }
      return fetchLessonMarkdown(d, lesson.file).then((raw) => ({
        raw,
        lesson,
      }));
    })
    .then((data) => {
      if (!data) return;
      const { raw, lesson } = data;
      return fetchDisciplines().then((disciplines) => {
        const discipline = getDiscipline(disciplines, d);
        renderAulaPage({ raw, lesson, discipline });
      });
    })
    .catch(() => {
      showAulaError('Erro ao carregar o conteúdo da aula.');
    });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getPageType() {
  const path = window.location.pathname;
  if (path.endsWith('disciplina.html')) return 'disciplina';
  if (path.endsWith('aula.html')) return 'aula';
  return 'home';
}

document.addEventListener('DOMContentLoaded', () => {
  const page = getPageType();
  if (page === 'home') initHome();
  else if (page === 'disciplina') initDisciplina();
  else if (page === 'aula') initAula();
});
