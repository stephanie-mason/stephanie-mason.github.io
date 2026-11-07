// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      date: z.date(),
      tags: z.array(z.string())
    })
});
const projectsCollection = defineCollection({
  type: 'content',
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
  type: 'content',
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