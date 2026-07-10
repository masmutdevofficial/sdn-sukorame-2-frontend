<script setup lang="ts">
import { mediaRepository } from '~/repositories/dummy/media.repository'
const props = defineProps<{ modelValue: string[] }>()
const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()
const error = ref('')
const upload = async (event: Event) => {
  const files = [...((event.target as HTMLInputElement).files || [])]
  error.value = ''
  try {
    const assets = await Promise.all(files.map(file => mediaRepository.upload(file)))
    emit('update:modelValue', [...props.modelValue, ...assets.map(asset => asset.url)])
  } catch (uploadError) { error.value = uploadError instanceof Error ? uploadError.message : 'Upload gagal' }
}
const remove = (index: number) => emit('update:modelValue', props.modelValue.filter((_, itemIndex) => itemIndex !== index))
</script>
<template><div class="grid gap-3"><span class="text-sm font-semibold">Gambar kegiatan</span><input type="file" multiple accept="image/png,image/jpeg,image/webp,image/gif" class="rounded-xl border border-dashed border-line bg-slate-50 p-4" @change="upload"><p class="text-xs text-muted">Dapat memilih beberapa gambar sekaligus, maksimal 2 MB per gambar.</p><p v-if="error" class="text-sm text-red-700">{{ error }}</p><div class="flex flex-wrap gap-3"><div v-for="(image,index) in modelValue" :key="index" class="relative"><img :src="image" alt="Pratinjau" class="size-24 rounded-xl object-cover"><button type="button" class="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-red-600 text-white" @click="remove(index)"><Icon name="mdi:close" /></button></div></div></div></template>
