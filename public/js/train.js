/**
 * ISS — Treino por conceitos fracos: lista conceitos com mais exercícios pendentes
 */

function getConceptsArray(concepts) {
  if (Array.isArray(concepts)) return concepts;
  if (typeof concepts === 'string') return concepts.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  return [];
}

function pagePath(fileName) {
  if (typeof Router !== 'undefined' && typeof Router.pagePath === 'function') return Router.pagePath(fileName);
  return fileName;
}

function initTrain() {
  const container = document.getElementById('train-concepts-list');
  if (!container) return;

  Promise.all([
    typeof fetchExercises === 'function' ? fetchExercises() : Promise.resolve([]),
  ])
    .then(function (result) {
      const exercises = Array.isArray(result[0]) ? result[0] : [];
      const completedSlugs = typeof getCompletedExerciseSlugs === 'function' ? getCompletedExerciseSlugs() : new Set();

      const conceptStats = {};
      exercises.forEach(function (ex) {
        const concepts = getConceptsArray(ex.concepts);
        concepts.forEach(function (c) {
          if (!c) return;
          if (!conceptStats[c]) conceptStats[c] = { total: 0, done: 0 };
          conceptStats[c].total++;
          if (completedSlugs.has(ex.slug)) conceptStats[c].done++;
        });
      });

      const weak = Object.keys(conceptStats)
        .map(function (c) {
          return { concept: c, total: conceptStats[c].total, done: conceptStats[c].done, pending: conceptStats[c].total - conceptStats[c].done };
        })
        .filter(function (x) { return x.pending > 0; })
        .sort(function (a, b) { return b.pending - a.pending; })
        .slice(0, 10);

      if (weak.length === 0) {
        container.innerHTML = '<p class="iss-text-muted">Nenhum conceito com exercícios pendentes. Parabéns!</p>';
        return;
      }

      container.innerHTML = weak.map(function (item) {
        const url = pagePath('exercises.html') + '?concept=' + encodeURIComponent(item.concept);
        return (
          '<a href="' + url + '" class="iss-card block no-underline text-inherit">' +
            '<h3 class="font-semibold text-lg m-0">' + (typeof escapeHtml === 'function' ? escapeHtml(item.concept) : item.concept) + '</h3>' +
            '<p class="text-sm iss-text-muted mt-1 mb-0">' + item.done + ' de ' + item.total + ' concluídos · ' + item.pending + ' pendentes</p>' +
            '<p class="text-sm iss-link mt-2 mb-0">Treinar este conceito →</p>' +
          '</a>'
        );
      }).join('');
    })
    .catch(function () {
      container.innerHTML = '<p class="iss-text-muted">Erro ao carregar dados.</p>';
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTrain);
} else {
  initTrain();
}
