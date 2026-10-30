import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Lesson pages: drives the lesson header and footer, and progress tracking.
				lesson: z
					.object({
						/** Curriculum number, e.g. "2.4". */
						id: z.string(),
						/** Time to read the lesson and do its exercises. */
						minutes: z.number().int().positive(),
						objectives: z.array(z.string()).default([]),
						/** Lesson ids to finish first, e.g. ["2.1", "2.3"]. */
						prerequisites: z.array(z.string()).default([]),
						/** Django docs files the lesson is based on, e.g. "topics/db/queries.txt". */
						docs: z.array(z.string()).default([]),
						django: z.string().default('6.1'),
					})
					.optional(),
				// Stage overview pages: shows the stage's progress bar.
				stage: z.number().int().min(0).max(4).optional(),
			}),
		}),
	}),
};
