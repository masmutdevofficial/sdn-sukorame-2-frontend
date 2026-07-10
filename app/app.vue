<script setup lang="ts">
const { settings, ready } = useWebSettings('public')
await ready

useHead(() => ({
  titleTemplate: title => title
    ? (settings.value.titleTemplate || '%s | SDN Sukorame 2').replace('%s', title)
    : settings.value.siteTitle,
  link: [
    { rel: 'icon', href: settings.value.favicon },
    { rel: 'apple-touch-icon', href: settings.value.logo },
  ],
  meta: [
    { name: 'author', content: settings.value.author },
    { name: 'robots', content: settings.value.robots },
    { name: 'keywords', content: settings.value.keywords.join(', ') },
    { name: 'theme-color', content: settings.value.themeColor },
    ...settings.value.extraMetaTags.map(tag => ({
      key: tag.id,
      ...(tag.name ? { name: tag.name } : { property: tag.property }),
      content: tag.content,
    })),
  ],
}))

useSeoMeta({
  description: () => settings.value.description,
  ogSiteName: () => settings.value.siteTitle,
  ogDescription: () => settings.value.description,
  ogImage: () => settings.value.metaImage,
  ogImageAlt: () => settings.value.metaImageAlt,
  ogLocale: () => settings.value.locale,
  twitterCard: () => settings.value.twitterCard as 'summary' | 'summary_large_image' | 'app' | 'player',
  twitterSite: () => settings.value.twitterSite || undefined,
  twitterCreator: () => settings.value.twitterCreator || undefined,
  twitterImage: () => settings.value.metaImage,
})
</script>

<template><NuxtLayout><NuxtPage /></NuxtLayout></template>
