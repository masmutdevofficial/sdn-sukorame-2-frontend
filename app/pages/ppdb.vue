<script setup lang="ts">
import { school } from '~/data/dummy/content'
import { defaultSitePages } from '~/data/dummy/site-pages'
import { sitePageRepository } from '~/repositories/dummy/site-page.repository'

const page = ref(structuredClone(defaultSitePages.find(item => item.slug === 'ppdb')!))

type RegistrationStatus = 'upcoming' | 'open' | 'selection' | 'closed'

const registrationStatus = ref<RegistrationStatus>('upcoming')

const statusOrder: RegistrationStatus[] = ['upcoming', 'open', 'selection', 'closed']
const statuses: Record<RegistrationStatus, {
  label: string
  title: string
  description: string
  icon: string
  tone: string
}> = {
  upcoming: {
    label: 'Belum Dimulai',
    title: 'Pendaftaran peserta didik baru belum dimulai',
    description: 'Jadwal resmi dan tautan formulir akan ditampilkan di halaman ini setelah ditetapkan oleh sekolah.',
    icon: 'mdi:clock-outline',
    tone: 'bg-amber-100 text-amber-900',
  },
  open: {
    label: 'Pendaftaran Dibuka',
    title: 'Pendaftaran peserta didik baru sedang dibuka',
    description: 'Calon orang tua atau wali dapat mengisi formulir dan menyiapkan dokumen sesuai ketentuan sekolah.',
    icon: 'mdi:door-open',
    tone: 'bg-emerald-100 text-emerald-800',
  },
  selection: {
    label: 'Verifikasi Data',
    title: 'Pendaftaran telah masuk tahap verifikasi',
    description: 'Sekolah sedang memeriksa kelengkapan data pendaftar. Informasi berikutnya akan diumumkan melalui kanal resmi.',
    icon: 'mdi:file-search-outline',
    tone: 'bg-blue-100 text-blue-800',
  },
  closed: {
    label: 'Pendaftaran Selesai',
    title: 'Periode pendaftaran telah selesai',
    description: 'Terima kasih atas partisipasinya. Silakan menunggu pengumuman resmi atau menghubungi sekolah untuk informasi lanjutan.',
    icon: 'mdi:check-decagram-outline',
    tone: 'bg-slate-200 text-slate-700',
  },
}

const currentStatus = computed(() => statuses[registrationStatus.value])
const currentStatusIndex = computed(() => statusOrder.indexOf(registrationStatus.value))

const steps = [
  { number: '01', title: 'Pantau pengumuman', text: 'Periksa jadwal dan ketentuan resmi pada halaman PPDB atau papan informasi sekolah.', icon: 'mdi:calendar-search' },
  { number: '02', title: 'Siapkan dokumen', text: 'Persiapkan dokumen calon peserta didik sesuai daftar yang telah dikonfirmasi sekolah.', icon: 'mdi:file-document-multiple-outline' },
  { number: '03', title: 'Isi formulir', text: 'Isi data dengan benar melalui formulir yang tersedia ketika pendaftaran dibuka.', icon: 'mdi:form-select' },
  { number: '04', title: 'Verifikasi sekolah', text: 'Ikuti proses pemeriksaan berkas dan pantau pemberitahuan selanjutnya dari sekolah.', icon: 'mdi:shield-check-outline' },
]

const requirements = [
  'Salinan akta kelahiran calon peserta didik',
  'Salinan Kartu Keluarga',
  'Identitas orang tua atau wali',
  'Pas foto calon peserta didik',
  'Dokumen pendukung lain jika dipersyaratkan',
]

const faqs = [
  { question: 'Kapan PPDB mulai dibuka?', answer: 'Jadwal resmi belum diumumkan. Informasi tanggal akan diperbarui di halaman ini setelah dikonfirmasi oleh sekolah.' },
  { question: 'Apakah pendaftaran sudah dapat dilakukan secara online?', answer: 'Belum. Tautan formulir hanya akan muncul ketika status pendaftaran telah dibuka.' },
  { question: 'Ke mana saya dapat meminta informasi?', answer: `Silakan menghubungi sekolah melalui email ${school.email} atau datang ke alamat sekolah pada jam layanan.` },
]

useSchoolSeo(() => page.value.title, () => page.value.excerpt)
onMounted(async () => {
  const savedPage = await sitePageRepository.getBySlug('ppdb')
  if (savedPage) page.value = savedPage
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-school-navy py-16 text-white lg:py-24">
      <div class="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div class="absolute -right-20 -top-24 size-80 rounded-full bg-school-blue/30 blur-3xl" aria-hidden="true" />
      <div class="absolute -bottom-28 left-1/4 size-72 rounded-full bg-school-yellow/15 blur-3xl" aria-hidden="true" />

      <div class="container-school relative grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
        <div class="hero-enter">
          <div class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
            <Icon name="mdi:account-school-outline" size="20" class="text-school-yellow" />
            {{ page.eyebrow }}
          </div>
          <h1 class="font-display mt-6 text-5xl leading-tight sm:text-6xl lg:text-7xl">{{ page.title }}</h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-blue-100">{{ page.excerpt }}</p><p v-if="page.body && page.body !== page.excerpt" class="mt-3 max-w-2xl leading-7 text-blue-100">{{ page.body }}</p>

          <div class="mt-8 flex flex-wrap gap-3">
            <span :class="currentStatus.tone" class="inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold">
              <Icon :name="currentStatus.icon" size="22" />
              {{ currentStatus.label }}
            </span>
            <a href="#alur" class="btn border border-white/25 bg-white/10 text-white hover:bg-white/15">Lihat alur <Icon name="mdi:arrow-down" /></a>
          </div>
        </div>

        <div class="hero-visual relative">
          <div class="rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
            <div class="rounded-[1.5rem] bg-white p-7 text-ink sm:p-9">
              <img v-if="page.image" :src="page.image" :alt="page.imageAlt" class="mb-6 h-40 w-full rounded-xl bg-slate-50 object-contain">
              <div class="flex items-start justify-between gap-4">
                <span class="grid size-16 place-items-center rounded-2xl bg-amber-100 text-amber-700"><Icon :name="currentStatus.icon" size="34" /></span>
                <span class="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted">Status saat ini</span>
              </div>
              <h2 class="mt-7 text-2xl font-bold leading-9 text-school-navy">{{ currentStatus.title }}</h2>
              <p class="mt-3 leading-7 text-muted">{{ currentStatus.description }}</p>
              <div class="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div class="flex gap-3">
                  <Icon name="mdi:information-outline" size="24" class="shrink-0 text-amber-700" />
                  <p class="text-sm leading-6 text-amber-900"><b>Jadwal belum diumumkan.</b> Halaman akan diperbarui setelah informasi resmi tersedia.</p>
                </div>
              </div>
              <button type="button" disabled class="mt-6 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-slate-200 px-5 py-4 font-bold text-slate-500">
                <Icon name="mdi:lock-outline" size="21" /> Formulir belum tersedia
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-line bg-white py-8" aria-label="Tahapan status PPDB">
      <div class="container-school grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(statusKey, index) in statusOrder" :key="statusKey" class="flex items-center gap-3 rounded-2xl p-3" :class="index === currentStatusIndex ? 'bg-school-sky' : 'bg-slate-50'">
          <span class="grid size-10 shrink-0 place-items-center rounded-full font-bold" :class="index === currentStatusIndex ? 'bg-school-action text-white' : index < currentStatusIndex ? 'bg-school-green text-white' : 'bg-white text-muted'">
            <Icon v-if="index < currentStatusIndex" name="mdi:check" size="19" />
            <span v-else>{{ index + 1 }}</span>
          </span>
          <div><p class="text-[11px] font-bold uppercase tracking-wider text-muted">Tahap {{ index + 1 }}</p><p class="text-sm font-bold text-school-navy">{{ statuses[statusKey].label }}</p></div>
        </div>
      </div>
    </section>

    <section id="alur" class="container-school scroll-mt-36 py-16 lg:py-20">
      <div class="max-w-2xl">
        <p class="font-hand text-3xl font-bold text-school-action">Langkah Pendaftaran</p>
        <h2 class="font-display mt-2 text-4xl text-school-navy sm:text-5xl">Alur yang mudah dipahami</h2>
        <p class="mt-5 leading-7 text-muted">Alur ini merupakan gambaran awal. Ketentuan akhir mengikuti pengumuman resmi sekolah.</p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <article v-for="step in steps" :key="step.number" class="interactive-card card relative overflow-hidden p-6">
          <span class="absolute right-4 top-2 font-display text-6xl text-school-sky" aria-hidden="true">{{ step.number }}</span>
          <span class="icon-bubble relative grid size-14 place-items-center rounded-2xl bg-school-sky text-school-action"><Icon :name="step.icon" size="29" /></span>
          <h3 class="relative mt-7 text-lg font-bold text-school-navy">{{ step.title }}</h3>
          <p class="relative mt-3 text-sm leading-6 text-muted">{{ step.text }}</p>
        </article>
      </div>
    </section>

    <section class="bg-white py-16 lg:py-20">
      <div class="container-school grid gap-8 lg:grid-cols-[1fr_.85fr]">
        <div class="rounded-[2rem] bg-school-sky p-7 sm:p-10">
          <p class="font-hand text-3xl font-bold text-school-action">Persiapan Berkas</p>
          <h2 class="font-display mt-2 text-4xl text-school-navy">Contoh dokumen yang disiapkan</h2>
          <p class="mt-4 leading-7 text-muted">Daftar berikut belum menjadi persyaratan final dan harus dikonfirmasi kembali ketika pengumuman resmi diterbitkan.</p>
          <ul class="mt-7 grid gap-3 sm:grid-cols-2">
            <li v-for="item in requirements" :key="item" class="flex gap-3 rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-school-navy">
              <Icon name="mdi:check-circle" size="22" class="shrink-0 text-school-green" />{{ item }}
            </li>
          </ul>
        </div>

        <aside class="rounded-[2rem] bg-school-navy p-7 text-white sm:p-10">
          <span class="grid size-14 place-items-center rounded-2xl bg-white/10 text-school-yellow"><Icon name="mdi:map-marker-outline" size="30" /></span>
          <h2 class="font-display mt-6 text-3xl">Layanan informasi sekolah</h2>
          <p class="mt-4 leading-7 text-blue-100">Informasi PPDB dapat dikonfirmasi langsung melalui kanal resmi sekolah.</p>
          <div class="mt-7 space-y-5 text-sm">
            <div class="flex gap-3"><Icon name="mdi:map-marker" size="21" class="shrink-0 text-school-yellow" /><span>{{ school.address }}, Kode Pos {{ school.postal }}</span></div>
            <div class="flex gap-3"><Icon name="mdi:email-outline" size="21" class="shrink-0 text-school-yellow" /><a :href="`mailto:${school.email}`" class="break-all hover:underline">{{ school.email }}</a></div>
          </div>
          <NuxtLink to="/kontak" class="btn mt-8 w-full bg-white text-school-navy">Buka halaman kontak <Icon name="mdi:arrow-right" /></NuxtLink>
        </aside>
      </div>
    </section>

    <section class="container-school py-16 lg:py-20">
      <div class="text-center"><p class="font-hand text-3xl font-bold text-school-action">Pertanyaan Umum</p><h2 class="font-display mt-2 text-4xl text-school-navy">Informasi yang perlu diketahui</h2></div>
      <div class="mx-auto mt-9 grid max-w-4xl gap-4">
        <details v-for="item in faqs" :key="item.question" class="group card p-5 open:border-school-action/30 open:shadow-lg open:shadow-school-navy/5">
          <summary class="flex cursor-pointer list-none items-center gap-4 font-bold text-school-navy">
            <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-school-sky text-school-action"><Icon name="mdi:help" size="21" /></span>
            <span>{{ item.question }}</span>
            <Icon name="mdi:chevron-down" class="ml-auto transition-transform group-open:rotate-180" size="22" />
          </summary>
          <p class="ml-14 mt-4 leading-7 text-muted">{{ item.answer }}</p>
        </details>
      </div>
    </section>
  </div>
</template>
