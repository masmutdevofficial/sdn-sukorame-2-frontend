# Model Konten

Entity dasar memiliki `id`, `title`, `slug`, `excerpt`, `body`, `category`, `date`, dan status `draft | published | archived`. Repository menjadi batas antara UI dan sumber data agar dummy localStorage dapat diganti HTTP repository tanpa mengubah page.

Data sekolah yang tidak terkonfirmasi disimpan kosong dan tidak ditampilkan. Konten demonstrasi diberi label demo dan tidak dianggap sebagai fakta resmi.
