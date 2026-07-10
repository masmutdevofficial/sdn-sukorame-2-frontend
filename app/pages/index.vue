<script setup lang="ts">
import { defaultHomePageContent } from '~/data/dummy/home-page'
import { news as defaultNews, programs as defaultPrograms, school } from '~/data/dummy/content'
import { contentRepository } from '~/repositories/dummy/content.repository'
import { homePageRepository } from '~/repositories/dummy/home-page.repository'

const page = ref(structuredClone(defaultHomePageContent))
const news = ref(defaultNews)
const programs = ref(defaultPrograms)

useSchoolSeo(() => page.value.seo.title, () => page.value.seo.description)
useSchemaOrg([defineOrganization({ name: school.fullName }), defineWebSite({ name: school.fullName })])

onMounted(async () => {
  const [homeContent, newsData, programData] = await Promise.all([
    homePageRepository.get('beranda'),
    contentRepository.list({ category: 'Berita', status: 'published', perPage: 100 }),
    contentRepository.list({ category: 'Program Sekolah', status: 'published', perPage: 100 }),
  ])
  page.value = homeContent
  news.value = newsData.items
  programs.value = programData.items
})
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
            {{ page.hero.eyebrow }}
          </div>
          <h1 class="hero-enter-delay font-display mt-7 max-w-3xl text-[2.8rem] leading-[1.04] tracking-[-.02em] text-school-navy sm:text-6xl lg:text-[4.35rem]">
            {{ page.hero.title }}<br><span class="relative text-school-action">{{ page.hero.highlightedTitle }}<svg class="absolute -bottom-2 left-0 w-full text-school-yellow" viewBox="0 0 300 12" fill="none" aria-hidden="true"><path d="M3 8C73 2 190 2 297 7" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg></span>
          </h1>
          <p class="hero-enter-delay mt-8 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">{{ page.hero.description }}</p>
          <div class="hero-enter-delay mt-9 flex flex-wrap gap-3">
            <NuxtLink :to="page.hero.primaryAction.url" class="btn btn-primary">{{ page.hero.primaryAction.label }} <Icon name="mdi:arrow-right" /></NuxtLink>
            <NuxtLink :to="page.hero.secondaryAction.url" class="btn btn-secondary"><Icon name="mdi:newspaper-variant-outline" /> {{ page.hero.secondaryAction.label }}</NuxtLink>
          </div>
          <div class="hero-enter-delay mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-school-navy/10 pt-6">
            <div v-for="stat in page.hero.stats" :key="`${stat.value}-${stat.label}`"><b class="font-display text-2xl text-school-navy">{{ stat.value }}</b><p class="text-xs text-muted">{{ stat.label }}</p></div>
          </div>
        </div>

        <div class="hero-visual relative mx-auto w-full max-w-[520px] lg:mx-0">
          <div class="relative aspect-[.94] overflow-hidden rounded-[2.5rem] border-[10px] border-white bg-slate-100 shadow-[0_35px_80px_rgba(18,58,99,.18)]">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.35),transparent_35%)]" />
            <NuxtImg :src="page.hero.image" :alt="page.hero.imageAlt" width="512" height="512" loading="eager" fetchpriority="high" class="absolute inset-0 h-full w-full object-contain p-14 pb-28 sm:p-20 sm:pb-32" />
            <div class="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 backdrop-blur">
              <p class="font-hand text-2xl font-bold text-school-action">{{ page.hero.cardTitle }}</p>
              <p class="mt-1 text-xs leading-5 text-slate-600">{{ page.hero.cardDescription }}</p>
            </div>
          </div>
          <div class="float-slow absolute -left-5 top-14 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:-left-12"><div class="flex items-center gap-3"><span class="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><Icon name="mdi:leaf" size="22" /></span><span><b class="block text-sm text-school-navy">{{ page.hero.leftBadgeTitle }}</b><small class="text-muted">{{ page.hero.leftBadgeDescription }}</small></span></div></div>
          <div class="float-reverse absolute -right-3 bottom-24 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:-right-10"><div class="flex items-center gap-3"><span class="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-700"><Icon name="mdi:lightbulb-on-outline" size="22" /></span><span><b class="block text-sm text-school-navy">{{ page.hero.rightBadgeTitle }}</b><small class="text-muted">{{ page.hero.rightBadgeDescription }}</small></span></div></div>
        </div>
      </div>
    </section>

    <section class="relative bg-white py-20 lg:py-24" aria-labelledby="sambutan-kepala-sekolah">
      <div class="container-school grid items-center gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
        <div v-reveal class="relative mx-auto w-full max-w-sm">
          <div class="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-school-sky to-blue-100 shadow-[0_24px_60px_rgba(18,58,99,.14)]">
            <NuxtImg :src="page.welcome.image" :alt="page.welcome.imageAlt" width="512" height="512" loading="lazy" class="absolute inset-0 h-full w-full object-contain p-10 pb-28" />
            <div class="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-4 text-center shadow-lg backdrop-blur">
              <b class="block text-school-navy">{{ page.welcome.headmasterName }}</b>
              <span class="mt-1 block text-xs font-semibold uppercase tracking-wider text-school-action">{{ page.welcome.headmasterRole }}</span>
            </div>
          </div>
          <span class="float-slow absolute -left-5 top-8 grid size-14 place-items-center rounded-2xl bg-school-yellow text-school-navy shadow-lg"><Icon name="mdi:format-quote-open" size="28" /></span>
        </div>

        <div v-reveal>
          <p class="font-hand text-3xl font-bold text-school-action">{{ page.welcome.eyebrow }}</p>
          <h2 id="sambutan-kepala-sekolah" class="font-display mt-2 text-4xl leading-tight text-school-navy sm:text-5xl">{{ page.welcome.title }}</h2>
          <div class="mt-6 space-y-4 leading-8 text-slate-600">
            <p v-for="(paragraph, index) in page.welcome.paragraphs" :key="index">{{ paragraph }}</p>
          </div>
          <div class="mt-7 border-l-4 border-school-yellow pl-5"><p class="font-display text-xl text-school-navy">“{{ page.welcome.quote }}”</p><p class="mt-3 text-sm font-bold text-school-action">{{ page.welcome.headmasterName }}</p></div>
          <NuxtLink :to="page.welcome.action.url" class="mt-8 inline-flex items-center gap-2 font-bold text-school-action">{{ page.welcome.action.label }} <Icon name="mdi:arrow-right" /></NuxtLink>
        </div>
      </div>
    </section>

    <section class="container-school py-20 lg:py-28">
      <div class="reveal mx-auto max-w-2xl text-center"><p class="font-hand text-3xl font-bold text-school-action">{{ page.values.eyebrow }}</p><h2 class="font-display mt-2 text-4xl text-school-navy sm:text-5xl">{{ page.values.title }}</h2><p class="mt-5 leading-7 text-muted">{{ page.values.description }}</p></div>
      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <article v-for="(value,index) in page.values.items" :key="`${value.letter}-${index}`" class="interactive-card reveal card relative overflow-hidden p-6" :style="`animation-range:entry ${index*2}% cover ${24+index*2}%`">
          <span class="absolute -right-2 -top-7 font-display text-[7rem] leading-none text-school-navy/[.035]">{{value.letter}}</span>
          <span :class="value.tone" class="icon-bubble grid size-12 place-items-center rounded-2xl"><Icon :name="value.icon" size="25" /></span>
          <b class="font-display mt-6 block text-4xl font-normal text-school-navy">{{value.letter}}</b><p class="mt-2 text-sm font-semibold leading-6">{{value.label}}</p>
        </article>
      </div>
    </section>

    <section class="relative bg-white py-20 lg:py-28">
      <div class="absolute inset-y-0 left-0 w-1/3 bg-school-sky/60" aria-hidden="true" />
      <div class="container-school relative grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div class="reveal"><p class="font-hand text-3xl font-bold text-school-action">{{ page.programs.eyebrow }}</p><h2 class="font-display mt-2 text-4xl leading-tight text-school-navy sm:text-5xl">{{ page.programs.title }}</h2><p class="mt-5 leading-7 text-muted">{{ page.programs.description }}</p><NuxtLink :to="page.programs.action.url" class="mt-7 inline-flex items-center gap-2 font-bold text-school-action">{{ page.programs.action.label }} <Icon name="mdi:arrow-right" /></NuxtLink></div>
        <div class="grid gap-4 sm:grid-cols-2">
          <article v-for="(program,index) in programs.slice(0,page.programs.itemLimit)" :key="program.id" class="interactive-card reveal card p-6" :class="index===1||index===2?'sm:translate-y-6':''">
            <span class="icon-bubble grid size-12 place-items-center rounded-2xl bg-school-sky text-school-action"><Icon :name="program.icon!" size="27" /></span><h3 class="mt-5 text-lg font-bold text-school-navy">{{program.title}}</h3><p class="mt-2 text-sm leading-6 text-muted">{{program.excerpt}}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="container-school py-20 lg:py-28">
      <div class="reveal flex flex-wrap items-end justify-between gap-5"><div><p class="font-hand text-3xl font-bold text-school-action">{{ page.news.eyebrow }}</p><h2 class="font-display mt-1 text-4xl text-school-navy sm:text-5xl">{{ page.news.title }}</h2></div><NuxtLink :to="page.news.action.url" class="btn btn-secondary">{{ page.news.action.label }} <Icon name="mdi:arrow-right" /></NuxtLink></div>
      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <article v-for="(item,index) in news.slice(0,page.news.itemLimit)" :key="item.id" class="interactive-card reveal card group overflow-hidden" :style="`animation-range:entry ${index*3}% cover ${25+index*3}%`">
          <div class="relative h-52 overflow-hidden bg-slate-100"><NuxtImg :src="item.image || '/images/no-image.png'" :alt="`Gambar ${item.title} belum tersedia`" width="512" height="512" loading="lazy" class="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105" /><span class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-school-navy shadow-sm">{{item.category}}</span></div>
          <div class="p-6"><p class="text-xs font-semibold text-muted">{{new Date(item.date).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}}</p><h3 class="mt-3 text-lg font-bold leading-7 text-school-navy">{{item.title}}</h3><p class="mt-3 line-clamp-2 text-sm leading-6 text-muted">{{item.excerpt}}</p><NuxtLink :to="`/informasi/berita/${item.slug}`" class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-school-action">Baca berita <Icon name="mdi:arrow-right" /></NuxtLink></div>
        </article>
      </div>
    </section>

    <section class="container-school pb-20 lg:pb-28">
      <div v-reveal class="reveal relative overflow-hidden rounded-[2.2rem] bg-school-navy px-6 py-14 text-center text-white sm:px-12 lg:py-16">
        <div class="absolute -left-16 -top-20 size-60 rounded-full border-[35px] border-white/5" /><div class="absolute -bottom-24 -right-16 size-72 rounded-full bg-school-blue/20" />
        <div class="relative mx-auto max-w-3xl"><p class="font-hand text-3xl font-bold text-school-yellow">{{ page.callToAction.eyebrow }}</p><h2 class="font-display mt-2 text-4xl sm:text-5xl">{{ page.callToAction.title }}</h2><p class="mt-5 leading-7 text-blue-100">{{ page.callToAction.description }}</p><div class="mt-8 flex flex-wrap justify-center gap-3"><NuxtLink :to="page.callToAction.primaryAction.url" class="btn bg-school-yellow text-school-navy hover:shadow-xl">{{ page.callToAction.primaryAction.label }}</NuxtLink><NuxtLink :to="page.callToAction.secondaryAction.url" class="btn border border-white/30 text-white hover:bg-white/10">{{ page.callToAction.secondaryAction.label }}</NuxtLink></div></div>
      </div>
    </section>
  </div>
</template>
