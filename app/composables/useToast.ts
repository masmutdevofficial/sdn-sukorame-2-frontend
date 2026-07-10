import type { ToastItem, ToastType } from '~/types/admin-ui'

export const useToast = () => {
  const toasts = useState<ToastItem[]>('admin-toasts', () => [])
  const remove = (id: string) => { toasts.value = toasts.value.filter(toast => toast.id !== id) }
  const show = (type: ToastType, title: string, message: string) => {
    const id = crypto.randomUUID()
    toasts.value.push({ id, type, title, message })
    if (import.meta.client) setTimeout(() => remove(id), 3000)
  }
  return {
    toasts, remove, show,
    success: (message: string, title = 'Sip, berhasil!') => show('success', title, message),
    error: (message: string, title = 'Yah, gagal') => show('error', title, message),
    warning: (message: string, title = 'Ups!') => show('warning', title, message),
    info: (message: string, title = 'Informasi') => show('info', title, message),
  }
}
