import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blends = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blends' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    price: z.number(),
    weight: z.string(),
    ingredients: z.array(z.string()),
    effects: z.array(z.string()),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    buyUrl: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    time: z.string(),
    location: z.string(),
    capacity: z.number(),
    price: z.number(),
    description: z.string(),
    image: z.string().optional(),
    status: z.enum(['open', 'waitlist', 'closed']).default('open'),
  }),
});

export const collections = { blends, events };
