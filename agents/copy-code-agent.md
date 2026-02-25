# Copy Code Agent — Prompt Oficial

## Objetivo

Implementar botões de **"Copiar código"** em todos os blocos de código (`<pre><code>`) das páginas de aula do projeto ISS. Ao clicar, o código é copiado para a área de transferência e o botão exibe brevemente "Copiado!" como feedback visual.

---

## Contexto do projeto

- Aplicação web **estática** com **JavaScript vanilla** (sem framework, sem build step)
- Renderização **client-side**: Markdown é convertido para HTML no browser via **Marked.js**; syntax highlighting via **Highlight.js v11.9.0**
- Arquivos relevantes:
  - `js/markdown.js` — contém `highlightCodeBlocks(container)`, chamada em `renderAulaPage()` após injetar o HTML no DOM
  - `css/styles.css` — design tokens e estilos customizados
- Estilos atuais dos blocos de código (em `css/styles.css`):
  ```css
  .iss-prose pre {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1rem;
  }
  .iss-prose code { font-family: var(--font-mono); font-size: 0.9em; }
  .iss-prose pre code { background: none; padding: 0; }
  ```
- Design tokens relevantes:
  - `--color-surface: #27272a`
  - `--color-background: #1E1E1E`
  - `--color-foreground: #DADADA`
  - `--color-muted: #a1a1aa`
  - `--color-border: #3f3f46`
  - `--color-accent: #5B88B2`
  - `--color-accent-hover: #82AAE6`
  - `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif`
  - `--text-small: 0.875rem`
  - `--radius-sm: 4px`
  - `--radius-card: 8px`

---

## Arquivos a modificar

1. `js/markdown.js`
2. `css/styles.css`

Não criar novos arquivos. Não adicionar dependências externas.

---

## Implementação detalhada

### 1. `js/markdown.js` — Adicionar função `addCopyButtons(container)`

Criar a função abaixo e chamá-la em `renderAulaPage()`, **logo após** a chamada de `highlightCodeBlocks(contentEl)` (linha atual: `highlightCodeBlocks(contentEl);`).

```js
function addCopyButtons(container) {
  if (!container) return;
  container.querySelectorAll('pre').forEach((pre) => {
    const code = pre.querySelector('code');
    if (!code) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'iss-copy-btn';
    btn.setAttribute('aria-label', 'Copiar código');
    btn.textContent = 'Copiar';

    btn.addEventListener('click', () => {
      const text = code.innerText || code.textContent || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copiado!';
          btn.classList.add('iss-copy-btn--copied');
          setTimeout(() => {
            btn.textContent = 'Copiar';
            btn.classList.remove('iss-copy-btn--copied');
          }, 2000);
        }).catch(() => {
          btn.textContent = 'Erro';
          setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
        });
      }
    });

    pre.appendChild(btn);
  });
}
```

**Ponto de chamada em `renderAulaPage()`** — após o bloco de highlight existente:

```js
highlightCodeBlocks(contentEl);
addCopyButtons(contentEl);   // ← adicionar esta linha
ensureSectionIds(contentEl);
```

### 2. `css/styles.css` — Estilos do botão de cópia

Adicionar ao final do arquivo (após todos os estilos existentes):

```css
/* Botão de copiar código */
.iss-prose pre {
  position: relative; /* necessário para posicionar o botão */
}

.iss-copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.2rem 0.6rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--color-muted);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s, color 0.15s, border-color 0.15s;
  z-index: 1;
}

.iss-prose pre:hover .iss-copy-btn,
.iss-copy-btn:focus-visible {
  opacity: 1;
}

.iss-copy-btn:hover {
  color: var(--color-foreground);
  border-color: var(--color-muted);
}

.iss-copy-btn--copied {
  color: var(--color-accent);
  border-color: var(--color-accent);
  opacity: 1;
}
```

---

## Restrições e cuidados

- Não alterar nenhum comportamento existente de `highlightCodeBlocks()`, `ensureSectionIds()`, ou qualquer outra função de `js/markdown.js`
- O `position: relative` no `.iss-prose pre` deve ser adicionado **apenas** via CSS — não tocar no CSS já existente do `.iss-prose pre` no arquivo; adicionar uma segunda regra no bloco novo ao final do arquivo
- O botão deve ser o **último filho** do `<pre>` (`.appendChild`) para não interferir com a estrutura do highlight
- Usar `code.innerText || code.textContent` para capturar o texto — `innerText` respeita o whitespace visual, `textContent` é o fallback
- O botão fica invisível por padrão e aparece no hover do `<pre>` — evita poluição visual em aulas com muitos blocos de código
- Manter estilo de código existente: sem classes ES6, sem módulos (`import`/`export`), funções nomeadas, `const`/`let`

---

## Comportamento esperado

1. Cada bloco `<pre><code>` na aula exibe um botão "Copiar" discreto no canto superior direito, visível ao passar o mouse sobre o bloco
2. Ao clicar, o código completo do bloco é copiado para a área de transferência
3. O botão muda para "Copiado!" em azul (`--color-accent`) por 2 segundos e depois volta ao estado normal
4. Se a API de clipboard não estiver disponível ou falhar, o botão exibe "Erro" brevemente
5. O botão é acessível via teclado (`focus-visible` o torna visível sem mouse)
6. O comportamento funciona em todos os blocos de código de todas as aulas, pois `addCopyButtons()` é chamada sobre o `contentEl` a cada render
