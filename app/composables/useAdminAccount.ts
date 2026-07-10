import type { AdminAccount } from '~/types/admin-ui'

export const ADMIN_ACCOUNT_KEY = 'sdn-admin-account-v1'
const fallback: AdminAccount = { name: 'Admin SAKTI', email: 'admin@demo.local', level: 'Administrator', avatar: '/images/user.png', password: 'admin123' }

export const useAdminAccount = () => {
  const account = useState<AdminAccount>('admin-account', () => structuredClone(fallback))
  onMounted(() => {
    try { account.value = { ...structuredClone(fallback), ...(JSON.parse(localStorage.getItem(ADMIN_ACCOUNT_KEY) || 'null') || {}) } } catch { account.value = structuredClone(fallback) }
  })
  const saveAccount = (next: AdminAccount) => {
    account.value = { ...next }
    if (import.meta.client) localStorage.setItem(ADMIN_ACCOUNT_KEY, JSON.stringify(account.value))
  }
  return { account, saveAccount }
}
