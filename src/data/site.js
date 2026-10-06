// Single source of truth for brand + contact details.
// All values below are taken from https://trustlift-media.netlify.app/

const site = {
  name: 'TrustLift Media',
  short: 'TRUSTLIFT',
  type: 'Digital Marketing Agency',
  url: 'https://trustlift-media.netlify.app/',
  tagline: 'Elevate Your Digital Presence With TrustLift Media',
  heroText:
    'We help brands grow online through powerful marketing strategies, review optimization, social media growth, branding, and customer engagement.',
  whyText: 'We combine creativity, strategy, and technology to help businesses dominate digitally.',
  footerText: 'Elevating brands digitally with modern marketing solutions.',
  location: 'Delhi NCR, India',

  email: 'trustlift.mediaa@gmail.com',
  phones: [
    { label: '+91 99971 03079', href: 'tel:+919997103079' },
    { label: '+91 89567 90360', href: 'tel:+918956790360' },
  ],
  whatsapp: 'https://wa.me/919997103079?text=Hello%20TrustLift%20Media',

  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/trustlift.media?stkn=MTVkdmg0cDQza2Rkcg==' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/trust-lift-media-205093413?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { label: 'Facebook', href: 'https://www.facebook.com/share/19hs1R6LRt/' },
    { label: 'WhatsApp', href: 'https://wa.me/919997103079?text=Hello%20TrustLift%20Media' },
  ],

  // Images used on the live site ("Digital Marketing" and "Team").
  images: {
    hero: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=1600',
    about: 'https://pin.it/5XuPrYh6E',
    cta: 'https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },

  // Same pages as the live site's navigation (Home is the logo).
  nav: [
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ],
}

export default site
