export interface PublicLightboxSlide {
  image: string
  title?: string
  description?: string
}

interface PublicLightboxState {
  open: boolean
  slides: PublicLightboxSlide[]
  initialIndex: number
  alt: string
}

const normalizePublicLightboxSlides = (slides: PublicLightboxSlide[]) => slides
  .map(slide => ({ ...slide, image: slide.image?.trim() }))
  .filter((slide): slide is PublicLightboxSlide => Boolean(slide.image))

export const encodePublicLightboxSlides = (slides: PublicLightboxSlide[]) => JSON.stringify(normalizePublicLightboxSlides(slides))

export const usePublicImageLightbox = () => {
  const state = useState<PublicLightboxState>('public-image-lightbox', () => ({
    open: false,
    slides: [],
    initialIndex: 0,
    alt: 'Gambar sekolah',
  }))

  const openLightbox = (slides: PublicLightboxSlide[], initialIndex = 0, alt = 'Gambar sekolah') => {
    const normalizedSlides = normalizePublicLightboxSlides(slides)

    if (!normalizedSlides.length) return

    state.value = {
      open: true,
      slides: normalizedSlides,
      initialIndex: Math.min(Math.max(initialIndex, 0), normalizedSlides.length - 1),
      alt,
    }
  }

  const closeLightbox = () => {
    state.value.open = false
  }

  return {
    state,
    openLightbox,
    closeLightbox,
  }
}
