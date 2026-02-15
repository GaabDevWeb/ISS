Plano Completo: 16 Features para Plataforma de Estudo

Estrutura de Dados em localStorage

Todas as features usarão uma estrutura centralizada de dados armazenada em localStorage:

// Estrutura principal (src/js/storage.js)
{
  progress: {
    "disciplina-id/aula-slug": {
      completed: true/false,
      completedAt: timestamp,
      timeSpent: seconds,
      lastAccessed: timestamp
    }
  },
  notes: {
    "disciplina-id/aula-slug": [
      {
        id: uuid,
        section: "h2-id",
        text: "nota do usuário",
        createdAt: timestamp
      }
    ]
  },
  highlights: {
    "disciplina-id/aula-slug": [
      {
        id: uuid,
        text: "texto destacado",
        section: "h2-id",
        createdAt: timestamp
      }
    ]
  },
  bookmarks: ["disciplina-id/aula-slug", ...],
  favorites: ["disciplina-id/aula-slug", ...],
  tags: {
    "disciplina-id/aula-slug": ["tag1", "tag2"]
  },
  quiz: {
    "disciplina-id/aula-slug": {
      questions: [...],
      answers: {...},
      score: number,
      completedAt: timestamp
    }
  },
  spacedRepetition: {
    "disciplina-id/aula-slug/concept-id": {
      nextReview: timestamp,
      interval: days,
      ease: number,
      reviews: number
    }
  },
  pomodoro: {
    sessions: [...],
    dailyGoal: minutes,
    currentStreak: days
  },
  settings: {
    theme: "dark" | "light",
    fontSize: "small" | "medium" | "large",
    readingMode: boolean,
    readingSpeed: number
  },
  searchHistory: [...],
  comments: {
    "disciplina-id/aula-slug": {
      "section-id": [
        {
          id: uuid,
          text: "comentário",
          author: "Anônimo",
          createdAt: timestamp,
          votes: number
        }
      ]
    }
  }
}



Feature 1: Sistema de Progresso e Rastreamento

Arquivos a criar/modificar:





src/js/storage.js - Sistema de armazenamento centralizado



src/js/features/progress.js - Lógica de progresso



src/js/pages/aula.js - Adicionar tracking de conclusão



src/js/pages/resumos.js - Mostrar barras de progresso



src/css/features/progress.css - Estilos para progresso



resumos.html - Adicionar elementos de progresso

Implementação:





Criar src/js/storage.js com funções helper para localStorage



Criar src/js/features/progress.js com:





markAsCompleted(disciplinaId, aulaSlug)



getProgress(disciplinaId)



getOverallProgress()



getTimeSpent(disciplinaId, aulaSlug)



Modificar aula.js para:





Detectar quando usuário chega ao final (scroll)



Botão "Marcar como concluída"



Salvar timestamp de conclusão



Modificar resumos.js para:





Mostrar barra de progresso por disciplina



Indicador visual de aulas concluídas



Contador "X de Y aulas concluídas"



Adicionar CSS para barras de progresso e badges

Dependências: Nenhuma (feature base)



Feature 2: Modo Escuro/Claro

Arquivos a criar/modificar:





src/js/features/theme.js - Gerenciamento de tema



src/css/features/theme.css - Variáveis CSS para temas



src/css/global.css - Adicionar variáveis de tema



Todas as páginas HTML - Adicionar toggle de tema



src/js/global.js - Adicionar helper de tema

Implementação:





Criar sistema de variáveis CSS para dark/light mode



Criar theme.js com:





initTheme() - Carrega preferência salva



toggleTheme() - Alterna entre temas



setTheme(theme) - Define tema específico



Adicionar toggle no navbar (ícone sol/lua)



Salvar preferência em localStorage



Aplicar tema imediatamente ao carregar (evitar flash)

Dependências: Nenhuma



Feature 3: Busca Full-Text

Arquivos a criar/modificar:





src/js/features/search.js - Motor de busca



src/css/features/search.css - Estilos da busca



src/js/pages/aula.js - Integração com busca



Todas as páginas HTML - Adicionar barra de busca



scripts/build-search-index.js - Gerar índice de busca (build time)

Implementação:





Criar script de build que gera índice JSON de todas as aulas:





Extrair texto de cada arquivo .md



Indexar por palavra-chave



Salvar em public/search-index.json



Criar search.js com:





searchIndex() - Carrega índice



search(query) - Busca no índice



highlightResults(text, query) - Destaca termos



Criar UI de busca:





Barra de busca no navbar



Modal/dropdown com resultados



Links diretos para seções específicas



Adicionar histórico de buscas em localStorage



Implementar busca em tempo real (debounce)

Dependências: Script de build (Node.js)



Feature 4: Notas e Anotações Pessoais

Arquivos a criar/modificar:





src/js/features/notes.js - Gerenciamento de notas



src/css/features/notes.css - Estilos de notas



src/js/pages/aula.js - Adicionar UI de notas



aula.html - Adicionar sidebar de notas

Implementação:





Criar notes.js com:





addNote(disciplinaId, aulaSlug, sectionId, text)



getNotes(disciplinaId, aulaSlug)



deleteNote(noteId)



updateNote(noteId, text)



Adicionar botão "Adicionar nota" em cada seção (h2/h3)



Criar sidebar de notas na página de aula



Permitir edição inline de notas



Adicionar exportação de notas (JSON/Markdown)



Implementar busca dentro das notas

Dependências: Feature 1 (storage.js)



Feature 5: Sistema de Destaques (Highlights)

Arquivos a criar/modificar:





src/js/features/highlights.js - Gerenciamento de destaques



src/css/features/highlights.css - Estilos de destaques



src/js/pages/aula.js - Integração com seleção de texto

Implementação:





Criar highlights.js com:





highlightText(disciplinaId, aulaSlug, text, sectionId)



getHighlights(disciplinaId, aulaSlug)



removeHighlight(highlightId)



Detectar seleção de texto no conteúdo



Adicionar botão "Destacar" ao selecionar texto



Aplicar estilo visual aos trechos destacados



Salvar posição exata do texto (usar Range API)



Restaurar destaques ao carregar página



Lista de destaques na sidebar

Dependências: Feature 1, Feature 4



Feature 6: Bookmarks e Favoritos

Arquivos a criar/modificar:





src/js/features/bookmarks.js - Gerenciamento de bookmarks



src/css/features/bookmarks.css - Estilos



src/js/pages/aula.js - Botão de bookmark



src/js/pages/resumos.js - Mostrar ícone de bookmark



bookmarks.html - Nova página de bookmarks

Implementação:





Criar bookmarks.js com:





addBookmark(disciplinaId, aulaSlug)



removeBookmark(disciplinaId, aulaSlug)



isBookmarked(disciplinaId, aulaSlug)



getAllBookmarks()



Adicionar botão de bookmark em cada aula



Criar página bookmarks.html listando todos os bookmarks



Adicionar filtros (por disciplina, data)



Permitir criar listas personalizadas de estudo



Adicionar tags personalizadas (Feature 8)

Dependências: Feature 1



Feature 7: Tags Personalizadas

Arquivos a criar/modificar:





src/js/features/tags.js - Gerenciamento de tags



src/css/features/tags.css - Estilos de tags



src/js/pages/aula.js - UI de tags



src/js/pages/resumos.js - Filtro por tags

Implementação:





Criar tags.js com:





addTag(disciplinaId, aulaSlug, tag)



removeTag(disciplinaId, aulaSlug, tag)



getTags(disciplinaId, aulaSlug)



getAllTags()



filterByTag(tag)



Adicionar input de tags na página de aula



Mostrar tags como chips/badges



Permitir autocomplete de tags existentes



Adicionar filtro por tags na página de resumos



Sugerir tags baseadas em conteúdo (opcional)

Dependências: Feature 1, Feature 6



Feature 8: Quiz e Exercícios

Arquivos a criar/modificar:





src/js/features/quiz.js - Sistema de quiz



src/css/features/quiz.css - Estilos de quiz



src/js/pages/aula.js - Adicionar quiz ao final



content/*/quiz-*.json - Arquivos de perguntas (opcional, ou gerar do markdown)

Implementação:





Criar estrutura de perguntas (pode ser extraída do markdown ou JSON separado)



Criar quiz.js com:





generateQuiz(disciplinaId, aulaSlug) - Gera perguntas do conteúdo



submitAnswer(questionId, answer)



getScore(disciplinaId, aulaSlug)



getQuizResults(disciplinaId, aulaSlug)



Adicionar seção de quiz ao final de cada aula



Tipos de perguntas:





Múltipla escolha



Verdadeiro/Falso



Preencher lacunas



Mostrar feedback imediato



Estatísticas de acertos/erros



Revisão de questões erradas

Dependências: Feature 1



Feature 9: Modo de Revisão Espaçada

Arquivos a criar/modificar:





src/js/features/spaced-repetition.js - Algoritmo SM-2



src/css/features/spaced-repetition.css - Estilos



src/js/pages/revisao.html - Nova página de revisão



revisao.html - Página de revisões pendentes

Implementação:





Implementar algoritmo SM-2 (Simplified) para revisão espaçada



Criar spaced-repetition.js com:





addConcept(disciplinaId, aulaSlug, conceptId, conceptText)



scheduleReview(conceptId, quality) - quality 0-5



getDueReviews() - Retorna conceitos para revisar hoje



calculateNextReview(conceptId, quality)



Extrair conceitos-chave automaticamente (h2, termos em negrito)



Criar página de revisão com cards flip



Sistema de confiança: Fácil/Médio/Difícil



Calendário de revisões



Notificações (usando Web Notifications API)

Dependências: Feature 1, Feature 8



Feature 10: Mapa Conceitual/Visualização

Arquivos a criar/modificar:





src/js/features/concept-map.js - Geração de mapa



src/css/features/concept-map.css - Estilos



src/js/pages/mapa.html - Nova página



mapa.html - Visualização do mapa



Biblioteca externa: D3.js ou vis.js (via CDN)

Implementação:





Analisar estrutura de aulas e extrair relações:





Pré-requisitos (do markdown)



Conceitos mencionados



Referências cruzadas



Criar grafo de nós e arestas



Usar D3.js ou vis.js para visualização interativa



Mostrar progresso visualmente (nós completos vs incompletos)



Permitir zoom e pan



Caminhos de aprendizado sugeridos



Filtros por disciplina

Dependências: Feature 1, Biblioteca externa (CDN)



Feature 11: Timer Pomodoro Integrado

Arquivos a criar/modificar:





src/js/features/pomodoro.js - Timer Pomodoro



src/css/features/pomodoro.css - Estilos



src/js/pages/aula.js - Integração com timer



Todas as páginas HTML - Widget de timer

Implementação:





Criar pomodoro.js com:





startTimer(minutes) - Inicia timer



pauseTimer() - Pausa



resetTimer() - Reseta



getSessionHistory() - Histórico de sessões



Widget flutuante de timer (canto da tela)



Notificações ao final do pomodoro



Estatísticas:





Tempo total estudado



Sessões completas



Streak diário



Metas diárias configuráveis



Integração com progresso (Feature 1)

Dependências: Feature 1, Web Notifications API



Feature 12: Resumo Automático de Conceitos-Chave

Arquivos a criar/modificar:





src/js/features/key-concepts.js - Extração de conceitos



src/css/features/key-concepts.css - Estilos



src/js/pages/aula.js - Mostrar conceitos-chave



scripts/extract-concepts.js - Script de build (opcional)

Implementação:





Extrair conceitos-chave do markdown:





Títulos (h2, h3)



Termos em negrito



Listas de definições



Primeira frase de cada seção



Criar key-concepts.js com:





extractConcepts(markdownText)



getConceptList(disciplinaId, aulaSlug)



Mostrar sidebar com conceitos-chave



Tooltips com definições rápidas



Glossário geral por disciplina



Links diretos para seções

Dependências: Nenhuma (pode usar marked.js já existente)



Feature 13: Modo de Leitura Otimizado

Arquivos a criar/modificar:





src/js/features/reading-mode.js - Modo de leitura



src/css/features/reading-mode.css - Estilos



src/js/pages/aula.js - Toggle de modo de leitura



src/css/global.css - Variáveis de tamanho de fonte

Implementação:





Criar reading-mode.js com:





enableReadingMode() - Ativa modo foco



setFontSize(size) - Ajusta tamanho



setReadingSpeed(wpm) - Velocidade de leitura



estimateReadingTime(text) - Calcula tempo



Modo foco:





Esconder navegação



Centralizar conteúdo



Destaque de linha atual (opcional)



Controles:





Tamanho de fonte (pequeno/médio/grande)



Velocidade de leitura configurável



Contador de palavras/tempo estimado



Modo apresentação (fullscreen)

Dependências: Feature 2 (tema)



Feature 14: Compartilhamento Inteligente

Arquivos a criar/modificar:





src/js/features/share.js - Sistema de compartilhamento



src/css/features/share.css - Estilos



src/js/pages/aula.js - Botões de compartilhamento



src/js/pages/aula.js - Detectar âncoras de seção

Implementação:





Criar share.js com:





shareSection(disciplinaId, aulaSlug, sectionId) - Gera link



copyToClipboard(text) - Copia link



generateQRCode(url) - Gera QR code



Adicionar IDs únicos a cada seção (h2, h3)



Botões de compartilhamento:





Copiar link da seção



Compartilhar trecho destacado



Gerar QR code



Usar Web Share API quando disponível



Exportar para PDF (usar window.print() ou jsPDF)



Links diretos funcionam (scroll automático para seção)

Dependências: Biblioteca QR (via CDN), jsPDF (opcional)



Feature 15: Comentários e Discussões

Arquivos a criar/modificar:





src/js/features/comments.js - Sistema de comentários



src/css/features/comments.css - Estilos



src/js/pages/aula.js - UI de comentários



aula.html - Seção de comentários

Implementação:





Criar comments.js com:





addComment(disciplinaId, aulaSlug, sectionId, text, author)



getComments(disciplinaId, aulaSlug, sectionId)



deleteComment(commentId)



voteComment(commentId, vote) - upvote/downvote



Permitir comentários por seção



Sistema de votos (útil/não útil)



Threads de respostas (comentários aninhados)



Moderação básica (reportar comentário)



Exportar comentários (opcional)

Dependências: Feature 1, Feature 4



Feature 16: PWA e Modo Offline

Arquivos a criar/modificar:





public/manifest.json - Manifest do PWA



public/sw.js - Service Worker



src/js/sw-register.js - Registro do SW



public/icons/ - Ícones do PWA (vários tamanhos)



Todas as páginas HTML - Adicionar meta tags

Implementação:





Criar manifest.json com:





Nome, descrição, ícones



Theme color



Display mode



Start URL



Criar Service Worker (sw.js):





Cache de assets estáticos



Cache de conteúdo Markdown



Estratégia: Cache First para assets, Network First para conteúdo



Atualização automática de cache



Registrar SW em todas as páginas



Criar ícones em vários tamanhos (192x192, 512x512)



Adicionar meta tags para iOS



Instruções de instalação

Dependências: Nenhuma (mas requer HTTPS no GitHub Pages)



Feature 17: Estatísticas e Analytics Pessoais (Bônus)

Arquivos a criar/modificar:





src/js/features/stats.js - Cálculo de estatísticas



src/css/features/stats.css - Estilos



src/js/pages/stats.html - Nova página



stats.html - Dashboard de estatísticas

Implementação:





Criar stats.js com:





calculateStats() - Calcula todas as estatísticas



getStudyStreak() - Dias consecutivos



getHeatmapData() - Dados para heatmap



Dashboard com:





Gráfico de progresso geral



Gráfico de tempo de estudo (Chart.js via CDN)



Heatmap de atividade (tipo GitHub)



Estatísticas por disciplina



Metas e conquistas



Exportar dados (JSON/CSV)

Dependências: Feature 1, Feature 11, Chart.js (CDN)



Ordem de Implementação Sugerida

Fase 1: Fundação (Essencial)





Feature 1: Sistema de Progresso



Feature 2: Modo Escuro/Claro



Feature 1 (storage.js): Sistema de armazenamento centralizado

Fase 2: Funcionalidades Básicas





Feature 4: Notas Pessoais



Feature 5: Destaques



Feature 6: Bookmarks



Feature 3: Busca Full-Text

Fase 3: Interatividade





Feature 8: Quiz



Feature 13: Modo de Leitura



Feature 11: Timer Pomodoro



Feature 12: Conceitos-Chave

Fase 4: Recursos Avançados





Feature 9: Revisão Espaçada



Feature 10: Mapa Conceitual



Feature 7: Tags



Feature 14: Compartilhamento

Fase 5: Social e PWA





Feature 15: Comentários



Feature 16: PWA/Offline



Feature 17: Estatísticas



Estrutura de Arquivos Final

src/
  js/
    storage.js (NOVO - sistema centralizado)
    features/
      progress.js
      theme.js
      search.js
      notes.js
      highlights.js
      bookmarks.js
      tags.js
      quiz.js
      spaced-repetition.js
      concept-map.js
      pomodoro.js
      key-concepts.js
      reading-mode.js
      share.js
      comments.js
      stats.js
    pages/
      aula.js (MODIFICADO)
      resumos.js (MODIFICADO)
      revisao.js (NOVO)
      mapa.js (NOVO)
      bookmarks.js (NOVO)
      stats.js (NOVO)
  css/
    features/
      progress.css
      theme.css
      search.css
      notes.css
      highlights.css
      bookmarks.css
      tags.css
      quiz.css
      spaced-repetition.css
      concept-map.css
      pomodoro.css
      key-concepts.css
      reading-mode.css
      share.css
      comments.css
      stats.css
public/
  manifest.json (NOVO)
  sw.js (NOVO)
  search-index.json (NOVO - gerado)
  icons/ (NOVO)
scripts/
  build-disciplinas.js (EXISTENTE)
  build-search-index.js (NOVO)
  extract-concepts.js (NOVO - opcional)



Considerações Técnicas





localStorage Limites: ~5-10MB por domínio. Implementar limpeza automática de dados antigos se necessário.



Performance:





Lazy loading de features



Debounce em buscas



Virtual scrolling para listas longas



Compatibilidade:





Verificar suporte a APIs (Clipboard, Notifications, Service Workers)



Fallbacks quando necessário



Acessibilidade:





ARIA labels em todos os componentes



Navegação por teclado



Contraste adequado



Bibliotecas Externas (via CDN):





marked.js (já existe)



D3.js ou vis.js (mapa conceitual)



Chart.js (estatísticas)



qrcode.js (QR codes)



jsPDF (exportação PDF - opcional)



Próximos Passos





Confirmar ordem de implementação



Decidir quais bibliotecas externas usar



Definir design system consistente



Criar testes básicos (se necessário)



Documentar APIs internas de cada feature

