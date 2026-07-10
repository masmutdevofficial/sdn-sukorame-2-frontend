import type { MaybeRefOrGetter } from 'vue'

export const useSchoolSeo = (title: MaybeRefOrGetter<string>, description: MaybeRefOrGetter<string>) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const canonical = computed(() => `${config.public.siteUrl}${route.path}`)
  const resolvedTitle = computed(() => toValue(title))
  const resolvedDescription = computed(() => toValue(description))
  useSeoMeta({ title: resolvedTitle, description: resolvedDescription, ogTitle: resolvedTitle, ogDescription: resolvedDescription, ogType: 'website', ogUrl: canonical, twitterCard: 'summary_large_image' })
  useHead({ link: [{ rel: 'canonical', href: canonical }] })
}
