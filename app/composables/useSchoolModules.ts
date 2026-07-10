import { schoolModulesRepository } from '~/repositories/http/school-modules.repository'
import type { SchoolModulesData } from '~/types/school-modules'

const emptyModules = (): SchoolModulesData => ({
  school: { name:'',fullName:'',brand:'',tagline:'',vision:'',npsn:'',nss:'',nis:'',address:'',postal:'',email:'',founded:'',headmaster:'' },
  profileSections: [], teachers: [], academicDocuments: [], programCategories: [], programs: [], studentCategories: [], studentActivities: [], informationCategories: [], informationItems: [], gallery: [],
  contact: { title:'',description:'',address:'',email:'',phone:'',mapEmbedUrl:'',image:'' },
  ppdb: { title:'',description:'',startDate:'',endDate:'',countdownEnabled:false,image:'',requirements:[],steps:[],faqs:[] },
})

export const useSchoolModules = () => {
  const toast = useToast()
  const asyncData = useAsyncData(
    import.meta.client && sessionStorage.getItem('sdn-admin-session') === '1' ? 'school-modules-admin' : 'school-modules-public',
    () => schoolModulesRepository.get(),
    { default: emptyModules },
  )
  const { data: modules, pending: loading, refresh } = asyncData
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
  return { modules, loading, saving, notice, load, save, ready: asyncData }
}
