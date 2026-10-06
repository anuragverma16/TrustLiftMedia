import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import TransitionLink from './TransitionLink'
import useGsap from '../hooks/useGsap'
import { gsap, prefersReducedMotion } from '../animations/gsapSetup'
import { whenReady } from '../animations/ready'
import { lockScroll, unlockScroll } from '../hooks/useLenis'

import site from '../data/site'

const LINKS = site.nav

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navRef = useRef(null)
  const menuRef = useRef(null)
  const menuTl = useRef(null)
  const openRef = useRef(false)
  const buttonRef = useRef(null)

  openRef.current = open

  // Entrance after the preloader.
  useGsap(navRef, (c) => {
    if (c.reduceMotion) return undefined
    const items = navRef.current.querySelectorAll('[data-nav-item]')
    const tl = gsap.timeline({ paused: true })
    tl.fromTo(items, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'expo.out' })
    return whenReady(() => tl.play())
  }, [])

  // Scrolled background + hide on scroll down / show on scroll up.
  useEffect(() => {
    const nav = navRef.current
    let lastY = window.scrollY
    let hidden = false

    const onScroll = () => {
      const y = window.scrollY
      setScrolled((prev) => {
        const next = y > 60
        return prev === next ? prev : next
      })
      if (openRef.current) return
      const goingDown = y > lastY
      if (goingDown && y > 400 && !hidden) {
        hidden = true
        gsap.to(nav, { yPercent: -100, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
      } else if ((!goingDown || y <= 400) && hidden) {
        hidden = false
        gsap.to(nav, { yPercent: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
      }
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      gsap.killTweensOf(nav)
    }
  }, [])

  // Mobile menu timeline: slides up from the bottom, links stagger in.
  useEffect(() => {
    const menu = menuRef.current
    const ctx = gsap.context(() => {
      const links = menu.querySelectorAll('[data-menu-link]')
      const meta = menu.querySelectorAll('[data-menu-meta]')
      gsap.set(menu, { clipPath: 'inset(100% 0% 0% 0%)', visibility: 'hidden' })

      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => gsap.set(menu, { visibility: 'hidden' }),
      })
      tl.set(menu, { visibility: 'visible' })
        .to(menu, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.inOut' })
        .fromTo(links, { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out' }, '-=0.3')
        .fromTo(meta, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.6')
      menuTl.current = tl
    }, menu)
    return () => ctx.revert()
  }, [])

  const toggle = useCallback((next) => {
    setOpen(next)
    const tl = menuTl.current
    if (!tl) return
    if (next) {
      lockScroll()
      document.documentElement.style.overflow = 'hidden'
      if (prefersReducedMotion()) tl.progress(1)
      else tl.timeScale(1).play()
    } else {
      unlockScroll()
      document.documentElement.style.overflow = ''
      if (prefersReducedMotion()) tl.progress(0)
      else tl.timeScale(1.5).reverse()
    }
  }, [])

  // Close on route change + Escape.
  useEffect(() => {
    if (openRef.current) toggle(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && openRef.current) {
        toggle(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  const solid = scrolled && !open

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid
            ? 'border-line bg-ink/75 backdrop-blur-md'
            : 'border-transparent bg-transparent backdrop-blur-none'
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between md:h-20">
          <TransitionLink
            to="/"
            data-nav-item
            aria-label={`${site.name} — home`}
            className="flex items-baseline gap-2 leading-none"
          >
            <span className="display text-[1.35rem] tracking-[-0.05em] md:text-[1.55rem]">{site.short}</span>
            <span className="label !text-[0.6rem] !tracking-[0.28em]">Media</span>
          </TransitionLink>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {LINKS.map((l) => (
                <li key={l.to} data-nav-item>
                  <TransitionLink
                    to={l.to}
                    aria-current={pathname === l.to ? 'page' : undefined}
                    className="link-underline text-[0.76rem] font-medium uppercase tracking-[0.18em]"
                  >
                    {l.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={buttonRef}
            type="button"
            data-nav-item
            onClick={() => toggle(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex items-center gap-2 text-[0.76rem] font-medium uppercase tracking-[0.18em] md:hidden"
          >
            {open ? 'Close' : 'Menu'}
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        aria-hidden={!open}
        style={{ visibility: 'hidden' }}
        className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-[var(--gutter)] pb-8 pt-28 md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-2">
            {LINKS.map((l, i) => (
              <li key={l.to} className="mask">
                <span data-menu-link className="block">
                  <TransitionLink
                    to={l.to}
                    tabIndex={open ? 0 : -1}
                    aria-current={pathname === l.to ? 'page' : undefined}
                    className="display flex items-baseline gap-4 text-[clamp(2.4rem,12vw,5rem)]"
                  >
                    <span className="label !text-[0.7rem]">0{i + 1}</span>
                    {l.label}
                  </TransitionLink>
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <p data-menu-meta className="label">
            Get Started
          </p>
          <a
            data-menu-meta
            tabIndex={open ? 0 : -1}
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 text-lg"
          >
            {site.email} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  )
}
