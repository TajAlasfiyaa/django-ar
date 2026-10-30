---
name: new-lesson
description: Write or revise a lesson for the Django بالعربي site, from its CURRICULUM.md row to a verified, built page. Use when asked to write lesson X.Y, continue a stage, or fix a lesson's content.
---

# Writing a lesson

Work through these steps in order. `AGENTS.md` has the project map and the pitfalls; this is the procedure.

## 1. Scope

- Find the lesson's row in `CURRICULUM.md`: id, title, what the student learns, and the docs files. Don't widen the scope; if something belongs to a later lesson, say so in one line and link forward.
- Read the stage's `src/content/docs/stage-N/index.md` and the lessons before this one in the same stage, so you build on what the student already saw and reuse the same models and examples (the jobs platform: `Company`, `Job`, `Tag`, ...).

## 2. Sources

- Make sure `.reference/django/docs/` exists (`npm run docs:fetch`).
- Read the listed docs files. They are long, so grep for the sections you need instead of reading them whole. Note new-in-6.x features (`.. versionadded::` / `.. versionchanged::`); the curriculum teaches the current way first.
- For lessons marked «مصدر خارجي» or «وثائق Python», use the official docs of that tool and name them in the lesson.

## 3. Write

- New file: `src/content/docs/stage-N/<english-kebab-slug>.mdx`. Copy the frontmatter shape and section rhythm from `stage-0/how-the-web-works.mdx` or `stage-2/n-plus-one.mdx`.
- Frontmatter: `sidebar.order` is the lesson's position in the stage. `lesson.minutes` is honest reading-plus-exercise time. `lesson.docs` lists the paths relative to `docs/` (e.g. `topics/db/queries.txt`). Objectives are 3 to 5 short verb-first lines.
- Follow every rule in `src/content/docs/writing-guide.mdx`. Explain each English term in Arabic at its first use (a `<Term def="...">` works well).
- Each lesson needs at least one picture of the mechanism (mermaid or an SVG in `src/assets/diagrams/`), one `<Exercise>` with `<Hint>` and `<Solution>`, one or two `<Quiz>`, and a `<Summary>`.
- Show real output. Run every command and code sample, and paste what it actually printed.

## 4. Prove it

- Add `verify/lessons/test_<id with underscores>_<slug>.py` (e.g. `test_2_4_n_plus_one.py`). Assert every Django behaviour the lesson states: query counts, return values, error messages, setting defaults. If the lesson adds model fields, add them to `verify/jobs/models.py` too.
- Run `python verify/runtests.py lessons.test_<...>` and then the full suite. A failing test means the lesson is wrong, not the test.

## 5. Publish

- Link the lesson in its stage `index.md` table: `[title](/stage-N/slug/)`.
- `npm run build` must pass. Then look at the page in the dev server: narrow width (375px), light and dark themes, diagrams readable, nothing overflowing.
- Report to the user: what the lesson covers, what you verified and how, and anything you could not verify.
