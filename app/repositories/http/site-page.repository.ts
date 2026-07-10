import type { SitePage } from '~/types/site-page'
import { apiRequest } from './api'

export const sitePageRepository = {
  async getBySlug(slug: string) {
    try { return await apiRequest<SitePage>(`/public/pages/${encodeURIComponent(slug)}`) }
    catch (error: any) { if (error?.message?.includes('tidak ditemukan')) return null; throw error }
  },
}
