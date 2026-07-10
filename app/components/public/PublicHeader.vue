<script setup lang="ts">
const open = ref(false)
const route = useRoute()
const schoolModules = useSchoolModules()
await schoolModules.ready
const school = computed(() => schoolModules.modules.value.school)
const logo = 'https://cdn.sdnsukorame2kotakediri.sch.id/logo.png'
const nav = [
  { label: 'Beranda', to: '/', icon: 'mdi:home-outline' },
  { label: 'Profil', to: '/profil', icon: 'mdi:school-outline' },
  { label: 'Akademik', to: '/akademik/kurikulum', icon: 'mdi:book-open-page-variant-outline' },
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
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="text-sm font-semibold transition-colors hover:text-school-action" active-class="text-school-action">{{ item.label }}</NuxtLink>
        <NuxtLink to="/ppdb" class="btn btn-primary ml-1 px-4 py-2.5 text-sm" active-class="ring-4 ring-school-action/15">
          <Icon name="mdi:account-school-outline" size="20" />
          PPDB
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2 xl:hidden">
        <NuxtLink to="/ppdb" class="btn btn-primary px-3 py-2.5 text-sm sm:px-4">
          <Icon name="mdi:account-school-outline" size="20" />
          <span class="hidden sm:inline">PPDB</span>
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
            <NuxtLink to="/ppdb" class="mb-3 flex items-center gap-3 rounded-2xl bg-school-action px-4 py-4 font-bold text-white shadow-lg shadow-school-action/20 transition-transform hover:-translate-y-0.5" @click="closeMenu">
              <span class="grid size-10 place-items-center rounded-xl bg-white/15"><Icon name="mdi:account-school-outline" size="24" /></span>
              <span><b class="block">Informasi PPDB</b><small class="font-medium text-blue-100">Status dan alur pendaftaran</small></span>
              <Icon name="mdi:arrow-right" class="ml-auto" size="20" />
            </NuxtLink>
            <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="mb-1 flex items-center gap-3 rounded-xl px-4 py-3.5 font-semibold text-slate-700 transition-all hover:bg-school-sky hover:text-school-action" active-class="bg-school-sky text-school-action" @click="closeMenu">
              <Icon :name="item.icon" size="22" /><span>{{ item.label }}</span><Icon name="mdi:chevron-right" class="ml-auto text-muted" size="20" />
            </NuxtLink>
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
