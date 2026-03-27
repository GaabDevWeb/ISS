(function () {
  var pyodideInstance = null;
  var pyodideLoadingPromise = null;
  var statusCallback = null;
  var PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js';

  function emitStatus(message) {
    if (typeof statusCallback === 'function') statusCallback(message);
  }

  function setPyRunnerStatusCallback(callback) {
    statusCallback = typeof callback === 'function' ? callback : null;
  }

  function ensurePyodideScript() {
    if (typeof window.loadPyodide === 'function') return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-iss-pyodide="1"]');
      if (existing) {
        existing.addEventListener('load', function () { resolve(); }, { once: true });
        existing.addEventListener('error', function () { reject(new Error('Falha ao carregar Pyodide.')); }, { once: true });
        return;
      }
      var script = document.createElement('script');
      script.src = PYODIDE_CDN;
      script.async = true;
      script.defer = true;
      script.setAttribute('data-iss-pyodide', '1');
      script.addEventListener('load', function () { resolve(); }, { once: true });
      script.addEventListener('error', function () { reject(new Error('Falha ao carregar Pyodide.')); }, { once: true });
      document.head.appendChild(script);
    });
  }

  async function getPyodide() {
    if (pyodideInstance) return pyodideInstance;
    if (pyodideLoadingPromise) return pyodideLoadingPromise;

    pyodideLoadingPromise = (async function () {
      emitStatus('Carregando ambiente Python...');
      await ensurePyodideScript();
      pyodideInstance = await window.loadPyodide({
        stdout: function () {},
        stderr: function () {},
      });
      emitStatus('');
      return pyodideInstance;
    })();

    try {
      return await pyodideLoadingPromise;
    } finally {
      pyodideLoadingPromise = null;
    }
  }

  function sanitizeError(error) {
    if (!error) return 'Erro desconhecido.';
    if (typeof error === 'string') return error;
    return error.message || String(error);
  }

  function getMainFunctionName(code) {
    var match = String(code || '').match(/^\s*def\s+([A-Za-z_]\w*)\s*\(/m);
    return match ? match[1] : '';
  }

  function normalizeTests(tests) {
    if (!Array.isArray(tests)) return [];
    return tests
      .map(function (test, index) {
        if (!test || typeof test !== 'object') return null;
        return {
          index: index,
          input: test.input,
          expected: test.expected,
        };
      })
      .filter(Boolean);
  }

  function parseStdinValues(stdinValues) {
    if (Array.isArray(stdinValues)) return stdinValues.map(String);
    if (stdinValues == null) return [];
    var raw = String(stdinValues).trim();
    if (!raw) return [];
    return raw.split(/\s+/).filter(Boolean);
  }

  async function runPython(code, stdinValues) {
    var stdinList = parseStdinValues(stdinValues);
    var pyodide = await getPyodide();
    try {
      var userCode = String(code || '');
      pyodide.globals.set('__iss_user_code', userCode);
      pyodide.globals.set('__iss_stdin_json', JSON.stringify(stdinList));
      var result = await pyodide.runPythonAsync(
        [
          'import io',
          'import json',
          'import traceback',
          'import builtins',
          'from contextlib import redirect_stdout, redirect_stderr',
          "_iss_orig_import = builtins.__import__",
          'def _iss_safe_import(name, globals=None, locals=None, fromlist=(), level=0):',
          "    if name in ('js', 'pyodide_js'):",
          "        raise ImportError('Import de módulos JS está bloqueado neste ambiente.')",
          '    return _iss_orig_import(name, globals, locals, fromlist, level)',
          'builtins.__import__ = _iss_safe_import',
          '__iss_stdin_list = json.loads(__iss_stdin_json) if __iss_stdin_json else []',
          '__iss_stdin_idx = [0]',
          'def _iss_input(prompt=""):',
          '    if __iss_stdin_idx[0] < len(__iss_stdin_list):',
          '        val = __iss_stdin_list[__iss_stdin_idx[0]]',
          '        __iss_stdin_idx[0] += 1',
          '        return val',
          '    return ""',
          'builtins.input = _iss_input',
          '_iss_out = io.StringIO()',
          '_iss_globals = {"__name__": "__main__"}',
          '_iss_error = ""',
          'try:',
          '    with redirect_stdout(_iss_out), redirect_stderr(_iss_out):',
          '        exec(__iss_user_code, _iss_globals, _iss_globals)',
          'except Exception:',
          '    _iss_error = traceback.format_exc()',
          'finally:',
          '    builtins.__import__ = _iss_orig_import',
          'json.dumps({"stdout": _iss_out.getvalue(), "error": _iss_error})',
        ].join('\n')
      );
      var out = JSON.parse(String(result || '{}'));
      return {
        stdout: out && typeof out.stdout === 'string' ? out.stdout : '',
        error: out && typeof out.error === 'string' ? out.error : '',
      };
    } catch (error) {
      return { stdout: '', error: sanitizeError(error) };
    } finally {
      pyodide.globals.delete('__iss_user_code');
      pyodide.globals.delete('__iss_stdin_json');
    }
  }

  async function runTests(code, tests) {
    var pyodide = await getPyodide();
    var normalized = normalizeTests(tests);
    if (normalized.length === 0) {
      return { allPassed: false, results: [], error: 'Nenhum teste válido encontrado para este exercício.' };
    }

    var functionName = getMainFunctionName(code);
    if (!functionName) {
      return { allPassed: false, results: [], error: 'Não foi encontrada nenhuma função Python para testar.' };
    }

    try {
      pyodide.globals.set('__iss_user_code', String(code || ''));
      pyodide.globals.set('__iss_tests_json', JSON.stringify(normalized));
      pyodide.globals.set('__iss_function_name', functionName);

      var result = await pyodide.runPythonAsync(
        [
          'import json',
          'import traceback',
          'import builtins',
          "_iss_orig_import = builtins.__import__",
          'def _iss_safe_import(name, globals=None, locals=None, fromlist=(), level=0):',
          "    if name in ('js', 'pyodide_js'):",
          "        raise ImportError('Import de módulos JS está bloqueado neste ambiente.')",
          '    return _iss_orig_import(name, globals, locals, fromlist, level)',
          'builtins.__import__ = _iss_safe_import',
          '_iss_globals = {"__name__": "__main__"}',
          '_iss_runtime_error = ""',
          '_iss_results = []',
          'try:',
          '    exec(__iss_user_code, _iss_globals, _iss_globals)',
          '    fn = _iss_globals.get(__iss_function_name)',
          '    if not callable(fn):',
          "        raise NameError(f'Função {__iss_function_name} não encontrada.')",
          '    tests = json.loads(__iss_tests_json)',
          '    for item in tests:',
          "        inp = item.get('input')",
          "        expected = item.get('expected')",
          '        if isinstance(inp, list):',
          '            received = fn(*inp)',
          '        else:',
          '            received = fn(inp)',
          '        passed = received == expected',
          "        _iss_results.append({'index': item.get('index', 0), 'passed': passed, 'expected': expected, 'received': received})",
          'except Exception:',
          '    _iss_runtime_error = traceback.format_exc()',
          'finally:',
          '    builtins.__import__ = _iss_orig_import',
          'json.dumps({"results": _iss_results, "runtimeError": _iss_runtime_error}, default=str)',
        ].join('\n')
      );
      var out = JSON.parse(String(result || '{}'));
      var results = out && Array.isArray(out.results) ? out.results : [];
      var runtimeError = out && out.runtimeError ? String(out.runtimeError) : '';
      return {
        allPassed: !runtimeError && results.length > 0 && results.every(function (r) { return !!r.passed; }),
        results: results,
        error: runtimeError,
      };
    } catch (error) {
      return { allPassed: false, results: [], error: sanitizeError(error) };
    } finally {
      pyodide.globals.delete('__iss_user_code');
      pyodide.globals.delete('__iss_tests_json');
      pyodide.globals.delete('__iss_function_name');
    }
  }

  window.runPython = runPython;
  window.runTests = runTests;
  window.setPyRunnerStatusCallback = setPyRunnerStatusCallback;
})();
