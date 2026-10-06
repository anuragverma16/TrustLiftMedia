import { gsap } from './gsapSetup'

/**
 * Hero intro. Builds a PAUSED timeline (so it is captured by the surrounding
 * gsap context) — the caller plays it once the preloader has finished.
 *
 * Order: label → heading lines → description → CTA, while the media
 * settles from scale 1.1 → 1.
 */
export function heroIntro(root) {
  const q = (sel) => root.querySelectorAll(sel)
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })

  tl.fromTo(q('[data-hero-media]'), { scale: 1.1 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0)
    .fromTo(q('[data-hero-media-wrap]'), { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0)
    .fromTo(q('[data-hero-label]'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.35)
    .fromTo(q('[data-hero-line]'), { yPercent: 115, skewY: 6 }, { yPercent: 0, skewY: 0, duration: 1.3, stagger: 0.14 }, 0.5)
    .fromTo(q('[data-hero-fade]'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12 }, 1.2)
    .fromTo(q('[data-hero-badge]'), { scale: 0, rotate: -90, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 1.4, ease: 'back.out(1.6)' }, 1.5)
    .fromTo(q('[data-hero-ticker]'), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1 }, 1.7)
    .fromTo(q('[data-hero-glow]'), { opacity: 0 }, { opacity: 1, duration: 2 }, 0.8)

  return tl
}

/**
 * Subtle desktop pointer parallax + a gentle scroll drift on the media.
 * Call inside a (min-width:1024px) + fine pointer + no-reduced-motion branch.
 */
export function heroParallax(root) {
  const media = root.querySelector('[data-hero-media-wrap]')
  const copy = root.querySelector('[data-hero-copy]')
  if (!media) return () => {}

  const mx = gsap.quickTo(media, 'x', { duration: 1.4, ease: 'power3.out' })
  const my = gsap.quickTo(media, 'y', { duration: 1.4, ease: 'power3.out' })
  const cx = copy ? gsap.quickTo(copy, 'x', { duration: 1.6, ease: 'power3.out' }) : null
  const cy = copy ? gsap.quickTo(copy, 'y', { duration: 1.6, ease: 'power3.out' }) : null

  const onMove = (e) => {
    const nx = e.clientX / window.innerWidth - 0.5
    const ny = e.clientY / window.innerHeight - 0.5
    mx(nx * -22)
    my(ny * -16)
    if (cx) {
      cx(nx * 10)
      cy(ny * 8)
    }
  }
  window.addEventListener('mousemove', onMove)

  // cursor-following spotlight
  const glow = root.querySelector('[data-hero-glow]')
  const gx = glow ? gsap.quickTo(glow, 'x', { duration: 0.9, ease: 'power3.out' }) : null
  const gy = glow ? gsap.quickTo(glow, 'y', { duration: 0.9, ease: 'power3.out' }) : null
  const onGlow = (e) => {
    if (!gx) return
    const r = root.getBoundingClientRect()
    gx(e.clientX - r.left)
    gy(e.clientY - r.top)
  }
  window.addEventListener('mousemove', onGlow)

  // scroll drift
  gsap.to(root.querySelector('[data-hero-parallax]'), {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
  })
  gsap.to(root.querySelector('[data-hero-content]'), {
    opacity: 0.15,
    y: -60,
    ease: 'none',
    scrollTrigger: { trigger: root, start: '30% top', end: 'bottom top', scrub: true },
  })

  return () => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mousemove', onGlow)
  }
}

/** Endless services ticker + slowly rotating badge. */
export function heroLoops(root) {
  const track = root.querySelector('[data-hero-track]')
  const badge = root.querySelector('[data-hero-badge-spin]')
  if (track) gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 })
  if (badge) gsap.to(badge, { rotate: 360, duration: 22, ease: 'none', repeat: -1 })
}
