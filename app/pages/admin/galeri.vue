<script setup lang="ts">
import { toRaw } from 'vue'
import type { GalleryItem } from '~/types/school-modules'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { modules, loading, saving, notice, save } = useSchoolModules()
const { confirm } = useAdminConfirm()
const toast = useToast()
const editing = ref<number | null>(null)
const form = ref<GalleryItem>({ id: '', title: '', description: '', image: '', status: 'draft' })
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(toRaw(value))) as T

const open = (index?: number) => {
  editing.value = index ?? -1
  form.value = index === undefined
    ? { id: crypto.randomUUID(), title: '', description: '', image: '', status: 'draft' }
    : clone(modules.value.gallery[index]!)
}

const store = () => {
  if (editing.value === -1) modules.value.gallery.push(form.value)
  else modules.value.gallery[editing.value!] = form.value
  editing.value = null
  toast.success('Foto galeri siap disimpan. Klik Simpan Galeri agar tersimpan permanen.')
}

const remove = async (index: number) => {
  if (!await confirm({ title: 'Hapus foto?', message: `Foto "${modules.value.gallery[index]!.title}" akan dihapus.`, confirmLabel: 'Hapus' })) return
  modules.value.gallery.splice(index, 1)
  toast.success('Foto dihapus dari daftar. Klik Simpan Galeri agar tersimpan permanen.')
}
</script>

<template>
  <div>
    <div class="flex justify-between">
      <div>
        <h1 class="text-3xl font-bold text-school-navy">
          Galeri
        </h1>
        <p class="mt-1 text-muted">
          CRUD foto, deskripsi, dan status publikasi.
        </p>
      </div>
      <button type="button" class="btn btn-primary" @click="open()">
        <Icon name="mdi:plus" />
        Tambah foto
      </button>
    </div>

    <p v-if="notice" class="notice">
      {{ notice }}
    </p>
    <div v-if="loading" class="card mt-6 p-8">
      Memuat...
    </div>

    <template v-else>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="(item, index) in modules.gallery" :key="item.id" class="card overflow-hidden">
          <img :src="item.image" :alt="item.title" class="aspect-[4/3] w-full object-cover">
          <div class="p-4">
            <b>{{ item.title }}</b>
            <p class="text-sm text-muted">
              {{ item.description }} · {{ item.status }}
            </p>
            <div class="mt-3 flex gap-3">
              <button type="button" @click="open(index)">
                <Icon name="mdi:pencil" />
              </button>
              <button type="button" class="text-red-700" @click="remove(index)">
                <Icon name="mdi:delete" />
              </button>
            </div>
          </div>
        </article>
      </div>
      <button type="button" class="btn btn-primary mt-5 float-right" :disabled="saving" @click="save()">
        Simpan Galeri
      </button>
    </template>

    <AdminModal :open="editing !== null" :title="editing === -1 ? 'Tambah Foto' : 'Edit Foto'" @close="editing = null">
      <form class="grid gap-4 md:grid-cols-2" @submit.prevent="store">
        <label class="field">Judul<input v-model="form.title" required></label>
        <label class="field">Status<select v-model="form.status"><option>draft</option><option>published</option></select></label>
        <label class="field md:col-span-2">Deskripsi<textarea v-model="form.description" rows="4" /></label>
        <div class="md:col-span-2">
          <AdminImageUpload v-model="form.image" :alt="form.title" />
        </div>
        <div class="md:col-span-2 flex justify-end gap-2">
          <button type="button" class="btn btn-secondary" @click="editing = null">
            Batal
          </button>
          <button type="submit" class="btn btn-primary" :disabled="!form.image">
            Simpan
          </button>
        </div>
      </form>
    </AdminModal>
  </div>
</template>

<style scoped>
.field{display:grid;gap:.4rem;font-size:.875rem;font-weight:600}.field :is(input,textarea,select){border:1px solid var(--color-line);border-radius:.75rem;padding:.75rem;background:white}.notice{margin-top:1rem;border-radius:.75rem;background:#dcfce7;padding:.75rem;color:#166534}
</style>
