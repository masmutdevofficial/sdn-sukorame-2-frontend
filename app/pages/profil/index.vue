<script setup lang="ts">
const DEFAULT_IMAGE_URL = 'https://cdn.sdnsukorame2kotakediri.sch.id/images/no-image.png'

const schoolModules = useSchoolModules()
await schoolModules.ready

const { modules } = schoolModules
const publishedTeachers = computed(() => modules.value.teachers.filter(item => item.status === 'published'))

useSchoolSeo('Profil Sekolah', 'Profil dan pendidik SD Negeri Sukorame 2')
</script>

<template>
  <div>
    <section
      v-for="(section, index) in modules.profileSections"
      :key="section.id"
      :class="index % 2 ? 'bg-white' : 'bg-school-sky'"
      class="overflow-hidden py-16 sm:py-20"
    >
      <div class="container-school grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div :class="index % 2 ? 'lg:order-2' : ''">
          <p class="font-hand text-3xl font-bold text-school-action">
            {{ section.eyebrow }}
          </p>
          <component
            :is="index === 0 ? 'h1' : 'h2'"
            class="font-display mt-2 text-4xl text-school-navy sm:text-5xl"
          >
            {{ section.title }}
          </component>
          <div class="profile-body mt-5 max-w-2xl text-muted" v-html="section.body" />
        </div>

        <div class="relative mx-auto w-full max-w-xl">
          <div class="absolute -inset-3 rounded-[2rem] bg-white/70 shadow-soft" />
          <div class="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-soft">
            <div class="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100">
              <NuxtImg
                :src="section.image || DEFAULT_IMAGE_URL"
                :alt="section.imageAlt || section.title"
                width="720"
                height="540"
                loading="lazy"
                class="h-full w-full rounded-[1.5rem] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div class="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-school-navy/35 via-transparent to-white/10" />
              <div class="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                <p class="text-sm font-bold text-school-navy">
                  {{ section.eyebrow }}
                </p>
                <p class="mt-1 line-clamp-1 text-xs font-semibold text-muted">
                  SD Negeri Sukorame 2 Kota Kediri
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container-school py-16 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="font-hand text-3xl font-bold text-school-action">
          Warga Sekolah
        </p>
        <h2 class="font-display mt-2 text-4xl text-school-navy">
          Pendidik dan Tenaga Kependidikan
        </h2>
        <p class="mt-4 leading-7 text-muted">
          Sosok pendamping belajar yang menjaga suasana sekolah tetap hangat, tertib, dan dekat dengan kebutuhan peserta didik.
        </p>
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="teacher in publishedTeachers"
          :key="teacher.id"
          class="group rounded-[2rem] border border-slate-100 bg-white p-3 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-school-sky">
            <NuxtImg
              :src="teacher.image || DEFAULT_IMAGE_URL"
              :alt="teacher.name"
              width="480"
              height="600"
              loading="lazy"
              class="h-full w-full rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-x-0 bottom-0 rounded-b-[1.5rem] bg-gradient-to-t from-school-navy/70 to-transparent px-5 pb-5 pt-16">
              <p class="text-sm font-bold text-white">
                {{ teacher.role }}
              </p>
            </div>
          </div>

          <div class="px-2 pb-3 pt-5">
            <h3 class="text-lg font-bold text-school-navy">
              {{ teacher.name }}
            </h3>
            <p class="mt-2 line-clamp-3 text-sm leading-6 text-muted">
              {{ teacher.bio }}
            </p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.profile-body{line-height:2;white-space:pre-line}.profile-body :deep(p){margin:0 0 1rem}.profile-body :deep(:is(h3,h4,h5,h6)){margin:1.25rem 0 .5rem;font-weight:800;color:#123a63;line-height:1.35}.profile-body :deep(:is(ul,ol)){margin:.75rem 0 1rem 1.25rem;padding-left:1rem}.profile-body :deep(ul){list-style:disc}.profile-body :deep(ol){list-style:decimal}.profile-body :deep(li){padding-left:.25rem}.profile-body :deep(a){font-weight:700;color:#1565a9;text-decoration:underline;text-underline-offset:3px}.profile-body :deep(blockquote){margin:1rem 0;border-left:4px solid #f6c945;padding:.75rem 1rem;background:#f8fafc;border-radius:.75rem}.profile-body :deep(table){margin:1rem 0;width:100%;border-collapse:collapse;overflow:hidden;border-radius:.75rem;background:white}.profile-body :deep(:is(th,td)){border:1px solid #e2e8f0;padding:.65rem;text-align:left}.profile-body :deep(th){background:#f8fafc;color:#123a63}
</style>
