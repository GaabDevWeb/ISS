(function () {
  var editorInstance = null;
  var fallbackTextarea = null;
  var saveTimer = null;
  var storageKey = '';
  var SAVE_DEBOUNCE_MS = 350;
  var THEME_STORAGE_KEY = 'iss_editor_theme';
  var defaultEditorOptions = {
    mode: 'python',
    theme: 'material-darker',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    autofocus: false,
    styleActiveLine: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-lint-gutter', 'iss-error-gutter'],
    extraKeys: {},
  };

  function safeSetItem(key, value) {
    if (!key) return;
    try {
      localStorage.setItem(key, value);
    } catch (_) {}
  }

  function safeGetItem(key) {
    if (!key) return '';
    try {
      return localStorage.getItem(key) || '';
    } catch (_) {
      return '';
    }
  }

  function scheduleSave() {
    if (!storageKey) return;
    if (saveTimer) window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(function () {
      safeSetItem(storageKey, getEditorCode());
    }, SAVE_DEBOUNCE_MS);
  }

  function getRestoredOrInitialCode(initialCode) {
    var saved = safeGetItem(storageKey);
    if (typeof saved === 'string' && saved.length > 0) return saved;
    return typeof initialCode === 'string' ? initialCode : '';
  }

  function destroyExistingEditor() {
    if (editorInstance && typeof editorInstance.toTextArea === 'function') {
      editorInstance.toTextArea();
    }
    editorInstance = null;
    fallbackTextarea = null;
  }

  function buildFallbackEditor(container, initialCode) {
    var textarea = document.createElement('textarea');
    textarea.className = 'iss-code-editor-fallback';
    textarea.spellcheck = false;
    textarea.value = getRestoredOrInitialCode(initialCode);
    textarea.addEventListener('input', scheduleSave);
    container.innerHTML = '';
    container.appendChild(textarea);
    fallbackTextarea = textarea;
  }

  var snippetMap = {
    'fori': 'for i in range(n):\n    ',
    'forrange': 'for i in range(start, stop):\n    ',
    'main': 'def main():\n    \n\nif __name__ == "__main__":\n    main()',
    'readint': 'n = int(input())\n',
    'readints': 'values = list(map(int, input().split()))\n',
  };

  function tryExpandSnippet(cm) {
    var cursor = cm.getCursor();
    var line = cm.getLine(cursor.line);
    var upToCursor = line.slice(0, cursor.ch);
    var match = upToCursor.match(/([A-Za-z_][A-Za-z0-9_]*)$/);
    if (!match) return window.CodeMirror.Pass;
    var trigger = match[1];
    var template = snippetMap[trigger];
    if (!template) return window.CodeMirror.Pass;
    var fromCh = cursor.ch - trigger.length;
    cm.replaceRange(template, { line: cursor.line, ch: fromCh }, cursor);
    return;
  }

  function collectIdentifiersFromCode(code) {
    var text = String(code || '');
    var matches = text.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) || [];
    var unique = {};
    var result = [];
    for (var i = 0; i < matches.length; i++) {
      var name = matches[i];
      if (!unique[name]) {
        unique[name] = true;
        result.push(name);
      }
    }
    return result;
  }

  function issPythonHint(cm) {
    var cur = cm.getCursor();
    var token = cm.getTokenAt(cur);
    var start = token.start;
    var end = cur.ch;
    var word = token.string.slice(0, end - start);

    var pythonKeywords = [
      'def', 'return', 'if', 'elif', 'else', 'for', 'while',
      'break', 'continue', 'pass', 'in', 'not', 'and', 'or',
      'True', 'False', 'None', 'import', 'from', 'as', 'class',
      'try', 'except', 'finally', 'raise', 'with', 'lambda',
      'range', 'len', 'input', 'print', 'list', 'dict', 'set',
      'int', 'float', 'str', 'bool', 'enumerate', 'zip', 'map',
    ];

    var identifiers = collectIdentifiersFromCode(cm.getValue());
    var allWords = pythonKeywords.concat(identifiers);

    var filtered = allWords.filter(function (w) {
      return !word || w.indexOf(word) === 0;
    }).sort();

    return {
      list: filtered.length ? filtered : allWords,
      from: window.CodeMirror.Pos(cur.line, start),
      to: window.CodeMirror.Pos(cur.line, end),
    };
  }

  function initCodeEditor(container, initialCode, options) {
    if (!container) return null;
    destroyExistingEditor();

    if (typeof window.CodeMirror === 'undefined') {
      buildFallbackEditor(container, initialCode);
      return null;
    }

    var textarea = document.createElement('textarea');
    textarea.value = getRestoredOrInitialCode(initialCode);
    container.innerHTML = '';
    container.appendChild(textarea);

    var mergedOptions = {};
    for (var key in defaultEditorOptions) {
      if (Object.prototype.hasOwnProperty.call(defaultEditorOptions, key)) {
        mergedOptions[key] = defaultEditorOptions[key];
      }
    }
    if (options && typeof options === 'object') {
      for (var optKey in options) {
        if (Object.prototype.hasOwnProperty.call(options, optKey)) {
          mergedOptions[optKey] = options[optKey];
        }
      }
    }

    if (typeof window.CodeMirror === 'function') {
      var existingExtraKeys = mergedOptions.extraKeys || {};

      existingExtraKeys['Ctrl-Space'] = function (cm) {
        if (cm.showHint) cm.showHint({ hint: issPythonHint });
      };

       existingExtraKeys['Ctrl-Enter'] = function () {
        var runBtn = document.getElementById('iss-panel-run-btn');
        if (runBtn) runBtn.click();
      };

      existingExtraKeys['Ctrl-Shift-Enter'] = function () {
        var verifyBtn = document.getElementById('iss-panel-verify-btn');
        if (verifyBtn) verifyBtn.click();
      };

      existingExtraKeys['Ctrl-S'] = function () {
        scheduleSave();
      };

      existingExtraKeys['Tab'] = function (cm) {
        var result = tryExpandSnippet(cm);
        if (result === window.CodeMirror.Pass) {
          cm.replaceSelection('    ');
        }
      };

      mergedOptions.extraKeys = existingExtraKeys;
    }

    var themeSelect = document.getElementById('iss-editor-theme');
    var storedTheme = safeGetItem(THEME_STORAGE_KEY) || mergedOptions.theme;
    if (themeSelect) {
      themeSelect.value = storedTheme;
      themeSelect.addEventListener('change', function () {
        var value = themeSelect.value || 'material-darker';
        safeSetItem(THEME_STORAGE_KEY, value);
        if (editorInstance) editorInstance.setOption('theme', value);
      });
    }
    mergedOptions.theme = storedTheme;

    editorInstance = window.CodeMirror.fromTextArea(textarea, mergedOptions);

    // Garante pelo menos 11 linhas lógicas no início
    try {
      var doc = editorInstance.getDoc();
      var minLines = 11;
      var currentLines = doc.lineCount();
      if (currentLines < minLines) {
        var extraLines = new Array(minLines - currentLines + 1).join('\n');
        doc.replaceRange(extraLines, { line: currentLines - 1, ch: doc.getLine(currentLines - 1).length });
      }
    } catch (_) {}

    var cursorLabel = document.getElementById('iss-editor-cursor-pos');
    if (cursorLabel) {
      editorInstance.on('cursorActivity', function (cm) {
        var pos = cm.getCursor();
        cursorLabel.textContent = 'Ln ' + (pos.line + 1) + ', Col ' + (pos.ch + 1);
      });
      var initialPos = editorInstance.getCursor();
      cursorLabel.textContent = 'Ln ' + (initialPos.line + 1) + ', Col ' + (initialPos.ch + 1);
    }

    editorInstance.on('change', scheduleSave);
    editorInstance.refresh();
    return editorInstance;
  }

  function getEditorCode() {
    if (editorInstance && typeof editorInstance.getValue === 'function') return editorInstance.getValue();
    if (fallbackTextarea) return fallbackTextarea.value || '';
    return '';
  }

  function setEditorCode(code) {
    var value = typeof code === 'string' ? code : '';
    if (editorInstance && typeof editorInstance.setValue === 'function') {
      editorInstance.setValue(value);
      return;
    }
    if (fallbackTextarea) fallbackTextarea.value = value;
  }

  function setCodeEditorStorageKey(key) {
    storageKey = typeof key === 'string' ? key : '';
  }

  function clearErrorHighlights() {
    if (!editorInstance) return;
    var doc = editorInstance.getDoc();
    var lineCount = doc.lineCount();
    for (var i = 0; i < lineCount; i++) {
      editorInstance.removeLineClass(i, 'background', 'iss-error-line');
      editorInstance.setGutterMarker(i, 'iss-error-gutter', null);
    }
  }

  function highlightErrorLine(lineNumber, message) {
    if (!editorInstance || typeof lineNumber !== 'number') return;
    var lineIndex = Math.max(0, lineNumber - 1);
    editorInstance.addLineClass(lineIndex, 'background', 'iss-error-line');
    var marker = document.createElement('div');
    marker.className = 'iss-error-gutter-marker';
    marker.title = String(message || 'Erro');
    marker.textContent = '●';
    editorInstance.setGutterMarker(lineIndex, 'iss-error-gutter', marker);
  }

  window.initCodeEditor = initCodeEditor;
  window.getEditorCode = getEditorCode;
  window.setEditorCode = setEditorCode;
  window.setCodeEditorStorageKey = setCodeEditorStorageKey;
  window.issPythonHint = issPythonHint;
  window.issClearErrorHighlights = clearErrorHighlights;
  window.issHighlightErrorLine = highlightErrorLine;
})();
