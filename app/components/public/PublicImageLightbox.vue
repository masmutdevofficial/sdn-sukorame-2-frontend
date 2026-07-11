<script setup lang="ts">
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { PublicLightboxSlide } from '~/composables/usePublicImageLightbox'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { state, openLightbox, closeLightbox } = usePublicImageLightbox()
const modules = [Autoplay, Keyboard, Navigation, Pagination]
const canSlide = computed(() => state.value.slides.length > 1)
const autoplay = computed(() => canSlide.value
  ? { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }
  : false)
const pagination = computed(() => canSlide.value ? { clickable: true } : false)
const navigation = computed(() => canSlide.value)
const lightboxKey = computed(() => `${state.value.slides.map(slide => slide.image).join('|')}-${state.value.initialIndex}`)

const parseSlides = (value?: string | null): PublicLightboxSlide[] => {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return []

    return parsed
      .map(item => ({
        image: typeof item?.image === 'string' ? item.image : '',
        title: typeof item?.title === 'string' ? item.title : undefined,
        description: typeof item?.description === 'string' ? item.description : undefined,
      }))
      .filter(item => item.image)
  } catch {
    return []
  }
}

const imageSource = (image: HTMLImageElement) => image.dataset.lightboxSrc || image.currentSrc || image.src

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target
  if (!(target instanceof Element)) return

  const image = target.closest('img')
  if (!(image instanceof HTMLImageElement)) return
  if (image.closest('header, footer, nav, a, button, [data-lightbox-modal="true"], [data-no-lightbox="true"]')) return

  const source = imageSource(image)
  if (!source) return

  const slides = parseSlides(image.dataset.lightboxImages)
  const initialIndex = Number.parseInt(image.dataset.lightboxIndex || '0', 10)
  const alt = image.alt || 'Gambar sekolah'

  event.preventDefault()
  openLightbox(
    slides.length ? slides : [{ image: source, title: alt }],
    Number.isFinite(initialIndex) ? initialIndex : 0,
    alt,
  )
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && state.value.open) closeLightbox()
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleKeydown)
})

watch(() => state.value.open, (open) => {
  if (!import.meta.client) return
  document.documentElement.classList.toggle('overflow-hidden', open)
}, { immediate: true })
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="public-lightbox">
        <div
          v-if="state.open"
          class="fixed inset-0 z-[120] grid place-items-center bg-school-navy/90 p-4 backdrop-blur-md"
          data-lightbox-modal="true"
          role="dialog"
          aria-modal="true"
          :aria-label="state.alt"
          @click.self="closeLightbox"
        >
          <button
            type="button"
            class="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-white/20 bg-white/15 text-white shadow-xl backdrop-blur transition hover:bg-white/25"
            aria-label="Tutup gambar"
            @click="closeLightbox"
          >
            <Icon name="mdi:close" size="24" />
          </button>

          <div class="relative w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-slate-950/30">
            <Swiper
              :key="lightboxKey"
              class="public-lightbox-swiper"
              :modules="modules"
              :loop="canSlide"
              :autoplay="autoplay"
              :pagination="pagination"
              :navigation="navigation"
              :keyboard="{ enabled: true }"
              :initial-slide="state.initialIndex"
              :slides-per-view="1"
              :speed="850"
            >
              <SwiperSlide v-for="(slide, index) in state.slides" :key="`${slide.image}-${index}`">
                <figure class="grid min-h-[72vh] place-items-center overflow-hidden rounded-[1.35rem] bg-slate-950/30">
                  <img :src="slide.image" :alt="slide.title || state.alt" class="max-h-[78vh] w-full object-contain">
                  <figcaption v-if="slide.title || slide.description" class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-school-navy/95 via-school-navy/55 to-transparent px-5 pb-6 pt-20 text-white sm:px-8">
                    <p v-if="slide.title" class="text-lg font-extrabold sm:text-2xl">
                      {{ slide.title }}
                    </p>
                    <p v-if="slide.description" class="mt-1 line-clamp-2 max-w-3xl text-sm leading-6 text-blue-50">
                      {{ slide.description }}
                    </p>
                  </figcaption>
                </figure>
              </SwiperSlide>
            </Swiper>

            <div v-if="canSlide" class="absolute left-5 top-5 z-10 rounded-full bg-school-navy/75 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur">
              {{ state.slides.length }} foto
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.public-lightbox-enter-active,.public-lightbox-leave-active{transition:opacity .22s ease}.public-lightbox-enter-from,.public-lightbox-leave-to{opacity:0}.public-lightbox-swiper{height:100%;width:100%}:deep(.swiper-slide){position:relative;height:auto}:deep(.swiper-button-next),:deep(.swiper-button-prev){color:white;text-shadow:0 4px 18px rgba(0,0,0,.35)}:deep(.swiper-pagination-bullet){height:.5rem;width:.5rem;background:white;opacity:.6}:deep(.swiper-pagination-bullet-active){width:1.35rem;border-radius:999px;background:var(--color-school-yellow);opacity:1}
</style>
