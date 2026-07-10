import type { AdminAccount } from '~/types/admin-ui'
import { apiRequest, DEFAULT_AVATAR_URL } from '~/repositories/http/api'

export const useAdminAccount = () => {
  const account = useState<AdminAccount>('admin-account', () => ({ name:'',email:'',level:'Administrator',avatar:DEFAULT_AVATAR_URL,password:'' }))
  onMounted(() => {
    apiRequest<{name:string;email:string;role:string;avatar:string|null}>('/auth/me')
      .then(user => { account.value = { name:user.name,email:user.email,level:user.role==='admin'?'Administrator':'Editor',avatar:user.avatar||DEFAULT_AVATAR_URL,password:'' } })
      .catch(() => {})
  })
  const saveAccount = async (next: AdminAccount) => {
    const user = await apiRequest<{name:string;email:string;role:string;avatar:string|null}>('/auth/me', { method:'PATCH', body:{ name:next.name,email:next.email,avatar:next.avatar,...(next.password?{password:next.password}:{}) } })
    account.value = { name:user.name,email:user.email,level:user.role==='admin'?'Administrator':'Editor',avatar:user.avatar||DEFAULT_AVATAR_URL,password:'' }
  }
  return { account, saveAccount }
}
