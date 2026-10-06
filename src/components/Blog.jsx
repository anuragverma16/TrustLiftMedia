import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import useGsap from '../hooks/useGsap'
import { maskReveal, fadeUp } from '../animations/textAnimations'
import { Lines } from './Reveal'
import Img from './Img'
import TransitionLink from './TransitionLink'
import blogs from '../data/blogs'

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

// A story card — opens the full story at /blog/:slug.
export function Post({ post, carousel = false }) {
  return (
    <article className={carousel ? 'w-[min(82vw,26rem)] shrink-0 snap-start md:w-[28rem]' : ''}>
      <TransitionLink
        to={`/blog/${post.slug}`}
        data-cursor="view"
        aria-label={`Read story: ${post.title}`}
        className="group block"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#101010]">
          <Img
            src={post.image}
            fallback={post.fallback}
            alt={post.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25"
          />
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="label !text-bone">{post.category}</p>
          <p className="label">
            {formatDate(post.date)} · {post.readTime} min
          </p>
        </div>
        <h3 className="display mt-3 text-[clamp(1.4rem,2vw,2.2rem)] leading-[1.04] transition-transform duration-700 group-hover:translate-x-2">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ash">{post.excerpt}</p>
        <p className="label mt-4 flex items-center gap-2 !text-bone">
          Read story
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:translate-x-1.5"
          />
        </p>
      </TransitionLink>
    </article>
  )
}

/**
 * "In The Headlights" — heading copy from the live site, stories from src/data/blogs.js.
 * variant="carousel": native scroll-snap carousel with prev/next (home).
 * variant="list": wrapped grid (blog page).
 */
export default function Blog({ variant = 'carousel', showHeader = true }) {
  const root = useRef(null)
  const scroller = useRef(null)
  const { posts } = blogs

  useGsap(root, (c) => {
    if (c.reduceMotion) return undefined
    const head = root.current.querySelector('[data-blog-head]')
    if (head) {
      maskReveal(head.querySelectorAll('[data-line]'), { trigger: head, start: 'top 82%' })
      fadeUp(head.querySelectorAll('[data-fade]'), { trigger: head, start: 'top 82%' })
    }
    const body = root.current.querySelector('[data-blog-body]')
    if (body && body.children.length) fadeUp(body.children, { trigger: body, start: 'top 88%', y: 40 })
    return undefined
  }, [])

  const scrollBy = (dir) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 460), behavior: 'smooth' })
  }

  return (
    <section
      ref={root}
      id="blog"
      aria-labelledby="blog-title"
      className="py-[clamp(5rem,12vw,12rem)]"
    >
      {showHeader ? (
        <div data-blog-head className="container-x mb-14 grid grid-cols-12 gap-x-6 gap-y-8 md:mb-20">
          <p data-fade className="label col-span-12">
            (07) — {blogs.eyebrow}
          </p>
          <h2
            id="blog-title"
            className="display col-span-12 text-[clamp(2.4rem,6vw,7rem)] lg:col-span-9"
          >
            <Lines lines={['Stories that', 'shift perspectives']} />
          </h2>
          <div data-fade className="col-span-12 flex flex-col gap-2 self-end lg:col-span-3">
            <p className="label !text-bone">{blogs.subheading}</p>
            <p className="text-sm text-ash">{blogs.intro}</p>
          </div>
        </div>
      ) : (
        <h2 id="blog-title" className="sr-only">
          {blogs.heading}
        </h2>
      )}

      {variant === 'carousel' ? (
        <>
          <div
            ref={scroller}
            data-blog-body
            tabIndex={0}
            aria-label="Latest stories"
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((p) => (
              <Post key={p.slug} post={p} carousel />
            ))}
          </div>
          <div className="container-x mt-10 flex items-center justify-between gap-4">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous stories"
                className="grid h-14 w-14 place-items-center border border-line transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-ink"
              >
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next stories"
                className="grid h-14 w-14 place-items-center border border-line transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-ink"
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
            <TransitionLink
              to="/blog"
              className="link-underline hidden items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] sm:inline-flex"
            >
              All stories <ArrowRight size={18} aria-hidden="true" />
            </TransitionLink>
          </div>
        </>
      ) : (
        <div data-blog-body className="container-x grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Post key={p.slug} post={p} />
          ))}
        </div>
      )}
    </section>
  )
}
