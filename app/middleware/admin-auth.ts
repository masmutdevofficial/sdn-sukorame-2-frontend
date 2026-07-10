export default defineNuxtRouteMiddleware(()=>{if(import.meta.client&&sessionStorage.getItem('sdn-admin-session')!=='1')return navigateTo('/admin/login')})
