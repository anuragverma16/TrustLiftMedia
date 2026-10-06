import PageHeader from '../components/PageHeader'
import Blog from '../components/Blog'
import CTA from '../components/CTA'
import blogs from '../data/blogs'

export default function BlogPage() {
  return (
    <>
      <PageHeader
        label={blogs.eyebrow}
        lines={['Stories that', 'shift perspectives']}
        intro={`${blogs.subheading} — ${blogs.intro}`}
      />
      <Blog variant="list" showHeader={false} />
      <CTA
        label="Have a question?"
        lines={['Ask us', 'anything.']}
        text="Digital marketing doesn't have to be confusing. Talk to a real person on our team."
        button="Talk to us"
      />
    </>
  )
}
