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

const isActive = (to: string) => to === '/admin' ? route.path === to : route.path.startsWith(to)
const currentPage = computed(() => [...menus].reverse().find(menu => isActive(menu.to))?.label || 'Admin')

watch(() => route.fullPath, () => { sidebarOpen.value = false; accountOpen.value = false })
watch(sidebarOpen, value => { if (import.meta.client) document.body.style.overflow = value ? 'hidden' : '' })
onBeforeUnmount(() => { if (import.meta.client) document.body.style.overflow = '' })

const requestLogout = async () => {
  accountOpen.value = false
  if (await confirm({ title: 'Keluar dari Admin?', message: 'Sesi admin akan diakhiri dan Anda harus login kembali untuk mengakses dashboard.', confirmLabel: 'Ya, keluar' })) logout()
}
</script>

<template>
  <div class="min-h-screen bg-[#f4f7fa]">
    <aside class="admin-sidebar fixed inset-y-0 left-0 z-40 hidden w-[17.5rem] flex-col text-white md:flex">
      <div class="flex h-20 items-center gap-3 border-b border-white/10 px-5">
        <span class="grid size-12 place-items-center overflow-hidden rounded-2xl bg-white p-1 shadow-lg shadow-slate-950/15"><img src="https://cdn.sdnsukorame2kotakediri.sch.id/logo.png" alt="Logo SDN Sukorame 2" class="size-full object-contain" /></span>
        <div><NuxtLink to="/admin" class="font-extrabold tracking-tight">Admin SAKTI</NuxtLink><p class="mt-0.5 text-[11px] text-blue-200">SDN Sukorame 2</p></div>
      </div>
      <div class="flex-1 overflow-y-auto px-4 py-5">
        <p class="px-3 text-[10px] font-bold uppercase tracking-[.18em] text-blue-300">Menu utama</p>
        <nav class="mt-3 grid gap-1.5" aria-label="Navigasi admin">
          <NuxtLink v-for="menu in menus" :key="menu.to" :to="menu.to" class="nav-item" :class="{ active: isActive(menu.to) }"><Icon :name="menu.icon" size="20" /><span>{{ menu.label }}</span><span v-if="isActive(menu.to)" class="ml-auto size-1.5 rounded-full bg-school-yellow" /></NuxtLink>
        </nav>
        <p class="mt-7 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-blue-300">Akses cepat</p>
        <nav class="mt-3 grid gap-1.5">
          <NuxtLink to="/admin/settings" class="nav-item" :class="{ active: isActive('/admin/settings') }"><Icon name="mdi:cog-outline" size="20" />Pengaturan</NuxtLink>
          <NuxtLink to="/" target="_blank" class="nav-item"><Icon name="mdi:web" size="20" />Lihat Website<Icon name="mdi:open-in-new" class="ml-auto opacity-50" size="14" /></NuxtLink>
        </nav>
      </div>
      <div class="m-4 rounded-2xl border border-white/10 bg-white/[.07] p-3.5">
        <div class="flex items-center gap-3"><span class="grid size-9 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300"><Icon name="mdi:check-decagram-outline" size="20" /></span><div><p class="text-xs font-bold">Sistem siap</p><p class="mt-0.5 text-[10px] text-blue-200">Panel administrasi</p></div></div>
      </div>
    </aside>

    <Teleport to="body">
      <Transition name="backdrop"><button v-if="sidebarOpen" class="fixed inset-0 z-[80] bg-slate-950/45 backdrop-blur-sm md:hidden" aria-label="Tutup menu" @click="sidebarOpen = false" /></Transition>
      <Transition name="drawer"><aside v-if="sidebarOpen" class="admin-sidebar fixed inset-y-0 left-0 z-[90] flex w-[min(86vw,20rem)] flex-col text-white md:hidden"><div class="flex h-20 items-center justify-between border-b border-white/10 px-5"><div class="flex items-center gap-3"><span class="grid size-11 place-items-center overflow-hidden rounded-xl bg-white p-1"><img src="https://cdn.sdnsukorame2kotakediri.sch.id/logo.png" alt="Logo SDN Sukorame 2" class="size-full object-contain" /></span><div><b>Admin SAKTI</b><p class="text-[11px] text-blue-200">SDN Sukorame 2</p></div></div><button class="grid size-9 place-items-center rounded-xl hover:bg-white/10" aria-label="Tutup menu" @click="sidebarOpen = false"><Icon name="mdi:close" size="24" /></button></div><nav class="grid gap-1.5 overflow-y-auto p-4"><NuxtLink v-for="menu in menus" :key="menu.to" :to="menu.to" class="nav-item" :class="{ active: isActive(menu.to) }"><Icon :name="menu.icon" size="20" />{{ menu.label }}</NuxtLink><div class="my-2 border-t border-white/10" /><NuxtLink to="/admin/settings" class="nav-item"><Icon name="mdi:cog-outline" size="20" />Pengaturan</NuxtLink><NuxtLink to="/" target="_blank" class="nav-item"><Icon name="mdi:web" size="20" />Lihat Website</NuxtLink></nav></aside></Transition>
    </Teleport>

    <div class="md:pl-[17.5rem]">
      <header class="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div class="flex min-w-0 items-center gap-3"><button class="grid size-10 flex-none place-items-center rounded-xl border border-line text-school-navy md:hidden" aria-label="Buka menu admin" @click="sidebarOpen = true"><Icon name="mdi:menu" size="25" /></button><div class="min-w-0"><p class="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">Panel administrasi</p><h1 class="mt-0.5 truncate text-base font-extrabold text-school-navy sm:text-lg">{{ currentPage }}</h1></div></div>
        <div class="flex items-center gap-2 sm:gap-3"><NuxtLink to="/" target="_blank" class="hidden items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-xs font-bold text-school-navy transition hover:border-blue-200 hover:bg-blue-50 lg:flex"><Icon name="mdi:monitor-eye" size="18" />Pratinjau website</NuxtLink><div class="relative"><button class="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100" :aria-expanded="accountOpen" aria-haspopup="menu" @click="accountOpen = !accountOpen"><img :src="account.avatar || 'https://cdn.sdnsukorame2kotakediri.sch.id/images/user.png'" alt="Avatar admin" class="size-10 rounded-xl border border-line bg-slate-100 object-cover"><span class="hidden max-w-36 text-left sm:block"><b class="block truncate text-xs text-school-navy">{{ account.name }}</b><small class="block truncate text-[10px] text-muted">{{ account.level }}</small></span><Icon name="mdi:chevron-down" class="hidden text-slate-400 sm:block" /></button><Transition name="dropdown"><div v-if="accountOpen" class="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-2xl shadow-slate-900/10" role="menu"><div class="rounded-xl bg-slate-50 p-3"><b class="block text-sm text-school-navy">{{ account.name }}</b><p class="mt-0.5 truncate text-[11px] text-muted">{{ account.email }}</p></div><NuxtLink to="/admin/settings" class="dropdown-item"><Icon name="mdi:cog-outline" size="19" />Pengaturan akun</NuxtLink><button class="dropdown-item w-full text-red-700 hover:bg-red-50" @click="requestLogout"><Icon name="mdi:logout" size="19" />Keluar</button></div></Transition></div></div>
      </header>
      <main class="p-4 sm:p-6 lg:p-8"><slot /></main>
    </div>
    <AdminConfirmDialog /><AdminToastContainer />
  </div>
</template>

<style scoped>
.admin-sidebar{background:linear-gradient(180deg,#123a63 0%,#0d3155 100%);box-shadow:10px 0 35px rgba(15,45,75,.08)}.nav-item{display:flex;align-items:center;gap:.75rem;border-radius:.8rem;padding:.68rem .8rem;color:#d7eaff;font-size:.82rem;font-weight:600;transition:background-color .2s ease,color .2s ease,transform .2s ease}.nav-item:hover{background:rgba(255,255,255,.075);color:white;transform:translateX(2px)}.nav-item.active{background:rgba(255,255,255,.12);color:white;box-shadow:inset 3px 0 #f6c945}.dropdown-item{display:flex;align-items:center;gap:.7rem;border-radius:.7rem;padding:.7rem .75rem;font-size:.78rem;font-weight:650;color:#334155;transition:background-color .2s ease}.dropdown-item:hover{background:#f8fafc}.backdrop-enter-active,.backdrop-leave-active,.drawer-enter-active,.drawer-leave-active,.dropdown-enter-active,.dropdown-leave-active{transition:all .25s ease}.backdrop-enter-from,.backdrop-leave-to,.dropdown-enter-from,.dropdown-leave-to{opacity:0}.drawer-enter-from,.drawer-leave-to{transform:translateX(-100%)}.dropdown-enter-from,.dropdown-leave-to{opacity:0;transform:translateY(-8px) scale(.98)}
</style>
