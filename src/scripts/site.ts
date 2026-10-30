// Runs on every page: progress marks, the lesson footer, the reading bar, and diagrams.
import { countDone, getLast, isDone, normalize, setDone, setLast } from './progress';

/** A check mark next to finished lessons in the sidebar. */
function markSidebar() {
	for (const link of document.querySelectorAll<HTMLAnchorElement>('.sidebar-content a[href]')) {
		link.toggleAttribute('data-done', isDone(link.pathname));
	}
}

/** Progress bars on stage pages and on the home page. */
function progressBars() {
	for (const card of document.querySelectorAll<HTMLElement>('[data-progress-hrefs]')) {
		const hrefs: string[] = JSON.parse(card.dataset.progressHrefs ?? '[]');
		const done = countDone(hrefs);
		const count = card.querySelector('[data-progress-done]');
		const fill = card.querySelector<HTMLElement>('[data-progress-fill]');
		if (count) count.textContent = String(done);
		if (fill) fill.style.width = `${hrefs.length ? (done / hrefs.length) * 100 : 0}%`;
	}
}

/** "Continue where you left off" on the home page, once a lesson has been opened. */
function continueLearning() {
	const box = document.querySelector<HTMLElement>('[data-continue]');
	const last = getLast();
	if (!box || !last) return;
	const link = box.querySelector<HTMLAnchorElement>('[data-continue-link]')!;
	link.href = last.href;
	box.querySelector('[data-continue-title]')!.textContent = `${last.id} · ${last.title}`;
	box.hidden = false;
}

function lessonFooter() {
	const footer = document.querySelector<HTMLElement>('[data-lesson-path]');
	if (!footer) return;
	const href = footer.dataset.lessonPath!;
	const stageHrefs: string[] = JSON.parse(footer.dataset.stageHrefs ?? '[]');
	setLast({ href, id: footer.dataset.lessonId!, title: footer.dataset.lessonTitle! });

	const button = footer.querySelector<HTMLButtonElement>('.complete-btn')!;
	const label = footer.querySelector('[data-label]')!;
	const note = footer.querySelector('[data-note]')!;
	const status = document.querySelector<HTMLElement>('[data-lesson-status]');

	const render = (justFinished: boolean) => {
		const done = isDone(href);
		button.setAttribute('aria-pressed', String(done));
		label.textContent = done ? 'أكملت هذا الدرس' : 'علّم الدرس كمكتمل';
		if (status) status.hidden = !done;
		if (!justFinished) {
			note.textContent = '';
		} else if (stageHrefs.includes(normalize(href))) {
			const finished = countDone(stageHrefs);
			note.textContent =
				finished === stageHrefs.length
					? `أحسنت! أنهيت كل دروس المرحلة ${footer.dataset.stage}.`
					: `أحسنت! أكملت ${finished} من ${stageHrefs.length} في هذه المرحلة. واصل.`;
		} else {
			note.textContent = 'أحسنت! سُجّل الدرس كمكتمل.';
		}
	};

	button.addEventListener('click', () => {
		const done = !isDone(href);
		setDone(href, done);
		render(done);
	});
	render(false);
}

/** A thin bar under the header that fills as the reader scrolls through a lesson. */
function readingProgress() {
	const bar = document.querySelector<HTMLElement>('.reading-progress');
	const fill = bar?.querySelector<HTMLElement>('span');
	if (!bar || !fill) return;
	// Starlight's content column contains fixed elements, so the bar moves to <body>
	// to sit under the header across the full width.
	document.body.append(bar);
	const update = () => {
		const page = document.documentElement;
		const max = page.scrollHeight - page.clientHeight;
		fill.style.width = `${max > 0 ? Math.min(1, page.scrollTop / max) * 100 : 100}%`;
	};
	addEventListener('scroll', update, { passive: true });
	update();
}

/** Folds the navigation sidebar away on wide screens, for more reading room. */
function sidebarToggle() {
	const button = document.querySelector<HTMLButtonElement>('.sidebar-toggle');
	if (!button) return;
	document.body.append(button);
	const root = document.documentElement;
	const render = () => {
		const collapsed = root.hasAttribute('data-sidebar-collapsed');
		button.setAttribute('aria-pressed', String(collapsed));
		button.setAttribute('aria-label', collapsed ? 'إظهار القائمة الجانبية' : 'إخفاء القائمة الجانبية');
		button.title = button.getAttribute('aria-label')!;
	};
	button.addEventListener('click', () => {
		const collapsed = !root.hasAttribute('data-sidebar-collapsed');
		root.toggleAttribute('data-sidebar-collapsed', collapsed);
		try {
			localStorage.setItem('django-ar:sidebar', collapsed ? 'collapsed' : 'open');
		} catch {
			// Storage blocked: the choice lasts for this page only.
		}
		render();
	});
	render();
}

/** Draws ```mermaid blocks, in the site's colours, and redraws them when the theme changes. */
async function diagrams() {
	const nodes = [...document.querySelectorAll<HTMLElement>('pre.mermaid')];
	if (nodes.length === 0) return;
	const { default: mermaid } = await import('mermaid');
	for (const node of nodes) node.dataset.source = node.textContent ?? '';

	const draw = async () => {
		const css = getComputedStyle(document.documentElement);
		const color = (name: string) => css.getPropertyValue(name).trim();
		mermaid.initialize({
			startOnLoad: false,
			theme: 'base',
			fontFamily: "'IBM Plex Sans Arabic', sans-serif",
			flowchart: { nodeSpacing: 32, rankSpacing: 36, padding: 10 },
			themeVariables: {
				fontFamily: "'IBM Plex Sans Arabic', sans-serif",
				fontSize: '15px',
				background: color('--sl-color-bg'),
				primaryColor: color('--sl-color-accent-low'),
				primaryBorderColor: color('--sl-color-accent'),
				primaryTextColor: color('--sl-color-white'),
				secondaryColor: color('--sl-color-gray-6'),
				tertiaryColor: color('--sl-color-gray-6'),
				lineColor: color('--sl-color-gray-3'),
				textColor: color('--sl-color-white'),
				clusterBkg: color('--sl-color-gray-6'),
				clusterBorder: color('--sl-color-gray-5'),
				edgeLabelBackground: color('--sl-color-bg'),
			},
		});
		for (const node of nodes) {
			node.removeAttribute('data-processed');
			node.textContent = node.dataset.source ?? '';
		}
		await mermaid.run({ nodes });
	};

	await draw();
	new MutationObserver(draw).observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['data-theme'],
	});
}

const refresh = () => {
	markSidebar();
	progressBars();
	continueLearning();
};

document.addEventListener('progress-change', refresh);
refresh();
lessonFooter();
readingProgress();
sidebarToggle();
diagrams();
