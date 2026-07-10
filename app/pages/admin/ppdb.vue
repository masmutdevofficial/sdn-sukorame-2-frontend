<script setup lang="ts">
import { toRaw } from 'vue'
import type { PpdbFaq, PpdbRequirement, PpdbStep } from '~/types/school-modules'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { modules, loading, saving, notice, save } = useSchoolModules()
const { confirm } = useAdminConfirm()
const toast = useToast()
const reqIndex = ref<number | null>(null)
const stepIndex = ref<number | null>(null)
const faqIndex = ref<number | null>(null)
const reqForm = ref<PpdbRequirement>({ id: '', text: '' })
const stepForm = ref<PpdbStep>({ id: '', title: '', description: '' })
const faqForm = ref<PpdbFaq>({ id: '', question: '', answer: '' })
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(toRaw(value))) as T
const pendingSaveMessage = 'Perubahan sudah masuk daftar. Klik Simpan PPDB agar tersimpan permanen.'

const editReq = (index?: number) => {
  reqIndex.value = index ?? -1
  reqForm.value = index === undefined ? { id: crypto.randomUUID(), text: '' } : clone(modules.value.ppdb.requirements[index]!)
}

const storeReq = () => {
  if (reqIndex.value === -1) modules.value.ppdb.requirements.push(reqForm.value)
  else modules.value.ppdb.requirements[reqIndex.value!] = reqForm.value
  reqIndex.value = null
  toast.success(pendingSaveMessage, 'Syarat PPDB siap disimpan')
}

const removeReq = async (index: number) => {
  if (!await confirm({ title: 'Hapus syarat?', message: 'Syarat PPDB ini akan dihapus.', confirmLabel: 'Hapus' })) return
  modules.value.ppdb.requirements.splice(index, 1)
  toast.success(pendingSaveMessage, 'Syarat PPDB dihapus')
}

const editStep = (index?: number) => {
  stepIndex.value = index ?? -1
  stepForm.value = index === undefined ? { id: crypto.randomUUID(), title: '', description: '' } : clone(modules.value.ppdb.steps[index]!)
}

const storeStep = () => {
  if (stepIndex.value === -1) modules.value.ppdb.steps.push(stepForm.value)
  else modules.value.ppdb.steps[stepIndex.value!] = stepForm.value
  stepIndex.value = null
  toast.success(pendingSaveMessage, 'Alur PPDB siap disimpan')
}

const removeStep = async (index: number) => {
  if (!await confirm({ title: 'Hapus alur?', message: `Langkah "${modules.value.ppdb.steps[index]!.title}" akan dihapus.`, confirmLabel: 'Hapus' })) return
  modules.value.ppdb.steps.splice(index, 1)
  toast.success(pendingSaveMessage, 'Alur PPDB dihapus')
}

const editFaq = (index?: number) => {
  faqIndex.value = index ?? -1
  faqForm.value = index === undefined ? { id: crypto.randomUUID(), question: '', answer: '' } : clone(modules.value.ppdb.faqs[index]!)
}

const storeFaq = () => {
  if (faqIndex.value === -1) modules.value.ppdb.faqs.push(faqForm.value)
  else modules.value.ppdb.faqs[faqIndex.value!] = faqForm.value
  faqIndex.value = null
  toast.success(pendingSaveMessage, 'FAQ PPDB siap disimpan')
}

const removeFaq = async (index: number) => {
  if (!await confirm({ title: 'Hapus FAQ?', message: `Pertanyaan "${modules.value.ppdb.faqs[index]!.question}" akan dihapus.`, confirmLabel: 'Hapus' })) return
  modules.value.ppdb.faqs.splice(index, 1)
  toast.success(pendingSaveMessage, 'FAQ PPDB dihapus')
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-school-navy">
      PPDB
    </h1>
    <p class="mt-1 text-muted">
      Atur tanggal, hitung mundur, syarat, alur, dan FAQ.
    </p>
    <p v-if="notice" class="notice">
      {{ notice }}
    </p>
    <div v-if="loading" class="card mt-6 p-8">
      Memuat...
    </div>

    <form v-else class="mt-6 grid gap-6" @submit.prevent="save()">
      <section class="card p-6">
        <h2 class="heading">
          Pengaturan Utama
        </h2>
        <div class="form-grid">
          <label class="field">Judul<input v-model="modules.ppdb.title"></label>
          <label class="field">Hitung mundur<select v-model="modules.ppdb.countdownEnabled"><option :value="true">Aktif</option><option :value="false">Nonaktif</option></select></label>
          <label class="field">Tanggal mulai<input v-model="modules.ppdb.startDate" type="datetime-local"></label>
          <label class="field">Tanggal selesai<input v-model="modules.ppdb.endDate" type="datetime-local"></label>
          <label class="field md:col-span-2">Deskripsi<textarea v-model="modules.ppdb.description" /></label>
          <div class="md:col-span-2">
            <AdminImageUpload v-model="modules.ppdb.image" alt="PPDB" />
          </div>
        </div>
      </section>

      <section class="card p-6">
        <div class="flex justify-between">
          <h2 class="heading">
            Syarat PPDB
          </h2>
          <button type="button" class="btn btn-secondary" @click="editReq()">
            Tambah
          </button>
        </div>
        <article v-for="(item, index) in modules.ppdb.requirements" :key="item.id" class="row">
          <span class="flex-1">{{ item.text }}</span>
          <button type="button" @click="editReq(index)">
            <Icon name="mdi:pencil" />
          </button>
          <button type="button" class="text-red-700" @click="removeReq(index)">
            <Icon name="mdi:delete" />
          </button>
        </article>
      </section>

      <section class="card p-6">
        <div class="flex justify-between">
          <h2 class="heading">
            Alur PPDB
          </h2>
          <button type="button" class="btn btn-secondary" @click="editStep()">
            Tambah
          </button>
        </div>
        <article v-for="(item, index) in modules.ppdb.steps" :key="item.id" class="row">
          <div class="flex-1">
            <b>{{ item.title }}</b>
            <p class="text-sm text-muted">
              {{ item.description }}
            </p>
          </div>
          <button type="button" @click="editStep(index)">
            <Icon name="mdi:pencil" />
          </button>
          <button type="button" class="text-red-700" @click="removeStep(index)">
            <Icon name="mdi:delete" />
          </button>
        </article>
      </section>

      <section class="card p-6">
        <div class="flex justify-between">
          <h2 class="heading">
            FAQ PPDB
          </h2>
          <button type="button" class="btn btn-secondary" @click="editFaq()">
            Tambah
          </button>
        </div>
        <article v-for="(item, index) in modules.ppdb.faqs" :key="item.id" class="row">
          <div class="flex-1">
            <b>{{ item.question }}</b>
            <p class="text-sm text-muted">
              {{ item.answer }}
            </p>
          </div>
          <button type="button" @click="editFaq(index)">
            <Icon name="mdi:pencil" />
          </button>
          <button type="button" class="text-red-700" @click="removeFaq(index)">
            <Icon name="mdi:delete" />
          </button>
        </article>
      </section>

      <button type="submit" class="btn btn-primary justify-self-end" :disabled="saving">
        Simpan PPDB
      </button>
    </form>

    <AdminModal :open="reqIndex !== null" :title="reqIndex === -1 ? 'Tambah Syarat' : 'Edit Syarat'" size="md" @close="reqIndex = null">
      <form @submit.prevent="storeReq">
        <label class="field">Syarat<textarea v-model="reqForm.text" rows="4" required /></label>
        <div class="actions">
          <button type="button" class="btn btn-secondary" @click="reqIndex = null">
            Batal
          </button>
          <button type="submit" class="btn btn-primary">
            Simpan
          </button>
        </div>
      </form>
    </AdminModal>

    <AdminModal :open="stepIndex !== null" :title="stepIndex === -1 ? 'Tambah Alur' : 'Edit Alur'" @close="stepIndex = null">
      <form class="grid gap-4" @submit.prevent="storeStep">
        <label class="field">Judul<input v-model="stepForm.title" required></label>
        <label class="field">Deskripsi<textarea v-model="stepForm.description" rows="5" required /></label>
        <div class="actions">
          <button type="button" class="btn btn-secondary" @click="stepIndex = null">
            Batal
          </button>
          <button type="submit" class="btn btn-primary">
            Simpan
          </button>
        </div>
      </form>
    </AdminModal>

    <AdminModal :open="faqIndex !== null" :title="faqIndex === -1 ? 'Tambah FAQ' : 'Edit FAQ'" @close="faqIndex = null">
      <form class="grid gap-4" @submit.prevent="storeFaq">
        <label class="field">Pertanyaan<input v-model="faqForm.question" required></label>
        <label class="field">Jawaban<textarea v-model="faqForm.answer" rows="5" required /></label>
        <div class="actions">
          <button type="button" class="btn btn-secondary" @click="faqIndex = null">
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
.heading{font-size:1.25rem;font-weight:700;color:var(--color-school-navy)}.form-grid{display:grid;gap:1rem;margin-top:1rem}.field{display:grid;gap:.4rem;font-size:.875rem;font-weight:600}.field :is(input,textarea,select){border:1px solid var(--color-line);border-radius:.75rem;padding:.75rem;background:white}.row{display:flex;align-items:center;gap:.75rem;border-top:1px solid var(--color-line);padding:1rem 0}.actions{display:flex;justify-content:flex-end;gap:.75rem;margin-top:1.25rem}.notice{margin-top:1rem;border-radius:.75rem;background:#dcfce7;padding:.75rem;color:#166534}@media(min-width:768px){.form-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style>
