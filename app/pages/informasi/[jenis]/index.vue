<script setup lang="ts">
import { allContent } from '~/data/dummy/content'
import { defaultSitePages } from '~/data/dummy/site-pages'
import { contentRepository } from '~/repositories/dummy/content.repository'
import { sitePageRepository } from '~/repositories/dummy/site-page.repository'

const route = useRoute()
const categoryMap: Record<string, string> = {
  berita: 'Berita',
  pengumuman: 'Pengumuman',
  agenda: 'Agenda',
}

const title = computed(() => categoryMap[String(route.params.jenis)] || 'Informasi')
const items = ref(allContent)
const pageSlug = computed(() => `informasi/${String(route.params.jenis)}`)
const page = ref(structuredClone(defaultSitePages.find(item => item.slug === pageSlug.value) || defaultSitePages[3]!))
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 3
const resultsSection = useTemplateRef<HTMLElement>('resultsSection')

const categoryItems = computed(() => items.value
  .filter(item => item.category === title.value)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
)

const normalizedSearch = computed(() => search.value.trim().toLocaleLowerCase('id-ID'))

const filteredItems = computed(() => {
  if (!normalizedSearch.value) return categoryItems.value

  return categoryItems.value.filter((item) => {
    const searchableText = `${item.title} ${item.excerpt} ${item.category}`.toLocaleLowerCase('id-ID')
    return searchableText.includes(normalizedSearch.value)
  })
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))

const visibleItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

const pageNumbers = computed<(number | 'ellipsis')[]>(() => {
  const total = totalPages.value
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const pages = new Set([1, total, currentPage.value - 1, currentPage.value, currentPage.value + 1])
  const validPages = [...pages].filter(page => page > 0 && page <= total).sort((a, b) => a - b)
  const result: (number | 'ellipsis')[] = []

  validPages.forEach((page, index) => {
    if (index > 0 && page - validPages[index - 1]! > 1) result.push('ellipsis')
    result.push(page)
  })

  return result
})

const resultLabel = computed(() => {
  const count = filteredItems.value.length
  if (normalizedSearch.value) return `${count} hasil ditemukan untuk “${search.value.trim()}”`
  return `${count} ${title.value.toLowerCase()} tersedia`
})

const formatDate = (date: string) => new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date(date))

const goToPage = async (page: number) => {
  const safePage = Math.min(Math.max(page, 1), totalPages.value || 1)
  if (safePage === currentPage.value) return

  currentPage.value = safePage
  await nextTick()
  resultsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const clearSearch = () => {
  search.value = ''
}

watch(search, () => {
  currentPage.value = 1
})

watch(() => route.params.jenis, () => {
  search.value = ''
  currentPage.value = 1
  loadPage()
})

const loadPage = async () => {
  const [pageData, contentData] = await Promise.all([
    sitePageRepository.getBySlug(pageSlug.value),
    contentRepository.list({ status: 'published', perPage: 100 }),
  ])
  if (pageData) page.value = pageData
  items.value = contentData.items
}

onMounted(loadPage)
useSchoolSeo(() => page.value.title, () => page.value.excerpt)
</script>

<template>
  <section>
    <div class="relative overflow-hidden bg-school-sky py-14 lg:py-16">
      <div class="hero-grid absolute inset-0" aria-hidden="true" />
      <div class="container-school relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
        <div><p class="font-hand text-2xl font-bold text-school-action">{{ page.eyebrow }}</p>
        <h1 class="font-display mt-2 text-5xl text-school-navy sm:text-6xl">{{ page.title }}</h1>
        <p class="mt-4 max-w-2xl leading-7 text-slate-600">{{ page.excerpt }}</p><p v-if="page.body && page.body !== page.excerpt" class="mt-2 max-w-2xl leading-7 text-slate-600">{{ page.body }}</p></div>
        <img v-if="page.image" :src="page.image" :alt="page.imageAlt" class="size-36 rounded-xl bg-white object-contain">
      </div>
    </div>

    <div ref="resultsSection" class="container-school scroll-mt-36 py-12 lg:py-16">
      <div class="relative z-10 -mt-20 rounded-[1.75rem] border border-white/80 bg-white/95 p-5 shadow-xl shadow-school-navy/8 backdrop-blur sm:p-7">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-xl">
            <label for="content-search" class="text-sm font-bold text-school-navy">Cari {{ title.toLowerCase() }}</label>
            <p class="mt-1 text-sm leading-6 text-muted">Hasil akan diperbarui langsung saat kata kunci diketik.</p>
          </div>

          <div class="relative w-full lg:max-w-xl">
            <Icon name="mdi:magnify" size="24" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-school-action" aria-hidden="true" />
            <input
              id="content-search"
              v-model="search"
              type="search"
              class="h-14 w-full rounded-2xl border border-line bg-slate-50 pl-12 pr-12 text-school-navy outline-none transition placeholder:text-slate-400 focus:border-school-action focus:bg-white focus:ring-4 focus:ring-school-action/10"
              :placeholder="`Cari judul atau isi ${title.toLowerCase()}...`"
              autocomplete="off"
            >
            <button
              v-if="search"
              type="button"
              class="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted transition hover:bg-school-sky hover:text-school-action focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-action"
              aria-label="Hapus kata pencarian"
              @click="clearSearch"
            >
              <Icon name="mdi:close" size="20" />
            </button>
          </div>
        </div>
      </div>

      <div class="mt-9 flex flex-wrap items-center justify-between gap-3">
        <p class="font-semibold text-school-navy" role="status" aria-live="polite">{{ resultLabel }}</p>
        <p v-if="totalPages > 1" class="rounded-full bg-school-sky px-4 py-2 text-xs font-bold text-school-action">Halaman {{ currentPage }} dari {{ totalPages }}</p>
      </div>

      <TransitionGroup
        v-if="visibleItems.length"
        name="news-list"
        tag="div"
        class="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <article v-for="item in visibleItems" :key="item.id" class="interactive-card card group flex min-h-96 flex-col overflow-hidden">
          <div class="relative h-52 overflow-hidden bg-slate-100">
            <NuxtImg :src="item.image || '/images/no-image.png'" :alt="`Gambar ${item.title} belum tersedia`" width="512" height="512" loading="lazy" class="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105" />
            <time :datetime="item.date" class="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-muted shadow-sm backdrop-blur">{{ formatDate(item.date) }}</time>
          </div>
          <div class="flex flex-1 flex-col p-6">
            <h2 class="text-xl font-bold leading-8 text-school-navy">{{ item.title }}</h2>
            <p class="mt-3 line-clamp-3 text-sm leading-6 text-muted">{{ item.excerpt }}</p>
            <NuxtLink :to="`/informasi/${route.params.jenis}/${item.slug}`" class="mt-auto inline-flex items-center gap-2 pt-6 font-bold text-school-action">
              Baca selengkapnya
              <Icon name="mdi:arrow-right" class="transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </div>
        </article>
      </TransitionGroup>

      <div v-else class="mt-6 rounded-[1.75rem] border border-dashed border-school-navy/20 bg-white px-6 py-16 text-center">
        <span class="mx-auto grid size-20 place-items-center rounded-full bg-school-sky text-school-action">
          <Icon name="mdi:database-off-outline" size="42" />
        </span>
        <h2 class="font-display mt-6 text-3xl text-school-navy">Belum Ada Data</h2>
        <p class="mx-auto mt-3 max-w-lg leading-7 text-muted">
          {{ normalizedSearch ? `Tidak ditemukan ${title.toLowerCase()} yang cocok dengan kata kunci “${search.trim()}”.` : `${title} belum tersedia saat ini.` }}
        </p>
        <button v-if="normalizedSearch" type="button" class="btn btn-secondary mt-6" @click="clearSearch">
          <Icon name="mdi:refresh" />
          Tampilkan semua {{ title.toLowerCase() }}
        </button>
      </div>

      <nav v-if="totalPages > 1" class="mt-10 flex flex-wrap items-center justify-center gap-2" :aria-label="`Pagination ${title.toLowerCase()}`">
        <button
          type="button"
          class="pagination-button"
          :disabled="currentPage === 1"
          aria-label="Ke halaman sebelumnya"
          @click="goToPage(currentPage - 1)"
        >
          <Icon name="mdi:chevron-left" size="22" />
        </button>

        <template v-for="(page, index) in pageNumbers" :key="`${page}-${index}`">
          <span v-if="page === 'ellipsis'" class="grid size-11 place-items-center text-muted" aria-hidden="true">•••</span>
          <button
            v-else
            type="button"
            class="pagination-button"
            :class="{ 'pagination-button-active': page === currentPage }"
            :aria-label="`Ke halaman ${page}`"
            :aria-current="page === currentPage ? 'page' : undefined"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </template>

        <button
          type="button"
          class="pagination-button"
          :disabled="currentPage === totalPages"
          aria-label="Ke halaman berikutnya"
          @click="goToPage(currentPage + 1)"
        >
          <Icon name="mdi:chevron-right" size="22" />
        </button>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.pagination-button {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: 1px solid var(--color-line);
  border-radius: 0.9rem;
  background: white;
  color: var(--color-school-navy);
  font-weight: 700;
  transition: transform 180ms ease, color 180ms ease, background-color 180ms ease, border-color 180ms ease;
}

.pagination-button:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: var(--color-school-action);
  color: var(--color-school-action);
}

.pagination-button:focus-visible {
  outline: 2px solid var(--color-school-action);
  outline-offset: 3px;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

.pagination-button-active {
  border-color: var(--color-school-action);
  background: var(--color-school-action);
  color: white;
  box-shadow: 0 8px 20px rgb(20 91 184 / 20%);
}

.news-list-enter-active,
.news-list-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.news-list-enter-from,
.news-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (prefers-reduced-motion: reduce) {
  .pagination-button,
  .news-list-enter-active,
  .news-list-leave-active {
    transition: none;
  }
}
</style>
