import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import useGsap from '../hooks/useGsap'
import { gsap } from '../animations/gsapSetup'
import { maskReveal, fadeUp } from '../animations/textAnimations'
import { parallaxY } from '../animations/scrollAnimations'
import { Lines } from './Reveal'
import MagneticButton from './MagneticButton'
import TransitionLink from './TransitionLink'
import site from '../data/site'
import ctaFallback from '../assets/images/cta.webp'
import ctaVideo from '../assets/videos/Lets build together.mp4'

export default function CTA({
  label = 'Get Started',
  lines = ['Ready to', 'grow your', 'brand?'],
  text = site.footerText,
  button = 'Book Free Consultation',
}) {
  const root = useRef(null)

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    const el = root.current
    const bg = el.querySelector('[data-cta-bg]')
    const heading = el.querySelector('[data-cta-heading]')

    maskReveal(heading.querySelectorAll('[data-line]'), {
      trigger: heading,
      start: 'top 80%',
      stagger: 0.12,
      duration: 1.3,
    })
    fadeUp(el.querySelectorAll('[data-cta-fade]'), { trigger: heading, start: 'top 65%', delay: 0.5 })

    // Background movement: scrubbed drift + slow breathing scale.
    parallaxY(bg, { from: -60, to: 60, trigger: el })
    gsap.fromTo(
      bg.querySelector('video'),
      { scale: 1.05 },
      { scale: 1.2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    )

    // Subtle desktop pointer interaction on the background.
    if (c.desktop && c.finePointer) {
      const xTo = gsap.quickTo(bg, 'x', { duration: 1.6, ease: 'power3.out' })
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        xTo(((e.clientX - r.left) / r.width - 0.5) * -40)
      }
      el.addEventListener('mousemove', onMove)
      return () => el.removeEventListener('mousemove', onMove)
    }
    return undefined
  }, [])

  return (
    <section
      ref={root}
      aria-labelledby="cta-title"
      className="relative overflow-hidden py-[clamp(6rem,14vw,14rem)]"
    >
      <div data-cta-bg aria-hidden="true" className="absolute -inset-x-12 -inset-y-[12%]">
        <video
          className="h-full w-full object-cover opacity-40"
          poster={ctaFallback}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={ctaVideo} type="video/mp4" />
        </video>
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />

      <div className="container-x relative z-10">
        <p data-cta-fade className="label mb-10 md:mb-14">
          {label}
        </p>

        <h2
          id="cta-title"
          data-cta-heading
          className="display text-[clamp(3rem,11.5vw,13rem)]"
        >
          <Lines lines={lines} />
        </h2>

        <div data-cta-fade className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between">
          <p className="body-lg max-w-sm !text-bone/70">{text}</p>

          <MagneticButton strength={0.4} area={40}>
            <TransitionLink
              to="/contact"
              data-cursor="explore"
              className="group relative grid h-44 w-44 place-items-center overflow-hidden rounded-full border border-bone/50 text-center md:h-52 md:w-52"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />
              <span className="relative z-10 flex flex-col items-center gap-3 px-6 text-[0.76rem] font-medium uppercase leading-snug tracking-[0.18em] transition-colors duration-500 group-hover:text-ink group-focus-visible:text-ink">
                {button}
                <ArrowRight size={22} aria-hidden="true" />
              </span>
            </TransitionLink>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
