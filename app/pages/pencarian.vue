<script setup lang="ts">
import { allContent } from '~/data/dummy/content'
import { defaultSitePages } from '~/data/dummy/site-pages'
import { contentRepository } from '~/repositories/dummy/content.repository'
import { sitePageRepository } from '~/repositories/dummy/site-page.repository'

const route = useRoute()
const query = computed(() => String(route.query.q || ''))
const items = ref(allContent)
const page = ref(structuredClone(defaultSitePages.find(item => item.slug === 'pencarian')!))
const results = computed(() => query.value ? items.value.filter(item => `${item.title} ${item.excerpt}`.toLowerCase().includes(query.value.toLowerCase())) : [])

useSchoolSeo(() => page.value.title, () => page.value.excerpt)
onMounted(async () => {
  const [pageData, contentData] = await Promise.all([sitePageRepository.getBySlug('pencarian'), contentRepository.list({ status: 'published', perPage: 100 })])
  if (pageData) page.value = pageData
  items.value = contentData.items
})
</script>

<template>
  <div class="container-school py-12">
    <div class="grid items-center gap-6 md:grid-cols-[1fr_auto]"><div><p class="font-semibold text-school-action">{{ page.eyebrow }}</p><h1 class="mt-2 text-3xl font-bold text-school-navy">{{ page.title }}</h1><p class="mt-3 text-muted">{{ page.excerpt }}</p><p v-if="page.body && page.body !== page.excerpt" class="mt-2 text-muted">{{ page.body }}</p></div><img v-if="page.image" :src="page.image" :alt="page.imageAlt" class="size-32 rounded-xl bg-white object-contain"></div>
    <form class="mt-6 flex max-w-2xl gap-2" action="/pencarian"><label class="sr-only" for="q">Kata kunci</label><input id="q" name="q" :value="query" class="min-w-0 flex-1 rounded-xl border border-line bg-white px-4" placeholder="Cari berita, agenda, program..."><button class="btn btn-primary">Cari</button></form>
    <p class="mt-6 text-muted">{{ results.length }} hasil untuk “{{ query }}”</p><div class="mt-5 grid gap-3"><article v-for="item in results" :key="item.id" class="card flex gap-4 p-5"><img v-if="item.image" :src="item.image" :alt="item.title" class="size-20 rounded-lg object-contain"><div><b class="text-school-navy">{{ item.title }}</b><p class="mt-1 text-sm text-muted">{{ item.excerpt }}</p></div></article></div>
  </div>
</template>
