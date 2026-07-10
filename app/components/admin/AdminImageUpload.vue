<script setup lang="ts">
import { mediaRepository } from '~/repositories/dummy/media.repository'

const props = withDefaults(defineProps<{ modelValue?: string, label?: string, alt?: string }>(), {
  modelValue: '',
  label: 'Gambar',
  alt: 'Pratinjau gambar',
})
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const uploading = ref(false)
const error = ref('')
const input = useTemplateRef<HTMLInputElement>('input')

const upload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploading.value = true
  error.value = ''
  try {
    const asset = await mediaRepository.upload(file, props.alt)
    emit('update:modelValue', asset.url)
  } catch (uploadError) {
    error.value = uploadError instanceof Error ? uploadError.message : 'Upload gagal'
  } finally {
    uploading.value = false
    if (input.value) input.value.value = ''
  }
}
</script>

<template>
  <div class="grid gap-2">
    <span class="text-sm font-semibold text-slate-700">{{ label }}</span>
    <div class="flex flex-col gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:flex-row sm:items-center">
      <img v-if="modelValue" :src="modelValue" :alt="alt" class="size-28 rounded-lg bg-white object-contain">
      <div v-else class="grid size-28 place-items-center rounded-lg bg-white text-slate-400"><Icon name="mdi:image-outline" size="36" /></div>
      <div class="flex-1">
        <input ref="input" type="file" accept="image/png,image/jpeg,image/webp,image/gif" class="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-school-action file:px-4 file:py-2 file:font-semibold file:text-white" :disabled="uploading" @change="upload">
        <p class="mt-2 text-xs text-muted">PNG, JPG, WEBP, atau GIF. Maksimal 2 MB.</p>
        <p v-if="error" class="mt-2 text-xs font-semibold text-red-700">{{ error }}</p>
        <button v-if="modelValue" type="button" class="mt-3 text-sm font-bold text-red-700" @click="emit('update:modelValue', '')"><Icon name="mdi:delete-outline" /> Hapus gambar</button>
      </div>
    </div>
  </div>
</template>
