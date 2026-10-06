import { gsap } from './gsapSetup'

/**
 * Reveal text that is wrapped in masks: <span class="mask"><span>Line</span></span>
 * `targets` are the INNER spans. They slide up from below the mask.
 * Pass `trigger` to run on scroll (once), otherwise returns a plain tween
 * (use `paused: true` to place it in a timeline yourself).
 */
export function maskReveal(
  targets,
  { trigger, start = 'top 85%', delay = 0, stagger = 0.09, duration = 1.15, paused = false } = {},
) {
  const vars = {
    yPercent: 0,
    duration,
    delay,
    stagger,
    ease: 'expo.out',
    paused,
  }
  if (trigger) {
    vars.scrollTrigger = { trigger, start, once: true }
  }
  return gsap.fromTo(targets, { yPercent: 115 }, vars)
}

// Simple opacity / translate reveal for paragraphs, labels, meta rows.
export function fadeUp(
  targets,
  { trigger, start = 'top 88%', delay = 0, stagger = 0.1, y = 40, duration = 1, paused = false } = {},
) {
  const vars = {
    y: 0,
    opacity: 1,
    duration,
    delay,
    stagger,
    ease: 'power3.out',
    paused,
  }
  if (trigger) {
    vars.scrollTrigger = { trigger, start, once: true }
  }
  return gsap.fromTo(targets, { y, opacity: 0 }, vars)
}

/**
 * Count a number up once, when its trigger enters the viewport.
 * `once: true` guarantees it never replays.
 */
export function countUp(el, to, { suffix = '', duration = 2.2, start = 'top 85%', trigger } = {}) {
  const state = { value: 0 }
  el.textContent = `0${suffix}`
  return gsap.to(state, {
    value: to,
    duration,
    ease: 'power2.out',
    snap: { value: 1 },
    onUpdate: () => {
      el.textContent = `${Math.round(state.value)}${suffix}`
    },
    scrollTrigger: {
      trigger: trigger || el,
      start,
      once: true,
    },
  })
}
