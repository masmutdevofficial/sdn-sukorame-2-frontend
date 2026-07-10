<script setup lang="ts">
import { defaultWebSettings } from '~/types/web-settings'
import type { ExtraMetaTag, WebSettings } from '~/types/web-settings'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
useSeoMeta({ title: 'Settings Web', robots: 'noindex, nofollow' })

const { settings, loading, saving, notice, save } = useWebSettings('admin')
const toast = useToast()
const socialKeys = ['facebook', 'instagram', 'tiktok', 'youtube'] as const

const cloneSettings = (value?: WebSettings): WebSettings => JSON.parse(JSON.stringify(value || defaultWebSettings())) as WebSettings
const form = ref<WebSettings>(cloneSettings(settings.value))
const keywordsText = ref('')

watch(settings, value => {
  form.value = cloneSettings(value)
  keywordsText.value = form.value.keywords.join(', ')
}, { immediate: true })

const addMetaTag = () => {
  form.value.extraMetaTags.push({ id: crypto.randomUUID(), name: '', property: '', content: '' })
}

const removeMetaTag = (index: number) => {
  form.value.extraMetaTags.splice(index, 1)
}

const normalizeKeywords = () => keywordsText.value
  .split(',')
  .map(item => item.trim())
  .filter(Boolean)

const normalizeUrl = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

const submit = async () => {
  try {
    const payload = cloneSettings(form.value)
    payload.keywords = normalizeKeywords()
    payload.extraMetaTags = payload.extraMetaTags.filter((tag: ExtraMetaTag) => tag.content && (tag.name || tag.property))
    socialKeys.forEach((key) => {
      payload.socialMedia[key].url = normalizeUrl(payload.socialMedia[key].url)
      payload.socialMedia[key].enabled = payload.socialMedia[key].enabled || Boolean(payload.socialMedia[key].url)
    })
    await save(payload)
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Periksa kembali isian settings web.', 'Gagal menyimpan')
  }
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-school-navy">
          Settings Web
        </h1>
        <p class="mt-1 text-muted">
          Atur identitas website, SEO, meta sosial, favicon, logo, dan tautan sosial media.
        </p>
      </div>
      <button type="submit" form="settings-web-form" class="btn btn-primary" :disabled="saving || loading">
        <Icon name="mdi:content-save-outline" />
        {{ saving ? 'Menyimpan...' : 'Simpan Settings Web' }}
      </button>
    </div>

    <p v-if="notice" class="notice">
      {{ notice }}
    </p>

    <div v-if="loading" class="card mt-6 p-8 text-center">
      Memuat settings web...
    </div>

    <form v-else id="settings-web-form" class="mt-6 grid gap-6" @submit.prevent="submit">
      <section class="card p-6">
        <h2 class="text-xl font-bold text-school-navy">
          Identitas dan SEO Dasar
        </h2>
        <div class="form-grid">
          <label class="field">Judul Website<input v-model="form.siteTitle" required></label>
          <label class="field">Template Judul<input v-model="form.titleTemplate" placeholder="%s | SDN Sukorame 2" required></label>
          <label class="field md:col-span-2">Deskripsi SEO<textarea v-model="form.description" rows="4" required /></label>
          <label class="field md:col-span-2">Tag / Keywords<textarea v-model="keywordsText" rows="3" placeholder="Pisahkan dengan koma" /></label>
          <label class="field">Author<input v-model="form.author"></label>
          <label class="field">Robots<input v-model="form.robots" placeholder="index, follow"></label>
          <label class="field">Canonical Base URL<input v-model="form.canonicalBaseUrl" type="url"></label>
          <label class="field">Theme Color<input v-model="form.themeColor" type="color"></label>
          <label class="field">Locale<input v-model="form.locale" placeholder="id_ID"></label>
          <label class="field">Twitter Card<select v-model="form.twitterCard"><option value="summary_large_image">summary_large_image</option><option value="summary">summary</option></select></label>
          <label class="field">Twitter Site<input v-model="form.twitterSite" placeholder="@username"></label>
          <label class="field">Twitter Creator<input v-model="form.twitterCreator" placeholder="@username"></label>
        </div>
      </section>

      <section class="card p-6">
        <h2 class="text-xl font-bold text-school-navy">
          Logo, Favicon, dan Gambar Meta
        </h2>
        <div class="form-grid">
          <div>
            <AdminImageUpload v-model="form.logo" label="Logo Website" alt="Logo website" />
            <label class="field mt-3">URL Logo<input v-model="form.logo" type="url"></label>
          </div>
          <div>
            <AdminImageUpload v-model="form.favicon" label="Favicon" alt="Favicon website" />
            <label class="field mt-3">URL Favicon<input v-model="form.favicon" type="url"></label>
          </div>
          <div class="md:col-span-2">
            <AdminImageUpload v-model="form.metaImage" label="Gambar Meta / Open Graph" alt="Gambar meta website" />
          </div>
          <label class="field md:col-span-2">Alt Gambar Meta<input v-model="form.metaImageAlt"></label>
        </div>
      </section>

      <section class="card p-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-xl font-bold text-school-navy">
              Meta Tambahan
            </h2>
            <p class="mt-1 text-sm text-muted">
              Gunakan untuk verification tag, custom meta name, atau property Open Graph lain.
            </p>
          </div>
          <button type="button" class="btn btn-secondary" @click="addMetaTag">
            <Icon name="mdi:plus" />
            Tambah Meta
          </button>
        </div>
        <div class="mt-5 grid gap-4">
          <article v-for="(tag, index) in form.extraMetaTags" :key="tag.id" class="rounded-2xl border border-line bg-slate-50 p-4">
            <div class="form-grid mt-0">
              <label class="field">Name<input v-model="tag.name" placeholder="google-site-verification"></label>
              <label class="field">Property<input v-model="tag.property" placeholder="og:updated_time"></label>
              <label class="field md:col-span-2">Content<input v-model="tag.content"></label>
            </div>
            <button type="button" class="mt-3 text-sm font-bold text-red-700" @click="removeMetaTag(index)">
              <Icon name="mdi:delete-outline" />
              Hapus Meta
            </button>
          </article>
          <p v-if="!form.extraMetaTags.length" class="rounded-2xl border border-dashed border-line p-5 text-center text-sm text-muted">
            Belum ada meta tambahan.
          </p>
        </div>
      </section>

      <section class="card p-6">
        <h2 class="text-xl font-bold text-school-navy">
          Sosial Media
        </h2>
        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <article v-for="key in socialKeys" :key="key" class="rounded-2xl border border-line p-4">
            <div class="flex items-center gap-3">
              <span class="grid size-11 place-items-center rounded-xl bg-slate-100">
                <img :src="form.socialMedia[key].icon" :alt="form.socialMedia[key].label" class="size-6 object-contain">
              </span>
              <label class="flex items-center gap-2 text-sm font-bold text-school-navy">
                <input v-model="form.socialMedia[key].enabled" type="checkbox">
                Tampilkan {{ form.socialMedia[key].label }}
              </label>
            </div>
            <div class="form-grid">
              <label class="field">Label<input v-model="form.socialMedia[key].label"></label>
              <label class="field">Icon Public<input v-model="form.socialMedia[key].icon" readonly></label>
              <label class="field md:col-span-2">URL<input v-model="form.socialMedia[key].url" type="url" :placeholder="`URL ${form.socialMedia[key].label}`"></label>
            </div>
          </article>
        </div>
      </section>

      <button class="btn btn-primary justify-self-end" :disabled="saving">
        <Icon name="mdi:content-save-outline" />
        {{ saving ? 'Menyimpan...' : 'Simpan Settings Web' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-grid{display:grid;gap:1rem;margin-top:1rem}.field{display:grid;gap:.4rem;font-size:.875rem;font-weight:600;color:#334155}.field :is(input,textarea,select){width:100%;border:1px solid var(--color-line);border-radius:.75rem;background:white;padding:.75rem;color:#0f172a}.field input[type="color"]{height:3rem;padding:.25rem}.notice{margin-top:1rem;border-radius:.75rem;background:#dcfce7;padding:.75rem;color:#166534}@media(min-width:768px){.form-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style>
