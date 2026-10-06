import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/gsapSetup'
import { setReady } from '../animations/ready'

import site from '../data/site'

const BRAND = site.short.split('')

const pageLoaded = () =>
  new Promise((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', resolve, { once: true })
  })

/**
 * Cinematic preloader — runs once per page load:
 * brand letters rise → counter + progress line → brand scales/fades →
 * the curtain lifts and the hero is released (setReady).
 * Hard-capped so it can never trap the visitor.
 */
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const brand = useRef(null)
  const counter = useRef(null)
  const bar = useRef(null)

  useLayoutEffect(() => {
    const html = document.documentElement
    html.style.overflow = 'hidden'
    let cancelled = false

    const finish = () => {
      html.style.overflow = ''
      setReady()
      onDone()
    }

    if (prefersReducedMotion()) {
      const t = gsap.to(root.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.2,
        onComplete: finish,
      })
      return () => {
        t.kill()
        html.style.overflow = ''
      }
    }

    const ctx = gsap.context(() => {
      const letters = brand.current.querySelectorAll('[data-letter]')
      const meta = root.current.querySelectorAll('[data-pre-meta]')
      const progress = { value: 0 }

      const intro = gsap
        .timeline()
        .fromTo(letters, { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' })
        .fromTo(meta, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.5')

      gsap.set(bar.current, { scaleX: 0, transformOrigin: 'left center' })
      const count = gsap.to(progress, {
        value: 100,
        duration: 1.5,
        delay: 0.3,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(progress.value)
          counter.current.textContent = String(v).padStart(3, '0')
          gsap.set(bar.current, { scaleX: v / 100 })
        },
      })

      const assets = Promise.race([
        pageLoaded(),
        new Promise((r) => setTimeout(r, 3500)), // never wait longer than this
      ])

      Promise.all([intro, count, assets]).then(() => {
        if (cancelled) return
        const exit = gsap.timeline({ onComplete: finish })
        exit
          .to([counter.current, ...meta], { opacity: 0, duration: 0.3 })
          .to(brand.current, { scale: 1.18, opacity: 0, duration: 0.7, ease: 'power3.in' }, '<')
          .to(root.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.15')
          .add(setReady, '<0.4') // hero starts while the curtain is still lifting
      })
    }, root)

    return () => {
      cancelled = true
      ctx.revert()
      html.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-[var(--gutter)] py-8"
    >
      <div className="flex justify-between">
        <span data-pre-meta className="label opacity-0">
          {site.type}
        </span>
        <span data-pre-meta className="label opacity-0">
          Loading
        </span>
      </div>

      <div ref={brand} className="flex justify-center" aria-hidden="true">
        {BRAND.map((l, i) => (
          <span key={i} className="mask">
            <span data-letter className="display block text-[clamp(2.6rem,11vw,11rem)]">
              {l}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="h-px flex-1 bg-line">
          <div ref={bar} className="h-full w-full bg-bone" style={{ transform: 'scaleX(0)' }} />
        </div>
        <span
          ref={counter}
          data-pre-meta
          className="display text-[clamp(2.5rem,7vw,6rem)] tabular-nums leading-none opacity-0"
        >
          000
        </span>
      </div>
    </div>
  )
}
