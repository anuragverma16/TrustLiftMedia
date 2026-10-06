import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import useGsap from '../hooks/useGsap'
import { gsap, prefersReducedMotion } from '../animations/gsapSetup'
import { fadeUp } from '../animations/textAnimations'
import testimonials from '../data/testimonials'

const pad = (n) => String(n).padStart(2, '0')

export default function Testimonials() {
  const root = useRef(null)
  const body = useRef(null)
  const busy = useRef(false)
  const first = useRef(true)
  const [index, setIndex] = useState(0)
  const t = testimonials[index]

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    fadeUp(root.current.querySelectorAll('[data-t-fade]'), { trigger: root.current, start: 'top 78%', stagger: 0.12 })
    return undefined
  }, [])

  // Quote swap: fade/slide the new one in after the index changes.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return undefined
    }
    if (prefersReducedMotion()) {
      busy.current = false
      return undefined
    }
    const tween = gsap.fromTo(
      body.current,
      { autoAlpha: 0, y: 36 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', onComplete: () => (busy.current = false) },
    )
    return () => tween.kill()
  }, [index])

  const go = useCallback((dir) => {
    if (busy.current) return
    busy.current = true
    const next = (i) => (i + dir + testimonials.length) % testimonials.length
    if (prefersReducedMotion()) {
      setIndex(next)
      busy.current = false
      return
    }
    gsap.to(body.current, {
      autoAlpha: 0,
      y: -28,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => setIndex(next),
    })
  }, [])

  return (
    <section
      ref={root}
      aria-labelledby="testimonials-title"
      className="py-[clamp(5rem,12vw,12rem)]"
    >
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 flex items-end justify-between">
          <h2 id="testimonials-title" data-t-fade className="label">
            (06) — Client testimonials
          </h2>
          <p data-t-fade className="label tabular-nums" aria-hidden="true">
            {pad(index + 1)} — {pad(testimonials.length)}
          </p>
        </div>

        <span
          aria-hidden="true"
          data-t-fade
          className="display col-span-12 -mb-6 text-[clamp(5rem,12vw,13rem)] leading-[0.7] text-[#303030] lg:col-span-1 lg:mb-0"
        >
          “
        </span>

        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <div ref={body} aria-live="polite" aria-atomic="true">
            <blockquote>
              <p
                data-t-fade
                className="font-display text-[clamp(2rem,5vw,5.6rem)] font-medium leading-[1.08] tracking-[-0.035em]"
              >
                {t.quote}
              </p>
              <footer className="mt-10 md:mt-14">
                <cite className="label !text-bone not-italic">— {t.name}</cite>
              </footer>
            </blockquote>
          </div>

          <div data-t-fade className="mt-14 flex items-center gap-4 md:mt-20">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-14 w-14 place-items-center border border-line transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-ink"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-14 w-14 place-items-center border border-line transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-ink"
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
