import { useLayoutEffect } from 'react'
import { gsap, MEDIA } from '../animations/gsapSetup'

/**
 * Scoped, responsive GSAP setup with automatic cleanup.
 *
 * `setup(conditions, context)` runs inside gsap.matchMedia (which wraps gsap.context),
 * so every tween / ScrollTrigger created synchronously is reverted on unmount or when
 * the media conditions change. It may return a cleanup function.
 *
 * conditions: { desktop, mobile, reduceMotion, finePointer }
 */
export default function useGsap(scopeRef, setup, deps = []) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scopeRef.current || undefined)
    mm.add(MEDIA, (ctx) => setup(ctx.conditions, ctx))
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
