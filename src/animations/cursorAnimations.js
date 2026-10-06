import { gsap } from './gsapSetup'

// scale of the 112px base circle for each cursor state
const STATES = {
  default: { scale: 0.125, label: '', blend: 'difference' },
  link: { scale: 0.5, label: '', blend: 'difference' },
  view: { scale: 1, label: 'VIEW', blend: 'normal' },
  explore: { scale: 1, label: 'EXPLORE', blend: 'normal' },
}

/**
 * Smoothly interpolated custom cursor.
 * Position uses gsap.quickTo (lerp-like), size uses transform: scale only.
 * Elements opt in with data-cursor="view" | "explore" | "link".
 * Returns a destroy() function.
 */
export function createCursor({ wrapper, circle, labelEl, textEl }) {
  const xTo = gsap.quickTo(wrapper, 'x', { duration: 0.45, ease: 'power3.out' })
  const yTo = gsap.quickTo(wrapper, 'y', { duration: 0.45, ease: 'power3.out' })

  gsap.set(wrapper, { xPercent: -50, yPercent: -50, opacity: 0 })
  gsap.set(circle, { scale: STATES.default.scale })
  gsap.set(labelEl, { opacity: 0, scale: 0.8 })

  let current = 'default'
  let visible = false

  const show = () => {
    if (visible) return
    visible = true
    gsap.to(wrapper, { opacity: 1, duration: 0.3, overwrite: 'auto' })
  }
  const hide = () => {
    visible = false
    gsap.to(wrapper, { opacity: 0, duration: 0.3, overwrite: 'auto' })
  }

  const setState = (name) => {
    if (name === current) return
    current = name
    const s = STATES[name]
    wrapper.style.mixBlendMode = s.blend
    if (textEl) textEl.textContent = s.label
    gsap.to(circle, { scale: s.scale, duration: 0.55, ease: 'expo.out', overwrite: 'auto' })
    gsap.to(labelEl, {
      opacity: s.label ? 1 : 0,
      scale: s.label ? 1 : 0.8,
      duration: s.label ? 0.45 : 0.2,
      delay: s.label ? 0.08 : 0,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const onMove = (e) => {
    if (!visible) {
      gsap.set(wrapper, { x: e.clientX, y: e.clientY })
      show()
    }
    xTo(e.clientX)
    yTo(e.clientY)
  }

  const onOver = (e) => {
    const t = e.target
    if (!(t instanceof Element)) return
    const custom = t.closest('[data-cursor]')
    if (custom) {
      setState(STATES[custom.dataset.cursor] ? custom.dataset.cursor : 'link')
      return
    }
    setState(t.closest('a, button, [role="button"], input, textarea, label') ? 'link' : 'default')
  }

  const onLeaveDoc = () => hide()
  const onEnterDoc = () => show()

  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseover', onOver, { passive: true })
  document.documentElement.addEventListener('mouseleave', onLeaveDoc)
  document.documentElement.addEventListener('mouseenter', onEnterDoc)
  window.addEventListener('blur', onLeaveDoc)

  return () => {
    window.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseover', onOver)
    document.documentElement.removeEventListener('mouseleave', onLeaveDoc)
    document.documentElement.removeEventListener('mouseenter', onEnterDoc)
    window.removeEventListener('blur', onLeaveDoc)
    gsap.killTweensOf([wrapper, circle, labelEl])
  }
}
