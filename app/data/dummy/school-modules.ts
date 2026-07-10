import type { SchoolModulesData } from '~/types/school-modules'

export const defaultSchoolModules: SchoolModulesData = {
  profileSections: [
    { id: 'identity', eyebrow: 'Profil Sekolah', title: 'SD Negeri Sukorame 2 Kota Kediri', body: 'Sekolah dasar negeri dengan identitas pendidikan Sekolah SAKTI.', image: '/images/no-image.png', imageAlt: 'Gedung sekolah' },
    { id: 'history', eyebrow: 'Riwayat Sekolah', title: 'Bagian dari pendidikan Kota Kediri sejak 1957', body: 'SD Negeri Sukorame 2 berdiri pada tahun 1957 dan menyelenggarakan pendidikan dasar bagi masyarakat sekitar.', image: '/images/no-image.png', imageAlt: 'Dokumentasi sejarah sekolah' },
    { id: 'vision', eyebrow: 'Arah Pendidikan', title: 'Visi dan Misi', body: 'Mewujudkan generasi pembelajar sepanjang hayat yang selaras dengan alam, berakhlak mulia, kritis, terampil, serta inovatif.', image: '/images/no-image.png', imageAlt: 'Kegiatan pendidikan' },
  ],
  teachers: [
    { id: 'teacher-1', name: 'Lilis Khoirulina, M.Pd.I', role: 'Kepala Sekolah', bio: 'Kepala SD Negeri Sukorame 2.', image: '/images/no-image.png', status: 'published' },
  ],
  academicDocuments: [],
  studentCategories: [
    { id: 'student-cat-1', name: 'Ekstrakurikuler', description: 'Kegiatan pengembangan minat dan bakat siswa.', status: 'published' },
  ],
  studentActivities: [],
  informationCategories: [
    { id: 'info-cat-1', name: 'Berita', description: 'Berita dan kegiatan terbaru sekolah.', status: 'published' },
    { id: 'info-cat-2', name: 'Pengumuman', description: 'Pengumuman resmi sekolah.', status: 'published' },
    { id: 'info-cat-3', name: 'Agenda', description: 'Agenda kegiatan sekolah.', status: 'published' },
  ],
  informationItems: [],
  gallery: [],
  contact: { title: 'Kontak Sekolah', description: 'Hubungi SD Negeri Sukorame 2 melalui kanal resmi berikut.', address: 'Jalan Himalaya No. 2, Kelurahan Sukorame, Kecamatan Mojoroto, Kota Kediri', email: 'sdnsukorame2kediri@gmail.com', phone: '', mapEmbedUrl: '', image: '/images/no-image.png' },
  ppdb: {
    title: 'Penerimaan Peserta Didik Baru', description: 'Informasi jadwal, syarat, alur, dan pertanyaan umum PPDB.', startDate: '2026-07-01T08:00', endDate: '2026-07-10T16:00', countdownEnabled: true, image: '/images/no-image.png',
    requirements: [{ id: 'req-1', text: 'Salinan akta kelahiran calon peserta didik' }, { id: 'req-2', text: 'Salinan Kartu Keluarga' }],
    steps: [{ id: 'step-1', title: 'Siapkan dokumen', description: 'Siapkan seluruh dokumen yang dipersyaratkan.' }, { id: 'step-2', title: 'Isi formulir', description: 'Isi formulir pendaftaran sesuai jadwal.' }],
    faqs: [{ id: 'faq-1', question: 'Kapan PPDB dibuka?', answer: 'Silakan lihat tanggal dan hitung mundur pada halaman ini.' }],
  },
}
