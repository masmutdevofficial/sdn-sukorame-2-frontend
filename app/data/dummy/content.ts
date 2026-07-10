import type { ContentItem } from '~/types/content'
const demo='Konten demonstrasi untuk pratinjau tampilan. Data resmi akan diperbarui melalui admin.'
const make=(kind:string,count:number,icon:string):ContentItem[]=>Array.from({length:count},(_,i)=>({id:`${kind}-${i+1}`,title:`${kind} Sekolah ${i+1}`,slug:`${kind.toLowerCase().replaceAll(' ','-')}-${i+1}`,excerpt:`${demo} Kegiatan positif warga sekolah.`,body:`${demo}\n\nInformasi ini menunjukkan bagaimana konten akan disajikan dengan jelas, ramah, dan mudah diakses.`,category:kind,date:new Date(2026,5,20-i).toISOString(),status:'published',icon}))
export const news=make('Berita',6,'mdi:newspaper-variant-outline')
export const announcements=make('Pengumuman',4,'mdi:bullhorn-outline')
export const agendas=make('Agenda',5,'mdi:calendar-month-outline')
export const extracurriculars=make('Ekstrakurikuler',9,'mdi:badminton')
export const achievements=make('Prestasi Demo',5,'mdi:trophy-outline')
export const works=make('Karya Siswa Demo',4,'mdi:lightbulb-on-outline')
export const programs=make('Program Sekolah',6,'mdi:school-outline')
export const allContent=[...news,...announcements,...agendas,...extracurriculars,...achievements,...works,...programs]
export const school={name:'SD Negeri Sukorame 2',fullName:'SD Negeri Sukorame 2 Kota Kediri',brand:'SDN Sukorame 2 — Sekolah SAKTI',tagline:'Selaras dengan Alam, Berakhlak Mulia, Kritis, Terampil, dan Inovatif',vision:'Mewujudkan generasi pembelajar sepanjang hayat yang selaras dengan alam, berakhlak mulia, kritis, terampil, serta inovatif.',npsn:'20534301',nss:'101105630138',nis:'100013',address:'Jalan Himalaya No. 2, Kelurahan Sukorame, Kecamatan Mojoroto, Kota Kediri',postal:'64114',email:'sdnsukorame2kediri@gmail.com',founded:'1957',headmaster:'Lilis Khoirulina, M.Pd.I'}
