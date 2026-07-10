<script setup lang="ts">
import { sitePageRepository } from '~/repositories/dummy/site-page.repository'
import type { ContentStatus } from '~/types/content'
import type { SitePage } from '~/types/site-page'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useSeoMeta({ title: 'Editor Halaman', robots: 'noindex, nofollow' })

const route = useRoute()
const isNew = computed(() => route.params.id === 'baru')
const loading = ref(!isNew.value)
const saving = ref(false)
const error = ref('')
const form = ref<Omit<SitePage, 'id' | 'updatedAt'>>({ slug: '', title: '', eyebrow: 'SD Negeri Sukorame 2', excerpt: '', body: '', image: '', imageAlt: '', status: 'draft' })

onMounted(async () => {
  if (isNew.value) return
  const page = await sitePageRepository.getById(String(route.params.id))
  if (!page) {
    error.value = 'Halaman tidak ditemukan.'
  } else {
    form.value = structuredClone(page)
  }
  loading.value = false
})

const save = async () => {
  saving.value = true
  error.value = ''
  try {
    if (isNew.value) await sitePageRepository.create(form.value)
    else await sitePageRepository.update(String(route.params.id), form.value)
    await navigateTo('/admin/halaman')
  } catch (saveError) {
    error.value = saveError instanceof Error ? saveError.message : 'Halaman gagal disimpan.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-4xl">
    <NuxtLink to="/admin/halaman" class="inline-flex items-center gap-2 text-sm font-bold text-school-action"><Icon name="mdi:arrow-left" /> Kembali</NuxtLink>
    <h1 class="mt-4 text-3xl font-bold text-school-navy">{{ isNew ? 'Tambah Halaman' : 'Edit Halaman' }}</h1>
    <div v-if="loading" class="card mt-6 p-10 text-center"><Icon name="mdi:loading" class="animate-spin" /> Memuat...</div>
    <form v-else class="card mt-6 p-6" @submit.prevent="save">
      <p v-if="error" role="alert" class="mb-5 rounded-xl bg-red-100 p-3 text-red-800">{{ error }}</p>
      <div class="grid gap-4 md:grid-cols-2">
        <label class="admin-field">Judul halaman<input v-model="form.title" required></label>
        <label class="admin-field">Slug / route<input v-model="form.slug" required pattern="[a-z0-9/-]+" placeholder="contoh: akademik/kurikulum"></label>
        <label class="admin-field">Label atas<input v-model="form.eyebrow" required></label>
        <label class="admin-field">Status<select v-model="form.status"><option v-for="status in ['draft', 'published', 'archived'] as ContentStatus[]" :key="status" :value="status">{{ status }}</option></select></label>
        <label class="admin-field md:col-span-2">Ringkasan<textarea v-model="form.excerpt" required rows="3" /></label>
        <label class="admin-field md:col-span-2">Isi halaman<textarea v-model="form.body" required rows="10" /></label>
        <div class="md:col-span-2"><AdminImageUpload v-model="form.image" :alt="form.imageAlt" label="Gambar utama halaman" /></div>
        <label class="admin-field md:col-span-2">Teks alternatif gambar<input v-model="form.imageAlt" :required="Boolean(form.image)"></label>
      </div>
      <div class="mt-6 flex justify-end gap-3"><NuxtLink to="/admin/halaman" class="btn btn-secondary">Batal</NuxtLink><button type="submit" class="btn btn-primary" :disabled="saving"><Icon name="mdi:content-save-outline" /> {{ saving ? 'Menyimpan...' : 'Simpan halaman' }}</button></div>
    </form>
  </div>
</template>

<style scoped>
.admin-field { display: grid; gap: .5rem; font-size: .875rem; font-weight: 600; color: #334155; }
.admin-field :is(input, textarea, select) { width: 100%; border: 1px solid var(--color-line); border-radius: .75rem; background: white; padding: .75rem; font-weight: 400; color: #0f172a; }
</style>
