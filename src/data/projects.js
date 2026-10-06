import p1 from '../assets/images/proj-1.webp'
import p2 from '../assets/images/proj-2.webp'
import p3 from '../assets/images/proj-3.webp'

// Portfolio titles + results are copied from https://trustlift-media.netlify.app/
// `image` is the case-study image hosted for that site; `fallback` is bundled artwork
// shown automatically if the remote image can't load.
const projects = [
  {
    id: '01',
    slug: 'ecommerce-growth',
    title: 'E-commerce Growth',
    result: 'Increased visibility by 200% + 500+ reviews',
    image: 'https://res.cloudinary.com/dqbqud8gh/image/upload/e-_COMMERCE_pcj2lx.png',
    fallback: p1,
    alt: 'E-commerce growth case study',
  },
  {
    id: '02',
    slug: 'seo-success-story',
    title: 'SEO Success Story',
    result: 'Ranked #1 for 50+ keywords',
    image: 'https://res.cloudinary.com/dqbqud8gh/image/upload/SEOOO_tcnhuk.png',
    fallback: p2,
    alt: 'SEO success story case study',
  },
  {
    id: '03',
    slug: 'restaurant-branding',
    title: 'Restaurant Branding',
    result: 'Boosted sales through social media',
    image: 'https://res.cloudinary.com/dqbqud8gh/image/upload/RESTURANT_n5h9sc.png',
    fallback: p3,
    alt: 'Restaurant branding case study',
  },
]

export default projects
