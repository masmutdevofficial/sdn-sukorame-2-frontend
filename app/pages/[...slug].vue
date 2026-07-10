<script setup lang="ts">
import { school, allContent } from '~/data/dummy/content'
const route=useRoute(); const raw=route.params.slug; const path='/'+(Array.isArray(raw)?raw.join('/'):String(raw||''))
const labels:Record<string,[string,string,string]>={
  '/profil':['Profil Sekolah','Mengenal SD Negeri Sukorame 2 lebih dekat.',school.vision],
  '/profil/sejarah':['Sejarah','Perjalanan sekolah sejak tahun 1957.','SD Negeri Sukorame 2 berdiri pada tahun 1957 dan terus mendampingi generasi pembelajar di Kota Kediri.'],
  '/profil/visi-misi':['Visi dan Misi','Arah pendidikan Sekolah SAKTI.',school.vision],
  '/akademik/kurikulum':['Kurikulum','Pembelajaran bermakna dan berpihak pada murid.','Kurikulum demonstrasi akan diperbarui melalui admin.'],
  '/akademik/program-sekolah':['Program Sekolah','Program yang mendukung tumbuh kembang murid.','Program pembelajaran, karakter, lingkungan, literasi, dan kreativitas.'],
  '/perpustakaan':['Perpustakaan','Ruang literasi dan eksplorasi pengetahuan.','Informasi koleksi dan layanan akan diperbarui oleh sekolah.'],
  '/kontak':['Kontak','Terhubung dengan sekolah.',`Alamat: ${school.address}. Informasi telepon dan email resmi belum diatur.`],
  '/faq':['Pertanyaan Umum','Jawaban ringkas untuk orang tua dan masyarakat.','Informasi resmi tersedia melalui pengumuman website atau kunjungan ke sekolah.'],
  '/unduhan':['Unduhan','Dokumen publik sekolah.','Dokumen saat ini merupakan metadata demonstrasi tanpa file sensitif.'],
  '/galeri':['Galeri','Dokumentasi kegiatan Sekolah SAKTI.','Album foto demonstrasi untuk pratinjau tampilan.'],
}
const found=allContent.find(x=>path.endsWith('/'+x.slug))
const page:[string,string,string]=found?[found.title,found.excerpt,found.body]:(labels[path]||['Halaman Informasi','Informasi SDN Sukorame 2.','Konten halaman ini sedang disiapkan dan dapat dikelola melalui admin demo.'])
useSchoolSeo(page[0],page[1])
</script>
<template><section><div class="bg-school-sky py-14"><div class="container-school"><p class="text-sm font-semibold text-school-action">Beranda / {{page[0]}}</p><h1 class="mt-3 text-4xl font-bold text-school-navy">{{page[0]}}</h1><p class="mt-4 max-w-2xl text-lg">{{page[1]}}</p></div></div><article class="container-school py-12"><div class="card prose-school max-w-3xl p-7 md:p-10"><p v-for="paragraph in page[2].split('\n')" :key="paragraph">{{paragraph}}</p><div v-if="path==='/profil'" class="mt-8 grid gap-3 sm:grid-cols-2"><p><b>NPSN:</b> {{school.npsn}}</p><p><b>NSS:</b> {{school.nss}}</p><p><b>NIS:</b> {{school.nis}}</p><p><b>Kepala sekolah:</b> {{school.headmaster}}</p></div></div></article></section></template>
