import { useRef } from 'react'
import useGsap from '../hooks/useGsap'
import { gsap } from '../animations/gsapSetup'

/**
 * Wraps any interactive child (link / button) and pulls it gently toward the pointer.
 * `area` extends the attraction zone beyond the element (px). Desktop + fine pointer only.
 */
export default function MagneticButton({ children, strength = 0.35, area = 24, className = '' }) {
  const ref = useRef(null)

  useGsap(ref, (c) => {
    if (!c.desktop || !c.finePointer || c.reduceMotion) return undefined
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.45)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.45)' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ padding: area, margin: -area }}
    >
      {children}
    </div>
  )
}
