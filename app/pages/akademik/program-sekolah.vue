<script setup lang="ts">
const schoolModules = useSchoolModules()
await schoolModules.ready
const { modules } = schoolModules
const active = ref('')
const search = ref('')
const page = ref(1)
const perPage = 6

const categories = computed(() => modules.value.programCategories.filter(category => category.status === 'published'))
const filteredPrograms = computed(() => {
  const keyword = search.value.trim().toLocaleLowerCase('id-ID')
  return modules.value.programs
    .filter(program => program.status === 'published' && (!active.value || program.categoryId === active.value))
    .filter(program => !keyword || `${program.title} ${program.description}`.toLocaleLowerCase('id-ID').includes(keyword))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredPrograms.value.length / perPage)))
const visiblePrograms = computed(() => filteredPrograms.value.slice((page.value - 1) * perPage, page.value * perPage))

watch([active, search], () => { page.value = 1 })
watch(totalPages, value => { if (page.value > value) page.value = value })
useSchoolSeo('Program Sekolah', 'Program prioritas dan pembiasaan SD Negeri Sukorame 2')
</script>

<template>
  <div>
    <section class="bg-school-sky py-14">
      <div class="container-school">
        <p class="font-hand text-2xl font-bold text-school-action">Akademik</p>
        <h1 class="font-display mt-2 text-5xl text-school-navy">Program Sekolah</h1>
        <p class="mt-4 max-w-2xl leading-7 text-muted">Program prioritas dan pembiasaan untuk mendukung pembelajaran, karakter, serta kreativitas peserta didik.</p>
        <div class="mt-7 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label class="relative block">
            <Icon name="mdi:magnify" class="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size="21" />
            <input v-model="search" type="search" class="w-full rounded-2xl border border-line bg-white py-3 pl-12 pr-4 text-sm shadow-sm" placeholder="Cari program sekolah…">
          </label>
          <div class="flex flex-wrap gap-2">
            <button class="btn btn-secondary !px-4 !py-3" :class="!active ? '!bg-school-action !text-white' : ''" @click="active = ''">Semua</button>
            <button v-for="category in categories" :key="category.id" class="btn btn-secondary !px-4 !py-3" :class="active === category.id ? '!bg-school-action !text-white' : ''" @click="active = category.id">{{ category.name }}</button>
          </div>
        </div>
      </div>
    </section>

    <section class="container-school py-12">
      <p class="mb-5 text-sm text-muted" aria-live="polite">{{ filteredPrograms.length }} program ditemukan</p>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="program in visiblePrograms" :key="program.id" class="card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10">
          <PublicAutoImageSlider :images="program.images" :alt="program.title" />
          <div class="p-5">
            <p class="text-xs font-semibold text-muted">{{ new Date(program.date).toLocaleDateString('id-ID', { dateStyle: 'long', timeZone: 'Asia/Jakarta' }) }}</p>
            <h2 class="mt-2 text-xl font-bold text-school-navy transition group-hover:text-school-action">{{ program.title }}</h2>
            <p class="mt-3 text-sm leading-6 text-muted">{{ program.description }}</p>
          </div>
        </article>
      </div>
      <p v-if="!visiblePrograms.length" class="card mt-6 p-8 text-center text-muted">Tidak ada program yang sesuai dengan pencarian.</p>
      <nav v-if="totalPages > 1" class="mt-9 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination program sekolah">
        <button class="btn btn-secondary !px-4 !py-2.5" :disabled="page === 1" @click="page--"><Icon name="mdi:chevron-left" /> Sebelumnya</button>
        <button v-for="number in totalPages" :key="number" class="grid size-11 place-items-center rounded-xl border font-bold" :class="number === page ? 'border-school-action bg-school-action text-white' : 'border-line bg-white text-school-navy'" :aria-current="number === page ? 'page' : undefined" @click="page = number">{{ number }}</button>
        <button class="btn btn-secondary !px-4 !py-2.5" :disabled="page === totalPages" @click="page++">Berikutnya <Icon name="mdi:chevron-right" /></button>
      </nav>
    </section>
  </div>
</template>
