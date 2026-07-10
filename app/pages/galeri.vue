<script setup lang="ts">
const schoolModules = useSchoolModules()
await schoolModules.ready
const { modules } = schoolModules
const items = computed(() => modules.value.gallery.filter(item => item.status === 'published'))
const featuredSlides = computed(() => items.value.map(item => ({
  image: item.image,
  title: item.title,
  description: item.description,
})))

useSchoolSeo('Galeri', 'Galeri foto SD Negeri Sukorame 2')
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-school-sky py-14">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,115,232,.13),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(246,201,69,.24),transparent_28%)]" />
      <div class="container-school relative">
        <p class="font-hand text-2xl font-bold text-school-action">
          Dokumentasi
        </p>
        <h1 class="font-display mt-2 text-5xl text-school-navy">
          Galeri Sekolah
        </h1>
        <p class="mt-4 max-w-2xl leading-7 text-muted">
          Potret kegiatan, suasana belajar, dan momen terbaik SD Negeri Sukorame 2.
        </p>
      </div>
    </section>

    <section v-if="items.length" class="container-school pt-12">
      <div class="grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <article class="overflow-hidden rounded-[2rem] border border-line bg-white p-3 shadow-2xl shadow-slate-900/10">
          <PublicAutoImageSlider :slides="featuredSlides" alt="Sorotan galeri sekolah" aspect-ratio="16 / 9" show-captions />
        </article>
        <div class="card p-7">
          <p class="font-hand text-2xl text-school-action">
            Sorotan Galeri
          </p>
          <h2 class="mt-2 text-3xl font-extrabold text-school-navy">
            Dokumentasi sekolah dalam tampilan slider otomatis.
          </h2>
          <p class="mt-4 leading-7 text-muted">
            Slider akan berputar otomatis dan mengulang dari awal agar pengunjung bisa melihat banyak momen tanpa harus menggeser manual.
          </p>
          <div class="mt-5 inline-flex rounded-full bg-school-sky px-4 py-2 text-sm font-bold text-school-action">
            {{ items.length }} foto terbit
          </div>
        </div>
      </div>
    </section>

    <div class="container-school grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
      <figure v-for="item in items" :key="item.id" class="card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10">
        <PublicAutoImageSlider :images="[item.image]" :alt="item.title" />
        <figcaption class="p-5">
          <b class="text-school-navy transition group-hover:text-school-action">{{ item.title }}</b>
          <p class="mt-2 text-sm text-muted">
            {{ item.description }}
          </p>
        </figcaption>
      </figure>
      <p v-if="!items.length" class="text-muted">
        Belum ada foto terbit.
      </p>
    </div>
  </div>
</template>
