interface ApiSuccess<T> { success: true; data: T; message?: string }
interface ApiFailure { success: false; message: string; errors?: unknown }
const tokenKey = 'sdn-api-access-token'
export const API_BASE_URL = 'https://api.sdnsukorame2kotakediri.sch.id/api/v1'
export const R2_PUBLIC_URL = 'https://cdn.sdnsukorame2kotakediri.sch.id'
export const DEFAULT_IMAGE_URL = `${R2_PUBLIC_URL}/images/no-image.png`
export const DEFAULT_AVATAR_URL = `${R2_PUBLIC_URL}/images/user.png`

export const getAccessToken = () => import.meta.client ? sessionStorage.getItem(tokenKey) : null
export const setAccessToken = (token?: string) => { if (!import.meta.client) return; token ? sessionStorage.setItem(tokenKey, token) : sessionStorage.removeItem(tokenKey) }

const refreshAccessToken = async () => {
  const response = await $fetch<ApiSuccess<{ accessToken: string }>>(`${API_BASE_URL}/auth/refresh`, { method: 'POST', credentials: 'include' })
  setAccessToken(response.data.accessToken)
  return response.data.accessToken
}

export const apiRequest = async <T>(path: string, options: Record<string, any> = {}, retry = true): Promise<T> => {
  const token = getAccessToken()
  try {
    const response = await $fetch<ApiSuccess<T> | ApiFailure>(`${API_BASE_URL}${path}`, {
      ...options,
      credentials: 'include',
      headers: { ...(options.headers || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    })
    if (!response.success) throw new Error(response.message)
    return response.data
  } catch (error: any) {
    if (retry && import.meta.client && error?.response?.status === 401 && !path.startsWith('/auth/')) {
      try { await refreshAccessToken(); return apiRequest<T>(path, options, false) } catch { setAccessToken(); await navigateTo('/admin/login'); throw new Error('Sesi telah berakhir. Silakan masuk kembali.') }
    }
    throw new Error(error?.data?.message || error?.message || 'API tidak dapat dihubungi')
  }
}
