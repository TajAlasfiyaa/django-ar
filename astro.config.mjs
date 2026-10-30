// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBidiIsolate } from './src/plugins/rehype-bidi-isolate.mjs';
import { remarkMermaid } from './src/plugins/remark-mermaid.mjs';

// One sidebar group per curriculum stage; lessons are added to each folder as they're written.
const stage = (n, ar, en) => ({
	label: `المرحلة ${n} · ${ar}`,
	translations: { en: `Stage ${n} · ${en}` },
	items: [{ autogenerate: { directory: `stage-${n}` } }],
});

// https://astro.build/config
export default defineConfig({
	markdown: {
		// Smart quotes are off: curly quotes don't mirror, so they face the wrong way in Arabic.
		processor: unified({
			smartypants: false,
			remarkPlugins: [remarkMermaid],
			rehypePlugins: [rehypeBidiIsolate],
		}),
	},
	integrations: [
		starlight({
			title: { ar: 'Django بالعربي', en: 'Django in Arabic' },
			description: 'تعلّم Django من الصفر إلى الاحتراف، بالعربية ومجاناً.',
			locales: {
				root: { label: 'العربية', lang: 'ar', dir: 'rtl' },
				en: { label: 'English', lang: 'en' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/TajAlasfiyaa/django-ar' }],
			editLink: { baseUrl: 'https://github.com/TajAlasfiyaa/django-ar/edit/main/' },
			customCss: [
				'@fontsource/ibm-plex-sans-arabic/400.css',
				'@fontsource/ibm-plex-sans-arabic/500.css',
				'@fontsource/ibm-plex-sans-arabic/600.css',
				'@fontsource/ibm-plex-sans-arabic/700.css',
				'@fontsource/ibm-plex-mono/400.css',
				'@fontsource/ibm-plex-mono/600.css',
				'./src/styles/custom.css',
				'./src/styles/study.css',
			],
			head: [
				// Apply a folded sidebar before the page paints, so it doesn't flash open.
				{
					tag: 'script',
					content:
						"try{if(localStorage.getItem('django-ar:sidebar')==='collapsed')document.documentElement.setAttribute('data-sidebar-collapsed','')}catch{}",
				},
			],
			components: {
				PageTitle: './src/components/overrides/PageTitle.astro',
				MarkdownContent: './src/components/overrides/MarkdownContent.astro',
			},
			sidebar: [
				{
					label: 'ابدأ هنا',
					translations: { en: 'Start here' },
					items: [{ slug: 'about' }, { slug: 'writing-guide' }, { slug: 'lesson-demo' }],
				},
				stage(0, 'التمهيد', 'Foundations'),
				stage(1, 'مبتدئ', 'Beginner'),
				stage(2, 'متوسط', 'Intermediate'),
				stage(3, 'متقدم', 'Advanced'),
				stage(4, 'احتراف', 'Professional'),
			],
		}),
	],
});
