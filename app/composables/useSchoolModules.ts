import { defaultSchoolModules } from '~/data/dummy/school-modules'
import { schoolModulesRepository } from '~/repositories/dummy/school-modules.repository'

export const useSchoolModules = () => {
  const toast = useToast()
  const modules = ref(structuredClone(defaultSchoolModules))
  const loading = ref(true)
  const saving = ref(false)
  const notice = ref('')
  const load = async () => { modules.value = await schoolModulesRepository.get(); loading.value = false }
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
  onMounted(load)
  return { modules, loading, saving, notice, load, save }
}
