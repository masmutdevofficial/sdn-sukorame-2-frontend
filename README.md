# SDN Sukorame 2 — Frontend

Frontend Nuxt untuk website publik dan panel admin SD Negeri Sukorame 2.

- API Fastify: `https://api.sdnsukorame2kotakediri.sch.id/api/v1`
- CDN Cloudflare R2: `https://cdn.sdnsukorame2kotakediri.sch.id`
- Seluruh konten dinamis dibaca dan disimpan melalui API Fastify.
- Halaman admin tersedia di `/admin/login` dan menggunakan akun yang dibuat oleh seeder backend.

## Menjalankan

```bash
npm install
npm run dev
npm run typecheck
npm run build
```
