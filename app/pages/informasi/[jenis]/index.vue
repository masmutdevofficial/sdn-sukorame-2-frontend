<script setup lang="ts">
const route = useRoute()
const schoolModules = useSchoolModules()
await schoolModules.ready
const { modules } = schoolModules
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const categories = computed(() => modules.value.informationCategories.filter(item => item.status === 'published'))
const active = ref('')
const search = ref('')
const page = ref(1)
const perPage = 6

watch(categories, list => {
  const match = list.find(item => slugify(item.name) === String(route.params.jenis))
  if (!active.value) active.value = match?.id || list[0]?.id || ''
}, { immediate: true })

const activeName = computed(() => categories.value.find(category => category.id === active.value)?.name || 'Informasi')
const filteredItems = computed(() => {
  const keyword = search.value.trim().toLocaleLowerCase('id-ID')
  return modules.value.informationItems
    .filter(item => item.status === 'published' && (!active.value || item.categoryId === active.value))
    .filter(item => !keyword || `${item.title} ${item.description}`.toLocaleLowerCase('id-ID').includes(keyword))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / perPage)))
const visibleItems = computed(() => filteredItems.value.slice((page.value - 1) * perPage, page.value * perPage))

watch([active, search], () => { page.value = 1 })
watch(totalPages, value => { if (page.value > value) page.value = value })
useSchoolSeo(activeName, () => `Informasi ${activeName.value} SD Negeri Sukorame 2`)
</script>

<template>
  <div>
    <section class="bg-school-sky py-14">
      <div class="container-school">
        <p class="font-hand text-2xl font-bold text-school-action">Informasi Sekolah</p>
        <h1 class="font-display mt-2 text-5xl text-school-navy">{{ activeName }}</h1>
        <div class="mt-7 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label class="relative block"><Icon name="mdi:magnify" class="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size="21"/><input v-model="search" type="search" class="w-full rounded-2xl border border-line bg-white py-3 pl-12 pr-4 text-sm shadow-sm" placeholder="Cari judul atau isi informasi…"></label>
          <div class="flex flex-wrap gap-2"><button class="btn btn-secondary !px-4 !py-3" :class="!active?'!bg-school-action !text-white':''" @click="active=''">Semua</button><button v-for="category in categories" :key="category.id" class="btn btn-secondary !px-4 !py-3" :class="active===category.id?'!bg-school-action !text-white':''" @click="active=category.id">{{ category.name }}</button></div>
        </div>
      </div>
    </section>
    <section class="container-school py-12">
      <p class="mb-5 text-sm text-muted" aria-live="polite">{{ filteredItems.length }} informasi ditemukan</p>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><article v-for="item in visibleItems" :key="item.id" class="card overflow-hidden"><div class="flex snap-x overflow-x-auto"><img v-for="(image,index) in item.images" :key="index" :src="image" :alt="item.title" class="aspect-[4/3] w-full shrink-0 snap-center object-cover"><img v-if="!item.images.length" src="https://cdn.sdnsukorame2kotakediri.sch.id/images/no-image.png" alt="Belum ada gambar" class="aspect-[4/3] w-full object-contain"></div><div class="p-5"><p class="text-xs text-muted">{{ new Date(item.date).toLocaleDateString('id-ID',{dateStyle:'long',timeZone:'Asia/Jakarta'}) }}</p><h2 class="mt-2 text-xl font-bold text-school-navy">{{ item.title }}</h2><p class="mt-3 text-sm leading-6 text-muted">{{ item.description }}</p></div></article></div>
      <p v-if="!visibleItems.length" class="card mt-6 p-8 text-center text-muted">Tidak ada informasi yang sesuai dengan pencarian.</p>
      <nav v-if="totalPages > 1" class="mt-9 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination informasi"><button class="btn btn-secondary !px-4 !py-2.5" :disabled="page===1" @click="page--"><Icon name="mdi:chevron-left"/> Sebelumnya</button><button v-for="number in totalPages" :key="number" class="grid size-11 place-items-center rounded-xl border font-bold" :class="number===page?'border-school-action bg-school-action text-white':'border-line bg-white text-school-navy'" :aria-current="number===page?'page':undefined" @click="page=number">{{ number }}</button><button class="btn btn-secondary !px-4 !py-2.5" :disabled="page===totalPages" @click="page++">Berikutnya <Icon name="mdi:chevron-right"/></button></nav>
    </section>
  </div>
</template>
