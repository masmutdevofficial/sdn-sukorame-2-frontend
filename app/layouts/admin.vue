<script setup lang="ts">
const { logout } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <aside class="fixed inset-y-0 hidden w-64 overflow-y-auto bg-school-navy p-5 text-white md:block">
      <NuxtLink to="/admin" class="text-lg font-bold">Admin SAKTI</NuxtLink>
      <p class="mt-1 text-xs text-blue-200">Panel frontend demo</p>
      <nav class="mt-8 grid gap-2">
        <NuxtLink to="/admin" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:view-dashboard-outline" /> Dashboard</NuxtLink>
        <NuxtLink to="/admin/halaman/beranda" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:home-edit-outline" /> Beranda</NuxtLink>
        <NuxtLink to="/admin/profil" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:school-outline" /> Profil</NuxtLink>
        <NuxtLink to="/admin/akademik" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:file-pdf-box" /> Akademik</NuxtLink>
        <NuxtLink to="/admin/kesiswaan" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:account-group-outline" /> Kesiswaan</NuxtLink>
        <NuxtLink to="/admin/informasi" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:newspaper-variant-outline" /> Informasi</NuxtLink>
        <NuxtLink to="/admin/galeri" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:image-multiple-outline" /> Galeri</NuxtLink>
        <NuxtLink to="/admin/kontak" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:map-marker-outline" /> Kontak</NuxtLink>
        <NuxtLink to="/admin/ppdb" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:account-school-outline" /> PPDB</NuxtLink>
        <NuxtLink to="/" class="rounded-lg p-3 hover:bg-white/10"><Icon name="mdi:web" /> Lihat Website</NuxtLink>
      </nav>
    </aside>
    <div class="md:pl-64">
      <header class="flex h-16 items-center justify-between border-b bg-white px-5"><b>SDN Sukorame 2</b><button class="btn btn-secondary py-2" @click="logout"><Icon name="mdi:logout" /> Keluar</button></header>
      <div class="bg-amber-100 px-5 py-2 text-center text-xs text-amber-900">Mode Demo — data disimpan lokal pada browser dan belum terhubung ke server.</div>
      <main class="p-5 md:p-8"><slot /></main>
    </div>
  </div>
</template>
