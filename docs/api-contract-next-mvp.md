# Kontrak API Fastify — MVP Berikutnya

Dokumen rencana saja; proyek frontend ini tidak mengimplementasikan endpoint.

Semua respons sukses berbentuk `{ success: true, data, message? }`; kegagalan `{ success: false, message, errors? }`. List memakai `items` dan `meta: { page, perPage, total, totalPages }`.

## Public

`GET /api/v1/public/site`, `/navigation`, `/home`, `/news`, `/news/:slug`, `/announcements`, `/announcements/:slug`, `/agendas`, `/agendas/:slug`, `/extracurriculars`, `/extracurriculars/:slug`, `/achievements`, `/achievements/:slug`, `/student-works`, `/student-works/:slug`, `/galleries`, `/galleries/:slug`, `/teachers`, `/facilities`, `/downloads`, `/library`.

## Auth

`POST /api/v1/auth/login`, `/refresh`, `/logout`; `GET /api/v1/auth/me`.

## Admin

Untuk `news`, `announcements`, `agendas`, `programs`, `extracurriculars`, `achievements`, `student-works`, `galleries`, `teachers`, `facilities`, `downloads`, `library`, `site-settings`, dan `users`:

- `GET /api/v1/admin/{resource}` dan `GET /api/v1/admin/{resource}/:id`
- `POST /api/v1/admin/{resource}`
- `PATCH /api/v1/admin/{resource}/:id`
- `DELETE /api/v1/admin/{resource}/:id`

Query list: `page`, `perPage`, `search`, `status`, `category`, `sortBy`, `sortOrder`. Auth Fastify kelak wajib menggantikan login demo sepenuhnya.

## Konten Halaman

Kontrak halaman tunggal menggunakan interface `PageContentRepository<T>` pada `app/types/page-content.ts`:

- `GET /api/v1/public/pages/:slug` untuk mengambil konten halaman terbit.
- `GET /api/v1/admin/pages/:slug` untuk mengambil konten halaman ke editor.
- `PUT /api/v1/admin/pages/:slug` untuk mengganti seluruh konfigurasi halaman.

Slug `beranda` memakai payload `HomePageContent`. Payload mencakup SEO, hero, statistik, sambutan kepala sekolah, nilai SAKTI, pengantar program, pengantar berita, CTA, tautan, dan gambar. Kartu program dan berita tetap menggunakan resource CRUD konten agar dapat dikelola secara individual.

Semua halaman publik lain memakai payload `SitePage` dan endpoint CRUD berikut:

- `GET /api/v1/public/pages/:slug`
- `GET /api/v1/admin/pages` dan `GET /api/v1/admin/pages/:id`
- `POST /api/v1/admin/pages`
- `PATCH /api/v1/admin/pages/:id`
- `DELETE /api/v1/admin/pages/:id`

## Media

Gambar tidak dikirim sebagai URL manual. Admin mengunggah file melalui `POST /api/v1/admin/media` dengan `multipart/form-data` (`file` dan `alt`). Respons mengembalikan `MediaAsset` berisi `id`, `url`, `filename`, `mimeType`, `size`, dan `alt`. Penghapusan aset memakai `DELETE /api/v1/admin/media/:id`. Batas awal frontend adalah gambar PNG/JPG/WEBP/GIF maksimal 2 MB.
