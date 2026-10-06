import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import MagneticButton from '../components/MagneticButton'
import useGsap from '../hooks/useGsap'
import { fadeUp } from '../animations/textAnimations'
import site from '../data/site'

export default function ContactPage() {
  const root = useRef(null)
  const [sent, setSent] = useState(false)
  const reduce = useReducedMotion()

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    fadeUp(root.current.querySelectorAll('[data-c-fade]'), {
      trigger: root.current,
      start: 'top 85%',
      stagger: 0.1,
      y: 30,
    })
    return undefined
  }, [])

  // No backend: opens the visitor's email app addressed to TrustLift Media with the form content.
  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `Enquiry from ${f.get('name')}`
    const body = `Name: ${f.get('name')}\nEmail: ${f.get('email')}\nPhone: ${f.get('phone')}\n\n${f.get('message')}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageHeader
        label="Contact"
        lines={['Get Started']}
        intro="Tell us about your brand and we will get back to you."
      />

      <section ref={root} aria-label="Contact form" className="container-x pb-[clamp(5rem,12vw,12rem)]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 border-t border-line pt-12 md:pt-16">
          <aside className="col-span-12 flex flex-col gap-10 lg:col-span-4">
            <div data-c-fade>
              <h2 className="label mb-3">Email</h2>
              <a href={`mailto:${site.email}`} className="link-underline break-all text-xl">
                {site.email}
              </a>
            </div>
            <div data-c-fade>
              <h2 className="label mb-3">Phone</h2>
              <ul className="flex flex-col gap-1">
                {site.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="link-underline text-xl">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div data-c-fade>
              <h2 className="label mb-3">Location</h2>
              <p className="text-xl text-bone/90">{site.location}</p>
            </div>
            <div data-c-fade>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-b border-bone/40 pb-2 text-[0.8rem] font-medium uppercase tracking-[0.18em] transition-colors hover:border-bone"
              >
                Chat on WhatsApp
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {/* Framer Motion handles the form ⇄ confirmation swap (exit + enter presence). */}
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="thanks"
                  role="status"
                  className="py-10"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="display display-md">Thank you.</p>
                  <p className="body-lg mt-6 max-w-md">
                    Your email app should have opened with your message addressed to {site.email}.
                    If it did not, write to us directly or message us on WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="label mt-8 underline underline-offset-4 hover:text-bone"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-10"
                  exit={reduce ? undefined : { opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: 'easeIn' }}
                >
                  <div data-c-fade>
                    <label htmlFor="name" className="label">
                      Full Name
                    </label>
                    <input id="name" name="name" type="text" required autoComplete="name" className="field" />
                  </div>

                  <div data-c-fade>
                    <label htmlFor="email" className="label">
                      Email
                    </label>
                    <input id="email" name="email" type="email" required autoComplete="email" className="field" />
                  </div>

                  <div data-c-fade>
                    <label htmlFor="phone" className="label">
                      Phone Number
                    </label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
                  </div>

                  <div data-c-fade>
                    <label htmlFor="message" className="label">
                      Message
                    </label>
                    <textarea id="message" name="message" required rows={4} className="field resize-none" />
                  </div>

                  <div data-c-fade>
                    <MagneticButton strength={0.3} area={20}>
                      <button
                        type="submit"
                        data-cursor="explore"
                        className="group flex items-center gap-4 border-b border-bone/40 pb-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] transition-colors hover:border-bone"
                      >
                        Send Message
                        <ArrowRight
                          size={20}
                          aria-hidden="true"
                          className="transition-transform duration-500 group-hover:translate-x-1.5"
                        />
                      </button>
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  )
}
