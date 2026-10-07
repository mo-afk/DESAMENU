// Bundled demo content for DESA Menu.
// API routes try Supabase first and fall back to this data when the DB is unreachable,
// so the site stays fully functional in every environment.

/**
 * Live venue demos. Each entry is a real hospitality deployment of DESA Menu:
 * `category` is the deployment type (Video Menu, Interactive Menu, Text Menu,
 * Loyalty), `services` lists what the venue actually runs, and `metrics` are the
 * venue's own service numbers.
 */
export const projects = [
  {
    id: 1,
    slug: 'la-terrasse',
    title: 'La Terrasse',
    client: 'La Terrasse',
    category: 'Video Menu',
    industry: 'Fine Dining',
    year: 2026,
    tagline: 'Fine dining where every dish is filmed on the pass before it is ordered.',
    description: "La Terrasse had a menu nobody read and a kitchen capable of far more. Guests ordered the same three safe dishes, and the most ambitious work went unnoticed at the back of a laminated page.\n\nWe filmed eight plates on the pass, cut them to six-second loops and rebuilt the categories around how guests actually decide — light to rich, not starter to dessert. The signature dish sits first with a film that loads in under a second on 4G. Each dish carries a short tasting note written with the head chef.\n\nAverage spend per cover rose in the first month, and the kitchen now sells the plates it is proud of. Phase two added the loyalty card, which recognises returning guests by seat and greets them by name.",
    image_url: '/images/demo-terrace.jpg',
    services: ['Video menu', 'Dish film production', 'Menu architecture', 'Loyalty card'],
    games: ['Who Pays?', 'Ideal Combo Spinner', 'Taste & Personality Quiz', 'Loyalty micro-interactions'],
    metrics: [
      { value: '+34%', label: 'Average spend per cover' },
      { value: '61%', label: 'Of guests open a dish video' },
      { value: '4.9', label: 'Guest experience rating' }
    ],
    featured: true,
    timeline: 'Live in 5 weeks'
  },
  {
    id: 2,
    slug: 'noir-lounge',
    title: 'Noir Lounge',
    client: 'Noir Lounge',
    category: 'Interactive Menu',
    industry: 'Lounge',
    year: 2026,
    tagline: 'A cocktail lounge where the table game became part of the night.',
    description: "Noir Lounge sells atmosphere, but a static PDF killed the mood the moment it loaded. Tables of four were ordering two rounds and leaving.\n\nWe built an interactive menu for a dark room: bold type, zero glare, drink cards with tasting notes, and the full games suite: Who Pays? to settle the round, the Ideal Combo Spinner to pair the next drink, and a Taste & Personality Quiz that reads the table and curates a round for it. Each game is branded, weightless and takes fifteen seconds — long enough to be memorable, short enough to sell another round.\n\nDwell time extended, second-round orders became normal rather than occasional, and the games are now the most shared part of the venue on social.",
    image_url: '/images/demo-noir.jpg',
    services: ['Interactive menu', 'Full games suite', 'Drink cards', 'Menu analytics'],
    games: ['Who Pays?', 'Ideal Combo Spinner', 'Taste & Personality Quiz', 'Custom table games'],
    metrics: [
      { value: '+41%', label: 'Second-round reorders' },
      { value: '23 min', label: 'Longer average dwell time' },
      { value: '1 in 3', label: 'Tables play Who Pays?' }
    ],
    featured: true,
    timeline: 'Live in 4 weeks'
  },
  {
    id: 3,
    slug: 'cafe-atelier',
    title: 'Café Atelier',
    client: 'Café Atelier',
    category: 'Text Menu',
    industry: 'Cafe',
    year: 2025,
    tagline: 'A specialty coffee bar that serves the queue faster than it forms.',
    description: "Café Atelier serves 400 covers a day out of 60 square metres. Every second a guest spends deciding is a second the queue grows, and the printed board was the bottleneck.\n\nWe built a fast text menu: one screen, no scrolling required, with the day's brew rotation updated in seconds from the counter. Highlighted items rotate by time of day, so mornings show pastries and afternoons show cold brew. The Ideal Combo Spinner pairs a pastry with a brew in one tap — and nudges the pairing toward the margin the counter wants. Regulars scan once and their loyalty card opens with their usual order pinned.\n\nOrder-to-serve time dropped, average ticket rose, and the cafe has not reprinted a menu since.",
    image_url: '/images/demo-atelier.jpg',
    services: ['Fast text menu', 'Daily rotation', 'Loyalty card', 'Counter operations'],
    games: ['Ideal Combo Spinner', 'Loyalty micro-interactions'],
    metrics: [
      { value: '-22%', label: 'Time from scan to order' },
      { value: '+18%', label: 'Average ticket value' },
      { value: '0', label: 'Reprints since launch' }
    ],
    featured: true,
    timeline: 'Live in 3 weeks'
  },
  {
    id: 4,
    slug: 'maison-verre',
    title: 'Maison Verre',
    client: 'Maison Verre',
    category: 'Video Menu',
    industry: 'Fine Dining',
    year: 2025,
    tagline: 'Rooftop dining that sells the view and the plate in one scroll.',
    description: "Maison Verre is a rooftop restaurant where the view sells the reservation and the menu has to live up to it. The team wanted guests to explore beyond the tasting menu without adding service pressure.\n\nWe built a layered video menu: signature plates carry film and provenance, the wine list pairs by mood rather than region, and a sommelier panel recommends by course. Golden-hour photography was shot the same day as the dish films, so the digital menu looks like the room it belongs to.\n\nPaired beverage uplift moved the most, and the venue now plans wine orders against real demand from the menu analytics.",
    image_url: '/images/work-verre.jpg',
    services: ['Video menu', 'Wine pairing system', 'Course recommendations'],
    games: ['Taste & Personality Quiz', 'Who Pays?'],
    metrics: [
      { value: '+27%', label: 'Paired beverage uplift' },
      { value: '2.1x', label: 'More tasting-menu selections' },
      { value: '5 weeks', label: 'From kickoff to live' }
    ],
    featured: true,
    timeline: 'Live in 5 weeks'
  },
  {
    id: 5,
    slug: 'velvet-hour',
    title: 'Velvet Hour',
    client: 'Velvet Hour',
    category: 'Interactive Menu',
    industry: 'Lounge',
    year: 2025,
    tagline: 'A cocktail bar that turned its menu into the best icebreaker in the room.',
    description: "Velvet Hour's bar team creates twelve new drinks a season. The printed menu could not keep up, so guests kept ordering the same classics while the new work stayed invisible.\n\nWe shipped a seasonal interactive menu that updates the night the drinks launch, with a mood-based discovery flow — bright, bitter, smoky, sweet — instead of a list. The Ideal Combo Spinner was adapted for a cocktail setting: a short, shareable way to decide the next round that also surfaces the season's newest drinks, with Who Pays? to settle who orders it.\n\nDiscovery of new drinks tripled, and seasonal launches now land with an audience instead of a reprint.",
    image_url: '/images/work-velvet.jpg',
    services: ['Interactive menu', 'Ideal Combo Spinner', 'Seasonal updates', 'Who Pays?'],
    games: ['Ideal Combo Spinner', 'Who Pays?'],
    metrics: [
      { value: '3x', label: 'Orders of new seasonal drinks' },
      { value: '+31%', label: 'Revenue per table' },
      { value: 'Same-day', label: 'Menu update turnaround' }
    ],
    featured: false,
    timeline: 'Live in 4 weeks'
  },
  {
    id: 6,
    slug: 'forma-hotel',
    title: 'Forma Hotel',
    client: 'Forma Hotel',
    category: 'Loyalty',
    industry: 'Hotel',
    year: 2025,
    tagline: 'A boutique hotel that recognises a guest before they reach the desk.',
    description: "Forma Hotel runs a restaurant, a bar and in-room dining across 42 rooms. Each outlet had its own printed menu, and none of them knew a returning guest when they saw one.\n\nWe deployed one DESA Menu across all three outlets with a single guest identity. In-room dining scans from the room QR and carries the stay details; the restaurant menu remembers preferences and dietary notes from previous visits; the bar's loyalty card tracks across outlets.\n\nReturn-guest rates rose, in-room dining orders grew, and the front desk finally has one view of who is in the building and what they like.",
    image_url: '/images/work-forma.jpg',
    services: ['Multi-outlet deployment', 'Guest identity', 'Loyalty card', 'In-room dining menu'],
    games: ['Taste & Personality Quiz', 'Loyalty micro-interactions'],
    metrics: [
      { value: '+46%', label: 'Returning-guest rate' },
      { value: '+2.4x', label: 'In-room dining orders' },
      { value: '3', label: 'Outlets on one system' }
    ],
    featured: false,
    timeline: 'Live in 7 weeks'
  },
  {
    id: 7,
    slug: 'pulse-beach-club',
    title: 'Pulse Beach Club',
    client: 'Pulse',
    category: 'Loyalty',
    industry: 'Lounge',
    year: 2024,
    tagline: 'A beach club that keeps the summer going until next summer.',
    description: "Pulse Beach Club lives on seasonal volume: thousands of guests, most of them once a year, most of them never heard from again after September.\n\nThe problem was memory. We built a loyalty system that travels with the guest across the season and across years: sunbed bookings, food and drink, and event tickets all feed one card. Off-season, the same system sends a single well-timed message before the calendar opens.\n\nThe club now enters each season with a warm list instead of a cold one, and opening-weekend bookings come from guests who were already there last year.",
    image_url: '/images/work-pulse.jpg',
    services: ['Loyalty system', 'Season-pass logic', 'Off-season messaging'],
    games: ['Ideal Combo Spinner', 'Custom table games', 'Loyalty micro-interactions'],
    metrics: [
      { value: '38k', label: 'Loyalty cards issued' },
      { value: '2.7x', label: 'Opening-weekend bookings' },
      { value: '+29%', label: 'Repeat spend per guest' }
    ],
    featured: false,
    timeline: 'Live in 6 weeks'
  },
  {
    id: 8,
    slug: 'brasserie-soleil',
    title: 'Brasserie Soleil',
    client: 'Brasserie Soleil',
    category: 'Video Menu',
    industry: 'Fine Dining',
    year: 2024,
    tagline: 'A neighbourhood brasserie that upsets the classics with film.',
    description: "Brasserie Soleil serves the same canon as every brasserie in the city: steak frites, onion soup, crème brûlée. The team wanted guests to order past the classics they already knew.\n\nWe filmed the seasonal specials and the dishes the kitchen wanted to sell, then placed them where guests actually look: the first card in each category. Short tasting notes in the voice of the owner explain why each dish exists. Search answers the question every brasserie guest asks — what can I eat quickly before the theatre.\n\nSeasonal specials now outsell the static classics on busy nights, and the kitchen has stopped guessing which dishes guests notice.",
    image_url: '/images/demo-brasserie.jpg',
    services: ['Video menu', 'Who Pays?', 'Seasonal specials', 'Tasting notes'],
    games: ['Who Pays?', 'Taste & Personality Quiz'],
    metrics: [
      { value: '+24%', label: 'Seasonal special orders' },
      { value: '48%', label: 'Of guests use menu search' },
      { value: '6 sec', label: 'Average dish video length' }
    ],
    featured: false,
    timeline: 'Live in 4 weeks'
  }
];

export const testimonials = [
  {
    id: 1,
    quote: 'We spent years assuming guests wanted a printed menu. They wanted to see the food. The first month with DESA Menu moved our average spend by a third — the kitchen noticed before the numbers did.',
    author: 'Camille Roux',
    role: 'Owner',
    company: 'La Terrasse',
    rating: 5,
    project_slug: 'la-terrasse'
  },
  {
    id: 2,
    quote: 'Our room is dark, our guests are two drinks in, and the old PDF was unreadable. DESA built something that fits the room. The games suite alone changed how long people stay — Who Pays? settles the round, the spinner sells the next one.',
    author: 'Leo Fontaine',
    role: 'Founder',
    company: 'Noir Lounge',
    rating: 5,
    project_slug: 'noir-lounge'
  },
  {
    id: 3,
    quote: 'We serve four hundred people a day in a room the size of a van. The menu had to be faster than the queue, and now it is. Regulars scan once and their usual is already there.',
    author: 'Amel Benali',
    role: 'Head of Coffee',
    company: 'Café Atelier',
    rating: 5,
    project_slug: 'cafe-atelier'
  },
  {
    id: 4,
    quote: 'Three outlets, three printed menus, and no idea who our returning guests were. Now one system knows. Our front desk finally recognises people before they reach the desk.',
    author: 'Priya Nair',
    role: 'General Manager',
    company: 'Forma Hotel',
    rating: 5,
    project_slug: 'forma-hotel'
  },
  {
    id: 5,
    quote: 'We used to end every September with a clean slate and no relationship with the people who spent the summer with us. The spinner and the loyalty streak handle both in one season.',
    author: 'Marcus Webb',
    role: 'Director',
    company: 'Pulse Beach Club',
    rating: 5,
    project_slug: 'pulse-beach-club'
  }
];

export const posts = [
  {
    id: 1,
    slug: 'why-video-menus-outsell-static-menus',
    title: 'Why Video Menus Outsell Static Menus',
    excerpt: 'Guests cannot taste a photograph. They can watch a dish being finished. What we learned filming plates for 120 venues — and the numbers that came back.',
    body: "A printed menu asks guests to imagine. A photograph helps a little. A six-second film of the plate being finished, sauced and set down — that is the closest a guest gets to tasting it before it arrives.\n\nAcross the venues we have filmed, roughly six in ten guests open at least one dish video. The effect is not spread evenly: it concentrates on the dishes a venue most wants to sell. When a signature plate sits at the top of a category with film attached, selection of that dish roughly doubles against its printed baseline.\n\nThe practical rules we have settled on are unglamorous. Shoot on the pass, not in a studio, because guests recognise the room they are sitting in. Keep loops under six seconds and under 300 kilobytes, because the network in a full dining room is worse than your office. Film the finish — the pour, the shave, the flame — because motion is what carries appetite.\n\nAnd do not film everything. A menu where every dish moves is a menu where nothing stands out. We typically film eight to twelve plates per venue and let the rest stay quiet, elegant text.",
    category: 'Video',
    author: 'Ines Duarte',
    author_role: 'Head of Film at DESA Menu',
    image_url: '/images/hero-dish.jpg',
    read_time: 6,
    featured: true,
    published_at: '2026-08-14T10:00:00Z'
  },
  {
    id: 2,
    slug: 'designing-a-menu-for-a-phone-not-a-page',
    title: 'Designing a Menu for a Phone, Not a Page',
    excerpt: 'Most digital menus are print layouts squeezed into a browser. The constraints of a phone screen should be the brief, not the problem.',
    body: "The first thing to accept is that a phone screen in a restaurant is hostile territory: one hand, low light, a guest who is mid-conversation and slightly impatient. Everything about the design follows from that.\n\nType gets bigger and lighter-weight than a print menu would allow. Contrast goes up, glare comes down — a dark palette is not a fashion choice in a dim room, it is usability. Tap targets are generous because the guest is not looking carefully. Category navigation sits within thumb reach on the first screen, never hidden behind a hamburger.\n\nThe structure matters more than the styling. A printed menu organises by course because that is how kitchens are built. Guests do not order in kitchen order. They decide by appetite, budget, and what the table next to them is having — so we group by weight and mood, surface the signature plates early, and make price easy to scan without making it the loudest thing on screen.\n\nThe test we use is simple: hand a phone to someone who has never seen the menu, in a dark room, and see whether they order within ninety seconds without asking a question.",
    category: 'Design',
    author: 'Omar Zerhouni',
    author_role: 'Head of Experience at DESA Menu',
    image_url: '/images/process-branding.jpg',
    read_time: 7,
    featured: false,
    published_at: '2026-07-30T10:00:00Z'
  },
  {
    id: 3,
    slug: 'loyalty-that-guests-actually-use',
    title: 'Loyalty That Guests Actually Use',
    excerpt: 'Punch cards die in wallets. The retention layer that works is the one already open on the table — inside the menu.',
    body: "Most restaurant loyalty programmes fail for a boring reason: the guest has to remember them. A card in a wallet, an app nobody installed, a QR code on a receipt that is already in a pocket.\n\nPut the loyalty card inside the menu and the friction disappears. The guest has already scanned. The visit is already being recorded. The reward can be shown at the exact moment it matters — while they are deciding whether to order dessert.\n\nWhat we have learned from running these programmes: reward the visit, not the spend, because it is fairer to the guest and more predictable for the venue. Make progress visible in three seconds or fewer. And keep the reward genuinely small but genuinely immediate — a coffee, a dessert, a drink on the next visit beats a discount that never quite adds up.\n\nThe compound effect is quiet. Guests do not talk about your loyalty card. They simply come back, and the venue stops paying to acquire the same guest twice.",
    category: 'Retention',
    author: 'Daniel Okonkwo',
    author_role: 'Head of Retention at DESA Menu',
    image_url: '/images/work-forma.jpg',
    read_time: 5,
    featured: false,
    published_at: '2026-07-08T10:00:00Z'
  },
  {
    id: 4,
    slug: 'who-pays-and-why-table-games-work',
    title: 'Who Pays, and Why Table Games Work',
    excerpt: 'A fifteen-second game at the table does more for dwell time and reorders than any discount we have ever tested.',
    body: "Who Pays? is not a feature we expected to matter. It is a small, branded game that decides which guest at the table covers the round. It takes fifteen seconds. It is, by any reasonable measure, trivial.\n\nIt turned out to be the most effective thing we have shipped. Around one table in three plays it, mostly in groups, mostly between the first and second round. Tables that play it stay longer and order more — not because the game sells anything, but because it gives a table a reason to stay in the seat and a reason to order the next round together.\n\nThere is a brand effect too. A game is something guests photograph, and a menu guests photograph is a menu that travels. Venues report it appearing in stories and reviews without anyone being asked to post.\n\nThe lesson generalises beyond the game: engagement at the table is worth more than a discount at the till. A small, well-made interaction costs nothing per use and compounds every service.\n\nWho Pays? is not the whole of it. The same logic produced the Ideal Combo Spinner, which pairs a dish and a drink in one tap and leans toward the combinations a venue most wants to sell, and the Taste & Personality Quiz, which asks three or four questions and curates a selection on the spot. One is a game of chance, one is a pairing tool, one is a recommendation engine wearing the costume of a personality quiz. Together they cover the three moments a table actually needs help: who orders, what pairs with it, and what should I get.",
    category: 'Engagement',
    author: 'Yasmine Haddad',
    author_role: 'Founding Partner at DESA Menu',
    image_url: '/images/demo-noir.jpg',
    read_time: 5,
    featured: false,
    published_at: '2026-06-19T10:00:00Z'
  },
  {
    id: 5,
    slug: 'the-gamified-menu-beyond-who-pays',
    title: 'The Gamified Menu: Beyond Who Pays',
    excerpt: 'Who Pays? gets the attention. The spinner and the taste quiz do the heavier lifting on average order value. How the three fit together.',
    body: "Every venue asks about Who Pays? first. It is the one that gets photographed, so it is the one that travels. But after a year of running the suite, the pattern in the data is clear: the game that decides the bill is the most memorable, and the two that recommend something are the most profitable.\n\nThe Ideal Combo Spinner is a wheel a guest spins when they cannot decide between two things and do not want to admit it. It lands on a meal-and-drink pairing. Underneath, the pairings are weighted: combinations built from high-margin plates and pours come up more often than combinations built from the cheapest items on the menu. Guests get a decision made for them; the venue gets a pairing it actually wanted to sell. It is the least intrusive upsell we have built, because a wheel that tells you what to order feels like a game rather than a pitch.\n\nThe Taste & Personality Quiz handles the guest who wants something new but does not trust the list. Three or four questions — how you like to start, how adventurous you are feeling, whether you want sweet or bitter — and the menu narrows to a short, curated selection of plates and cocktails. For venues with long menus or frequently rotating specials, this is the feature that gets stuck-at-the-back-of-the-drinks-list items sold.\n\nThen there is the layer underneath both, which no guest ever sees and every operator eventually wants: custom games and loyalty micro-interactions. Streaks that survive a missed week. Points that land when someone reorders their usual. A small unlock on a birthday. Table leaderboards for a season. These are the pieces venues ask us to invent for them, and they are the reason the games layer is configurable rather than fixed.\n\nThe design rule across all of it is the same one we apply to dish film: keep it short, keep it branded, and never let it stand between a guest and the thing they already wanted. A table game that delays an order is a tax. A table game that answers a question the table was already asking is revenue.",
    category: 'Engagement',
    author: 'Omar Zerhouni',
    author_role: 'Head of Experience at DESA Menu',
    image_url: '/images/work-velvet.jpg',
    read_time: 7,
    featured: false,
    published_at: '2026-07-22T09:30:00Z'
  },
  {
    slug: 'from-print-to-pixels-in-five-weeks',
    title: 'From Print to Pixels in Five Weeks',
    excerpt: 'What a DESA Menu deployment actually looks like, week by week — and what we need from a venue to hit the date.',
    body: "The question every venue asks first is how long the switch takes, and how much of their team's time it will eat. The honest answer is five weeks for a single outlet, and about six hours of the venue's time in total.\n\nWeek one is audit and structure. We take the existing menu, the sales data if it exists, and the brand assets. We rebuild the categories around how guests decide rather than how the kitchen is organised, and we cut anything the venue does not actually want to sell.\n\nWeek two is the shoot. One day on site, on the pass, during service or before it. Eight to twelve plates, plus atmosphere frames for the venue's own marketing. No studio, no styling team, no interruption to service.\n\nWeek three is build: menu structure, film, copy, loyalty logic, table game branding. Week four is review, where the venue's team reads every word and we run it past two real guests. Week five is launch, training, and the first analytics review thirty days later.\n\nThe venues that hit five weeks share two habits: one decision-maker in the room, and content given to us in the first week rather than the fourth.",
    category: 'Craft',
    author: 'Sofia Marchetti',
    author_role: 'Hospitality Lead at DESA Menu',
    image_url: '/images/demo-brasserie.jpg',
    read_time: 6,
    featured: false,
    published_at: '2026-05-27T10:00:00Z'
  },
  {
    id: 6,
    slug: 'the-quiet-metrics-of-a-better-menu',
    title: 'The Quiet Metrics of a Better Menu',
    excerpt: 'Average spend is the headline. The numbers that actually compound — scan rate, video opens, return visits — are the ones nobody puts on a slide.',
    body: "Every venue wants the average-spend number, and we report it. But the metric that predicts next quarter is quieter: how many guests actually open the menu at the table.\n\nA printed menu has no scan rate because everyone reads it by default. A digital menu can fail silently — a guest who cannot find it, or finds it and closes it in four seconds, is a guest who ordered from memory. We treat scan rate as the health check of the whole deployment, and it is the first thing we look at when a venue reports flat results.\n\nThe next layer is engagement quality: how many guests open a dish video, how far into a category they scroll, and where they stop. That tells a venue something no printed menu ever could — which dishes are being considered and rejected, and which parts of the menu are invisible.\n\nThen retention: how many guests return within sixty days, and how many are recognised on arrival. It is a slower number than revenue, and a more honest one.",
    category: 'Analytics',
    author: 'Tarek Belkacem',
    author_role: 'Head of Engineering at DESA Menu',
    image_url: '/images/texture-ink.jpg',
    read_time: 6,
    featured: false,
    published_at: '2026-05-02T10:00:00Z'
  }
];

export const inquiries = [];
