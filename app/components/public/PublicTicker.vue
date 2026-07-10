<script setup lang="ts">
import { school } from '~/data/dummy/content'
const messages = [
  `${school.fullName} · NPSN ${school.npsn}`,
  `Sekolah SAKTI: ${school.tagline}`,
  `${school.address} · Kode Pos ${school.postal}`,
]
</script>

<template>
  <section class="border-y border-school-navy/10 bg-school-navy py-3.5 text-white" aria-label="Identitas sekolah">
    <div class="overflow-hidden">
      <div class="ticker-track" tabindex="0">
        <div v-for="round in 2" :key="round" class="ticker-group" :aria-hidden="round === 2">
          <div v-for="(message,index) in messages" :key="`${round}-${index}`" class="flex items-center gap-3 whitespace-nowrap text-sm sm:text-base">
            <Icon name="mdi:star-four-points" class="text-school-yellow" size="17" />
            <span :class="index === 0 ? 'font-bold text-white' : 'font-medium text-blue-100'">{{ message }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
