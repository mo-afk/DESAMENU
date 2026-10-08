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
  /* ---------------------------------------------------------------- JUVIA */
  {
    id: 1,
    slug: 'juvia',
    title: 'JUVIA',
    client: 'Juvia',
    category: 'Italian Fine Dining & Lounge',
    industry: 'Fine Dining',
    year: 2026,
    tagline: 'Full video-enabled luxury menu with interactive table games and social connectivity.',
    description:
      'Juvia serves Italian fine dining with a lounge that runs late, and the two halves of the room were selling against each other. Guests who arrived for dinner never saw the lounge menu; guests who came for drinks never saw the kitchen. Everything the house was proud of sat in the middle of a printed card nobody read.\n\nWe filmed twelve plates and four signature cocktails on the pass, cut them to six-second loops, and rebuilt the menu as one continuous evening — aperitivo, pasta, secondi, then the lounge list, so a table can move through the whole night without changing a document. The menu ships in four languages (EN, FR, AR and ES) with full right-to-left support, because the room is rarely one nationality after nine.\n\nWho Pays? sits on the bill and the Ideal Combo Spinner pairs courses with the cellar, both branded to the room. The Instagram, Facebook and TikTok links live inside the menu, so a dish that photographs well can leave the table with the guest instead of being described to a friend the next morning.',
    image_url: '/images/demo-noir.jpg',
    services: [
      'Cinematic dish videos',
      'Multi-language menu — EN, FR, AR, ES',
      'Social links — Instagram, Facebook, TikTok',
      'Interactive table games',
    ],
    features: [
      { label: 'Video Menu', kind: 'module' },
      { label: 'Multi-Language', kind: 'module' },
      { label: 'Social Links', kind: 'module' },
      { label: 'Who Pays?', kind: 'game' },
      { label: 'Ideal Combo', kind: 'game' },
    ],
    // The venue's own live menu — opened in a new tab by "View Live Menu".
    externalMenuUrl: 'https://juvia-menu.vercel.app/',
    games: ['Who Pays?', 'Ideal Combo Spinner'],
    metrics: [
      { value: '+38%', label: 'Average spend per cover' },
      { value: '61%', label: 'Of guests open a dish video' },
      { value: '1 in 3', label: 'Tables play a table game' },
    ],
    featured: true,
    timeline: 'Live in 5 weeks',
  },

  /* ------------------------------------------------------------ LE MANOIR */
  {
    id: 2,
    slug: 'le-manoir',
    title: 'LE MANOIR',
    client: 'Le Manoir',
    category: 'Café, Gastronomie & Lounge',
    industry: 'Lounge',
    year: 2026,
    tagline: 'Gourmet lounge experience featuring cinematic video menus and personalized taste quizzes.',
    description:
      'Le Manoir is a café by day, a gastronomic kitchen in the evening and a lounge after that — three services, one address, and a menu that had grown into a small book trying to speak to all of them at once. Regulars knew what they wanted. New guests asked the floor team to choose for them.\n\nWe filmed the plates that carry the kitchen and rewrote the categories around the hour rather than the course, so the same menu reads correctly at eleven in the morning and at eleven at night. It ships in four languages with full right-to-left support, and the house keeps its Instagram and Facebook audience inside the menu rather than a link people promise to look at later.\n\nThe Taste & Personality Quiz is the piece that changed the floor: three questions and a curated selection of plates and cocktails, built with the kitchen, so a first-time guest is recommended rather than sold to. The quiz is exclusive to Le Manoir — no other DESA Menu venue runs that combination — and it is why tables that would have ordered safe now order the tasting plate.',
    image_url: '/images/work-verre.jpg',
    services: [
      'Cinematic dish videos',
      'Multi-language menu — EN, FR, AR, ES',
      'Social integration — Instagram, Facebook',
      'Taste & Personality Quiz',
    ],
    features: [
      { label: 'Video Menu', kind: 'module' },
      { label: 'Multi-Language', kind: 'module' },
      { label: 'Social Links', kind: 'module' },
      { label: 'Personality Quiz', kind: 'game' },
    ],
    // The venue's own live menu — opened in a new tab by "View Live Menu".
    externalMenuUrl: 'https://videomenulemanoir2.vercel.app/',
    games: ['Taste & Personality Quiz'],
    metrics: [
      { value: '+27%', label: 'Paired-beverage uplift' },
      { value: '×2', label: 'Discovery of new dishes' },
      { value: '4.9', label: 'Guest experience rating' },
    ],
    featured: true,
    timeline: 'Live in 6 weeks',
  },

  /* ------------------------------------------------------- PAUSE À PARIS */
  {
    id: 3,
    slug: 'pause-a-paris',
    title: 'PAUSE À PARIS',
    client: 'Pause à Paris',
    category: 'Café, Boulangerie & French Bistro',
    industry: 'Bistro',
    year: 2026,
    tagline: 'High-conversion bistro menu optimized for direct digital ordering and visual dish discovery.',
    description:
      'Pause à Paris is a café, a bakery counter and a bistro sharing one small room, which means the queue at the counter is the whole business. Every guest who hesitated over a laminated list was two minutes of somebody else\'s lunch.\n\nWe built the shortest possible path from sitting down to a confirmed order. A visual menu of the pâtisserie, the plat du jour and the bakery counter, filmed and photographed so the pastry case is legible from the back of the room, with direct ordering from the table: no app, no account, no waiting to catch an eye. Orders land in the kitchen and at the counter at the same time.\n\nThere are no games here on purpose. The bistro story is speed — fewer questions at the counter, more covers at lunch, and a menu that can change the daily special at seven in the morning without a reprint. The result reads as a visual menu that happens to take orders, rather than an ordering system that happens to list food.',
    image_url: '/images/demo-brasserie.jpg',
    services: [
      'Optimized video & visual menu',
      'Direct digital ordering from the table',
      'Fast-ordering flow — no app, no account',
      'Streamlined bistro UX',
    ],
    features: [
      { label: 'Video Menu', kind: 'module' },
      { label: 'Direct Ordering', kind: 'module' },
      { label: 'Fast Ordering', kind: 'module' },
      { label: 'Streamlined UX', kind: 'module' },
    ],
    // The venue's own live menu — opened in a new tab by "View Live Menu".
    externalMenuUrl: 'https://videomenu-pause-a-paris.vercel.app/',
    games: [],
    metrics: [
      { value: '−22%', label: 'Scan-to-order time' },
      { value: '+31%', label: 'Orders placed directly' },
      { value: '2.4k', label: 'Orders a week at peak' },
    ],
    featured: true,
    timeline: 'Live in 4 weeks',
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      'Guests order the dishes we film. The kitchen finally sells the plates it is proud of, and the lounge menu sells itself after nine.',
    author: 'Marco Bellini',
    role: 'Owner',
    company: 'JUVIA',
    rating: 5,
    project_slug: 'juvia',
  },
  {
    id: 2,
    quote:
      'The quiz does the recommending for us. First-time guests order like regulars, and it never feels like a sales pitch.',
    author: 'Claire Fontaine',
    role: 'General Manager',
    company: 'LE MANOIR',
    rating: 5,
    project_slug: 'le-manoir',
  },
  {
    id: 3,
    quote:
      'Ordering from the table cut the counter queue to nothing over lunch. We serve more coffee and apologise far less.',
    author: 'Julien Moreau',
    role: 'Manager',
    company: 'PAUSE À PARIS',
    rating: 5,
    project_slug: 'pause-a-paris',
  },
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
