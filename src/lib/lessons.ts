import { getCollection, type CollectionEntry } from 'astro:content';

export type Lesson = {
	id: string;
	title: string;
	href: string;
	stage: number;
	minutes: number;
};

/** Published lessons: pages with lesson data inside a stage folder, in curriculum order. */
export async function getLessons(): Promise<Lesson[]> {
	const entries = await getCollection(
		'docs',
		(entry: CollectionEntry<'docs'>) => entry.data.lesson && /^stage-\d\//.test(entry.id),
	);
	return entries
		.map((entry) => ({
			id: entry.data.lesson!.id,
			title: entry.data.title,
			href: `/${entry.id}/`,
			stage: Number(entry.id.slice('stage-'.length, entry.id.indexOf('/'))),
			minutes: entry.data.lesson!.minutes,
		}))
		.sort((a, b) => compareIds(a.id, b.id));
}

const compareIds = (a: string, b: string) => {
	const [aStage, aNum] = a.split('.').map(Number);
	const [bStage, bNum] = b.split('.').map(Number);
	return aStage - bStage || aNum - bNum;
};

/** "topics/db/queries.txt" → the matching page on docs.djangoproject.com. */
export function docsUrl(path: string, version: string) {
	const page = path.replace(/(index)?\.txt$/, '').replace(/\/?$/, '/');
	return `https://docs.djangoproject.com/en/${version}/${page}`;
}
