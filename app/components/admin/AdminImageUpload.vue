<script setup lang="ts">
import type { MediaAsset } from '~/types/media'
import { mediaRepository } from '~/repositories/http/media.repository'

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  alt?: string
  allowedMimeTypes?: string[]
  allowedExtensions?: string[]
}>(), { modelValue: '', label: 'Gambar', alt: 'Pratinjau gambar' })

const emit = defineEmits<{
  'update:modelValue': [value: string]
  uploaded: [asset: MediaAsset]
}>()

const defaultMimeTypes = ['image/jpeg', 'image/png', 'image/webp']
const defaultExtensions = ['jpg', 'jpeg', 'png', 'webp']
const allowedMimeTypes = computed(() => props.allowedMimeTypes?.length ? props.allowedMimeTypes : defaultMimeTypes)
const allowedExtensions = computed(() => props.allowedExtensions?.length ? props.allowedExtensions : defaultExtensions)
const accept = computed(() => [...allowedMimeTypes.value, ...allowedExtensions.value.map(extension => `.${extension}`)].join(','))
const formatLabel = computed(() => allowedExtensions.value.map(extension => extension.toUpperCase()).join(', '))
const uploading = ref(false)
const dragging = ref(false)
const error = ref('')
const toast = useToast()

const validate = (file: File) => {
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!extension || !allowedExtensions.value.includes(extension) || !allowedMimeTypes.value.includes(file.type)) {
    throw new Error(`Format gambar harus ${formatLabel.value}.`)
  }
  if (file.size > 2 * 1024 * 1024) throw new Error('Ukuran gambar maksimal 2 MB.')
}

const process = async (file?: File) => {
  if (!file) return
  uploading.value = true
  error.value = ''
  try {
    validate(file)
    const asset = await mediaRepository.upload(file, props.alt)
    emit('update:modelValue', asset.url)
    emit('uploaded', asset)
  } catch (uploadError) {
    error.value = uploadError instanceof Error ? uploadError.message : 'Upload gagal'
    toast.warning(error.value, 'Ups, gambar ditolak')
  } finally {
    uploading.value = false
  }
}

const change = (event: Event) => process((event.target as HTMLInputElement).files?.[0])
const drop = (event: DragEvent) => {
  dragging.value = false
  process(event.dataTransfer?.files[0])
}
</script>

<template>
  <div class="grid gap-2">
    <span class="text-sm font-semibold text-slate-700">{{ label }}</span>
    <label class="group grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed p-5 text-center transition" :class="dragging ? 'border-school-action bg-school-sky' : 'border-slate-300 bg-slate-50 hover:border-school-action'" @dragenter.prevent="dragging = true" @dragover.prevent="dragging = true" @dragleave.prevent="dragging = false" @drop.prevent="drop">
      <input type="file" :accept="accept" class="sr-only" :disabled="uploading" @change="change">
      <img v-if="modelValue" :src="modelValue" :alt="alt" class="mb-4 max-h-52 max-w-full rounded-xl object-contain">
      <Icon v-else name="mdi:cloud-upload-outline" size="42" class="mb-2 text-school-action" />
      <b class="text-school-navy">{{ uploading ? 'Mengunggah...' : 'Klik atau tarik gambar ke sini' }}</b>
      <p class="mt-1 text-xs text-muted">{{ formatLabel }} · maksimal 2 MB</p>
    </label>
    <p v-if="error" class="text-sm font-semibold text-red-700">{{ error }}</p>
    <button v-if="modelValue" type="button" class="w-fit text-sm font-bold text-red-700" @click="emit('update:modelValue', '')">
      <Icon name="mdi:delete-outline" /> Hapus gambar
    </button>
  </div>
</template>
