import f1 from '../assets/images/svc-1.webp'
import f2 from '../assets/images/svc-2.webp'
import f3 from '../assets/images/svc-3.webp'
import f4 from '../assets/images/svc-4.webp'
import f5 from '../assets/images/svc-5.webp'
import f6 from '../assets/images/svc-6.webp'

const px = (id, w = 1400) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

// Blog headings come from https://trustlift-media.netlify.app/ ("In The Headlights").
// The live site lists no individual posts, so the stories below are drafted for each of
// your six services — edit, replace or add your own. Each post:
//   body: [{ h: 'Subheading', p: ['Paragraph', …], list: ['Bullet', …] (optional) }]
//   image: photo URL, fallback: bundled artwork used if the photo can't load.
const blogs = {
  eyebrow: 'In The Headlights',
  heading: 'Stories that shift perspectives',
  subheading: 'Latest Stories',
  intro: 'Insights from the road less travelled in digital marketing',
  author: 'TrustLift Media Team',
  posts: [
    {
      slug: 'why-authentic-reviews-build-trust',
      title: 'Why Authentic Reviews Build Trust Before You Say a Word',
      category: 'Reviews',
      date: '2026-10-02',
      readTime: 4,
      excerpt:
        'Most buyers read reviews before they read anything else about you. Here is how to turn that moment into your strongest sales conversation.',
      image: px(38472817),
      fallback: f1,
      alt: 'Five star rating blocks representing customer reviews',
      body: [
        {
          h: 'Reviews are the new first impression',
          p: [
            'Before a customer visits your website, calls your number or walks through your door, they have usually already searched your name. What they see in those first few seconds — your star rating, the most recent comments, the way you reply — shapes whether they continue.',
            'That is why reputation is not a side project. It is the front door of your business, and it is open twenty-four hours a day.',
          ],
        },
        {
          h: 'What makes a review feel real',
          p: [
            'People are good at spotting patterns that feel staged. Genuine reviews are specific: they mention a product, a person or a problem that was solved. They vary in length and tone, and they arrive steadily over time rather than in one sudden burst.',
          ],
          list: [
            'Ask happy customers at the moment they are happiest — right after a successful delivery or visit.',
            'Make it easy: one link, one tap, no account hunting.',
            'Never offer money for a positive rating. Invite honest feedback instead.',
          ],
        },
        {
          h: 'Respond like a human',
          p: [
            'A thoughtful reply to a negative review often does more for your reputation than ten quiet five-star ratings. Thank the person, acknowledge what went wrong, and offer a clear way to put it right. Future customers are reading the exchange, not just the complaint.',
          ],
        },
        {
          h: 'Make it a routine, not a campaign',
          p: [
            'The brands with the strongest ratings treat reviews as a weekly habit: a simple request after every sale, a quick check of new comments each morning, and a short monthly look at what customers keep mentioning. Over time, that rhythm compounds into trust that no advertisement can buy.',
          ],
        },
      ],
    },
    {
      slug: 'social-media-campaigns-people-remember',
      title: 'Social Media Campaigns People Actually Remember',
      category: 'Social Media',
      date: '2026-09-24',
      readTime: 5,
      excerpt:
        'Posting more is not the same as being noticed. A look at the ideas, rhythm and community habits behind campaigns that stick.',
      image: px(533446),
      fallback: f2,
      alt: 'Hand holding a smartphone showing social media apps',
      body: [
        {
          h: 'Start with one clear idea',
          p: [
            'The campaigns people remember can be explained in a sentence. Before you plan a single post, write down the one thing you want your audience to feel or do. Every image, caption and video should serve that sentence.',
          ],
        },
        {
          h: 'Build a content rhythm',
          p: [
            'Consistency beats intensity. A sustainable mix — short videos, helpful carousels, behind-the-scenes moments and customer stories — keeps your feed varied without burning out your team.',
          ],
          list: [
            'Educate: answer the questions customers ask most.',
            'Show: let people see how your product or service works.',
            'Belong: celebrate customers and community.',
            'Invite: end with one simple action, not five.',
          ],
        },
        {
          h: 'Target with intent',
          p: [
            'Paid campaigns work best when they are narrow at first. Choose one audience, one message and one goal, then learn from the results before widening the net. Small, focused tests teach you more than a large, vague spend.',
          ],
        },
        {
          h: 'Measure what matters',
          p: [
            'Likes are pleasant, but saves, shares, replies and clicks tell you whether the message landed. Review those signals every month, keep what resonates, and let go of what does not. A campaign is never finished — it is refined.',
          ],
        },
      ],
    },
    {
      slug: 'seo-basics-to-rank-higher-on-google',
      title: 'SEO Basics: How to Rank Higher on Google Without the Jargon',
      category: 'SEO',
      date: '2026-09-15',
      readTime: 6,
      excerpt:
        'Search ranking looks mysterious from the outside. In practice it comes down to a few fundamentals done well and kept up consistently.',
      image: px(577195),
      fallback: f3,
      alt: 'Laptop displaying search and analytics charts',
      body: [
        {
          h: 'Think in questions, not keywords',
          p: [
            'People type questions into search: what, where, how much, which is best. Start by listing the questions your ideal customer asks, then create pages that answer each one clearly and honestly. Matching intent is the heart of modern SEO.',
          ],
        },
        {
          h: 'Get the technical foundation right',
          p: [
            'Even brilliant content struggles on a slow or confusing site. Make sure pages load quickly on mobile, headings are structured logically, images have descriptive text, and every page has a clear title and description.',
          ],
          list: [
            'Fast loading on phones',
            'Clean, readable page structure',
            'Descriptive titles and meta descriptions',
            'A sitemap that search engines can read',
          ],
        },
        {
          h: 'Earn trust, not just traffic',
          p: [
            'Search engines favour businesses that other people trust. Good reviews, mentions on respected sites and genuinely useful content all send that signal. Shortcuts rarely last; steady credibility does.',
          ],
        },
        {
          h: 'Be patient and keep improving',
          p: [
            'SEO is a long game. Expect movement over months, not days. Track which pages gain visibility, update older content, and keep publishing things worth finding. The brands that rank first are usually the ones that kept going.',
          ],
        },
      ],
    },
    {
      slug: 'website-that-turns-visitors-into-customers',
      title: 'A Website That Turns Visitors Into Customers',
      category: 'Website',
      date: '2026-09-06',
      readTime: 5,
      excerpt:
        'A beautiful site that does not convert is just an expensive brochure. The design and structure choices that guide visitors to act.',
      image: px(574073),
      fallback: f4,
      alt: 'Laptop with website code open on a desk',
      body: [
        {
          h: 'Say what you do in five seconds',
          p: [
            'Visitors decide quickly. Your opening headline should state who you help and how, in plain words, with one obvious next step. If someone has to hunt for what you offer, they will leave.',
          ],
        },
        {
          h: 'Design for thumbs first',
          p: [
            'Most visitors arrive on a phone. Large tap targets, readable text, short forms and fast loading are not extras — they are the experience. Test your site on a real device every time you change it.',
          ],
        },
        {
          h: 'Remove friction from the path',
          p: [
            'Every extra field, pop-up or menu item is a chance to lose someone. Map the journey from landing to enquiry and strip out anything that does not help.',
          ],
          list: [
            'One primary call to action per page',
            'Proof near the decision: reviews, results, logos',
            'Contact options that match how people prefer to reach you',
          ],
        },
        {
          h: 'Build it to be found',
          p: [
            'A site that converts also needs to be discovered. Structure pages around the questions customers ask, write helpful headings, and keep performance high so search engines and people both enjoy the experience.',
          ],
        },
      ],
    },
    {
      slug: 'building-a-brand-identity-that-stands-out',
      title: 'Building a Brand Identity That Stands Out',
      category: 'Branding',
      date: '2026-08-28',
      readTime: 4,
      excerpt:
        'A logo is only the beginning. How voice, colour, consistency and clear values combine into a brand people recognise at a glance.',
      image: px(7661590),
      fallback: f5,
      alt: 'Brand identity and marketing strategy flat lay',
      body: [
        {
          h: 'Start with what you stand for',
          p: [
            'Strong identities grow from a clear point of view. Define what you believe, who you serve and what you refuse to compromise on. Those answers guide every visual and verbal choice that follows.',
          ],
        },
        {
          h: 'Make a small set of choices and repeat them',
          p: [
            'Recognition is built through repetition. Choose a limited palette, a pair of typefaces and a consistent tone of voice, then use them everywhere — from your website to your invoices.',
          ],
          list: [
            'A distinctive logo that works small and large',
            'Two or three core colours',
            'A voice that sounds like a person, not a policy',
          ],
        },
        {
          h: 'Consistency builds trust',
          p: [
            'When a brand looks and sounds the same across every touchpoint, customers feel they know what to expect. That predictability is quietly reassuring, and it is a big part of why people choose one business over another.',
          ],
        },
        {
          h: 'Let it evolve, carefully',
          p: [
            'Identities should grow with the business, but changes should feel like a natural next step, not a stranger arriving. Refresh with purpose, and keep the core elements people already recognise.',
          ],
        },
      ],
    },
    {
      slug: 'customer-engagement-that-keeps-people-coming-back',
      title: 'Customer Engagement That Keeps People Coming Back',
      category: 'Engagement',
      date: '2026-08-19',
      readTime: 4,
      excerpt:
        'Winning a customer is only half the work. Simple, personal habits that turn one-time buyers into loyal advocates.',
      image: px(1181738),
      fallback: f6,
      alt: 'Team discussing ideas together in a meeting',
      body: [
        {
          h: 'Listen before you broadcast',
          p: [
            'Engagement starts with attention. Read comments, answer messages quickly and notice what customers repeat. Those patterns tell you what to improve and what to celebrate.',
          ],
        },
        {
          h: 'Make it personal',
          p: [
            'People respond to messages that feel written for them. Use names, reference past purchases and tailor offers to what someone actually cares about. Small touches show that behind the brand there is a real team.',
          ],
          list: [
            'Reply to comments and messages with real answers',
            'Thank customers publicly for their feedback',
            'Share their stories, with permission',
          ],
        },
        {
          h: 'Give people a reason to return',
          p: [
            'Useful tips, early access, community moments and genuine helpfulness bring audiences back. Aim to be a brand people look forward to hearing from, not one they tolerate.',
          ],
        },
        {
          h: 'Measure the relationship',
          p: [
            'Track repeat purchases, replies, referrals and the sentiment of conversations. When those numbers climb, your engagement is working — and your customers are becoming your best marketing.',
          ],
        },
      ],
    },
  ],
}

export default blogs
