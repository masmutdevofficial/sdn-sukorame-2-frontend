<script setup lang="ts">
definePageMeta({ layout: false, middleware: 'admin-guest' })
useSeoMeta({ title: 'Login Admin Demo', robots: 'noindex, nofollow' })
const email = ref('admin@demo.local')
const password = ref('admin123')
const error = ref('')
const { login } = useAuth()
const submit = () => {
  if (login(email.value, password.value)) navigateTo('/admin')
  else error.value = 'Email atau kata sandi demo tidak sesuai.'
}
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-school-sky p-4">
    <form class="card w-full max-w-md p-8" @submit.prevent="submit">
      <div class="mx-auto grid size-20 place-items-center overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lg shadow-school-navy/10"><img src="/logo.png" alt="Logo SDN Sukorame 2" class="size-full object-contain" /></div>
      <h1 class="mt-5 text-center text-2xl font-bold text-school-navy">Admin Demo</h1>
      <p class="mt-2 text-center text-sm text-muted">Gunakan kredensial yang sudah terisi.</p>
      <label class="mt-6 block text-sm font-semibold" for="email">Email</label>
      <input id="email" v-model="email" type="email" class="mt-2 w-full rounded-xl border border-line p-3" required>
      <label class="mt-4 block text-sm font-semibold" for="password">Kata sandi</label>
      <input id="password" v-model="password" type="password" class="mt-2 w-full rounded-xl border border-line p-3" required>
      <p v-if="error" role="alert" class="mt-3 text-sm text-red-700">{{ error }}</p>
      <button class="btn btn-primary mt-6 w-full">Masuk ke Dashboard</button>
      <NuxtLink to="/" class="mt-5 block text-center text-sm text-school-action">← Kembali ke website</NuxtLink>
    </form>
  </main>
</template>
