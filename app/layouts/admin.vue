<script setup lang="ts">
const { logout } = useAuth()
const { account } = useAdminAccount()
const { confirm } = useAdminConfirm()
const route = useRoute()
const sidebarOpen = ref(false)
const accountOpen = ref(false)
const menus = [
  { label: 'Dashboard', to: '/admin', icon: 'mdi:view-dashboard-outline' },
  { label: 'Beranda', to: '/admin/halaman/beranda', icon: 'mdi:home-edit-outline' },
  { label: 'Profil', to: '/admin/profil', icon: 'mdi:school-outline' },
  { label: 'Akademik', to: '/admin/akademik', icon: 'mdi:file-pdf-box' },
  { label: 'Kesiswaan', to: '/admin/kesiswaan', icon: 'mdi:account-group-outline' },
  { label: 'Informasi', to: '/admin/informasi', icon: 'mdi:newspaper-variant-outline' },
  { label: 'Galeri', to: '/admin/galeri', icon: 'mdi:image-multiple-outline' },
  { label: 'Kontak', to: '/admin/kontak', icon: 'mdi:map-marker-outline' },
  { label: 'PPDB', to: '/admin/ppdb', icon: 'mdi:account-school-outline' },
]
watch(() => route.fullPath, () => { sidebarOpen.value = false; accountOpen.value = false })
watch(sidebarOpen, value => { if (import.meta.client) document.body.style.overflow = value ? 'hidden' : '' })
const requestLogout = async () => {
  accountOpen.value = false
  if (await confirm({ title: 'Keluar dari Admin?', message: 'Sesi admin akan diakhiri dan Anda harus login kembali untuk mengakses dashboard.', confirmLabel: 'Ya, keluar' })) logout()
}
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <aside class="fixed inset-y-0 hidden w-64 overflow-y-auto bg-school-navy p-5 text-white md:block"><NuxtLink to="/admin" class="text-lg font-bold">Admin SAKTI</NuxtLink><p class="mt-1 text-xs text-blue-200">Panel frontend demo</p><nav class="mt-8 grid gap-2"><NuxtLink v-for="menu in menus" :key="menu.to" :to="menu.to" class="rounded-lg p-3 hover:bg-white/10" active-class="bg-white/10"><Icon :name="menu.icon"/> {{menu.label}}</NuxtLink><NuxtLink to="/" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:web"/> Lihat Website</NuxtLink></nav></aside>

    <Teleport to="body"><Transition name="backdrop"><button v-if="sidebarOpen" class="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm md:hidden" aria-label="Tutup menu" @click="sidebarOpen=false"/></Transition><Transition name="drawer"><aside v-if="sidebarOpen" class="fixed inset-y-0 left-0 z-[90] w-[min(84vw,320px)] overflow-y-auto bg-school-navy p-5 text-white md:hidden"><div class="flex justify-between"><div><b class="text-lg">Admin SAKTI</b><p class="text-xs text-blue-200">Menu pengelolaan</p></div><button aria-label="Tutup menu" @click="sidebarOpen=false"><Icon name="mdi:close" size="26"/></button></div><nav class="mt-7 grid gap-2"><NuxtLink v-for="menu in menus" :key="menu.to" :to="menu.to" class="rounded-xl p-3 hover:bg-white/10" active-class="bg-white/10"><Icon :name="menu.icon"/> {{menu.label}}</NuxtLink><NuxtLink to="/" class="rounded-xl p-3 hover:bg-white/10"><Icon name="mdi:web"/> Lihat Website</NuxtLink></nav></aside></Transition></Teleport>

    <div class="md:pl-64">
      <header class="relative flex h-16 items-center justify-between border-b bg-white px-4 sm:px-5"><div class="flex items-center gap-3"><button class="grid size-10 place-items-center rounded-xl border border-line text-school-navy md:hidden" aria-label="Buka menu admin" @click="sidebarOpen=true"><Icon name="mdi:menu" size="26"/></button><b>SDN Sukorame 2</b></div><div class="relative"><button class="flex items-center gap-3 rounded-xl p-1.5 hover:bg-slate-100" :aria-expanded="accountOpen" @click="accountOpen=!accountOpen"><img :src="account.avatar||'/images/user.png'" alt="Avatar admin" class="size-10 rounded-full border border-line object-cover"><span class="hidden text-left sm:block"><b class="block text-sm text-school-navy">{{account.name}}</b><small class="text-muted">{{account.level}}</small></span><Icon name="mdi:chevron-down"/></button><Transition name="dropdown"><div v-if="accountOpen" class="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-line bg-white shadow-xl"><div class="bg-school-sky p-4"><b class="block text-school-navy">{{account.name}}</b><p class="text-xs text-muted">{{account.level}} · {{account.email}}</p></div><NuxtLink to="/admin/settings" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"><Icon name="mdi:cog-outline"/> Settings</NuxtLink><button class="flex w-full items-center gap-3 px-4 py-3 text-red-700 hover:bg-red-50" @click="requestLogout"><Icon name="mdi:logout"/> Logout</button></div></Transition></div></header>
      <div class="bg-amber-100 px-5 py-2 text-center text-xs text-amber-900">Mode Demo — data disimpan lokal pada browser dan belum terhubung ke server.</div><main class="p-4 sm:p-5 md:p-8"><slot/></main>
    </div>
    <AdminConfirmDialog/><AdminToastContainer/>
  </div>
</template>

<style scoped>.backdrop-enter-active,.backdrop-leave-active,.drawer-enter-active,.drawer-leave-active,.dropdown-enter-active,.dropdown-leave-active{transition:all .25s ease}.backdrop-enter-from,.backdrop-leave-to,.dropdown-enter-from,.dropdown-leave-to{opacity:0}.drawer-enter-from,.drawer-leave-to{transform:translateX(-100%)}.dropdown-enter-from,.dropdown-leave-to{opacity:0;transform:translateY(-8px)}</style>
