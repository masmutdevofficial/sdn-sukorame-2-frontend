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
