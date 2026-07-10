<script setup lang="ts">
const schoolModules = useSchoolModules()
await schoolModules.ready

const webSettings = useWebSettings('public')
await webSettings.ready

const school = computed(() => schoolModules.modules.value.school)
const settings = computed(() => webSettings.settings.value)
const logo = computed(() => settings.value.logo || 'https://cdn.sdnsukorame2kotakediri.sch.id/logo.png')
const socialLinks = computed(() => Object.values(settings.value.socialMedia).filter(item => item.enabled && item.url))
</script>

<template>
  <footer class="mt-16 bg-school-navy text-white">
    <div class="container-school grid gap-8 py-12 md:grid-cols-3">
      <div>
        <div class="flex items-center gap-4">
          <span class="grid size-16 flex-none place-items-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg shadow-slate-950/15">
            <img :src="logo" :alt="`Logo ${school.name}`" class="size-full object-contain">
          </span>
          <h2 class="text-xl font-bold">
            {{ school.name }}
          </h2>
        </div>
        <p class="mt-4 text-sm text-blue-100">
          {{ school.brand }} - {{ school.tagline }}.
        </p>
      </div>

      <div>
        <h2 class="font-bold">
          Alamat
        </h2>
        <p class="mt-3 text-sm text-blue-100">
          {{ school.address }} {{ school.postal }}
        </p>
      </div>

      <div>
        <h2 class="font-bold">
          Tautan
        </h2>
        <div class="mt-3 grid gap-2 text-sm text-blue-100">
          <NuxtLink to="/faq">
            FAQ
          </NuxtLink>
          <NuxtLink to="/unduhan">
            Unduhan
          </NuxtLink>
          <NuxtLink to="/admin/login">
            Admin
          </NuxtLink>
        </div>

        <div v-if="socialLinks.length" class="mt-5 flex flex-wrap gap-2">
          <a
            v-for="item in socialLinks"
            :key="item.label"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/20"
            :aria-label="item.label"
            :title="item.label"
          >
            <img :src="item.icon" :alt="item.label" class="size-5 object-contain">
          </a>
        </div>
      </div>
    </div>
    <div class="border-t border-white/15 py-5 text-center text-xs text-blue-100">
      &copy; 2026 {{ school.fullName }}
    </div>
  </footer>
</template>
