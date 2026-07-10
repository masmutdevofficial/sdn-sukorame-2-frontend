import type { ContentStatus, CrudRepository } from '~/types/content'

export interface SitePage {
  id: string
  slug: string
  title: string
  eyebrow: string
  excerpt: string
  body: string
  image: string
  imageAlt: string
  status: ContentStatus
  updatedAt: string
}

export interface SitePageRepository extends CrudRepository<SitePage> {
  getBySlug(slug: string): Promise<SitePage | null>
}
