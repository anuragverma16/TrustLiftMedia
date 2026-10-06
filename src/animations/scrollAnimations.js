import { gsap } from './gsapSetup'

// Border / rule that draws itself from left to right.
export function lineGrow(targets, { trigger, start = 'top 90%', duration = 1.4, delay = 0, stagger = 0.12 } = {}) {
  return gsap.fromTo(
    targets,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration,
      delay,
      stagger,
      ease: 'expo.out',
      scrollTrigger: { trigger: trigger || targets, start, once: true },
    },
  )
}

// Scrubbed vertical drift for any element (backgrounds, big type, etc).
export function parallaxY(el, { from = -40, to = 40, trigger, start = 'top bottom', end = 'bottom top' } = {}) {
  return gsap.fromTo(
    el,
    { y: from },
    {
      y: to,
      ease: 'none',
      scrollTrigger: { trigger: trigger || el, start, end, scrub: true },
    },
  )
}

/**
 * Horizontal scroll driven by vertical scroll, with the section pinned.
 * Returns { tween, st } so children can use `containerAnimation: tween`.
 */
export function horizontalScroll({ section, track, onUpdate }) {
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

  const tween = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      pin: true,
      anticipatePin: 1,
      scrub: 0.8,
      start: 'top top',
      end: () => `+=${distance()}`,
      invalidateOnRefresh: true,
      onUpdate: onUpdate ? (self) => onUpdate(self.progress) : undefined,
    },
  })

  return { tween, st: tween.scrollTrigger }
}
