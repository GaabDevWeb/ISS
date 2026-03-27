/**
 * ISS — Inicialização e orquestração por página
 */

/** Minutos por aula quando não definido nos dados (estimativa padrão). */
const DEFAULT_MINUTES_PER_LESSON = 20;

function pagePath(fileName) {
  if (typeof Router !== 'undefined' && typeof Router.pagePath === 'function') return Router.pagePath(fileName);
  return fileName;
}

function homePath() {
  if (typeof Router !== 'undefined' && typeof Router.homePath === 'function') return Router.homePath();
  return 'index.html';
}

function getParam(name) {
  return typeof Router !== 'undefined' ? Router.getParam(name) : new URLSearchParams(window.location.search).get(name) || '';
}

function normalizeConcepts(concepts) {
  if (Array.isArray(concepts)) return concepts.map((c) => String(c).trim()).filter(Boolean);
  if (typeof concepts === 'string') return concepts.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

/** Embaralha array de forma determinística dado um seed (ex.: discipline + lesson slug). */
function shuffleWithSeed(arr, seed) {
  if (!Array.isArray(arr) || arr.length <= 1) return arr;
  const out = arr.slice();
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) >>> 0;
  for (let i = out.length - 1; i > 0; i--) {
    h = (Math.imul(16807, h) >>> 0) % 2147483647;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function initHome() {
  const grid = document.getElementById('home-cards-grid');
  const searchInput = document.getElementById('iss-search');
  const searchResultsEl = document.getElementById('search-results');
  if (!grid) return;

  const minChars = 2;

  function getExcerptSnippet(excerpt, qLower, maxLen = 100) {
    if (!excerpt) return '';
    const idx = excerpt.toLowerCase().indexOf(qLower);
    if (idx === -1) return '';
    const start = Math.max(0, idx - 30);
    const end = Math.min(excerpt.length, idx + qLower.length + 70);
    const raw = (start > 0 ? '…' : '') + excerpt.slice(start, end) + (end < excerpt.length ? '…' : '');
    const before = escapeHtml(raw.slice(0, raw.toLowerCase().indexOf(qLower)));
    const match = escapeHtml(raw.slice(raw.toLowerCase().indexOf(qLower), raw.toLowerCase().indexOf(qLower) + qLower.length));
    const after = escapeHtml(raw.slice(raw.toLowerCase().indexOf(qLower) + qLower.length));
    return before + '<strong>' + match + '</strong>' + after;
  }

  function getSearchMatches(disciplines, lessons, searchIndex, q) {
    const qLower = q.trim().toLowerCase();
    if (qLower.length < minChars) return [];
    const indexMap = new Map(searchIndex.map((e) => [`${e.discipline}/${e.slug}`, e.excerpt || '']));
    const flat = lessons.map((lesson) => ({
      lesson,
      discipline: getDiscipline(disciplines, lesson.discipline),
    })).filter((item) => item.discipline);
    return flat.filter((item) => {
      const key = `${item.lesson.discipline}/${item.lesson.slug}`;
      const excerpt = indexMap.get(key) || '';
      return (
        item.lesson.title.toLowerCase().includes(qLower) ||
        (item.discipline.title.toLowerCase().includes(qLower)) ||
        (item.discipline.professor && item.discipline.professor.toLowerCase().includes(qLower)) ||
        excerpt.toLowerCase().includes(qLower)
      );
    }).map((item) => {
      const key = `${item.lesson.discipline}/${item.lesson.slug}`;
      const excerpt = indexMap.get(key) || '';
      return { ...item, excerpt };
    });
  }

  function runSearch(disciplines, lessons, searchIndex) {
    if (!searchInput || !searchResultsEl) return;
    const q = searchInput.value.trim();
    const matches = getSearchMatches(disciplines, lessons, searchIndex, q);
    const qLower = q.trim().toLowerCase();
    if (q.length < minChars) {
      searchResultsEl.classList.add('hidden');
      searchResultsEl.innerHTML = '';
      return;
    }
    searchResultsEl.classList.remove('hidden');
    if (matches.length === 0) {
      searchResultsEl.innerHTML = '<p class="iss-text-muted text-sm py-1">Nenhuma aula encontrada.</p>';
    } else {
      searchResultsEl.innerHTML =
        '<ul class="iss-search-results-list">' +
        matches
          .map((item) => {
            const snippet = getExcerptSnippet(item.excerpt, qLower);
            const snippetHtml = snippet
              ? '<span class="block text-xs iss-text-muted mt-1" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + snippet + '</span>'
              : '';
            return (
              '<li class="iss-search-result-item">' +
              '<a href="' + pagePath('aula.html') + '?d=' +
              encodeURIComponent(item.lesson.discipline) +
              '&a=' +
              encodeURIComponent(item.lesson.slug) +
              '" class="iss-search-result-link block no-underline py-2.5 px-2 rounded">' +
              '<span class="block text-xs iss-text-muted mb-0.5">' + escapeHtml(item.discipline.title) + '</span>' +
              '<span class="block text-sm font-medium iss-text-foreground">' + escapeHtml(item.lesson.title) + '</span>' +
              snippetHtml +
              '</a></li>'
            );
          })
          .join('') +
        '</ul>';
    }
  }

  Promise.all([fetchDisciplines(), fetchLessons(), fetchSearchIndex(), typeof fetchExercises === 'function' ? fetchExercises() : Promise.resolve([])])
    .then(([disciplines, lessons, searchIndex, exercises]) => {
      const exerciseList = Array.isArray(exercises) ? exercises : [];
      const statsEl = document.getElementById('iss-library-stats');
      if (statsEl) {
        statsEl.textContent = `${lessons.length} aulas · ${disciplines.length} disciplinas`;
      }

      const last = getLastVisited();
      let lesson = null;
      let discipline = null;
      if (last) {
        lesson = getLesson(lessons, last.discipline, last.lesson);
        discipline = getDiscipline(disciplines, last.discipline);
      }
      const continueCardHtml =
        lesson && discipline
          ? `
        <a href="${pagePath('aula.html')}?d=${encodeURIComponent(last.discipline)}&a=${encodeURIComponent(last.lesson)}" class="iss-card block no-underline text-inherit">
          <h3 class="font-semibold text-lg m-0">Continuar a ler</h3>
          <p class="text-sm iss-text-muted mt-1 mb-0">${escapeHtml(discipline.title)} › ${escapeHtml(lesson.title)}</p>
        </a>
      `
          : '';

      const totalLessons = lessons.length;
      const readCount = typeof isLessonRead !== 'undefined'
        ? lessons.filter((l) => isLessonRead(l.discipline, l.slug)).length
        : 0;
      const progressPercent = totalLessons > 0 ? Math.round((readCount / totalLessons) * 100) : 0;
      const studiedMinutes = readCount * DEFAULT_MINUTES_PER_LESSON;
      const exercisesCompleted =
        typeof isExerciseCompleted !== 'undefined' && exerciseList.length > 0
          ? exerciseList.filter((ex) => isExerciseCompleted(ex.slug)).length
          : typeof getCompletedExerciseSlugs !== 'undefined'
            ? getCompletedExerciseSlugs().size
            : 0;

      const streak = typeof getStreak === 'function' ? getStreak() : 0;
      const goalMet = typeof getTodayGoalMet === 'function' ? getTodayGoalMet() : false;
      const dashboardCardHtml =
        '<div class="iss-card iss-card--static">' +
          '<h3 class="font-semibold text-lg m-0">Seu progresso</h3>' +
          '<p class="text-sm iss-text-muted mt-1 mb-0">Progresso geral ' + progressPercent + '%</p>' +
          '<p class="text-sm iss-text-muted mt-1 mb-0">Tempo estudado ' + (typeof formatDurationMinutes === 'function' ? formatDurationMinutes(studiedMinutes) : studiedMinutes + ' min') + '</p>' +
          '<p class="text-sm iss-text-muted mt-1 mb-0">' + exercisesCompleted + ' exercícios concluídos</p>' +
          (streak > 0 ? '<p class="text-sm iss-text-foreground mt-1 mb-0">Sequência: ' + streak + ' dia' + (streak !== 1 ? 's' : '') + '</p>' : '') +
          '<p class="text-sm mt-1 mb-0">Meta de hoje: ' + (goalMet ? '<span class="iss-text-foreground">Feito</span>' : '<span class="iss-text-muted">Pendente</span>') + '</p>' +
          '<a href="' + pagePath('stats.html') + '" class="iss-link block mt-3 text-sm hover:underline">Ver Estatísticas Completas</a>' +
        '</div>';

      const continuePlaceholderHtml =
        '<div class="iss-card iss-card--static">' +
          '<h3 class="font-semibold text-lg m-0">Continuar a ler</h3>' +
          '<p class="text-sm iss-text-muted mt-1 mb-0">Abra uma aula para continuar de onde parou.</p>' +
        '</div>';

      const exercisesCount = exerciseList.length;
      const exercisesProgressPercent = exercisesCount > 0 ? Math.round((exercisesCompleted / exercisesCount) * 100) : 0;
      const nextMilestone = exercisesCount > 0 ? Math.min(exercisesCount, Math.ceil((exercisesCompleted + 1) / 10) * 10) : 0;
      const remainingToMilestone = nextMilestone - exercisesCompleted;
      const nextGoalText =
        exercisesCount > 0 && exercisesCompleted >= exercisesCount
          ? 'Meta atingida! Todos concluídos.'
          : exercisesCount > 0 && nextMilestone > 0
            ? (remainingToMilestone === 1 ? 'Falta 1 para ' + nextMilestone + ' concluídos' : 'Faltam ' + remainingToMilestone + ' para ' + nextMilestone + ' concluídos')
            : '';
      const exercisesCardHtml =
        '<a href="' + pagePath('exercises.html') + '" class="iss-card block no-underline text-inherit iss-home-cards__exercises-card">' +
          '<h3 class="font-semibold text-lg m-0">Exercícios</h3>' +
          '<p class="text-sm iss-text-muted mt-1 mb-0">Pratique conceitos das aulas resolvendo exercícios no seu editor.</p>' +
          (nextGoalText ? '<p class="text-sm iss-text-foreground mt-2 mb-0">' + nextGoalText + '</p>' : '') +
          '<div class="mt-auto pt-4">' +
            '<div role="progressbar" aria-valuenow="' + exercisesProgressPercent + '" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso dos exercícios">' +
              '<div class="w-full h-2 rounded-full overflow-hidden" style="background: var(--color-border);">' +
                '<div class="h-full rounded-full transition-[width] duration-300" style="width:' + exercisesProgressPercent + '%; background: var(--color-accent);"></div>' +
              '</div>' +
            '</div>' +
            '<p class="text-sm font-medium iss-text-foreground mt-2 mb-0">' + exercisesCompleted + ' / ' + exercisesCount + ' concluídos</p>' +
            '<button type="button" id="iss-home-random-exercise-btn" class="iss-home-random-btn mt-3 w-full py-2 px-3 rounded font-medium text-sm border border-[var(--color-accent)] bg-[var(--color-accent)] text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)] focus:ring-[var(--color-accent)]">Desafio Aleatório</button>' +
          '</div>' +
        '</a>';

      function buildDisciplineCard(d) {
        const count = lessons.filter((l) => l.discipline === d.slug).length;
        const countLabel = count + ' aula' + (count !== 1 ? 's' : '');
        return '<a href="' + pagePath('disciplina.html') + '?d=' + encodeURIComponent(d.slug) + '" class="iss-card block no-underline text-inherit">' +
          '<h3 class="font-semibold text-lg m-0">' + escapeHtml(d.title) + '</h3>' +
          (d.description ? '<p class="text-sm iss-text-muted mt-1 mb-0">' + escapeHtml(d.description) + '</p>' : '') +
          '<p class="text-xs iss-text-muted mt-2 mb-0">' + escapeHtml(countLabel) + '</p>' +
        '</a>';
      }

      const cards = [dashboardCardHtml, continueCardHtml || continuePlaceholderHtml];
      disciplines.forEach((d) => cards.push(buildDisciplineCard(d)));
      cards.push(exercisesCardHtml);

      grid.innerHTML = cards.join('');

      // Remove card "Revisões sugeridas" se existir (ex.: cache antigo)
      grid.querySelectorAll('.iss-card').forEach(function (card) {
        if (card.textContent.indexOf('Revisões sugeridas') !== -1) card.remove();
      });

      const randomExerciseBtn = document.getElementById('iss-home-random-exercise-btn');
      if (randomExerciseBtn && exerciseList.length > 0) {
        randomExerciseBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          const completedSet = typeof getCompletedExerciseSlugs === 'function' ? getCompletedExerciseSlugs() : new Set();
          const unresolved = exerciseList.filter(function (ex) { return !completedSet.has(ex.slug); });
          const pool = unresolved.length > 0 ? unresolved : exerciseList;
          const ex = pool[Math.floor(Math.random() * pool.length)];
          if (typeof Router !== 'undefined' && Router.navigateToExercise) Router.navigateToExercise(ex.slug);
          else window.location.href = pagePath('exercise.html') + '?slug=' + encodeURIComponent(ex.slug);
        });
      }

      if (searchInput && searchResultsEl) {
        const searchWrapper = searchInput.closest('.relative');
        searchInput.addEventListener('input', () => runSearch(disciplines, lessons, searchIndex));
        searchInput.addEventListener('search', () => runSearch(disciplines, lessons, searchIndex));
        searchInput.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter') return;
          e.preventDefault();
          const q = searchInput.value.trim();
          const matches = getSearchMatches(disciplines, lessons, searchIndex, q);
          if (matches.length === 0) return;
          const first = matches[0];
          window.location.href =
            pagePath('aula.html') + '?d=' +
            encodeURIComponent(first.lesson.discipline) +
            '&a=' +
            encodeURIComponent(first.lesson.slug);
        });
        document.addEventListener('click', (e) => {
          if (searchResultsEl.classList.contains('hidden')) return;
          if (searchWrapper && searchWrapper.contains(e.target)) return;
          searchResultsEl.classList.add('hidden');
        });
      }
    })
    .catch((err) => {
      grid.innerHTML = '<p class="text-red-600">Erro ao carregar disciplinas.</p>';
      console.error(err);
    });
}

function initDisciplina() {
  const d = getParam('d');
  const container = document.getElementById('lessons-list');
  const titleEl = document.getElementById('discipline-title');
  const breadcrumbEl = document.getElementById('breadcrumb-discipline');
  const progressEl = document.getElementById('discipline-progress');

  if (!d) {
    if (typeof Router !== 'undefined') Router.navigateHome();
    else window.location.href = homePath();
    return;
  }

  Promise.all([fetchDisciplines(), fetchLessons()])
    .then(([disciplines, lessons]) => {
      const discipline = getDiscipline(disciplines, d);
      const disciplineLessons = getLessonsByDiscipline(lessons, d);

      if (!discipline) {
        if (titleEl) titleEl.textContent = 'Disciplina não encontrada';
        if (breadcrumbEl) breadcrumbEl.innerHTML = '<button type="button" onclick="history.back()" class="iss-link-muted p-1 -ml-1 rounded hover:bg-black/5 dark:hover:bg-white/5 inline-flex items-center" aria-label="Voltar à página anterior" title="Voltar à página anterior">&lt;</button><a href="' + homePath() + '" class="iss-link-muted">Home</a>';
        if (progressEl) progressEl.textContent = '';
        if (container) container.innerHTML = '<p class="iss-text-muted mb-4">Esta disciplina não existe.</p><a href="' + homePath() + '" class="iss-link hover:underline">Voltar à página inicial</a>';
        return;
      }

      if (disciplineLessons.length === 0) {
        if (titleEl) titleEl.textContent = discipline.title;
        if (breadcrumbEl) {
          breadcrumbEl.innerHTML = `
            <button type="button" onclick="history.back()" class="iss-link-muted p-1 -ml-1 rounded hover:bg-black/5 dark:hover:bg-white/5 inline-flex items-center" aria-label="Voltar à página anterior" title="Voltar à página anterior">&lt;</button>
            <a href="${homePath()}" class="iss-link-muted">Home</a>
            <span class="iss-text-muted mx-1">/</span>
            <span>${escapeHtml(discipline.title)}</span>
          `;
        }
        if (progressEl) progressEl.textContent = '';
        if (container) container.innerHTML = '<p class="iss-text-muted mb-4">Nenhuma aula publicada ainda.</p><a href="' + homePath() + '" class="iss-link hover:underline">Voltar à página inicial</a>';
        return;
      }

      if (titleEl) titleEl.textContent = discipline.title;
      if (breadcrumbEl) {
        breadcrumbEl.innerHTML = `
          <button type="button" onclick="history.back()" class="iss-link-muted p-1 -ml-1 rounded hover:bg-black/5 dark:hover:bg-white/5 inline-flex items-center" aria-label="Voltar à página anterior" title="Voltar à página anterior">&lt;</button>
          <a href="${homePath()}" class="iss-link-muted">Home</a>
          <span class="iss-text-muted mx-1">/</span>
          <span>${escapeHtml(discipline.title)}</span>
        `;
      }

      const readCount = typeof isLessonRead !== 'undefined' ? disciplineLessons.filter((l) => isLessonRead(d, l.slug)).length : 0;
      const total = disciplineLessons.length;
      const totalMinutes = total * DEFAULT_MINUTES_PER_LESSON;
      const remainingMinutes = (total - readCount) * DEFAULT_MINUTES_PER_LESSON;
      const progressPercent = total > 0 ? Math.round((readCount / total) * 100) : 0;

      if (progressEl) {
        progressEl.innerHTML =
          '<span class="block">' +
          total + ' aula' + (total !== 1 ? 's' : '') + ' · ' + formatDurationMinutes(totalMinutes) + ' totais' +
          '</span>' +
          '<span class="block mt-1">' +
          'Progresso: ' + progressPercent + '% · Tempo restante: ' + formatDurationMinutes(remainingMinutes) +
          '</span>';
      }

      if (container) {
        container.innerHTML = disciplineLessons
          .map(
            (l) => {
              const read = typeof isLessonRead !== 'undefined' && isLessonRead(d, l.slug);
              const readLabel = read ? '<span class="block text-sm iss-text-muted mt-1 iss-lesson-read">Lida</span>' : '';
              return `
          <a href="${pagePath('aula.html')}?d=${encodeURIComponent(d)}&a=${encodeURIComponent(l.slug)}" class="iss-card block no-underline text-inherit">
            <span class="font-medium">${escapeHtml(l.title)}</span>
            ${readLabel}
          </a>
        `;
            }
          )
          .join('');
      }

      const studyPathWrap = document.getElementById('study-path-wrap');
      const studyPathList = document.getElementById('study-path-list');
      if (studyPathWrap && studyPathList && typeof fetchStudyPath === 'function') {
        fetchStudyPath(d).then(function (path) {
          if (!path || path.length === 0) return;
          studyPathWrap.classList.remove('hidden');
          studyPathList.innerHTML = path.map(function (step) {
            if (step.type === 'lesson' && step.slug) {
              const lesson = disciplineLessons.find(function (l) { return l.slug === step.slug; });
              if (!lesson) return '<li class="iss-text-muted">Aula: ' + escapeHtml(step.slug) + '</li>';
              return '<li><a href="' + pagePath('aula.html') + '?d=' + encodeURIComponent(d) + '&a=' + encodeURIComponent(lesson.slug) + '" class="iss-link">Aula: ' + escapeHtml(lesson.title) + '</a></li>';
            }
            if (step.type === 'exercises' && Array.isArray(step.slugs) && step.slugs.length > 0) {
              return '<li>Exercícios: ' + step.slugs.map(function (slug) {
                return '<a href="' + pagePath('exercise.html') + '?slug=' + encodeURIComponent(slug) + '" class="iss-link">' + escapeHtml(slug) + '</a>';
              }).join(', ') + '</li>';
            }
            return '';
          }).filter(Boolean).join('');
        });
      }
    })
    .catch(() => {
      if (typeof Router !== 'undefined') Router.navigateHome();
      else window.location.href = homePath();
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
    if (breadcrumbEl) breadcrumbEl.innerHTML = '<a href="' + homePath() + '" class="iss-link-muted">Home</a>';
    if (contentEl) contentEl.innerHTML = '<p class="iss-text-muted mb-4">' + escapeHtml(msg) + '</p><a href="' + homePath() + '" class="iss-link hover:underline">Voltar à página inicial</a>';
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
      setLastVisited(d, a);
      const disciplineLessons = getLessonsByDiscipline(lessons, d);
      const idx = disciplineLessons.findIndex((l) => l.slug === lesson.slug);
      const prevLesson = idx > 0 ? disciplineLessons[idx - 1] : null;
      const nextLesson = idx >= 0 && idx < disciplineLessons.length - 1 ? disciplineLessons[idx + 1] : null;
      return fetchLessonMarkdown(d, lesson.file).then((raw) => ({
        raw,
        lesson,
        prevLesson,
        nextLesson,
        lessonIndex: idx + 1,
        totalLessons: disciplineLessons.length,
      }));
    })
    .then((data) => {
      if (!data) return;
      const { raw, lesson, prevLesson, nextLesson, lessonIndex, totalLessons } = data;
      return Promise.all([
        typeof fetchDisciplines === 'function' ? fetchDisciplines() : Promise.resolve([]),
        typeof fetchExercises === 'function' ? fetchExercises() : Promise.resolve([]),
      ]).then(([disciplines, exercises]) => {
        const discipline = getDiscipline(disciplines, d);
        renderAulaPage({ raw, lesson, discipline, prevLesson, nextLesson, lessonIndex, totalLessons });

        const completedSet = typeof getCompletedExerciseSlugs === 'function' ? getCompletedExerciseSlugs() : new Set();
        const frontmatter = typeof parseFrontmatter === 'function' ? parseFrontmatter(raw).frontmatter : {};
        const lessonConcepts = normalizeConcepts(frontmatter.concepts);
        const exerciseList = Array.isArray(exercises) ? exercises : [];

        function scoreConcepts(ex) {
          const concepts = normalizeConcepts(ex && ex.concepts);
          return concepts.filter((c) => lessonConcepts.includes(c)).length;
        }
        function sortByRelevance(list) {
          return list.slice().sort((a, b) => {
            const aDone = completedSet.has(a.slug);
            const bDone = completedSet.has(b.slug);
            if (aDone !== bDone) return aDone ? 1 : -1;
            return scoreConcepts(b) - scoreConcepts(a);
          });
        }

        const linkedSlugs = (function () {
          const le = frontmatter.linkedExercises;
          if (Array.isArray(le)) return le.map((s) => String(s).trim()).filter(Boolean);
          if (typeof le === 'string') return le.split(',').map((s) => s.trim()).filter(Boolean);
          return [];
        })();
        let suggested;
        if (linkedSlugs.length > 0) {
          const linked = linkedSlugs.map((slug) => exerciseList.find((e) => e && e.slug === slug)).filter(Boolean);
          suggested = sortByRelevance(linked).slice(0, 8);
        } else {
          const byDiscipline = exerciseList.filter((e) => e && e.discipline === d);
          const sortedSame = sortByRelevance(byDiscipline);
          if (d === 'python') {
            const poolSize = 8;
            let pool = sortedSame.slice(0, poolSize);
            if (pool.length < 3) {
              const other = exerciseList.filter((e) => e && e.discipline !== d);
              const sortedOther = sortByRelevance(other);
              const needed = Math.max(3, poolSize) - pool.length;
              const added = sortedOther.slice(0, needed);
              pool = [...pool, ...added].slice(0, poolSize);
            }
            const shuffled = shuffleWithSeed(pool, d + '-' + (lesson.slug || ''));
            suggested = shuffled.slice(0, 3);
          } else {
            suggested = sortedSame.slice(0, 3);
          }
        }
        if (suggested.length > 3) suggested = suggested.slice(0, 3);

        const contentElAfter = document.getElementById('lesson-content');
        const nav = contentElAfter && contentElAfter.querySelector(':scope > nav[aria-label="Navegação entre aulas"]');
        if (suggested.length && nav) {
          const linksHtml = suggested
            .map(
              (ex) =>
                '<li class="mt-1.5 first:mt-0"><a href="' + pagePath('exercise.html') + '?slug=' +
                encodeURIComponent(ex.slug) +
                '&d=' + encodeURIComponent(d) +
                '&a=' + encodeURIComponent(a) +
                '" class="iss-link hover:underline">' +
                escapeHtml(ex.title) +
                '</a></li>'
            )
            .join('');
          const section = document.createElement('section');
          section.className = 'mt-8 pt-6 border-t iss-border';
          section.setAttribute('aria-label', 'Exercícios sugeridos');
          section.innerHTML =
            '<h2 class="text-lg font-semibold iss-text-foreground mb-3">Chega de teoria. Hora de codar!</h2>' +
            '<ul class="list-none p-0 m-0">' +
            linksHtml +
            '</ul>';
          nav.parentNode.insertBefore(section, nav);
        }
      });
    })
    .catch(() => {
      showAulaError('Erro ao carregar o conteúdo da aula.');
    });
}

function getPageType() {
  const path = window.location.pathname;
  if (path.endsWith('disciplina.html')) return 'disciplina';
  if (path.endsWith('aula.html')) return 'aula';
  if (path.endsWith('exercises.html')) return 'exercises';
  if (path.endsWith('exercise.html')) return 'exercise';
  return 'home';
}

function initBackToTop() {
  const btn = document.getElementById('iss-back-to-top');
  if (!btn) return;
  const scrollThreshold = 300;
  function updateVisibility() {
    if (window.scrollY > scrollThreshold) {
      btn.style.display = '';
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
      btn.style.display = 'none';
    }
  }
  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  });
}

function initFocusMode() {
  const toggle = document.getElementById('iss-focus-toggle');
  const exitBtn = document.getElementById('iss-focus-exit');
  if (!toggle) return;

  function setFocusMode(active) {
    if (active) {
      document.body.classList.add('iss-focus-mode');
      if (exitBtn) exitBtn.style.display = '';
    } else {
      document.body.classList.remove('iss-focus-mode');
      if (exitBtn) exitBtn.style.display = 'none';
    }
  }

  toggle.addEventListener('click', () => setFocusMode(true));
  if (exitBtn) exitBtn.addEventListener('click', () => setFocusMode(false));
}

document.addEventListener('DOMContentLoaded', () => {
  initFocusMode();
  const page = getPageType();
  if (page === 'home') initHome();
  else if (page === 'disciplina') {
    initDisciplina();
    initBackToTop();
  } else if (page === 'aula') {
    initAula();
    initBackToTop();
  } else if (page === 'exercises') {
    if (typeof initExercises === 'function') initExercises('exercises-list');
  } else if (page === 'exercise') {
    if (typeof initExercise === 'function') initExercise();
  }
});
