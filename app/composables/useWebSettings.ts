import { webSettingsRepository } from '~/repositories/http/web-settings.repository'
import { defaultWebSettings } from '~/types/web-settings'
import type { WebSettings } from '~/types/web-settings'

export const useWebSettings = (scope: 'admin' | 'public' = 'public') => {
  const toast = useToast()
  const asyncData = useAsyncData(
    `web-settings-${scope}`,
    () => webSettingsRepository.get(scope),
    { default: defaultWebSettings },
  )
  const { data: settings, pending: loading, refresh } = asyncData
  const saving = ref(false)
  const notice = ref('')

  const save = async (data: WebSettings, message = 'Settings web berhasil disimpan.') => {
    saving.value = true
    try {
      settings.value = await webSettingsRepository.save(data)
      notice.value = message
      toast.success(message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Settings web gagal disimpan.', 'Server error')
      throw error
    } finally {
      saving.value = false
    }
  }

  return { settings, loading, saving, notice, refresh, save, ready: asyncData }
}
