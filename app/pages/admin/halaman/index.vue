<script setup lang="ts">
import { sitePageRepository } from '~/repositories/dummy/site-page.repository'
import type { SitePage } from '~/types/site-page'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useSeoMeta({ title: 'Kelola Halaman', robots: 'noindex, nofollow' })

const pages = ref<SitePage[]>([])
const search = ref('')
const loading = ref(true)
const notice = ref('')

const load = async () => {
  loading.value = true
  pages.value = (await sitePageRepository.list({ search: search.value, perPage: 100 })).items
  loading.value = false
}
onMounted(load)
watch(search, load)

const remove = async (page: SitePage) => {
  if (!confirm(`Hapus halaman “${page.title}”?`)) return
  await sitePageRepository.remove(page.id)
  notice.value = 'Halaman berhasil dihapus.'
  await load()
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-4"><div><h1 class="text-3xl font-bold text-school-navy">Kelola Semua Halaman</h1><p class="mt-1 text-muted">CRUD data setiap route publik selain konfigurasi khusus beranda.</p></div><NuxtLink to="/admin/halaman/baru" class="btn btn-primary"><Icon name="mdi:plus" /> Tambah halaman</NuxtLink></div>
    <p v-if="notice" role="status" class="mt-5 rounded-xl bg-green-100 p-3 text-green-900">{{ notice }}</p>
    <div class="card mt-6 p-4"><label class="text-sm font-semibold" for="page-search">Cari halaman</label><input id="page-search" v-model="search" class="mt-2 w-full rounded-xl border border-line p-3" placeholder="Judul atau slug..."></div>
    <div class="card mt-5 overflow-x-auto">
      <div v-if="loading" class="p-8 text-center"><Icon name="mdi:loading" class="animate-spin" /> Memuat...</div>
      <table v-else class="w-full min-w-[760px] text-left"><thead class="bg-slate-50 text-sm"><tr><th class="p-4">Halaman</th><th>Route</th><th>Status</th><th>Terakhir diubah</th><th class="p-4 text-right">Aksi</th></tr></thead><tbody><tr v-for="page in pages" :key="page.id" class="border-t border-line"><td class="p-4 font-semibold text-school-navy">{{ page.title }}</td><td><code>/{{ page.slug }}</code></td><td><span class="rounded-full bg-blue-100 px-3 py-1 text-xs">{{ page.status }}</span></td><td class="text-sm text-muted">{{ new Date(page.updatedAt).toLocaleDateString('id-ID') }}</td><td class="p-4 text-right"><NuxtLink :to="`/admin/halaman/${page.id}`" class="mr-3 text-school-action" :aria-label="`Edit ${page.title}`"><Icon name="mdi:pencil-outline" size="22" /></NuxtLink><button class="text-red-700" :aria-label="`Hapus ${page.title}`" @click="remove(page)"><Icon name="mdi:delete-outline" size="22" /></button></td></tr></tbody></table>
    </div>
  </div>
</template>
