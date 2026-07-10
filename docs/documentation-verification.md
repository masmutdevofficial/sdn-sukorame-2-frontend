# Verifikasi Dokumentasi

Tanggal verifikasi: 9 Juli 2026.

## Context7 first

`resolve-library-id` telah dipanggil untuk Nuxt, Vue, Tailwind CSS, `@nuxt/icon`, `@nuxt/image`, `@nuxt/fonts`, Sitemap, Robots, Schema.org, dan OG Image. Seluruh panggilan mengembalikan `Invalid API key` karena konfigurasi konektor lingkungan. Sesuai instruksi, verifikasi dilanjutkan hanya melalui dokumentasi resmi.

## Hasil fallback resmi

- Nuxt 4.4.8: struktur `app/`, universal rendering default, hybrid `routeRules`, `prerender`, `swr`, dan route-level `ssr: false`: https://nuxt.com/docs/4.x/guide/concepts/rendering
- SEO bawaan Nuxt: `useSeoMeta`, `useHead`, canonical, dan head global: https://nuxt.com/docs/4.x/getting-started/seo-meta
- Tailwind CSS 4: `tailwindcss`, `@tailwindcss/vite`, `@import "tailwindcss"`, CSS-first `@theme`: https://tailwindcss.com/docs/installation/using-vite
- Nuxt Icon 2.3.1: `@nuxt/icon`, koleksi lokal `@iconify-json/mdi`, server bundle, `fallbackToApi: false`, dan `cssLayer: base`: https://nuxt.com/modules/icon
- Nuxt Image 2.0.0: https://image.nuxt.com/get-started/installation
- Nuxt Fonts 0.14.0: https://fonts.nuxt.com/get-started/installation
- Sitemap 8.2.2: https://nuxtseo.com/docs/sitemap/getting-started/installation
- Robots 6.1.2: https://nuxtseo.com/docs/robots/getting-started/installation
- Schema.org 6.2.3: https://nuxtseo.com/docs/schema-org/getting-started/installation

Versi aktual dicatat dari registry npm melalui instalasi paket dan lockfile. OG Image tidak dipasang karena aset resmi sekolah belum tersedia; meta OG tetap disiapkan dengan API bawaan Nuxt tanpa mengarang gambar.

## Pembaruan landing page

Pada pembaruan 9 Juli 2026, Context7 kembali gagal karena API key konektor invalid. Konfigurasi beberapa keluarga Google Fonts diverifikasi melalui https://fonts.nuxt.com/get-started/configuration dan token/animasi CSS-first melalui dokumentasi Tailwind CSS v4 di https://tailwindcss.com/docs/theme serta https://tailwindcss.com/docs/animation.

## Perbaikan payload route dinamis

Route publik statis yang diimplementasikan oleh `pages/[...slug].vue` dicantumkan eksplisit pada `nitro.prerender.routes`. Hal ini mengikuti dokumentasi Nuxt 4.4.8: route dinamis yang tidak ditemukan crawler harus didaftarkan manual agar HTML dan `_payload.json` sama-sama dihasilkan. Referensi: https://nuxt.com/docs/4.x/getting-started/prerendering

## Cloudflare Workers

Konfigurasi diverifikasi pada 9 Juli 2026. Context7 gagal karena API key konektor invalid, sehingga digunakan dokumentasi resmi Cloudflare dan Nitro:

- Nuxt on Cloudflare Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/
- Wrangler configuration: https://developers.cloudflare.com/workers/wrangler/configuration/
- Compatibility flags: https://developers.cloudflare.com/workers/configuration/compatibility-flags/
- Nitro Cloudflare preset: https://nitro.build/deploy/providers/cloudflare

Preset build yang digunakan adalah `cloudflare_module`, sesuai dokumentasi Nitro untuk format Workers Module. Assets berasal dari `.output/public` dan runtime memakai `nodejs_compat`. Wrangler menunjuk langsung ke `.output/server/index.mjs` sesuai panduan Cloudflare. `index.js` root menyimpan referensi entry untuk kebutuhan integrasi tanpa membungkus output framework.

`experimental.appManifest` dan `payloadExtraction` dinonaktifkan agar payload SSR dari API tetap sederhana pada runtime Cloudflare. Cache konten dinamis ditulis dalam bentuk eksplisit `cache: { maxAge, swr: true }`, bukan shorthand `swr`, untuk menghindari properti `payload` ganda yang dihasilkan Nuxt 4.4.8 pada bundle Cloudflare. Nitro tetap menerapkan stale-while-revalidate di server. Opsi payload didokumentasikan resmi di https://nuxt.com/docs/4.x/guide/going-further/experimental-features.

## Carousel pendidik

Pada pembaruan 9 Juli 2026, Context7 kembali tidak dapat digunakan karena API key konektor invalid. Implementasi Swiper 14.0.5 diverifikasi melalui dokumentasi resmi Swiper Vue di https://swiperjs.com/vue dan API di https://swiperjs.com/swiper-api. Carousel memakai modul `Autoplay`, `FreeMode`, `Keyboard`, dan `A11y`, serta menghormati preferensi sistem `prefers-reduced-motion`.
