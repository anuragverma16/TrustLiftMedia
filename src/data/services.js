import svc1 from '../assets/images/svc-1.webp'
import svc2 from '../assets/images/svc-2.webp'
import svc3 from '../assets/images/svc-3.webp'
import svc4 from '../assets/images/svc-4.webp'
import svc5 from '/branding.jpg'
import svc6 from '../assets/images/svc-6.webp'

// Service names + descriptions are copied from https://trustlift-media.netlify.app/
// (`photo` is a stock photo URL; `image` is the bundled fallback shown if it can't load).
const services = [
  {
    id: '01',
    photo: '/Rating.jpeg',
    title: 'Review & Rating Optimization',
    description: 'Boost your online reputation with authentic 5-star reviews',
    image: svc1,
    alt: 'Five star rating blocks representing customer reviews',
  },
  {
    id: '02',
    photo: '/Social Media.jpeg',
    title: 'Social Media Marketing',
    description: 'Grow your brand with engaging content and targeted campaigns',
    image: svc2,
    alt: 'Hand holding a smartphone showing social media apps',
  },
  {
    id: '03',
    photo: '/SEO.jpeg',
    title: 'SEO Optimization',
    description: 'Rank #1 on Google with our advanced SEO techniques',
    image: svc3,
    alt: 'Laptop displaying search and analytics charts',
  },
  {
    id: '04',
    photo: '/website development.jpeg',
    title: 'Website Development',
    description: 'Custom, responsive websites designed for high conversion',
    image: svc4,
    alt: 'Laptop with website code open on a desk',
  },
  {
    id: '05',
    photo: '/branding.jpeg',
    title: 'Branding & Identity',
    description: 'Create a powerful brand identity that stands out',
    image: svc5,
    alt: 'Brand identity and marketing strategy flat lay',
  },
  {
    id: '06',
    photo: '/customer engagement.jpeg',
    title: 'Customer Engagement',
    description: 'Increase audience interaction with personalized strategies',
    image: svc6,
    alt: 'Team discussing ideas together in a meeting',
  },
]

export default services
