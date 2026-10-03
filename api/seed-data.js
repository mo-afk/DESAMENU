// Bundled seed content for DG Agency.
// API routes try Supabase first and fall back to this data when the DB is unreachable,
// so the site stays fully functional in every environment.

export const projects = [
  {
    id: 1,
    slug: 'noir-atelier',
    title: 'Noir Atelier',
    client: 'Noir Atelier',
    category: 'Branding',
    year: 2026,
    tagline: 'A Parisian fashion house reborn as a digital-first luxury brand.',
    description: "Noir Atelier had heritage, craft and a loyal clientele - but an identity stuck in 2009 and a website that leaked high-intent traffic. We rebuilt the brand from the monogram up: a sharper wordmark, a cinematic art direction system, and a flagship e-commerce experience.\n\nThe new identity pairs brutalist typography with couture restraint - oversized serif headlines, razor-thin rules, and product photography shot like editorial. Every touchpoint, from tissue paper to transactional email, was redesigned in one 10-week sprint.\n\nLaunch week broke the brand's single-day revenue record twice. Wholesale buyers who had passed for years came back within a quarter.",
    image_url: '/images/work-noir.jpg',
    services: ['Brand strategy', 'Visual identity', 'Art direction', 'E-commerce design', 'Development'],
    metrics: [
      { value: '212%', label: 'Lift in online revenue in 6 months' },
      { value: '3.4x', label: 'Increase in average order value' },
      { value: '48', label: 'Press features in launch quarter' }
    ],
    featured: true,
    timeline: '10 weeks'
  },
  {
    id: 2,
    slug: 'ledgerline-fintech',
    title: 'Ledgerline',
    client: 'Ledgerline',
    category: 'Web',
    year: 2026,
    tagline: 'A fintech platform that turned compliance into a conversion engine.',
    description: "Ledgerline's product was best-in-class. Its website was a PDF with a nav bar. Demo requests were flat while competitors with weaker products out-converted them 4 to 1.\n\nWe rebuilt the marketing site around one insight: CFOs do not buy features, they buy Fridays without reconciliation hell. Interactive calculators, live product sandboxes and proof-led storytelling replaced the feature grid.\n\nThe new site paid for itself in 11 days. Pipeline from organic search tripled within two quarters, and the sales team finally stopped apologizing for the URL.",
    image_url: '/images/work-ledgerline.jpg',
    services: ['UX research', 'Web design', 'Creative development', 'CRO program', 'Analytics'],
    metrics: [
      { value: '4.1x', label: 'More demo requests per month' },
      { value: '-38%', label: 'Drop in cost per qualified lead' },
      { value: '11', label: 'Days to full payback on the project' }
    ],
    featured: true,
    timeline: '12 weeks'
  },
  {
    id: 3,
    slug: 'kinetic-velocity',
    title: 'Kinetic Velocity',
    client: 'Kinetic',
    category: 'Campaigns',
    year: 2025,
    tagline: 'A launch campaign that sold out 40,000 pairs in 72 hours.',
    description: "Kinetic's Velocity One was a genuine innovation - a carbon-plated daily trainer at half the price of the incumbents. But innovation does not sell itself; attention does.\n\nWe built the launch around a 72-hour drop window: teaser films, a live countdown experience, athlete seeding and a city-by-city midnight run series. Scarcity was real, not manufactured - one production run, one window.\n\nForty thousand pairs sold out in 72 hours. The waitlist for run two hit 190,000 and gave Kinetic leverage to 3x wholesale distribution.",
    image_url: '/images/work-kinetic.jpg',
    services: ['Campaign concept', 'Film direction', 'Social systems', 'Launch site', 'OOH'],
    metrics: [
      { value: '72hrs', label: 'To sell out 40,000 pairs' },
      { value: '190k', label: 'Waitlist signups for run two' },
      { value: '14M', label: 'Organic campaign impressions' }
    ],
    featured: true,
    timeline: '6 weeks'
  },
  {
    id: 4,
    slug: 'maison-verre',
    title: 'Maison Verre',
    client: 'Maison Verre',
    category: 'Branding',
    year: 2025,
    tagline: 'Minimal skincare with a maximal point of view.',
    description: "The skincare shelf is a sea of beige sameness. Maison Verre had better formulas and a glass-packaging story nobody could see through generic branding.\n\nWe gave the brand its edge back: a stark black-and-bone identity, ingredient-led naming, and packaging designed to be photographed. The DTC site was rebuilt around routines, not SKUs - lifting bundles over single units.\n\nSephora came calling within five months of relaunch. DTC revenue doubled while ad spend stayed flat.",
    image_url: '/images/work-verre.jpg',
    services: ['Naming', 'Visual identity', 'Packaging', 'DTC website', 'Content direction'],
    metrics: [
      { value: '2x', label: 'DTC revenue at flat ad spend' },
      { value: '+67%', label: 'Bundle attach rate' },
      { value: 'Sephora', label: 'National retail deal in 5 months' }
    ],
    featured: true,
    timeline: '8 weeks'
  },
  {
    id: 5,
    slug: 'velvet-hour',
    title: 'Velvet Hour',
    client: 'Velvet Hour',
    category: 'Campaigns',
    year: 2024,
    tagline: 'A nightlife brand that became the night itself.',
    description: "Velvet Hour threw the best parties in the city and had the worst brand in the group chat. Flyers, guest lists and a MySpace-era site were holding back a promoter ready to go national.\n\nWe built a full campaign identity: posters that became collectibles, a drop-based ticketing experience, and a content system that made every night feel like the one you missed. FOMO, systematized.\n\nThe tour sold out 11 of 12 cities. Sponsors went from asking for free tables to paying six figures for naming rights.",
    image_url: '/images/work-velvet.jpg',
    services: ['Campaign identity', 'Poster systems', 'Ticketing UX', 'Social content', 'Sponsor decks'],
    metrics: [
      { value: '11/12', label: 'Tour dates sold out' },
      { value: '6 figs', label: 'Sponsor deals unlocked' },
      { value: '310k', label: 'New social followers in one season' }
    ],
    featured: false,
    timeline: '5 weeks'
  },
  {
    id: 6,
    slug: 'forma-architects',
    title: 'Forma Architects',
    client: 'Forma Studio',
    category: 'Web',
    year: 2024,
    tagline: 'An architecture portfolio engineered to win commissions.',
    description: "Forma's buildings won awards; their website won bounce rates. Project imagery was buried three clicks deep in a template that made concrete look cheap.\n\nWe designed a portfolio experience worthy of the work: full-bleed case studies, drawing-to-building narratives, and a private client area for bids and planning docs. The site now does the first meeting before the first meeting.\n\nQualified commission inquiries tripled. Two landmark projects credited the website as the reason Forma made the shortlist.",
    image_url: '/images/work-forma.jpg',
    services: ['Web design', 'Development', 'CMS', 'SEO', 'Client portal'],
    metrics: [
      { value: '3x', label: 'Qualified commission inquiries' },
      { value: '2', label: 'Landmark wins credited to the site' },
      { value: '0.9s', label: 'Median page load, globally' }
    ],
    featured: false,
    timeline: '9 weeks'
  },
  {
    id: 7,
    slug: 'pulse-fitness',
    title: 'Pulse Fitness',
    client: 'Pulse',
    category: 'Web',
    year: 2025,
    tagline: 'From class bookings to a fitness platform with 200k members.',
    description: "Pulse had packed studios and an app with a 2.1-star rating. Booking took nine taps, class packs expired silently, and support was drowning in password resets.\n\nWe redesigned the full digital experience: three-tap booking, transparent memberships, and a streak system that turned attendance into a game members refused to lose. The marketing site was rebuilt around transformation stories, not timetables.\n\nApp rating climbed to 4.8 stars. Member churn dropped by a third and digital now drives 60% of new joins.",
    image_url: '/images/work-pulse.jpg',
    services: ['Product UX', 'App redesign', 'Marketing site', 'Lifecycle emails', 'CRO'],
    metrics: [
      { value: '4.8', label: 'App Store rating, up from 2.1' },
      { value: '-33%', label: 'Member churn in two quarters' },
      { value: '60%', label: 'Of new joins now via digital' }
    ],
    featured: false,
    timeline: '12 weeks'
  },
  {
    id: 8,
    slug: 'kilo-coffee',
    title: 'Kilo & Co.',
    client: 'Kilo & Co.',
    category: 'Branding',
    year: 2023,
    tagline: 'A roastery brand bold enough for the specialty shelf.',
    description: "Kilo roasted exceptional coffee and packaged it like a commodity. On a shelf of forty bags, theirs was the one nobody remembered.\n\nWe built a weighty, confident identity - literally: a kilo-inspired mark, origin-led color coding, and bags designed to stand out at twelve feet. Subscriptions got their own ritual-grade unboxing.\n\nWholesale accounts grew 5x in a year. The subscription base now funds an entire second roastery.",
    image_url: '/images/work-kilo.jpg',
    services: ['Brand strategy', 'Packaging', 'Retail design', 'Subscriptions UX', 'Wholesale kit'],
    metrics: [
      { value: '5x', label: 'Wholesale accounts in 12 months' },
      { value: '12k', label: 'Active coffee subscribers' },
      { value: '+84%', label: 'Shelf standout in eye-tracking tests' }
    ],
    featured: false,
    timeline: '7 weeks'
  }
];

export const testimonials = [
  {
    id: 1,
    quote: 'DG rebuilt our brand and our pipeline in the same quarter. Revenue doubled while ad spend stayed flat - I still show their decks to other founders.',
    author: 'Camille Roux',
    role: 'Founder',
    company: 'Maison Verre',
    rating: 5,
    project_slug: 'maison-verre'
  },
  {
    id: 2,
    quote: 'The new site paid for itself in eleven days. Our sales team finally sends prospects to our URL instead of apologizing for it.',
    author: 'Marcus Webb',
    role: 'CEO',
    company: 'Ledgerline',
    rating: 5,
    project_slug: 'ledgerline-fintech'
  },
  {
    id: 3,
    quote: 'They think like owners. Every creative decision came with a number attached - and the numbers kept coming true.',
    author: 'Dana Cole',
    role: 'CMO',
    company: 'Kinetic',
    rating: 5,
    project_slug: 'kinetic-velocity'
  },
  {
    id: 4,
    quote: 'Seniors only is real. The people in the pitch were the people on the tools, every week, for twelve weeks. Unheard of.',
    author: 'Priya Nair',
    role: 'VP Product',
    company: 'Pulse',
    rating: 5,
    project_slug: 'pulse-fitness'
  },
  {
    id: 5,
    quote: 'Our tour sold out eleven of twelve cities. DG turned our parties into a brand sponsors fight over.',
    author: 'Leo Fontaine',
    role: 'Director',
    company: 'Velvet Hour',
    rating: 5,
    project_slug: 'velvet-hour'
  }
];

export const team = [
  { id: 1, name: 'June Park', role: 'Founding Partner, Creative', department: 'Creative', bio: 'Ex-Pentagram. Built identity systems for 60+ brands. Believes kerning is a moral issue.', initials: 'JP', years: 10 },
  { id: 2, name: 'Dario Grimm', role: 'Founding Partner, Strategy', department: 'Strategy', bio: 'Ex-brand consultant turned growth skeptic turned growth believer. Owns every metric we promise.', initials: 'DG', years: 10 },
  { id: 3, name: 'Amara Okafor', role: 'Head of Engineering', department: 'Technology', bio: 'Ships award-winning sites that load in under a second. Allergic to page builders and jank.', initials: 'AO', years: 7 },
  { id: 4, name: 'Tomas Silva', role: 'Creative Director, Campaigns', department: 'Creative', bio: 'Film-school dropout with three D&AD pencils. Makes launches feel like cultural events.', initials: 'TS', years: 6 },
  { id: 5, name: 'Yuki Tanaka', role: 'Head of Growth', department: 'Growth', bio: 'Data scientist with taste. Runs experimentation programs that have added $200M+ in client revenue.', initials: 'YT', years: 5 },
  { id: 6, name: 'Sofia Marchetti', role: 'Design Director, Brand', department: 'Creative', bio: 'Typography obsessive. Her identity systems have survived three client acquisitions intact.', initials: 'SM', years: 8 }
];

export const posts = [
  {
    id: 1,
    slug: 'the-72-hour-sellout-playbook',
    title: 'The 72-Hour Sellout Playbook',
    excerpt: 'How we sold 40,000 pairs of trainers in three days - and the exact launch sequence you can steal, from seeding to countdown to restock.',
    body: "Everyone wants a sellout. Almost nobody engineers one. The Kinetic Velocity launch sold 40,000 pairs in 72 hours - not because of luck, but because every hour of the window was choreographed like a heist.\n\nIt started six weeks out with seeding: 200 pairs to runners with audiences between 10k and 100k followers. Not celebrities - credible people whose recommendation actually moves product. No posting requirements, no scripts. Just the shoes, early.\n\nWeek two brought the film: a 90-second launch spot cut into 40+ assets across every ratio that matters. Paid spend stayed dark until day three of the window - all early momentum was earned, which meant the algorithm worked for us instead of against us.\n\nThe window itself ran on manufactured rhythm: midnight city runs, hourly stock updates, and a live countdown that made waiting feel like participation. Scarcity was real - one production run - so urgency never felt like a trick.\n\nThe lesson most brands miss: a drop is not a discount with better lighting. It is a story with a deadline. Give people a reason to care on day one, a reason to hurry on day two, and a reason to forgive you on day three - the waitlist for run two hit 190,000 because missing out felt like joining something.",
    category: 'Growth',
    author: 'Tomas Silva',
    author_role: 'Creative Director, Campaigns',
    image_url: '/images/work-kinetic.jpg',
    read_time: 8,
    featured: true,
    published_at: '2026-08-14T10:00:00Z'
  },
  {
    id: 2,
    slug: 'rebrand-without-the-cringe',
    title: 'How to Rebrand Without the Cringe',
    excerpt: 'Five rules for evolving an identity without alienating the customers who got you here - learned across 60+ rebrands.',
    body: "Every rebrand announcement attracts the same comment: it was better before. Sometimes the crowd is right. Usually, the brand changed the wrong things for the wrong reasons - chasing trends instead of fixing problems.\n\nRule one: audit before you sketch. We interview customers, staff and lost deals before drawing a single line. The Noir Atelier rebrand worked because research showed the monogram had equity but the system around it was dated - so the monogram stayed and everything else changed.\n\nRule two: evolve the assets with memory, revolutionize the system. Keep what people recognize in a thumbnail. Rebuild the grids, type scales and art direction that nobody photographs but everybody feels.\n\nRule three: launch the story, not the logo. Nobody shares a logo reveal except designers. Maison Verre launched with founder films and a packaging story - the identity arrived as evidence of a bigger idea, not as the idea itself.\n\nRules four and five are operational: migrate everything at once (a half-rebranded company looks bankrupt) and write the guidelines people will actually use - twenty pages of examples beat two hundred pages of rules.",
    category: 'Branding',
    author: 'Sofia Marchetti',
    author_role: 'Design Director, Brand',
    image_url: '/images/process-branding.jpg',
    read_time: 6,
    featured: false,
    published_at: '2026-06-02T10:00:00Z'
  },
  {
    id: 3,
    slug: 'landing-pages-that-convert',
    title: 'Landing Pages That Actually Convert',
    excerpt: 'We audited 120 SaaS landing pages. 100 of them make the same four mistakes. Here is the teardown and the fix.',
    body: "We audited 120 SaaS landing pages this year. The median conversion rate was 2.1%. The top decile converted at 11%+. The gap was not budget or traffic quality - it was four repeated mistakes.\n\nMistake one: the hero sells the category, not the outcome. Visitor arrives and learns you are an AI-powered platform for modern teams. They leave and Google the problem instead. Ledgerline's hero leads with the outcome - close the books in days, not weeks - and demos quadrupled.\n\nMistake two: proof is buried. Logos live below the fold, testimonials hide on a subpage, numbers appear nowhere. Put your strongest proof in the first viewport: a metric, a logo wall, a one-line quote. Trust is the prerequisite for reading further.\n\nMistake three: one page for every visitor. Paid traffic, organic traffic and returning visitors have different questions. The fix is not twelve pages - it is dynamic modules keyed to source and intent.\n\nMistake four: the form asks for a marriage on the first date. Every field costs conversions. Ask for email first, qualify after. The best-performing pages we have built collect one field above the fold and earn the rest through progressive profiling.",
    category: 'Growth',
    author: 'Yuki Tanaka',
    author_role: 'Head of Growth',
    image_url: '/images/work-ledgerline.jpg',
    read_time: 7,
    featured: false,
    published_at: '2026-04-20T10:00:00Z'
  },
  {
    id: 4,
    slug: 'typography-is-the-brand',
    title: 'Typography Is the Brand (Sorry, Logo)',
    excerpt: 'Your logo appears once per page. Your type appears 500 times. A case for spending the budget where the words are.',
    body: "Here is an uncomfortable truth for logo lovers: on most websites, the logo occupies 0.1% of pixels. Typography occupies 90%+. Yet identity budgets routinely spend 80% of the effort on the mark and treat type as an afterthought.\n\nThe brands people call timeless - fashion houses, broadsheets, luxury hotels - are almost always just brands with disciplined typography. A distinctive serif or grotesque, set with conviction at every size, does more memorability work than any symbol.\n\nWhen we rebuilt Noir Atelier, the wordmark changed modestly. The type system changed completely: an oversized editorial serif for headlines, a razor grotesque for product data, and rules about scale contrast that make every layout feel expensive.\n\nPractical advice: license one great family instead of three good ones. Set headlines bigger than feels safe. And ban your body font from ever appearing above 24px - hierarchy is what separates designed from decorated.",
    category: 'Design',
    author: 'June Park',
    author_role: 'Founding Partner, Creative',
    image_url: '/images/work-noir.jpg',
    read_time: 5,
    featured: false,
    published_at: '2026-02-11T10:00:00Z'
  },
  {
    id: 5,
    slug: 'from-dtc-to-cult',
    title: 'From DTC to Cult: the Retention Playbook',
    excerpt: 'Acquisition is rented. Retention is owned. How subscription brands turn buyers into believers - with numbers from Kilo and Verre.',
    body: "The average DTC brand loses 70% of first-time buyers. The cult brands - the ones with waitlists and tattooed logos - keep 60%+. The difference is rarely product quality. It is ritual.\n\nKilo & Co. turned a coffee subscription into a morning ceremony: origin cards in every box, brew guides that teach rather than preach, and a subscriber-only roast voted on quarterly. Churn dropped by half because cancelling felt like leaving a club, not skipping a delivery.\n\nMaison Verre applied the same logic to skincare: routines instead of SKUs, refill pricing that rewards loyalty, and packaging customers refuse to throw away. Repeat purchase rate climbed 67% in two quarters.\n\nThe playbook has three moves. First, give the second purchase a reason to exist at the moment of the first - samples, rituals, progress. Second, make membership visible: community, early access, status. Third, measure retention cohorts weekly and treat every dip like a fire alarm.\n\nAcquisition scales spending. Retention scales enterprise value. Build the cult before you buy the crowd.",
    category: 'Strategy',
    author: 'Dario Grimm',
    author_role: 'Founding Partner, Strategy',
    image_url: '/images/work-kilo.jpg',
    read_time: 6,
    featured: false,
    published_at: '2025-11-05T10:00:00Z'
  },
  {
    id: 6,
    slug: 'why-we-kill-moodboards',
    title: 'Why We Kill Moodboards (and What We Do Instead)',
    excerpt: 'Moodboards are where strong ideas go to become beige. Our alternative: decision-first creative territories.',
    body: "Moodboards feel productive and produce mush. A grid of 40 reference images lets everyone in the room see a different project - and lets every stakeholder veto the sharp edges until only the inoffensive survives.\n\nWe replaced moodboards with creative territories: three fully-articulated directions, each with a name, a point of view, sample headlines, a type pairing and one hero mock. Each territory is a decision, not a vibe.\n\nThe effect on process is dramatic. Clients stop debating individual images and start choosing between futures. Feedback gets specific because the stimulus is specific. Rounds drop from six to two.\n\nThis only works with genuine range: the three territories must be mutually exclusive. If the client can combine them, you have not done the strategic thinking yet. Our job is to make each option scary-good in a different way - then help them pick their fear.\n\nKill the moodboard. Ship the decision.",
    category: 'Design',
    author: 'June Park',
    author_role: 'Founding Partner, Creative',
    image_url: '/images/texture-ink.jpg',
    read_time: 4,
    featured: false,
    published_at: '2025-09-16T10:00:00Z'
  }
];

// In-memory inquiry store used when the database is unreachable.
export const inquiries = [];
