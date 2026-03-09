/**
 * ISS — Conquistas (badges): definição e desbloqueio
 */

var ACHIEVEMENTS_LIST = [
  {
    id: 'first_exercise',
    name: 'Primeiro passo',
    description: 'Completou o primeiro exercício',
    check: function () {
      var completed = typeof getCompletedExerciseSlugs === 'function' ? getCompletedExerciseSlugs() : new Set();
      return completed.size >= 1;
    },
  },
  {
    id: 'first_10_exercises',
    name: 'Dez exercícios',
    description: 'Completou 10 exercícios',
    check: function () {
      var completed = typeof getCompletedExerciseSlugs === 'function' ? getCompletedExerciseSlugs() : new Set();
      return completed.size >= 10;
    },
  },
  {
    id: 'first_hard_exercise',
    name: 'Desafio difícil',
    description: 'Completou pelo menos um exercício difícil',
    check: function () {
      if (typeof getCompletedExerciseSlugs !== 'function' || typeof fetchExercises !== 'function') return false;
      var slugs = getCompletedExerciseSlugs();
      return window.__achievementsExercises && window.__achievementsExercises.some(function (ex) {
        return slugs.has(ex.slug) && (ex.difficulty || '').toLowerCase() === 'hard';
      });
    },
  },
  {
    id: 'streak_5',
    name: 'Sequência de 5',
    description: '5 dias seguidos com atividade',
    check: function () {
      return typeof getStreak === 'function' && getStreak() >= 5;
    },
  },
  {
    id: 'half_lessons',
    name: 'Metade das aulas',
    description: 'Leu pelo menos metade das aulas de uma disciplina',
    check: function () {
      if (typeof getReadLessonIds !== 'function' || !window.__achievementsLessonsByDiscipline) return false;
      var readIds = getReadLessonIds();
      var byDiscipline = window.__achievementsLessonsByDiscipline;
      for (var d in byDiscipline) {
        var total = byDiscipline[d].length;
        var read = byDiscipline[d].filter(function (l) { return readIds.has(l.discipline + '_' + l.slug); }).length;
        if (total > 0 && read >= Math.ceil(total / 2)) return true;
      }
      return false;
    },
  },
];

function runAchievementChecks(exercises, lessons) {
  if (exercises) window.__achievementsExercises = exercises;
  if (lessons) {
    var byDiscipline = {};
    lessons.forEach(function (l) {
      if (!byDiscipline[l.discipline]) byDiscipline[l.discipline] = [];
      byDiscipline[l.discipline].push(l);
    });
    window.__achievementsLessonsByDiscipline = byDiscipline;
  }
  ACHIEVEMENTS_LIST.forEach(function (a) {
    try {
      if (a.check() && typeof unlockAchievement === 'function') unlockAchievement(a.id);
    } catch (_) {}
  });
}

function renderAchievementsSection(unlockedIds) {
  var ids = (unlockedIds || []).slice();
  return ACHIEVEMENTS_LIST.map(function (a) {
    var unlocked = ids.indexOf(a.id) !== -1;
    return (
      '<div class="rounded-lg border p-3 ' + (unlocked ? 'iss-border' : 'opacity-60') + '">' +
        '<h4 class="text-sm font-semibold m-0">' + (unlocked ? a.name : '???') + '</h4>' +
        '<p class="text-xs iss-text-muted mt-1 mb-0">' + (unlocked ? a.description : 'Conquista bloqueada') + '</p>' +
      '</div>'
    );
  }).join('');
}
