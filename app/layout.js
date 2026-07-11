import './globals.css';

const SITE_URL = 'https://thamodharan.textmateai.online';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Thamodharan — Full-Stack Developer | Web & Mobile Apps',
    template: '%s | Thamodharan'
  },
  description:
    'Thamodharan is a full-stack developer who builds web and mobile applications using React.js, Next.js, React Native, Node.js, and Java. Available for freelance and professional projects.',
  keywords: [
    'Thamodharan',
    'full-stack developer',
    'React developer',
    'Next.js developer',
    'React Native developer',
    'mobile app developer',
    'web developer India',
    'freelance developer',
    'Node.js developer',
    'MERN stack developer',
    'software engineer India'
  ],
  authors: [{ name: 'Thamodharan', url: SITE_URL }],
  creator: 'Thamodharan',
  publisher: 'Thamodharan',
  applicationName: 'Thamodharan Portfolio',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Thamodharan — Full-Stack Developer | Web & Mobile Apps',
    description:
      'I build and ship full-stack software — web, mobile, and everything in between. React, Next.js, React Native, Node.js, Java.',
    url: SITE_URL,
    siteName: 'Thamodharan Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Thamodharan — Full-Stack Developer'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thamodharan — Full-Stack Developer | Web & Mobile Apps',
    description:
      'I build and ship full-stack software — web, mobile, and everything in between.',
    images: ['/og-image.jpg']
  },
  verification: {
    google: '9zC34fSpgyMnwF8GUffEfNrquEFpQy9s4Bbg8fO726U'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Thamodharan',
      url: SITE_URL,
      jobTitle: 'Full-Stack Developer',
      description:
        'Full-stack developer specializing in React.js, Next.js, React Native, Node.js, Express.js, and Java. Builds web and mobile applications for clients and personal projects.',
      email: 'thamodharangp@gmail.com',
      telephone: '+916381893190',
      sameAs: [
        'https://github.com/thamodharangm',
        'https://thamodharangm.github.io/Portfolio/'
      ],
      knowsAbout: [
        'React.js',
        'Next.js',
        'React Native',
        'Node.js',
        'Express.js',
        'Java',
        'Web Development',
        'Mobile App Development',
        'REST APIs',
        'DevOps'
      ],
      offers: {
        '@type': 'Offer',
        description:
          'Freelance full-stack web and mobile development services including React, Next.js, React Native, and Node.js'
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Thamodharan Portfolio',
      description: 'Portfolio of Thamodharan, a full-stack developer',
      author: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-US',
      sameAs: 'https://thamodharangm.github.io/Portfolio/'
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: 'Thamodharan — Full-Stack Developer Portfolio',
      about: { '@id': `${SITE_URL}/#person` },
      mainEntity: { '@id': `${SITE_URL}/#person` }
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#projects`,
      name: "Thamodharan's Projects",
      description: 'Selected software projects built by Thamodharan',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Catchify',
            description: 'Music app built by Thamodharan',
            url: 'https://thamodharangm.github.io/catchify/',
            applicationCategory: 'MusicApplication',
            author: { '@id': `${SITE_URL}/#person` }
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Textmate AI',
            description: 'AI writing assistant built by Thamodharan',
            url: 'https://textmateai.online',
            applicationCategory: 'BusinessApplication',
            author: { '@id': `${SITE_URL}/#person` }
          }
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'SoftwareApplication',
            name: 'AMR Battery Shop',
            description: 'POS and billing system built by Thamodharan',
            url: 'https://billing.hazzino.com/index',
            applicationCategory: 'BusinessApplication',
            author: { '@id': `${SITE_URL}/#person` }
          }
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Rentaround US',
            description: 'Car rental platform built by Thamodharan',
            url: 'https://rentaround.hazzino.com/',
            applicationCategory: 'BusinessApplication',
            author: { '@id': `${SITE_URL}/#person` }
          }
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Thamodharan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Thamodharan is a full-stack developer who builds web and mobile applications using React.js, Next.js, React Native, Node.js, Express.js, and Java. He ships pragmatic software with a focus on clean UX and scalable engineering.'
          }
        },
        {
          '@type': 'Question',
          name: 'What does Thamodharan build?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Thamodharan builds full-stack web apps with React and Next.js, mobile apps with React Native (Expo and CLI), backend REST APIs with Node.js and Express.js, and deploys on platforms like Vercel, Render, and BigRock.'
          }
        },
        {
          '@type': 'Question',
          name: 'How can I contact Thamodharan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can reach Thamodharan by email at thamodharangp@gmail.com or by phone at +91 63818 93190.'
          }
        },
        {
          '@type': 'Question',
          name: 'What projects has Thamodharan built?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Thamodharan has built Catchify (a music app), Textmate AI (an AI writing assistant), AMR Battery Shop (a POS and billing system), and Rentaround US (a car rental platform).'
          }
        },
        {
          '@type': 'Question',
          name: 'Is Thamodharan available for freelance work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Thamodharan is available for freelance and professional projects. You can reach him at thamodharangp@gmail.com to discuss your project.'
          }
        }
      ]
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="starfield" id="starfield"></div>
        {/* AEO: Machine-readable content for AI engines and crawlers */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap'
          }}
        >
          <h1>Thamodharan — Full-Stack Developer</h1>
          <p>
            Thamodharan is a full-stack developer who builds web and mobile apps using React.js,
            Next.js, React Native, Node.js, Express.js, and Java. Available for freelance projects.
          </p>
          <section>
            <h2>About Thamodharan</h2>
            <p>
              Thamodharan builds and ships full-stack software quickly, with a focus on clean UX
              and scalable engineering. He designs, builds, and iterates on web and mobile products
              with Java and the MERN stack.
            </p>
          </section>
          <section>
            <h2>Projects by Thamodharan</h2>
            <ul>
              <li>Catchify — Music app</li>
              <li>Textmate AI — AI writing assistant at textmateai.online</li>
              <li>AMR Battery Shop — POS and billing system</li>
              <li>Rentaround US — Car rental platform</li>
            </ul>
          </section>
          <section>
            <h2>Skills and Technologies</h2>
            <p>
              Web: React.js, Next.js. Mobile: React Native (Expo and CLI). Backend: Node.js,
              Express.js, REST APIs. DevOps: Render, Vercel, BigRock.
            </p>
          </section>
          <section>
            <h2>Contact Thamodharan</h2>
            <address>
              Email: thamodharangp@gmail.com. Phone: +91 63818 93190.
            </address>
          </section>
        </div>
        {children}
      </body>
    </html>
  );
}
