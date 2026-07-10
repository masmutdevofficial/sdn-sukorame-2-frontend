<script setup lang="ts">
import { toRaw } from 'vue'
import type { Activity, ModuleCategory } from '~/types/school-modules'

const props = defineProps<{ title: string; description: string; categories: ModuleCategory[]; items: Activity[] }>()
const { confirm } = useAdminConfirm()
const toast = useToast()

const categoryIndex = ref<number | null>(null)
const itemIndex = ref<number | null>(null)
const categoryForm = ref<ModuleCategory>({ id: '', name: '', description: '', status: 'draft' })
const itemForm = ref<Activity>({ id: '', categoryId: '', title: '', description: '', date: '', images: [], status: 'draft' })

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(toRaw(value))) as T
const pendingSaveMessage = 'Perubahan sudah masuk daftar. Klik tombol Simpan di halaman ini agar tersimpan permanen.'

const editCategory = (index?: number) => {
  categoryIndex.value = index ?? -1
  categoryForm.value = index === undefined
    ? { id: crypto.randomUUID(), name: '', description: '', status: 'draft' }
    : clone(props.categories[index]!)
}

const storeCategory = () => {
  if (categoryIndex.value === -1) props.categories.push(categoryForm.value)
  else props.categories[categoryIndex.value!] = categoryForm.value
  categoryIndex.value = null
  toast.success(pendingSaveMessage, 'Kategori siap disimpan')
}

const removeCategory = async (index: number) => {
  const category = props.categories[index]!
  const linkedItems = props.items.filter(item => item.categoryId === category.id)
  const message = linkedItems.length
    ? `Kategori "${category.name}" dan ${linkedItems.length} konten di dalamnya akan dihapus.`
    : `Kategori "${category.name}" akan dihapus.`

  if (!await confirm({ title: 'Hapus kategori?', message, confirmLabel: 'Hapus' })) return

  for (let itemIndex = props.items.length - 1; itemIndex >= 0; itemIndex--) {
    if (props.items[itemIndex]?.categoryId === category.id) props.items.splice(itemIndex, 1)
  }
  props.categories.splice(index, 1)
  toast.success(pendingSaveMessage, 'Kategori dihapus')
}

const editItem = (index?: number) => {
  itemIndex.value = index ?? -1
  itemForm.value = index === undefined
    ? { id: crypto.randomUUID(), categoryId: props.categories[0]?.id || '', title: '', description: '', date: new Date().toISOString().slice(0, 10), images: [], status: 'draft' }
    : clone(props.items[index]!)
}

const storeItem = () => {
  if (itemIndex.value === -1) props.items.push(itemForm.value)
  else props.items[itemIndex.value!] = itemForm.value
  itemIndex.value = null
  toast.success(pendingSaveMessage, 'Konten siap disimpan')
}

const removeItem = async (index: number) => {
  const item = props.items[index]!
  if (!await confirm({ title: 'Hapus konten?', message: `Konten "${item.title}" akan dihapus.`, confirmLabel: 'Hapus' })) return
  props.items.splice(index, 1)
  toast.success(pendingSaveMessage, 'Konten dihapus')
}

const categoryName = (id: string) => props.categories.find(category => category.id === id)?.name || '-'
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-school-navy">
      {{ title }}
    </h1>
    <p class="mt-1 text-muted">
      {{ description }}
    </p>

    <section class="card mt-6 p-6">
      <div class="flex justify-between gap-3">
        <h2 class="text-xl font-bold">
          Kategori
        </h2>
        <button type="button" class="btn btn-primary" @click="editCategory()">
          <Icon name="mdi:plus" />
          Tambah kategori
        </button>
      </div>
      <div class="mt-4 grid gap-2">
        <article v-for="(category, index) in categories" :key="category.id" class="flex gap-3 rounded-xl border p-4">
          <div class="flex-1">
            <b>{{ category.name }}</b>
            <p class="text-sm text-muted">
              {{ category.description }} · {{ category.status }}
            </p>
          </div>
          <button type="button" aria-label="Edit kategori" @click="editCategory(index)">
            <Icon name="mdi:pencil" />
          </button>
          <button type="button" class="text-red-700" aria-label="Hapus kategori" @click="removeCategory(index)">
            <Icon name="mdi:delete" />
          </button>
        </article>
      </div>
    </section>

    <section class="card mt-6 p-6">
      <div class="flex justify-between gap-3">
        <h2 class="text-xl font-bold">
          Kegiatan / Konten
        </h2>
        <button type="button" class="btn btn-primary" :disabled="!categories.length" @click="editItem()">
          <Icon name="mdi:plus" />
          Tambah
        </button>
      </div>
      <div class="mt-4 grid gap-3">
        <article v-for="(item, index) in items" :key="item.id" class="flex items-center gap-4 rounded-xl border p-4">
          <img :src="item.images[0] || 'https://cdn.sdnsukorame2kotakediri.sch.id/images/no-image.png'" :alt="item.title" class="size-20 rounded-lg object-cover">
          <div class="flex-1">
            <b>{{ item.title }}</b>
            <p class="text-sm text-muted">
              {{ categoryName(item.categoryId) }} · {{ item.date }} · {{ item.status }} · {{ item.images.length }} gambar
            </p>
          </div>
          <button type="button" aria-label="Edit konten" @click="editItem(index)">
            <Icon name="mdi:pencil" />
          </button>
          <button type="button" class="text-red-700" aria-label="Hapus konten" @click="removeItem(index)">
            <Icon name="mdi:delete" />
          </button>
        </article>
      </div>
    </section>

    <AdminModal :open="categoryIndex !== null" :title="categoryIndex === -1 ? 'Tambah Kategori' : 'Edit Kategori'" @close="categoryIndex = null">
      <form class="form-grid" @submit.prevent="storeCategory">
        <label class="field">Nama<input v-model="categoryForm.name" required></label>
        <label class="field">Status<select v-model="categoryForm.status"><option>draft</option><option>published</option></select></label>
        <label class="field md:col-span-2">Deskripsi<textarea v-model="categoryForm.description" rows="4" /></label>
        <div class="md:col-span-2 flex justify-end gap-2">
          <button type="button" class="btn btn-secondary" @click="categoryIndex = null">
            Batal
          </button>
          <button type="submit" class="btn btn-primary">
            Simpan kategori
          </button>
        </div>
      </form>
    </AdminModal>

    <AdminModal :open="itemIndex !== null" :title="itemIndex === -1 ? 'Tambah Konten' : 'Edit Konten'" size="xl" @close="itemIndex = null">
      <form class="form-grid" @submit.prevent="storeItem">
        <label class="field">Judul<input v-model="itemForm.title" required></label>
        <label class="field">Kategori<select v-model="itemForm.categoryId" required><option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option></select></label>
        <label class="field">Tanggal<input v-model="itemForm.date" type="date" required></label>
        <label class="field">Status<select v-model="itemForm.status"><option>draft</option><option>published</option></select></label>
        <label class="field md:col-span-2">Deskripsi<textarea v-model="itemForm.description" rows="5" required /></label>
        <div class="md:col-span-2">
          <AdminMultiImageUpload v-model="itemForm.images" />
        </div>
        <div class="md:col-span-2 flex justify-end gap-2">
          <button type="button" class="btn btn-secondary" @click="itemIndex = null">
            Batal
          </button>
          <button type="submit" class="btn btn-primary">
            Simpan
          </button>
        </div>
      </form>
    </AdminModal>
  </div>
</template>

<style scoped>
.form-grid{display:grid;gap:1rem}.field{display:grid;gap:.4rem;font-size:.875rem;font-weight:600}.field :is(input,textarea,select){border:1px solid var(--color-line);border-radius:.75rem;padding:.75rem;background:white}@media(min-width:768px){.form-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style>
