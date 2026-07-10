import { defaultSchoolModules } from '~/data/dummy/school-modules'
import type { SchoolModulesData, SchoolModulesRepository } from '~/types/school-modules'

export const SCHOOL_MODULES_STORAGE_KEY = 'sdn-sukorame-2-school-modules-v1'
const seed = () => structuredClone(defaultSchoolModules)
const read = (): SchoolModulesData => {
  if (!import.meta.client) return seed()
  try { return JSON.parse(localStorage.getItem(SCHOOL_MODULES_STORAGE_KEY) || 'null') || seed() } catch { return seed() }
}

export const schoolModulesRepository: SchoolModulesRepository = {
  async get() { return read() },
  async save(data) {
    const next = structuredClone(data)
    if (import.meta.client) localStorage.setItem(SCHOOL_MODULES_STORAGE_KEY, JSON.stringify(next))
    return next
  },
  async reset() {
    if (import.meta.client) localStorage.removeItem(SCHOOL_MODULES_STORAGE_KEY)
    return seed()
  },
}
