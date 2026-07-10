<script setup lang="ts">
import { contentRepository } from '~/repositories/http/content.repository'
import { sitePageRepository } from '~/repositories/http/site-page.repository'
import { DEFAULT_IMAGE_URL } from '~/repositories/http/api'

const route = useRoute()
const rawSlug = route.params.slug
const slug = Array.isArray(rawSlug) ? rawSlug.join('/') : String(rawSlug || '')
const path = `/${slug}`
const [{ data: sitePage }, { data: content }] = await Promise.all([
  useAsyncData(`site-page:${slug}`, () => sitePageRepository.getBySlug(slug)),
  useAsyncData(`site-content:${slug}`, () => contentRepository.getBySlug(slug)),
])
if (!sitePage.value && !content.value) throw createError({ statusCode: 404, statusMessage: 'Halaman tidak ditemukan' })

const schoolModules = useSchoolModules()
await schoolModules.ready
const { modules } = schoolModules
const title = computed(() => content.value?.title || sitePage.value!.title)
const excerpt = computed(() => content.value?.excerpt || sitePage.value!.excerpt)
const body = computed(() => content.value?.body || sitePage.value!.body)
const image = computed(() => content.value?.image || sitePage.value?.image || DEFAULT_IMAGE_URL)
const imageAlt = computed(() => sitePage.value?.imageAlt || `Gambar ${title.value}`)
useSchoolSeo(title, excerpt)
</script>

<template>
  <section>
    <div class="bg-school-sky py-14"><div class="container-school"><p class="text-sm font-semibold text-school-action">{{ sitePage?.eyebrow || modules.school.name }} / {{ title }}</p><h1 class="mt-3 text-4xl font-bold text-school-navy">{{ title }}</h1><p class="mt-4 max-w-2xl text-lg">{{ excerpt }}</p></div></div>
    <article class="container-school py-12">
      <div class="card prose-school max-w-3xl overflow-hidden">
        <img :src="image" :alt="imageAlt" class="h-72 w-full bg-slate-100 object-contain p-10">
        <div class="p-7 md:p-10"><p v-for="(paragraph, index) in body.split('\n')" :key="index">{{ paragraph }}</p><div v-if="path === '/profil'" class="mt-8 grid gap-3 sm:grid-cols-2"><p><b>NPSN:</b> {{ modules.school.npsn }}</p><p><b>NSS:</b> {{ modules.school.nss }}</p><p><b>NIS:</b> {{ modules.school.nis }}</p><p><b>Kepala sekolah:</b> {{ modules.school.headmaster }}</p></div></div>
      </div>
    </article>
  </section>
</template>
