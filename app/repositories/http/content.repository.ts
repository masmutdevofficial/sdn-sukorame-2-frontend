import type { ContentItem, ListQuery, PaginatedData } from '~/types/content'
import { apiRequest } from './api'

export const contentRepository = {
  list(query: ListQuery = {}) {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => { if (value !== undefined) params.set(key, String(value)) })
    return apiRequest<PaginatedData<ContentItem>>(`/public/content?${params}`)
  },
  async getBySlug(slug: string) {
    try { return await apiRequest<ContentItem>(`/public/content/${encodeURIComponent(slug)}`) }
    catch (error: any) { if (error?.message?.includes('tidak ditemukan')) return null; throw error }
  },
  search(query: string) {
    return apiRequest<Array<Pick<ContentItem, 'id'|'slug'|'title'|'excerpt'> & { type:'content'|'page' }>>(`/public/search?q=${encodeURIComponent(query)}`)
  },
}
