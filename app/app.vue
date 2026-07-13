<script setup lang="ts">
const { settings, ready } = useWebSettings('public')
await ready

const protectedSeoMeta = new Set([
  'description', 'og:title', 'og:description', 'og:type', 'og:url', 'og:site_name', 'og:locale',
  'og:image', 'og:image:url', 'og:image:secure_url', 'og:image:type', 'og:image:width', 'og:image:height', 'og:image:alt',
  'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt',
])

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
    ...settings.value.extraMetaTags.filter(tag => !protectedSeoMeta.has((tag.property || tag.name).toLowerCase())).map(tag => ({
      key: tag.id,
      ...(tag.name ? { name: tag.name } : { property: tag.property }),
      content: tag.content,
    })),
  ],
}))
</script>

<template><NuxtLayout><NuxtPage /></NuxtLayout></template>
