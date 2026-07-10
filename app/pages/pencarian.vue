<script setup lang="ts">
import { contentRepository } from '~/repositories/http/content.repository'
import { sitePageRepository } from '~/repositories/http/site-page.repository'

const route = useRoute()
const query = computed(() => String(route.query.q || '').trim())
const { data: page } = await useAsyncData('search-page', () => sitePageRepository.getBySlug('pencarian'))
if (!page.value) throw createError({ statusCode:404, statusMessage:'Halaman pencarian tidak ditemukan' })
const { data: results, pending } = await useAsyncData(
  () => `search:${query.value}`,
  () => query.value.length >= 2 ? contentRepository.search(query.value) : Promise.resolve([]),
  { watch:[query], default:() => [] },
)
useSchoolSeo(() => page.value!.title, () => page.value!.excerpt)
</script>

<template>
  <div class="container-school py-12">
    <div class="grid items-center gap-6 md:grid-cols-[1fr_auto]"><div><p class="font-semibold text-school-action">{{ page!.eyebrow }}</p><h1 class="mt-2 text-3xl font-bold text-school-navy">{{ page!.title }}</h1><p class="mt-3 text-muted">{{ page!.excerpt }}</p></div><img v-if="page!.image" :src="page!.image" :alt="page!.imageAlt" class="size-32 rounded-xl bg-white object-contain"></div>
    <form class="mt-6 flex max-w-2xl gap-2" action="/pencarian"><label class="sr-only" for="q">Kata kunci</label><input id="q" name="q" :value="query" minlength="2" class="min-w-0 flex-1 rounded-xl border border-line bg-white px-4" placeholder="Cari berita, agenda, program..."><button class="btn btn-primary">Cari</button></form>
    <p class="mt-6 text-muted">{{ pending ? 'Mencari...' : `${results.length} hasil untuk “${query}”` }}</p><div class="mt-5 grid gap-3"><article v-for="item in results" :key="`${item.type}-${item.id}`" class="card p-5"><NuxtLink :to="item.type === 'page' ? `/${item.slug}` : `/${item.slug}`" class="font-bold text-school-navy hover:text-school-action">{{ item.title }}</NuxtLink><p class="mt-1 text-sm text-muted">{{ item.excerpt }}</p></article></div>
  </div>
</template>
