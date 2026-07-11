<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { modules, loading, saving, notice, save } = useSchoolModules()

const saveContact = async () => {
  modules.value.contact.mapEmbedUrl = normalizeMapEmbedUrl(modules.value.contact.mapEmbedUrl)
  await save()
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-school-navy">
      Kontak
    </h1>
    <p class="mt-1 text-muted">
      Data kontak hanya dapat diedit.
    </p>
    <p v-if="notice" class="notice">
      {{ notice }}
    </p>
    <div v-if="loading" class="card mt-6 p-8">
      Memuat...
    </div>
    <form v-else class="card mt-6 p-6" @submit.prevent="saveContact">
      <div class="grid gap-4 md:grid-cols-2">
        <label class="field">Judul<input v-model="modules.contact.title"></label>
        <label class="field">Email<input v-model="modules.contact.email" type="email"></label>
        <label class="field">Telepon<input v-model="modules.contact.phone"></label>
        <label class="field">URL embed peta<input v-model="modules.contact.mapEmbedUrl" placeholder="https://www.google.com/maps/embed?pb=... atau kode iframe Google Maps"></label>
        <p class="rounded-xl bg-blue-50 p-3 text-sm leading-6 text-blue-800 md:col-span-2">
          Boleh tempel URL embed saja atau kode iframe dari Google Maps. Sistem akan otomatis mengambil URL peta saat disimpan.
        </p>
        <label class="field md:col-span-2">Deskripsi<textarea v-model="modules.contact.description" /></label>
        <label class="field md:col-span-2">Alamat<textarea v-model="modules.contact.address" /></label>
        <div class="md:col-span-2">
          <AdminImageUpload v-model="modules.contact.image" alt="Lokasi sekolah" />
        </div>
      </div>
      <button class="btn btn-primary mt-5 float-right" :disabled="saving">
        Simpan Kontak
      </button>
    </form>
  </div>
</template>

<style scoped>
.field{display:grid;gap:.4rem;font-size:.875rem;font-weight:600}.field :is(input,textarea){border:1px solid var(--color-line);border-radius:.75rem;padding:.75rem;background:white}.notice{margin-top:1rem;border-radius:.75rem;background:#dcfce7;padding:.75rem;color:#166534}
</style>
