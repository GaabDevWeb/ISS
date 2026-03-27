/**
 * ISS — Editor lateral (split screen) na lista de exercícios.
 * openEditor(slug) abre o painel; closeEditor() fecha e restaura a lista.
 */

(function () {
  function pagePath(fileName) {
    if (typeof Router !== 'undefined' && typeof Router.pagePath === 'function') return Router.pagePath(fileName);
    return fileName;
  }

  function closeEditor() {
    var layout = document.getElementById('app-layout');
    var exercisePanel = document.getElementById('exercise-panel');
    var exerciseContent = document.getElementById('exercise-panel-content');
    var editorPanel = document.getElementById('editor-panel');
    if (layout) layout.classList.remove('editor-open');
    if (exercisePanel) exercisePanel.classList.remove('has-editor-content');
    if (exerciseContent) {
      exerciseContent.innerHTML = '';
      exerciseContent.setAttribute('hidden', '');
    }
    if (editorPanel) editorPanel.innerHTML = '';
    if (typeof window.__issRefreshExerciseList === 'function') window.__issRefreshExerciseList();
  }

  function openEditor(slug) {
    if (!slug || typeof fetchExercises !== 'function' || typeof getExercise !== 'function' || typeof fetchExerciseMarkdown !== 'function') return;
    var layout = document.getElementById('app-layout');
    var exercisePanel = document.getElementById('exercise-panel');
    var exerciseContent = document.getElementById('exercise-panel-content');
    var editorPanel = document.getElementById('editor-panel');
    if (!layout || !editorPanel) return;

    if (exerciseContent) {
      exerciseContent.innerHTML = '<p class="iss-text-muted">A carregar…</p>';
      exerciseContent.removeAttribute('hidden');
      if (exercisePanel) exercisePanel.classList.add('has-editor-content');
    }
    layout.classList.add('editor-open');
    editorPanel.innerHTML = '<p class="iss-text-muted p-4">A carregar…</p>';

    fetchExercises()
      .then(function (exercises) {
        var exercise = getExercise(exercises, slug);
        if (!exercise) {
          if (exerciseContent) exerciseContent.innerHTML = '<p class="iss-text-muted">Exercício não encontrado.</p>';
          return null;
        }
        return fetchExerciseMarkdown(exercise.file).then(function (raw) {
          return { raw: raw, exercise: exercise, exercises: exercises };
        });
      })
      .then(function (data) {
        if (!data) return;
        var raw = data.raw;
        var exercise = data.exercise;
        var parsedFm = typeof parseFrontmatter === 'function' ? parseFrontmatter(raw) : { frontmatter: {}, body: raw };
        var frontmatter = parsedFm.frontmatter || {};
        var body = parsedFm.body || raw;
        var parsed = typeof parseExerciseBody === 'function' ? parseExerciseBody(body) : { enunciado: body, solucaoCode: '' };
        var enunciadoHtml = typeof renderBody === 'function' ? renderBody(parsed.enunciado) : (typeof escapeHtml === 'function' ? escapeHtml(parsed.enunciado).replace(/\n/g, '<br>') : parsed.enunciado);
        var merged = Object.assign({}, exercise, frontmatter);
        var title = merged.title || exercise.title || 'Exercício';
        var concepts = typeof getConceptsArray === 'function' ? getConceptsArray(merged.concepts) : [];
        var difficultyLabel = typeof getDifficultyLabel === 'function' ? getDifficultyLabel(merged.difficulty) : merged.difficulty || '—';
        var hints = merged.hint ? [merged.hint] : (Array.isArray(merged.hints) ? merged.hints : []);
        var linkedLessons = Array.isArray(merged.linkedLessons) ? merged.linkedLessons.filter(function (l) { return l && l.discipline && l.slug; }) : [];

        var conceptsHtml = concepts.length
          ? concepts.map(function (c) { return '<span class="iss-tag">' + (typeof escapeHtml === 'function' ? escapeHtml(c) : c) + '</span>'; }).join('')
          : '';
        var hintHtml = hints.length
          ? '<section class="mt-4 pt-4 border-t border-[var(--color-border)]"><h3 class="text-sm font-semibold iss-text-foreground mb-1">Dica</h3><p class="text-sm iss-text-muted m-0">' + (typeof escapeHtml === 'function' ? escapeHtml(hints[0]) : hints[0]) + '</p></section>'
          : '';
        var linkedHtml = linkedLessons.length
          ? '<section class="mt-4 pt-4 border-t border-[var(--color-border)]"><h3 class="text-sm font-semibold iss-text-foreground mb-2">Aula relacionada</h3><ul class="list-none p-0 m-0">' +
            linkedLessons.map(function (l) {
              var url = pagePath('aula.html') + '?d=' + encodeURIComponent(l.discipline) + '&a=' + encodeURIComponent(l.slug);
              return '<li class="mb-1"><a href="' + url + '" class="iss-link">' + (typeof escapeHtml === 'function' ? escapeHtml(l.slug) : l.slug) + '</a></li>';
            }).join('') + '</ul></section>'
          : '';

        if (exerciseContent) {
          exerciseContent.innerHTML =
            '<div class="exercise-panel-content">' +
              '<h1 class="text-xl font-bold iss-text-foreground mb-2">' + (typeof escapeHtml === 'function' ? escapeHtml(title) : title) + '</h1>' +
              '<p class="text-sm iss-text-muted mb-2">Dificuldade: ' + (typeof escapeHtml === 'function' ? escapeHtml(difficultyLabel) : difficultyLabel) + '</p>' +
              (conceptsHtml ? '<div class="iss-card-tags mb-4">' + conceptsHtml + '</div>' : '') +
              '<section class="iss-prose" aria-label="Enunciado">' + enunciadoHtml + '</section>' +
              hintHtml +
              linkedHtml +
            '</div>';
        }

        var starterCode = typeof merged.starter_code === 'string' ? merged.starter_code : '';
        var tests = Array.isArray(merged.tests) ? merged.tests : [];
        var codeStorageKey = typeof getExerciseCodeStorageKey === 'function' ? getExerciseCodeStorageKey(slug) : 'exercise_code_' + slug;

        editorPanel.innerHTML =
          '<div class="editor-panel__header">' +
            '<h2 class="text-lg font-semibold iss-text-foreground m-0">Editor de código</h2>' +
            '<div class="iss-interactive-actions mt-0">' +
              '<button type="button" id="iss-panel-run-btn" class="iss-exercise-action-btn">Executar código</button>' +
            '</div>' +
          '</div>' +
          '<div class="editor-panel__body">' +
            '<p id="iss-panel-python-loader" class="text-sm iss-text-muted hidden">Carregando ambiente Python...</p>' +
            '<div class="iss-code-editor-container" aria-label="Editor Python">' +
              '<div class="iss-editor-toolbar">' +
                '<div class="iss-editor-toolbar__left">' +
                  '<span class="iss-editor-toolbar__cursor" id="iss-editor-cursor-pos">Ln 1, Col 1</span>' +
                '</div>' +
                '<div class="iss-editor-toolbar__right">' +
                  '<label for="iss-editor-theme" class="sr-only">Tema do editor</label>' +
                  '<select id="iss-editor-theme" class="iss-editor-theme-select">' +
                    '<option value="material-darker">Material Darker</option>' +
                    '<option value="default">Default</option>' +
                  '</select>' +
                '</div>' +
              '</div>' +
              '<div id="iss-panel-code-editor-container"></div>' +
            '</div>' +
            '<div class="iss-io-grid">' +
              '<div class="stdin-container">' +
                '<label for="iss-panel-stdin-input">Entrada (stdin)</label>' +
                '<textarea id="iss-panel-stdin-input" class="iss-stdin-input" placeholder="Um valor por linha ou separados por espaço. Ex.: 5 7 ou 5&#10;7" rows="3"></textarea>' +
              '</div>' +
              '<section class="mt-4" aria-live="polite">' +
                '<div class="flex items-center justify-between mb-2">' +
                  '<h3 class="text-base font-semibold m-0">Saída</h3>' +
                  '<button type="button" id="iss-panel-clear-output-btn" class="iss-exercise-action-btn text-xs px-2 py-1">Limpar</button>' +
                '</div>' +
                '<pre id="iss-panel-output" class="iss-python-output">Pronto para executar.</pre>' +
              '</section>' +
            '</div>' +
          '</div>';

        if (typeof setCodeEditorStorageKey === 'function') setCodeEditorStorageKey(codeStorageKey);
        var container = document.getElementById('iss-panel-code-editor-container');
        if (container && typeof initCodeEditor === 'function') initCodeEditor(container, starterCode);

        var panelStdinEl = document.getElementById('iss-panel-stdin-input');
        var stdinKey = typeof getStdinStorageKey === 'function' ? getStdinStorageKey(slug) : 'exercise_stdin_' + slug;
        if (panelStdinEl) {
          try {
            var savedStdin = localStorage.getItem(stdinKey);
            if (savedStdin) panelStdinEl.value = savedStdin;
          } catch (_) {}
          var stdinSaveTimer = null;
          function saveStdin() {
            try { localStorage.setItem(stdinKey, panelStdinEl.value); } catch (_) {}
          }
          panelStdinEl.addEventListener('blur', saveStdin);
          panelStdinEl.addEventListener('input', function () {
            if (stdinSaveTimer) clearTimeout(stdinSaveTimer);
            stdinSaveTimer = setTimeout(saveStdin, 400);
          });
        }

        var runBtn = document.getElementById('iss-panel-run-btn');
        var loaderEl = document.getElementById('iss-panel-python-loader');
        var outputEl = document.getElementById('iss-panel-output');
        var clearOutputBtn = document.getElementById('iss-panel-clear-output-btn');

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
        }

        if (clearOutputBtn && outputEl) {
          clearOutputBtn.addEventListener('click', function () {
            outputEl.textContent = '';
          });
        }

        if (runBtn) {
          runBtn.addEventListener('click', async function () {
            if (typeof runPython !== 'function') return;
            setRunningState(true);
            if (outputEl) outputEl.textContent = 'Executando...';
            try {
              if (typeof issClearErrorHighlights === 'function') issClearErrorHighlights();
              var code = typeof getEditorCode === 'function' ? getEditorCode() : '';
              var stdinEl = document.getElementById('iss-panel-stdin-input');
              var stdinRaw = stdinEl ? stdinEl.value : '';
              var stdinValues = stdinRaw.trim() ? stdinRaw.trim().split(/\s+/).filter(Boolean) : [];
              var result = await runPython(code, stdinValues);
              if (outputEl) {
                if (result.error) outputEl.textContent = result.error;
                else outputEl.textContent = result.stdout || '(sem saída)';
              }
              if (result && result.error && typeof issHighlightErrorLine === 'function') {
                var match = result.error.match(/File \"<exec>\", line (\d+)/);
                if (match) {
                  var lineNum = parseInt(match[1], 10);
                  if (!isNaN(lineNum)) issHighlightErrorLine(lineNum, 'Erro de execução na linha ' + lineNum);
                }
              }
            } finally {
              setRunningState(false);
            }
          });
        }

        // testes automáticos foram removidos no painel de exercícios
      })
      .catch(function () {
        if (exerciseContent) exerciseContent.innerHTML = '<p class="iss-text-muted">Erro ao carregar o exercício.</p>';
        if (editorPanel) editorPanel.innerHTML = '';
        if (exercisePanel) exercisePanel.classList.remove('has-editor-content');
        if (layout) layout.classList.remove('editor-open');
      });
  }

  window.openEditor = openEditor;
  window.closeEditor = closeEditor;
})();
