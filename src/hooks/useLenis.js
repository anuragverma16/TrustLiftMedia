import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsapSetup'

// Module singleton so any component can stop / start / scroll.
export const lenisStore = { instance: null }

export const scrollToTop = () => {
  if (lenisStore.instance) {
    lenisStore.instance.scrollTo(0, { immediate: true, force: true })
  } else {
    window.scrollTo(0, 0)
  }
}

export const lockScroll = () => lenisStore.instance?.stop()
export const unlockScroll = () => lenisStore.instance?.start()

/**
 * Lenis smooth scroll wired into GSAP's ticker so ScrollTrigger and Lenis
 * share a single rAF loop (no jitter). Native scrolling is left alone when the
 * user prefers reduced motion. Touch devices keep native momentum scrolling.
 */
export default function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisStore.instance = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => lenis.resize()
    window.addEventListener('load', onResize)

    return () => {
      window.removeEventListener('load', onResize)
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisStore.instance = null
    }
  }, [])
}
