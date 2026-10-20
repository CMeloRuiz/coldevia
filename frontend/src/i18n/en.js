// ============================================================================
// English copy. Keys mirror es.js exactly.
// Written for international clients (Upwork and similar), not translated
// word for word: industry-standard wording, shorter sentences.
// ============================================================================

export const en = {
  meta: {
    title: 'ColdevIA · Custom software development',
    description:
      'ColdevIA builds websites, e-commerce stores, SaaS platforms, automation, IT infrastructure and AI agents for companies in Latin America and the United States.',
  },

  header: {
    logoAria: 'ColdevIA, go to home',
    navAria: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    contact: 'Contact',
    nav: {
      services: 'Services',
      projects: 'Work',
      about: 'About',
      pricing: 'Pricing',
    },
    currency: {
      ariaLabel: 'Currency: {name}. Change currency',
      listLabel: 'Pricing currency',
    },
    language: {
      ariaLabel: 'Language: {name}. Change language',
      listLabel: 'Site language',
    },
  },

  hero: {
    titleLine1: 'Custom software',
    titleLine2a: 'that grows',
    titleAccent: 'your',
    titleLine3: 'business',
    lead: 'Websites, e-commerce, SaaS platforms, automation and AI agents built so you sell more and operate better.',
    ctaPrimary: 'Book a free consult',
    ctaSecondary: 'See services',
    sphereAria: 'Sphere of connected dots representing a global network',
  },

  stats: {
    sectionAria: 'ColdevIA track record',
    eyebrow: 'Track record',
    intro: 'Results that back every project we take on.',
    items: {
      projects: { label: 'Projects', detail: 'delivered and running in production' },
      clients: { label: 'Clients', detail: 'across Colombia, Argentina and the United States' },
      years: { label: 'Years of experience', detail: 'building software for businesses' },
    },
  },

  why: {
    eyebrow: 'Why work with us',
    title: 'A team that understands your business before writing code',
    lead: 'Technology is the means, not the goal. What we build with you is a tool that delivers measurable results.',
    teamLink: 'Meet the team',
    featured: {
      title: 'One team, start to finish',
      text: 'The same team handles strategy, design, development and support. No middlemen, no outsourcing: you talk directly with the people building your product.',
      points: ['Strategy, design and development', 'Direct, straightforward communication', 'One owner for the whole project'],
    },
    reasons: {
      custom: {
        title: 'Built for your case',
        text: 'No templates. We pick the stack based on your business, your budget and where you want to grow.',
      },
      stages: {
        title: 'Delivered in stages',
        text: 'We work in short cycles and you see real progress every week. You always know where your project stands.',
      },
      performance: {
        title: 'Performance and security',
        text: 'Fast sites, security best practices and technical SEO from the first line of code.',
      },
      support: {
        title: 'Support after launch',
        text: 'We do not disappear at delivery: we measure, fix and keep improving as your business grows.',
      },
    },
  },

  services: {
    eyebrow: 'Services',
    title: 'Everything your business needs to run online',
    lead: 'From your first website to AI agents that answer your customers: one team for every stage of your growth.',
    allLink: 'See all services',
    includesAria: 'Included in {title}',
    moreAria: 'More about {title}',
    items: {
      web: {
        title: 'Website development',
        description:
          'Fast corporate sites and landing pages, optimized for search engines and designed to turn visitors into customers.',
        tags: ['Corporate sites', 'Landing pages', 'SEO'],
      },
      ecommerce: {
        title: 'E-commerce',
        description:
          'Online stores with payment gateways, inventory and shipping built in, so you sell every day of the year.',
        tags: ['Online payments', 'Inventory', 'Catalogs'],
      },
      saas: {
        title: 'SaaS',
        description:
          'Subscription platforms designed to scale: users, roles, recurring billing and admin dashboards.',
        tags: ['Multi-user', 'Subscriptions', 'Dashboards'],
      },
      automation: {
        title: 'Automation',
        description:
          'We connect your tools and remove repetitive work, so your team spends its time on what matters.',
        tags: ['Integrations', 'Workflows', 'Reporting'],
      },
      infrastructure: {
        title: 'IT infrastructure',
        description:
          'Servers, cloud, backups and security set up so your operation runs steadily and without surprises.',
        tags: ['Cloud', 'Security', 'Backups'],
      },
      ai: {
        title: 'AI agents for your business',
        description:
          'Smart assistants that answer customers, qualify leads and reply 24/7 using your company information.',
        tags: ['WhatsApp', '24/7 support', 'Sales'],
      },
    },
  },

  tech: {
    eyebrow: 'Technologies',
    title: 'Proven tools, chosen for each project',
    note: 'We work with modern, well-supported technologies so your product stays easy to maintain and scale over time.',
    frontendAria: 'Frontend technologies',
    backendAria: 'Backend technologies',
  },

  projects: {
    eyebrow: 'Featured work',
    title: 'Real businesses already growing with us',
    allLink: 'See all projects',
    includesLabel: 'Live today',
    roadmapLabel: 'Next stage',
    newTab: ' (opens the site in a new tab)',
    imageAlt: 'Home page of {name}',
    items: {
      gonzalez: {
        category: 'Hardware and electrical supplies',
        description: 'Online catalog and store for a tools and electrical supplies distributor.',
        includes: ['Landing page', 'Online store'],
        roadmap: ['Custom backend'],
      },
      gma: {
        category: 'Healthcare',
        description: 'Website for a medical group with a chatbot that guides patients, plus automated workflows.',
        includes: ['Landing page', 'Chatbot', 'Automation'],
        roadmap: ['Online store', 'Admin dashboard'],
      },
      spotnear: {
        category: 'Urban mobility',
        description:
          'Parking reservation platform for Buenos Aires: drivers book a spot in advance and get instant confirmation, while each parking lot manages its bookings from its own dashboard.',
        includes: ['Booking platform', 'Admin dashboard'],
        roadmap: ['Mobile app'],
      },
    },
  },

  pricing: {
    eyebrow: 'Plans and pricing',
    title: 'Pick the starting point for your project',
    lead: 'Three clear plans to get started. If your project needs something different, we put together a custom proposal.',
    from: 'From',
    cta: 'Get this plan',
    ctaAria: '{cta}: {plan}',
    noteQuestion: 'Not sure which one fits?',
    noteLink: 'Message us',
    noteRest:
      'and we will help you choose. Reference prices; switch currency from the menu. Every project is quoted based on its scope.',
    plans: {
      basico: {
        name: 'Starter plan',
        tagline: 'A professional presence to begin with.',
        features: [
          'Website with up to 5 sections',
          'Mobile-friendly design',
          'Contact form and WhatsApp',
          'Initial SEO setup',
          'Domain and hosting for 1 year',
        ],
      },
      business: {
        name: 'Business plan',
        tagline: 'The balance most clients choose.',
        badge: 'Most chosen',
        features: [
          'Site or store with up to 12 sections',
          'Self-managed admin panel',
          'Online payments or bookings',
          'CRM and email integration',
          '3 months of technical support',
        ],
      },
      profesional: {
        name: 'Professional plan',
        tagline: 'Custom solutions built to scale.',
        features: [
          'Custom web or SaaS platform',
          'Process automation',
          'Built-in AI agent',
          'Cloud infrastructure',
          '6 months of priority support',
        ],
      },
    },
  },

  steps: {
    eyebrow: 'How we work',
    title: 'Five steps, from first call to delivery',
    lead: 'A simple, transparent process: you always know what comes next, what it costs and when it will be ready.',
    items: [
      {
        title: 'First conversation',
        text: 'You tell us your idea, your goals and the context of your business. Free, no strings attached.',
      },
      { title: 'Proposal and plan', text: 'We send you clear scope, timeline and budget, broken down by stage.' },
      { title: 'Design and development', text: 'We build in short cycles and you review progress at every delivery.' },
      { title: 'Testing and launch', text: 'We check performance, security and usability before going live.' },
      { title: 'Ongoing support', text: 'We measure results, provide support and keep improving with you.' },
    ],
  },

  testimonials: {
    eyebrow: 'Testimonials',
    title: 'What the people already working with us say',
    carouselAria: 'Client testimonials',
    items: {
      t1: { quote: 'They understood the business before proposing technology. The new store doubled online sales in four months.', role: 'Sales Manager' },
      t2: { quote: 'The AI agent handles most WhatsApp enquiries. Our team can finally focus on closing deals.', role: 'Marketing Director' },
      t3: { quote: 'They migrated our entire infrastructure to the cloud without a single day of downtime, and hit every date they promised.', role: 'CTO' },
      t4: { quote: 'We went from spreadsheets to our own platform. We now have real-time data to make decisions.', role: 'Founder' },
      t5: { quote: 'Clear communication, weekly progress and a result that went beyond what we pictured at the start.', role: 'CEO' },
      t6: { quote: 'They automated invoicing and reporting. We save more than twenty hours of manual work every month.', role: 'Head of Operations' },
    },
  },

  contact: {
    eyebrow: 'Let us start',
    title: 'Tell us what you need and we will put together a proposal',
    lead: 'Leave us your details and the service you are interested in. We review your case and write back with the next steps.',
    points: [
      'We reply within 24 business hours.',
      'You get a proposal with scope and timeline, free of charge.',
      'Your details are only used to contact you.',
    ],
    fields: {
      name: { label: 'Name', placeholder: 'Your name' },
      email: { label: 'Email', placeholder: 'name@company.com' },
      phone: { label: 'Phone', placeholder: '+1 555 000 0000' },
      service: { label: 'Service you need', placeholder: 'Choose an option' },
      message: { label: 'Message', optional: '(optional)', placeholder: 'Briefly tell us what you have in mind.' },
    },
    serviceOptions: {
      web: 'Website development',
      ecommerce: 'E-commerce',
      saas: 'SaaS',
      automation: 'Automation',
      infrastructure: 'IT infrastructure',
      ai: 'AI agents',
    },
    submit: 'Send request',
    submitting: 'Sending…',
    waking: 'The server can take up to a minute to wake up. Please keep this page open.',
    legal: 'By submitting, you agree that we may contact you by email or phone to answer your request.',
    success: {
      title: 'Request sent',
      text: 'Thanks for reaching out. We will reply to the email you gave us within 24 business hours.',
      again: 'Send another request',
    },
    errors: {
      name: 'Please enter your full name.',
      email: 'Please check the email address.',
      phone: 'Enter a valid phone number, including country code.',
      service: 'Choose the service you are interested in.',
      message: 'This message is too long.',
      network: 'We could not reach the server. Check your connection and try again.',
      timeout: 'The server took too long to respond. Please try again in a moment.',
      rate: 'You have sent several requests in a row. Please wait a moment before trying again.',
      mail: 'We saved your request, but could not notify our team. If you do not hear back soon, email us at info@coldevia.com.',
      generic: 'The request could not be sent. Try again or email us at info@coldevia.com.',
    },
  },

  footer: {
    tagline: 'We build custom software for companies that want to sell more, operate better and grow with technology.',
    socialAria: 'Social media',
    services: 'Services',
    contact: 'Contact',
    countries: 'Where we operate',
    whatsapp: 'WhatsApp',
    hours: 'Monday to Friday · 8:00 to 18:00 (GMT-5)',
    rights: '© {year} ColdevIA. All rights reserved.',
    countryNames: {
      colombia: 'Colombia',
      argentina: 'Argentina',
      usa: 'United States',
    },
  },

  pages: {
    skipLink: 'Skip to content',
    comingSoonEyebrow: 'Coming soon',
    comingSoonText: 'We are putting this section together. In the meantime, see everything we do on the home page.',
    backHome: 'Back to home',
    notFoundEyebrow: 'Error 404',
    notFoundTitle: 'Page not found',
    notFoundText: 'The address you are looking for does not exist or has moved.',
    titles: {
      services: 'Services',
      projects: 'Work',
      about: 'About',
      contact: 'Contact',
    },
  },
}
