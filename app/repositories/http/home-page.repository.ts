import type { HomePageContent } from '~/types/page-content'
import { apiRequest, getAccessToken } from './api'

export const homePageRepository = {
  get(slug: string) {
    if (slug !== 'beranda') throw new Error('Halaman tidak ditemukan')
    return apiRequest<HomePageContent>(getAccessToken() ? '/admin/home' : '/public/home')
  },
  update(slug: string, data: HomePageContent) {
    if (slug !== 'beranda') throw new Error('Halaman tidak ditemukan')
    return apiRequest<HomePageContent>('/admin/home', { method: 'PUT', body: data })
  },
}
