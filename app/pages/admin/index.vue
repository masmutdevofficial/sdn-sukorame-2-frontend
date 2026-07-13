<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useSeoMeta({ title: 'Dashboard Admin', robots: 'noindex, nofollow' })

const { account } = useAdminAccount()
const { modules, loading } = await useSchoolModules()
const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 1000) })
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

const wibTime = computed(() => new Intl.DateTimeFormat('id-ID', {
  timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false,
}).format(now.value))
const wibDate = computed(() => new Intl.DateTimeFormat('id-ID', {
  timeZone: 'Asia/Jakarta', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
}).format(now.value))
const hour = computed(() => Number(new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Jakarta', hour: '2-digit', hour12: false,
}).format(now.value)))
const greeting = computed(() => hour.value < 11 ? 'Selamat pagi' : hour.value < 15 ? 'Selamat siang' : hour.value < 18 ? 'Selamat sore' : 'Selamat malam')

const menus = [
  { label: 'Beranda', description: 'Atur tampilan halaman utama', to: '/admin/halaman/beranda', icon: 'mdi:home-edit-outline', tone: 'blue' },
  { label: 'Profil', description: 'Profil sekolah dan guru', to: '/admin/profil', icon: 'mdi:school-outline', tone: 'violet' },
  { label: 'Akademik', description: 'Dokumen dan kurikulum', to: '/admin/akademik', icon: 'mdi:file-pdf-box', tone: 'red' },
  { label: 'Kesiswaan', description: 'Kegiatan para siswa', to: '/admin/kesiswaan', icon: 'mdi:account-group-outline', tone: 'emerald' },
  { label: 'Informasi', description: 'Berita dan pengumuman', to: '/admin/informasi', icon: 'mdi:newspaper-variant-outline', tone: 'amber' },
  { label: 'Galeri', description: 'Koleksi foto sekolah', to: '/admin/galeri', icon: 'mdi:image-multiple-outline', tone: 'pink' },
  { label: 'Kontak', description: 'Alamat dan informasi kontak', to: '/admin/kontak', icon: 'mdi:map-marker-outline', tone: 'cyan' },
  { label: 'SPMB', description: 'Informasi penerimaan siswa', to: '/admin/ppdb', icon: 'mdi:account-school-outline', tone: 'indigo' },
] as const

const publishedInformation = computed(() => modules.value.informationItems.filter(item => item.status === 'published').length)
const publishedGallery = computed(() => modules.value.gallery.filter(item => item.status === 'published').length)
const publishedActivities = computed(() => modules.value.studentActivities.filter(item => item.status === 'published').length)
const draftCount = computed(() => [
  ...modules.value.informationItems,
  ...modules.value.gallery,
  ...modules.value.studentActivities,
  ...modules.value.academicDocuments,
].filter(item => item.status === 'draft').length)
const summary = computed(() => [
  { label: 'Informasi tayang', value: publishedInformation.value, icon: 'mdi:newspaper-variant-outline', tone: 'blue' },
  { label: 'Foto galeri', value: publishedGallery.value, icon: 'mdi:image-check-outline', tone: 'pink' },
  { label: 'Kegiatan siswa', value: publishedActivities.value, icon: 'mdi:account-group-outline', tone: 'emerald' },
  { label: 'Konten draft', value: draftCount.value, icon: 'mdi:file-document-edit-outline', tone: 'amber' },
])
</script>

<template>
  <div class="dashboard-shell">
    <section class="hero-panel">
      <div class="hero-orb hero-orb-one" /><div class="hero-orb hero-orb-two" />
      <div class="relative z-10 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur">
            <span class="size-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,.14)]" />
            Panel admin aktif
          </div>
          <p class="text-sm font-semibold text-blue-200">{{ greeting }},</p>
          <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{{ account.name }}</h1>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">Kelola informasi sekolah dari satu tempat dan pastikan konten yang dilihat wali murid selalu terbaru.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <NuxtLink to="/admin/informasi" class="hero-primary"><Icon name="mdi:plus" size="19" /> Tambah informasi</NuxtLink>
            <NuxtLink to="/" target="_blank" class="hero-secondary"><Icon name="mdi:open-in-new" size="18" /> Lihat website</NuxtLink>
          </div>
        </div>
        <div class="time-card">
          <div class="flex items-center justify-between gap-8 text-blue-100"><span class="text-xs font-semibold uppercase tracking-[.16em]">Waktu sekolah</span><Icon name="mdi:weather-sunny" class="text-school-yellow" size="20" /></div>
          <p class="mt-3 font-mono text-4xl font-bold tracking-tight text-white">{{ wibTime }}</p>
          <p class="mt-1 max-w-52 text-xs leading-5 text-blue-100">{{ wibDate }} · WIB</p>
        </div>
      </div>
    </section>

    <section class="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4" aria-label="Ringkasan konten">
      <article v-for="item in summary" :key="item.label" class="summary-card" :class="`tone-${item.tone}`">
        <span class="summary-icon"><Icon :name="item.icon" size="22" /></span>
        <div><p class="text-2xl font-extrabold leading-none text-slate-900">{{ loading ? '—' : item.value }}</p><p class="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm">{{ item.label }}</p></div>
      </article>
    </section>

    <section class="mt-8">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div><p class="section-kicker">Pengelolaan konten</p><h2 class="mt-1 text-xl font-extrabold text-school-navy sm:text-2xl">Pilih bagian yang ingin dikelola</h2></div>
        <p class="hidden text-sm text-slate-500 sm:block">{{ menus.length }} modul tersedia</p>
      </div>
      <div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <NuxtLink v-for="menu in menus" :key="menu.to" :to="menu.to" class="module-card" :class="`tone-${menu.tone}`">
          <div class="flex items-start justify-between gap-4"><span class="module-icon"><Icon :name="menu.icon" size="24" /></span><span class="module-arrow"><Icon name="mdi:arrow-top-right" size="18" /></span></div>
          <h3 class="mt-5 font-bold text-slate-900">{{ menu.label }}</h3>
          <p class="mt-1 text-xs leading-5 text-slate-500">{{ menu.description }}</p>
        </NuxtLink>
      </div>
    </section>

    <section class="mt-8 grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
      <div class="card overflow-hidden p-5 sm:p-6">
        <div class="flex items-center justify-between"><div><p class="section-kicker">Status konten</p><h2 class="mt-1 text-lg font-bold text-school-navy">Ringkasan publikasi</h2></div><Icon name="mdi:chart-donut" size="28" class="text-school-action" /></div>
        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div><div class="flex justify-between text-xs"><span class="font-semibold text-slate-600">Informasi</span><span>{{ publishedInformation }}/{{ modules.informationItems.length }}</span></div><div class="progress-track"><span class="bg-blue-500" :style="{ width: `${modules.informationItems.length ? publishedInformation / modules.informationItems.length * 100 : 0}%` }" /></div></div>
          <div><div class="flex justify-between text-xs"><span class="font-semibold text-slate-600">Galeri</span><span>{{ publishedGallery }}/{{ modules.gallery.length }}</span></div><div class="progress-track"><span class="bg-pink-500" :style="{ width: `${modules.gallery.length ? publishedGallery / modules.gallery.length * 100 : 0}%` }" /></div></div>
          <div><div class="flex justify-between text-xs"><span class="font-semibold text-slate-600">Kegiatan</span><span>{{ publishedActivities }}/{{ modules.studentActivities.length }}</span></div><div class="progress-track"><span class="bg-emerald-500" :style="{ width: `${modules.studentActivities.length ? publishedActivities / modules.studentActivities.length * 100 : 0}%` }" /></div></div>
        </div>
      </div>
      <NuxtLink to="/admin/settings" class="settings-card">
        <span class="grid size-11 place-items-center rounded-xl bg-slate-900 text-white"><Icon name="mdi:shield-account-outline" size="23" /></span>
        <div class="min-w-0"><p class="font-bold text-slate-900">Pengaturan akun</p><p class="mt-1 truncate text-xs text-slate-500">{{ account.email }}</p></div>
        <Icon name="mdi:chevron-right" class="ml-auto text-slate-400" size="22" />
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.dashboard-shell{margin-inline:auto;max-width:1440px}.hero-panel{position:relative;overflow:hidden;border-radius:1.75rem;background:linear-gradient(128deg,#123a63 0%,#0b5f9f 58%,#168fe5 125%);padding:1.75rem;box-shadow:0 22px 55px rgba(18,58,99,.18)}.hero-panel::after{position:absolute;inset:0;content:"";background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:32px 32px;mask-image:linear-gradient(90deg,transparent,black)}.hero-orb{position:absolute;border-radius:999px;filter:blur(1px)}.hero-orb-one{right:-5rem;top:-7rem;width:20rem;height:20rem;background:rgba(72,180,255,.18)}.hero-orb-two{right:28%;bottom:-7rem;width:14rem;height:14rem;background:rgba(246,201,69,.09)}.hero-primary,.hero-secondary{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:.85rem;padding:.72rem 1rem;font-size:.8rem;font-weight:700;transition:.2s ease}.hero-primary{background:white;color:#123a63;box-shadow:0 8px 22px rgba(4,31,58,.16)}.hero-secondary{border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.09);color:white;backdrop-filter:blur(8px)}.hero-primary:hover,.hero-secondary:hover{transform:translateY(-2px)}.time-card{min-width:15rem;border:1px solid rgba(255,255,255,.15);border-radius:1.25rem;background:rgba(255,255,255,.09);padding:1.15rem 1.25rem;backdrop-filter:blur(10px)}.summary-card{display:flex;align-items:center;gap:.85rem;border:1px solid #e7edf3;border-radius:1.15rem;background:white;padding:1rem;box-shadow:0 5px 18px rgba(15,23,42,.035)}.summary-icon,.module-icon{display:grid;place-items:center;flex:none;border-radius:.85rem}.summary-icon{width:2.75rem;height:2.75rem}.section-kicker{font-size:.7rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:#0e78c7}.module-card{position:relative;overflow:hidden;border:1px solid #e7edf3;border-radius:1.15rem;background:white;padding:1.15rem;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}.module-card::after{position:absolute;right:-2rem;bottom:-3rem;width:7rem;height:7rem;border-radius:999px;background:currentColor;content:"";opacity:.035;transition:transform .3s ease}.module-card:hover{transform:translateY(-4px);border-color:color-mix(in srgb,currentColor 28%,#e7edf3);box-shadow:0 16px 32px rgba(15,23,42,.08)}.module-card:hover::after{transform:scale(1.25)}.module-icon{width:2.8rem;height:2.8rem}.module-arrow{display:grid;width:2rem;height:2rem;place-items:center;border:1px solid #e9eef3;border-radius:999px;color:#94a3b8;transition:.25s ease}.module-card:hover .module-arrow{transform:rotate(45deg);border-color:currentColor;color:inherit}.tone-blue{color:#1676c4}.tone-blue :is(.summary-icon,.module-icon){background:#eaf5ff}.tone-violet{color:#7c3aed}.tone-violet .module-icon{background:#f3eefe}.tone-red{color:#dc3d4b}.tone-red .module-icon{background:#fff0f1}.tone-emerald{color:#15915a}.tone-emerald :is(.summary-icon,.module-icon){background:#e9f9f1}.tone-amber{color:#b77905}.tone-amber :is(.summary-icon,.module-icon){background:#fff7df}.tone-pink{color:#d33d83}.tone-pink :is(.summary-icon,.module-icon){background:#fff0f7}.tone-cyan{color:#0786a1}.tone-cyan .module-icon{background:#e9faff}.tone-indigo{color:#4f5fd4}.tone-indigo .module-icon{background:#eef0ff}.progress-track{height:.45rem;margin-top:.65rem;overflow:hidden;border-radius:999px;background:#edf2f7}.progress-track span{display:block;height:100%;border-radius:inherit;transition:width .5s ease}.settings-card{display:flex;align-items:center;gap:.85rem;border:1px solid #e7edf3;border-radius:1.25rem;background:white;padding:1.25rem;transition:.2s ease}.settings-card:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(15,23,42,.07)}@media(min-width:640px){.hero-panel{padding:2.4rem}.summary-card{padding:1.15rem}}@media(max-width:430px){.summary-card{align-items:flex-start;flex-direction:column}.time-card{min-width:100%;width:100%}}
</style>
