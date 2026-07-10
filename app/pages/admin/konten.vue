<script setup lang="ts">
import { contentRepository } from '~/repositories/dummy/content.repository'
import type { ContentItem, ContentStatus } from '~/types/content'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useSeoMeta({ title: 'Kelola Konten', robots: 'noindex, nofollow' })

const items = ref<ContentItem[]>([])
const search = ref('')
const loading = ref(true)
const saving = ref(false)
const notice = ref('')
const editingId = ref<string | null>(null)
const editorOpen = ref(false)
const form = ref(newForm())
let searchTimer: ReturnType<typeof setTimeout>

function newForm(): Omit<ContentItem, 'id' | 'date'> {
  return { title: '', slug: '', excerpt: '', body: '', category: 'Berita', status: 'draft', icon: 'mdi:newspaper-variant-outline', image: '/images/no-image.png' }
}

const load = async () => {
  loading.value = true
  items.value = (await contentRepository.list({ search: search.value, perPage: 100 })).items
  loading.value = false
}

onMounted(load)
watch(search, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(load, 300)
})

const openCreate = () => {
  editingId.value = null
  form.value = newForm()
  editorOpen.value = true
}

const openEdit = (item: ContentItem) => {
  editingId.value = item.id
  form.value = structuredClone(item)
  editorOpen.value = true
}

const save = async () => {
  saving.value = true
  if (editingId.value) {
    await contentRepository.update(editingId.value, form.value)
    notice.value = 'Konten berhasil diperbarui.'
  } else {
    await contentRepository.create(form.value)
    notice.value = 'Konten baru berhasil ditambahkan.'
  }
  saving.value = false
  editorOpen.value = false
  await load()
}

const remove = async (item: ContentItem) => {
  if (!confirm(`Hapus “${item.title}”?`)) return
  await contentRepository.remove(item.id)
  notice.value = 'Konten berhasil dihapus.'
  await load()
}

const reset = async () => {
  if (!confirm('Reset seluruh dummy data?')) return
  localStorage.removeItem('sdn-sukorame-2-demo-db-v1')
  notice.value = 'Dummy data telah direset.'
  await load()
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-3"><div><h1 class="text-3xl font-bold text-school-navy">Berita & Program</h1><p class="mt-1 text-muted">Kelola kartu konten yang muncul pada landing page.</p></div><button class="btn btn-primary" @click="openCreate"><Icon name="mdi:plus" /> Tambah Konten</button></div>
    <p v-if="notice" role="status" class="mt-5 rounded-xl bg-green-100 p-3 text-green-900">{{ notice }}</p>

    <form v-if="editorOpen" class="card mt-6 p-6" @submit.prevent="save">
      <div class="flex items-center justify-between"><h2 class="text-xl font-bold text-school-navy">{{ editingId ? 'Edit konten' : 'Tambah konten' }}</h2><button type="button" aria-label="Tutup editor" @click="editorOpen = false"><Icon name="mdi:close" size="24" /></button></div>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <label class="admin-field md:col-span-2">Judul<input v-model="form.title" required></label>
        <label class="admin-field">Slug<input v-model="form.slug" required pattern="[a-z0-9-]+"></label>
        <label class="admin-field">Kategori<select v-model="form.category"><option>Berita</option><option>Program Sekolah</option><option>Pengumuman</option><option>Agenda</option><option>Ekstrakurikuler</option><option>Prestasi Demo</option><option>Karya Siswa Demo</option></select></label>
        <label class="admin-field">Status<select v-model="form.status"><option v-for="status in ['draft', 'published', 'archived'] as ContentStatus[]" :key="status" :value="status">{{ status }}</option></select></label>
        <label class="admin-field">URL gambar<input v-model="form.image"></label>
        <label class="admin-field md:col-span-2">Ringkasan<textarea v-model="form.excerpt" required rows="3" /></label>
        <label class="admin-field md:col-span-2">Isi konten<textarea v-model="form.body" required rows="8" /></label>
      </div>
      <div class="mt-5 flex justify-end gap-3"><button type="button" class="btn btn-secondary" @click="editorOpen = false">Batal</button><button type="submit" class="btn btn-primary" :disabled="saving"><Icon name="mdi:content-save-outline" /> {{ saving ? 'Menyimpan...' : 'Simpan' }}</button></div>
    </form>

    <div class="card mt-6 p-4"><label class="text-sm font-semibold" for="search">Cari konten</label><input id="search" v-model="search" class="mt-2 w-full rounded-xl border border-line p-3" placeholder="Ketik judul..."></div>
    <div class="card mt-5 overflow-x-auto"><div v-if="loading" class="p-8 text-center"><Icon name="mdi:loading" class="animate-spin" /> Memuat...</div><table v-else class="w-full min-w-[720px] text-left"><thead class="bg-slate-50 text-sm"><tr><th class="p-4">Judul</th><th>Kategori</th><th>Status</th><th class="p-4 text-right">Aksi</th></tr></thead><tbody><tr v-for="item in items" :key="item.id" class="border-t border-line"><td class="p-4 font-semibold">{{ item.title }}</td><td>{{ item.category }}</td><td><span class="rounded-full bg-blue-100 px-3 py-1 text-xs">{{ item.status }}</span></td><td class="p-4 text-right"><button class="mr-3 text-school-action" :aria-label="`Edit ${item.title}`" @click="openEdit(item)"><Icon name="mdi:pencil-outline" size="22" /></button><button class="text-red-700" :aria-label="`Hapus ${item.title}`" @click="remove(item)"><Icon name="mdi:delete-outline" size="22" /></button></td></tr></tbody></table></div>
    <button class="btn btn-secondary mt-5" @click="reset"><Icon name="mdi:restore" /> Reset Dummy Data</button>
  </div>
</template>

<style scoped>
.admin-field { display: grid; gap: .5rem; font-size: .875rem; font-weight: 600; color: #334155; }
.admin-field :is(input, textarea, select) { width: 100%; border: 1px solid var(--color-line); border-radius: .75rem; background: white; padding: .75rem; font-weight: 400; color: #0f172a; }
</style>
