/**
 * ISS — Estatísticas do estudante: agregação de localStorage + Chart.js
 * Consome iss-read-lessons, iss-exercises-completed (com fallback para slugs antigos) e fetchDisciplines/fetchLessons/fetchExercises (content.js).
 */

(function () {
  const MINUTES_PER_EXERCISE = 4;

  const CHART_COLORS = {
    blue: '#3b82f6',
    emerald: '#10b981',
    amber: '#f59e0b',
  };

  const TEXT_COLOR = '#DADADA';
  const GRID_COLOR = 'rgba(161, 161, 170, 0.2)';

  function getActivityLast30Days() {
    const list = typeof getCompletedWithTimestamps === 'function' ? getCompletedWithTimestamps() : [];
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const counts = [];
    const labels = [];
    for (var i = 29; i >= 0; i--) {
      var d = new Date(now - i * oneDay);
      d.setHours(0, 0, 0, 0);
      var start = d.getTime();
      var end = start + oneDay;
      var count = list.filter(function (x) {
        if (x.timestamp == null) return false;
        return x.timestamp >= start && x.timestamp < end;
      }).length;
      counts.push(count);
      labels.push(d.getDate() + '/' + (d.getMonth() + 1));
    }
    return { labels: labels, data: counts };
  }

  function getDefaultChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: TEXT_COLOR },
        },
      },
    };
  }

  function resetStats() {
    if (!window.confirm('Tem certeza que deseja resetar todas as estatísticas? Aulas lidas e exercícios concluídos serão apagados.')) return;
    try {
      if (typeof resetAllStats === 'function') resetAllStats();
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  function init() {
    const readIds = typeof getReadLessonIds === 'function' ? getReadLessonIds() : new Set();
    const completedSlugs = typeof getCompletedExerciseSlugs === 'function' ? getCompletedExerciseSlugs() : new Set();
    const activity = getActivityLast30Days();

    Promise.all([
      typeof fetchDisciplines === 'function' ? fetchDisciplines() : Promise.resolve([]),
      typeof fetchLessons === 'function' ? fetchLessons() : Promise.resolve([]),
      typeof fetchExercises === 'function' ? fetchExercises() : Promise.resolve([]),
    ])
      .then(function (result) {
        var disciplines = result[0];
        var lessons = result[1];
        var exercises = result[2];
        disciplines = Array.isArray(disciplines) ? disciplines : [];
        lessons = Array.isArray(lessons) ? lessons : [];
        exercises = Array.isArray(exercises) ? exercises : [];

        var completedExercises = exercises.filter(function (ex) {
          return completedSlugs.has(ex.slug);
        });

        var difficultyCounts = { easy: 0, medium: 0, hard: 0 };
        completedExercises.forEach(function (ex) {
          var d = (ex.difficulty || '').toLowerCase();
          if (d in difficultyCounts) difficultyCounts[d]++;
        });

        var totalCompleted = difficultyCounts.easy + difficultyCounts.medium + difficultyCounts.hard;
        var diagnosisText = '';
        if (totalCompleted > 0) {
          if (difficultyCounts.hard / totalCompleted > 0.3) {
            diagnosisText = 'Diagnóstico: Mentalidade de Tubarão. Você encara desafios reais.';
          } else if (difficultyCounts.easy / totalCompleted > 0.8) {
            diagnosisText = 'Diagnóstico: Você está na zona de conforto. Tente exercícios Difíceis para evoluir.';
          }
        }

        var disciplineSlugs = disciplines.map(function (d) { return d.slug; });
        var disciplinesWithReadLesson = new Set();
        lessons.forEach(function (l) {
          var id = l.discipline + '_' + l.slug;
          if (readIds.has(id)) disciplinesWithReadLesson.add(l.discipline);
        });

        var linkedExercises = exercises.filter(function (ex) {
          return disciplinesWithReadLesson.has(ex.discipline);
        });
        var abandonedExercises = linkedExercises.filter(function (ex) {
          return !completedSlugs.has(ex.slug);
        });
        var totalLinked = linkedExercises.length;
        var abandonedCount = abandonedExercises.length;
        var abandonmentPct = totalLinked > 0 ? Math.round((abandonedCount / totalLinked) * 100) : 0;

        var totalTimeMinutes = completedExercises.length * MINUTES_PER_EXERCISE;

        var radarLabels = [];
        var radarLessonsPct = [];
        var radarExercisesPct = [];
        var funnelLabels = [];
        var funnelLessons = [];
        var funnelExercises = [];
        var retentionAlerts = [];
        var maiorLacunaDiscipline = null;
        var maiorLacunaGap = -1;

        disciplineSlugs.forEach(function (slug) {
          var d = typeof getDiscipline === 'function' ? getDiscipline(disciplines, slug) : disciplines.find(function (x) { return x.slug === slug; });
          var disciplineLessons = typeof getLessonsByDiscipline === 'function'
            ? getLessonsByDiscipline(lessons, slug)
            : lessons.filter(function (l) { return l.discipline === slug; });
          var disciplineExs = exercises.filter(function (e) { return e.discipline === slug; });

          var totalL = disciplineLessons.length;
          var readL = disciplineLessons.filter(function (l) { return readIds.has(l.discipline + '_' + l.slug); }).length;
          var totalE = disciplineExs.length;
          var doneE = disciplineExs.filter(function (e) { return completedSlugs.has(e.slug); }).length;

          var title = (d && d.title) || slug;
          radarLabels.push(title);
          radarLessonsPct.push(totalL > 0 ? Math.round((readL / totalL) * 100) : 0);
          radarExercisesPct.push(totalE > 0 ? Math.round((doneE / totalE) * 100) : 0);
          funnelLabels.push(title);
          funnelLessons.push(readL);
          funnelExercises.push(doneE);

          if (readL > 1.5 * doneE && readL > 0) {
            retentionAlerts.push({ title: title });
          }
          var gap = readL - doneE;
          if (gap > maiorLacunaGap) {
            maiorLacunaGap = gap;
            maiorLacunaDiscipline = d ? d.title : slug;
          }
        });

        var abandonmentEl = document.getElementById('stats-abandonment');
        if (abandonmentEl) {
          abandonmentEl.textContent = totalLinked === 0 ? 'N/A' : abandonmentPct + '% (' + abandonedCount + ' de ' + totalLinked + ')';
        }
        var totalTimeEl = document.getElementById('stats-total-time');
        if (totalTimeEl) {
          totalTimeEl.textContent = formatDurationMinutes(totalTimeMinutes);
        }

        var maiorLacunaEl = document.getElementById('stats-maior-lacuna');
        var maiorLacunaLabel = '';
        if (maiorLacunaEl) {
          if (maiorLacunaDiscipline != null && maiorLacunaGap > 0) {
            maiorLacunaLabel = maiorLacunaDiscipline + ' (' + maiorLacunaGap + ' aula' + (maiorLacunaGap !== 1 ? 's' : '') + ' lidas a mais que exercícios feitos)';
            maiorLacunaEl.textContent = maiorLacunaLabel;
          } else {
            maiorLacunaEl.textContent = 'Nenhuma lacuna identificada.';
          }
        }
        var emailSummaryBtn = document.getElementById('stats-email-summary-btn');
        if (emailSummaryBtn && typeof getWeeklySummaryText === 'function') {
          var summaryText = getWeeklySummaryText(maiorLacunaLabel || null);
          emailSummaryBtn.href = 'mailto:?subject=' + encodeURIComponent('Resumo ISS - semana') + '&body=' + encodeURIComponent(summaryText);
        }

        var diagnosisEl = document.getElementById('stats-diagnosis');
        if (diagnosisEl) {
          diagnosisEl.textContent = diagnosisText || '';
          diagnosisEl.style.display = diagnosisText ? '' : 'none';
        }

        var alertsContainer = document.getElementById('stats-retention-alerts');
        if (alertsContainer) {
          alertsContainer.innerHTML = '';
          retentionAlerts.forEach(function (a) {
            var badge = document.createElement('span');
            badge.className = 'inline-block px-3 py-1 rounded text-sm font-medium border border-amber-500 text-amber-500 bg-amber-500/10';
            badge.textContent = 'Dívida Prática Detectada em ' + a.title;
            alertsContainer.appendChild(badge);
          });
        }

        var resetBtn = document.getElementById('stats-reset-btn');
        if (resetBtn) resetBtn.addEventListener('click', resetStats);

        if (typeof runAchievementChecks === 'function') runAchievementChecks(exercises, lessons);
        var achievementsEl = document.getElementById('stats-achievements-grid');
        if (achievementsEl && typeof renderAchievementsSection === 'function' && typeof getAchievementsUnlocked === 'function') {
          achievementsEl.innerHTML = renderAchievementsSection(getAchievementsUnlocked());
        }

        var activityCtx = document.getElementById('chart-activity');
        if (activityCtx && typeof Chart !== 'undefined') {
          new Chart(activityCtx.getContext('2d'), {
            type: 'bar',
            data: {
              labels: activity.labels,
              datasets: [{
                label: 'Exercícios concluídos',
                data: activity.data,
                backgroundColor: CHART_COLORS.emerald,
              }],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { color: TEXT_COLOR } },
              },
              scales: {
                x: {
                  ticks: { color: TEXT_COLOR, maxRotation: 45 },
                  grid: { color: GRID_COLOR },
                },
                y: {
                  ticks: { color: TEXT_COLOR },
                  grid: { color: GRID_COLOR },
                  beginAtZero: true,
                  stepSize: 1,
                },
              },
            },
          });
        }

        var difficultyCtx = document.getElementById('chart-difficulty');
        if (difficultyCtx && typeof Chart !== 'undefined') {
          new Chart(difficultyCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
              labels: ['Fácil', 'Médio', 'Difícil'],
              datasets: [{
                data: [difficultyCounts.easy, difficultyCounts.medium, difficultyCounts.hard],
                backgroundColor: [CHART_COLORS.blue, CHART_COLORS.emerald, CHART_COLORS.amber],
                borderWidth: 0,
              }],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { color: TEXT_COLOR } },
              },
              cutout: '60%',
            },
          });
        }

        var radarCtx = document.getElementById('chart-radar');
        if (radarCtx && typeof Chart !== 'undefined') {
          new Chart(radarCtx.getContext('2d'), {
            type: 'radar',
            data: {
              labels: radarLabels,
              datasets: [
                {
                  label: '% aulas lidas',
                  data: radarLessonsPct,
                  backgroundColor: CHART_COLORS.blue + '33',
                  borderColor: CHART_COLORS.blue,
                  borderWidth: 2,
                  pointBackgroundColor: CHART_COLORS.blue,
                },
                {
                  label: '% exercícios feitos',
                  data: radarExercisesPct,
                  backgroundColor: CHART_COLORS.emerald + '33',
                  borderColor: CHART_COLORS.emerald,
                  borderWidth: 2,
                  pointBackgroundColor: CHART_COLORS.emerald,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { color: TEXT_COLOR } },
              },
              scales: {
                r: {
                  min: 0,
                  max: 100,
                  ticks: { color: TEXT_COLOR, backdropColor: 'transparent' },
                  grid: { color: GRID_COLOR },
                  pointLabels: { color: TEXT_COLOR },
                },
              },
            },
          });
        }

        var funnelCtx = document.getElementById('chart-funnel');
        if (funnelCtx && typeof Chart !== 'undefined') {
          new Chart(funnelCtx.getContext('2d'), {
            type: 'bar',
            data: {
              labels: funnelLabels,
              datasets: [
                {
                  label: 'Aulas lidas',
                  data: funnelLessons,
                  backgroundColor: CHART_COLORS.blue,
                },
                {
                  label: 'Exercícios feitos',
                  data: funnelExercises,
                  backgroundColor: CHART_COLORS.emerald,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { color: TEXT_COLOR } },
              },
              scales: {
                x: {
                  ticks: { color: TEXT_COLOR },
                  grid: { color: GRID_COLOR },
                },
                y: {
                  ticks: { color: TEXT_COLOR },
                  grid: { color: GRID_COLOR },
                  beginAtZero: true,
                },
              },
            },
          });
        }
      })
      .catch(function (err) {
        console.error('Stats init error:', err);
        var abandonmentEl = document.getElementById('stats-abandonment');
        if (abandonmentEl) abandonmentEl.textContent = 'Erro ao carregar';
        var totalTimeEl = document.getElementById('stats-total-time');
        if (totalTimeEl) totalTimeEl.textContent = '—';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
