import { useRef } from 'react'
import useGsap from '../hooks/useGsap'
import { gsap } from '../animations/gsapSetup'
import { maskReveal, fadeUp } from '../animations/textAnimations'
import { Lines } from './Reveal'
import whyChoose from '../data/whyChoose'
import site from '../data/site'

/**
 * Seamless GSAP marquee: the list is rendered twice and the track moves exactly
 * -50%, so the loop point is invisible. Pauses (eases to a stop) on hover.
 */
function MarqueeRow({ items, reverse = false, duration = 45, label }) {
  const row = useRef(null)
  const track = useRef(null)

  useGsap(row, (c) => {
    if (c.reduceMotion) return undefined
    const tween = gsap.fromTo(
      track.current,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, ease: 'none', duration, repeat: -1 },
    )
    const el = row.current
    const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.8, overwrite: true })
    const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.8, overwrite: true })
    el.addEventListener('mouseenter', slow)
    el.addEventListener('mouseleave', resume)
    return () => {
      el.removeEventListener('mouseenter', slow)
      el.removeEventListener('mouseleave', resume)
    }
  }, [])

  return (
    <div ref={row} className="overflow-hidden border-t border-line py-5 md:py-7">
      <div ref={track} className="flex w-max" style={{ willChange: 'transform' }}>
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? 'true' : undefined}
            className="flex shrink-0 items-center"
            aria-label={copy === 0 ? label : undefined}
          >
            {items.map((name) => (
              <li key={`${copy}-${name}`} className="flex items-center">
                <span className="display select-none whitespace-nowrap px-6 text-[clamp(2rem,5vw,6rem)] text-bone/30 transition-colors duration-500 hover:text-bone md:px-10">
                  {name}
                </span>
                <span aria-hidden="true" className="text-[clamp(1.5rem,3vw,3rem)] text-line">
                  /
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

// "Why choose TrustLift Media" — statement + the five key points, as a marquee.
export default function WhyChoose() {
  const root = useRef(null)

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    const head = root.current.querySelector('[data-why-head]')
    maskReveal(head.querySelectorAll('[data-line]'), { trigger: head, start: 'top 82%' })
    fadeUp(head.querySelectorAll('[data-fade]'), { trigger: head, start: 'top 82%' })
    return undefined
  }, [])

  const rowA = [whyChoose[0], whyChoose[1], whyChoose[2]]
  const rowB = [whyChoose[3], whyChoose[4]]

  return (
    <section
      ref={root}
      aria-labelledby="why-title"
      className="overflow-hidden py-[clamp(5rem,12vw,12rem)]"
    >
      <div data-why-head className="container-x mb-14 grid grid-cols-12 gap-x-6 gap-y-8 md:mb-20">
        <p data-fade className="label col-span-12">
          (05) — Why choose {site.name}
        </p>
        <h2
          id="why-title"
          className="display col-span-12 text-[clamp(2.2rem,5.4vw,6.4rem)] lg:col-span-10"
        >
          <Lines lines={['Creativity, strategy,', 'and technology.']} />
        </h2>
        <p data-fade className="body-lg col-span-12 max-w-xl">
          {site.whyText}
        </p>
      </div>

      <MarqueeRow items={rowA} duration={55} label={`Why choose ${site.name}`} />
      <MarqueeRow items={rowB} reverse duration={50} />
      <div className="border-t border-line" />
    </section>
  )
}
