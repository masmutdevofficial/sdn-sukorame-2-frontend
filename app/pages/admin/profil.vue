<script setup lang="ts">
import type { EditableSection, Teacher } from '~/types/school-modules'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { modules, loading, saving, notice, save } = useSchoolModules()
const { confirm } = useAdminConfirm()
const toast = useToast()
const editingTeacher = ref<number | null>(null)
const teacherForm = ref<Teacher>({ id: '', name: '', role: '', bio: '', image: '', status: 'draft' })
const htmlSectionIds = ['history', 'vision']

const supportsHtml = (section: EditableSection) => htmlSectionIds.includes(section.id)

const editTeacher = (index?: number) => {
  editingTeacher.value = index ?? -1
  teacherForm.value = index === undefined
    ? { id: crypto.randomUUID(), name: '', role: '', bio: '', image: '', status: 'draft' }
    : structuredClone(modules.value.teachers[index]!)
}

const storeTeacher = () => {
  if (editingTeacher.value === -1) modules.value.teachers.push(teacherForm.value)
  else modules.value.teachers[editingTeacher.value!] = teacherForm.value
  editingTeacher.value = null
  toast.success('Data pendidik siap disimpan.')
}

const removeTeacher = async (index: number) => {
  if (await confirm({
    title: 'Hapus pendidik?',
    message: `Data "${modules.value.teachers[index]!.name}" akan dihapus.`,
    confirmLabel: 'Hapus',
  })) modules.value.teachers.splice(index, 1)
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-school-navy">
      Profil
    </h1>
    <p class="mt-1 text-muted">
      Edit setiap bagian profil dan kelola data pendidik.
    </p>
    <p v-if="notice" class="notice">
      {{ notice }}
    </p>

    <div v-if="loading" class="card mt-6 p-8 text-center">
      Memuat...
    </div>

    <div v-else class="mt-6 grid gap-6">
      <section v-for="section in modules.profileSections" :key="section.id" class="card p-6">
        <h2 class="text-xl font-bold text-school-navy">
          {{ section.eyebrow }}
        </h2>
        <div class="form-grid">
          <label class="field">Label<input v-model="section.eyebrow"></label>
          <label class="field">Judul<input v-model="section.title"></label>
          <label class="field md:col-span-2">
            Isi
            <textarea v-model="section.body" rows="7" />
            <small v-if="supportsHtml(section)" class="rounded-xl bg-blue-50 p-3 text-xs leading-5 text-blue-800">
              Bagian ini mendukung HTML aman seperti &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;h3&gt;, &lt;a&gt;, dan tabel sederhana. Script, style, dan atribut event akan dibersihkan otomatis oleh backend.
            </small>
            <small v-else class="text-xs leading-5 text-muted">
              Gunakan teks biasa untuk bagian ini.
            </small>
          </label>
          <div class="md:col-span-2">
            <AdminImageUpload v-model="section.image" :alt="section.imageAlt" />
          </div>
          <label class="field md:col-span-2">Alt gambar<input v-model="section.imageAlt"></label>
        </div>
      </section>

      <section class="card p-6">
        <div class="flex justify-between">
          <h2 class="text-xl font-bold text-school-navy">
            Pendidik
          </h2>
          <button class="btn btn-primary" @click="editTeacher()">
            <Icon name="mdi:plus" />
            Tambah
          </button>
        </div>
        <div class="mt-5 grid gap-3">
          <article v-for="(teacher, index) in modules.teachers" :key="teacher.id" class="flex items-center gap-4 rounded-xl border border-line p-4">
            <img :src="teacher.image || 'https://cdn.sdnsukorame2kotakediri.sch.id/images/user.png'" :alt="teacher.name" class="size-16 rounded-lg object-cover">
            <div class="flex-1">
              <b>{{ teacher.name }}</b>
              <p class="text-sm text-muted">
                {{ teacher.role }} - {{ teacher.status }}
              </p>
            </div>
            <button @click="editTeacher(index)">
              <Icon name="mdi:pencil" />
            </button>
            <button class="text-red-700" @click="removeTeacher(index)">
              <Icon name="mdi:delete" />
            </button>
          </article>
        </div>
      </section>

      <button class="btn btn-primary justify-self-end" :disabled="saving" @click="save()">
        <Icon name="mdi:content-save" />
        Simpan Profil
      </button>
    </div>

    <AdminModal :open="editingTeacher !== null" :title="editingTeacher === -1 ? 'Tambah Pendidik' : 'Edit Pendidik'" size="lg" @close="editingTeacher = null">
      <form class="form-grid" @submit.prevent="storeTeacher">
        <label class="field">Nama<input v-model="teacherForm.name" required></label>
        <label class="field">Jabatan<input v-model="teacherForm.role" required></label>
        <label class="field md:col-span-2">Bio<textarea v-model="teacherForm.bio" rows="4" /></label>
        <div class="md:col-span-2">
          <AdminImageUpload v-model="teacherForm.image" :alt="teacherForm.name" />
        </div>
        <label class="field">Status<select v-model="teacherForm.status"><option>draft</option><option>published</option></select></label>
        <div class="md:col-span-2 flex justify-end gap-2">
          <button type="button" class="btn btn-secondary" @click="editingTeacher = null">
            Batal
          </button>
          <button class="btn btn-primary">
            Simpan pendidik
          </button>
        </div>
      </form>
    </AdminModal>
  </div>
</template>

<style scoped>
.form-grid{display:grid;gap:1rem;margin-top:1rem}.field{display:grid;gap:.4rem;font-size:.875rem;font-weight:600}.field :is(input,textarea,select){border:1px solid var(--color-line);border-radius:.75rem;padding:.75rem;background:white}.notice{margin-top:1rem;border-radius:.75rem;background:#dcfce7;padding:.75rem;color:#166534}@media(min-width:768px){.form-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style>
