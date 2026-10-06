import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import useGsap from '../hooks/useGsap'
import { maskReveal, fadeUp } from '../animations/textAnimations'
import { clipReveal, imageParallax } from '../animations/imageAnimations'
import { Words } from './Reveal'
import TransitionLink from './TransitionLink'
import Img from './Img'
import site from '../data/site'
import aboutFallback from '../assets/images/about.webp'

// Copy comes from the live site: tagline, hero line, "why choose" line and footer line.
export default function About({
  compact = false,
  heading = 'Marketing that earns trust.',
  paragraphs = [
    site.whyText,
    `Based in ${site.location}, ${site.name} is a digital marketing agency helping brands build reputation, reach and results.`,
  ],
}) {
  const root = useRef(null)

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    const q = (s) => root.current.querySelectorAll(s)

    fadeUp(q('[data-about-label]'), { trigger: root.current, start: 'top 80%' })
    maskReveal(q('[data-word]'), { trigger: q('[data-about-heading]')[0], stagger: 0.05, duration: 1.2 })
    fadeUp(q('[data-about-text]'), { trigger: q('[data-about-text]')[0], start: 'top 88%', stagger: 0.14 })

    const wrap = q('[data-about-img-wrap]')[0]
    const img = q('[data-about-img]')[0]
    clipReveal(wrap, img, { trigger: wrap, start: 'top 80%' })
    if (c.desktop) imageParallax(img, { trigger: wrap })
    return undefined
  }, [])

  return (
    <section
      ref={root}
      aria-labelledby="about-title"
      className="relative py-[clamp(6rem,14vw,14rem)]"
    >
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-14">
        <p data-about-label className="label col-span-12">
          (01) — About {site.name}
        </p>

        <h2
          id="about-title"
          data-about-heading
          className="display col-span-12 text-[clamp(2.6rem,7vw,8.5rem)] lg:col-span-10 lg:row-start-2"
        >
          <Words text={heading} />
        </h2>
        

        <div className="col-span-12 flex flex-col gap-8 md:col-span-6 lg:col-span-4 lg:row-start-3 lg:self-end">
          <div data-about-text>
            <p className="label mb-6">Who We Are</p>
            {paragraphs.map((p) => (
              <p key={p} data-about-text className="body-lg">
                {p}
              </p>
            ))}
          </div>

          <div data-about-text className="pt-6 border-t border-bone/20">
            <p className="label mb-6">What We Do</p>
            <ul className="space-y-4">
              <li className="body-sm text-bone/70 flex items-start gap-3">
                <span className="text-bone mt-1">✦</span>
                <span>Build authentic online reputation</span>
              </li>
              <li className="body-sm text-bone/70 flex items-start gap-3">
                <span className="text-bone mt-1">✦</span>
                <span>Drive targeted digital growth</span>
              </li>
              <li className="body-sm text-bone/70 flex items-start gap-3">
                <span className="text-bone mt-1">✦</span>
                <span>Create lasting brand impact</span>
              </li>
            </ul>
          </div>

          {!compact ? (
            <div data-about-text>
              <TransitionLink
                to="/about"
                data-cursor="link"
                className="link-underline inline-flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.18em]"
              >
                About us <ArrowRight size={18} aria-hidden="true" />
              </TransitionLink>
            </div>
          ) : null}
        </div>

        <figure className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8 lg:row-start-3">
          <div
            data-about-img-wrap
            className="relative aspect-[4/5] w-full overflow-hidden bg-[#101010]"
          >
            <Img
              data-about-img
              src="public/T logo.png"
             // fallback={aboutFallback}
              alt="TrustLift Media Logo"
              width="600"
              height="600"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain p-8"
            />
          </div>
        </figure>
      </div>
    </section>
  )
}
