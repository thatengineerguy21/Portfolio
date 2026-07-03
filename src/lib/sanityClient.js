import { createClient } from '@sanity/client'
import createImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // CDN = zero cold starts, cached globally
  apiVersion: '2024-01-01',
})

const builder = createImageUrlBuilder(client)

/**
 * Generate optimized image URLs from Sanity image references.
 * Usage: urlFor(project.image).width(800).url()
 */
export const urlFor = (source) => builder.image(source)
