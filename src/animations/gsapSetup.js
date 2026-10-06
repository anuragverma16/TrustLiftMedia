import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once, import { gsap, ScrollTrigger } from here everywhere.
gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.config({ ignoreMobileResize: true })
gsap.defaults({ ease: 'power3.out' })

export const EASE = {
  expo: 'expo.out',
  expoInOut: 'expo.inOut',
  soft: 'power3.out',
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const MEDIA = {
  desktop: '(min-width: 1024px)',
  mobile: '(max-width: 1023px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
}

export { gsap, ScrollTrigger }
