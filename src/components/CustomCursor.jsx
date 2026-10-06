import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { createCursor } from '../animations/cursorAnimations'

const QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

/**
 * Desktop-only custom cursor. Not rendered at all on touch devices,
 * tablets, small screens, or when the user prefers reduced motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(() => window.matchMedia(QUERY).matches)
  const wrapper = useRef(null)
  const circle = useRef(null)
  const labelEl = useRef(null)
  const textEl = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setEnabled(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    document.documentElement.classList.add('has-cursor')
    const destroy = createCursor({
      wrapper: wrapper.current,
      circle: circle.current,
      labelEl: labelEl.current,
      textEl: textEl.current,
    })
    return () => {
      destroy()
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={wrapper}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[150]"
      style={{ mixBlendMode: 'difference', willChange: 'transform' }}
    >
      <div ref={circle} className="h-28 w-28 rounded-full bg-bone" />
      <div
        ref={labelEl}
        className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-ink"
      >
        <span
          ref={textEl}
          className="text-[0.68rem] font-medium uppercase tracking-[0.16em]"
        />
        <ArrowUpRight size={18} strokeWidth={1.75} />
      </div>
    </div>
  )
}
