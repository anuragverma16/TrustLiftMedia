import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import useGsap from '../hooks/useGsap'
import { heroIntro, heroParallax, heroLoops } from '../animations/heroAnimations'
import { whenReady, introDelay } from '../animations/ready'
import { Lines } from './Reveal'
import MagneticButton from './MagneticButton'
import TransitionLink from './TransitionLink'
import Img from './Img'
import site from '../data/site'
import services from '../data/services'
import heroVideo from '../assets/videos/hero-loop.mp4'
import heroWebm from '../assets/videos/hero-loop.webm'
import heroPoster from '../assets/images/hero-poster.webp'
import heroFallback from '../assets/images/hero.webp'

export default function Hero() {
  const root = useRef(null)

  useGsap(root, (c) => {
    const vid = root.current.querySelector('video')
    if (c.reduceMotion) {
      if (vid) vid.pause()
      return undefined
    }
    if (vid) vid.play().catch(() => {})
    heroLoops(root.current)
    const tl = heroIntro(root.current)
    tl.delay(introDelay())
    const stopReady = whenReady(() => tl.play())

    let stopParallax = () => {}
    if (c.desktop && c.finePointer) stopParallax = heroParallax(root.current)

    return () => {
      stopReady()
      stopParallax()
    }
  }, [])

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Media — drifts on scroll (parallax wrapper) and follows the pointer (media wrap) */}
      <div data-hero-parallax className="absolute inset-x-0 -top-[10%] h-[120%] bg-[#0c0c0c]">
        <div data-hero-media-wrap className="absolute -inset-8">
          <video
            data-hero-media
            className="absolute inset-0 h-full w-full object-cover"
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={heroWebm} type="video/webm" />
            <source src={heroVideo} type="video/mp4" />
          </video>
          <Img
            src={site.images.hero}
            fallback={heroFallback}
            alt=""
            aria-hidden="true"
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" aria-hidden="true" />
      <div
        data-hero-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-[1] hidden h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-screen lg:block"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 62%)' }}
      />

      {/* Copy */}
      <div
        data-hero-content
        className="container-x relative z-10 flex h-full flex-col justify-between pb-8 pt-28 md:pb-20 md:pt-32"
      >
        <div data-hero-copy className="flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <p data-hero-label className="label !text-bone/80">
              {site.type}
            </p>
            <p data-hero-label className="label hidden !text-bone/80 sm:block">
              {site.location}
            </p>
          </div>

          <div>
            <h1 className="display text-[clamp(2.6rem,7.4vw,9.5rem)]">
              <Lines
                attr="data-hero-line"
                lines={['Elevate Your', 'Digital Presence', 'With TrustLift Media']}
              />
            </h1>

            <div className="mt-8 grid grid-cols-1 items-end gap-8 md:mt-12 md:grid-cols-12">
              <p data-hero-fade className="body-lg !text-bone/75 md:col-span-7 lg:col-span-5">
                {site.heroText}
              </p>

              <div
                data-hero-fade
                className="flex flex-wrap items-center gap-x-10 gap-y-5 md:col-span-5 md:col-start-8 md:justify-end lg:col-start-8"
              >
                <MagneticButton strength={0.3} area={20}>
                  <TransitionLink
                    to="/contact"
                    data-cursor="explore"
                    className="group flex items-center gap-4 border-b border-bone pb-3 text-[0.8rem] font-medium uppercase tracking-[0.18em]"
                  >
                    Book Free Consultation
                    <ArrowUpRight
                      size={20}
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </TransitionLink>
                </MagneticButton>

                <TransitionLink
                  to="/services"
                  className="link-underline text-[0.8rem] font-medium uppercase tracking-[0.18em] text-bone/80"
                >
                  Explore Services
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rotating badge */}
      <TransitionLink
        to="/contact"
        data-hero-badge
        data-cursor="explore"
        aria-label="Book a free consultation"
        className="absolute right-[6vw] top-[30%] z-10 hidden h-36 w-36 items-center justify-center rounded-full border border-bone/30 backdrop-blur-sm lg:flex"
      >
        <svg data-hero-badge-spin viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <path id="hero-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text fill="currentColor" fontSize="9" className="uppercase">
            <textPath href="#hero-circle" textLength="232" lengthAdjust="spacing">Book Free Consultation •</textPath>
          </text>
        </svg>
        <ArrowUpRight size={26} aria-hidden="true" />
      </TransitionLink>

      {/* Services ticker */}
      <div
        data-hero-ticker
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 hidden overflow-hidden border-t border-bone/15 bg-ink/40 py-3 backdrop-blur-sm md:block"
      >
        <div data-hero-track className="flex w-max whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex">
              {services.map((s) => (
                <span key={`${k}-${s.id}`} className="label !text-bone/60 px-8">
                  {s.title} <span className="px-6 text-bone/30">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
