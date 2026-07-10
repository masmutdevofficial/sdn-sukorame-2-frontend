import type { WebSettings } from '~/types/web-settings'
import { apiRequest } from './api'

export const webSettingsRepository = {
  get: (scope: 'admin' | 'public' = 'public') => apiRequest<WebSettings>(`/${scope}/web-settings`),
  save: (data: WebSettings) => apiRequest<WebSettings>('/admin/web-settings', { method: 'PUT', body: data }),
}
