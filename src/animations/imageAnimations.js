import { gsap } from './gsapSetup'

const CLIP_FROM = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
}

/**
 * Clip-path reveal of a wrapper plus a slow 1.15 → 1 settle of the image inside it.
 * Both are transform / clip-path only (no layout properties).
 */
export function clipReveal(
  wrap,
  img,
  { trigger, start = 'top 85%', direction = 'up', duration = 1.5, delay = 0, paused = false } = {},
) {
  const tl = gsap.timeline({
    paused,
    delay,
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
  })
  tl.fromTo(
    wrap,
    { clipPath: CLIP_FROM[direction] },
    { clipPath: 'inset(0% 0% 0% 0%)', duration, ease: 'expo.inOut' },
    0,
  )
  if (img) {
    tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: duration + 0.6, ease: 'expo.out' }, 0)
  }
  return tl
}

/**
 * Scrubbed parallax for an image that is rendered larger than its frame
 * (use the `parallax-img` oversize class / h-[120%]) so edges never show.
 */
export function imageParallax(img, { amount = 24, trigger } = {}) {
  return gsap.fromTo(
    img,
    { yPercent: -amount / 3 },
    {
      yPercent: amount / 3,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
}
