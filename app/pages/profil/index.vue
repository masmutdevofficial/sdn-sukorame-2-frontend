<script setup lang="ts">
import { A11y, Autoplay, FreeMode, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import { school } from '~/data/dummy/content'

useSchoolSeo('Profil Sekolah', `Identitas lengkap, visi, pendidik, dan informasi ${school.fullName}.`)
useSchemaOrg([defineOrganization({ name: school.fullName, email: school.email })])

const identities = [
  { label: 'Nama Sekolah', value: school.name, icon: 'mdi:school-outline' },
  { label: 'NPSN', value: school.npsn, icon: 'mdi:identifier' },
  { label: 'NSS', value: school.nss, icon: 'mdi:file-document-outline' },
  { label: 'NIS', value: school.nis, icon: 'mdi:card-account-details-outline' },
  { label: 'Jenjang', value: 'Sekolah Dasar', icon: 'mdi:stairs' },
  { label: 'Status', value: 'Negeri', icon: 'mdi:shield-check-outline' },
  { label: 'Tahun Berdiri', value: school.founded, icon: 'mdi:calendar-star' },
  { label: 'Kepala Sekolah', value: school.headmaster, icon: 'mdi:account-tie-outline' },
]

const educators = [
  { role: 'Kepala Sekolah', name: school.headmaster },
  { role: 'Guru Kelas I', name: 'Belum diatur' },
  { role: 'Guru Kelas II', name: 'Belum diatur' },
  { role: 'Guru Kelas III', name: 'Belum diatur' },
  { role: 'Guru Kelas IV', name: 'Belum diatur' },
  { role: 'Guru Kelas V', name: 'Belum diatur' },
  { role: 'Guru Kelas VI', name: 'Belum diatur' },
  { role: 'Guru Mata Pelajaran', name: 'Belum diatur' },
  { role: 'Tenaga Kependidikan', name: 'Belum diatur' },
]

const educatorCarouselModules = [A11y, Autoplay, FreeMode, Keyboard]
const prefersReducedMotion = ref(false)
let motionPreference: MediaQueryList | undefined

const syncMotionPreference = (event: MediaQueryList | MediaQueryListEvent) => {
  prefersReducedMotion.value = event.matches
}

const educatorAutoplay = computed(() => prefersReducedMotion.value
  ? false
  : {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
)

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncMotionPreference(motionPreference)
  motionPreference.addEventListener('change', syncMotionPreference)
})

onBeforeUnmount(() => {
  motionPreference?.removeEventListener('change', syncMotionPreference)
})

const sakti = [
  { letter: 'S', title: 'Selaras dengan Alam', text: 'Menumbuhkan kepedulian dan tanggung jawab terhadap lingkungan.', color: 'bg-emerald-50 text-emerald-700' },
  { letter: 'A', title: 'Berakhlak Mulia', text: 'Membiasakan sikap santun, jujur, disiplin, dan bertanggung jawab.', color: 'bg-rose-50 text-rose-700' },
  { letter: 'K', title: 'Kritis', text: 'Mengembangkan rasa ingin tahu dan kemampuan memecahkan masalah.', color: 'bg-amber-50 text-amber-700' },
  { letter: 'T', title: 'Terampil', text: 'Menguatkan kecakapan belajar dan keterampilan dalam kehidupan sehari-hari.', color: 'bg-blue-50 text-blue-700' },
  { letter: 'I', title: 'Inovatif', text: 'Memberi ruang untuk gagasan, kreativitas, dan karya baru.', color: 'bg-violet-50 text-violet-700' },
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-school-sky py-16 lg:py-20">
      <div class="hero-grid absolute inset-0" aria-hidden="true" />
      <div class="container-school relative">
        <p class="font-semibold text-school-action">Profil / Identitas Sekolah</p>
        <div class="mt-4 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div><h1 class="font-display text-5xl leading-tight text-school-navy sm:text-6xl">{{ school.fullName }}</h1><p class="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Sekolah dasar negeri di Kelurahan Sukorame, Kecamatan Mojoroto, Kota Kediri, dengan identitas pendidikan Sekolah SAKTI.</p></div>
          <div class="rounded-2xl bg-white p-5 shadow-sm"><span class="text-xs font-bold uppercase tracking-wider text-muted">Nama pendek</span><b class="mt-1 block text-xl text-school-navy">SDN Sukorame 2</b></div>
        </div>
      </div>
    </section>

    <nav class="sticky top-18 z-30 border-b border-line bg-white/95 backdrop-blur" aria-label="Navigasi profil">
      <div class="container-school flex gap-6 overflow-x-auto py-4 text-sm font-bold text-school-navy"><a href="#identitas" class="whitespace-nowrap hover:text-school-action">Identitas</a><a href="#sejarah" class="whitespace-nowrap hover:text-school-action">Sejarah</a><a href="#visi-misi" class="whitespace-nowrap hover:text-school-action">Visi & Misi</a><a href="#sakti" class="whitespace-nowrap hover:text-school-action">Nilai SAKTI</a><a href="#pendidik" class="whitespace-nowrap hover:text-school-action">Pendidik</a></div>
    </nav>

    <section id="identitas" class="container-school scroll-mt-36 py-16 lg:py-20">
      <div class="grid gap-10 lg:grid-cols-[.78fr_1.22fr]">
        <div><p class="font-hand text-3xl font-bold text-school-action">Data Pokok Sekolah</p><h2 class="font-display mt-2 text-4xl text-school-navy">Identitas administratif</h2><p class="mt-5 leading-7 text-muted">Data berikut merupakan identitas sekolah yang telah dikonfirmasi dan menjadi rujukan pada website.</p>
          <div class="card mt-7 p-6"><div class="flex gap-4"><Icon name="mdi:map-marker-outline" size="28" class="shrink-0 text-school-action"/><div><b class="text-school-navy">Alamat Sekolah</b><p class="mt-2 leading-7 text-muted">Jalan Himalaya No. 2, Kelurahan Sukorame<br>Kecamatan Mojoroto, Kota Kediri<br>Kode Pos {{ school.postal }}</p></div></div><div class="mt-5 flex gap-4 border-t border-line pt-5"><Icon name="mdi:email-outline" size="26" class="shrink-0 text-school-action"/><div><b class="text-school-navy">Email</b><a :href="`mailto:${school.email}`" class="mt-1 block break-all text-school-action hover:underline">{{ school.email }}</a></div></div></div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2"><article v-for="item in identities" :key="item.label" class="interactive-card card flex items-start gap-4 p-5"><span class="grid size-11 shrink-0 place-items-center rounded-xl bg-school-sky text-school-action"><Icon :name="item.icon" size="23"/></span><div><p class="text-xs font-bold uppercase tracking-wider text-muted">{{ item.label }}</p><p class="mt-1 font-bold leading-6 text-school-navy">{{ item.value }}</p></div></article></div>
      </div>
    </section>

    <section id="sejarah" class="scroll-mt-36 bg-white py-16 lg:py-20">
      <div class="container-school grid items-center gap-10 lg:grid-cols-[.7fr_1.3fr]"><div class="relative mx-auto grid aspect-square w-full max-w-xs place-items-center rounded-[2rem] bg-school-navy text-white"><span class="font-display text-7xl">1957</span><span class="absolute bottom-8 text-sm font-semibold text-blue-100">Tahun berdiri</span><div class="absolute -right-4 -top-4 size-20 rounded-2xl bg-school-yellow/90"></div></div><div><p class="font-hand text-3xl font-bold text-school-action">Riwayat Sekolah</p><h2 class="font-display mt-2 text-4xl text-school-navy">Bagian dari pendidikan Kota Kediri sejak 1957</h2><p class="mt-6 leading-8 text-muted">SD Negeri Sukorame 2 berdiri pada tahun 1957 dan menyelenggarakan pendidikan dasar bagi masyarakat Kelurahan Sukorame dan wilayah sekitarnya. Dokumentasi sejarah yang lebih rinci akan diperbarui berdasarkan arsip resmi sekolah.</p><p class="mt-4 rounded-xl border-l-4 border-school-yellow bg-amber-50 p-4 text-sm leading-6 text-amber-900">Website tidak menampilkan informasi sejarah yang belum terverifikasi sebagai fakta resmi.</p></div></div>
    </section>

    <section id="visi-misi" class="container-school scroll-mt-36 py-16 lg:py-20">
      <div class="text-center"><p class="font-hand text-3xl font-bold text-school-action">Arah Pendidikan</p><h2 class="font-display mt-2 text-4xl text-school-navy">Visi dan Misi</h2></div>
      <div class="mt-10 grid gap-6 lg:grid-cols-2"><article class="relative overflow-hidden rounded-[1.5rem] bg-school-navy p-8 text-white"><Icon name="mdi:eye-outline" size="40" class="text-school-yellow"/><p class="mt-6 text-xs font-bold uppercase tracking-[.2em] text-blue-200">Visi Sekolah</p><blockquote class="font-display mt-3 text-2xl leading-10">“{{ school.vision }}”</blockquote></article><article class="card p-8"><Icon name="mdi:target-arrow" size="40" class="text-school-action"/><h3 class="mt-5 text-xl font-bold text-school-navy">Misi Sekolah</h3><p class="mt-4 leading-7 text-muted">Dokumen rumusan misi resmi belum tersedia pada data awal website. Bagian ini telah disiapkan untuk diperbarui melalui admin setelah dokumen resmi sekolah dikonfirmasi.</p><div class="mt-5 rounded-xl bg-school-sky p-4 text-sm font-semibold text-school-navy">Arah pelaksanaan saat ini tercermin melalui lima nilai utama Sekolah SAKTI.</div></article></div>
    </section>

    <section id="sakti" class="scroll-mt-36 bg-white py-16 lg:py-20"><div class="container-school"><div class="max-w-2xl"><p class="font-hand text-3xl font-bold text-school-action">Identitas Pendidikan</p><h2 class="font-display mt-2 text-4xl text-school-navy">Makna Sekolah SAKTI</h2></div><div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"><article v-for="item in sakti" :key="item.letter" class="interactive-card card p-5"><span :class="item.color" class="grid size-12 place-items-center rounded-2xl font-display text-2xl">{{ item.letter }}</span><h3 class="mt-5 font-bold text-school-navy">{{ item.title }}</h3><p class="mt-2 text-sm leading-6 text-muted">{{ item.text }}</p></article></div></div></section>

    <section id="pendidik" class="container-school scroll-mt-36 overflow-hidden py-16 lg:py-20">
      <div class="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p class="font-hand text-3xl font-bold text-school-action">Warga Sekolah</p>
          <h2 class="font-display mt-2 text-4xl text-school-navy">Pendidik dan Tenaga Kependidikan</h2>
        </div>
        <span class="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-900">Data nama akan dilengkapi melalui admin</span>
      </div>
      <p class="mt-5 max-w-3xl leading-7 text-muted">Struktur berikut menampilkan fungsi pendidik tanpa mempublikasikan data pribadi yang belum dikonfirmasi.</p>

      <Swiper
        :modules="educatorCarouselModules"
        :slides-per-view="1.12"
        :space-between="16"
        :loop="true"
        :loop-additional-slides="3"
        :speed="prefersReducedMotion ? 500 : 5000"
        :autoplay="educatorAutoplay"
        :free-mode="{ enabled: true, momentum: true, momentumBounce: false, sticky: false }"
        :keyboard="{ enabled: true, onlyInViewport: true }"
        :a11y="{
          enabled: true,
          containerMessage: 'Daftar pendidik dan tenaga kependidikan SD Negeri Sukorame 2',
          slideLabelMessage: '{{index}} dari {{slidesLength}}',
        }"
        :grab-cursor="true"
        :breakpoints="{
          640: { slidesPerView: 2.05, spaceBetween: 18 },
          1024: { slidesPerView: 3.05, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 20 },
        }"
        class="educator-swiper mt-10"
      >
        <SwiperSlide v-for="person in educators" :key="person.role">
          <article class="interactive-card card group flex h-full flex-col overflow-hidden">
            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <NuxtImg src="/images/no-image.png" :alt="`Foto ${person.role} belum tersedia`" width="512" height="512" loading="lazy" class="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105" />
              <Icon name="mdi:star-four-points" size="18" class="absolute right-4 top-4 text-school-yellow" aria-hidden="true" />
            </div>
            <div class="border-t border-line p-5">
              <p class="text-xs font-bold uppercase tracking-wider text-muted">{{ person.role }}</p>
              <h3 class="mt-1 font-bold text-school-navy">{{ person.name }}</h3>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>

      <div class="mt-3 flex items-center gap-2 text-sm font-medium text-muted">
        <Icon name="mdi:gesture-swipe-horizontal" size="20" class="text-school-action" aria-hidden="true" />
        <span>Geser bebas untuk melihat seluruh susunan pendidik.</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.educator-swiper {
  padding: 0.25rem 0.25rem 1rem;
}

:deep(.educator-swiper .swiper-wrapper) {
  align-items: stretch;
  transition-timing-function: linear !important;
}

:deep(.educator-swiper .swiper-slide) {
  height: auto;
}

@media (prefers-reduced-motion: reduce) {
  :deep(.educator-swiper .swiper-wrapper) {
    transition-duration: 0.5s !important;
  }
}
</style>
