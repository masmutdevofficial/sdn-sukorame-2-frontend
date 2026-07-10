import type { AdminAccount } from '~/types/admin-ui'
import { apiEnabled, apiRequest } from '~/repositories/http/api'

export const ADMIN_ACCOUNT_KEY = 'sdn-admin-account-v1'
const fallback: AdminAccount = { name: 'Admin SAKTI', email: 'admin@demo.local', level: 'Administrator', avatar: '/images/user.png', password: 'admin123' }

export const useAdminAccount = () => {
  const account = useState<AdminAccount>('admin-account', () => structuredClone(fallback))
  onMounted(() => {
    if (apiEnabled()) {
      apiRequest<{name:string;email:string;role:string;avatar:string|null}>('/auth/me').then(user => { account.value = { name:user.name,email:user.email,level:user.role==='admin'?'Administrator':'Editor',avatar:user.avatar||'/images/user.png',password:'' } }).catch(() => {})
      return
    }
    try { account.value = { ...structuredClone(fallback), ...(JSON.parse(localStorage.getItem(ADMIN_ACCOUNT_KEY) || 'null') || {}) } } catch { account.value = structuredClone(fallback) }
  })
  const saveAccount = async (next: AdminAccount) => {
    if (apiEnabled()) {
      const user = await apiRequest<{name:string;email:string;role:string;avatar:string|null}>('/auth/me', { method:'PATCH', body:{ name:next.name,email:next.email,avatar:next.avatar,...(next.password?{password:next.password}:{}) } })
      account.value = { name:user.name,email:user.email,level:user.role==='admin'?'Administrator':'Editor',avatar:user.avatar||'/images/user.png',password:'' }
      return
    }
    account.value = { ...next }
    if (import.meta.client) localStorage.setItem(ADMIN_ACCOUNT_KEY, JSON.stringify(account.value))
  }
  return { account, saveAccount }
}
