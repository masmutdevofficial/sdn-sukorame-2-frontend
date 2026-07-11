<script setup lang="ts">
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

interface ImageSlide {
  image: string
  title?: string
  description?: string
}

const props = withDefaults(defineProps<{
  images?: string[]
  slides?: ImageSlide[]
  lightboxSlides?: ImageSlide[]
  lightboxIndex?: number
  alt: string
  aspectRatio?: string
  showCaptions?: boolean
}>(), {
  images: () => [],
  slides: () => [],
  lightboxSlides: () => [],
  lightboxIndex: undefined,
  aspectRatio: '4 / 3',
  showCaptions: false,
})

const fallbackImage = 'https://cdn.sdnsukorame2kotakediri.sch.id/images/no-image.png'
const modules = [Autoplay, Pagination]
const normalizedSlides = computed<ImageSlide[]>(() => {
  const slides = props.slides.length
    ? props.slides
    : props.images.map(image => ({ image }))

  return slides.length ? slides : [{ image: fallbackImage, title: 'Belum ada gambar' }]
})
const canSlide = computed(() => normalizedSlides.value.length > 1)
const lightboxSlides = computed(() => props.lightboxSlides.length ? props.lightboxSlides : normalizedSlides.value)
const lightboxPayload = computed(() => encodePublicLightboxSlides(lightboxSlides.value))
const autoplay = computed(() => canSlide.value
  ? { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }
  : false)
const pagination = computed(() => canSlide.value ? { clickable: true } : false)
</script>

<template>
  <div class="relative overflow-hidden bg-slate-100" :style="{ aspectRatio }">
    <ClientOnly>
      <Swiper
        class="public-auto-image-slider"
        :modules="modules"
        :loop="canSlide"
        :autoplay="autoplay"
        :pagination="pagination"
        :slides-per-view="1"
        :speed="850"
      >
        <SwiperSlide v-for="(slide, index) in normalizedSlides" :key="`${slide.image}-${index}`">
          <div class="relative size-full">
            <img
              :src="slide.image"
              :alt="slide.title || alt"
              class="size-full cursor-zoom-in object-cover"
              :data-lightbox-images="lightboxPayload"
              :data-lightbox-index="lightboxIndex ?? index"
            >
            <div v-if="showCaptions && (slide.title || slide.description)" class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-school-navy/85 via-school-navy/35 to-transparent p-5 text-white">
              <p v-if="slide.title" class="text-lg font-extrabold leading-tight">
                {{ slide.title }}
              </p>
              <p v-if="slide.description" class="mt-1 line-clamp-2 text-sm leading-6 text-blue-50">
                {{ slide.description }}
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <template #fallback>
        <img
          :src="normalizedSlides[0]!.image"
          :alt="normalizedSlides[0]!.title || alt"
          class="size-full cursor-zoom-in object-cover"
          :data-lightbox-images="lightboxPayload"
          :data-lightbox-index="lightboxIndex ?? 0"
        >
      </template>
    </ClientOnly>

    <div v-if="canSlide" class="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-school-navy/75 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur">
      {{ normalizedSlides.length }} foto
    </div>
  </div>
</template>

<style scoped>
.public-auto-image-slider{height:100%;width:100%}
:deep(.swiper-slide){height:auto}
:deep(.swiper-pagination){bottom:.65rem}
:deep(.swiper-pagination-bullet){height:.45rem;width:.45rem;background:white;opacity:.65}
:deep(.swiper-pagination-bullet-active){width:1.25rem;border-radius:999px;background:var(--color-school-yellow);opacity:1}
</style>
