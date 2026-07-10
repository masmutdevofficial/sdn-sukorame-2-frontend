import type { ContentItem, CrudRepository } from '~/types/content'
export interface ContentRepository extends CrudRepository<ContentItem> { getBySlug(slug:string):Promise<ContentItem|null> }
