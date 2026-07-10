<script setup lang="ts">
definePageMeta({ layout: false, middleware: 'admin-guest' })
useSeoMeta({ title: 'Login Admin', robots: 'noindex, nofollow' })
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const { login } = useAuth()
const submit = async () => {
  loading.value = true; error.value = ''
  if (await login(email.value, password.value)) await navigateTo('/admin')
  else error.value = 'Email atau kata sandi tidak sesuai.'
  loading.value = false
}
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-school-sky p-4">
    <form class="card w-full max-w-md p-8" @submit.prevent="submit">
      <div class="mx-auto grid size-20 place-items-center overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lg shadow-school-navy/10"><img src="https://cdn.sdnsukorame2kotakediri.sch.id/logo.png" alt="Logo SDN Sukorame 2" class="size-full object-contain" /></div>
      <h1 class="mt-5 text-center text-2xl font-bold text-school-navy">Admin Sekolah</h1>
      <p class="mt-2 text-center text-sm text-muted">Masuk menggunakan akun administrator.</p>
      <label class="mt-6 block text-sm font-semibold" for="email">Email</label>
      <input id="email" v-model="email" type="email" class="mt-2 w-full rounded-xl border border-line p-3" required>
      <label class="mt-4 block text-sm font-semibold" for="password">Kata sandi</label>
      <input id="password" v-model="password" type="password" class="mt-2 w-full rounded-xl border border-line p-3" required>
      <p v-if="error" role="alert" class="mt-3 text-sm text-red-700">{{ error }}</p>
      <button class="btn btn-primary mt-6 w-full" :disabled="loading">{{ loading ? 'Memeriksa...' : 'Masuk ke Dashboard' }}</button>
      <NuxtLink to="/" class="mt-5 block text-center text-sm text-school-action">← Kembali ke website</NuxtLink>
    </form>
  </main>
</template>
