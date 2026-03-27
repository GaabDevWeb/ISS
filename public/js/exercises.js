/**
 * ISS — Exercícios práticos de programação: parse, cards, página, solução colapsável, copiar enunciado
 * Usa MINUTES_PER_EXERCISE de state.js quando disponível.
 */

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

function getExerciseCodeStorageKey(exerciseId) {
  return 'exercise_code_' + exerciseId;
}

function getStdinStorageKey(exerciseId) {
  return 'exercise_stdin_' + exerciseId;
}

function pagePath(fileName) {
  if (typeof Router !== 'undefined' && typeof Router.pagePath === 'function') return Router.pagePath(fileName);
  return fileName;
}

function homePath() {
  if (typeof Router !== 'undefined' && typeof Router.homePath === 'function') return Router.homePath();
  return 'index.html';
}

function formatTestValue(value) {
  if (typeof value === 'string') return '"' + value + '"';
  try {
    return JSON.stringify(value);
  } catch (_) {
    return String(value);
  }
}

function goToNextSessionExercise(sessionInfo) {
  if (!sessionInfo || !sessionInfo.slugs || sessionInfo.slugs.length === 0) return false;
  const nextIndex = sessionInfo.index + 1;
  try {
    sessionStorage.setItem('iss-session-index', String(nextIndex));
  } catch (_) {}
  if (nextIndex < sessionInfo.slugs.length) {
    window.location.href = pagePath('exercise.html') + '?slug=' + encodeURIComponent(sessionInfo.slugs[nextIndex]) + '&session=1';
  } else {
    try {
      sessionStorage.removeItem('iss-session-slugs');
      sessionStorage.removeItem('iss-session-index');
    } catch (_) {}
    window.location.href = pagePath('exercises.html') + '?session_done=1';
  }
  return true;
}

function ExerciseCard(exercise, options) {
  const concepts = getConceptsArray(exercise.concepts);
  const difficultyLabel = getDifficultyLabel(exercise.difficulty);
  const slug = encodeURIComponent(exercise.slug);
  const completed = typeof isExerciseCompleted === 'function' && isExerciseCompleted(exercise.slug);
  const forListingPage = options && options.forListingPage;
  const selectedConcepts = (options && options.selectedConcepts) || new Set();
  const highlightQ =
    options && options.searchHighlightQuery ? String(options.searchHighlightQuery) : '';
  function fmtLabel(s) {
    return highlightQ ? highlightSearchMatches(s, highlightQ) : escapeHtml(s);
  }
  const tagsHtml = concepts.length
    ? concepts
        .map(function (c) {
          const active = forListingPage && selectedConcepts.has(c);
          const inner = fmtLabel(c);
          if (forListingPage) {
            return (
              '<button type="button" class="iss-tag' +
              (active ? ' iss-tag--active' : '') +
              '" data-concept="' +
              escapeHtml(c) +
              '">' +
              inner +
              '</button>'
            );
          }
          return '<span class="iss-tag">' + inner + '</span>';
        })
        .join('')
    : '<span class="iss-text-muted">—</span>';
  const resolvedHtml = completed ? '<p class="text-sm iss-exercise-resolved mt-1 mb-0">✓ Resolvido</p>' : '';
  return (
    '<a href="' + pagePath('exercise.html') + '?slug=' + slug + '" class="iss-card block no-underline text-inherit">' +
    '<h3 class="font-semibold text-lg m-0">' + fmtLabel(exercise.title) + '</h3>' +
    '<p class="text-sm iss-text-muted mt-1 mb-0">Dificuldade: ' + fmtLabel(difficultyLabel) + '</p>' +
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

function renderInteractiveExercise(options) {
  const {
    frontmatter,
    slug,
    concepts,
    sessionInfo,
    markResolvedBtn,
  } = options || {};
  const root = document.getElementById('exercise-solution-wrap');
  if (!root) return;

  const starterCode = typeof frontmatter.starter_code === 'string' ? frontmatter.starter_code : '';
  const tests = Array.isArray(frontmatter.tests) ? frontmatter.tests : [];
  const hasValidTests = tests.length > 0;
  const codeStorageKey = getExerciseCodeStorageKey(slug);

  root.innerHTML =
    '<section id="iss-interactive-wrap" class="iss-interactive-wrap" aria-label="Editor de código">' +
      '<h2 class="text-lg font-semibold mb-2">Editor de código</h2>' +
      '<p id="iss-python-loader" class="text-sm iss-text-muted hidden">Carregando ambiente Python...</p>' +
      '<div id="iss-code-editor-container" class="iss-code-editor-container" aria-label="Editor Python"></div>' +
      '<div class="stdin-container">' +
        '<label for="stdin-input">Entrada (stdin)</label>' +
        '<textarea id="stdin-input" class="iss-stdin-input" placeholder="Um valor por linha ou separados por espaço. Ex.: 5 7 ou 5&#10;7" rows="3"></textarea>' +
      '</div>' +
      '<div class="iss-interactive-actions">' +
        '<button type="button" id="iss-run-code-btn" class="iss-exercise-action-btn">Executar código</button>' +
        '<button type="button" id="iss-verify-tests-btn" class="iss-exercise-action-btn">Verificar solução</button>' +
      '</div>' +
      '<section class="iss-output-section mt-4" aria-live="polite">' +
        '<h3 class="text-base font-semibold mb-2">Saída</h3>' +
        '<pre id="iss-python-output" class="iss-python-output">Pronto para executar.</pre>' +
      '</section>' +
      '<section class="iss-tests-section mt-4" aria-live="polite">' +
        '<h3 class="text-base font-semibold mb-2">Resultados dos testes</h3>' +
        '<div id="iss-tests-results" class="iss-tests-results iss-text-muted">Clique em \"Verificar solução\" para rodar os testes.</div>' +
      '</section>' +
      '<div id="iss-session-next-wrap" class="mt-4"></div>' +
    '</section>';

  if (typeof setCodeEditorStorageKey === 'function') setCodeEditorStorageKey(codeStorageKey);
  if (typeof initCodeEditor === 'function') {
    initCodeEditor(document.getElementById('iss-code-editor-container'), starterCode);
  }

  const stdinInput = document.getElementById('stdin-input');
  const stdinKey = getStdinStorageKey(slug);
  if (stdinInput) {
    try {
      var saved = localStorage.getItem(stdinKey);
      if (saved) stdinInput.value = saved;
    } catch (_) {}
    var stdinSaveTimer = null;
    function saveStdin() {
      try { localStorage.setItem(stdinKey, stdinInput.value); } catch (_) {}
    }
    stdinInput.addEventListener('blur', saveStdin);
    stdinInput.addEventListener('input', function () {
      if (stdinSaveTimer) clearTimeout(stdinSaveTimer);
      stdinSaveTimer = setTimeout(saveStdin, 400);
    });
  }

  const runBtn = document.getElementById('iss-run-code-btn');
  const verifyBtn = document.getElementById('iss-verify-tests-btn');
  const loaderEl = document.getElementById('iss-python-loader');
  const outputEl = document.getElementById('iss-python-output');
  const testsEl = document.getElementById('iss-tests-results');
  const sessionNextWrap = document.getElementById('iss-session-next-wrap');

  if (!hasValidTests && verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.title = 'Este exercício não possui testes válidos no frontmatter.';
    if (testsEl) testsEl.textContent = 'Sem testes configurados para este exercício.';
  }

  if (typeof setPyRunnerStatusCallback === 'function') {
    setPyRunnerStatusCallback(function (status) {
      if (!loaderEl) return;
      if (status) {
        loaderEl.textContent = status;
        loaderEl.classList.remove('hidden');
      } else {
        loaderEl.classList.add('hidden');
      }
    });
  }

  function setRunningState(isRunning) {
    if (runBtn) runBtn.disabled = isRunning;
    if (verifyBtn) verifyBtn.disabled = isRunning || !hasValidTests;
  }

  function markAsPassed() {
    if (typeof markExerciseCompleted === 'function' && slug) markExerciseCompleted(slug, concepts);
    if (markResolvedBtn) {
      markResolvedBtn.textContent = '✓ Resolvido';
      markResolvedBtn.disabled = true;
    }
    if (sessionInfo && sessionInfo.slugs && sessionInfo.slugs.length > 0 && sessionNextWrap) {
      sessionNextWrap.innerHTML = '<button type="button" id="iss-session-next-btn" class="iss-exercise-action-btn">Ir para próximo exercício da sessão</button>';
      const nextBtn = document.getElementById('iss-session-next-btn');
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          goToNextSessionExercise(sessionInfo);
        });
      }
    }
  }

  if (runBtn) {
    runBtn.addEventListener('click', async function () {
      if (typeof runPython !== 'function') return;
      setRunningState(true);
      if (outputEl) outputEl.textContent = 'Executando...';
      try {
        const code = typeof getEditorCode === 'function' ? getEditorCode() : '';
        const stdinEl = document.getElementById('stdin-input');
        const stdinRaw = stdinEl ? stdinEl.value : '';
        const stdinValues = stdinRaw.trim() ? stdinRaw.trim().split(/\s+/).filter(Boolean) : [];
        const result = await runPython(code, stdinValues);
        if (outputEl) {
          if (result.error) {
            outputEl.textContent = result.error;
          } else {
            outputEl.textContent = result.stdout || '(sem saída)';
          }
        }
      } finally {
        setRunningState(false);
      }
    });
  }

  if (verifyBtn) {
    verifyBtn.addEventListener('click', async function () {
      if (typeof runTests !== 'function') return;
      setRunningState(true);
      if (testsEl) testsEl.textContent = 'Executando testes...';
      try {
        const code = typeof getEditorCode === 'function' ? getEditorCode() : '';
        const result = await runTests(code, tests);
        if (result.error) {
          if (testsEl) {
            testsEl.innerHTML = '<p class="iss-test-item iss-test-item--failed">✖ Erro ao validar: ' + escapeHtml(String(result.error)) + '</p>';
          }
          return;
        }
        if (testsEl) {
          testsEl.innerHTML = (result.results || []).map(function (testItem, idx) {
            const testNumber = idx + 1;
            if (testItem.passed) {
              return '<p class="iss-test-item iss-test-item--passed">✔ Teste ' + testNumber + ' passou</p>';
            }
            return (
              '<div class="iss-test-item iss-test-item--failed">' +
                '<p class="m-0">✖ Teste ' + testNumber + ' falhou</p>' +
                '<p class="m-0 text-sm">Esperado: ' + escapeHtml(formatTestValue(testItem.expected)) + '</p>' +
                '<p class="m-0 text-sm">Recebido: ' + escapeHtml(formatTestValue(testItem.received)) + '</p>' +
              '</div>'
            );
          }).join('');
        }
        if (result.allPassed) markAsPassed();
      } finally {
        setRunningState(false);
      }
    });
  }
}

function renderExercisePage(data) {
  const { frontmatter, enunciadoHtml, solucaoCode, discipline, currentSlug, allExercises, exerciseOrigin, sessionInfo } = data || {};
  const slug = currentSlug || frontmatter.slug;
  const title = frontmatter.title || 'Exercício';
  const concepts = getConceptsArray(frontmatter.concepts);
  const difficultyLabel = getDifficultyLabel(frontmatter.difficulty);
  const lang = frontmatter.language || ((frontmatter.discipline || 'python').toLowerCase().includes('python') ? 'python' : 'plaintext');
  const isInteractive =
    frontmatter.editor === true ||
    String(frontmatter.editor || '').toLowerCase() === 'true' ||
    (Array.isArray(frontmatter.tests) && frontmatter.tests.length > 0 && (typeof frontmatter.starter_code === 'string' || frontmatter.starter_code != null));
  const exercises = Array.isArray(allExercises) ? allExercises : [];

  document.title = title + ' — ISS';

  const breadcrumbEl = document.getElementById('breadcrumb-exercise');
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML =
      '<button type="button" onclick="history.back()" class="iss-link-muted p-1 -ml-1 rounded hover:bg-black/5 dark:hover:bg-white/5 inline-flex items-center" aria-label="Voltar à página anterior" title="Voltar à página anterior">&lt;</button>' +
      '<a href="' + homePath() + '" class="iss-link-muted">Home</a>' +
      '<span class="iss-text-muted mx-1">/</span>' +
      '<a href="' + pagePath('exercises.html') + '" class="iss-link-muted">Exercícios de Programação</a>' +
      '<span class="iss-text-muted mx-1">/</span>' +
      '<span>' + escapeHtml(title) + '</span>';
    if (exerciseOrigin && exerciseOrigin.d && exerciseOrigin.a) {
      const aulaUrl = pagePath('aula.html') + '?d=' + encodeURIComponent(exerciseOrigin.d) + '&a=' + encodeURIComponent(exerciseOrigin.a);
      const exercisesUrl = pagePath('exercises.html') + '?d=' + encodeURIComponent(exerciseOrigin.d) + '&a=' + encodeURIComponent(exerciseOrigin.a);
      breadcrumbEl.insertAdjacentHTML('afterend',
        '<p class="text-sm mt-1 mb-2"><a href="' + aulaUrl + '" class="iss-link">Voltar à aula</a><span class="iss-text-muted mx-1">·</span><a href="' + exercisesUrl + '" class="iss-link">Exercícios desta aula</a></p>'
      );
    }
    if (sessionInfo && sessionInfo.slugs && sessionInfo.slugs.length > 0) {
      const k = sessionInfo.index + 1;
      const n = sessionInfo.slugs.length;
      breadcrumbEl.insertAdjacentHTML('afterend',
        '<div id="iss-session-bar" class="flex flex-wrap items-center justify-between gap-2 mt-2 mb-2 p-2 rounded border iss-border">' +
          '<span class="text-sm iss-text-muted">Sessão de treino: ' + k + ' de ' + n + '</span>' +
          '<button type="button" id="iss-end-session-btn" class="iss-exercise-action-btn text-sm py-1">Encerrar sessão</button>' +
        '</div>'
      );
    }
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

  const hints = (function () {
    const h = frontmatter.hint;
    const hs = frontmatter.hints;
    if (h) return [typeof h === 'string' ? h : String(h)];
    if (Array.isArray(hs)) return hs.map(function (x) { return String(x); });
    if (typeof hs === 'string') return hs.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    return [];
  })();

  const buttonsEl = document.getElementById('exercise-buttons');
  if (buttonsEl) {
    let buttonsHtml =
      '<button type="button" id="iss-copy-exercise-btn" class="iss-exercise-action-btn">Copiar exercício</button> ';
    if (hints.length > 0) {
      buttonsHtml += '<button type="button" id="iss-show-hint-btn" class="iss-exercise-action-btn">Ver dica</button> ';
    }
    if (!isInteractive) {
      buttonsHtml +=
        '<button type="button" id="iss-toggle-solution-btn" class="iss-exercise-action-btn">Mostrar solução</button> ';
    }
    buttonsHtml += '<button type="button" id="iss-mark-resolved-btn" class="iss-exercise-action-btn">' + (isInteractive ? 'Resolvido via testes' : 'Marcar como resolvido') + '</button>';
    buttonsEl.innerHTML = buttonsHtml;
  }
  if (hints.length > 0) {
    const hintWrap = document.createElement('div');
    hintWrap.id = 'iss-hint-wrap';
    hintWrap.className = 'hidden mt-3 p-3 rounded border iss-border bg-[var(--color-surface)]';
    hintWrap.setAttribute('aria-hidden', 'true');
    hintWrap.innerHTML = '<p id="iss-hint-text" class="m-0 text-sm iss-text-foreground"></p><button type="button" id="iss-next-hint-btn" class="iss-exercise-action-btn text-sm mt-2 hidden">Próxima dica</button>';
    buttonsEl.parentNode.insertBefore(hintWrap, buttonsEl.nextSibling);
    let hintIndex = 0;
    const hintTextEl = document.getElementById('iss-hint-text');
    const nextHintBtn = document.getElementById('iss-next-hint-btn');
    document.getElementById('iss-show-hint-btn').addEventListener('click', function () {
      hintWrap.classList.remove('hidden');
      hintWrap.setAttribute('aria-hidden', 'false');
      hintIndex = 0;
      hintTextEl.textContent = hints[0];
      nextHintBtn.classList.toggle('hidden', hints.length <= 1);
      if (hints.length > 1) nextHintBtn.textContent = 'Próxima dica';
    });
    if (nextHintBtn) {
      nextHintBtn.addEventListener('click', function () {
        hintIndex++;
        if (hintIndex < hints.length) {
          hintTextEl.textContent = hints[hintIndex];
          nextHintBtn.textContent = hintIndex < hints.length - 1 ? 'Próxima dica' : 'Fechar';
        } else {
          hintWrap.classList.add('hidden');
          hintWrap.setAttribute('aria-hidden', 'true');
        }
      });
    }
  }

  const enunciadoEl = document.getElementById('exercise-enunciado');
  if (enunciadoEl) {
    enunciadoEl.innerHTML = '<div class="iss-prose">' + enunciadoHtml + '</div>';
    if (typeof renderMermaidDiagrams === 'function') renderMermaidDiagrams(enunciadoEl);
  }

  const solutionWrap = document.getElementById('exercise-solution-wrap');
  if (solutionWrap) {
    if (!isInteractive) {
      solutionWrap.innerHTML =
        '<div id="iss-solution-confirm-wrap" class="iss-solution-confirm hidden" aria-hidden="true"></div>' +
        '<div id="exercise-solution-block" class="iss-exercise-solution hidden" aria-hidden="true">' +
        '<pre><code class="language-' + escapeHtml(lang) + '">' + escapeHtml(solucaoCode) + '</code></pre>' +
        '<button type="button" id="iss-hide-solution-btn" class="iss-exercise-action-btn mt-2">Esconder solução</button>' +
        '</div>';
    } else {
      solutionWrap.innerHTML = '';
    }
  }

  const navEl = document.getElementById('exercise-nav-prev-next');
  if (navEl && exercises.length > 0 && slug) {
    const idx = exercises.findIndex((ex) => ex.slug === slug);
    const prev = idx > 0 ? exercises[idx - 1] : null;
    const next = idx >= 0 && idx < exercises.length - 1 ? exercises[idx + 1] : null;
    let html = '';
    if (prev) {
      html += '<a href="' + pagePath('exercise.html') + '?slug=' + encodeURIComponent(prev.slug) + '" class="iss-link">← Exercício anterior</a>';
    } else {
      html += '<span class="iss-text-muted">← Exercício anterior</span>';
    }
    if (next) {
      html += '<a href="' + pagePath('exercise.html') + '?slug=' + encodeURIComponent(next.slug) + '" class="iss-link">Próximo exercício →</a>';
    } else {
      html += '<span class="iss-text-muted">Próximo exercício →</span>';
    }
    navEl.innerHTML = html;
  }

  const linkedLessons = (function () {
    const ll = frontmatter.linkedLessons;
    if (Array.isArray(ll)) return ll.filter(function (x) { return x && x.discipline && x.slug; });
    return [];
  })();

  const relatedWrap = document.getElementById('exercise-related-wrap');
  if (relatedWrap) {
    let html = '';
    if (linkedLessons.length > 0) {
      html += '<h2 class="text-lg font-semibold iss-text-foreground mb-2">Aula relacionada</h2><ul class="list-none p-0 m-0 mb-4">' +
        linkedLessons.map(function (l) {
          const url = pagePath('aula.html') + '?d=' + encodeURIComponent(l.discipline) + '&a=' + encodeURIComponent(l.slug);
          return '<li class="mb-1"><a href="' + url + '" class="iss-link">Ver aula: ' + escapeHtml(l.slug) + '</a></li>';
        }).join('') + '</ul>';
    }
    if (exercises.length > 0 && slug) {
      const related = getRelatedExercises(exercises, slug, concepts, 5);
      if (related.length > 0) {
        html += '<h2 class="text-lg font-semibold iss-text-foreground mb-2">Exercícios relacionados</h2>' +
          '<ul class="list-none p-0 m-0">' +
          related.map(function (ex) {
            return '<li class="mb-1"><a href="' + pagePath('exercise.html') + '?slug=' + encodeURIComponent(ex.slug) + '" class="iss-link">' + escapeHtml(ex.title) + '</a></li>';
          }).join('') + '</ul>';
      }
    }
    relatedWrap.innerHTML = html || '';
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
    if (isInteractive) {
      markResolvedBtn.disabled = true;
      markResolvedBtn.title = 'Exercícios interativos são concluídos ao passar nos testes.';
    }
    if (typeof isExerciseCompleted === 'function' && isExerciseCompleted(slug)) {
      markResolvedBtn.textContent = '✓ Resolvido';
      markResolvedBtn.disabled = true;
      markResolvedBtn.title = '';
    }
    markResolvedBtn.addEventListener('click', function () {
      if (isInteractive) return;
      markExerciseCompleted(slug, concepts);
      markResolvedBtn.textContent = '✓ Resolvido';
      markResolvedBtn.disabled = true;
      goToNextSessionExercise(sessionInfo);
    });
  }

  if (isInteractive) {
    renderInteractiveExercise({
      frontmatter: frontmatter,
      slug: slug,
      concepts: concepts,
      sessionInfo: sessionInfo,
      markResolvedBtn: markResolvedBtn,
    });
  }

  const endSessionBtn = document.getElementById('iss-end-session-btn');
  if (endSessionBtn) {
    endSessionBtn.addEventListener('click', function () {
      try {
        sessionStorage.removeItem('iss-session-slugs');
        sessionStorage.removeItem('iss-session-index');
      } catch (_) {}
      window.location.href = pagePath('exercises.html');
    });
  }

  const toggleBtn = document.getElementById('iss-toggle-solution-btn');
  const solutionBlock = document.getElementById('exercise-solution-block');
  const hideBtn = document.getElementById('iss-hide-solution-btn');
  const confirmWrap = document.getElementById('iss-solution-confirm-wrap');

  function showSolution() {
    if (!isInteractive && typeof markExerciseCompleted === 'function' && slug) markExerciseCompleted(slug, concepts);
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
    if (markResolvedBtn && !isInteractive) {
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

function normalizeForSearch(s) {
  if (s == null || s === '') return '';
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

function highlightSearchMatches(plainText, rawQuery) {
  const esc =
    typeof escapeHtml === 'function'
      ? escapeHtml
      : function (t) {
          return String(t)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
        };
  const q = normalizeForSearch(rawQuery || '');
  const text = plainText == null ? '' : String(plainText);
  if (!q) return esc(text);

  let textNorm = '';
  const normIndexToOrigStart = [];
  let utf16 = 0;
  for (const ch of text) {
    const piece = normalizeForSearch(ch);
    for (let j = 0; j < piece.length; j++) {
      normIndexToOrigStart.push(utf16);
    }
    textNorm += piece;
    utf16 += ch.length;
  }

  const normIntervals = [];
  let searchFrom = 0;
  const qLen = q.length;
  while (searchFrom <= textNorm.length - qLen) {
    const hit = textNorm.indexOf(q, searchFrom);
    if (hit === -1) break;
    normIntervals.push([hit, hit + qLen]);
    searchFrom = hit + qLen;
  }

  function normRangeToOrig(ns, ne) {
    const origStart = normIndexToOrigStart[ns];
    const origEnd = ne < normIndexToOrigStart.length ? normIndexToOrigStart[ne] : text.length;
    return [origStart, origEnd];
  }

  const origIntervals = normIntervals.map(function (iv) {
    return normRangeToOrig(iv[0], iv[1]);
  });

  origIntervals.sort(function (a, b) {
    return a[0] - b[0];
  });
  const merged = [];
  for (let i = 0; i < origIntervals.length; i++) {
    const cur = origIntervals[i];
    if (!merged.length) {
      merged.push([cur[0], cur[1]]);
      continue;
    }
    const last = merged[merged.length - 1];
    if (cur[0] <= last[1]) {
      last[1] = Math.max(last[1], cur[1]);
    } else {
      merged.push([cur[0], cur[1]]);
    }
  }

  let html = '';
  let last = 0;
  for (let m = 0; m < merged.length; m++) {
    const a = merged[m][0];
    const b = merged[m][1];
    if (a > last) html += esc(text.slice(last, a));
    html += '<mark class="iss-search-highlight">' + esc(text.slice(a, b)) + '</mark>';
    last = b;
  }
  if (last < text.length) html += esc(text.slice(last));
  return html;
}

function buildExerciseSearchHaystack(ex, enunciadoNorm) {
  const parts = [
    normalizeForSearch(ex.title),
    normalizeForSearch(ex.slug),
    normalizeForSearch(ex.difficulty),
    normalizeForSearch(getDifficultyLabel(ex.difficulty)),
  ];
  getConceptsArray(ex.concepts).forEach(function (c) {
    parts.push(normalizeForSearch(c));
  });
  if (enunciadoNorm) parts.push(enunciadoNorm);
  return parts.join('\n');
}

function applyExerciseSearchFilter(list, state, enunciadoMap) {
  const q = normalizeForSearch(state.searchQuery || '');
  if (!q) return list;
  return list.filter(function (ex) {
    const en = enunciadoMap && enunciadoMap.has(ex.slug) ? enunciadoMap.get(ex.slug) : '';
    return buildExerciseSearchHaystack(ex, en).indexOf(q) !== -1;
  });
}

function getFilteredExercisesForListing(allExercises, state, enunciadoMap) {
  return applyExerciseSearchFilter(applyExercisesFilters(allExercises, state), state, enunciadoMap);
}

const EXERCISE_ENUNCIADO_SEARCH_BATCH = 20;

function loadExerciseEnunciadosForSearch(exercises, enunciadoMap) {
  if (typeof fetchExerciseMarkdown !== 'function' || typeof parseFrontmatter !== 'function') {
    return Promise.resolve();
  }
  let i = 0;
  function nextBatch() {
    const slice = exercises.slice(i, i + EXERCISE_ENUNCIADO_SEARCH_BATCH);
    i += EXERCISE_ENUNCIADO_SEARCH_BATCH;
    return Promise.all(
      slice.map(function (ex) {
        return fetchExerciseMarkdown(ex.file)
          .then(function (raw) {
            if (!raw) return;
            const body = parseFrontmatter(raw).body || '';
            const enunciado = parseExerciseBody(body).enunciado || '';
            enunciadoMap.set(ex.slug, normalizeForSearch(enunciado));
          })
          .catch(function () {});
      })
    ).then(function () {
      if (i < exercises.length) return nextBatch();
    });
  }
  return nextBatch();
}

/**
 * Preenche a secção "Exercícios sugeridos para a aula atual" quando ?d=&a= estão na URL.
 * Usa concepts do frontmatter da aula e getRelatedExercises; fallback por conceitos (Fase 2 linkedExercises depois).
 */
function initExercisesForLesson(exercises) {
  const d = typeof getParam === 'function' ? getParam('d') : (new URLSearchParams(window.location.search).get('d') || '');
  const a = typeof getParam === 'function' ? getParam('a') : (new URLSearchParams(window.location.search).get('a') || '');
  if (!d || !a) return;

  const section = document.getElementById('exercises-for-lesson');
  const contentEl = document.getElementById('exercises-for-lesson-content');
  if (!section || !contentEl) return;

  if (typeof fetchLessons !== 'function' || typeof getLesson !== 'function' || typeof fetchLessonMarkdown !== 'function') return;

  fetchLessons()
    .then((lessons) => {
      const lesson = getLesson(lessons, d, a);
      if (!lesson) return null;
      return typeof fetchLessonMarkdown === 'function'
        ? fetchLessonMarkdown(d, lesson.file).then((raw) => ({ lesson, raw }))
        : null;
    })
    .then((data) => {
      if (!data || typeof parseFrontmatter !== 'function') return;
      const frontmatter = parseFrontmatter(data.raw).frontmatter || {};
      const concepts = getConceptsArray(frontmatter.concepts);
      if (concepts.length === 0) return;
      const suggested = getRelatedExercises(exercises, '', concepts, 10);
      if (suggested.length === 0) return;

      const aulaUrl = pagePath('aula.html') + '?d=' + encodeURIComponent(d) + '&a=' + encodeURIComponent(a);
      contentEl.innerHTML =
        '<h2 class="text-lg font-semibold iss-text-foreground mb-2">Exercícios sugeridos para a aula atual</h2>' +
        '<p class="text-sm iss-text-muted mb-3">' + (typeof escapeHtml === 'function' ? escapeHtml(data.lesson.title) : data.lesson.title) + '</p>' +
        '<ul class="list-none pl-0 mb-3">' +
        suggested.map(function (ex) {
          return '<li class="mb-1"><a href="' + pagePath('exercise.html') + '?slug=' + encodeURIComponent(ex.slug) + '&d=' + encodeURIComponent(d) + '&a=' + encodeURIComponent(a) + '" class="iss-link">' + (typeof escapeHtml === 'function' ? escapeHtml(ex.title) : ex.title) + '</a></li>';
        }).join('') +
        '</ul>' +
        '<a href="' + aulaUrl + '" class="iss-link text-sm">Abrir aula</a>';
      section.classList.remove('hidden');
    })
    .catch(function () {});
}

function initExercises(containerId) {
  const container = document.getElementById(containerId || 'exercises-list');
  if (!container) return;

  const getP = typeof getParam === 'function' ? getParam : function (name) { return new URLSearchParams(window.location.search).get(name) || ''; };
  const conceptFromUrl = getP('concept');
  const enunciadoSearchMap = new Map();
  const state = {
    selectedConcepts: new Set(conceptFromUrl ? [decodeURIComponent(conceptFromUrl)] : []),
    difficultyFilter: '',
    resolveFilter: '',
    searchQuery: '',
  };

  const searchInput = document.getElementById('exercises-search');
  const searchStatusEl = document.getElementById('exercises-search-enunciado-status');
  let searchDebounceTimer = null;

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
    const filtered = getFilteredExercisesForListing(allExercises, state, enunciadoSearchMap);
    updateProgress(allExercises);
    if (filtered.length === 0) {
      container.innerHTML = '<p class="iss-text-muted">Nenhum exercício corresponde aos filtros ou à pesquisa.</p>';
      return;
    }
    container.innerHTML = filtered
      .map((ex) =>
        ExerciseCard(ex, {
          forListingPage: true,
          selectedConcepts: state.selectedConcepts,
          searchHighlightQuery: state.searchQuery,
        })
      )
      .join('');

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
      initExercisesForLesson(exercises);

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
          state.searchQuery = '';
          if (searchInput) searchInput.value = '';
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

      if (searchInput) {
        searchInput.addEventListener('input', function () {
          if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
          searchDebounceTimer = setTimeout(function () {
            state.searchQuery = searchInput.value;
            renderList(exercises);
          }, 180);
        });
      }

      if (randomBtn) {
        randomBtn.addEventListener('click', () => {
          const filtered = getFilteredExercisesForListing(exercises, state, enunciadoSearchMap);
          if (filtered.length === 0) return;
          const unresolved = filtered.filter((ex) => !isExerciseCompleted(ex.slug));
          const pool = unresolved.length > 0 ? unresolved : filtered;
          const ex = pool[Math.floor(Math.random() * pool.length)];
          if (typeof Router !== 'undefined' && Router.navigateToExercise) Router.navigateToExercise(ex.slug);
          else window.location.href = pagePath('exercise.html') + '?slug=' + encodeURIComponent(ex.slug);
        });
      }

      window.__issAllExercises = exercises;
      window.__issRefreshExerciseList = function () { renderList(exercises); };

      renderList(exercises);

      if (searchStatusEl) {
        searchStatusEl.textContent = 'A incluir enunciados na pesquisa…';
        searchStatusEl.classList.remove('hidden');
      }
      loadExerciseEnunciadosForSearch(exercises, enunciadoSearchMap).then(function () {
        if (searchStatusEl) {
          searchStatusEl.classList.add('hidden');
          searchStatusEl.textContent = '';
        }
        renderList(exercises);
      });
    })
    .catch((err) => {
      if (container) container.innerHTML = '<p class="text-red-600">Erro ao carregar exercícios.</p>';
      console.error(err);
    });
}

function initExercise() {
  const getP = typeof getParam === 'function' ? getParam : function (name) { return new URLSearchParams(window.location.search).get(name) || ''; };
  const slug = getP('slug');
  const originD = getP('d');
  const originA = getP('a');
  if (originD && originA) {
    try {
      sessionStorage.setItem('iss-exercise-origin', JSON.stringify({ from: 'aula', d: originD, a: originA }));
    } catch (_) {}
  }
  let sessionInfo = null;
  const inSession = getP('session') === '1';
  if (inSession) {
    try {
      const raw = sessionStorage.getItem('iss-session-slugs');
      const idx = parseInt(sessionStorage.getItem('iss-session-index') || '0', 10);
      const slugs = raw ? JSON.parse(raw) : [];
      if (Array.isArray(slugs) && slugs.length > 0) sessionInfo = { slugs: slugs, index: idx };
    } catch (_) {}
  }
  const titleEl = document.getElementById('exercise-title');
  const contentEl = document.getElementById('exercise-content');

  function showError(msg) {
    document.title = 'Exercício não encontrado — ISS';
    if (titleEl) titleEl.textContent = 'Exercício não encontrado';
    if (contentEl) contentEl.innerHTML = '<p class="iss-text-muted mb-4">' + escapeHtml(msg) + '</p><a href="' + pagePath('exercises.html') + '" class="iss-link hover:underline">Voltar aos exercícios</a>';
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
      let exerciseOrigin = null;
      if (originD && originA) exerciseOrigin = { d: originD, a: originA };
      renderExercisePage({
        frontmatter: { ...exercise, ...frontmatter },
        enunciadoHtml,
        solucaoCode,
        discipline: frontmatter.discipline || exercise.discipline,
        currentSlug: exercise.slug,
        allExercises: exercises || [],
        exerciseOrigin: exerciseOrigin,
        sessionInfo: sessionInfo,
      });
      if (typeof openEditor === 'function') openEditor(exercise.slug);
    })
    .catch(() => {
      showError('Erro ao carregar o exercício.');
    });
}
