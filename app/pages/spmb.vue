<script setup lang="ts">
const schoolModules = useSchoolModules()
await schoolModules.ready
const { modules } = schoolModules

const now = useState('ppdb-now', () => Date.now())
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => timer = setInterval(() => now.value = Date.now(), 1000))
onBeforeUnmount(() => clearInterval(timer))

const start = computed(() => new Date(modules.value.ppdb.startDate).getTime())
const end = computed(() => new Date(modules.value.ppdb.endDate).getTime())
const target = computed(() => now.value < start.value ? start.value : end.value)
const remaining = computed(() => Math.max(0, target.value - now.value))
const countdown = computed(() => {
  const total = Math.floor(remaining.value / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total % 86400 / 3600),
    minutes: Math.floor(total % 3600 / 60),
    seconds: total % 60,
  }
})
const status = computed(() => now.value < start.value ? 'Pendaftaran belum dibuka' : now.value <= end.value ? 'Pendaftaran sedang dibuka' : 'Pendaftaran telah selesai')

useSchoolSeo(() => modules.value.ppdb.title, () => modules.value.ppdb.description)
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-school-navy py-16 text-white">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(246,201,69,.20),transparent_30%)]" />
      <div class="container-school relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p class="font-hand text-3xl text-school-yellow">
            SPMB
          </p>
          <h1 class="font-display mt-2 text-5xl leading-tight md:text-6xl">
            {{ modules.ppdb.title }}
          </h1>
          <p class="mt-5 max-w-2xl leading-8 text-blue-100">
            {{ modules.ppdb.description }}
          </p>
          <p class="mt-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold shadow-lg shadow-slate-950/10 backdrop-blur">
            {{ status }}
          </p>
          <div v-if="modules.ppdb.countdownEnabled && remaining > 0" class="mt-7 grid max-w-lg grid-cols-4 gap-3">
            <div v-for="(value, label) in countdown" :key="label" class="rounded-2xl border border-white/10 bg-white/10 p-4 text-center shadow-lg shadow-slate-950/10 backdrop-blur">
              <b class="text-3xl">{{ value }}</b>
              <small class="block capitalize text-blue-100">{{ label }}</small>
            </div>
          </div>
          <p class="mt-6 text-sm text-blue-100">
            {{ new Date(modules.ppdb.startDate).toLocaleString('id-ID') }} — {{ new Date(modules.ppdb.endDate).toLocaleString('id-ID') }}
          </p>
        </div>

        <div class="relative">
          <div class="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-school-yellow/30 via-sky-300/15 to-white/10 blur-2xl" />
          <article class="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-slate-950/25 backdrop-blur">
            <div class="relative overflow-hidden rounded-[1.55rem] bg-slate-100">
              <img
                :src="modules.ppdb.image"
                alt="SPMB"
                class="aspect-[16/10] w-full object-cover"
              >
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-school-navy/85 via-school-navy/35 to-transparent p-5">
                <p class="inline-flex rounded-full bg-school-yellow px-3 py-1 text-xs font-extrabold uppercase tracking-[.14em] text-school-navy">
                  Informasi SPMB
                </p>
                <h2 class="mt-3 max-w-md text-2xl font-extrabold leading-tight text-white">
                  Siapkan pendaftaran putra-putri terbaik bersama SDN Sukorame 2.
                </h2>
              </div>
            </div>
          </article>
          <div class="absolute -bottom-5 left-6 rounded-2xl border border-white/15 bg-white px-5 py-3 text-school-navy shadow-xl shadow-slate-950/20">
            <b class="block text-sm">Layanan informasi</b>
            <span class="text-xs text-muted">Syarat, alur, dan FAQ tersedia lengkap</span>
          </div>
        </div>
      </div>
    </section>

    <div class="container-school grid gap-8 py-14 lg:grid-cols-2">
      <section class="card p-7">
        <h2 class="font-display text-3xl text-school-navy">
          Syarat SPMB
        </h2>
        <ol class="mt-6 grid gap-3">
          <li v-for="(item, index) in modules.ppdb.requirements" :key="item.id" class="flex gap-3">
            <span class="grid size-8 shrink-0 place-items-center rounded-full bg-school-sky font-bold text-school-action">{{ index + 1 }}</span>
            {{ item.text }}
          </li>
        </ol>
      </section>

      <section class="card p-7">
        <h2 class="font-display text-3xl text-school-navy">
          Alur SPMB
        </h2>
        <ol class="mt-6 grid gap-4">
          <li v-for="(item, index) in modules.ppdb.steps" :key="item.id">
            <b class="text-school-navy">{{ index + 1 }}. {{ item.title }}</b>
            <p class="text-sm text-muted">
              {{ item.description }}
            </p>
          </li>
        </ol>
      </section>

      <section class="card p-7 lg:col-span-2">
        <h2 class="font-display text-3xl text-school-navy">
          Pertanyaan Umum
        </h2>
        <details v-for="item in modules.ppdb.faqs" :key="item.id" class="mt-4 rounded-xl border border-line p-4">
          <summary class="cursor-pointer font-bold text-school-navy">
            {{ item.question }}
          </summary>
          <p class="mt-3 text-muted">
            {{ item.answer }}
          </p>
        </details>
      </section>
    </div>
  </div>
</template>
