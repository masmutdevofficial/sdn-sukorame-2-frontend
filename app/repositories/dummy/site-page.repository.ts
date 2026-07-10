import { defaultSitePages } from '~/data/dummy/site-pages'
import type { ListQuery, PaginatedData } from '~/types/content'
import type { SitePage, SitePageRepository } from '~/types/site-page'
import { apiEnabled, apiRequest } from '~/repositories/http/api'

export const SITE_PAGE_STORAGE_KEY = 'sdn-sukorame-2-site-pages-v1'
const seed = () => structuredClone(defaultSitePages)
const read = (): SitePage[] => {
  if (!import.meta.client) return seed()
  try { return JSON.parse(localStorage.getItem(SITE_PAGE_STORAGE_KEY) || 'null') || seed() } catch { return seed() }
}
const write = (pages: SitePage[]) => { if (import.meta.client) localStorage.setItem(SITE_PAGE_STORAGE_KEY, JSON.stringify(pages)) }

export const sitePageRepository: SitePageRepository = {
  async list(query: ListQuery = {}): Promise<PaginatedData<SitePage>> {
    let pages = read()
    if (query.search) {
      const search = query.search.toLowerCase()
      pages = pages.filter(page => `${page.title} ${page.slug}`.toLowerCase().includes(search))
    }
    if (query.status) pages = pages.filter(page => page.status === query.status)
    const page = query.page || 1
    const perPage = query.perPage || 50
    const total = pages.length
    return { items: pages.slice((page - 1) * perPage, page * perPage), meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) } }
  },
  async getById(id) { return read().find(page => page.id === id) || null },
  async getBySlug(slug) {
    if (apiEnabled()) { try { return await apiRequest<SitePage>(`/public/pages/${encodeURIComponent(slug)}`) } catch { return read().find(page => page.slug === slug) || null } }
    return read().find(page => page.slug === slug) || null
  },
  async create(data) {
    const pages = read()
    if (pages.some(page => page.slug === data.slug)) throw new Error('Slug halaman sudah digunakan')
    const created = { ...data, id: crypto.randomUUID(), updatedAt: new Date().toISOString() } as SitePage
    pages.push(created)
    write(pages)
    return created
  },
  async update(id, data) {
    const pages = read()
    const index = pages.findIndex(page => page.id === id)
    if (index < 0) throw new Error('Halaman tidak ditemukan')
    pages[index] = { ...pages[index], ...data, updatedAt: new Date().toISOString() } as SitePage
    write(pages)
    return pages[index]!
  },
  async remove(id) { write(read().filter(page => page.id !== id)) },
}
