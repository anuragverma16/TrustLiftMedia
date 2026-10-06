import { useRef } from 'react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import useGsap from '../hooks/useGsap'
import { maskReveal, fadeUp } from '../animations/textAnimations'
import { lenisStore } from '../hooks/useLenis'
import TransitionLink from './TransitionLink'
import site from '../data/site'

const NAV = [{ to: '/', label: 'Home' }, ...site.nav]

export default function Footer() {
  const root = useRef(null)

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    fadeUp(root.current.querySelectorAll('[data-f-fade]'), {
      trigger: root.current,
      start: 'top 85%',
      stagger: 0.09,
      y: 28,
    })
    maskReveal(root.current.querySelectorAll('[data-line]'), {
      trigger: root.current.querySelector('[data-f-mark]'),
      start: 'top 100%',
      duration: 1.6,
    })
    return undefined
  }, [])

  const backToTop = () => {
    if (lenisStore.instance) lenisStore.instance.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={root} className="border-t border-line pt-[clamp(4rem,8vw,8rem)]">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-14">
        <div data-f-fade className="col-span-12 lg:col-span-4">
          <p className="max-w-xs text-lg leading-snug text-bone/90">{site.footerText}</p>
        </div>

        <nav data-f-fade aria-label="Footer" className="col-span-6 lg:col-span-2 lg:col-start-5">
          <h2 className="label mb-5">Navigate</h2>
          <ul className="flex flex-col gap-2">
            {NAV.map((l) => (
              <li key={l.to}>
                <TransitionLink to={l.to} className="link-underline text-base">
                  {l.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div data-f-fade className="col-span-6 lg:col-span-2">
          <h2 className="label mb-5">Social</h2>
          <ul className="flex flex-col gap-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="link-underline inline-flex items-center gap-1 text-base"
                >
                  {s.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <address data-f-fade className="col-span-12 not-italic lg:col-span-4">
          <h2 className="label mb-5">Contact</h2>
          <ul className="flex flex-col gap-2 text-base">
            <li>
              <a href={`mailto:${site.email}`} className="link-underline break-all">
                {site.email}
              </a>
            </li>
            {site.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="link-underline">
                  {p.label}
                </a>
              </li>
            ))}
            <li className="text-ash">{site.location}</li>
          </ul>
        </address>
      </div>

      {/* Oversized wordmark */}
      <div data-f-mark className="container-x mt-[clamp(3rem,7vw,7rem)] overflow-hidden" aria-hidden="true">
        <span className="mask">
          <span
            data-line
            className="display block text-[clamp(3rem,15.5vw,19rem)] leading-[0.9] tracking-[-0.06em]"
          >
            {site.short}
          </span>
        </span>
      </div>

      <div className="container-x border-t border-line py-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p data-f-fade className="label">
            © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
          <button
            data-f-fade
            type="button"
            onClick={backToTop}
            className="label flex items-center gap-2 transition-colors hover:text-bone"
          >
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
