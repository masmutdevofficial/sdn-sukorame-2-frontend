import type { SchoolModulesData, SchoolModulesRepository } from '~/types/school-modules'
import { apiRequest, getAccessToken } from './api'

export const schoolModulesRepository: SchoolModulesRepository = {
  get: () => apiRequest<SchoolModulesData>(getAccessToken() ? '/admin/modules' : '/public/modules'),
  save: data => apiRequest<SchoolModulesData>('/admin/modules', { method: 'PUT', body: data }),
  reset: () => apiRequest<SchoolModulesData>(getAccessToken() ? '/admin/modules' : '/public/modules'),
}
