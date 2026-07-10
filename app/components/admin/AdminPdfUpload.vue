<script setup lang="ts">
const props = defineProps<{ modelValue: string, filename?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string], 'update:filename': [value: string] }>()
const error = ref('')
const upload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  error.value = ''
  if (file.type !== 'application/pdf') { error.value = 'File harus berformat PDF.'; return }
  if (file.size > 10 * 1024 * 1024) { error.value = 'Ukuran PDF maksimal 10 MB.'; return }
  const reader = new FileReader()
  reader.onload = () => { emit('update:modelValue', String(reader.result)); emit('update:filename', file.name) }
  reader.readAsDataURL(file)
}
</script>
<template><div class="grid gap-2"><span class="text-sm font-semibold">File PDF</span><input type="file" accept="application/pdf" class="rounded-xl border border-dashed border-line bg-slate-50 p-4" @change="upload"><p v-if="filename" class="text-sm text-school-action"><Icon name="mdi:file-pdf-box" /> {{ filename }}</p><p v-if="error" class="text-sm text-red-700">{{ error }}</p><button v-if="props.modelValue" type="button" class="w-fit text-sm font-bold text-red-700" @click="emit('update:modelValue', ''); emit('update:filename', '')">Hapus PDF</button></div></template>
