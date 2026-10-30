// Turns ```mermaid code fences into <pre class="mermaid">, which src/scripts/site.ts
// draws in the browser. Done before Expressive Code, so the fence isn't highlighted as code.
export function remarkMermaid() {
	return (tree, file) => {
		// Starlight marks every <pre> without a `dir` as LTR, which would reverse
		// mixed Arabic labels, so the diagram gets its page's direction explicitly.
		const path = (file.path ?? '').replaceAll('\\', '/');
		visit(tree, path.includes('/src/content/docs/en/') ? 'ltr' : 'rtl');
	};
}

function visit(node, dir) {
	if (!Array.isArray(node.children)) return;
	node.children = node.children.map((child) => {
		if (child.type === 'code' && child.lang === 'mermaid') {
			return {
				type: 'mermaid',
				data: {
					hName: 'pre',
					hProperties: { className: ['mermaid'], dir },
					hChildren: [{ type: 'text', value: child.value }],
				},
			};
		}
		visit(child, dir);
		return child;
	});
}
