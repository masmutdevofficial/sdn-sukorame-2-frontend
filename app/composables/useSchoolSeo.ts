import type { MaybeRefOrGetter } from 'vue'
import { DEFAULT_OG_IMAGE_URL } from '~/types/web-settings'

const normalizeCanonicalBaseUrl = (value: string, fallback: string) => {
  try {
    const url = new URL(value || fallback)
    if (url.protocol !== 'https:') throw new Error('Canonical URL must be HTTPS')
    url.search = ''
    url.hash = ''
    url.pathname = url.pathname.replace(/\/+$/, '')
    return url.toString().replace(/\/$/, '')
  } catch {
    return fallback.replace(/\/+$/, '')
  }
}

const absoluteUrl = (value: string, fallback: string) => {
  try {
    const url = new URL(value || fallback, fallback)
    return url.protocol === 'https:' ? url.toString() : fallback
  } catch {
    return fallback
  }
}

export const useSchoolSeo = (title: MaybeRefOrGetter<string>, description: MaybeRefOrGetter<string>) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { settings } = useWebSettings('public')
  const canonicalBase = computed(() => normalizeCanonicalBaseUrl(settings.value.canonicalBaseUrl, config.public.siteUrl))
  const canonical = computed(() => new URL(route.path || '/', `${canonicalBase.value}/`).toString())
  const resolvedTitle = computed(() => toValue(title))
  const resolvedDescription = computed(() => toValue(description))
  const metaImage = computed(() => absoluteUrl(settings.value.metaImage, DEFAULT_OG_IMAGE_URL))
  const metaImageAlt = computed(() => settings.value.metaImageAlt || 'Logo SD Negeri Sukorame 2 Kota Kediri')
  useSeoMeta({
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: computed(() => settings.value.keywords.join(', ')),
    ogTitle: resolvedTitle,
    ogDescription: resolvedDescription,
    ogType: 'website',
    ogUrl: canonical,
    ogSiteName: computed(() => settings.value.siteTitle),
    ogLocale: computed(() => settings.value.locale),
    ogImage: metaImage,
    ogImageSecureUrl: metaImage,
    ogImageType: computed(() => settings.value.metaImageType),
    ogImageWidth: computed(() => settings.value.metaImageWidth),
    ogImageHeight: computed(() => settings.value.metaImageHeight),
    ogImageAlt: metaImageAlt,
    twitterCard: computed(() => settings.value.twitterCard as 'summary' | 'summary_large_image' | 'app' | 'player'),
    twitterTitle: resolvedTitle,
    twitterDescription: resolvedDescription,
    twitterImage: metaImage,
    twitterImageAlt: metaImageAlt,
    twitterSite: computed(() => settings.value.twitterSite || undefined),
    twitterCreator: computed(() => settings.value.twitterCreator || undefined),
  })
  useHead(() => ({
    meta: [{ key: 'og:image:url', property: 'og:image:url', content: metaImage.value }],
    link: [{ rel: 'canonical', href: canonical.value }],
  }))
}
