import { useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import BlogPage from './pages/BlogPage'
import StoryPage from './pages/StoryPage'
import ContactPage from './pages/ContactPage'
import useLenis, { scrollToTop } from './hooks/useLenis'
import { ScrollTrigger } from './animations/gsapSetup'
import { registerTransition } from './animations/pageTransitions'
import site from './data/site'
import blogs from './data/blogs'

const TITLES = {
  '/': `${site.name} — ${site.tagline.replace(` With ${site.name}`, '')}`,
  '/about': `About — ${site.name}`,
  '/services': `Services — ${site.name}`,
  '/portfolio': `Portfolio — ${site.name}`,
  '/blog': `Blog — ${site.name}`,
  '/contact': `Contact — ${site.name}`,
}

export default function App() {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  const overlayRef = useRef(null)
  const labelRef = useRef(null)
  const pageRef = useRef(null)
  const mainRef = useRef(null)
  const firstRender = useRef(true)

  useLenis()

  // Hand the transition overlay to the page-transition module.
  useEffect(() => {
    registerTransition({ overlay: overlayRef.current, label: labelRef.current, page: pageRef.current })
  }, [])

  // We manage scroll ourselves.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  // Re-measure once fonts / images settle so pinned sections are exact.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  // Per-route housekeeping (also covers browser back / forward).
  useEffect(() => {
    const story = pathname.startsWith('/blog/')
      ? blogs.posts.find((p) => `/blog/${p.slug}` === pathname)
      : null
    document.title = story ? `${story.title} — ${site.name}` : TITLES[pathname] || TITLES['/']
    scrollToTop()
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    if (!firstRender.current) mainRef.current?.focus({ preventScroll: true })
    firstRender.current = false
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {loading ? <Preloader onDone={() => setLoading(false)} /> : null}
      <CustomCursor />
      <Navbar />

      <div ref={pageRef}>
        <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<StoryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* Page transition curtain */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-[#0e0e0e]"
        style={{ visibility: 'hidden', clipPath: 'inset(100% 0% 0% 0%)' }}
      >
        <span ref={labelRef} className="display text-[clamp(2.4rem,9vw,8rem)]" style={{ opacity: 0 }}>
          {site.short}
        </span>
      </div>
    </>
  )
}
