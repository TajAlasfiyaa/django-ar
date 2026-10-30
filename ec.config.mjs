// Code block options. Line numbers are off by default: turn them on for a block
// with `showLineNumbers`, so a lesson can say "in line 5". Long setup code can be
// folded with `collapse={1-8}`.
import { defineEcConfig } from '@astrojs/starlight/expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

export default defineEcConfig({
	plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
	defaultProps: {
		showLineNumbers: false,
	},
});
