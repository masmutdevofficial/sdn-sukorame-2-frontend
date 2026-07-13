import tailwindcss from '@tailwindcss/vite'

const dynamicPublic = { cache: { maxAge: 60, swr: true } }
const siteUrl = 'https://sdnsukorame2kotakediri.sch.id'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-09',
  experimental: { appManifest: false, payloadExtraction: false },
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/fonts', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org'],
  image: { domains: ['cdn.sdnsukorame2kotakediri.sch.id'] },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: { public: { siteUrl } },
  app: { head: { htmlAttrs: { lang: 'id' } } },
  site: { url: siteUrl, name: 'SD Negeri Sukorame 2 Kota Kediri' },
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
    '/': dynamicPublic, '/profil/**': dynamicPublic, '/akademik/**': dynamicPublic,
    '/perpustakaan': dynamicPublic, '/kontak': dynamicPublic, '/faq': dynamicPublic, '/spmb': dynamicPublic,
    '/ppdb': { redirect: { to: '/spmb', statusCode: 301 } },
    '/informasi/**': { cache: { maxAge: 600, swr: true } },
    '/kesiswaan/**': { cache: { maxAge: 900, swr: true } },
    '/galeri/**': { cache: { maxAge: 900, swr: true } },
    '/unduhan': { cache: { maxAge: 900, swr: true } },
    '/admin': { ssr: false }, '/admin/**': { ssr: false, robots: false },
  },
  nitro: {
    preset: 'cloudflare_module',
    prerender: {
      routes: [],
      ignore: ['/admin', '/admin/**'],
    },
  },
})
