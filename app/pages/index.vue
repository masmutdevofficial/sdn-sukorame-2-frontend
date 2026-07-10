<script setup lang="ts">
import { school, news, programs } from '~/data/dummy/content'
useSchoolSeo('Beranda', school.tagline)
useSchemaOrg([defineOrganization({ name: school.fullName }), defineWebSite({ name: school.fullName })])
const values=[
  {letter:'S',label:'Selaras dengan Alam',icon:'mdi:leaf',tone:'bg-emerald-50 text-emerald-700'},
  {letter:'A',label:'Berakhlak Mulia',icon:'mdi:heart-outline',tone:'bg-rose-50 text-rose-700'},
  {letter:'K',label:'Kritis',icon:'mdi:head-lightbulb-outline',tone:'bg-amber-50 text-amber-700'},
  {letter:'T',label:'Terampil',icon:'mdi:tools',tone:'bg-blue-50 text-blue-700'},
  {letter:'I',label:'Inovatif',icon:'mdi:rocket-launch-outline',tone:'bg-violet-50 text-violet-700'},
]
const welcomeMessages=[
  'SD Negeri Sukorame 2 Kota Kediri — NPSN 20534301',
  'Sekolah SAKTI: Selaras dengan Alam, Berakhlak Mulia, Kritis, Terampil, dan Inovatif',
  'Jalan Himalaya No. 2, Kelurahan Sukorame, Kecamatan Mojoroto, Kota Kediri',
]
</script>

<template>
  <div class="overflow-hidden">
    <section class="relative min-h-[690px] overflow-hidden bg-[#f4faff]">
      <div class="hero-grid absolute inset-0" aria-hidden="true" />
      <div class="absolute -left-24 top-28 size-72 rounded-full bg-school-blue/10 blur-3xl" aria-hidden="true" />
      <div class="absolute -right-28 -top-20 size-96 rounded-full bg-school-yellow/20 blur-3xl" aria-hidden="true" />
      <div class="container-school relative grid min-h-[690px] items-center gap-14 py-16 lg:grid-cols-[1.04fr_.96fr] lg:py-20">
        <div class="relative z-10">
          <div class="hero-enter inline-flex items-center gap-2 rounded-full border border-school-blue/15 bg-white/90 px-4 py-2 text-sm font-bold text-school-action shadow-sm">
            <span class="pulse-soft size-2 rounded-full bg-school-green" />
            NPSN 20534301 · Berdiri sejak 1957
          </div>
          <h1 class="hero-enter-delay font-display mt-7 max-w-3xl text-[2.8rem] leading-[1.04] tracking-[-.02em] text-school-navy sm:text-6xl lg:text-[4.35rem]">
            SD Negeri Sukorame 2<br><span class="relative text-school-action">Kota Kediri.<svg class="absolute -bottom-2 left-0 w-full text-school-yellow" viewBox="0 0 300 12" fill="none" aria-hidden="true"><path d="M3 8C73 2 190 2 297 7" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg></span>
          </h1>
          <p class="hero-enter-delay mt-8 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">Mewujudkan generasi pembelajar sepanjang hayat yang selaras dengan alam, berakhlak mulia, kritis, terampil, serta inovatif.</p>
          <div class="hero-enter-delay mt-9 flex flex-wrap gap-3">
            <NuxtLink to="/profil" class="btn btn-primary">Profil sekolah <Icon name="mdi:arrow-right" /></NuxtLink>
            <NuxtLink to="/informasi/berita" class="btn btn-secondary"><Icon name="mdi:newspaper-variant-outline" /> Informasi sekolah</NuxtLink>
          </div>
          <div class="hero-enter-delay mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-school-navy/10 pt-6">
            <div><b class="font-display text-2xl text-school-navy">1957</b><p class="text-xs text-muted">Tahun berdiri</p></div>
            <div><b class="font-display text-2xl text-school-navy">SAKTI</b><p class="text-xs text-muted">Nilai utama</p></div>
            <div><b class="font-display text-2xl text-school-navy">Kediri</b><p class="text-xs text-muted">Kota pendidikan</p></div>
          </div>
        </div>

        <div class="hero-visual relative mx-auto w-full max-w-[520px] lg:mx-0">
          <div class="relative aspect-[.94] overflow-hidden rounded-[2.5rem] border-[10px] border-white bg-school-blue shadow-[0_35px_80px_rgba(18,58,99,.18)]">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.35),transparent_35%)]" />
            <div class="absolute inset-x-0 bottom-0 h-2/5 bg-school-navy/25" />
            <div class="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 text-white/95"><Icon name="mdi:school-outline" size="205" /></div>
            <div class="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 backdrop-blur">
              <p class="font-hand text-2xl font-bold text-school-action">Sekolah SAKTI</p>
              <p class="mt-1 text-xs leading-5 text-slate-600">Selaras dengan Alam · Berakhlak Mulia · Kritis · Terampil · Inovatif</p>
            </div>
          </div>
          <div class="float-slow absolute -left-5 top-14 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:-left-12"><div class="flex items-center gap-3"><span class="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><Icon name="mdi:leaf" size="22" /></span><span><b class="block text-sm text-school-navy">Ramah lingkungan</b><small class="text-muted">Belajar dari alam</small></span></div></div>
          <div class="float-reverse absolute -right-3 bottom-24 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:-right-10"><div class="flex items-center gap-3"><span class="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-700"><Icon name="mdi:lightbulb-on-outline" size="22" /></span><span><b class="block text-sm text-school-navy">Kreatif & inovatif</b><small class="text-muted">Berani berkarya</small></span></div></div>
        </div>
      </div>
    </section>

    <section class="border-y border-school-navy/10 bg-school-navy py-3.5 text-white" aria-label="Sambutan sekolah">
      <div class="overflow-hidden">
        <div class="ticker-track" tabindex="0">
          <div v-for="round in 2" :key="round" class="ticker-group" :aria-hidden="round === 2">
            <div v-for="(message,index) in welcomeMessages" :key="`${round}-${index}`" class="flex items-center gap-3 whitespace-nowrap text-sm sm:text-base">
              <Icon name="mdi:star-four-points" class="text-school-yellow" size="17" />
              <span :class="index === 0 ? 'font-bold text-white' : 'font-medium text-blue-100'">{{message}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container-school py-20 lg:py-28">
      <div class="reveal mx-auto max-w-2xl text-center"><p class="font-hand text-3xl font-bold text-school-action">Identitas karakter sekolah</p><h2 class="font-display mt-2 text-4xl text-school-navy sm:text-5xl">Nilai utama Sekolah SAKTI</h2><p class="mt-5 leading-7 text-muted">SAKTI merupakan identitas pendidikan SD Negeri Sukorame 2 yang menjadi dasar pembiasaan, pembelajaran, interaksi warga sekolah, dan kepedulian terhadap lingkungan.</p></div>
      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <article v-for="(value,index) in values" :key="value.letter" class="interactive-card reveal card relative overflow-hidden p-6" :style="`animation-range:entry ${index*2}% cover ${24+index*2}%`">
          <span class="absolute -right-2 -top-7 font-display text-[7rem] leading-none text-school-navy/[.035]">{{value.letter}}</span>
          <span :class="value.tone" class="icon-bubble grid size-12 place-items-center rounded-2xl"><Icon :name="value.icon" size="25" /></span>
          <b class="font-display mt-6 block text-4xl font-normal text-school-navy">{{value.letter}}</b><p class="mt-2 text-sm font-semibold leading-6">{{value.label}}</p>
        </article>
      </div>
    </section>

    <section class="relative bg-white py-20 lg:py-28">
      <div class="absolute inset-y-0 left-0 w-1/3 bg-school-sky/60" aria-hidden="true" />
      <div class="container-school relative grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div class="reveal"><p class="font-hand text-3xl font-bold text-school-action">Penyelenggaraan pendidikan</p><h2 class="font-display mt-2 text-4xl leading-tight text-school-navy sm:text-5xl">Program SD Negeri Sukorame 2</h2><p class="mt-5 leading-7 text-muted">Program sekolah mendukung pelaksanaan pembelajaran, penguatan karakter SAKTI, literasi, kepedulian lingkungan, keterampilan, dan kreativitas peserta didik.</p><NuxtLink to="/akademik/program-sekolah" class="mt-7 inline-flex items-center gap-2 font-bold text-school-action">Daftar program sekolah <Icon name="mdi:arrow-right" /></NuxtLink></div>
        <div class="grid gap-4 sm:grid-cols-2">
          <article v-for="(program,index) in programs.slice(0,4)" :key="program.id" class="interactive-card reveal card p-6" :class="index===1||index===2?'sm:translate-y-6':''">
            <span class="icon-bubble grid size-12 place-items-center rounded-2xl bg-school-sky text-school-action"><Icon :name="program.icon!" size="27" /></span><h3 class="mt-5 text-lg font-bold text-school-navy">{{program.title}}</h3><p class="mt-2 text-sm leading-6 text-muted">{{program.excerpt}}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="container-school py-20 lg:py-28">
      <div class="reveal flex flex-wrap items-end justify-between gap-5"><div><p class="font-hand text-3xl font-bold text-school-action">Informasi sekolah</p><h2 class="font-display mt-1 text-4xl text-school-navy sm:text-5xl">Berita dan kegiatan</h2></div><NuxtLink to="/informasi/berita" class="btn btn-secondary">Arsip berita <Icon name="mdi:arrow-right" /></NuxtLink></div>
      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <article v-for="(item,index) in news.slice(0,3)" :key="item.id" class="interactive-card reveal card group overflow-hidden" :style="`animation-range:entry ${index*3}% cover ${25+index*3}%`">
          <div class="relative grid h-52 place-items-center overflow-hidden" :class="index===0?'bg-blue-100':index===1?'bg-emerald-100':'bg-amber-100'"><div class="absolute size-44 rounded-full bg-white/45 transition-transform duration-500 group-hover:scale-125" /><Icon name="mdi:newspaper-variant-outline" size="67" class="relative text-school-navy/65 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" /><span class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-school-navy">{{item.category}}</span></div>
          <div class="p-6"><p class="text-xs font-semibold text-muted">{{new Date(item.date).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}}</p><h3 class="mt-3 text-lg font-bold leading-7 text-school-navy">{{item.title}}</h3><p class="mt-3 line-clamp-2 text-sm leading-6 text-muted">{{item.excerpt}}</p><NuxtLink :to="`/informasi/berita/${item.slug}`" class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-school-action">Baca berita <Icon name="mdi:arrow-right" /></NuxtLink></div>
        </article>
      </div>
    </section>

    <section class="container-school pb-20 lg:pb-28">
      <div v-reveal class="reveal relative overflow-hidden rounded-[2.2rem] bg-school-navy px-6 py-14 text-center text-white sm:px-12 lg:py-16">
        <div class="absolute -left-16 -top-20 size-60 rounded-full border-[35px] border-white/5" /><div class="absolute -bottom-24 -right-16 size-72 rounded-full bg-school-blue/20" />
        <div class="relative mx-auto max-w-3xl"><p class="font-hand text-3xl font-bold text-school-yellow">SDN Sukorame 2 — Sekolah SAKTI</p><h2 class="font-display mt-2 text-4xl sm:text-5xl">Selaras dengan Alam, Berakhlak Mulia, Kritis, Terampil, dan Inovatif.</h2><p class="mt-5 leading-7 text-blue-100">SD Negeri Sukorame 2 beralamat di Jalan Himalaya No. 2, Kelurahan Sukorame, Kecamatan Mojoroto, Kota Kediri. Kepala Sekolah: Lilis Khoirulina, M.Pd.I.</p><div class="mt-8 flex flex-wrap justify-center gap-3"><NuxtLink to="/profil" class="btn bg-school-yellow text-school-navy hover:shadow-xl">Data sekolah</NuxtLink><NuxtLink to="/kontak" class="btn border border-white/30 text-white hover:bg-white/10">Alamat dan kontak</NuxtLink></div></div>
      </div>
    </section>
  </div>
</template>
