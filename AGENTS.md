# Django بالعربي: notes for AI agents

A free Arabic site that teaches Django 6.1 to people who already know Python, from a first project to production. Lessons are written in Arabic; code, identifiers and technical terms stay in English. Built with Astro 7 + Starlight.

Read this file before doing anything; it saves you from rediscovering the project.

## Sources of truth

| What | Where |
| --- | --- |
| Which lessons exist, their order, scope and docs files | `CURRICULUM.md` |
| Writing rules and every lesson component, with examples | `src/content/docs/writing-guide.mdx` |
| Complete example lessons to copy the structure from | `stage-0/how-the-web-works.mdx` (short, conceptual), `stage-2/n-plus-one.mdx` (code-heavy) |
| Facts about Django | `.reference/django/docs/` (official docs, branch `stable/6.1.x`). Run `npm run docs:fetch` if it is missing. Never state Django behaviour from memory. |
| Proof that a lesson's claims are true | `verify/lessons/test_<id>_<slug>.py`, run against the Django version pinned in `verify/requirements.txt` |

## Commands

```bash
npm install
npm run docs:fetch                      # Django docs into .reference/django/docs (gitignored)
npm run dev                             # http://localhost:4321 (astro dev --background also works)
npm run build                           # must pass before any PR
python -m venv .venv && .venv/bin/pip install -r verify/requirements.txt   # Windows: .venv\Scripts\pip
python verify/runtests.py               # all lesson checks; or pass lessons.test_2_4_n_plus_one
```

## Layout

- `src/content/docs/stage-N/`: one folder per stage. `index.md` is the stage overview with the lesson table; each lesson is an `.mdx` file with an English kebab-case slug.
- `src/content/docs/en/`: English pages (home and about only for now). Missing English pages fall back to Arabic.
- `src/content.config.ts`: the `lesson` frontmatter schema (`id`, `minutes`, `objectives`, `prerequisites`, `docs`, `django`) and `stage`.
- `src/components/study/`: `Exercise`, `Hint`, `Solution`, `Quiz`, `Summary`, `Term`, `Figure`. Import them from `~/components/study`.
- `src/components/lesson/` and `src/components/overrides/`: the lesson header, footer and progress bar, built from frontmatter. Lessons don't write these by hand.
- `src/plugins/`: `rehype-bidi-isolate.mjs` wraps Latin runs in Arabic pages in `<bdi>`; `remark-mermaid.mjs` turns mermaid fences into client-rendered diagrams.
- `src/assets/diagrams/`: hand-drawn SVG diagrams. They use the `dg-*` classes from `src/styles/study.css` so they follow light and dark mode.
- `verify/`: Django test project. `jobs/models.py` holds the jobs-platform models as the lessons show them.

## Writing a lesson

Follow `CONTRIBUTING.md` step by step. Claude Code users can run the `new-lesson` skill. In short: take the row from `CURRICULUM.md`, read the listed docs files, write the lesson in the style of the existing ones, prove every Django claim in `verify/lessons/`, link the lesson in its stage `index.md`, then build.

## Things that will bite you

- Arabic text: write English words plainly inside Arabic sentences, without `<bdi>` or `dir` markup; the rehype plugin isolates them. Use «» quotes (smart quotes are off because curly quotes don't mirror). Keep a keyboard shortcut in one tag: `<kbd>Ctrl+C</kbd>`. Use Western digits.
- Numbers and outputs in a lesson must come from running the code, not from memory. If the lesson says "11 queries", a test in `verify/` asserts 11.
- Astro 7 uses its own Markdown processor by default. Remark/rehype plugins are registered through `markdown.processor: unified({...})` in `astro.config.mjs`.
- Restart the dev server after changing `astro.config.mjs`, `ec.config.mjs` or anything in `src/plugins/`; it keeps the old config otherwise.
- Starlight sidebar groups need `items: [{ autogenerate: { directory } }]`; `autogenerate` with a group label was removed.
- Mermaid in Arabic pages renders right-to-left. In a `sequenceDiagram`, declare the participant that should appear on the left first. Prefer `flowchart TD` for long chains; `RL` and `LR` shrink to unreadable sizes.
- Code blocks, inline code, `FileTree` and code-like content are forced LTR by `src/styles/custom.css`; don't add direction markup to them.
- If you run Python from a folder that contains a `django/` directory (for example a Django source checkout), use `python -I` so the checkout doesn't shadow the installed Django.
- Check rendering at 375px width and in both light and dark themes; tables and SVG figures are the usual overflow culprits.
