import type { MaybeRefOrGetter } from 'vue'

export const useSchoolSeo = (title: MaybeRefOrGetter<string>, description: MaybeRefOrGetter<string>) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { settings } = useWebSettings('public')
  const canonicalBase = computed(() => settings.value.canonicalBaseUrl || config.public.siteUrl)
  const canonical = computed(() => `${canonicalBase.value}${route.path}`)
  const resolvedTitle = computed(() => toValue(title))
  const resolvedDescription = computed(() => toValue(description))
  useSeoMeta({
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: computed(() => settings.value.keywords.join(', ')),
    ogTitle: resolvedTitle,
    ogDescription: resolvedDescription,
    ogType: 'website',
    ogUrl: canonical,
    ogImage: computed(() => settings.value.metaImage),
    ogImageAlt: computed(() => settings.value.metaImageAlt),
    twitterCard: computed(() => settings.value.twitterCard as 'summary' | 'summary_large_image' | 'app' | 'player'),
    twitterImage: computed(() => settings.value.metaImage),
  })
  useHead({ link: [{ rel: 'canonical', href: canonical }] })
}
