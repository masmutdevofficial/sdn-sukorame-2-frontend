export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() {
      return {}
    },
    mounted(element: HTMLElement) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.classList.add('reveal-visible')
        return
      }

      element.classList.add('reveal-observed')

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          element.classList.add('reveal-visible')
          observer.disconnect()
        },
        { threshold: 0.18, rootMargin: '0px 0px -40px' },
      )

      observer.observe(element)
      ;(element as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver = observer
    },
    unmounted(element: HTMLElement & { _revealObserver?: IntersectionObserver }) {
      element._revealObserver?.disconnect()
    },
  })
})
