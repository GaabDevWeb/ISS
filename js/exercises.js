/**
 * ISS — Exercícios práticos de programação: parse, cards, página, solução colapsável, copiar enunciado
 */

const EXERCISES_COMPLETED_KEY = 'iss-exercises-completed';
const MINUTES_PER_EXERCISE = 4;

function getCompletedExerciseSlugs() {
  try {
    const raw = localStorage.getItem(EXERCISES_COMPLETED_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(arr)) return new Set();
    const slugs = arr.map(function (item) {
      return typeof item === 'string' ? item : (item && item.slug);
    }).filter(Boolean);
    return new Set(slugs);
  } catch {
    return new Set();
  }
}

function getCompletedExercisesRaw() {
  try {
    const raw = localStorage.getItem(EXERCISES_COMPLETED_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(arr)) return [];
    return arr.map(function (item) {
      if (typeof item === 'string') return { slug: item, timestamp: null };
      return { slug: item && item.slug, timestamp: item && item.timestamp != null ? item.timestamp : null };
    }).filter(function (x) { return x.slug; });
  } catch {
    return [];
  }
}

function markExerciseCompleted(slug) {
  const list = getCompletedExercisesRaw();
  if (list.some(function (x) { return x.slug === slug; })) return;
  list.push({ slug: slug, timestamp: Date.now() });
  try {
    localStorage.setItem(EXERCISES_COMPLETED_KEY, JSON.stringify(list));
  } catch (_) {}
}

function isExerciseCompleted(slug) {
  return getCompletedExerciseSlugs().has(slug);
}

function parseExerciseBody(body) {
  const solucaoMatch = body.match(/\n##\s*Solução\s*\n/i) || body.match(/\nSolução\s*\n/i);
  let enunciado = body.trim();
  let solucaoRaw = '';
  if (solucaoMatch) {
    const idx = body.indexOf(solucaoMatch[0]) + solucaoMatch[0].length;
    enunciado = body.slice(0, body.indexOf(solucaoMatch[0])).trim();
    solucaoRaw = body.slice(idx).trim();
  }
  const codeBlockMatch = solucaoRaw.match(/```(?:\w+)?\s*([\s\S]*?)```/);
  const solucaoCode = codeBlockMatch ? codeBlockMatch[1].trim() : solucaoRaw;
  return { enunciado, solucaoCode };
}

function getConceptsArray(concepts) {
  if (Array.isArray(concepts)) return concepts;
  if (typeof concepts === 'string') return concepts.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

function getDifficultyLabel(difficulty) {
  const map = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
  return map[difficulty] || difficulty || '—';
}

function formatEnunciadoForCopy(enunciadoText) {
  const lines = enunciadoText.split(/\r?\n/);
  return lines.map((line) => (line.trim() ? '# ' + line : '')).join('\n').trim() || '# Exercício';
}

function ExerciseCard(exercise, options) {
  const concepts = getConceptsArray(exercise.concepts);
  const difficultyLabel = getDifficultyLabel(exercise.difficulty);
  const slug = encodeURIComponent(exercise.slug);
  const completed = typeof isExerciseCompleted === 'function' && isExerciseCompleted(exercise.slug);
  const forListingPage = options && options.forListingPage;
  const selectedConcepts = (options && options.selectedConcepts) || new Set();
  const tagsHtml = concepts.length
    ? concepts
        .map(function (c) {
          const active = forListingPage && selectedConcepts.has(c);
          if (forListingPage) {
            return (
              '<button type="button" class="iss-tag' +
              (active ? ' iss-tag--active' : '') +
              '" data-concept="' +
              escapeHtml(c) +
              '">' +
              escapeHtml(c) +
              '</button>'
            );
          }
          return '<span class="iss-tag">' + escapeHtml(c) + '</span>';
        })
        .join('')
    : '<span class="iss-text-muted">—</span>';
  const resolvedHtml = completed ? '<p class="text-sm iss-exercise-resolved mt-1 mb-0">✓ Resolvido</p>' : '';
  return (
    '<a href="exercise.html?slug=' + slug + '" class="iss-card block no-underline text-inherit">' +
    '<h3 class="font-semibold text-lg m-0">' + escapeHtml(exercise.title) + '</h3>' +
    '<p class="text-sm iss-text-muted mt-1 mb-0">Dificuldade: ' + escapeHtml(difficultyLabel) + '</p>' +
    '<div class="iss-card-tags mt-1">' + tagsHtml + '</div>' +
    resolvedHtml +
    '<p class="text-sm iss-link mt-2 mb-0">Resolver exercício →</p>' +
    '</a>'
  );
}

function getRelatedExercises(allExercises, currentSlug, currentConcepts, limit) {
  const currentSet = new Set(currentConcepts);
  if (currentSet.size === 0) return [];
  return allExercises
    .filter((ex) => ex.slug !== currentSlug)
    .map((ex) => {
      const exConcepts = new Set(getConceptsArray(ex.concepts));
      let common = 0;
      currentSet.forEach((c) => {
        if (exConcepts.has(c)) common++;
      });
      return { exercise: ex, common };
    })
    .filter((x) => x.common > 0)
    .sort((a, b) => b.common - a.common || (a.exercise.order || 0) - (b.exercise.order || 0))
    .slice(0, limit || 5)
    .map((x) => x.exercise);
}

function renderExercisePage(data) {
  const { frontmatter, enunciadoHtml, solucaoCode, discipline, currentSlug, allExercises } = data;
  const slug = currentSlug || frontmatter.slug;
  const title = frontmatter.title || 'Exercício';
  const concepts = getConceptsArray(frontmatter.concepts);
  const difficultyLabel = getDifficultyLabel(frontmatter.difficulty);
  const lang = (frontmatter.discipline || 'python').toLowerCase().includes('python') ? 'python' : 'plaintext';
  const exercises = Array.isArray(allExercises) ? allExercises : [];

  document.title = title + ' — ISS';

  const breadcrumbEl = document.getElementById('breadcrumb-exercise');
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML =
      '<a href="index.html" class="iss-link-muted">Home</a>' +
      '<span class="iss-text-muted mx-1">/</span>' +
      '<a href="exercises.html" class="iss-link-muted">Exercícios de Programação</a>' +
      '<span class="iss-text-muted mx-1">/</span>' +
      '<span>' + escapeHtml(title) + '</span>';
  }

  const titleEl = document.getElementById('exercise-title');
  if (titleEl) titleEl.textContent = title;

  const metaTagsHtml = concepts.length
    ? concepts.map((c) => '<span class="iss-tag">' + escapeHtml(c) + '</span>').join('')
    : '<span class="iss-text-muted">—</span>';
  const metaEl = document.getElementById('exercise-meta');
  if (metaEl) {
    metaEl.innerHTML =
      '<p class="text-sm iss-text-muted mt-0 mb-2">Dificuldade: ' + escapeHtml(difficultyLabel) + '</p>' +
      '<p class="text-sm iss-text-muted mt-0 mb-2">Conceitos praticados:</p>' +
      '<div class="iss-card-tags mb-2">' + metaTagsHtml + '</div>';
  }

  const buttonsEl = document.getElementById('exercise-buttons');
  if (buttonsEl) {
    buttonsEl.innerHTML =
      '<button type="button" id="iss-copy-exercise-btn" class="iss-exercise-action-btn">Copiar exercício</button> ' +
      '<button type="button" id="iss-toggle-solution-btn" class="iss-exercise-action-btn">Mostrar solução</button> ' +
      '<button type="button" id="iss-mark-resolved-btn" class="iss-exercise-action-btn">Marcar como resolvido</button>';
  }

  const enunciadoEl = document.getElementById('exercise-enunciado');
  if (enunciadoEl) enunciadoEl.innerHTML = '<div class="iss-prose">' + enunciadoHtml + '</div>';

  const solutionWrap = document.getElementById('exercise-solution-wrap');
  if (solutionWrap) {
    solutionWrap.innerHTML =
      '<div id="iss-solution-confirm-wrap" class="iss-solution-confirm hidden" aria-hidden="true"></div>' +
      '<div id="exercise-solution-block" class="iss-exercise-solution hidden" aria-hidden="true">' +
      '<pre><code class="language-' + escapeHtml(lang) + '">' + escapeHtml(solucaoCode) + '</code></pre>' +
      '<button type="button" id="iss-hide-solution-btn" class="iss-exercise-action-btn mt-2">Esconder solução</button>' +
      '</div>';
  }

  const navEl = document.getElementById('exercise-nav-prev-next');
  if (navEl && exercises.length > 0 && slug) {
    const idx = exercises.findIndex((ex) => ex.slug === slug);
    const prev = idx > 0 ? exercises[idx - 1] : null;
    const next = idx >= 0 && idx < exercises.length - 1 ? exercises[idx + 1] : null;
    let html = '';
    if (prev) {
      html += '<a href="exercise.html?slug=' + encodeURIComponent(prev.slug) + '" class="iss-link">← Exercício anterior</a>';
    } else {
      html += '<span class="iss-text-muted">← Exercício anterior</span>';
    }
    if (next) {
      html += '<a href="exercise.html?slug=' + encodeURIComponent(next.slug) + '" class="iss-link">Próximo exercício →</a>';
    } else {
      html += '<span class="iss-text-muted">Próximo exercício →</span>';
    }
    navEl.innerHTML = html;
  }

  const relatedWrap = document.getElementById('exercise-related-wrap');
  if (relatedWrap && exercises.length > 0 && slug) {
    const related = getRelatedExercises(exercises, slug, concepts, 5);
    if (related.length > 0) {
      relatedWrap.innerHTML =
        '<h2 class="text-lg font-semibold iss-text-foreground mb-2">Exercícios relacionados</h2>' +
        '<ul class="list-none p-0 m-0">' +
        related
          .map(
            (ex) =>
              '<li class="mb-1"><a href="exercise.html?slug=' +
              encodeURIComponent(ex.slug) +
              '" class="iss-link">' +
              escapeHtml(ex.title) +
              '</a></li>'
          )
          .join('') +
        '</ul>';
    } else {
      relatedWrap.innerHTML = '';
    }
  }

  const enunciadoTextEl = document.createElement('div');
  enunciadoTextEl.innerHTML = enunciadoHtml;
  const enunciadoPlain = (enunciadoTextEl.textContent || enunciadoTextEl.innerText || '').trim();

  const copyBtn = document.getElementById('iss-copy-exercise-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const toCopy = formatEnunciadoForCopy(enunciadoPlain);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(toCopy).then(() => {
          copyBtn.textContent = 'Copiado!';
          copyBtn.classList.add('iss-copy-btn--copied');
          setTimeout(() => {
            copyBtn.textContent = 'Copiar exercício';
            copyBtn.classList.remove('iss-copy-btn--copied');
          }, 2000);
        }).catch(() => {
          copyBtn.textContent = 'Erro';
          setTimeout(() => { copyBtn.textContent = 'Copiar exercício'; }, 2000);
        });
      }
    });
  }

  const markResolvedBtn = document.getElementById('iss-mark-resolved-btn');
  if (markResolvedBtn && typeof markExerciseCompleted === 'function') {
    markResolvedBtn.addEventListener('click', () => {
      markExerciseCompleted(slug);
      markResolvedBtn.textContent = '✓ Resolvido';
      markResolvedBtn.disabled = true;
    });
  }

  const toggleBtn = document.getElementById('iss-toggle-solution-btn');
  const solutionBlock = document.getElementById('exercise-solution-block');
  const hideBtn = document.getElementById('iss-hide-solution-btn');
  const confirmWrap = document.getElementById('iss-solution-confirm-wrap');

  function showSolution() {
    if (typeof markExerciseCompleted === 'function' && slug) markExerciseCompleted(slug);
    if (solutionBlock) {
      solutionBlock.classList.remove('hidden');
      solutionBlock.setAttribute('aria-hidden', 'false');
      if (typeof highlightCodeBlocks === 'function') highlightCodeBlocks(solutionBlock);
      if (typeof addCopyButtons === 'function') addCopyButtons(solutionBlock);
    }
    if (toggleBtn) toggleBtn.style.display = 'none';
    if (hideBtn) hideBtn.style.display = '';
    if (confirmWrap) {
      confirmWrap.classList.add('hidden');
      confirmWrap.setAttribute('aria-hidden', 'true');
      confirmWrap.innerHTML = '';
    }
    if (markResolvedBtn) {
      markResolvedBtn.textContent = '✓ Resolvido';
      markResolvedBtn.disabled = true;
    }
  }

  function hideSolution() {
    if (solutionBlock) {
      solutionBlock.classList.add('hidden');
      solutionBlock.setAttribute('aria-hidden', 'true');
    }
    if (toggleBtn) {
      toggleBtn.textContent = 'Mostrar solução';
      toggleBtn.style.display = '';
    }
    if (hideBtn) hideBtn.style.display = 'none';
  }

  function hideConfirm() {
    if (confirmWrap) {
      confirmWrap.classList.add('hidden');
      confirmWrap.setAttribute('aria-hidden', 'true');
      confirmWrap.innerHTML = '';
    }
  }

  function showConfirm() {
    if (!confirmWrap) return;
    confirmWrap.innerHTML =
      '<p class="m-0 font-medium iss-text-foreground">Já cansou de fritar o cérebro?</p>' +
      '<div class="iss-solution-confirm__buttons">' +
      '<button type="button" id="iss-confirm-tried-btn" class="iss-exercise-action-btn">Vou debugar mais um pouco</button> ' +
      '<button type="button" id="iss-confirm-show-btn" class="iss-exercise-action-btn">Comparar minha lógica</button>' +
      '</div>';
    confirmWrap.classList.remove('hidden');
    confirmWrap.setAttribute('aria-hidden', 'false');
    const triedBtn = document.getElementById('iss-confirm-tried-btn');
    const showBtn = document.getElementById('iss-confirm-show-btn');
    if (triedBtn) triedBtn.addEventListener('click', hideConfirm);
    if (showBtn) showBtn.addEventListener('click', showSolution);
    if (triedBtn) triedBtn.focus();
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (solutionBlock && solutionBlock.classList.contains('hidden') && confirmWrap && confirmWrap.classList.contains('hidden')) {
        showConfirm();
      }
    });
  }
  if (hideBtn) {
    hideBtn.style.display = 'none';
    hideBtn.addEventListener('click', hideSolution);
  }
}

const CONCEPTS_FIRST_ROW = 10;

function getAllConcepts(exercises) {
  const set = new Set();
  exercises.forEach((ex) => getConceptsArray(ex.concepts).forEach((c) => set.add(c)));
  return [...set].sort((a, b) => a.localeCompare(b, 'pt'));
}

function applyExercisesFilters(exercises, state) {
  let list = exercises.slice();
  if (state.selectedConcepts && state.selectedConcepts.size > 0) {
    list = list.filter((ex) => {
      const exConcepts = new Set(getConceptsArray(ex.concepts));
      return [...state.selectedConcepts].every((c) => exConcepts.has(c));
    });
  }
  if (state.difficultyFilter) {
    list = list.filter((ex) => ex.difficulty === state.difficultyFilter);
  }
  if (state.resolveFilter === 'resolvidos') {
    list = list.filter((ex) => isExerciseCompleted(ex.slug));
  } else if (state.resolveFilter === 'nao-resolvidos') {
    list = list.filter((ex) => !isExerciseCompleted(ex.slug));
  }
  return list;
}

function initExercises(containerId) {
  const container = document.getElementById(containerId || 'exercises-list');
  if (!container) return;

  const state = {
    selectedConcepts: new Set(),
    difficultyFilter: '',
    resolveFilter: '',
  };

  const progressSection = document.getElementById('exercises-progress-section');
  const progressText = document.getElementById('exercises-progress-text');
  const progressFill = document.getElementById('exercises-progress-fill');
  const progressBar = progressFill ? progressFill.closest('[role="progressbar"]') : null;
  const conceptFiltersEl = document.getElementById('exercises-concept-filters');
  const difficultyFiltersEl = document.getElementById('exercises-difficulty-filters');
  const resolveFiltersEl = document.getElementById('exercises-resolve-filters');
  const clearBtn = document.getElementById('exercises-clear-filters');
  const randomBtn = document.getElementById('iss-random-exercise-btn');
  const totalCountEl = document.getElementById('exercises-total-count');
  const estimatedTimeEl = document.getElementById('exercises-estimated-time');

  function formatEstimatedTime(totalExercises) {
    const minutes = totalExercises * MINUTES_PER_EXERCISE;
    if (minutes >= 60) {
      const hours = Math.round(minutes / 60);
      return '~' + hours + (hours === 1 ? ' hora' : ' horas');
    }
    return '~' + minutes + ' min';
  }

  function updatePracticeStats(total) {
    if (totalCountEl) totalCountEl.textContent = total;
    if (estimatedTimeEl) estimatedTimeEl.textContent = formatEstimatedTime(total);
  }

  function updateProgress(exercises) {
    const total = exercises.length;
    const completed = exercises.filter((ex) => isExerciseCompleted(ex.slug)).length;
    if (progressText) progressText.textContent = completed + ' / ' + total + ' concluídos';
    if (progressFill) {
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      progressFill.style.width = pct + '%';
    }
    if (progressBar) {
      progressBar.setAttribute('aria-valuenow', total > 0 ? Math.round((completed / total) * 100) : 0);
      progressBar.setAttribute('aria-valuemax', 100);
    }
  }

  function renderList(allExercises) {
    const filtered = applyExercisesFilters(allExercises, state);
    updateProgress(allExercises);
    if (filtered.length === 0) {
      container.innerHTML = '<p class="iss-text-muted">Nenhum exercício corresponde aos filtros.</p>';
      return;
    }
    container.innerHTML = filtered.map((ex) => ExerciseCard(ex, { forListingPage: true, selectedConcepts: state.selectedConcepts })).join('');

    if (conceptFiltersEl) {
      conceptFiltersEl.querySelectorAll('button[data-concept]').forEach((b) => {
        b.classList.toggle('iss-tag--active', state.selectedConcepts.has(b.getAttribute('data-concept')));
      });
    }
    if (difficultyFiltersEl) {
      difficultyFiltersEl.querySelectorAll('button[data-difficulty]').forEach((b) => {
        b.classList.toggle('iss-tag--active', (b.getAttribute('data-difficulty') || '') === state.difficultyFilter);
      });
    }
    if (resolveFiltersEl) {
      resolveFiltersEl.querySelectorAll('button[data-resolve]').forEach((b) => {
        b.classList.toggle('iss-tag--active', (b.getAttribute('data-resolve') || '') === state.resolveFilter);
      });
    }

    container.querySelectorAll('.iss-tag[data-concept]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const c = btn.getAttribute('data-concept');
        if (state.selectedConcepts.has(c)) state.selectedConcepts.delete(c);
        else state.selectedConcepts.add(c);
        renderList(allExercises);
      });
    });
  }

  fetchExercises()
    .then((exercises) => {
      if (exercises.length === 0) {
        if (container) container.innerHTML = '<p class="iss-text-muted">Nenhum exercício disponível.</p>';
        return;
      }

      updatePracticeStats(exercises.length);

      if (conceptFiltersEl) {
        const concepts = getAllConcepts(exercises);
        const firstRow = concepts.slice(0, CONCEPTS_FIRST_ROW);
        const rest = concepts.slice(CONCEPTS_FIRST_ROW);
        const makeTag = (c) =>
          '<button type="button" class="iss-tag" data-concept="' + escapeHtml(c) + '">' + escapeHtml(c) + '</button>';
        const row1Html = firstRow.map(makeTag).join('');
        const restHtml = rest.map(makeTag).join('');
        conceptFiltersEl.innerHTML =
          '<div class="flex flex-wrap gap-1">' +
          row1Html +
          '</div>' +
          (rest.length > 0
            ? '<div id="exercises-concept-rest" class="iss-concept-filters-rest hidden flex flex-wrap gap-1 mt-1">' + restHtml + '</div>'
            : '');
        const toggleBtn = document.getElementById('exercises-concept-toggle');
        const restEl = document.getElementById('exercises-concept-rest');
        if (toggleBtn) {
          if (rest.length > 0) {
            toggleBtn.classList.remove('hidden');
            toggleBtn.textContent = 'Ver todos os conceitos';
            toggleBtn.addEventListener('click', function onToggle() {
              if (!restEl) return;
              const isHidden = restEl.classList.contains('hidden');
              restEl.classList.toggle('hidden', !isHidden);
              toggleBtn.textContent = isHidden ? 'Mostrar menos' : 'Ver todos os conceitos';
            });
          } else {
            toggleBtn.classList.add('hidden');
          }
        }
        conceptFiltersEl.querySelectorAll('button[data-concept]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const c = btn.getAttribute('data-concept');
            if (state.selectedConcepts.has(c)) state.selectedConcepts.delete(c);
            else state.selectedConcepts.add(c);
            conceptFiltersEl.querySelectorAll('button[data-concept]').forEach((b) => {
              b.classList.toggle('iss-tag--active', state.selectedConcepts.has(b.getAttribute('data-concept')));
            });
            renderList(exercises);
          });
        });
      }

      if (difficultyFiltersEl) {
        const opts = [
          { value: '', label: 'Todas' },
          { value: 'easy', label: 'Fácil' },
          { value: 'medium', label: 'Médio' },
          { value: 'hard', label: 'Difícil' },
        ];
        difficultyFiltersEl.innerHTML = opts
          .map(
            (o) =>
              '<button type="button" class="iss-tag' +
              (state.difficultyFilter === o.value ? ' iss-tag--active' : '') +
              '" data-difficulty="' +
              escapeHtml(o.value) +
              '">' +
              escapeHtml(o.label) +
              '</button>'
          )
          .join('');
        difficultyFiltersEl.querySelectorAll('button').forEach((btn) => {
          btn.addEventListener('click', () => {
            state.difficultyFilter = btn.getAttribute('data-difficulty') || '';
            difficultyFiltersEl.querySelectorAll('button').forEach((b) => {
              b.classList.toggle('iss-tag--active', (b.getAttribute('data-difficulty') || '') === state.difficultyFilter);
            });
            renderList(exercises);
          });
        });
      }

      if (resolveFiltersEl) {
        const opts = [
          { value: '', label: 'Todos' },
          { value: 'resolvidos', label: 'Resolvidos' },
          { value: 'nao-resolvidos', label: 'Não resolvidos' },
        ];
        resolveFiltersEl.innerHTML = opts
          .map(
            (o) =>
              '<button type="button" class="iss-tag' +
              (state.resolveFilter === o.value ? ' iss-tag--active' : '') +
              '" data-resolve="' +
              escapeHtml(o.value) +
              '">' +
              escapeHtml(o.label) +
              '</button>'
          )
          .join('');
        resolveFiltersEl.querySelectorAll('button').forEach((btn) => {
          btn.addEventListener('click', () => {
            state.resolveFilter = btn.getAttribute('data-resolve') || '';
            resolveFiltersEl.querySelectorAll('button').forEach((b) => {
              b.classList.toggle('iss-tag--active', (b.getAttribute('data-resolve') || '') === state.resolveFilter);
            });
            renderList(exercises);
          });
        });
      }

      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          state.selectedConcepts.clear();
          state.difficultyFilter = '';
          state.resolveFilter = '';
          conceptFiltersEl.querySelectorAll('button[data-concept]').forEach((b) => b.classList.remove('iss-tag--active'));
          if (difficultyFiltersEl) {
            difficultyFiltersEl.querySelectorAll('button').forEach((b) => {
              b.classList.toggle('iss-tag--active', (b.getAttribute('data-difficulty') || '') === '');
            });
          }
          if (resolveFiltersEl) {
            resolveFiltersEl.querySelectorAll('button').forEach((b) => {
              b.classList.toggle('iss-tag--active', (b.getAttribute('data-resolve') || '') === '');
            });
          }
          renderList(exercises);
        });
      }

      if (randomBtn) {
        randomBtn.addEventListener('click', () => {
          const filtered = applyExercisesFilters(exercises, state);
          if (filtered.length === 0) return;
          const unresolved = filtered.filter((ex) => !isExerciseCompleted(ex.slug));
          const pool = unresolved.length > 0 ? unresolved : filtered;
          const ex = pool[Math.floor(Math.random() * pool.length)];
          if (typeof Router !== 'undefined' && Router.navigateToExercise) Router.navigateToExercise(ex.slug);
          else window.location.href = 'exercise.html?slug=' + encodeURIComponent(ex.slug);
        });
      }

      renderList(exercises);
    })
    .catch((err) => {
      if (container) container.innerHTML = '<p class="text-red-600">Erro ao carregar exercícios.</p>';
      console.error(err);
    });
}

function initExercise() {
  const slug = typeof getParam === 'function' ? getParam('slug') : (new URLSearchParams(window.location.search).get('slug') || '');
  const titleEl = document.getElementById('exercise-title');
  const contentEl = document.getElementById('exercise-content');

  function showError(msg) {
    document.title = 'Exercício não encontrado — ISS';
    if (titleEl) titleEl.textContent = 'Exercício não encontrado';
    if (contentEl) contentEl.innerHTML = '<p class="iss-text-muted mb-4">' + escapeHtml(msg) + '</p><a href="exercises.html" class="iss-link hover:underline">Voltar aos exercícios</a>';
  }

  if (!slug) {
    showError('Slug do exercício em falta.');
    return;
  }

  Promise.all([fetchExercises(), Promise.resolve()])
    .then(([exercises]) => {
      const exercise = getExercise(exercises, slug);
      if (!exercise) {
        showError('Este exercício não existe.');
        return null;
      }
      return fetchExerciseMarkdown(exercise.file).then((raw) => ({ raw, exercise, exercises }));
    })
    .then((data) => {
      if (!data) return;
      const { raw, exercise, exercises } = data;
      const { frontmatter, body } = parseFrontmatter(raw);
      const { enunciado, solucaoCode } = parseExerciseBody(body);
      const enunciadoHtml = typeof renderBody === 'function' ? renderBody(enunciado) : escapeHtml(enunciado).replace(/\n/g, '<br>');
      renderExercisePage({
        frontmatter: { ...exercise, ...frontmatter },
        enunciadoHtml,
        solucaoCode,
        discipline: frontmatter.discipline || exercise.discipline,
        currentSlug: exercise.slug,
        allExercises: exercises || [],
      });
    })
    .catch(() => {
      showError('Erro ao carregar o exercício.');
    });
}
