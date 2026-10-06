import { useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import useGsap from '../hooks/useGsap'
import { maskReveal, fadeUp } from '../animations/textAnimations'
import { clipReveal, imageParallax } from '../animations/imageAnimations'
import { Words } from '../components/Reveal'
import Img from '../components/Img'
import CTA from '../components/CTA'
import TransitionLink from '../components/TransitionLink'
import { Post, formatDate } from '../components/Blog'
import blogs from '../data/blogs'

// Full story: header, large photo, article body, previous/next, related stories.
export default function StoryPage() {
  const { slug } = useParams()
  const index = blogs.posts.findIndex((p) => p.slug === slug)
  const post = blogs.posts[index]
  const root = useRef(null)

  useGsap(
    root,
    (c) => {
      if (c.reduceMotion || !post) return undefined
      const el = root.current
      const wrap = el.querySelector('[data-story-wrap]')
      const img = el.querySelector('[data-story-img]')

      fadeUp(el.querySelectorAll('[data-story-meta]'), { delay: 0.6, trigger: undefined, y: 20 })
      maskReveal(el.querySelectorAll('[data-word]'), { delay: 0.7, stagger: 0.04, duration: 1.2 })
      fadeUp(el.querySelectorAll('[data-story-intro]'), { delay: 1.2, y: 24 })
      clipReveal(wrap, img, { trigger: wrap, start: 'top 92%', delay: 0.2 })
      if (c.desktop) imageParallax(img, { trigger: wrap })

      el.querySelectorAll('[data-story-block]').forEach((b) =>
        fadeUp(b.children, { trigger: b, start: 'top 85%', stagger: 0.08, y: 28 }),
      )
      return undefined
    },
    [slug],
  )

  if (!post) return <Navigate to="/blog" replace />

  const prev = blogs.posts[(index - 1 + blogs.posts.length) % blogs.posts.length]
  const next = blogs.posts[(index + 1) % blogs.posts.length]
  const related = blogs.posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div ref={root}>
      <article>
        <header className="container-x pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(8rem,15vw,13rem)]">
          <TransitionLink
            to="/blog"
            data-story-meta
            className="link-underline label mb-10 inline-flex items-center gap-2 !text-bone/80"
          >
            <ArrowLeft size={14} aria-hidden="true" /> All stories
          </TransitionLink>

          <div data-story-meta className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="label !text-bone">{post.category}</p>
            <p className="label">{formatDate(post.date)}</p>
            <p className="label">{post.readTime} min read</p>
            <p className="label">By {blogs.author}</p>
          </div>

          <h1 className="display max-w-6xl text-[clamp(2.2rem,6.2vw,7.5rem)]">
            <Words text={post.title} />
          </h1>

          <p data-story-intro className="body-lg mt-10 max-w-2xl md:mt-14">
            {post.excerpt}
          </p>
        </header>

        <div className="container-x">
          <div
            data-story-wrap
            className="relative aspect-[4/3] max-h-[85vh] w-full overflow-hidden bg-[#101010] md:aspect-[16/8]"
          >
            <Img
              data-story-img
              src={post.image}
              fallback={post.fallback}
              alt={post.alt}
              width="1400"
              height="900"
              decoding="async"
              className="absolute -top-[10%] left-0 h-[120%] w-full object-cover"
            />
          </div>
        </div>

        <div className="container-x py-[clamp(4rem,9vw,9rem)]">
          <div className="mx-auto max-w-3xl">
            {post.body.map((s, i) => (
              <section key={s.h} data-story-block className="mb-14 md:mb-20">
                <p className="label mb-4">0{i + 1}</p>
                <h2 className="display mb-6 text-[clamp(1.6rem,3vw,3.2rem)] leading-[1.02]">{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para.slice(0, 24)} className="mb-5 text-[clamp(1.05rem,1.35vw,1.3rem)] leading-[1.75] text-bone/80">
                    {para}
                  </p>
                ))}
                {s.list ? (
                  <ul className="mt-6 flex flex-col">
                    {s.list.map((item) => (
                      <li
                        key={item}
                        className="border-t border-line py-4 text-[clamp(1rem,1.25vw,1.2rem)] text-bone/90 last:border-b"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <nav aria-label="More stories" className="mt-8 grid gap-px border-y border-line sm:grid-cols-2">
              <TransitionLink
                to={`/blog/${prev.slug}`}
                data-cursor="link"
                className="group block py-8 sm:pr-8"
              >
                <p className="label mb-3 flex items-center gap-2">
                  <ArrowLeft size={14} aria-hidden="true" /> Previous story
                </p>
                <p className="display text-[clamp(1.1rem,1.8vw,1.8rem)] leading-[1.1] transition-transform duration-500 group-hover:-translate-x-1">
                  {prev.title}
                </p>
              </TransitionLink>
              <TransitionLink
                to={`/blog/${next.slug}`}
                data-cursor="link"
                className="group block border-t border-line py-8 sm:border-l sm:border-t-0 sm:pl-8 sm:text-right"
              >
                <p className="label mb-3 flex items-center gap-2 sm:justify-end">
                  Next story <ArrowRight size={14} aria-hidden="true" />
                </p>
                <p className="display text-[clamp(1.1rem,1.8vw,1.8rem)] leading-[1.1] transition-transform duration-500 group-hover:translate-x-1">
                  {next.title}
                </p>
              </TransitionLink>
            </nav>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-title" className="pb-[clamp(4rem,9vw,9rem)]">
        <div className="container-x mb-10 flex items-end justify-between">
          <h2 id="related-title" className="display text-[clamp(1.8rem,4vw,4.5rem)]">
            More stories
          </h2>
          <TransitionLink
            to="/blog"
            className="link-underline hidden items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] sm:inline-flex"
          >
            All stories <ArrowRight size={18} aria-hidden="true" />
          </TransitionLink>
        </div>
        <div className="container-x grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Post key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <CTA
        label="Next step"
        lines={['Want results', 'like these?']}
        text="Tell us about your business and we will show you where to start."
        button="Book Free Consultation"
      />
    </div>
  )
}
