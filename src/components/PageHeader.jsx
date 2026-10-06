import { useRef } from 'react'
import useGsap from '../hooks/useGsap'
import { gsap } from '../animations/gsapSetup'
import { whenReady, introDelay } from '../animations/ready'
import { Lines } from './Reveal'

// Large intro block shared by the inner pages.
export default function PageHeader({ label, lines, intro }) {
  const root = useRef(null)

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    const tl = gsap.timeline({ paused: true, delay: introDelay() })
    tl.fromTo('[data-ph-fade]', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12 }, 0)
      .fromTo('[data-line]', { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.12, ease: 'expo.out' }, 0.1)
    return whenReady(() => tl.play())
  }, [])

  return (
    <header ref={root} className="container-x pb-[clamp(3rem,8vw,7rem)] pt-[clamp(8rem,16vw,14rem)]">
      <p data-ph-fade className="label mb-8 md:mb-12">
        {label}
      </p>
      <h1 className="display text-[clamp(2.6rem,8.2vw,10rem)]">
        <Lines lines={lines} />
      </h1>
      {intro ? (
        <p data-ph-fade className="body-lg mt-10 max-w-xl md:mt-14">
          {intro}
        </p>
      ) : null}
    </header>
  )
}
