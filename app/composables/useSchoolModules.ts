import { defaultSchoolModules } from '~/data/dummy/school-modules'
import { schoolModulesRepository } from '~/repositories/dummy/school-modules.repository'

export const useSchoolModules = () => {
  const toast = useToast()
  const { data: modules, pending: loading, refresh } = useAsyncData(
    import.meta.client && sessionStorage.getItem('sdn-demo-auth') === '1' ? 'school-modules-admin' : 'school-modules-public',
    () => schoolModulesRepository.get(),
    { default: () => structuredClone(defaultSchoolModules) },
  )
  const saving = ref(false)
  const notice = ref('')
  const load = async () => { await refresh() }
  const save = async (message = 'Perubahan berhasil disimpan.') => {
    saving.value = true
    try {
      modules.value = await schoolModulesRepository.save(modules.value)
      notice.value = message
      toast.success(message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Data tidak dapat disimpan.', 'Server error')
    } finally {
      saving.value = false
    }
  }
  return { modules, loading, saving, notice, load, save }
}
