import type { SchoolModulesData, SchoolModulesRepository } from '~/types/school-modules'
import { apiRequest } from './api'

export const schoolModulesRepository: SchoolModulesRepository = {
  get: (scope: 'admin' | 'public' = 'public') => apiRequest<SchoolModulesData>(`/${scope}/modules`),
  save: data => apiRequest<SchoolModulesData>('/admin/modules', { method: 'PUT', body: data }),
  reset: () => apiRequest<SchoolModulesData>('/public/modules'),
}
