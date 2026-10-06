import { useRef } from 'react'
import useGsap from '../hooks/useGsap'
import { countUp, fadeUp } from '../animations/textAnimations'
import { lineGrow } from '../animations/scrollAnimations'

// Numbers + labels copied from the live site.
const STATS = [
  { value: 50, suffix: '+', label: 'Businesses Helped' },
  { value: 100, suffix: '+', label: 'Audience Reach' },
  { value: 50, suffix: '+', label: 'Reviews Optimized' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
]

export default function Stats() {
  const root = useRef(null)

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    const items = root.current.querySelectorAll('[data-stat]')

    lineGrow(root.current.querySelectorAll('[data-stat-line]'), { trigger: root.current, start: 'top 80%' })
    fadeUp(root.current.querySelectorAll('[data-stat-fade]'), { trigger: root.current, start: 'top 80%', y: 24 })

    // Each counter fires once, when the section enters the viewport.
    items.forEach((item, i) => {
      const num = item.querySelector('[data-stat-num]')
      const { value, suffix } = STATS[i]
      countUp(num, value, {
        suffix,
        trigger: root.current,
        start: 'top 75%',
        duration: 2 + i * 0.25,
      })
    })
    return undefined
  }, [])

  return (
    <section ref={root} aria-labelledby="stats-title" className="pb-[clamp(6rem,12vw,12rem)]">
      <div className="container-x">
        <div className="mb-12 flex items-end justify-between md:mb-20">
          <h2 id="stats-title" data-stat-fade className="label">
            (02) — By the numbers
          </h2>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} data-stat className="relative flex flex-col pt-6">
              <span
                data-stat-line
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full bg-line"
              />
              <dt className="label order-2 mt-4">{s.label}</dt>
              <dd className="order-1 m-0">
                <span className="sr-only">
                  {s.value}
                  {s.suffix}
                </span>
                <span
                  aria-hidden="true"
                  data-stat-num
                  className="display block text-[clamp(2.8rem,7vw,9rem)] tabular-nums"
                >
                  {s.value}
                  {s.suffix}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
