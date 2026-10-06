import { useRef } from 'react'
import PageHeader from '../components/PageHeader'
import About from '../components/About'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import useGsap from '../hooks/useGsap'
import { fadeUp, maskReveal } from '../animations/textAnimations'
import { lineGrow } from '../animations/scrollAnimations'
import whyChoose from '../data/whyChoose'
import site from '../data/site'

// "Why choose TrustLift Media" — statement + five points, all from the live site.
function WhyList() {
  const root = useRef(null)

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    const el = root.current
    const head = el.querySelector('[data-p-head]')
    maskReveal(head.querySelectorAll('[data-line]'), { trigger: head, start: 'top 82%' })
    fadeUp(head.querySelectorAll('[data-p-fade]'), { trigger: head, start: 'top 82%' })
    el.querySelectorAll('[data-p-row]').forEach((row) => {
      lineGrow(row.querySelector('[data-p-line]'), { trigger: row, start: 'top 88%' })
      fadeUp(row.querySelectorAll('[data-p-fade]'), { trigger: row, start: 'top 88%', y: 28 })
    })
    return undefined
  }, [])

  return (
    <section ref={root} aria-labelledby="why-list-title" className="py-[clamp(4rem,10vw,10rem)]">
      <div className="container-x">
        <div data-p-head className="mb-12 md:mb-20">
          <p data-p-fade className="label mb-8">
            Why choose {site.name}
          </p>
          <h2 id="why-list-title" className="display text-[clamp(2.4rem,6vw,7rem)]">
            <span className="mask">
              <span data-line>Why choose us</span>
            </span>
          </h2>
          <p data-p-fade className="body-lg mt-8 max-w-xl">
            {site.whyText}
          </p>
        </div>

        <ol>
          {whyChoose.map((point, i) => (
            <li key={point} data-p-row className="relative grid grid-cols-12 gap-x-6 gap-y-4 py-8 md:py-12">
              <span data-p-line aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-line" />
              <span data-p-fade className="label col-span-12 md:col-span-2">
                0{i + 1}
              </span>
              <h3
                data-p-fade
                className="display col-span-12 text-[clamp(1.6rem,3.6vw,4.2rem)] md:col-span-10"
              >
                {point}
              </h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        lines={['The team', 'behind your', 'growth.']}
        intro={`${site.name} is a digital marketing agency based in ${site.location}.`}
      />
      <About
        compact
        heading="Creativity meets strategy."
        paragraphs={[site.heroText, site.footerText]}
      />
      <WhyList />
      <Stats />
      <Testimonials />
      <CTA
        label="Work with us"
        lines={['Work with', 'a team that', 'delivers.']}
        text="Dedicated support, real growth and results you can measure."
        button="Book Free Consultation"
      />
    </>
  )
}
