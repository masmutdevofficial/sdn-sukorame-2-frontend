interface ConfirmOptions { title?: string; message: string; confirmLabel?: string; tone?: 'danger' | 'primary' }
let resolver: ((value: boolean) => void) | null = null

export const useAdminConfirm = () => {
  const state = useState('admin-confirm', () => ({ open: false, title: 'Konfirmasi', message: '', confirmLabel: 'Ya, lanjutkan', tone: 'danger' as 'danger' | 'primary' }))
  const confirm = (options: ConfirmOptions) => new Promise<boolean>((resolve) => {
    resolver = resolve
    Object.assign(state.value, { open: true, title: options.title || 'Konfirmasi', message: options.message, confirmLabel: options.confirmLabel || 'Ya, lanjutkan', tone: options.tone || 'danger' })
  })
  const finish = (value: boolean) => { state.value.open = false; resolver?.(value); resolver = null }
  return { state, confirm, accept: () => finish(true), cancel: () => finish(false) }
}
