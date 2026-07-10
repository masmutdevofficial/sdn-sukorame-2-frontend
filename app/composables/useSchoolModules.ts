import { defaultSchoolModules } from '~/data/dummy/school-modules'
import { schoolModulesRepository } from '~/repositories/dummy/school-modules.repository'

export const useSchoolModules = () => {
  const modules = ref(structuredClone(defaultSchoolModules))
  const loading = ref(true)
  const saving = ref(false)
  const notice = ref('')
  const load = async () => { modules.value = await schoolModulesRepository.get(); loading.value = false }
  const save = async (message = 'Perubahan berhasil disimpan.') => {
    saving.value = true
    modules.value = await schoolModulesRepository.save(modules.value)
    saving.value = false
    notice.value = message
  }
  onMounted(load)
  return { modules, loading, saving, notice, load, save }
}
