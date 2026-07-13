<script setup lang="ts">
const open = ref(false)
const route = useRoute()
const schoolModules = useSchoolModules()
await schoolModules.ready
const webSettings = useWebSettings('public')
await webSettings.ready
const school = computed(() => schoolModules.modules.value.school)
const logo = computed(() => webSettings.settings.value.logo || 'https://cdn.sdnsukorame2kotakediri.sch.id/logo.png')
interface NavigationItem { label: string; to?: string; icon: string; children?: Array<{ label: string; to: string }> }
const nav: NavigationItem[] = [
  { label: 'Beranda', to: '/', icon: 'mdi:home-outline' },
  { label: 'Profil', to: '/profil', icon: 'mdi:school-outline' },
  { label: 'Akademik', icon: 'mdi:book-open-page-variant-outline', children: [
    { label: 'Kurikulum', to: '/akademik/kurikulum' },
    { label: 'Program Sekolah', to: '/akademik/program-sekolah' },
  ] },
  { label: 'Kesiswaan', to: '/kesiswaan/ekstrakurikuler', icon: 'mdi:account-group-outline' },
  { label: 'Informasi', to: '/informasi/berita', icon: 'mdi:newspaper-variant-outline' },
  { label: 'Galeri', to: '/galeri', icon: 'mdi:image-multiple-outline' },
  { label: 'Kontak', to: '/kontak', icon: 'mdi:map-marker-outline' },
]

const closeMenu = () => { open.value = false }
const handleEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') closeMenu() }

watch(() => route.fullPath, closeMenu)
watch(open, (value) => {
  if (import.meta.client) document.body.style.overflow = value ? 'hidden' : ''
})
onMounted(() => window.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
    <a href="#main" class="sr-only focus:not-sr-only">Lewati ke konten utama</a>
    <div class="container-school flex h-18 items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3" aria-label="SDN Sukorame 2 - Beranda">
        <span class="grid size-12 place-items-center overflow-hidden rounded-xl border border-line bg-white p-1 shadow-sm"><img :src="logo" :alt="`Logo ${school.name}`" class="size-full object-contain" /></span>
        <span><b class="block text-school-navy">{{ school.name }}</b><small class="text-muted">Sekolah SAKTI</small></span>
      </NuxtLink>

      <nav class="hidden items-center gap-4 xl:flex" aria-label="Navigasi utama">
        <template v-for="item in nav" :key="item.label">
          <div v-if="item.children" class="group relative">
            <button type="button" class="flex items-center gap-1 py-5 text-sm font-semibold transition-colors hover:text-school-action" :class="route.path.startsWith('/akademik/') ? 'text-school-action' : ''" aria-haspopup="true">
              {{ item.label }}
              <Icon name="mdi:chevron-down" size="17" class="transition-transform group-hover:rotate-180" />
            </button>
            <div class="invisible absolute left-1/2 top-full w-52 -translate-x-1/2 translate-y-2 rounded-xl border border-line bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <NuxtLink v-for="child in item.children" :key="child.to" :to="child.to" class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-school-sky hover:text-school-action" active-class="bg-school-sky text-school-action">{{ child.label }}</NuxtLink>
            </div>
          </div>
          <NuxtLink v-else :to="item.to!" class="text-sm font-semibold transition-colors hover:text-school-action" active-class="text-school-action">{{ item.label }}</NuxtLink>
        </template>
        <NuxtLink to="/spmb" class="btn btn-primary ml-1 px-4 py-2.5 text-sm" active-class="ring-4 ring-school-action/15">
          <Icon name="mdi:account-school-outline" size="20" />
          SPMB
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2 xl:hidden">
        <NuxtLink to="/spmb" class="btn btn-primary px-3 py-2.5 text-sm sm:px-4">
          <Icon name="mdi:account-school-outline" size="20" />
          <span class="hidden sm:inline">SPMB</span>
        </NuxtLink>
        <button class="grid size-11 place-items-center rounded-xl border border-line text-school-navy transition-colors hover:bg-school-sky" aria-label="Buka menu navigasi" aria-controls="mobile-navigation" :aria-expanded="open" @click="open = true">
        <Icon name="mdi:menu" size="28" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="backdrop-fade">
        <button v-if="open" class="fixed inset-0 z-[70] cursor-default bg-black/30 backdrop-blur-[2px]" aria-label="Tutup menu navigasi" @click="closeMenu" />
      </Transition>
      <Transition name="drawer-slide">
        <aside v-if="open" id="mobile-navigation" class="fixed inset-y-0 left-0 z-[80] flex w-[min(86vw,360px)] flex-col bg-white shadow-2xl" role="dialog" aria-modal="true" aria-label="Menu navigasi mobile">
          <div class="flex items-center justify-between border-b border-line px-5 py-5">
            <div class="flex items-center gap-3">
              <span class="grid size-11 place-items-center overflow-hidden rounded-xl border border-line bg-white p-1"><img :src="logo" :alt="`Logo ${school.name}`" class="size-full object-contain" /></span>
              <span><b class="block text-school-navy">Menu Sekolah</b><small class="text-muted">{{ school.name }}</small></span>
            </div>
            <button autofocus class="grid size-10 place-items-center rounded-xl border border-line text-school-navy transition-colors hover:bg-slate-100" aria-label="Tutup menu" @click="closeMenu"><Icon name="mdi:close" size="25" /></button>
          </div>

          <nav class="flex-1 overflow-y-auto p-4" aria-label="Navigasi mobile">
            <NuxtLink to="/spmb" class="mb-3 flex items-center gap-3 rounded-2xl bg-school-action px-4 py-4 font-bold text-white shadow-lg shadow-school-action/20 transition-transform hover:-translate-y-0.5" @click="closeMenu">
              <span class="grid size-10 place-items-center rounded-xl bg-white/15"><Icon name="mdi:account-school-outline" size="24" /></span>
              <span><b class="block">Informasi SPMB</b><small class="font-medium text-blue-100">Status dan alur pendaftaran</small></span>
              <Icon name="mdi:arrow-right" class="ml-auto" size="20" />
            </NuxtLink>
            <template v-for="item in nav" :key="item.label">
              <div v-if="item.children" class="mb-1 rounded-xl bg-slate-50 p-2">
                <div class="flex items-center gap-3 px-2 py-2 font-semibold text-slate-700"><Icon :name="item.icon" size="22" /><span>{{ item.label }}</span></div>
                <NuxtLink v-for="child in item.children" :key="child.to" :to="child.to" class="ml-9 flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-school-sky hover:text-school-action" active-class="bg-school-sky text-school-action" @click="closeMenu"><Icon name="mdi:chevron-right" size="18" />{{ child.label }}</NuxtLink>
              </div>
              <NuxtLink v-else :to="item.to!" class="mb-1 flex items-center gap-3 rounded-xl px-4 py-3.5 font-semibold text-slate-700 transition-all hover:bg-school-sky hover:text-school-action" active-class="bg-school-sky text-school-action" @click="closeMenu">
                <Icon :name="item.icon" size="22" /><span>{{ item.label }}</span><Icon name="mdi:chevron-right" class="ml-auto text-muted" size="20" />
              </NuxtLink>
            </template>
          </nav>

          <div class="border-t border-line bg-slate-50 p-5 text-xs leading-5 text-muted">
            <b class="block text-school-navy">Sekolah SAKTI</b>
            {{ school.tagline }}.
          </div>
        </aside>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.backdrop-fade-enter-active,.backdrop-fade-leave-active{transition:opacity .3s ease}.backdrop-fade-enter-from,.backdrop-fade-leave-to{opacity:0}
.drawer-slide-enter-active,.drawer-slide-leave-active{transition:transform .38s cubic-bezier(.2,.8,.2,1)}.drawer-slide-enter-from,.drawer-slide-leave-to{transform:translateX(-100%)}
@media(prefers-reduced-motion:reduce){.backdrop-fade-enter-active,.backdrop-fade-leave-active,.drawer-slide-enter-active,.drawer-slide-leave-active{transition-duration:.01ms}}
</style>
