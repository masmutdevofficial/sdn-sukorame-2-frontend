<script setup lang="ts">
import { allContent, school } from '~/data/dummy/content'
import { defaultSitePages } from '~/data/dummy/site-pages'
import { contentRepository } from '~/repositories/dummy/content.repository'
import { sitePageRepository } from '~/repositories/dummy/site-page.repository'
import type { ContentItem } from '~/types/content'
import type { SitePage } from '~/types/site-page'

const route = useRoute()
const rawSlug = route.params.slug
const slug = Array.isArray(rawSlug) ? rawSlug.join('/') : String(rawSlug || '')
const path = `/${slug}`
const initialContent = allContent.find(item => path.endsWith(`/${item.slug}`)) || null
const initialPage = defaultSitePages.find(page => page.slug === slug) || null
const { data: sitePage } = await useAsyncData<SitePage | null>(`site-page:${slug}`, () => sitePageRepository.getBySlug(slug), { default: () => initialPage })
const { data: content } = await useAsyncData<ContentItem | null>(`site-content:${slug}`, () => initialContent ? contentRepository.getBySlug(initialContent.slug) : Promise.resolve(null), { default: () => initialContent })

const title = computed(() => content.value?.title || sitePage.value?.title || 'Halaman Informasi')
const excerpt = computed(() => content.value?.excerpt || sitePage.value?.excerpt || 'Informasi SDN Sukorame 2.')
const body = computed(() => content.value?.body || sitePage.value?.body || 'Konten halaman ini sedang disiapkan dan dapat dikelola melalui admin.')
const image = computed(() => content.value?.image || sitePage.value?.image || '')
const imageAlt = computed(() => sitePage.value?.imageAlt || `Gambar ${title.value}`)

useSchoolSeo(title, excerpt)

</script>

<template>
  <section>
    <div class="bg-school-sky py-14"><div class="container-school"><p class="text-sm font-semibold text-school-action">{{ sitePage?.eyebrow || 'Beranda' }} / {{ title }}</p><h1 class="mt-3 text-4xl font-bold text-school-navy">{{ title }}</h1><p class="mt-4 max-w-2xl text-lg">{{ excerpt }}</p></div></div>
    <article class="container-school py-12">
      <div class="card prose-school max-w-3xl overflow-hidden">
        <img v-if="image" :src="image" :alt="imageAlt" class="h-72 w-full bg-slate-100 object-contain p-10">
        <div class="p-7 md:p-10"><p v-for="(paragraph, index) in body.split('\n')" :key="index">{{ paragraph }}</p><div v-if="path === '/profil'" class="mt-8 grid gap-3 sm:grid-cols-2"><p><b>NPSN:</b> {{ school.npsn }}</p><p><b>NSS:</b> {{ school.nss }}</p><p><b>NIS:</b> {{ school.nis }}</p><p><b>Kepala sekolah:</b> {{ school.headmaster }}</p></div></div>
      </div>
      <div v-if="path === '/galeri'" class="mt-8 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3"><figure v-for="index in 6" :key="index" class="card overflow-hidden"><img :src="image || '/images/no-image.png'" :alt="`${imageAlt} ${index}`" class="aspect-[4/3] w-full bg-slate-100 object-contain p-8"><figcaption class="border-t border-line p-4 text-sm font-semibold text-school-navy">{{ title }}</figcaption></figure></div>
    </article>
  </section>
</template>
