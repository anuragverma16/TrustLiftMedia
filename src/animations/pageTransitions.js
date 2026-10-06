import { gsap, ScrollTrigger, prefersReducedMotion } from './gsapSetup'
import { lockScroll, unlockScroll, scrollToTop } from '../hooks/useLenis'
import { markTransition } from './ready'

const refs = { overlay: null, label: null, page: null }
let busy = false

export const registerTransition = ({ overlay, label, page }) => {
  refs.overlay = overlay
  refs.label = label
  refs.page = page
}

/**
 * Short, premium route transition:
 *   clip-path wipe in → swap route (while covered) → wipe out, content fades in.
 * ~1.1s total. Falls back to an instant swap for reduced motion.
 */
export function transitionTo(navigate, to) {
  const { overlay, label, page } = refs

  if (busy) return
  if (!overlay || prefersReducedMotion()) {
    navigate(to)
    scrollToTop()
    return
  }

  busy = true
  markTransition()
  lockScroll()

  gsap.set(overlay, { visibility: 'visible', pointerEvents: 'auto', clipPath: 'inset(100% 0% 0% 0%)' })
  gsap.set(label, { opacity: 0, scale: 1.3 })

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(overlay, { visibility: 'hidden', pointerEvents: 'none' })
      gsap.set(page, { clearProps: 'opacity' })
      unlockScroll()
      busy = false
    },
  })

  tl.to(overlay, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'expo.inOut' })
    .to(label, { opacity: 1, scale: 1, duration: 0.45, ease: 'expo.out' }, '-=0.25')
    .add(() => {
      navigate(to)
      scrollToTop()
      gsap.set(page, { opacity: 0 })
    })
    .to({}, { duration: 0.14 }) // let React mount the next route
    .add(() => ScrollTrigger.refresh())
    .to(overlay, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.65, ease: 'expo.inOut' })
    .to(label, { opacity: 0, scale: 0.92, duration: 0.3, ease: 'power2.in' }, '<')
    .to(page, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '<0.15')
}
