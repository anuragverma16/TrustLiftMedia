import PageHeader from '../components/PageHeader'
import FeaturedWork from '../components/FeaturedWork'
import CTA from '../components/CTA'

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        label="Portfolio"
        lines={['Results', 'that speak.']}
        intro="A look at recent work: more visibility, stronger rankings and sales that grew with the brand."
      />
      <FeaturedWork limit={3} showHeader={false} showLink={false} />
      <CTA
        label="Your turn"
        lines={['Your brand', 'could be', 'next.']}
        text="Let's plan the growth story for your business."
        button="Book Free Consultation"
      />
    </>
  )
}
