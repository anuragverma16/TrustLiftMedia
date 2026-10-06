import { useRef } from 'react'
import useGsap from '../hooks/useGsap'
import { fadeUp, maskReveal } from '../animations/textAnimations'
import { clipReveal, imageParallax } from '../animations/imageAnimations'
import Img from './Img'
import TransitionLink from './TransitionLink'

// Three editorial layouts that rotate down the page for visual rhythm.
const LAYOUTS = [
  'lg:col-span-12',
  'lg:col-span-10 lg:col-start-3',
  'lg:col-span-9',
]

/**
 * One large, editorial case-study block: dominant image, oversized title,
 * category + year. Hover: image scales, title shifts, overlay fades in, cursor → VIEW.
 */
export default function ProjectItem({ project, index }) {
  const root = useRef(null)

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    const q = (s) => root.current.querySelector(s)
    const wrap = q('[data-proj-wrap]')
    const img = q('[data-proj-img]')

    clipReveal(wrap, img, { trigger: wrap, start: 'top 82%' })
    if (c.desktop) imageParallax(img, { trigger: wrap })
    maskReveal(root.current.querySelectorAll('[data-line]'), { trigger: q('[data-proj-meta]'), start: 'top 92%' })
    fadeUp(root.current.querySelectorAll('[data-proj-fade]'), {
      trigger: q('[data-proj-meta]'),
      start: 'top 92%',
      y: 20,
    })
    return undefined
  }, [])

  return (
    <article ref={root} className="container-x grid grid-cols-12">
      <TransitionLink
        to="/portfolio"
        data-cursor="view"
        aria-label={`${project.title} — ${project.result}. View portfolio`}
        className={`group col-span-12 block ${LAYOUTS[index % LAYOUTS.length]}`}
      >
        <div
          data-proj-wrap
          className="relative aspect-[4/3] max-h-[88vh] w-full overflow-hidden bg-[#101010] md:aspect-[16/10]"
        >
          {/* CSS hover scale lives on this layer so it never fights GSAP's transform on the img */}
          <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] group-focus-visible:scale-[1.045]">
            <Img
              data-proj-img
              src={project.image}
              fallback={project.fallback}
              alt={project.alt}
              width="1920"
              height="1200"
              loading="lazy"
              decoding="async"
              className="absolute -top-[10%] left-0 h-[120%] w-full object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/30 group-focus-visible:bg-ink/30"
          />
        </div>

        <div data-proj-meta className="mt-6 grid grid-cols-12 items-end gap-x-6 gap-y-4 md:mt-8">
          <p data-proj-fade className="label col-span-12 md:col-span-2">
            Project {project.id}
          </p>

          <h3 className="display col-span-12 text-[clamp(2.2rem,5.4vw,6.5rem)] md:col-span-7 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:group-hover:translate-x-6">
            <span className="mask">
              <span data-line>{project.title}</span>
            </span>
          </h3>

          <div
            data-proj-fade
            className="col-span-12 md:col-span-3 md:text-right"
          >
            <p className="label !text-bone">{project.result}</p>
          </div>
        </div>
      </TransitionLink>
    </article>
  )
}
