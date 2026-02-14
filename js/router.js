/**
 * ISS — Router: leitura de parâmetros de URL e navegação (d=disciplina, a=aula).
 * Não quebra o histórico do navegador; usa location.href para navegação normal.
 */

(function (global) {
  'use strict';

  function getParam(name) {
    var params = new URLSearchParams(window.location.search);
    var value = params.get(name);
    return value !== null ? value : '';
  }

  function navigateToDisciplina(slug) {
    if (!slug) return;
    global.location.href = 'disciplina.html?d=' + encodeURIComponent(slug);
  }

  function navigateToAula(disciplinaSlug, aulaSlug) {
    if (!disciplinaSlug || !aulaSlug) return;
    global.location.href =
      'aula.html?d=' +
      encodeURIComponent(disciplinaSlug) +
      '&a=' +
      encodeURIComponent(aulaSlug);
  }

  function navigateHome() {
    global.location.href = 'index.html';
  }

  global.Router = {
    getParam: getParam,
    navigateToDisciplina: navigateToDisciplina,
    navigateToAula: navigateToAula,
    navigateHome: navigateHome,
  };
})(typeof window !== 'undefined' ? window : this);
