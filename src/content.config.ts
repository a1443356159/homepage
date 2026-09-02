import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    page: z.string().optional(),
    fullTitle: z.string().optional(),
    venue: z.string().optional(),
    arxiv: z.string().optional(),
    authors: z.array(z.object({
      name: z.string(),
      affiliations: z.array(z.number().int().positive()).default([]),
    })).default([]),
    affiliations: z.array(z.string()).default([]),
    abstract: z.string().optional(),
    highlights: z.array(z.object({
      value: z.string(),
      label: z.string(),
      detail: z.string(),
    })).default([]),
    results: z.array(z.object({
      model: z.string(),
      method: z.string(),
      baselineGenEval: z.number(),
      resultGenEval: z.number(),
      baselineDpg: z.number(),
      resultDpg: z.number(),
    })).default([]),
    paper: z.string().optional(),
    code: z.string().optional(),
    demo: z.string().optional(),
    bibtex: z.string().optional(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    status: z.enum(['published', 'preprint', 'in-preparation']).default('in-preparation'),
    date: z.coerce.date(),
    paper: z.string().optional(),
    arxiv: z.string().optional(),
    code: z.string().optional(),
    bibtex: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, publications, posts };
