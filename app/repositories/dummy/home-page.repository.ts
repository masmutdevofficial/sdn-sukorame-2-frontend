import { defaultHomePageContent } from '~/data/dummy/home-page'
import type { HomePageRepository } from '~/repositories/contracts/page-content.repository'
import type { HomePageContent } from '~/types/page-content'
import { apiEnabled, apiRequest, getAccessToken } from '~/repositories/http/api'

export const HOME_PAGE_STORAGE_KEY = 'sdn-sukorame-2-home-page-v1'

const cloneDefault = () => structuredClone(defaultHomePageContent)

const read = (): HomePageContent => {
  if (!import.meta.client) return cloneDefault()
  try {
    return JSON.parse(localStorage.getItem(HOME_PAGE_STORAGE_KEY) || 'null') || cloneDefault()
  } catch {
    return cloneDefault()
  }
}

export const homePageRepository: HomePageRepository = {
  async get(slug) {
    if (slug !== 'beranda') throw new Error('Halaman tidak ditemukan')
    if (apiEnabled()) {
      try { return await apiRequest<HomePageContent>(getAccessToken() ? '/admin/home' : '/public/home') }
      catch (error: any) { if (error?.message?.includes('belum tersedia')) return cloneDefault(); throw error }
    }
    return read()
  },
  async update(slug, data) {
    if (slug !== 'beranda') throw new Error('Halaman tidak ditemukan')
    if (apiEnabled()) return apiRequest<HomePageContent>('/admin/home', { method: 'PUT', body: data })
    const next = { ...structuredClone(data), slug: 'beranda', updatedAt: new Date().toISOString() } as HomePageContent
    if (import.meta.client) localStorage.setItem(HOME_PAGE_STORAGE_KEY, JSON.stringify(next))
    return next
  },
  async reset(slug) {
    if (slug !== 'beranda') throw new Error('Halaman tidak ditemukan')
    if (apiEnabled()) return this.update(slug, cloneDefault())
    if (import.meta.client) localStorage.removeItem(HOME_PAGE_STORAGE_KEY)
    return cloneDefault()
  },
}
