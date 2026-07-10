import tailwindcss from '@tailwindcss/vite'

const hasApi = Boolean(process.env.NUXT_PUBLIC_API_BASE)
const dynamicPublic = { cache: { maxAge: 300, swr: true } }

export default defineNuxtConfig({
  compatibilityDate: '2026-07-09',
  experimental: { appManifest: false, payloadExtraction: false },
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/fonts', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org'],
  image: { domains: ['cdn.sdnsukorame2kotakediri.sch.id'] },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: { public: { siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://sdn-sukorame-2.example', apiBase: process.env.NUXT_PUBLIC_API_BASE || '' } },
  app: { head: { htmlAttrs: { lang: 'id' }, titleTemplate: '%s | SDN Sukorame 2', link: [{ rel: 'icon', href: '/favicon.ico' }] } },
  site: { url: process.env.NUXT_PUBLIC_SITE_URL || 'https://sdn-sukorame-2.example', name: 'SD Negeri Sukorame 2 Kota Kediri' },
  robots: { disallow: ['/admin'] },
  sitemap: { exclude: ['/admin/**'] },
  icon: { serverBundle: { collections: ['mdi'] }, fallbackToApi: false },
  fonts: {
    defaults: { subsets: ['latin'], styles: ['normal'], weights: [400, 500, 600, 700] },
    families: [
      { name: 'Plus Jakarta Sans', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'DM Serif Display', provider: 'google', weights: [400] },
      { name: 'Caveat', provider: 'google', weights: [600, 700] },
    ],
  },
  routeRules: {
    '/': hasApi ? dynamicPublic : { prerender: true }, '/profil/**': hasApi ? dynamicPublic : { prerender: true }, '/akademik/**': hasApi ? dynamicPublic : { prerender: true },
    '/perpustakaan': hasApi ? dynamicPublic : { prerender: true }, '/kontak': hasApi ? dynamicPublic : { prerender: true }, '/faq': hasApi ? dynamicPublic : { prerender: true }, '/ppdb': hasApi ? dynamicPublic : { prerender: true },
    '/informasi/**': { cache: { maxAge: 600, swr: true } },
    '/kesiswaan/**': { cache: { maxAge: 900, swr: true } },
    '/galeri/**': { cache: { maxAge: 900, swr: true } },
    '/unduhan': { cache: { maxAge: 900, swr: true } },
    '/admin': { ssr: false }, '/admin/**': { ssr: false, robots: false },
  },
  nitro: {
    preset: 'cloudflare_module',
    prerender: {
      routes: hasApi ? [] : [
        '/profil',
        '/profil/sejarah',
        '/profil/visi-misi',
        '/akademik/kurikulum',
        '/akademik/program-sekolah',
        '/perpustakaan',
        '/kontak',
        '/faq',
        '/ppdb',
      ],
      ignore: ['/admin', '/admin/**'],
    },
  },
})
