import type { SitePage } from '~/types/site-page'

const makePage = (slug: string, title: string, excerpt: string, body = excerpt): SitePage => ({
  id: `page-${slug.replaceAll('/', '-')}`,
  slug,
  title,
  eyebrow: 'SD Negeri Sukorame 2',
  excerpt,
  body,
  image: '/images/no-image.png',
  imageAlt: `Gambar halaman ${title}`,
  status: 'published',
  updatedAt: '2026-07-10T00:00:00.000Z',
})

export const defaultSitePages: SitePage[] = [
  makePage('profil', 'Profil SD Negeri Sukorame 2', 'Sekolah dasar negeri di Kelurahan Sukorame, Kecamatan Mojoroto, Kota Kediri, dengan identitas pendidikan Sekolah SAKTI.'),
  makePage('ppdb', 'Informasi PPDB SDN Sukorame 2', 'Satu halaman untuk memantau status, alur, dan informasi resmi penerimaan peserta didik baru.'),
  makePage('pencarian', 'Pencarian', 'Cari berita, agenda, program, dan informasi sekolah.'),
  makePage('informasi/berita', 'Berita', 'Temukan catatan kegiatan dan berita terbaru dari SD Negeri Sukorame 2 Kota Kediri.'),
  makePage('informasi/pengumuman', 'Pengumuman', 'Temukan pengumuman resmi terbaru dari SD Negeri Sukorame 2 Kota Kediri.'),
  makePage('informasi/agenda', 'Agenda', 'Temukan jadwal agenda terbaru dari SD Negeri Sukorame 2 Kota Kediri.'),
  makePage('akademik/kurikulum', 'Kurikulum', 'Informasi kurikulum sekolah.', 'Konten kurikulum dapat diperbarui melalui panel admin.'),
  makePage('akademik/program-sekolah', 'Program Sekolah', 'Program prioritas dan pembiasaan Sekolah SAKTI.'),
  makePage('kesiswaan/ekstrakurikuler', 'Ekstrakurikuler', 'Pilihan kegiatan pengembangan minat dan bakat siswa.'),
  makePage('prestasi', 'Prestasi', 'Catatan prestasi siswa dan sekolah.'),
  makePage('karya-siswa', 'Karya Siswa', 'Ruang apresiasi karya peserta didik.'),
  makePage('galeri', 'Galeri', 'Dokumentasi kegiatan sekolah.'),
  makePage('fasilitas', 'Fasilitas', 'Informasi sarana dan prasarana sekolah.'),
  makePage('perpustakaan', 'Perpustakaan', 'Layanan literasi dan koleksi perpustakaan sekolah.'),
  makePage('unduhan', 'Unduhan', 'Dokumen publik yang dapat diunduh.'),
  makePage('kontak', 'Kontak', 'Alamat dan kanal komunikasi resmi sekolah.'),
]
