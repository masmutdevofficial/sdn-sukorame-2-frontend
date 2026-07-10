<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useSeoMeta({ title: 'Dashboard Admin', robots: 'noindex, nofollow' })
const stats = [
  { label: 'Konten', value: '39', icon: 'mdi:file-document-multiple-outline' },
  { label: 'Pesan', value: '6', icon: 'mdi:email-outline' },
  { label: 'Album', value: '5', icon: 'mdi:image-multiple-outline' },
  { label: 'Pengguna', value: '3', icon: 'mdi:account-group-outline' },
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-school-navy">Dashboard</h1>
    <p class="mt-2 text-muted">Ringkasan aktivitas konten demonstrasi.</p>
    <div class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><article v-for="stat in stats" :key="stat.label" class="card p-5"><Icon :name="stat.icon" size="30" class="text-school-action" /><p class="mt-4 text-sm text-muted">{{ stat.label }}</p><b class="text-3xl text-school-navy">{{ stat.value }}</b></article></div>
    <div class="card mt-7 p-6"><h2 class="text-xl font-bold text-school-navy">Aksi cepat</h2><div class="mt-5 flex flex-wrap gap-3"><NuxtLink to="/admin/halaman" class="btn btn-primary"><Icon name="mdi:monitor-edit" /> Kelola halaman</NuxtLink><NuxtLink to="/admin/halaman/beranda" class="btn btn-secondary"><Icon name="mdi:home-edit-outline" /> Edit beranda</NuxtLink><NuxtLink to="/admin/konten" class="btn btn-secondary"><Icon name="mdi:file-document-edit-outline" /> Berita & program</NuxtLink></div></div>
  </div>
</template>
