import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import useGsap from '../hooks/useGsap'
import { maskReveal, fadeUp } from '../animations/textAnimations'
import { Lines } from './Reveal'
import ProjectItem from './ProjectItem'
import TransitionLink from './TransitionLink'
import projects from '../data/projects'

export default function FeaturedWork({ limit = 3, showHeader = true, showLink = true }) {
  const root = useRef(null)
  const list = projects.slice(0, limit)

  useGsap(root, (c) => {
    if (c.reduceMotion || !showHeader) return undefined
    const head = root.current.querySelector('[data-work-head]')
    maskReveal(head.querySelectorAll('[data-line]'), { trigger: head, start: 'top 80%' })
    fadeUp(head.querySelectorAll('[data-fade]'), { trigger: head, start: 'top 80%' })
    return undefined
  }, [])

  return (
    <section
      ref={root}
      id="work"
      aria-labelledby={showHeader ? 'work-title' : undefined}
      className="py-[clamp(5rem,12vw,12rem)]"
    >
      {showHeader ? (
        <div data-work-head className="container-x mb-[clamp(3rem,8vw,8rem)]">
          <div className="mb-8 flex items-end justify-between">
            <p data-fade className="label">
              (04) — Portfolio
            </p>
          </div>
          <h2 id="work-title" className="display display-xl">
            <Lines lines={['Recent', 'Projects']} />
          </h2>
        </div>
      ) : null}

      <div className="flex flex-col gap-[clamp(4rem,8vw,8rem)]">
        {list.map((p, i) => (
          <ProjectItem key={p.slug} project={p} index={i} />
        ))}
      </div>

      {showLink ? (
        <div className="container-x mt-[clamp(4rem,9vw,9rem)] flex justify-end">
          <TransitionLink
            to="/portfolio"
            data-cursor="explore"
            className="group flex items-center gap-4 border-b border-bone/40 pb-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] transition-colors hover:border-bone"
          >
            View portfolio
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-1.5"
            />
          </TransitionLink>
        </div>
      ) : null}
    </section>
  )
}
