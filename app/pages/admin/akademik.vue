<script setup lang="ts">
import { toRaw } from 'vue'
import type { AcademicDocument } from '~/types/school-modules'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
const { modules, loading, saving, notice, save } = useSchoolModules()
const { confirm } = useAdminConfirm()
const editing = ref<number | null>(null)
const form = ref<AcademicDocument>({ id: '', title: '', description: '', file: '', filename: '', status: 'draft' })
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(toRaw(value))) as T

const open = (index?: number) => {
  editing.value = index ?? -1
  form.value = index === undefined
    ? { id: crypto.randomUUID(), title: '', description: '', file: '', filename: '', status: 'draft' }
    : clone(modules.value.academicDocuments[index]!)
}
const store = async () => {
  const message = editing.value === -1 ? 'Dokumen berhasil ditambahkan.' : 'Dokumen berhasil diperbarui.'
  if (editing.value === -1) modules.value.academicDocuments.push(form.value)
  else modules.value.academicDocuments[editing.value!] = form.value
  editing.value = null
  await save(message)
}
const remove = async (index: number) => {
  if (!await confirm({ title: 'Hapus PDF?', message: `Dokumen "${modules.value.academicDocuments[index]!.title}" akan dihapus.`, confirmLabel: 'Hapus' })) return
  modules.value.academicDocuments.splice(index, 1)
  await save('Dokumen berhasil dihapus.')
}
</script>

<template>
  <div>
    <div class="flex justify-between gap-4"><div><h1 class="text-3xl font-bold text-school-navy">Akademik</h1><p class="mt-1 text-muted">Kelola program sekolah dan dokumen akademik.</p></div><button type="button" class="btn btn-primary" @click="open()"><Icon name="mdi:plus" /> Tambah PDF</button></div>
    <p v-if="notice" class="notice">{{ notice }}</p>
    <div v-if="loading" class="card mt-6 p-8">Memuat...</div>
    <template v-else>
      <section class="card mt-6 overflow-hidden"><article v-for="(doc,index) in modules.academicDocuments" :key="doc.id" class="flex items-center gap-4 border-b border-line p-4"><Icon name="mdi:file-pdf-box" size="38" class="text-red-600"/><div class="flex-1"><b>{{ doc.title }}</b><p class="text-sm text-muted">{{ doc.filename }} · {{ doc.status }}</p></div><button type="button" @click="open(index)"><Icon name="mdi:pencil"/></button><button type="button" class="text-red-700" @click="remove(index)"><Icon name="mdi:delete"/></button></article><p v-if="!modules.academicDocuments.length" class="p-8 text-center text-muted">Belum ada dokumen.</p></section>
      <div class="mt-10"><AdminCategorizedContent title="Program Sekolah" description="Kelola kartu program yang tampil pada landing page." :categories="modules.programCategories" :items="modules.programs" :persist="save" /></div>
      <button type="button" class="btn btn-primary mt-5 float-right" :disabled="saving" @click="save()">Simpan Akademik</button>
    </template>
    <AdminModal :open="editing!==null" :title="editing===-1?'Tambah Dokumen':'Edit Dokumen'" @close="editing=null"><form class="form-grid" @submit.prevent="store"><label class="field">Judul<input v-model="form.title" required></label><label class="field">Status<select v-model="form.status"><option>draft</option><option>published</option></select></label><label class="field md:col-span-2">Deskripsi<textarea v-model="form.description" rows="4"/></label><div class="md:col-span-2"><AdminPdfUpload v-model="form.file" v-model:filename="form.filename"/></div><div class="md:col-span-2 flex justify-end gap-2"><button type="button" class="btn btn-secondary" @click="editing=null">Batal</button><button type="submit" class="btn btn-primary" :disabled="!form.file || saving">{{ saving ? 'Menyimpan...' : 'Simpan' }}</button></div></form></AdminModal>
  </div>
</template>

<style scoped>.form-grid{display:grid;gap:1rem}.field{display:grid;gap:.4rem;font-size:.875rem;font-weight:600}.field :is(input,textarea,select){border:1px solid var(--color-line);border-radius:.75rem;padding:.75rem;background:white}.notice{margin-top:1rem;border-radius:.75rem;background:#dcfce7;padding:.75rem;color:#166534}@media(min-width:768px){.form-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}</style>
