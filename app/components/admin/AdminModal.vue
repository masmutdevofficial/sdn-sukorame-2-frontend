<script setup lang="ts">
withDefaults(defineProps<{ open: boolean; title: string; size?: 'md'|'lg'|'xl' }>(), { size: 'lg' })
defineEmits<{ close: [] }>()
</script>
<template><Teleport to="body"><Transition name="modal-fade"><div v-if="open" class="fixed inset-0 z-[120] grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm" @mousedown.self="$emit('close')"><section class="flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl" :class="size==='xl'?'max-w-5xl':size==='md'?'max-w-lg':'max-w-3xl'" role="dialog" aria-modal="true"><header class="flex shrink-0 items-center justify-between border-b border-line px-5 py-4"><h2 class="text-xl font-bold text-school-navy">{{title}}</h2><button class="grid size-9 place-items-center rounded-lg hover:bg-slate-100" aria-label="Tutup modal" @click="$emit('close')"><Icon name="mdi:close" size="24"/></button></header><div class="min-h-0 overflow-y-auto p-5"><slot/></div></section></div></Transition></Teleport></template>
<style scoped>.modal-fade-enter-active,.modal-fade-leave-active{transition:opacity .2s ease}.modal-fade-enter-from,.modal-fade-leave-to{opacity:0}</style>
