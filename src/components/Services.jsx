import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import useGsap from '../hooks/useGsap'
import { gsap } from '../animations/gsapSetup'
import { maskReveal, fadeUp } from '../animations/textAnimations'
import { horizontalScroll } from '../animations/scrollAnimations'
import { Lines } from './Reveal'
import Img from './Img'
import services from '../data/services'

const pad = (n) => String(n).padStart(2, '0')

/**
 * Desktop: the section pins and the services travel horizontally as you scroll.
 * Tablet / mobile / reduced motion: a plain vertical sequence (no pin, no horizontal scroll).
 * The `is-pinned` class (added only when the pin is active) switches the CSS layout.
 */
export default function Services() {
  const root = useRef(null)
  const section = useRef(null)

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    const el = section.current
    const track = el.querySelector('[data-track]')
    const intro = el.querySelector('[data-svc-intro]')
    const panels = gsap.utils.toArray('[data-panel]', el)

    // Intro copy reveals vertically (before the pin begins).
    maskReveal(intro.querySelectorAll('[data-line]'), { trigger: intro, start: 'top 75%' })
    fadeUp(intro.querySelectorAll('[data-fade]'), { trigger: intro, start: 'top 75%', delay: 0.3 })

    // One reveal per panel: title mask, text fade, image clip + settle.
    const revealPanel = (panel, scrollTrigger) => {
      const tl = gsap.timeline({ scrollTrigger })
      tl.fromTo(
        panel.querySelectorAll('[data-line]'),
        { yPercent: 115 },
        { yPercent: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' },
        0,
      )
        .fromTo(
          panel.querySelectorAll('[data-fade]'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
          0.15,
        )
        .fromTo(
          panel.querySelector('[data-frame]'),
          { clipPath: c.desktop ? 'inset(0% 0% 0% 100%)' : 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' },
          0,
        )
        .fromTo(
          panel.querySelector('[data-svc-img]'),
          { scale: 1.2 },
          { scale: 1, duration: 2, ease: 'expo.out' },
          0,
        )
    }

    if (!c.desktop) {
      panels.forEach((panel) => revealPanel(panel, { trigger: panel, start: 'top 80%', once: true }))
      return undefined
    }

    // ── Desktop: pinned horizontal travel ──
    el.classList.add('is-pinned')
    const bar = el.querySelector('[data-svc-bar]')
    const counter = el.querySelector('[data-svc-counter]')
    let lastIndex = -1

    const { tween } = horizontalScroll({
      section: el,
      track,
      onUpdate: (p) => {
        gsap.set(bar, { scaleX: p })
        const idx = Math.max(0, Math.round(p * panels.length) - 1)
        if (idx !== lastIndex) {
          lastIndex = idx
          counter.textContent = `${pad(idx + 1)} / ${pad(panels.length)}`
        }
      },
    })

    panels.forEach((panel) => {
      revealPanel(panel, {
        trigger: panel,
        containerAnimation: tween,
        start: 'left 82%',
        once: true,
      })
      gsap.fromTo(
        panel.querySelector('[data-svc-img]'),
        { xPercent: -7 },
        {
          xPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        },
      )
    })

    return () => el.classList.remove('is-pinned')
  }, [])

  return (
    <div ref={root}>
      <section
        ref={section}
        id="services"
        aria-labelledby="services-title"
        className="services relative"
      >
        <div data-track className="svc-track">
          {/* Intro */}
          <div data-svc-intro className="svc-intro container-x">
            <p data-fade className="label mb-8">
              (03) — Services
            </p>
            <h2 id="services-title" className="display text-[clamp(3rem,10vw,11rem)]">
              <Lines lines={['Our', 'Services']} />
            </h2>
            <p data-fade className="body-lg mt-10 max-w-md">
              Six ways we help your brand grow online — from reputation to results.
            </p>
            <p data-fade className="label mt-10 hidden items-center gap-3 lg:flex">
              Keep scrolling <ArrowRight size={16} aria-hidden="true" />
            </p>
          </div>

          {/* Services */}
          {services.map((s) => (
            <article key={s.id} data-panel className="svc-panel container-x">
              <div className="flex flex-col gap-8 lg:gap-10">
                <div data-fade className="flex items-center justify-between gap-6">
                  <span className="label">
                    {s.id} / {pad(services.length)}
                  </span>
                </div>

                <div className="flex items-start gap-6">
                  <span
                    aria-hidden="true"
                    className="display hidden select-none text-[clamp(3rem,5.6vw,7rem)] text-[#303030] lg:block"
                  >
                    {s.id}
                  </span>
                  <h3 className="display text-[clamp(2.2rem,4.2vw,6rem)] lg:pt-[0.12em]">
                    <Lines lines={[s.title]} />
                  </h3>
                </div>

                <p data-fade className="body-lg max-w-md">
                  {s.description}
                </p>

              </div>

              <div className="svc-media">
                <div data-frame className="svc-frame">
                  <Img
                    data-svc-img
                    className="svc-img"
                    src={s.photo}
                    fallback={s.image}
                    alt={s.alt}
                    width="1200"
                    height="1500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Progress (desktop pin only) */}
        <div
          className="svc-progress container-x absolute inset-x-0 bottom-8 items-center gap-6"
          aria-hidden="true"
        >
          <span data-svc-counter className="label w-16 tabular-nums">
            01 / {pad(services.length)}
          </span>
          <div className="h-px flex-1 bg-line">
            <div
              data-svc-bar
              className="h-full w-full origin-left bg-bone"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <span className="label">Scroll</span>
        </div>
      </section>
    </div>
  )
}
