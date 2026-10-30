// Wraps runs of Latin text inside Arabic pages in <bdi>, so the browser keeps
// phrases like "Django 6.2 LTS" or "Python 3.12+" in the order they were written.
// Without it, a number at the start of an English phrase jumps to the other side.

// Elements whose text is already LTR or must not be touched.
const SKIP = new Set([
	'pre',
	'code',
	'kbd',
	'samp',
	'var',
	'bdi',
	'bdo',
	'script',
	'style',
	'svg',
	'math',
	'textarea',
]);

// A token starts with a letter or digit and ends with one (or with + or #, as in
// "3.12+" or "C#"), so a sentence's closing period stays outside the isolate.
// A trailing "()" stays with its name, as in "Job.objects.all()".
const TOKEN = String.raw`[A-Za-z0-9](?:[A-Za-z0-9_.\-+#/':]*[A-Za-z0-9+#])?(?:\(\))?`;
const RUN = new RegExp(`${TOKEN}(?: ${TOKEN})*`, 'g');
const HAS_LETTER = /[A-Za-z]/;

/** Splits text into plain parts and Latin runs that need isolating. */
export function splitLatinRuns(value) {
	const parts = [];
	let last = 0;
	for (const match of value.matchAll(RUN)) {
		// Plain numbers ("2026", "3") already display correctly.
		if (!HAS_LETTER.test(match[0])) continue;
		if (match.index > last) parts.push({ text: value.slice(last, match.index), latin: false });
		parts.push({ text: match[0], latin: true });
		last = match.index + match[0].length;
	}
	if (last < value.length) parts.push({ text: value.slice(last), latin: false });
	return parts;
}

const escapeHtml = (text) =>
	text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/** The same isolation for text rendered by components, such as titles and lesson goals. */
export function bidiHtml(value) {
	return splitLatinRuns(value)
		.map(({ text, latin }) => (latin ? `<bdi>${escapeHtml(text)}</bdi>` : escapeHtml(text)))
		.join('');
}

export function rehypeBidiIsolate() {
	return (tree, file) => {
		const path = (file.path ?? '').replaceAll('\\', '/');
		// Only the Arabic pages: everything in the docs collection except /en/.
		if (!path.includes('/src/content/docs/') || path.includes('/src/content/docs/en/')) return;
		walk(tree);
	};
}

function walk(node) {
	if (!Array.isArray(node.children)) return;
	const children = [];
	for (const child of node.children) {
		if (child.type === 'text') {
			children.push(...isolate(child.value));
			continue;
		}
		// In MDX, inline HTML such as <kbd> arrives as an mdxJsx node with a `name`.
		const tag = child.type === 'element' ? child.tagName : child.name;
		const skip = SKIP.has(tag) || Boolean(child.properties?.dir);
		if (!skip) walk(child);
		children.push(child);
	}
	node.children = children;
}

function isolate(value) {
	return splitLatinRuns(value).map(({ text, latin }) =>
		latin
			? { type: 'element', tagName: 'bdi', properties: {}, children: [{ type: 'text', value: text }] }
			: { type: 'text', value: text },
	);
}
