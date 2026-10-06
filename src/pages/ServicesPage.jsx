import { useRef } from 'react'
import PageHeader from '../components/PageHeader'
import CTA from '../components/CTA'
import Img from '../components/Img'
import useGsap from '../hooks/useGsap'
import { fadeUp } from '../animations/textAnimations'
import { lineGrow } from '../animations/scrollAnimations'
import { clipReveal } from '../animations/imageAnimations'
import services from '../data/services'

function ServiceRow({ s }) {
  const root = useRef(null)

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    const el = root.current
    lineGrow(el.querySelector('[data-row-line]'), { trigger: el, start: 'top 88%' })
    fadeUp(el.querySelectorAll('[data-row-fade]'), { trigger: el, start: 'top 85%', y: 28 })
    const wrap = el.querySelector('[data-row-wrap]')
    clipReveal(wrap, el.querySelector('[data-row-img]'), { trigger: wrap, start: 'top 88%', direction: 'left' })
    return undefined
  }, [])

  return (
    <article ref={root} className="relative grid grid-cols-12 gap-x-6 gap-y-8 py-12 md:py-20">
      <span data-row-line aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-line" />

      <div data-row-fade className="col-span-12 flex items-baseline gap-6 lg:col-span-7">
        <span className="label w-8 shrink-0">{s.id}</span>
        <h2 className="display text-[clamp(2.2rem,5.2vw,6.4rem)]">{s.title}</h2>
      </div>

      <div className="col-span-12 flex flex-col gap-8 md:col-span-7 lg:col-span-3 lg:col-start-8">
        <p data-row-fade className="body-lg">
          {s.description}
        </p>
      </div>

      <div className="col-span-12 md:col-span-5 lg:col-span-2">
        <div data-row-wrap className="relative aspect-[4/5] w-full overflow-hidden bg-[#101010]">
          <Img
            data-row-img
            src={s.photo}
            fallback={s.image}
            alt={s.alt}
            width="1200"
            height="1500"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </article>
  )
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        lines={['Built for', 'growth.']}
        intro="From reviews and rankings to websites and brand identity — everything your business needs to be found, trusted and chosen online."
      />
      <section aria-label="Services" className="container-x pb-[clamp(4rem,10vw,10rem)]">
        {services.map((s) => (
          <ServiceRow key={s.id} s={s} />
        ))}
      </section>
      <CTA
        label="Not sure where to start?"
        lines={['Need help', 'choosing?']}
        text="Tell us about your business and we will recommend where to begin."
        button="Book Free Consultation"
      />
    </>
  )
}
