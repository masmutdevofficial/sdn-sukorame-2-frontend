<script setup lang="ts">
import { defaultHomePageContent } from '~/data/dummy/home-page'
import { homePageRepository } from '~/repositories/dummy/home-page.repository'
import type { HomePageContent, HomeStat, SchoolValue } from '~/types/page-content'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useSeoMeta({ title: 'Edit Halaman Beranda', robots: 'noindex, nofollow' })

const form = ref<HomePageContent>(structuredClone(defaultHomePageContent))
const loading = ref(true)
const saving = ref(false)
const notice = ref('')

onMounted(async () => {
  form.value = await homePageRepository.get('beranda')
  loading.value = false
})

const save = async () => {
  saving.value = true
  form.value = await homePageRepository.update('beranda', form.value)
  saving.value = false
  notice.value = 'Perubahan halaman beranda berhasil disimpan.'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const reset = async () => {
  if (!confirm('Kembalikan seluruh isi beranda ke data awal?')) return
  form.value = await homePageRepository.reset('beranda')
  notice.value = 'Halaman beranda dikembalikan ke data awal.'
}

const addStat = () => form.value.hero.stats.push({ value: '', label: '' } satisfies HomeStat)
const addValue = () => form.value.values.items.push({ letter: '', label: '', icon: 'mdi:star-outline', tone: 'bg-blue-50 text-blue-700' } satisfies SchoolValue)
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div><h1 class="text-3xl font-bold text-school-navy">Edit Halaman Beranda</h1><p class="mt-1 text-muted">Semua bagian landing page dapat dikelola dari halaman ini.</p></div>
      <NuxtLink to="/" target="_blank" class="btn btn-secondary"><Icon name="mdi:open-in-new" /> Pratinjau</NuxtLink>
    </div>
    <p v-if="notice" role="status" class="mt-5 rounded-xl bg-green-100 p-3 text-green-900">{{ notice }}</p>
    <div v-if="loading" class="card mt-6 p-10 text-center"><Icon name="mdi:loading" class="animate-spin" /> Memuat editor...</div>

    <form v-else class="mt-6 grid gap-6" @submit.prevent="save">
      <section class="card p-6"><h2 class="section-title">SEO</h2><div class="form-grid"><label class="admin-field">Judul halaman<input v-model="form.seo.title" required></label><label class="admin-field">Deskripsi meta<textarea v-model="form.seo.description" required rows="3" /></label></div></section>

      <section class="card p-6">
        <h2 class="section-title">Hero</h2>
        <div class="form-grid">
          <label class="admin-field md:col-span-2">Label atas<input v-model="form.hero.eyebrow" required></label><label class="admin-field">Judul utama<input v-model="form.hero.title" required></label><label class="admin-field">Judul sorotan<input v-model="form.hero.highlightedTitle" required></label>
          <label class="admin-field md:col-span-2">Deskripsi<textarea v-model="form.hero.description" required rows="4" /></label><div class="md:col-span-2"><AdminImageUpload v-model="form.hero.image" :alt="form.hero.imageAlt" label="Gambar hero" /></div><label class="admin-field md:col-span-2">Teks alternatif gambar<input v-model="form.hero.imageAlt" required></label>
          <label class="admin-field">Tombol utama<input v-model="form.hero.primaryAction.label" required></label><label class="admin-field">URL tombol utama<input v-model="form.hero.primaryAction.url" required></label><label class="admin-field">Tombol kedua<input v-model="form.hero.secondaryAction.label" required></label><label class="admin-field">URL tombol kedua<input v-model="form.hero.secondaryAction.url" required></label>
          <label class="admin-field">Judul kartu gambar<input v-model="form.hero.cardTitle" required></label><label class="admin-field">Deskripsi kartu gambar<input v-model="form.hero.cardDescription" required></label><label class="admin-field">Badge kiri<input v-model="form.hero.leftBadgeTitle" required></label><label class="admin-field">Keterangan badge kiri<input v-model="form.hero.leftBadgeDescription" required></label><label class="admin-field">Badge kanan<input v-model="form.hero.rightBadgeTitle" required></label><label class="admin-field">Keterangan badge kanan<input v-model="form.hero.rightBadgeDescription" required></label>
        </div>
        <div class="subhead"><h3>Statistik</h3><button type="button" @click="addStat"><Icon name="mdi:plus" /> Tambah</button></div>
        <div v-for="(stat, index) in form.hero.stats" :key="index" class="array-row md:grid-cols-[1fr_2fr_auto]"><label class="admin-field">Nilai<input v-model="stat.value" required></label><label class="admin-field">Label<input v-model="stat.label" required></label><button type="button" class="delete-button" aria-label="Hapus statistik" @click="form.hero.stats.splice(index, 1)"><Icon name="mdi:delete-outline" /></button></div>
      </section>

      <section class="card p-6">
        <h2 class="section-title">Sambutan Kepala Sekolah</h2>
        <div class="form-grid"><label class="admin-field">Label bagian<input v-model="form.welcome.eyebrow" required></label><label class="admin-field">Judul<input v-model="form.welcome.title" required></label><label v-for="(_, index) in form.welcome.paragraphs" :key="index" class="admin-field md:col-span-2">Paragraf {{ index + 1 }}<textarea v-model="form.welcome.paragraphs[index]" required rows="4" /></label><label class="admin-field md:col-span-2">Kutipan<textarea v-model="form.welcome.quote" required rows="3" /></label><label class="admin-field">Nama kepala sekolah<input v-model="form.welcome.headmasterName" required></label><label class="admin-field">Jabatan<input v-model="form.welcome.headmasterRole" required></label><div class="md:col-span-2"><AdminImageUpload v-model="form.welcome.image" :alt="form.welcome.imageAlt" label="Foto kepala sekolah" /></div><label class="admin-field md:col-span-2">Teks alternatif foto<input v-model="form.welcome.imageAlt" required></label><label class="admin-field">Label tautan<input v-model="form.welcome.action.label" required></label><label class="admin-field">URL tautan<input v-model="form.welcome.action.url" required></label></div>
      </section>

      <section class="card p-6">
        <h2 class="section-title">Nilai SAKTI</h2>
        <div class="form-grid"><label class="admin-field">Label bagian<input v-model="form.values.eyebrow" required></label><label class="admin-field">Judul<input v-model="form.values.title" required></label><label class="admin-field md:col-span-2">Deskripsi<textarea v-model="form.values.description" required rows="3" /></label></div>
        <div class="subhead"><h3>Daftar nilai</h3><button type="button" @click="addValue"><Icon name="mdi:plus" /> Tambah</button></div>
        <div v-for="(value, index) in form.values.items" :key="index" class="array-row md:grid-cols-[.5fr_1.5fr_1.5fr_2fr_auto]"><label class="admin-field">Huruf<input v-model="value.letter" maxlength="2" required></label><label class="admin-field">Nama<input v-model="value.label" required></label><label class="admin-field">Ikon<input v-model="value.icon" required></label><label class="admin-field">Kelas warna<input v-model="value.tone" required></label><button type="button" class="delete-button" aria-label="Hapus nilai" @click="form.values.items.splice(index, 1)"><Icon name="mdi:delete-outline" /></button></div>
      </section>

      <section v-for="section in ['programs', 'news'] as const" :key="section" class="card p-6">
        <h2 class="section-title">Bagian {{ section === 'programs' ? 'Program' : 'Berita' }}</h2>
        <div class="form-grid"><label class="admin-field">Label bagian<input v-model="form[section].eyebrow" required></label><label class="admin-field">Judul<input v-model="form[section].title" required></label><label v-if="section === 'programs'" class="admin-field md:col-span-2">Deskripsi<textarea v-model="form.programs.description" required rows="3" /></label><label class="admin-field">Label tautan<input v-model="form[section].action.label" required></label><label class="admin-field">URL tautan<input v-model="form[section].action.url" required></label><label class="admin-field">Jumlah kartu<input v-model.number="form[section].itemLimit" type="number" min="1" max="12" required></label></div>
      </section>

      <section class="card p-6"><h2 class="section-title">Call to Action</h2><div class="form-grid"><label class="admin-field md:col-span-2">Label bagian<input v-model="form.callToAction.eyebrow" required></label><label class="admin-field md:col-span-2">Judul<textarea v-model="form.callToAction.title" required rows="2" /></label><label class="admin-field md:col-span-2">Deskripsi<textarea v-model="form.callToAction.description" required rows="3" /></label><label class="admin-field">Tombol utama<input v-model="form.callToAction.primaryAction.label" required></label><label class="admin-field">URL tombol utama<input v-model="form.callToAction.primaryAction.url" required></label><label class="admin-field">Tombol kedua<input v-model="form.callToAction.secondaryAction.label" required></label><label class="admin-field">URL tombol kedua<input v-model="form.callToAction.secondaryAction.url" required></label></div></section>

      <div class="sticky bottom-4 flex flex-wrap justify-end gap-3 rounded-2xl border border-line bg-white/95 p-4 shadow-xl backdrop-blur"><button type="button" class="btn btn-secondary" @click="reset"><Icon name="mdi:restore" /> Reset</button><button type="submit" class="btn btn-primary" :disabled="saving"><Icon :name="saving ? 'mdi:loading' : 'mdi:content-save-outline'" :class="{ 'animate-spin': saving }" /> {{ saving ? 'Menyimpan...' : 'Simpan perubahan' }}</button></div>
    </form>
  </div>
</template>

<style scoped>
.section-title { font-size: 1.25rem; font-weight: 700; color: var(--color-school-navy); }
.form-grid { display: grid; gap: 1rem; margin-top: 1.25rem; }
.admin-field { display: grid; gap: .5rem; font-size: .875rem; font-weight: 600; color: #334155; }
.admin-field :is(input, textarea) { width: 100%; border: 1px solid var(--color-line); border-radius: .75rem; background: white; padding: .75rem; font-weight: 400; color: #0f172a; }
.admin-field :is(input, textarea):focus { outline: 2px solid color-mix(in srgb, var(--color-school-action) 25%, transparent); border-color: var(--color-school-action); }
.subhead { display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; font-weight: 700; }
.subhead button { color: var(--color-school-action); font-size: .875rem; }
.array-row { display: grid; gap: .75rem; margin-top: .75rem; border-radius: .75rem; background: #f8fafc; padding: 1rem; }
.delete-button { align-self: end; padding: .75rem; color: #b91c1c; }
@media (min-width: 768px) { .form-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
