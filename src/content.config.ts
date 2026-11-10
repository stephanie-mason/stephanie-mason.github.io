// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
      title: z.string(),
      date: z.date(),
      tags: z.array(z.string())
    })
});
const projectsCollection = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    categories: z.array(z.string()),
    materials: z.array(z.string()),
    dimensions: z.string().optional(),
    cover: image(),
    cover_alt: z.string(),
    images: z.array(image()).optional(),
    image_alts: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional()
  })
});
const aceosCollection = defineCollection({
  loader: glob({ base: './src/content/aceos', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    categories: z.array(z.string()),
    materials: z.array(z.string()),
    cards: z.array(image()).optional(),
    card_alts: z.array(z.string()).optional(),
    images: z.array(image()).optional(),
    image_alts: z.array(z.string()).optional()
  })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  aceos: aceosCollection,
  posts: postsCollection,
  projects: projectsCollection,
};