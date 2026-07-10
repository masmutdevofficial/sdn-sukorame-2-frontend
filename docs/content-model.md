# Model Konten

Entity dasar memiliki `id`, `title`, `slug`, `excerpt`, `body`, `category`, `date`, dan status `draft | published | archived`.

Semua data awal dibuat oleh seeder Fastify/MySQL. Frontend hanya menggunakan HTTP repository menuju API produksi, sedangkan semua URL media menggunakan CDN Cloudflare R2 resmi.
