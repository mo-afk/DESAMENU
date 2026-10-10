/**
 * English — the source dictionary and the type every other language must
 * satisfy. A missing key in another locale is therefore a compile error, not a
 * string that silently disappears from the interface.
 *
 * Keys are grouped by surface, in the order the page reads top to bottom.
 * Anything longer than a sentence lives here too — the only copy that stays
 * outside this file is API content (venue demo bodies, field notes), which is
 * authored per venue in the database and falls back to English by design.
 */
export const en = {
  meta: {
    home: 'DESA Menu — Turn every menu into a premium digital experience',
    taglineDefault: 'Premium digital menu ecosystems for hospitality',
    features: 'Features — DESA Menu',
    demos: 'Live demos — DESA Menu',
    howItWorks: 'How it works — DESA Menu',
    notes: 'Field notes — DESA Menu',
    contact: 'Contact — DESA Menu',
    demoDetail: 'Live demo — DESA Menu',
    featureDetail: 'Feature — DESA Menu',
    notFound: 'Not found — DESA Menu',
  },

  common: {
    bookDemo: 'Book a Demo',
    exploreDemos: 'Explore Live Demos',
    viewDetails: 'View details',
    viewMoreDemos: 'View More Demos',
    privateWalkthrough: 'Request a Private Walkthrough',
    talkToUs: 'Talk to us',
    loading: 'Loading',
    allDemos: 'All demos',
    nextDemo: 'Next demo',
    backHome: 'Back home',
    error404: 'Error 404',
    featured: 'Featured',
    prevTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
    viewLiveMenu: 'View Live Menu',
    liveMenuSoon: 'The live menu link is coming soon',
    eyebrowIndexSeparator: ' — ',
  },

  nav: {
    features: 'Features',
    demos: 'Demos',
    howItWorks: 'How It Works',
    notes: 'Notes',
    contact: 'Contact',
    home: 'Home',
    cta: 'Book a Demo',
    status: 'Onboarding new venues',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeAria: 'DESA Menu home',
    switchLabel: 'Language',
    switchAria: 'Change language',
    tagline: 'Digital menu ecosystem',
    venues: 'Fine dining · Lounges · Cafes',
  },

  hero: {
    badge: 'DESA Menu',
    disciplines: 'Text · Video · Games · Loyalty',
    titleLine1: 'Turn every menu',
    titleLine2Pre: 'into a',
    titleLine2Accent: 'premium',
    titleLine3Pre: 'digital',
    titleLine3Accent: 'experience.',
    sub: 'DESA Menu helps restaurants, cafes and lounges replace static QR menus with interactive text menus, cinematic dish videos, a full suite of table games — Who Pays?, the Ideal Combo Spinner and the Taste & Personality Quiz — and built-in loyalty systems that elevate guest experience and increase average order value.',
    note: 'Built for modern hospitality brands that want to stand out.',
    scroll: 'Scroll — what it does',
    vertical: 'Hospitality menu ecosystem',
    pillars: ['Video Menus', 'Gamified Dining Suite', 'Loyalty Systems', 'Higher Average Order Value'],
  },

  /** Copy printed inside the hero device mockup. */
  device: {
    table: 'Table 07',
    appName: 'DESA Menu',
    venue: 'La Terrasse',
    categories: ['Starters', 'Mains', 'Desserts', 'Drinks'],
    playing: 'Playing',
    signature: "Chef's signature",
    dish: 'Seared Scallops',
    price: '€24',
    rows: [
      { name: 'Truffle Arancini', note: 'Aged parmesan · black truffle', price: '€14' },
      { name: 'Noir Spritz', note: 'Bergamot · prosecco · basil', price: '€12' },
    ],
    loyaltyName: 'DESA Loyalty',
    loyaltyProgress: '3 / 5',
    loyaltyNote: 'One more visit unlocks your',
    loyaltyReward: 'complimentary dessert',
    gameLabel: 'Table Game',
    gameName: 'Who Pays?',
    gameResult: 'P2',
    loyaltyPing: 'Loyalty +1',
    loyaltyMessage: 'Visit recorded — welcome back, Sofia.',
    aria: 'Preview of the DESA Menu guest interface: a cinematic dish video, category navigation, menu rows and an integrated loyalty card.',
  },

  value: {
    index: '01',
    eyebrow: 'What it changes',
    title: 'Four outcomes,',
    accent: 'every service.',
    tag: 'Hospitality operating layer',
    items: [
      { n: '01', title: 'More engaging ordering', desc: 'Motion, appetite-driven visuals and table-side games that make guests explore more of the menu.' },
      { n: '02', title: 'Higher guest retention', desc: 'Loyalty built into the menu itself — not bolted on as an afterthought.' },
      { n: '03', title: 'Stronger brand presentation', desc: 'Every dish presented inside your visual language, at every table.' },
      { n: '04', title: 'Smarter digital upselling', desc: 'Spinners, quizzes and recommendations placed exactly where guests make their decisions.' },
    ],
  },

  features: {
    index: '02',
    eyebrow: 'Features',
    title: 'Everything your menu',
    accent: 'needs to do.',
    intro: 'DESA Menu combines visual storytelling, smart interaction, and retention tools into one seamless hospitality experience.',
    viewDetails: 'View details',
    page: {
      index: '01',
      titlePre: 'Everything your menu needs to do —',
      titleAccent: 'in one system.',
      description: 'Interactive text menus, cinematic dish video, a full gamified dining ecosystem — Who Pays?, the Ideal Combo Spinner, the Taste & Personality Quiz — plus digital loyalty and the analytics that show what guests actually look at.',
    },
    detail: {
      backToFeatures: 'All features',
      overview: 'Overview',
      whatsIncluded: 'What is included',
      inTheNumbers: 'In the numbers',
      related: 'Related capabilities',
      explore: 'Explore the full suite',
      kindLabels: { capability: 'Capability', game: 'Table game' },
      metaSuffix: 'DESA Menu feature',
      notFoundBody: 'That capability is not part of DESA Menu. Everything we build is listed on the features page.',
      backToFeaturesLabel: 'Back to Features',
      nextLabel: 'Next:',
      prevLabel: 'Previous:',
      partOfSuite: 'Part of the suite',
      suiteBody: 'DESA Menu ships as one system: text and video menus, the gamified dining ecosystem and digital loyalty cards.',
      allCapabilities: 'All capabilities',
      endOfPage: 'End of page',
      backToWhere: 'Back to where you were.',
    },
  },

  games: {
    index: '03',
    eyebrow: 'Gamified dining',
    title: 'The gamified',
    accent: 'dining ecosystem.',
    intro: 'Three interactive experiences ship with every DESA Menu — plus custom table games and loyalty micro-interactions built around your brand. Pick one to see it at the table.',
    tablist: 'Gamified dining experiences',
    seeLive: 'See it live',
    livePreview: 'Live preview',
    guestInterface: 'Guest interface — phone, no download',
    wholeSuite: 'The whole suite',
    statsNote: 'Engagement figures measured across lounge and bar deployments, thirty days post-launch.',
    stats: [
      { value: '1 in 3', label: 'Tables play a table game' },
      { value: '23 min', label: 'Longer average dwell time' },
      { value: '+41%', label: 'Second-round reorders' },
    ],
    page: {
      index: '03',
      titlePre: 'The gamified dining ecosystem,',
      titleAccent: 'at the table.',
      description: 'Who Pays?, the Ideal Combo Spinner and the Taste & Personality Quiz ship with every deployment — and the layer underneath stays configurable for the games and loyalty moments only your venue would invent.',
    },
  },

  demos: {
    index: '04',
    eyebrow: 'Live demos',
    title: 'See DESA Menu',
    accent: 'in action.',
    intro: 'Real venues, real menus, live right now — fine dining, lounges and cafes running DESA Menu across nine countries.',
    live: 'Live demo',
    filterAll: 'All',
    gridView: 'Grid view',
    listView: 'List view',
    empty: 'No demos in this venue type yet.',
    errorPrefix: 'Could not load demos: ',
    page: {
      index: '03',
      titlePre: 'See DESA Menu',
      titleAccent: 'in action.',
      description: 'Real venues, real menus, live right now — fine dining, lounges, cafes and hotels across nine countries. Filter by venue type, then open a demo for the full story.',
    },
    detail: {
      venue: 'Venue',
      liveSince: 'Live since',
      deployment: 'Deployment',
      tableGames: 'Table games',
      onboarding: 'Onboarding',
      gamesLiveSuffix: ' live',
      theVenue: 'The venue',
      runningHere: 'Running in this venue',
      gamified: 'Gamified dining ecosystem',
      exploreSuite: 'Explore the full suite',
      results: 'Service results',
      wantThis: 'Want this in your venue?',
      next: 'Next demo',
      notFound: 'Demo not found.',
    },
    stand: {
      kicker: 'Scan for the menu',
      onTheTable: 'On the table',
      title: 'Every demo ships with',
      titleAccent: 'its own stand.',
      body: 'Each deployment leaves the screen and lands on the table: a stand carrying a QR built around the venue, scanning straight into the digital menu — no app, no PDF. The official DESA Menu mark sits at the centre of the code and on the card itself, so the first thing a guest sees is your brand.',
      points: ['Branded QR centre', 'Table-numbered stands', 'Kept in step with your menu'],
      venueTitle: 'The stand guests',
      venueTitleAccent: 'meet first.',
      venueBody: 'Every table here carries a branded stand. The official DESA Menu mark sits at the centre of the QR and on the card, so the scan opens into the menu under your name — no app to install, nothing to download.',
      venuePoints: ['Branded QR centre', 'Table-numbered', 'Live menu, no reprints'],
      ariaTemplate: 'DESA Menu table stand for {venue}: a branded QR code, a scan-for-the-menu prompt and the DESA Menu logo.',
    },
  },

  comparison: {
    index: '05',
    eyebrow: 'Positioning',
    title: 'Beyond the',
    accent: 'QR code.',
    intro: 'Most digital menus stop at access. DESA Menu turns the menu into an experience — combining design, motion, interaction, and retention into a system that feels as refined as the venue itself.',
    before: 'Before',
    after: 'After',
    traditionalTitle: 'Traditional QR / PDF Menus',
    desaTitle: 'DESA Menu',
    versus: 'vs',
    traditional: ['Static', 'Forgettable', 'Low engagement', 'No emotional pull', 'No retention layer'],
    desa: ['Interactive', 'Premium branded', 'Visually persuasive', 'Built for engagement', 'Loyalty-enabled'],
    closingPre: 'This is not just a menu.',
    closingAccent: 'It is a modern hospitality touchpoint.',
  },

  process: {
    index: '06',
    eyebrow: 'How it works',
    title: 'Concept to guest interaction,',
    accent: 'three steps.',
    stepLabel: 'Step',
    steps: [
      { title: 'We design your menu ecosystem', desc: 'We structure your food, drinks, visuals, and brand into a refined digital experience tailored to your venue.' },
      { title: 'We launch your interactive experience', desc: 'Your menu goes live with text navigation, optional video dishes, engagement features, and loyalty integration.' },
      { title: 'Your guests scan, explore, and engage', desc: 'Customers discover dishes more visually, interact with the experience, and return through built-in retention tools.' },
    ],
    footerPoints: ['Fast onboarding.', 'Premium execution.', 'Built around your service flow.'],
    page: {
      index: '02',
      titlePre: 'From concept to guest interaction',
      titleAccent: 'in three steps.',
      description: "Five weeks for a single venue, six to ten for a group. One shoot day on your pass, your team's sign-off before anything goes live, and a performance review thirty days after launch.",
    },
  },

  useCases: {
    index: '07',
    eyebrow: 'Use cases',
    title: 'Designed for hospitality brands',
    accent: 'that care how they are experienced.',
    builtFor: 'Built for',
    items: [
      { title: 'Restaurants', desc: 'Present dishes with more impact and increase table-side upselling.' },
      { title: 'Cafes', desc: 'Create a cleaner, faster, more branded customer journey.' },
      { title: 'Lounges', desc: 'Add atmosphere, interactivity, and memorable brand touchpoints.' },
      { title: 'Hotels & Hospitality Concepts', desc: 'Deliver a modern digital service layer that reflects premium standards.' },
    ],
  },

  faq: {
    index: '08',
    eyebrow: 'Questions',
    title: 'Before you ask —',
    accent: 'the short answers.',
    items: [
      {
        q: 'Do guests need to download an app?',
        a: 'No. Guests scan the QR on the table and the menu opens in their browser. Nothing to install, nothing to update, no account to create.',
      },
      {
        q: 'How long does onboarding take?',
        a: 'Five weeks for a single venue and six to ten for a group. That includes menu structuring, one shoot day on your pass, your sign-off, and a performance review thirty days after launch.',
      },
      {
        q: 'Can we keep our existing QR codes and printed material?',
        a: 'Yes. DESA Menu opens from any QR that points at your menu URL, so existing stands and print can stay in service. We supply branded stands and table numbers when you want to refresh them.',
      },
      {
        q: 'Do we have to use video menus?',
        a: 'No. Video is a layer, not a requirement — many venues launch with text menus and games first and add dish film to the plates that sell themselves hardest.',
      },
      {
        q: 'How does loyalty work without an app?',
        a: 'Loyalty is attached to the guest session inside the menu and, where a venue wants it, to a phone number captured at the table. Streaks, points on reorder and milestone rewards all run without a download.',
      },
      {
        q: 'What do we need to provide?',
        a: 'Your menu content and structure, your brand assets, and access to the venue for the shoot day. We handle the structure, the copy, the film and the build.',
      },
    ],
  },

  cta: {
    eyebrow: 'Next step — see it with your menu',
    title: 'Ready to upgrade the way guests',
    accent: 'order?',
    sub: "Let's build a digital menu experience that looks better, sells better, and keeps customers coming back.",
    proof: ['Video Menus', 'Text Menus', 'Gamified Dining Suite', 'Loyalty Cards', 'Branded UI'],
  },

  contact: {
    index: '07',
    eyebrow: 'Contact',
    title: 'Request a',
    accent: 'custom demo.',
    intro: "Tell us about your venue and we'll show you how DESA Menu can be tailored to your guest experience.",
    channelLabels: { email: 'Email', whatsapp: 'WhatsApp', instagram: 'Instagram', tiktok: 'TikTok', phone: 'Phone' },
    channelValues: { whatsapp: 'Start a conversation' },
    form: {
      name: 'Name *',
      business: 'Venue / business *',
      venueType: 'Venue type *',
      email: 'Email *',
      phone: 'Phone (optional)',
      message: 'Tell us about your menu (optional)',
      chooseVenue: 'Choose a venue type',
      messageLabel: 'What would you like to show on your menu?',
      messagePlaceholder: 'Signature dishes, signature cocktails, daily specials, loyalty programme…',
      noSpam: 'No spam, no obligation — just a tailored walkthrough.',
      submitCta: 'Request Demo',
      submit: 'Request my demo',
      sending: 'Sending',
      /* Inline confirmation shown right where the form was submitted. */
      successInline: 'Your request has been received! We will contact you shortly.',
      successTitle: 'Request received.',
      successBody: 'Thanks {name} — our team will get back to you within one business day with a tailored DESA Menu walkthrough for your venue.',
      reference: 'Reference',
      sendAnother: 'Send another request',
      venueTypes: [
        'Fine Dining Restaurant',
        'Cafe / Coffee Shop',
        'Lounge / Bar',
        'Hotel / Hospitality Concept',
        'Beach Club / Rooftop',
        'Other',
      ],
      errors: {
        name: 'Please enter your name.',
        business: 'Please enter your business name.',
        venueType: 'Please choose a venue type.',
        email: 'Please enter a valid email.',
        message: 'Tell us a little more (10+ characters).',
        generic: 'Something went wrong. Please try again.',
      },
    },
    page: {
      index: '05',
      titlePre: 'Let us build',
      titleAccent: 'your walkthrough.',
      description: 'Tell us about your venue and your menu. We will come back within one business day with a tailored walkthrough, a structure proposal and a timeline.',
    },
  },

  /** The standalone /contact page: a four-step qualification form. */
  contactPage: {
    index: '05',
    eyebrow: 'Contact',
    intro: 'Five fields, no account, no commitment. Leave your name and a number we can reach you on, and we will come back within one business day with a walkthrough built around your menu.',
    /* The single contact form — name and phone are the only requirements. */
    name: 'Full name *',
    phone: 'Phone number *',
    email: 'Email address (optional)',
    venue: 'Establishment / restaurant name (optional)',
    message: 'Message (optional)',
    messagePlaceholder: 'What would you like to show on your menu? Anything else we should know.',
    privacy: 'No spam, no obligation — we reply within one business day.',
    submit: 'Send request',
    sending: 'Sending',
    errors: {
      name: 'Please enter your name.',
      phone: 'Please enter a phone number we can reach you on.',
      email: 'Please enter a valid email address, or leave the field empty.',
      generic: 'Something went wrong. Please try again.',
    },
    sidebar: {
      newBusiness: 'New business',
      preferToTalk: 'Prefer to talk?',
      whereWeOperate: 'Deployment & presence',
      locations: [
        'On-site · Installation & deployment at your venue',
        'Remote · Cloud configuration & 24/7 support',
        'Coverage · Morocco, MENA & international',
      ],
      responseTime: 'Response time',
      responseValue: 'Under 24 hours',
      support: 'Support',
    },
  },

  notes: {
    index: '04',
    eyebrow: 'Field notes',
    title: 'Notes from the pass.',
    description: 'What we learn about menu design, guest behaviour and hospitality technology while deploying DESA Menu in real venues.',
    emptyCategory: 'No notes in this category yet.',
    page: {
      titlePre: 'Field notes from',
      titleAccent: 'the floor.',
      description: 'What we learn filming dishes, rebuilding menus and watching guests order — practical notes from 120+ hospitality deployments.',
    },
    filterAll: 'All',
    ctaTitle: 'Want this thinking in your venue?',
    ctaBody: 'Tell us about your menu. We reply within one business day.',
    ctaButton: 'Book a demo',
    keepReading: 'Keep reading',
    read: 'Read',
    readNote: 'Read note',
    backToNotes: 'All notes',
    empty: 'No notes published yet.',
    errorPrefix: 'Could not load notes: ',
    notFound: 'Note not found.',
    loadError: 'Could not load this note',
    minRead: 'min read',
    minShort: 'min',
    featured: 'Featured',
    post: {
      index: '04',
      titlePre: 'Notes from',
      titleAccent: 'the pass.',
      description: 'Essays on menu psychology, hospitality design and what actually changes guest behaviour at the table.',
    },
  },

  footer: {
    about: 'A premium digital menu ecosystem for hospitality. Interactive text menus, cinematic dish video, a full gamified dining ecosystem and digital loyalty cards — built for restaurants, cafes, lounges and hotels.',
    newsletterLabel: 'The Service Note — monthly menu insights',
    newsletterPlaceholder: 'your@venue.com',
    newsletterDone: 'You are in. First issue lands soon.',
    newsletterError: 'Please enter a valid email.',
    subscribeAria: 'Subscribe',
    exploreTitle: 'Explore',
    productTitle: 'The product',
    contactTitle: 'Contact',
    explore: { features: 'Features', demos: 'Live demos', howItWorks: 'How it works', notes: 'Notes', contact: 'Book a demo' },
    email: 'Email',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    productItems: [
      { title: 'Text & video menus', note: 'Interactive dish cards' },
      { title: 'Gamified dining suite', note: 'Who Pays? · Combo Spinner · Taste Quiz' },
      { title: 'Digital loyalty cards', note: 'Retention built in' },
    ],
    legal: '© 2026 DESA Menu — Premium digital menu ecosystems for hospitality',
    segments: 'Fine dining · Lounges · Cafes · Hotels',
    poweredBy: 'Powered by',
    agency: 'DESA Agency',
    marquee: ['DESA Menu', 'Video menus', 'Who Pays?', 'Ideal Combo Spinner', 'Taste & Personality Quiz', 'Loyalty cards', 'Live demos'],
  },

  marquee: {
    venues: ['Fine Dining', 'Cocktail Bars', 'Specialty Cafés', 'Lounges', 'Boutique Hotels', 'Beach Clubs', 'Rooftop Bars', 'Brunch Spots'],
    aria: 'Venue types using DESA Menu',
  },

  /** Labels printed inside the mock panels on feature cards and tabs. */
  panels: {
    cinematic: 'Cinematic dish preview',
    loyaltyName: 'DESA Loyalty',
    loyaltyProgress: '3 / 5',
    whoPays: 'Who Pays?',
    billRoulette: 'Bill roulette',
    seatYou: 'You',
    landingOn: 'Landing on',
    coversRound: '— Sam covers the round',
    spinner: 'Spin',
    idealCombo: 'Ideal combo',
    comboPair: 'Truffle risotto',
    comboPairPlus: '+',
    comboPairSecond: 'Amber sour',
    comboCaveat: 'Combo 7 of 24 — 2 items, both high margin',
    tasteTitle: 'Taste & personality',
    tasteProgress: '3 / 4',
    tasteQuestion: 'How do you like to start the evening?',
    tasteAnswers: ['Bright & citrusy', 'Rich & smoky', 'Something sweet'],
    tasteResult: 'Curated for Sam — 3 plates, 1 cocktail',
    microChips: [
      'Loyalty streaks',
      'Spin-to-unlock rewards',
      'Points on reorder',
      'Birthday bonuses',
      'Table leaderboards',
      'Badge hunts',
      'Refer-a-friend codes',
      'Seasonal campaigns',
    ],
  },

  notFound: {
    title: 'Lost',
    body: 'This page left the pass and never came back. Let us get you somewhere better.',
    home: 'Home',
    demos: 'Live demos',
  },

  /** Deep copy for the eight feature entries, keyed by slug.
   *  Fields left out fall back to the English entry in `lib/features.ts`; every
   *  locale now supplies all of them, so the fallback is a safety net rather
   *  than something a visitor is expected to see. */
  content: {
    features: {} as Record<
      string,
      {
        title?: string;
        short?: string;
        tagline?: string;
        paragraphs?: string[];
        capabilities?: string[];
        bullets?: string[];
        stats?: { value: string; label: string }[];
        kindLabel?: string;
      }
    >,
  },
};

/**
 * The dictionary shape every locale must implement.
 *
 * Deliberately inferred rather than `as const`: literal types would demand that
 * French contain the string "Features". Inferred types keep the key structure
 * exactly as written while widening every value to `string` and every list to a
 * mutable array — so a missing or misspelled key in another locale is a compile
 * error, not a string that quietly disappears from the interface.
 */
export type Dict = typeof en;
