// Lesson progress, kept in the reader's browser. Nothing leaves the device.

const KEY = 'django-ar:progress';

export type LastLesson = { href: string; id: string; title: string };
type State = { done: Record<string, number>; last?: LastLesson };

/** Same key for /stage-2/x/ and its English fallback /en/stage-2/x/. */
export const normalize = (href: string) => href.replace(/^\/en\//, '/').replace(/\/?$/, '/');

function load(): State {
	try {
		const state = JSON.parse(localStorage.getItem(KEY) ?? '{}');
		return { done: state.done ?? {}, last: state.last };
	} catch {
		return { done: {} };
	}
}

function save(state: State) {
	try {
		localStorage.setItem(KEY, JSON.stringify(state));
	} catch {
		// Private mode or blocked storage: progress just isn't remembered.
	}
}

export const isDone = (href: string) => Boolean(load().done[normalize(href)]);

export function setDone(href: string, done: boolean) {
	const state = load();
	if (done) state.done[normalize(href)] = Date.now();
	else delete state.done[normalize(href)];
	save(state);
	document.dispatchEvent(new CustomEvent('progress-change'));
}

export const countDone = (hrefs: string[]) => hrefs.filter(isDone).length;

export function setLast(last: LastLesson) {
	const state = load();
	state.last = { ...last, href: normalize(last.href) };
	save(state);
}

export const getLast = () => load().last;
