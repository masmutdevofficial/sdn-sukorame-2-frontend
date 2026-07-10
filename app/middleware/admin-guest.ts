export default defineNuxtRouteMiddleware(()=>{if(import.meta.client&&sessionStorage.getItem('sdn-demo-auth')==='1')return navigateTo('/admin')})
